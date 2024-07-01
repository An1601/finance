import React, { createContext, useState, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  toggleLoading: (status: boolean) => void;
}

export const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  toggleLoading: () => {},
});

const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setLoading] = useState(false);

  const toggleLoading = (status: boolean) => {
    setLoading(status);
  };

  const contextValue: LoadingContextType = {
    isLoading,
    toggleLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
