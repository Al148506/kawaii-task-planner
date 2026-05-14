// useWaifuValidation.ts
import { useEffect } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { ActivePomodoro } from "@/features/pomodoro/context/PomodoroContext";

export const useWaifuValidation = (
  activePomodoro: ActivePomodoro | null,
  navigate: NavigateFunction
) => {
  useEffect(() => {
    if (!activePomodoro) {
      navigate("/");
    }
  }, [activePomodoro, navigate]);
};
