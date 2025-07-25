import React, {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";

export interface AuthContextType {
  user: { id: string; email: string } | null;
  loading: boolean;
  isSubscribed: boolean;
  userEmail: string | null;
  signOut: () => void;
  setUser: (user: { id: string; email: string } | null) => void;
  checkSubscription: (email: string) => Promise<boolean>;
  refreshSubscription: (email?: string) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isSubscribed: false,
  userEmail: null,
  signOut: () => {},
  setUser: () => {},
  checkSubscription: async () => false,
  refreshSubscription: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(
      localStorage.getItem("userEmail")
  );
  const [loading, setLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkSubscription = async (email: string): Promise<boolean> => {
    try {
      console.log('AuthContext: Checking subscription for email:', email);
      const response = await fetch(
          `${API_BASE_URL}/check-subscription?email=${encodeURIComponent(email)}`
      );
      const data = await response.json();
      console.log('AuthContext: Subscription check response:', data);
      setIsSubscribed(data.isSubscribed);
      console.log('AuthContext: Setting isSubscribed to:', data.isSubscribed);
      return data.isSubscribed;
    } catch (error) {
      console.error("Error checking subscription:", error);
      setIsSubscribed(false);
      return false;
    }
  };

  const refreshSubscription = async (email?: string) => {
    const emailToCheck = email || userEmail;
    if (emailToCheck) {
      await checkSubscription(emailToCheck);
      if (email && email !== userEmail) {
        setUserEmail(email);
        localStorage.setItem("userEmail", email);
      }
    }
  };

  useEffect(() => {
    if (userEmail) {
      checkSubscription(userEmail);
    } else {
      setLoading(false);
    }
  }, [userEmail]);

  const signOut = () => {
    setUser(null);
    setUserEmail(null);
    setIsSubscribed(false);
    localStorage.removeItem("userEmail");
  };

  return (
      <AuthContext.Provider
          value={{
            user,
            userEmail,
            loading,
            isSubscribed,
            setUser,
            signOut,
            checkSubscription,
            refreshSubscription,
          }}
      >
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => useContext(AuthContext);
