import { useEffect } from "react";
import type { ActivePomodoro } from "../context/PomodoroContext";
import type { Action } from "./usePomodoroReducer";
import type { PomodoroSoundEvent } from "../types/PomodoroSettings";

type Params = {
  activePomodoro: ActivePomodoro | null;
  durationInSeconds: number;
  dispatch: React.Dispatch<Action>;
  reset: (duration: number) => void;
  start: () => void;
  resetCelebration: () => void;
  playPomodoroSound: (event: PomodoroSoundEvent) => void;
};

export const usePomodoroAutoStart = ({
  activePomodoro,
  durationInSeconds,
  dispatch,
  reset,
  start,
  resetCelebration,
  playPomodoroSound,
}: Params) => {
  useEffect(() => {
    if (!activePomodoro) return;

    dispatch({ type: "START_FOCUS" });
    resetCelebration();
    playPomodoroSound("focusStart");
    reset(durationInSeconds);
    start();
  }, [activePomodoro?.pomodoroId]);
};