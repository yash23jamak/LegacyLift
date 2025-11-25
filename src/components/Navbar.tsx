// components/Navbar.tsx
import { ArrowRight, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logout from "./Logout";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState<string>("");
  const hideLogout =
    location.pathname === "/" || location.pathname === "/signup";

  let userName = localStorage?.getItem("userName") || "User Name";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              LegacyLift
            </span>
          </div>

          {/* Menu Items */}
          {location.pathname === "/home" && (
            <div className="flex items-center space-x-10">
              <button
                onClick={() => {
                  setActiveButton("migration");
                  document
                    .getElementById("process")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`font-medium transition-colors ${activeButton === "migration" ? "text-black underline" : "text-slate-600 hover:text-blue-600"}`}
              >
                Migration Process
              </button>
              <button
                onClick={() => {
                  setActiveButton("flow");
                  document
                    .getElementById("flowchart")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`font-medium transition-colors ${activeButton === "flow" ? "text-black underline" : "text-slate-600 hover:text-blue-600"}`}
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
                className={`font-medium transition-colors ${activeButton === "tech" ? "text-black underline" : "text-slate-600 hover:text-blue-600"}`}
              >
                Tech Stack
              </button>
              <button
                onClick={() => {
                  setActiveButton("start");
                  navigate("/upload");
                }}
                className={`font-medium transition-colors ${activeButton === "start" ? "text-blue-600 underline" : "text-slate-600 hover:text-blue-600"}`}
              >
                Start Migration
              </button>
              
            </div>
          )}

          {/* Logout Button */}
          <>
            <div className={`flex items-center ${hideLogout ? "hidden" : ""}`}>
              <h2 className="text-lg font-normal text-gray-800 mx-3">
                <span className="capitalize">
                  {userName.length > 10
                    ? userName.substring(0, 10) + "..."
                    : userName}
                </span>
              </h2>
              <div className="mt-0.5">{!hideLogout && <Logout />}</div>
            </div>
          </>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
