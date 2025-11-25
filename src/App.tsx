import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Outlet } from "react-router-dom";
import UploadProject from "./pages/upload";
import NotFound from "./pages/NotFound";
import AnalysisPage from "./pages/analysisUI";
import Home from "./pages/home";
import BackButton from "./components/BackButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MigrationUI from "./pages/migrationUI";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { AppProvider } from "./contexts/useContext";
import { StepProvider } from "./contexts/useStepContext"; // ✅ Import StepProvider
import ProtectedRoute from "./components/ProtectedRoute";
import StepProtectedRoute from "./components/StepProtectedRoute";
import PublicRoute from "./components/PublicRoute";

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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">{children}</main>
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
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
                <Route path="/" element={<Home />} />

                {/* Protected Routes Group */}
                <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
                  <Route
                    path="/upload"
                    element={<StepProtectedRoute requiredStep={1}><UploadProject /></StepProtectedRoute>}
                  />
                  <Route
                    path="/analysis"
                    element={<StepProtectedRoute requiredStep={2}><AnalysisPage /></StepProtectedRoute>}
                  />
                  <Route
                    path="/migration"
                    element={<StepProtectedRoute requiredStep={3}><MigrationUI /></StepProtectedRoute>}
                  />
                </Route>

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </StepProvider>
  </AppProvider>
);

export default App;
