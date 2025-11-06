// components/BackButton.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Adjust import based on your UI lib
import { ChevronLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton  = location.pathname !== "/";


  return (
    <>
      {showBackButton && (
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl px-4 py-2 text-slate-700 hover:text-blue-600 font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      )}
    </>
  );
};

export default BackButton;
