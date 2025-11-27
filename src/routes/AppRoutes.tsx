import { Routes, Route } from "react-router-dom";

import NotFound from "../pages/NotFound";
import SignupPage from "../components/SignupPage";
import LoginPage from "../components/LoginPage";
import RouteGuard from "./guards/RouteGuards";
import Home from "@/pages/home";
import UploadProject from "@/pages/upload";
import AnalysisPage from "@/pages/analysisUI";
import MigrationUI from "@/pages/migrationUI";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/login" element={<RouteGuard isPublic><LoginPage /></RouteGuard>} />
    <Route path="/signup" element={<RouteGuard isPublic><SignupPage /></RouteGuard>} />
    <Route path="/" element={<Home />} />

    {/* Protected Routes */}
    <Route path="/upload" element={<RouteGuard requiredStep={1}><UploadProject /></RouteGuard>} />
    <Route path="/analysis" element={<RouteGuard requiredStep={2}><AnalysisPage /></RouteGuard>} />
    <Route path="/migration" element={<RouteGuard requiredStep={3}><MigrationUI /></RouteGuard>} />

    {/* Fallback */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
