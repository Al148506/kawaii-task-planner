//usePomodoroPlaySound.ts
import { useWaifuSound } from "@/features/waifu/hooks/useWaifuSound";
import type { PomodoroSoundEvent } from "@/features/pomodoro/types/PomodoroSettings";

const usePomodoroPlaySound = () => {
  const { playSound } = useWaifuSound();

  const playPomodoroSound = (event: PomodoroSoundEvent) => {
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
  };

  return playPomodoroSound;
};

export { usePomodoroPlaySound };
