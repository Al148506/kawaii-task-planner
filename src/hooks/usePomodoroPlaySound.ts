import { useWaifuSound } from "./useWaifuSound";
import type { PomodoroSoundEvent } from "../types/PomodoroSettings";

const usePomodoroPlaySound = () => {
  const { playSound } = useWaifuSound();

   const playPomodoroSound = (event: PomodoroSoundEvent) => {
    switch (event) {
      case "focusStart":
        playSound("focused");
        break;
      case "breakStart":
        playSound("happy");
        break;
      case "finished":
        playSound("surprised");
        break;
      case "cancelled":
        playSound("sad");
        break;
    }
  };

  return playPomodoroSound;
};

export { usePomodoroPlaySound };
