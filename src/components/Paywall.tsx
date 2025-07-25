import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Use environment variable for backend URL, fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const Paywall: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isSubscribed, checkSubscription, refreshSubscription, userEmail } = useAuth();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Debug logging
    console.log('Paywall render:', { isSubscribed, userEmail });

    // Check if user is already subscribed when component mounts
    useEffect(() => {
        const checkStoredEmail = async () => {
            const storedEmail = localStorage.getItem('userEmail');
            console.log('Stored email in localStorage:', storedEmail);

            if (storedEmail && !isSubscribed) {
                console.log('Found stored email, checking subscription status...');
                await refreshSubscription(storedEmail);
            }
        };

        checkStoredEmail();
    }, []);

    const handleSubscribe = async () => {
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsLoading(true);

        try {
            // First check if this email already has a subscription
            console.log('Checking subscription status for:', email);
            const hasSubscription = await checkSubscription(email);

            if (hasSubscription) {
                // User already has subscription, refresh auth context
                console.log('User already has subscription, unlocking features');
                await refreshSubscription(email);
                alert('Welcome back! Your features have been unlocked.');
                return;
            }

            // If no subscription, proceed with checkout
            console.log('No existing subscription, proceeding with checkout');

            // Store the current URL and email before redirecting to payment
            localStorage.setItem('paymentEmail', email);
            localStorage.setItem('returnUrl', window.location.href);

            const requestUrl = `${API_BASE_URL}/api/create-checkout-session`;
            const requestBody = { email };

            console.log('Making request to:', requestUrl);
            console.log('Request body:', requestBody);

            const res = await fetch(requestUrl, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: { "Content-Type": "application/json" },
            });

            console.log('Response status:', res.status);
            console.log('Response ok:', res.ok);

            if (!res.ok) {
                const errorText = await res.text();
                console.error('HTTP error details:', errorText);
                throw new Error(`HTTP error! status: ${res.status}, details: ${errorText}`);
            }

            const data = await res.json();
            console.log('Checkout session response:', data);

            if (data.url) {
                console.log('Redirecting to:', data.url);
                window.location.href = data.url;
            } else {
                console.error('No checkout URL received:', data);
                alert('Error creating checkout session. Please try again. (No URL received)');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            alert('Error creating checkout session. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubscribed) return <>{children}</>;

    return (
        <div className="text-center p-8 bg-gray-900 border border-gray-700 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Premium Features</h2>
            <p className="mb-4">Make a one-time payment to unlock these features forever.</p>
            <div className="space-y-4">
                <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="max-w-sm mx-auto"
                />
                <Button
                    onClick={handleSubscribe}
                    disabled={isLoading || !email}
                    className="w-full max-w-sm"
                >
                    {isLoading ? "Processing..." : "Unlock for €1.00"}
                </Button>
            </div>
        </div>
    );
};

export default Paywall;
