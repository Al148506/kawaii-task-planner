import { useMemo } from "react";
import { getWaifuMessage } from "../helpers/getWaifuMessage";

export const usePomodoroMessage = ({
  phase,
  mood,
  timeLeft,
  showConfetti,
}: {
  phase: "focus" | "break" | "finished";
  mood: string;
  timeLeft: number;
  showConfetti: boolean;
}) => {
  return useMemo(() => {
    if (showConfetti) return "¡Lo lograste! ¡Soy tan feliz por ti! 🎉💖";
    if (phase === "break") return "Buen trabajo 💖 descansa un poquito~";
    return getWaifuMessage(mood, timeLeft);
  }, [phase, mood, timeLeft, showConfetti]);
};
