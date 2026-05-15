// src/context/WaifuProvider.tsx
import { useEffect, useState } from "react";
import { WaifuContext } from "./WaifuContext";
import { waifus } from "@/features/waifu/data/waifus";
import type { WaifuConfig } from "@/features/waifu/types/waifuTypes";

const LOCAL_KEY = "selectedWaifu";
const SKINS_KEY = "selectedWaifuSkins:v1";

const loadSelectedSkins = () => {
  try {
    const saved = localStorage.getItem(SKINS_KEY);
    return saved ? (JSON.parse(saved) as Record<string, string>) : {};
  } catch {
    return {};
  }
};

export const WaifuProvider = ({ children }: { children: React.ReactNode }) => {
  const [waifu, setWaifuState] = useState<WaifuConfig | null>(null);
  const [selectedSkinByWaifu, setSelectedSkinByWaifu] =
    useState<Record<string, string>>(loadSelectedSkins);

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

  const setWaifuSkin = (waifuId: string, skinId: string) => {
    setSelectedSkinByWaifu((prev) => {
      const next = { ...prev, [waifuId]: skinId };
      localStorage.setItem(SKINS_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <WaifuContext.Provider
      value={{ waifu, selectedSkinByWaifu, setWaifu, setWaifuSkin }}
    >
      {children}
    </WaifuContext.Provider>
  );
};
