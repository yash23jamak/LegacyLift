import { useState, useEffect } from "react";

import { AnalysisData } from "@/lib/analysis";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAppContext } from "@/contexts/useContext";
import APIInterceptor from "@/lib/axiosInterceptor";
import AnalysisDetails from "@/components/AnalysisDetails";
export interface AnalysisPageProps {
  ananlysisAPIData: string | AnalysisData;
}

const AnalysisPage = () => {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [activeMetric, setActiveMetric] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const { setProjectJson, setMigrationReportJson } = useAppContext();

  const location = useLocation();

  const { ananlysisAPIData } = location.state || {};

  // API Integration For Migration Process
  const MigrationAPI = async () => {
    try {
      // for migration Report JSON
      const migrationReport = await APIInterceptor.post(
        `/analyze-project`,
        { generateMigrationReport: true },
        { headers: { "Content-Type": "application/json" } }
      );
      // for migration Project ZIP
      const response = await APIInterceptor.post(`/migration-project`, {
        headers: { "Content-Type": "application/json" },
      });

      setMigrationReportJson(migrationReport.data.report[0]);
      setProjectJson(response.data);

      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    if (ananlysisAPIData) {
      // console.log("Received analysis API data:", ananlysisAPIData);
      try {
        if (typeof ananlysisAPIData === "string") {
          const parsed = JSON.parse(ananlysisAPIData);
          setData(parsed);
        } else {
          // If it's already an object, no need to parse
          setData(ananlysisAPIData[0]);
        }
      } catch (error) {
        console.error("Failed to parse analysis API data:", error);
      }
    }
  }, [ananlysisAPIData]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none"></div>

      {/* Analysis Section Start */}
      <AnalysisDetails data={data} activeMetric={activeMetric} />

      {/* Migration Process */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 sm:p-16 text-center flex justify-between shadow-2xl">
        <div className="flex   items-center">
          <h2 className="text-4xl sm:text-4xl font-bold text-white ">
            START YOUR MIGRATION JOURNEY
          </h2>
        </div>
        <div>
          <Link to="/migration">
            <button
              onClick={() => MigrationAPI()}
              // disabled={loading}
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center space-x-2"
            >
              <span>Start Migration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      {/* Analysis Section End */}

      {/* Custom Scrollbar */}
      <style>{`
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #e0f2fe, #ddd6fe);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 6px;
          border: 2px solid #e0f2fe;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: #06b6d4 #e0f2fe;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default AnalysisPage;
