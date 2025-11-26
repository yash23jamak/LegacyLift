import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const isAuthenticated = Cookies.get("IsToken");
  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
