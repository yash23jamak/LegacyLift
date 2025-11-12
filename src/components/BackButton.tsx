// components/BackButton.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust import based on your UI lib

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on root or signup page
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <Button variant="outline" onClick={() => navigate(-1)}>
      ← Back
    </Button>
  );
};

export default BackButton;
