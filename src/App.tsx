// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnalysisPage from "./components/analysisUI";
import Home from "./pages/home";
import BackButton from "./components/BackButton";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MigrationUI from "./components/migrationUI";

const queryClient = new QueryClient();

// Layout wrapper that includes the BackButton
const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const showBackButton = location.pathname !== "/";
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16">
        {showBackButton && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <BackButton />
          </div>
        )}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload" element={<Index />} />
            <Route path="/analysis" element={<AnalysisPage />} />
            <Route path="/migration" element={<MigrationUI />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
