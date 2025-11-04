import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Upload,
  Search,
  Zap,
  CheckCircle,
  Code2,
  BarChart3,
  Shield,
  Clock,
  Users,
  Sparkles,
  ChevronRight,
  FileCode,
  RefreshCw,
  Rocket,
  FileCheck,
  AlertTriangle,
  Trash2,
  Play,
  FileText,
  Wrench,
  Download,
  Package,
} from "lucide-react";

function Home() {
  const [activeStep, setActiveStep] = useState(0);

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
                  className={`relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border-2 ${
                    isActive
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
                        className={`w-6 h-6 text-blue-400 ${
                          isActive ? "animate-pulse" : ""
                        }`}
                      />
                    </div>
                  )}

                  {/* Flow Arrow for medium screens */}
                  {index % 2 !== 1 && index < migrationSteps.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight
                        className={`w-6 h-6 text-blue-400 ${
                          isActive ? "animate-pulse" : ""
                        }`}
                      />
                    </div>
                  )}

                  {/* Flow Arrow for mobile screens */}
                  {index < migrationSteps.length - 1 && (
                    <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                      <ArrowRight
                        className={`w-6 h-6 text-blue-400 rotate-90 ${
                          isActive ? "animate-pulse" : ""
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

      {/* Migration Process - Design 3: Neomorphism with Soft Shadows */}
      {/* <section id="process" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-100 via-blue-50 to-slate-100 relative overflow-hidden">
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-16">
      <div className="inline-flex items-center space-x-2 bg-slate-100 text-blue-700 px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-inner border border-slate-200">
        <Sparkles className="w-4 h-4" />
        <span>Soft UI Migration Experience</span>
      </div>
      <h2 className="text-5xl sm:text-6xl font-black text-slate-800 mb-6 leading-tight">
        <span className="relative">
          Smooth & Seamless
        </span>
        <br />
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Migration Flow
        </span>
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
        Experience the softest, most intuitive migration process with our neomorphic design
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {migrationSteps.map((step, index) => {
        const Icon = step.icon;
        const isActive = activeStep === index;
        const isEven = index % 2 === 0;
        
        return (
          <div
            key={index}
            onMouseEnter={() => setActiveStep(index)}
            className={`relative group ${isEven ? 'md:mt-0' : 'md:mt-16'} transition-all duration-700`}
          >
            <div className={`relative bg-slate-100 rounded-3xl p-8 transition-all duration-700 ${
              isActive
                ? 'shadow-[inset_-8px_-8px_16px_rgba(255,255,255,0.8),inset_8px_8px_16px_rgba(0,0,0,0.1)] scale-105'
                : 'shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.8)] hover:shadow-[12px_12px_24px_rgba(0,0,0,0.15),-12px_-12px_24px_rgba(255,255,255,0.9)]'
            }`}>
              
              <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl transition-all duration-700 ${
                isActive
                  ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[4px_4px_8px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)] scale-110'
                  : 'bg-gradient-to-br from-slate-400 to-slate-500 shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.6)]'
              }`}>
                {index + 1}
              </div>

              <div className="relative mb-8">
                <div className={`w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-700 ${
                  isActive
                    ? 'bg-slate-100 shadow-[inset_-6px_-6px_12px_rgba(255,255,255,0.8),inset_6px_6px_12px_rgba(0,0,0,0.1)]'
                    : 'bg-slate-100 shadow-[6px_6px_12px_rgba(0,0,0,0.1),-6px_-6px_12px_rgba(255,255,255,0.8)] group-hover:shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]'
                }`}>
                  <Icon className={`w-12 h-12 transition-all duration-700 ${
                    isActive ? 'text-blue-600 scale-110' : 'text-slate-600 group-hover:text-blue-600'
                  }`} />
                </div>
                
                {isActive && (
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-xl animate-pulse"></div>
                )}
              </div>

              <div className="space-y-6">
                <h3 className={`text-2xl font-bold transition-colors duration-500 ${
                  isActive ? 'text-slate-900' : 'text-slate-800 group-hover:text-slate-900'
                }`}>
                  {step.title}
                </h3>
                
                <p className={`text-base leading-relaxed transition-colors duration-500 ${
                  isActive ? 'text-slate-700' : 'text-slate-600 group-hover:text-slate-700'
                }`}>
                  {step.description}
                </p>
                
                <div className={`relative bg-slate-100 rounded-2xl p-6 transition-all duration-500 ${
                  isActive 
                    ? 'shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.8),inset_4px_4px_8px_rgba(0,0,0,0.1)]' 
                    : 'shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.8)] group-hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.1)]'
                }`}>
                  <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-blue-700' : 'text-slate-600 group-hover:text-blue-700'
                  }`}>
                    {step.details}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-600">Completion</span>
                    <span className={`text-sm font-bold transition-colors duration-500 ${
                      isActive ? 'text-blue-600' : 'text-slate-400'
                    }`}>
                      {isActive ? '100%' : '0%'}
                    </span>
                  </div>
                  <div className="relative h-4 bg-slate-100 rounded-full shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1),inset_-2px_-2px_4px_rgba(255,255,255,0.8)] overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-[2px_2px_4px_rgba(0,0,0,0.2)] transition-all duration-1000 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {index < migrationSteps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-12 transform -translate-y-1/2">
                <div className={`w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center transition-all duration-500 ${
                  isActive 
                    ? 'shadow-[inset_-3px_-3px_6px_rgba(255,255,255,0.8),inset_3px_3px_6px_rgba(0,0,0,0.1)]' 
                    : 'shadow-[3px_3px_6px_rgba(0,0,0,0.1),-3px_-3px_6px_rgba(255,255,255,0.8)] hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.1)]'
                }`}>
                  <ArrowRight className={`w-5 h-5 transition-colors duration-500 ${
                    isActive ? 'text-blue-600' : 'text-slate-600'
                  }`} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div className="mt-20 max-w-4xl mx-auto">
      <div className="bg-slate-100 rounded-3xl p-8 shadow-[12px_12px_24px_rgba(0,0,0,0.1),-12px_-12px_24px_rgba(255,255,255,0.8)]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Soft Migration Dashboard</h3>
            <p className="text-slate-700">Experience the smoothest migration interface</p>
          </div>
          
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                {Math.round(((activeStep + 1) / migrationSteps.length) * 100)}%
              </div>
              <div className="text-sm text-slate-600">Soft Progress</div>
            </div>
            
            <div className="flex space-x-4">
              {migrationSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`w-6 h-6 rounded-full transition-all duration-500 ${
                    index <= activeStep 
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-[2px_2px_4px_rgba(0,0,0,0.2),-2px_-2px_4px_rgba(255,255,255,0.8)] scale-110' 
                      : 'bg-slate-100 shadow-[2px_2px_4px_rgba(0,0,0,0.1),-2px_-2px_4px_rgba(255,255,255,0.8)] hover:shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.8),inset_1px_1px_2px_rgba(0,0,0,0.1)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}

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
              <Link to="upload">
                <button className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center space-x-2">
                  <span>Start Free Migration</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
