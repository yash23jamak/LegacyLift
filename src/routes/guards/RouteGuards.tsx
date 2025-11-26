import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useStep } from "../../contexts/useStepContext";

interface RouteGuardProps {
  children: JSX.Element;
  isPublic?: boolean;
  requiredStep?: number;
}

// Route mapping: defines which step corresponds to which route
const STEP_ROUTE_MAP: Record<number, string> = {
  1: "/upload",
  2: "/analysis",
  3: "/migration",
};

const getRedirectPath = (currentStep: number): string => {
  return STEP_ROUTE_MAP[currentStep] || "/";
};

const RouteGuard = ({ children, isPublic = false, requiredStep }: RouteGuardProps) => {
  const { currentStep } = useStep();
  const isAuthenticated = Cookies.get("IsToken");

  // If not authenticated
  if (!isAuthenticated) {
    return isPublic ? children : <Navigate to="/" replace />;
  }

  // If authenticated and it's a public route, redirect to home
  if (isPublic) {
    return <Navigate to="/" replace />;
  }

  // Check step requirement for protected routes
  if (requiredStep && currentStep < requiredStep) {
    return <Navigate to={getRedirectPath(currentStep)} replace />;
  }

  return children;
};

export default RouteGuard;