import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextType {
  uploadedFileContext: any;
  setuploadedFileContext: React.Dispatch<React.SetStateAction<any>>;
  ProjectJson: any;
  setProjectJson: React.Dispatch<React.SetStateAction<any>>;
  MigrationReportJson: any;
  setMigrationReportJson: React.Dispatch<React.SetStateAction<any>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uploadedFileContext, setuploadedFileContext] = useState();
  const [ProjectJson, setProjectJson] = useState();
  const [MigrationReportJson, setMigrationReportJson] = useState();

  return (
    <AppContext.Provider
      value={{
        uploadedFileContext,
        setuploadedFileContext,
        ProjectJson,
        setProjectJson,
        MigrationReportJson,
        setMigrationReportJson,
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
