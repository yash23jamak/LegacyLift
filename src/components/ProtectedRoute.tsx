
/**
 * Protects private routes by allowing access only to authenticated users.
 * Redirects unauthenticated users to home and prevents logged-in users from visiting login/signup.
 */
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = Cookies.get("IsToken");
    const location = useLocation();

    // If user is authenticated and tries to access login/signup
    if (isAuthenticated && (location.pathname === "/login" || location.pathname === "/signup")) {
        return <Navigate to="/" replace />;
    }
    return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

