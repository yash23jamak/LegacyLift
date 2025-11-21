import React, { createContext, useContext, useState, ReactNode } from "react";
import { ProjectFile } from "@/type/fileExplorerType";

type UploadedFile = ProjectFile;
type ProjectJsonType = UploadedFile[] | null;

interface FeatureMapping {
  id: string;
  legacyFeature: string;
  reactEquivalent: string;
  description: string;
  category: "rendering" | "state" | "routing" | "data" | "ui";
  complexity: "low" | "medium" | "high";
  benefits: string[];
}

interface Improvement {
  title: string;
  stat: string;
  description: string;
}

type MigrationReportType = [FeatureMapping[], Improvement[]] | null;

interface AppContextType {
  uploadedFileContext: UploadedFile[] | null;
  setUploadedFileContext: React.Dispatch<
    React.SetStateAction<UploadedFile[] | null>
  >;
  projectJson: ProjectJsonType;
  setProjectJson: React.Dispatch<React.SetStateAction<ProjectJsonType>>;
  migrationReportJson: MigrationReportType;
  setMigrationReportJson: React.Dispatch<
    React.SetStateAction<MigrationReportType>
  >;
  analysisReportJson: MigrationReportType;
  setAnalysisReportJson: React.Dispatch<
    React.SetStateAction<MigrationReportType>
  >;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uploadedFileContext, setUploadedFileContext] = useState<
    UploadedFile[] | null
  >(null);
  const [projectJson, setProjectJson] = useState<ProjectJsonType>(null);
  const [migrationReportJson, setMigrationReportJson] =
    useState<MigrationReportType>(null);
  const [analysisReportJson, setAnalysisReportJson] =
    useState<MigrationReportType>(null);

  return (
    <AppContext.Provider
      value={{
        uploadedFileContext,
        setUploadedFileContext,
        projectJson,
        setProjectJson,
        migrationReportJson,
        setMigrationReportJson,
        analysisReportJson,
        setAnalysisReportJson,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};
