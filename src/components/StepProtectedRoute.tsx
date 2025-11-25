
/**
 * Guards a route based on the current step.
 *
 * @param children - Component to render if allowed.
 * @param requiredStep - Minimum step required.
 * @returns Children or redirects to "/".
 */
import React from "react";
import { Navigate } from "react-router-dom";
import { useStep } from "../contexts/useStepContext";

interface StepProtectedRouteProps {
    children: JSX.Element;
    requiredStep: number;
}

const StepProtectedRoute: React.FC<StepProtectedRouteProps> = ({ children, requiredStep }) => {
    const { currentStep } = useStep();
    return currentStep >= requiredStep ? children : <Navigate to="/" replace />;
};

export default StepProtectedRoute;
