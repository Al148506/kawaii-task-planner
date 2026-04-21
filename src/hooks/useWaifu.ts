import { useEffect, useState } from "react";
import { waifus } from "../data/waifus";

const LOCAL_KEY = "selectedWaifu";
const DEFAULT_WAIFU = "waifu1";

export const useWaifu = () => {
  const [waifuId, setWaifuId] = useState(DEFAULT_WAIFU);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);

    if (saved  && waifus[saved]) {
      setWaifuId(saved);
    } else {
      localStorage.setItem(LOCAL_KEY, DEFAULT_WAIFU);
    }
  }, []);

  const changeWaifu = (id: string) => {
    setWaifuId(id);
    localStorage.setItem(LOCAL_KEY, id);
  };

  return { waifuId, changeWaifu };
};