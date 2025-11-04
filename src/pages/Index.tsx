import { useContext, useState } from "react";
import { CheckCircle, Brain, Zap, Target } from "lucide-react";
import { FileUploadZone } from "@/components/FileUploadZone";
import { useToast } from "@/hooks/use-toast";
import { ANALYSIS_PROMPT, REPO_ANALYSIS_PROMPT } from "@/prompt/analysisPrompt";
import { Card } from "@/components/ui/card";
import { useAppContext } from "@/contexts/useContext";


const Index = () => {
  const [filesContent, setFilesContent] = useState<
    Array<{ name: string; content: string }>
  >([]);
  const [convertedCode, setConvertedCode] = useState();
  const [isReportData, setIsReportData] = useState(false);
  const [analysisReport, setAnalysisReport] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { setuploadedFileContext } = useAppContext();
  // API Credentials
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiModal = import.meta.env.VITE_AI_MODAL;

  const handleFileUpload = async (files: File[]) => {
    const contents: Array<{ name: string; content: string }> = [];

    for (const file of files) {
      const text = await file.text();
      contents.push({ name: file.name, content: text });
    }
    setFilesContent(contents);
    await analyzeProject(contents);
  };

  const analyzeProject = async (
    files: Array<{ name: string; content: string }>
  ) => {
    setLoading(true);

    const combinedContent = files
      .map((f) => `File: ${f.name}\n${f.content}`)
      .join("\n\n");

    const prompt = `${ANALYSIS_PROMPT}
    Project Files:
${combinedContent}
`;

setuploadedFileContext(combinedContent);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "",
          "X-Title": "JSP Analyzer",
        },
        body: JSON.stringify({
          model: `${apiModal}`,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("data: ", data);
      const resultContent =
        data.choices?.[0]?.message?.content || "Analysis failed.";
      const [report, ...codeParts] = resultContent.split("```");
      setAnalysisReport(report.trim());

      setIsReportData(true)

      let jsonString = codeParts.join("```").trim();
      jsonString = jsonString
        .replace(/^json\s*/i, "")
        .replace(/```/g, "")
        .trim();
      setConvertedCode(jsonString);

      toast({
        title: "Analysis Complete!",
        description: "Your JSP project has been successfully analyzed.",
      });
    } catch (error) {
      console.error("Error analyzing project:", error);
      setAnalysisReport(
        "Error during analysis. Please check your API configuration."
      );
      setConvertedCode("");

      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description:
          "There was an error analyzing your project. Please try again.",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  const analyzeRepo = async (repoUrl: string) => {
    setLoading(true);
    try {
      const isLikelyJspRepo = repoUrl.toLowerCase().includes("jsp");

      if (!isLikelyJspRepo) {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description:
            "The repository does not appear to contain JSP-related files. Please provide a valid JSP project repository."
        });
        setLoading(false);
        return;
      }

      const prompt = `${REPO_ANALYSIS_PROMPT(repoUrl)}`;
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "",
            "X-Title": "JSP Analyzer",
          },
          body: JSON.stringify({
            model: `${apiModal}`,
            messages: [{ role: "user", content: prompt }],
          }),
        });

        console.log("Response from repo analysis: ", response);

        if (!response.ok) {
          throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("data: ", data);
        const resultContent =
          data.choices?.[0]?.message?.content || "Analysis failed.";
        const [report, ...codeParts] = resultContent.split("```");
        console.log("Report: ", report);
        setAnalysisReport(report.trim());

        setIsReportData(true)

        let jsonString = codeParts.join("```").trim();
        jsonString = jsonString
          .replace(/^json\s*/i, "")
          .replace(/```/g, "")
          .trim();
        setConvertedCode(jsonString);

        toast({
          title: "Analysis Complete!",
          description: "Your JSP project has been successfully analyzed.",
        });

      } catch (error) {
        console.error("Error analyzing repo:", error);
        toast({
          variant: "destructive",
          title: "Repo Analysis Failed",
          description: "Could not fetch or analyze the repository. Due to Too Many Requests error from Analysis API.",
        });
      }
    } catch (error) {
      console.error("Error analyzing project:", error);
      setAnalysisReport(
        "Error during analysis. Please check your API configuration."
      );
      setConvertedCode("");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }

  return (
    <div className="min-h-screen container mx-auto pb-12">
      {/* Header */}
      <header className="bg-card border-b border-border backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg animate-gradient">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Frontend Migration Accelerator</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Legacy Modernization Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg border border-green-200 shadow-sm">
            <Zap className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">AI Active</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="text-center mb-16 pt-12 bg-gradient-to-b from-muted/30 to-transparent rounded-xl">
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 shadow-2xl animate-gradient">
          <Brain className="w-16 h-16 text-primary-foreground" />
        </div>
        <h2 className="text-5xl font-extrabold text-foreground mb-4 tracking-tight">
          Transform Your Legacy Frontend
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Upload your legacy codebase and let our AI-powered platform guide you through a systematic
          5-phase modernization process with intelligent automation and expert recommendations.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-16 px-6">
        {[
          {
            title: 'AI-Powered Analysis',
            desc: 'Advanced pattern recognition and complexity assessment using machine learning models',
            icon: Brain,
            color: 'from-blue-500 to-indigo-500'
          },
          {
            title: 'Automated Transformation',
            desc: 'Intelligent code conversion with context-aware refactoring and modernization',
            icon: Zap,
            color: 'from-purple-500 to-pink-500'
          },
          {
            title: 'Guided Migration',
            desc: 'Step-by-step process with real-time insights and risk mitigation strategies',
            icon: Target,
            color: 'from-green-500 to-emerald-500'
          }
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card
              key={index}
              className="p-8 backdrop-blur-lg bg-white/70 hover:bg-white shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl border border-border hover:scale-105"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${item.color} shadow-md animate-gradient`}
              >
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 space-y-8">
        {/* File Upload */}
        <FileUploadZone
          onFilesUpload={handleFileUpload}
          onGithubAnalyze={analyzeRepo}
          uploadedFiles={filesContent}
          isLoading={loading}
          isReportData={isReportData}
          ananlysisAPIData={convertedCode}
        />

        {/* show analysis UI Design */}
        {/* {convertedCode && !loading && ( */}
        {/* <AnalysisPage ananlysisAPIData={convertedCode} /> */}
        {/* )} */}
        {/* show analysis UI Design END */}

        {/* -------------------------------- */}
        {/* Analysis Report */}
        {/* {analysisReport && !loading && (
          <AnalysisReport
            report={analysisReport}
            onDownload={() =>
              downloadFile(analysisReport, "analysis-report.txt")
            }
          />
        )} */}

        {/* Converted Code UI Design */}
        {/* {convertedCode && !loading && (
          <ConvertedCode
            code={convertedCode}
            onDownload={() => downloadFile(convertedCode, "converted-code.jsx")}
          />
        )} */}

        {/* Success Message */}
        {analysisReport && convertedCode && !loading && (
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-6 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-3 bg-accent/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Analysis Complete!</h3>
              <p className="text-muted-foreground">
                Your JSP project has been successfully analyzed Check Below !!
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
