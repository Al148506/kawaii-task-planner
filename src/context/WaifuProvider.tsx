// src/context/WaifuProvider.tsx
import { useEffect, useState } from "react";
import { WaifuContext } from "./WaifuContext";
import { waifus } from "../data/waifus";
import type { WaifuConfig } from "../types/waifuTypes";

const LOCAL_KEY = "selectedWaifu";

export const WaifuProvider = ({ children }: { children: React.ReactNode }) => {
  const [waifu, setWaifuState] = useState<WaifuConfig | null>(null);

  // 🔥 cargar desde localStorage una sola vez
  useEffect(() => {
    const savedId = localStorage.getItem(LOCAL_KEY);
    if (savedId && waifus[savedId]) {
      setWaifuState(waifus[savedId]);
    }
  }, []);

  // 🔥 setter centralizado
  const setWaifu = (id: string) => {
    const selected = waifus[id];
    if (!selected) return;

    setWaifuState(selected);
    localStorage.setItem(LOCAL_KEY, id);
  };

  return (
    <WaifuContext.Provider value={{ waifu, setWaifu }}>
      {children}
    </WaifuContext.Provider>
  );
};