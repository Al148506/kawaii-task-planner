import { useEffect, useState } from "react";
import type { WaifuMood } from "@/features/waifu/types/waifuTypes";

export const useWaifuMood = (
  isRunning: boolean,
  timeLeft: number,
  wasCancelled: boolean,
  isCompleted: boolean // 👈 NUEVO
) => {
  const [mood, setMood] = useState<WaifuMood>("happy");

  useEffect(() => {
    if (wasCancelled) {
      setMood("sad");
      return;
    }

    if (isCompleted) {
      setMood("success"); // ahora sí tiene sentido
      return;
    }

    if (!isRunning) {
      setMood("blush"); // 👈 pausa ya no es success
      return;
    }

    if (timeLeft < 60) {
      setMood("surprised");
      return;
    }

    setMood("happy");
  }, [isRunning, timeLeft, wasCancelled, isCompleted]);

  return mood;
};
