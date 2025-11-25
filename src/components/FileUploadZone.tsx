// Latest code Except Java Backend files
import { useEffect, useState } from "react";
import {
  Upload,
  FileCode,
  ExternalLink,
  Github,
  Trash,
  ArrowRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProgressBar from "./ProgressBar";
import { AnalysisData } from "../lib/analysis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useApi } from "@/hooks/useAPI";
import JSZip from "jszip";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/useContext";

interface FileUploadZoneProps {
  onFilesUpload: (files: File[]) => void;
  onGithubAnalyze: (repoUrl: string) => void;
  uploadedFiles: Array<{ name: string; content: string }>;
  isLoading: boolean;
  isReportData?: boolean;
  analysisAPIData?: string | AnalysisData | null;
  filesList?: Array<{ name: string; content: string }>;
}

export const FileUploadZone = ({
  onFilesUpload,
  onGithubAnalyze,
  uploadedFiles,
  isLoading,
  isReportData = false,
  analysisAPIData,
  filesList,
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalzing, setIsAnalzing] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();
  const { apiCall, loading, error } = useApi();
  const navigate = useNavigate();
  const { setAnalysisReportJson } = useAppContext();
  // Dummy JSON with file names
  const [files, setFiles] = useState(filesList || []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length === 0) {
      toast({ title: "No files dropped" });
      return;
    }

    if (files.length > 1) {
      toast({
        variant: "destructive",
        title: "Too Many Files",
        description: "Please upload a single .zip file.",
      });
      return;
    }

    const file = files[0];
    if (!file.name.toLowerCase().endsWith(".zip")) {
      toast({
        variant: "destructive",
        title: "Invalid File",
        description: "Only .zip files are supported.",
      });
      return;
    }

    onFilesUpload([file]); // send the ZIP file directly
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // ✅ Only allow .zip
      if (!file.name.toLowerCase().endsWith(".zip")) {
        toast({
          variant: "destructive",
          title: "Invalid File Type",
          description: "Please upload a .zip file containing your JSP project.",
        });
        e.target.value = "";
        return;
      }

      // ✅ Pass the raw ZIP file (not content) to onFilesUpload
      onFilesUpload([file]);
      e.target.value = "";
    }
  };

  const handleDeleteFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    window.scrollTo(0, 0);
    setIsAnalzing(true);
    if (!files || files.length === 0) {
      toast({
        variant: "destructive",
        title: "No Files",
        description: "Please upload some files first.",
      });
      return;
    }

    const zip = new JSZip();

    // Add each file as its own entry in the zip
    files.forEach((file) => {
      zip.file(file.name, file.content || "");
    });

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Create FormData to send the zip file to API
    const formData = new FormData();
    formData.append("folder", zipBlob, "files.zip");
    formData.append("filterZip", "true");

    // Send to API
    const response = await apiCall({
      method: "POST",
      url: "/analyze-project", // Replace with your actual API endpoint
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response?.data?.status == 200 && !response?.data?.report[0]?.error) {
      setAnalysisReportJson(response?.data?.report);
      navigate("/analysis", {
        state: { analysisAPIData: response?.data?.report },
      });
      toast({
        title: response?.data?.message || "Analysis Complete!",
        description: "Your Analysis Report is Ready.",
      });
      setIsAnalzing(false);
    } else {
      setIsAnalzing(false);
      toast({
        variant: "destructive",
        title: "Analysis Failed Please Try Again !!",
        description: "There was an error of AI service during ZIP analysis",
      });
    }
  };

  const popularRepos = [
    {
      name: "Apache Struts",
      tech: "Legacy MVC framework using JSP",
      icon: "🏛️",
    },
    {
      name: "Spring MVC",
      tech: "Java-based web framework with JSP views",
      icon: "🌱",
    },
    {
      name: "JSF (JavaServer Faces)",
      tech: "Component-based UI framework for Java EE",
      icon: "🎭",
    },
    {
      name: "JSP Examples",
      tech: "Sample JSP projects and templates",
      icon: "📄",
    },
  ];

  useEffect(() => {
    setFiles(filesList || []);
  }, [filesList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {isLoading ? (
        <ProgressBar
          isReportData={isReportData}
          analysisAPIData={analysisAPIData}
        />
      ) : (
        <>
          {!isAnalzing ? (
            <>
              <Card className="overflow-hidden">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  {/* Tabs Header */}
                  <TabsList className="w-full grid grid-cols-2 rounded-none border-b bg-muted/50">
                    <TabsTrigger
                      value="upload"
                      className="flex items-center justify-center gap-2 py-4 font-semibold text-sm text-foreground data-[state=active]:bg-card data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"
                    >
                      <Upload className="w-5 h-5" />
                      Upload Files
                    </TabsTrigger>

                    <TabsTrigger
                      value="github"
                      className="flex items-center justify-center gap-2 py-4 font-semibold text-sm text-foreground data-[state=active]:bg-card data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none"
                    >
                      <Github className="w-5 h-5" />
                      GitHub Repository
                    </TabsTrigger>
                  </TabsList>

                  {/* Upload Tab Content */}
                  <TabsContent value="upload" className="p-0 m-0">
                    <div className={`p-12 ${files && files.length > 0 ? "pb-0":""}`} >
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-3 border-dashed rounded-2xl p-16 ${files && files.length > 0 ? "pb-0":""} text-center transition-all ${
                          isDragging
                            ? "border-primary bg-primary/5"
                            : "border-border bg-muted/30"
                        }`}
                      >
                        <input
                          type="file"
                          accept=".zip"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                          id="file-upload"
                          disabled={isLoading}
                        />

                        <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <Upload className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-3xl font-semibold text-foreground mb-3">
                          Upload Your JSP Project as a ZIP File
                        </h3>
                        <p className="text-muted-foreground mb-8">
                          Drag & drop a .zip file or click to browse
                        </p>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground shadow-lg"
                        >
                          <FileCode className="w-5 h-5 mr-2" />
                          Choose Files
                        </Button>

                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm font-semibold text-muted-foreground mb-0">
                            Your ZIP must contain .jsp files.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* GitHub Tab Content */}
                  <TabsContent value="github" className="p-0 m-0">
                    <div className="p-12">
                      <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-foreground rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <Github className="w-10 h-10 text-background" />
                        </div>
                        <h3 className="text-3xl font-semibold text-foreground mb-3">
                          Analyze GitHub Repository
                        </h3>
                        <p className="text-muted-foreground">
                          Enter a GitHub repository URL to analyze your legacy
                          project
                        </p>
                      </div>

                      <div className="max-w-2xl mx-auto space-y-4">
                        <div className="flex gap-3">
                          <Input
                            type="url"
                            placeholder="https://github.com/username/repository"
                            value={githubUrl}
                            onChange={(e) => setGithubUrl(e.target.value)}
                            className="flex-1 h-12 text-base"
                          />
                          <Button
                            onClick={() => onGithubAnalyze(githubUrl)}
                            size="lg"
                            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground px-8"
                          >
                            <Github className="w-5 h-5 mr-2" />
                            Analyze Repository
                          </Button>
                        </div>

                        <div className="mt-12">
                          <p className="text-sm font-semibold text-muted-foreground text-center mb-6">
                            Popular repositories to try:
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            {popularRepos.map((repo) => (
                              <button
                                key={repo.name}
                                className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl hover:border-primary hover:shadow-md transition-all text-left group"
                                onClick={() =>
                                  setGithubUrl(
                                    `https://github.com/${repo.name
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`
                                  )
                                }
                              >
                                <span className="text-2xl">{repo.icon}</span>
                                <div className="flex-1">
                                  <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {repo.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {repo.tech}
                                  </div>
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div
                  className={files && files.length > 0 ? "mb-6 mt-2 mx-4" : "hidden"}
                >
                  <h4 className="text-lg font-semibold mb-2">Uploaded Files</h4>
                  <hr className="mb-4" />
                  <ScrollArea
                    className={
                      files && files.length > 5
                        ? "h-80 bg-card border border-border rounded-xl py-3 px-3"
                        : ""
                    }
                  >
                    <ul className="space-y-2">
                      {files?.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                        >
                          <span className="text-sm font-medium">
                            {file?.name || "Unnamed File"}
                          </span>

                          <Trash
                            className="w-4 h-4 cursor-pointer text-red-500 hover:text-red-600 hover:scale-110"
                            onClick={() => handleDeleteFile(index)}
                          />
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </div>
              </Card>

              {/* Uploaded Files List */}
              <div className={files && files.length > 0 ? "mt-6" : "hidden"}>
                <div className="place-self-end mt-4">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:w-auto  text-white px-8 py-6 rounded-xl hover:shadow-2xl hover:scale-105 transition-all font-semibold text-md flex items-center justify-center"
                  >
                    {loading ? (
                      <>Analysing...</>
                    ) : (
                      <>
                        Start Analysis
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center ">
                <div className="text-center">
                  <h1 className="tracking-tight text-5xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent pb-4">
                    Legacy JSP to Modern React
                  </h1>
                  <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-7">
                    A comprehensive guide mapping legacy JavaServer Pages
                    features to their modern React equivalents
                  </p>
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Analyzing your project...
                  </h2>
                  <p className="text-muted-foreground mt-2">
                    Please wait while we process your files...
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
