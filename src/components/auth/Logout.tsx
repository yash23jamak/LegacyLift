import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";

const Logout = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleLogout = async () => {
        try {
            const response = await fetch(`${backendUrl}/auth/logout`, {
                method: "POST",
                credentials: "include"
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Logout failed.");
            }

            if (response.ok) {
                Cookies.remove("IsToken");
            }
            toast({
                title: data.message,
                description: data.message || "You have been logged out.",
            });
            localStorage.removeItem("userName");
            localStorage.removeItem("currentStep");
            navigate("/login");
        } catch (error) {
            toast({
                title: "Logout Failed",
                description: error.message || "Unable to logout. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <LogOut
            size={20}
            className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
            onClick={handleLogout}
        />
    );
};

export default Logout;