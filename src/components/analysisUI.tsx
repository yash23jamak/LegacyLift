import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { mockAnalysisData } from "@/lib/mockdata";
import { AnalysisData } from "@/lib/analysis";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  Database,
  Rocket,
  Shield,
  Sparkles,
  TrendingUp,
  Zap,
  Brain,
  AlertTriangle,
  Target,
  Clock,
  Award,
  FileCode,
  Settings,
  XCircle,
  Info,
  ArrowDown,
  FolderTree,
  Boxes,
  CalendarClock,
  Workflow,
  MemoryStick,
  Activity,
  Search,
  Network,
  ArrowRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export interface AnalysisPageProps {
  ananlysisAPIData: string | AnalysisData;
}

const AnalysisPage = () => {
  const [data, setData] = useState<AnalysisData | null>(null);
  // console.log("data: ", data);
  const location = useLocation();
  const { ananlysisAPIData } = location.state || {};
  // console.log(ananlysisAPIData, "ananlysisAPIData");

  useEffect(() => {
    if (ananlysisAPIData) {
      // console.log("Received analysis API data:", ananlysisAPIData);
      try {
        if (typeof ananlysisAPIData === "string") {
          const parsed = JSON.parse(ananlysisAPIData);
          setData(parsed);
        } else {
          // If it's already an object, no need to parse
          setData(ananlysisAPIData);
        }
      } catch (error) {
        console.error("Failed to parse analysis API data:", error);
      }
    }
  }, [ananlysisAPIData]);

  const [activeMetric, setActiveMetric] = useState(0);
  const [scrollY, setScrollY] = useState(0);

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

  const getComplexityColor = (score: number) => {
    if (score <= 3) return "from-emerald-400 to-teal-500";
    if (score <= 6) return "from-amber-400 to-orange-500";
    return "from-rose-400 to-pink-500";
  };

  const getRiskColor = (level: string) => {
    if (level === "Low") return "from-emerald-400 to-teal-500";
    if (level === "Medium") return "from-amber-400 to-orange-500";
    return "from-rose-400 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 overflow-x-hidden">
      {/* Floating Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* <div
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-300/30 to-blue-400/30 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div
          className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-pink-300/30 to-rose-400/30 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-br from-yellow-300/30 to-amber-400/30 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-300/20 to-indigo-400/20 rounded-full blur-2xl"
          style={{ transform: `translateY(${scrollY * 0.25}px)` }}
        /> */}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 space-y-16">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-2 border-cyan-500/20 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
              <Brain className="w-5 h-5 text-cyan-600 animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                AI-Powered Legacy Code Analysis
              </span>
            </div>

            <h1 className="text-7xl md:text-8xl font-black leading-none">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {data?.project?.name}
              </span>
            </h1>

            <p className="text-2xl text-blue-600 font-medium leading-relaxed">
              Comprehensive analysis and migration strategy for your{" "}
              <span className="font-bold text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text">
                {data?.project?.language}
              </span>{" "}
              legacy codebase
            </p>

            <div className="flex flex-wrap gap-3">
              <Badge className="px-4 py-2 text-base !bg-transparent !hover:bg-transparent border-cyan-500 text-cyan-700 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                <Code2 className="w-4 h-4 mr-2" />
                {data?.project?.language}
              </Badge>
              <Badge className="px-4 py-2 text-base !bg-transparent !hover:bg-transparent border-pink-500 text-pink-700 hover:shadow-lg hover:shadow-pink-500/50 transition-all">
                <FileCode className="w-4 h-4 mr-2" />
                {data?.project?.files} Files
              </Badge>
              <Badge className="px-4 py-2 text-base !bg-transparent !hover:bg-transparent border-yellow-500 text-yellow-700 hover:shadow-lg hover:shadow-yellow-500/50 transition-all">
                <Database className="w-4 h-4 mr-2" />
                {data?.project?.size_kb} KB
              </Badge>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative">
              <div className="relative h-80 perspective-1000">
                {[
                  {
                    icon: Code2,
                    value: data?.project?.files,
                    label: "Files",
                    color: "from-cyan-500 to-blue-500",
                    bg: "from-cyan-50 to-blue-50",
                  },
                  {
                    icon: Activity,
                    value: data?.analysis?.complexity_score,
                    label: "Complexity",
                    color: "from-purple-500 to-pink-500",
                    bg: "from-purple-50 to-pink-50",
                  },
                  {
                    icon: Database,
                    value: data?.dependencies?.total,
                    label: "Dependencies",
                    color: "from-yellow-500 to-orange-500",
                    bg: "from-yellow-50 to-orange-50",
                  },
                  {
                    icon: Shield,
                    value: data?.vulnerabilities?.count,
                    label: "Vulnerabilities",
                    color: "from-emerald-500 to-teal-500",
                    bg: "from-emerald-50 to-teal-50",
                  },
                ].map((metric, idx) => {
                  const Icon = metric.icon;
                  const isActive = activeMetric === idx;
                  return (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-all duration-700 ${
                        isActive
                          ? "opacity-100 scale-100 rotate-0"
                          : "opacity-0 scale-90 rotate-12"
                      }`}
                    >
                      <Card
                        className={`h-full bg-gradient-to-br ${metric.bg} border-2 border-white shadow-2xl hover:shadow-3xl transition-all duration-500`}
                      >
                        <CardContent className="h-full flex flex-col items-center justify-center p-8 space-y-4">
                          <div
                            className={`p-6 rounded-3xl bg-gradient-to-br ${metric.color} shadow-lg`}
                          >
                            <Icon className="w-16 h-16 text-white" />
                          </div>
                          <div
                            className={`text-8xl font-black bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`}
                          >
                            {metric.value}
                          </div>
                          <p className="text-2xl font-bold text-gray-700">
                            {metric.label}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Sections with Tabs */}
        <Card className="bg-white/80 backdrop-blur-xl border-2 border-cyan-200 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent pb-2">
              Detailed Code Analysis
            </CardTitle>
            <CardDescription className="text-lg">
              Comprehensive breakdown of your legacy codebase structure and
              quality metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hierarchy" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 bg-gradient-to-r from-cyan-50 to-blue-50">
                <TabsTrigger
                  value="hierarchy"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
                >
                  <FolderTree className="w-4 h-4 mr-2" />
                  Hierarchy
                </TabsTrigger>
                <TabsTrigger
                  value="modularity"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-rose-500 data-[state=active]:text-white"
                >
                  <Boxes className="w-4 h-4 mr-2" />
                  Modularity
                </TabsTrigger>
                <TabsTrigger
                  value="outdated"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500 data-[state=active]:to-amber-500 data-[state=active]:text-white"
                >
                  <CalendarClock className="w-4 h-4 mr-2" />
                  Outdated
                </TabsTrigger>
                <TabsTrigger
                  value="patterns"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                >
                  <Workflow className="w-4 h-4 mr-2" />
                  Patterns
                </TabsTrigger>
                <TabsTrigger
                  value="state"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
                >
                  <MemoryStick className="w-4 h-4 mr-2" />
                  State Mgmt
                </TabsTrigger>
              </TabsList>

              <TabsContent value="hierarchy" className="space-y-4 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-200">
                  <h3 className="text-2xl font-black text-cyan-700 mb-3 flex items-center gap-2">
                    <FolderTree className="w-6 h-6" />
                    Component Hierarchy Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {data?.analysis?.component_hierarchy.summary}
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-rose-500" />
                      Identified Issues
                    </h4>
                    {data?.analysis?.component_hierarchy.issues.map(
                      (issue, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-rose-200"
                        >
                          <XCircle className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">
                            {issue}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-cyan-500" />
                      Examples
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.analysis?.component_hierarchy.examples.map(
                        (example, idx) => (
                          <Badge
                            key={idx}
                            className="px-3 py-1.5 bg-cyan-100 text-cyan-700 border-2 border-cyan-300"
                          >
                            {example}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="modularity" className="space-y-4 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-200">
                  <h3 className="text-2xl font-black text-pink-700 mb-3 flex items-center gap-2">
                    <Boxes className="w-6 h-6" />
                    Modularity Assessment
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {data?.analysis?.modularity.summary}
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                      Modularity Issues
                    </h4>
                    {data?.analysis?.modularity.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-orange-200"
                      >
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">
                          {issue}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-pink-500" />
                      Affected Files
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.analysis?.modularity.examples.map(
                        (example, idx) => (
                          <Badge
                            key={idx}
                            className="px-3 py-1.5 bg-pink-100 text-pink-700 border-2 border-pink-300"
                          >
                            {example}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="outdated" className="space-y-4 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200">
                  <h3 className="text-2xl font-black text-yellow-700 mb-3 flex items-center gap-2">
                    <CalendarClock className="w-6 h-6" />
                    Outdated Code Detection
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {data?.analysis?.outdated_code.summary}
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                      Legacy Technology Issues
                    </h4>
                    {data?.analysis?.outdated_code.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="relative pl-6 pb-4 border-l-4 border-yellow-300 last:pb-0"
                      >
                        <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-gradient-to-br from-yellow-500 to-amber-500 border-4 border-white shadow-lg" />
                        <p className="text-gray-700 font-medium">{issue}</p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-yellow-500" />
                      Files with Outdated Code
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.analysis?.outdated_code.examples.map(
                        (example, idx) => (
                          <Badge
                            key={idx}
                            className="px-3 py-1.5 bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                          >
                            {example}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="patterns" className="space-y-4 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200">
                  <h3 className="text-2xl font-black text-orange-700 mb-3 flex items-center gap-2">
                    <Workflow className="w-6 h-6" />
                    Mixed Patterns Analysis
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {data?.analysis?.mixed_patterns.summary}
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Pattern Violations
                    </h4>
                    {data?.analysis?.mixed_patterns.issues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-red-200"
                      >
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">
                          {issue}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-orange-500" />
                      Code Examples
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.analysis?.mixed_patterns.examples.map(
                        (example, idx) => (
                          <Badge
                            key={idx}
                            className="px-3 py-1.5 bg-orange-100 text-orange-700 border-2 border-orange-300"
                          >
                            {example}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="state" className="space-y-4 mt-6">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
                  <h3 className="text-2xl font-black text-purple-700 mb-3 flex items-center gap-2">
                    <MemoryStick className="w-6 h-6" />
                    Legacy State Management
                  </h3>

                  <div className="flex items-center gap-3 mb-4 p-4 rounded-xl bg-white border-2 border-purple-300">
                    {data?.analysis?.legacy_state_management.present ? (
                      <>
                        <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-purple-700">
                            Legacy State Management Detected
                          </p>
                          <p className="text-sm text-gray-600">
                            Requires modernization
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        <div>
                          <p className="font-bold text-emerald-700">
                            Modern State Management
                          </p>
                          <p className="text-sm text-gray-600">
                            No legacy patterns detected
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <Info className="w-5 h-5 text-purple-500" />
                      Description
                    </h4>
                    <div className="p-4 rounded-xl bg-white border-2 border-purple-200">
                      <p className="text-gray-700">
                        {data?.analysis?.legacy_state_management.description}
                      </p>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-800 flex items-center gap-2">
                      <FileCode className="w-5 h-5 text-purple-500" />
                      Implementation Examples
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {data?.analysis?.legacy_state_management.examples.map(
                        (example, idx) => (
                          <Badge
                            key={idx}
                            className="px-3 py-1.5 bg-purple-100 text-purple-700 border-2 border-purple-300"
                          >
                            {example}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Complexity Score */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20">
            <CardContent className="flex flex-col items-center justify-center h-full p-8 space-y-6">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-purple-100"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${
                      (data?.analysis?.complexity_score / 100) * 553
                    } 553`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className={`text-6xl font-black bg-gradient-to-br ${getComplexityColor(
                        data?.analysis?.complexity_score
                      )} bg-clip-text text-transparent`}
                    >
                      {data?.analysis?.complexity_score}
                    </div>
                    <p className="text-sm font-bold text-gray-500">/ 100</p>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-800">
                  Complexity Score
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {data?.analysis?.complexity_score <= 3
                    ? "Low complexity"
                    : data?.analysis?.complexity_score <= 6
                    ? "Medium complexity"
                    : "High complexity"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Dependencies Summary */}
          <Card className="bg-white/80 backdrop-blur-xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-blue-700 flex items-center gap-2">
                <Database className="w-6 h-6" />
                Dependencies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <p className="text-3xl font-black text-blue-600">
                    {data?.dependencies?.total}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Total</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
                  <p className="text-3xl font-black text-orange-600">
                    {data?.dependencies?.outdated}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Outdated</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200">
                  <p className="text-3xl font-black text-red-600">
                    {data?.dependencies?.vulnerable}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Vulnerable</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vulnerabilities */}
          <Card className="bg-white/80 backdrop-blur-xl border-2 border-emerald-200 hover:border-emerald-400 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/20">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-emerald-700 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
                <div
                  className={`text-5xl font-black bg-gradient-to-br ${getRiskColor(
                    data?.vulnerabilities?.risk_level
                  )} bg-clip-text text-transparent mb-2`}
                >
                  {data?.vulnerabilities?.count}
                </div>
                <p className="text-sm text-gray-600">Vulnerabilities Found</p>
                <Badge
                  className={`mt-3 px-4 py-1.5 bg-gradient-to-r ${getRiskColor(
                    data?.vulnerabilities?.risk_level
                  )} text-white border-0`}
                >
                  {data?.vulnerabilities?.risk_level} Risk
                </Badge>
              </div>
              {data?.vulnerabilities?.details.length > 0 && (
                <div className="space-y-2">
                  {data?.vulnerabilities?.details.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-gray-700"
                    >
                      {detail}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dependencies Detail */}
        <Card className="bg-white/80 backdrop-blur-xl border-2 border-blue-200 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-black bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent pb-2">
              Dependency Analysis
            </CardTitle>
            <CardDescription className="text-lg">
              Detailed breakdown of project dependencies and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              {data?.dependencies?.list.map((dep, idx) => (
                <Card
                  key={idx}
                  className="group bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 hover:border-blue-400 transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-2xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">
                          {dep.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className="!bg-transparent !hover:bg-transparent border-gray-700 text-gray-700">
                            v{dep.version}
                          </Badge>
                          <Badge
                            className={`${
                              dep.status === "outdated"
                                ? "bg-gradient-to-r from-orange-500 to-amber-500"
                                : "bg-gradient-to-r from-emerald-500 to-teal-500"
                            } text-white border-0 shadow-md`}
                          >
                            {dep.status}
                          </Badge>
                        </div>
                      </div>
                      <Database className="w-12 h-12 text-blue-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <h4 className="font-bold text-gray-700 flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-orange-500" />
                      Known Issues
                    </h4>
                    {dep.issues.map((issue, issueIdx) => (
                      <div
                        key={issueIdx}
                        className="flex items-start gap-3 p-3 rounded-xl bg-white border-2 border-orange-200"
                      >
                        <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">
                          {issue}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Migration Strategy */}
        <Card className="bg-white/80 backdrop-blur-xl border-2 border-emerald-200 shadow-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent pb-2">
                  Migration Strategy
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Recommended path to {data?.migration?.recommended_framework}
                </CardDescription>
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-xl">
                <Rocket className="w-12 h-12 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
              <h3 className="text-xl font-black text-emerald-700 mb-3">
                Overview
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data?.migration?.strategy.overview}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-emerald-700 flex items-center gap-2">
                    <CheckCircle2 className="w-7 h-7" />
                    Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data?.migration?.strategy.benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-emerald-200 hover:border-emerald-400 transition-all hover:scale-[1.02]"
                    >
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-black text-orange-700 flex items-center gap-2">
                    <AlertTriangle className="w-7 h-7" />
                    Risks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data?.migration?.strategy.risks.map((risk, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-orange-200 hover:border-orange-400 transition-all hover:scale-[1.02]"
                    >
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                        <AlertTriangle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{risk}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-300">
              <CardHeader>
                <CardTitle className="text-2xl font-black text-blue-700 flex items-center gap-2">
                  <Settings className="w-7 h-7" />
                  Technical Considerations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {data?.migration?.strategy.technical_considerations.map(
                  (consideration, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-400 transition-all hover:scale-[1.02]"
                    >
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Info className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {consideration}
                      </span>
                    </div>
                  )
                )}
              </CardContent>
            </Card>

            {/* Previous Code */}
            {/* <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
              <h3 className="text-xl font-black text-purple-700 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Suggested Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {data?.migration?.suggested_tools.map((tool, idx) => (
                  <Badge
                    key={idx}
                    className="px-4 py-2 text-base bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div> */}

            {/* Latest Code */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
              <h3 className="text-xl font-black text-purple-700 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Suggested Tools & Technologies
              </h3>
              <div className="flex flex-wrap gap-3">
                {data?.migration?.suggested_tools.map((tool, idx) => (
                  <Badge
                    key={idx}
                    className="px-4 py-2 text-base bg-gradient-to-r from-purple-100 to-indigo-100 text-gray-700 border border-purple-200 shadow-md hover:bg-gradient-to-r hover:from-purple-200 hover:to-indigo-200 hover:shadow-lg hover:scale-105 transition-all"
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Phases */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent pb-2">
              Migration Phases
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Step-by-step roadmap to successfully migrate your legacy codebase
            </p>
          </div>

          <div className="space-y-0">
            {data?.migration?.phases &&
              data?.migration?.phases.map((phase, idx) => (
                <div key={idx}>
                  <Card className="group bg-white/80 backdrop-blur-xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                    <CardContent className="relative p-8">
                      <div className="flex items-start gap-6">
                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                          <span className="text-4xl font-black text-gray-700">
                            {idx + 1}
                          </span>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-3xl font-black text-gray-800 mb-2">
                                {phase.name}
                              </h3>
                              <p className="text-gray-600 text-lg">
                                {phase.description}
                              </p>
                            </div>
                            <Badge className="px-4 py-2 text-base bg-gradient-to-r from-pink-100 to-pink-200 text-gray-700 border border-pink-200 shadow-md whitespace-nowrap hover:bg-gradient-to-r hover:from-pink-200 hover:to-pink-300 transition-all">
                              <Clock className="w-4 h-4 mr-2" />
                              {phase.estimated_time_weeks} weeks
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="font-bold text-gray-700">
                                Progress
                              </span>
                              <span className="font-black text-purple-600">
                                {phase.progress_percent}%
                              </span>
                            </div>
                            <Progress
                              value={phase.progress_percent}
                              className="h-3"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 pt-2">
                            <div>
                              <p className="text-sm font-bold text-gray-500 mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Deliverables
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {phase.deliverables.map((deliverable, dIdx) => (
                                  <Badge
                                    key={dIdx}
                                    className="px-3 py-1.5 !bg-transparent !hover:bg-transparent border-blue-500 text-blue-700 hover:shadow-md transition-all"
                                  >
                                    {deliverable}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-500 mb-2 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Tools Used
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {phase.tools_used.map((tool, tIdx) => (
                                  <Badge
                                    key={tIdx}
                                    className="px-3 py-1.5 !bg-transparent !hover:bg-transparent border-emerald-500 text-emerald-700 hover:shadow-md transition-all"
                                  >
                                    {tool}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {idx < data?.migration?.phases.length - 1 && (
                    <div className="flex justify-center -my-3 relative z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-purple-300"></div>
                        <div className="p-2.5 rounded-full bg-white border-4 border-purple-400 shadow-xl">
                          <ArrowDown className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-300 to-purple-400"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Overall Progress Old Code */}
          {/* <Card className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-white">
                  <p className="text-sm font-bold opacity-90 mb-1">
                    OVERALL MIGRATION PROGRESS
                  </p>
                  <h3 className="text-5xl font-black">
                    {Math.round(
                      (data?.progress?.completed_phases /
                        data?.progress?.total_phases) *
                        100
                    )}
                    %
                  </h3>
                  <p className="text-white/90 mt-2 text-lg">
                    {data?.progress?.completed_phases} of{" "}
                    {data?.progress?.total_phases} phases completed
                  </p>
                </div>
                <Award className="w-20 h-20 text-white/80" />
              </div>
              <Progress
                value={
                  (data?.progress?.completed_phases /
                    data?.progress?.total_phases) *
                  100
                }
                className="h-6 bg-white/20"
              />
              <div className="mt-6 space-y-2">
                <p className="text-white/90 font-bold">Milestones</p>
                <div className="flex flex-wrap gap-2">
                  {data?.progress?.milestones.map((milestone, idx) => (
                    <Badge
                      key={idx}
                      className="px-3 py-1.5 bg-white/20 text-white border-2 border-white/30 hover:bg-white/30 transition-all"
                    >
                      {milestone}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* New Design changes  */}
          <Card className="bg-gradient-to-r from-indigo-200 via-sky-200 to-teal-200 border-0 shadow-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-gray-800">
                  <p className="text-sm font-bold opacity-90 mb-1">
                    OVERALL MIGRATION PROGRESS
                  </p>
                  <h3 className="text-5xl font-black">
                    {Math.round(
                      (data?.progress?.completed_phases /
                        data?.progress?.total_phases) *
                        100
                    )}
                    %
                  </h3>
                  <p className="text-gray-700 mt-2 text-lg">
                    {data?.progress?.completed_phases} of{" "}
                    {data?.progress?.total_phases} phases completed
                  </p>
                </div>
                <Award className="w-20 h-20 text-gray-500" />
              </div>
              <Progress
                value={
                  (data?.progress?.completed_phases /
                    data?.progress?.total_phases) *
                  100
                }
                className="h-6 bg-gray-300"
              />
              <div className="mt-6 space-y-2">
                <p className="text-gray-700 font-bold">Milestones</p>
                <div className="flex flex-wrap gap-2">
                  {data?.progress?.milestones.map((milestone, idx) => (
                    <Badge
                      key={idx}
                      className="px-3 py-1.5 bg-gray-200 text-gray-800 border border-gray-300 hover:bg-gray-300 transition-all"
                    >
                      {milestone}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Tools Analysis */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-2 border-cyan-500/20">
              <Brain className="w-5 h-5 text-cyan-600 animate-pulse" />
              <span className="text-sm font-bold text-cyan-600">
                AI-Powered Analysis
              </span>
            </div>
            <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent pb-2">
              Analysis Engine
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced AI tools used to analyze and evaluate your legacy
              codebase
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Legacy Analysis */}
            <Card className="group bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 hover:border-cyan-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Search className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-cyan-100 text-cyan-700 border-2 border-cyan-300">
                    AI Tool
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-gray-800">
                  Legacy Analysis
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border-2 border-cyan-200">
                    <p className="text-sm font-bold text-gray-500 mb-2">
                      Method
                    </p>
                    <p className="text-gray-700">
                      {data?.ai_tools?.legacy_analysis.method}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Key Findings
                    </p>
                    {data?.ai_tools?.legacy_analysis.findings.map(
                      (finding, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 rounded-lg bg-white border border-cyan-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-cyan-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {finding}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dependency Mapping */}
            <Card className="group bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 hover:border-purple-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Network className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 border-2 border-purple-300">
                    AI Tool
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-gray-800">
                  Dependency Mapping
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border-2 border-purple-200">
                    <p className="text-sm font-bold text-gray-500 mb-2">
                      Method
                    </p>
                    <p className="text-gray-700">
                      {data?.ai_tools?.dependency_mapping.method}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Key Findings
                    </p>
                    {data?.ai_tools?.dependency_mapping.findings.map(
                      (finding, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 rounded-lg bg-white border border-purple-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {finding}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Complexity Scoring */}
            <Card className="group bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 hover:border-yellow-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 border-2 border-yellow-300">
                    AI Tool
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-gray-800">
                  Complexity Scoring
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border-2 border-yellow-200">
                    <p className="text-sm font-bold text-gray-500 mb-2">
                      Method
                    </p>
                    <p className="text-gray-700">
                      {data?.ai_tools?.complexity_scoring.method}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border-2 border-yellow-200">
                    <p className="text-sm font-bold text-gray-500 mb-2">
                      Rationale
                    </p>
                    <p className="text-gray-700">
                      {data?.ai_tools?.complexity_scoring.rationale}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anti-Pattern Detection */}
            <Card className="group bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 hover:border-rose-400 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <Badge className="bg-rose-100 text-rose-700 border-2 border-rose-300">
                    AI Tool
                  </Badge>
                </div>
                <h3 className="text-2xl font-black text-gray-800">
                  Anti-Pattern Detection
                </h3>
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-white border-2 border-rose-200">
                    <p className="text-sm font-bold text-gray-500 mb-2">
                      Method
                    </p>
                    <p className="text-gray-700">
                      {data?.ai_tools?.anti_pattern_detection.method}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-500" />
                      Patterns Found
                    </p>
                    {data?.ai_tools?.anti_pattern_detection.patterns_found.map(
                      (pattern, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 p-3 rounded-lg bg-white border border-rose-200"
                        >
                          <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {pattern}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Migration Process */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 sm:p-16 text-center flex justify-between shadow-2xl">
          <div className="flex   items-center">
            <h2 className="text-4xl sm:text-4xl font-bold text-white ">START YOUR MIGRATION JOURNEY</h2>
          </div>
          <div>
            <Link to="/migration">
            <button className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-lg flex items-center justify-center space-x-2">
              <span>Start Migration</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        {/* <Card className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 border-0 shadow-2xl overflow-hidden">
          <div className="absolute  bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20" />
          <CardContent className="relative p-12 text-center space-y-6">
            <Rocket className="w-20 h-20 text-white mx-auto animate-bounce" />
            <h3 className="text-5xl font-black text-white">
              Ready to Transform?
            </h3>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Start your migration journey today with AI-powered analysis and
              expert guidance
            </p>
            <button className="group px-8 py-4 bg-white text-purple-600 rounded-2xl font-black text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </CardContent>
        </Card> */}
      </div>

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
