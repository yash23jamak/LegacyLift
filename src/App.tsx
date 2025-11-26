import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, useLocation } from "react-router-dom";
import BackButton from "./components/BackButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AppProvider } from "./contexts/useContext";
import { StepProvider } from "./contexts/useStepContext";
import AppRoutes from "./routes/AppRoutes";

const queryClient = new QueryClient();

// Layout wrapper that includes the BackButton
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showBackButton = location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/";
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {showBackButton && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <BackButton />
          </div>
        )}
        <main className="max-w-7xl  pb-12">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <AppProvider>
    <StepProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Layout>
              <AppRoutes />
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StepProvider>
  </AppProvider>
);

export default App;
