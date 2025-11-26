// components/Navbar.tsx
import { ChevronRight, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeButton, setActiveButton] = useState<string>("");
  const hideLogout =
    location.pathname === "/login" || location.pathname === "/signup";

  const userName = localStorage.getItem("userName");

  // header migration button logic for login/out
  const handleStartMigration = () => {
    if (!userName) {
      toast({
        title: "Signin Required",
        description: "Please sign in to start migration.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    setActiveButton("start");
    navigate("/upload");
  };

  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const scrollY = window.scrollY + 100; // offset for navbar height
      const processEl = document.getElementById("process");
      const flowEl = document.getElementById("flowchart");
      const techEl = document.getElementById("tech");

      if (techEl && scrollY >= techEl.offsetTop) {
        setActiveButton("tech");
      } else if (flowEl && scrollY >= flowEl.offsetTop) {
        setActiveButton("flow");
      } else if (processEl && scrollY >= processEl.offsetTop) {
        setActiveButton("migration");
      } else {
        setActiveButton("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              LegacyLift
            </span>
          </Link>

          {/* Menu Items */}
          {location.pathname === "/" && (
            <div className="flex items-center space-x-10">
              <button
                onClick={() => {
                  setActiveButton("migration");
                  document
                    .getElementById("process")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`font-medium transition-all duration-500 ease-in-out border-b-2 ${activeButton === "migration" ? "text-blue-600 border-b-2 border-blue-600 pb-0.5" : "pb-0.5 text-slate-600 border-transparent hover:text-blue-500 hover:border-b-2 hover:border-blue-400"}`}
              >
                Migration Process
              </button>
              <button
                onClick={() => {
                  setActiveButton("flow");
                  const element = document.getElementById("flowchart");
                  if (element) {
                    const y =
                      element.getBoundingClientRect().top +
                      window.pageYOffset -
                      40;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className={`font-medium transition-all duration-500 ease-in-out border-b-2 ${activeButton === "flow" ? "text-blue-600 border-b-2 border-blue-600 pb-0.5" : "pb-0.5 text-slate-600 border-transparent hover:text-blue-500 hover:border-b-2 hover:border-blue-400"}`}
              >
                Flow Diagram
              </button>
              <button
                onClick={() => {
                  setActiveButton("tech");
                  document
                    .getElementById("tech")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`font-medium transition-all duration-500 ease-in-out border-b-2 ${activeButton === "tech" ? "text-blue-600 border-b-2 border-blue-600 pb-0.5" : "pb-0.5 text-slate-600 border-transparent hover:text-blue-500 hover:border-b-2 hover:border-blue-400"}`}
              >
                Tech Stack
              </button>
              <button
                onClick={() => handleStartMigration()}
                className={`font-medium transition-all duration-500 ease-in-out flex items-center pb-1 ${activeButton === "start" ? "text-blue-600" : " text-slate-600 border-transparent hover:text-blue-500 "}`}
              >
                Start Migration
                <ChevronRight className="w-4 mt-1" />
              </button>
            </div>
          )}

          {/* Logout Button */}
          <>
            {userName ? (
              <div
                className={`flex items-center ${hideLogout ? "hidden" : ""}`}
              >
                <h2 className="text-lg font-normal text-gray-800 mx-3">
                  <span className="capitalize">
                    Hi,{" "}
                    {userName?.length > 10
                      ? userName?.substring(0, 10) + "..."
                      : userName || "User"}
                  </span>
                </h2>
                <div className="mt-0.5">{!hideLogout && <Logout />}</div>
              </div>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="secondary"
                  className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg ${hideLogout ? "hidden" : ""}`}
                >
                  Login
                </Button>
              </>
            )}
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
