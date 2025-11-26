import { Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";
import PublicRoute from "./guards/PublicRoute";
import ProtectedRoute from "./guards/ProtectedRoute";
import Home from "@/pages/home";
import UploadProject from "@/pages/upload";
import AnalysisPage from "@/pages/analysisUI";
import MigrationUI from "@/pages/migrationUI";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
    <Route path="/" element={<Home />} />

    {/* Protected Routes */}
    <Route path="/upload" element={<ProtectedRoute requiredStep={1}><UploadProject /></ProtectedRoute>} />
    <Route path="/analysis" element={<ProtectedRoute requiredStep={2}><AnalysisPage /></ProtectedRoute>} />
    <Route path="/migration" element={<ProtectedRoute requiredStep={3}><MigrationUI /></ProtectedRoute>} />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
