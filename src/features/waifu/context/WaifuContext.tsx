import { createContext, useContext } from "react";
import type { WaifuConfig } from "@/features/waifu/types/waifuTypes";

type WaifuContextType = {
  waifu: WaifuConfig | null;
  setWaifu: (id: string) => void;
};

export const WaifuContext = createContext<WaifuContextType | null>(null);

export const useWaifuContext = () => {
  const context = useContext(WaifuContext);
  if (!context) {
    throw new Error("useWaifuContext must be used within WaifuProvider");
  }
  return context;
};
