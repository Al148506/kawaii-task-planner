// src/hooks/useWaifuSound.ts
import { useWaifuContext } from "@/features/waifu/context/WaifuContext";
import type { WaifuMood } from "@/features/waifu/types/waifuTypes";
import { useSound } from "@/shared/hooks/useSound";

export const useWaifuSound = () => {
  const { waifu } = useWaifuContext();
  const { play } = useSound();

  const playSound = (type: WaifuMood) => {
    const sound = waifu?.sounds?.[type];
    if (!sound) return;

    play(sound, { volume: 0.8, interrupt: true });
  };

  return {
    playSound,
  };
};
