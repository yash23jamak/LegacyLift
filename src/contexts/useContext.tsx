import React, { createContext, useContext, useState, ReactNode } from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uploadedFileContext, setuploadedFileContext] = useState();

  return (
    <AppContext.Provider
      value={{ uploadedFileContext, setuploadedFileContext }}
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
