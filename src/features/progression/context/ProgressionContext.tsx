import { createContext, useContext } from "react";
import { useProgression } from "@/features/progression/hooks/useProgression";

const ProgressionContext = createContext<ReturnType<typeof useProgression> | null>(null);

export const ProgressionProvider = ({ children }: { children: React.ReactNode }) => {
  const progression = useProgression();

  return (
    <ProgressionContext.Provider value={progression}>
      {children}
    </ProgressionContext.Provider>
  );
};

export const useProgressionContext = () => {
  const context = useContext(ProgressionContext);

  if (!context) {
    throw new Error("useProgressionContext must be used within ProgressionProvider");
  }

  return context;
};
