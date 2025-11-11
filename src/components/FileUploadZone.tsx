// Latest code Except Java Backend files
import { useState } from "react";
import { Upload, FileCode, ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgressBar from "./ProgressBar";
import { AnalysisPageProps } from "../pages/analysisUI";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

interface FileUploadZoneProps {
  onFilesUpload: (files: File[]) => void;
  onGithubAnalyze: (repoUrl: string) => void;
  uploadedFiles: Array<{ name: string; content: string }>;
  isLoading: boolean;
  isReportData?: boolean;
  analysisAPIData?: AnalysisPageProps;
}

export const FileUploadZone = ({
  onFilesUpload,
  onGithubAnalyze,
  uploadedFiles,
  isLoading,
  isReportData = false,
  analysisAPIData,
}: FileUploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [activeTab, setActiveTab] = useState("upload");
  const { toast } = useToast();

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

  return (
    <div>
      {isLoading ? (
        <ProgressBar
          isReportData={isReportData}
          analysisAPIData={analysisAPIData}
        />
      ) : (
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
              <div className="p-12">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-3 border-dashed rounded-2xl p-16 text-center transition-all ${
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

                  <div className="mt-10 pt-8 border-t border-border">
                    <p className="text-sm font-semibold text-muted-foreground mb-4">
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
                    Enter a GitHub repository URL to analyze your legacy project
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
        </Card>
      )}
    </div>
  );
};
