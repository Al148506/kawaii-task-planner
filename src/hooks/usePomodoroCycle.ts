import { useEffect } from "react";
import type { ActivePomodoro } from "../context/PomodoroContext";
import type { Task } from "../types/Task";
import type { PomodoroPhase } from "./usePomodoroReducer";
import type { Action } from "./usePomodoroReducer";
import type { PomodoroSoundEvent } from "../types/PomodoroSettings";

type Params = {
  timeLeft: number;
  phase: PomodoroPhase;
  activePomodoro: ActivePomodoro | null;
  activeTask: Task | undefined;
  breakDuration: number;
  dispatch: React.Dispatch<Action>;
  reset: (duration: number) => void;
  start: () => void;
  clearPomodoro: () => void;
  completePomodoro: (taskId: string, pomodoroId: string) => void;
  triggerCelebration: () => void;
  resetCelebration: () => void;
  playPomodoroSound: (event: PomodoroSoundEvent) => void;
};

export const usePomodoroCycle = ({
  timeLeft,
  phase,
  activePomodoro,
  activeTask,
  breakDuration,
  dispatch,
  reset,
  start,
  clearPomodoro,
  completePomodoro,
  triggerCelebration,
  resetCelebration,
  playPomodoroSound,
}: Params) => {
  useEffect(() => {
    if (timeLeft !== 0 || !activePomodoro || !activeTask) return;

    if (phase === "focus") {
      const pendingPomodoros = activeTask.pomodoros.filter((p) => !p.completed);
      const isLastPomodoro = pendingPomodoros.length === 1;
      const nextPomodoro = pendingPomodoros[0];

      if (!nextPomodoro) return;

      completePomodoro(activePomodoro.taskId, nextPomodoro.id);

      if (isLastPomodoro) {
        dispatch({ type: "FINISH_ALL" });
        playPomodoroSound("finished");
        triggerCelebration();

        setTimeout(() => clearPomodoro(), 4000);
        return;
      }

      dispatch({ type: "START_BREAK" });
      playPomodoroSound("breakStart");
      reset(breakDuration);
      start();

    } else if (phase === "break") {
      dispatch({ type: "START_FOCUS" });
      playPomodoroSound("focusStart");
      resetCelebration();
      reset(activePomodoro.duration * 60);
      start();
    }
  }, [timeLeft, phase, activePomodoro, activeTask, breakDuration, reset, start, clearPomodoro, completePomodoro, triggerCelebration, resetCelebration, dispatch, playPomodoroSound]);
};