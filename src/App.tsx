import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Race from "./pages/Race";
import TeamStandings from "./pages/TeamStandings";
import DriverStandings from "./pages/DriverStandings";
import Races from "./pages/Races";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import Footer from "./components/Footer";
import { SeasonProvider } from "./contexts/SeasonContext";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics.tsx";
import { Analytics } from "@vercel/analytics/react";
import SuccessPage from "./pages/SuccessPage"; // ✅ ADDED
import Live from "./pages/Live.tsx";
// import CancelPage from "./pages/CancelPage"; // Optional: Uncomment if needed

const queryClient = new QueryClient();

// Layout component to add footer to pages
const MainLayout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen flex flex-col">
      {children}
      <Footer />
    </div>
);

const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SeasonProvider>
          <AuthProvider>
            <GoogleAnalytics />
            <Analytics />
            <BrowserRouter>
              <ScrollToTop />
              <Routes>
                {/* Landing Page Route */}
                <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />

                {/* ✅ Stripe Payment Result Pages */}
                <Route path="/success" element={<MainLayout><SuccessPage /></MainLayout>} />
                {/* <Route path="/cancel" element={<MainLayout><CancelPage /></MainLayout>} /> */}

                {/* Public Info Pages */}
                <Route path="/faq" element={<MainLayout><FAQ /></MainLayout>} />

                {/* Main App Pages */}
                <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
                <Route path="/race/:raceId" element={<MainLayout><Race /></MainLayout>} />
                <Route path="/races" element={<MainLayout><Races /></MainLayout>} />
                <Route path="/standings/teams" element={<MainLayout><TeamStandings /></MainLayout>} />
                <Route path="/standings/drivers" element={<MainLayout><DriverStandings /></MainLayout>} />
                <Route path="/live" element={<MainLayout><Live /></MainLayout>} /> {/* ✅ Live route added */}

                {/* 404 Fallback */}
                <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </SeasonProvider>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;
