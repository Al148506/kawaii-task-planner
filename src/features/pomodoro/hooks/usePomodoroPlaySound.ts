import { useCallback } from "react";
import { useWaifuSound } from "@/features/waifu/hooks/useWaifuSound";
import type { PomodoroSoundEvent } from "@/features/pomodoro/types/PomodoroSettings";

const usePomodoroPlaySound = () => {
  const { playSound } = useWaifuSound();

  const playPomodoroSound = useCallback((event: PomodoroSoundEvent) => {
    switch (event) {
      case "focusStart":
        playSound("focused");
        break;
      case "breakStart":
        playSound("break");
        break;
      case "finished":
        playSound("surprised");
        break;
      case "cancelled":
        playSound("sad");
        break;
    }
  }, [playSound]);

  return playPomodoroSound;
};

export { usePomodoroPlaySound };
