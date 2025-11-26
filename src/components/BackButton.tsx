// components/BackButton.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust import based on your UI lib
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  // Don't show on root or signup page
  if (location.pathname === "/" || location.pathname === "/signup") {
    return null;
  }

  return (
    <>
      {showBackButton && (
        <ArrowLeft
          onClick={() => {
            if (window.history.length <= 1) {
              navigate("/");
            } else {
              navigate(-1);
            }
          }}
          className="w-4 h-4 cursor-pointer"
        />
      )}
    </>
  );
};

export default BackButton;
