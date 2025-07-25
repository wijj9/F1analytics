import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

const SuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const { refreshSubscription } = useAuth();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const handlePaymentSuccess = async () => {
            try {
                // Get the email and return URL that were stored before payment
                const paymentEmail = localStorage.getItem('paymentEmail');
                const returnUrl = localStorage.getItem('returnUrl');

                if (paymentEmail) {
                    // Check subscription status to confirm payment was processed
                    const response = await fetch(`${API_BASE_URL}/api/check-subscription?email=${encodeURIComponent(paymentEmail)}`);
                    const data = await response.json();

                    if (data.isSubscribed) {
                        // Update the auth context to unlock features
                        await refreshSubscription(paymentEmail);

                        // Clean up stored data
                        localStorage.removeItem('paymentEmail');
                        localStorage.removeItem('returnUrl');

                        // Show success message briefly, then redirect to where they came from
                        setTimeout(() => {
                            if (returnUrl) {
                                // Redirect to the original page they were on
                                window.location.href = returnUrl;
                            } else {
                                // Fallback to races page if no return URL
                                navigate('/races', { replace: true });
                            }
                        }, 2000);
                    } else {
                        // Payment might still be processing, wait a bit longer
                        setTimeout(() => {
                            window.location.reload();
                        }, 3000);
                    }
                } else {
                    // No email found, redirect to homepage
                    setTimeout(() => {
                        navigate('/', { replace: true });
                    }, 2000);
                }
            } catch (error) {
                console.error('Error processing payment success:', error);
                // Get return URL and redirect there on error too
                const returnUrl = localStorage.getItem('returnUrl');
                localStorage.removeItem('paymentEmail');
                localStorage.removeItem('returnUrl');

                setTimeout(() => {
                    if (returnUrl) {
                        window.location.href = returnUrl;
                    } else {
                        navigate('/', { replace: true });
                    }
                }, 2000);
            } finally {
                setIsProcessing(false);
            }
        };

        handlePaymentSuccess();
    }, [navigate, refreshSubscription]);

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="text-center p-8 bg-gray-900 border border-gray-700 rounded-lg max-w-md">
                <div className="mb-6">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Payment Successful!</h1>
                    <p className="text-gray-300">
                        {isProcessing
                            ? "Processing your payment and unlocking premium features..."
                            : "Premium features have been unlocked! Redirecting you back to the app..."
                        }
                    </p>
                </div>

                {isProcessing && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessPage;
