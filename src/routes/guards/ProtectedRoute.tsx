import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useStep } from "../../contexts/useStepContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredStep: number;
}

const ProtectedRoute = ({ children, requiredStep }: ProtectedRouteProps) => {
  const { currentStep } = useStep();
  const isAuthenticated = Cookies.get("IsToken");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (currentStep < requiredStep) {
    switch (currentStep) {
      case 1: return <Navigate to="/upload" replace />;
      case 2: return <Navigate to="/analysis" replace />;
      default: return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
