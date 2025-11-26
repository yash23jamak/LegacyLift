
/**
 * Redirects authenticated users away from public routes (e.g., Login, Signup) to home.
 */
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PublicRouteProps {
    children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const isAuthenticated = Cookies.get("IsToken");

    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
