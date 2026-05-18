import { useState } from "react";
import { WaifuContext } from "./WaifuContext";
import { waifus } from "@/features/waifu/data/waifus";
import type { WaifuConfig } from "@/features/waifu/types/waifuTypes";

const LOCAL_KEY = "selectedWaifu";
const SKINS_KEY = "selectedWaifuSkins:v1";
const DEFAULT_WAIFU = "waifu1";

const loadSelectedSkins = () => {
  try {
    const saved = localStorage.getItem(SKINS_KEY);
    return saved ? (JSON.parse(saved) as Record<string, string>) : {};
  } catch {
    return {};
  }
};

export const WaifuProvider = ({ children }: { children: React.ReactNode }) => {
  const [waifu, setWaifuState] = useState<WaifuConfig | null>(() => {
    const savedId = localStorage.getItem(LOCAL_KEY);
    return waifus[savedId ?? ""] ?? waifus[DEFAULT_WAIFU] ?? null;
  });
  const [selectedSkinByWaifu, setSelectedSkinByWaifu] =
    useState<Record<string, string>>(loadSelectedSkins);

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
