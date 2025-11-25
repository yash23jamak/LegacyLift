import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Upload,
  Search,
  Sparkles,
  FileCode,
  RefreshCw,
  FileCheck,
  FileText,
  Wrench,
  Download,
  Package,
} from "lucide-react";
import Cookies from "js-cookie";
import { useToast } from "@/hooks/use-toast";

function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const isAuthenticated = Cookies.get("IsToken");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleClick = () => {
    if (isAuthenticated) {
      navigate("/upload");
    } else {
      toast({
        title: "Signin Required",
        description: "Please sign in to start migration.",
        variant: "destructive",
      });
      navigate("/login");
    }
  };

  const migrationSteps = [
    {
      icon: Upload,
      title: "Step 1: Upload Your Project",
      description:
        "Upload, Select, or Drag & Drop your JSP files, folders, or repository links",
      details:
        "Supports multiple file formats including ZIP, WAR, individual JSP files, and Git repository links. Simply drag and drop or select from your system.",
      color: "from-blue-600 to-cyan-600",
    },
    {
      icon: FileCheck,
      title: "Step 2: Validation & Management",
      description:
        "Automatic validation of uploaded files with option to re-upload if needed",
      details:
        "View list of uploaded documents, manage files, and remove unwanted items. Non-JSP projects are automatically detected and prompt for re-upload.",
      color: "from-purple-600 to-pink-600",
    },
    {
      icon: Search,
      title: "Step 3: Analysis of Legacy Project",
      description: "Comprehensive AI-powered analysis of your JSP codebase",
      details:
        "Deep scan identifies components, dependencies, business logic, database connections, session management, and migration complexity score.",
      color: "from-orange-600 to-red-600",
    },
    {
      icon: FileText,
      title: "Step 4: Analysis Report",
      description: "Detailed report with manual verification from legacy code",
      details:
        "Comprehensive analysis report covering architecture patterns, potential issues, recommended migration strategy, and code quality metrics.",
      color: "from-green-600 to-teal-600",
    },
    {
      icon: RefreshCw,
      title: "Step 5: Migration to React",
      description:
        "Automated transformation from JSP to modern React application",
      details:
        "Converts JSP pages to React components using modern tech stack: React, Vite, Tailwind CSS, React Router Dom, Redux/ReactQuery, Vitest, ESLint/Prettier, and Axios.",
      color: "from-indigo-600 to-blue-600",
    },
    {
      icon: Wrench,
      title: "Step 6: Feature Mapping",
      description:
        "Map all legacy features to React modern equivalent components",
      details:
        "Every JSP feature is carefully mapped to its React equivalent, ensuring no functionality is lost during migration. Complete component library created.",
      color: "from-yellow-600 to-orange-600",
    },
    {
      icon: Package,
      title: "Step 7: Application Generation",
      description:
        "Generate complete React application with all configurations",
      details:
        "Fully structured React project with proper folder organization, routing setup, state management, API integration, and build configurations.",
      color: "from-cyan-600 to-blue-600",
    },
    {
      icon: Download,
      title: "Step 8: Download Application",
      description: "Download your production-ready React application as ZIP",
      details:
        "Complete project package with source code, dependencies, tests, documentation, and deployment instructions. Ready to run with npm install.",
      color: "from-pink-600 to-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Transform Legacy Code into Modern React Applications</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Transform Legacy JSP
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Into Modern React
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Transform your legacy JSP applications into modern, performant
              React applications with our AI-powered migration platform. Save
              months of development time and reduce costs by up to 90%.
            </p>
          </div>
        </div>
      </section>

      {/* Migration Process with Flowchart */}
      <section
        id="process"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Complete Migration Workflow</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
              End-to-End Migration Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Follow our comprehensive 8-step workflow from legacy JSP to modern
              React application
            </p>
          </div>

          {/* Detailed Steps */}
          <div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {migrationSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 ${isActive
                    ? "border-blue-400 shadow-blue-100"
                    : "border-slate-200"
                    } group`}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg z-10`}
                  >
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                    {step.description}
                  </p>
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg p-3 border border-slate-200">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {step.details}
                    </p>
                  </div>

                  {/* Flow Arrow for larger screens */}
                  {index % 4 !== 3 && index < migrationSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight
                        className={`w-6 h-6 text-blue-400 ${isActive ? "animate-pulse" : ""
                          }`}
                      />
                    </div>
                  )}

                  {/* Flow Arrow for medium screens */}
                  {index % 2 !== 1 && index < migrationSteps.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight
                        className={`w-6 h-6 text-blue-400 ${isActive ? "animate-pulse" : ""
                          }`}
                      />
                    </div>
                  )}

                  {/* Flow Arrow for mobile screens */}
                  {index < migrationSteps.length - 1 && (
                    <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                      <ArrowRight
                        className={`w-6 h-6 text-blue-400 rotate-90 ${isActive ? "animate-pulse" : ""
                          }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Flowchart Image */}
          <div className="mt-16 bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Migration Flow Diagram
              </h3>
              <p className="text-slate-600">
                Visual representation of the complete migration workflow
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-6 flex items-center justify-center overflow-auto">
              <img
                src="/Xccelerator.drawio.svg"
                alt="JSP to React Migration Flowchart"
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Tech Stack Overview */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
              Modern Tech Stack Used
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                <h4 className="font-bold text-slate-900 mb-2">Framework</h4>
                <p className="text-slate-600 text-sm">React 19+</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h4 className="font-bold text-slate-900 mb-2">Build Tool</h4>
                <p className="text-slate-600 text-sm">Vite</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                <h4 className="font-bold text-slate-900 mb-2">Styling</h4>
                <p className="text-slate-600 text-sm">Tailwind CSS</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <h4 className="font-bold text-slate-900 mb-2">Routing</h4>
                <p className="text-slate-600 text-sm">React Router Dom</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-200">
                <h4 className="font-bold text-slate-900 mb-2">
                  State Management
                </h4>
                <p className="text-slate-600 text-sm">Redux / ReactQuery</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-bold text-slate-900 mb-2">Testing</h4>
                <p className="text-slate-600 text-sm">Vitest</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                <h4 className="font-bold text-slate-900 mb-2">Code Quality</h4>
                <p className="text-slate-600 text-sm">ESLint / Prettier</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
                <h4 className="font-bold text-slate-900 mb-2">HTTP Client</h4>
                <p className="text-slate-600 text-sm">Axios / Interceptor</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 sm:p-16 text-center shadow-2xl">
            <FileCode className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Modernize Your Application?
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of companies that have successfully migrated to
              React. Get started with a free analysis of your JSP project today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button onClick={handleClick} className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center space-x-2" >
                <span>Start Free Migration</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}

export default Home;
