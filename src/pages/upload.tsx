import { useState } from "react";
import { CheckCircle, Brain, Zap, Target } from "lucide-react";
import { FileUploadZone } from "@/components/FileUploadZone";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import APIInterceptor from "@/lib/axiosInterceptor";

const UploadProject = () => {
  const [filesContent, setFilesContent] = useState<
    Array<{ name: string; content: string }>
  >([]);
  const [convertedCode, setConvertedCode] = useState<string | null>(null);
  const [isReportData, setIsReportData] = useState(false);
  const [analysisReport, setAnalysisReport] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const navigate = useNavigate();

  const handleFileUpload = async (files: File[]) => {
    setUploadedFiles(files);
    await analyzeProject(files);
  };


// API Function to analyze uploaded project 
const analyzeProject = async (files: File[]) => {
  if (files.length === 0) return;

  const file = files[0];
  const formData = new FormData();
  formData.append("folder", file);

  setLoading(true);
  try {
    const response = await APIInterceptor.post(`/analyze-project`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const data = response.data;

    navigate("/analysis", {
      state: { ananlysisAPIData: data.report },
    });

    setIsReportData(() => true);
    setAnalysisReport(data.report || "No report generated.");
    setConvertedCode(data.convertedCode || "");
    toast({
      title: "Analysis Complete!",
      description: "Your JSP project has been successfully analyzed.",
    });
  } catch (error: any) {
    console.error("Error analyzing project:", error);
    setAnalysisReport("Error during analysis. Please try again.");
    setConvertedCode("");
    toast({
      variant: "destructive",
      title: "Analysis Failed",
      description:
        "There was an error analyzing your project. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};


// API Function to analyze GitHub repo
const analyzeRepo = async (repoUrl: string) => {
  setLoading(true);
  try {
    const response = await APIInterceptor.post(`/analyze-project`, { repoUrl });

    const data = response.data;

    navigate("/analysis", {
      state: { ananlysisAPIData: data.report },
    });

    setAnalysisReport(data.report || "No report generated.");
    setConvertedCode(data.convertedCode || "");
    setIsReportData(true);

    toast({
      title: "Analysis Complete!",
      description: "Your JSP project has been successfully analyzed.",
    });
  } catch (error: any) {
    console.error("Error analyzing repo:", error);
    toast({
      variant: "destructive",
      title: "Repo Analysis Failed",
      description: error.response?.data?.message || "Could not analyze the repository. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen container mx-auto pb-12">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 space-y-8 mt-5">
        {/* File Upload */}
        <FileUploadZone
          onFilesUpload={handleFileUpload}
          onGithubAnalyze={analyzeRepo}
          uploadedFiles={filesContent}
          isLoading={loading}
          isReportData={isReportData}
          ananlysisAPIData={convertedCode}
        />

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

export default UploadProject;
