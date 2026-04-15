import { useEffect } from "react";

export const usePomodoroCycle = ({
  timeLeft,
  phase,
  activePomodoro,
  activeTask,
  breakDuration,
  hasHandledCompletion,
  setHasHandledCompletion,
  setPhase,
  reset,
  start,
  navigate,
  clearPomodoro,
  completePomodoro,
  playCompletionSound,
  playFinalSound,
  triggerCelebration,
  resetCelebration,
}: any) => {
  useEffect(() => {
    if (
      timeLeft !== 0 ||
      !activePomodoro ||
      hasHandledCompletion ||
      !activeTask
    )
      return;

    setHasHandledCompletion(true);

    if (phase === "focus") {
      const pendingPomodoros =
        activeTask.pomodoros.filter((p: any) => !p.completed);

      const isLastPomodoro = pendingPomodoros.length === 1;

      const nextPomodoro = pendingPomodoros[0];
      if (!nextPomodoro) return;

      completePomodoro(activePomodoro.taskId, nextPomodoro.id);

      if (isLastPomodoro) {
        playFinalSound();
        triggerCelebration();

        setTimeout(() => {
          clearPomodoro();
          navigate("/");
        }, 4000);

        return;
      }

      playCompletionSound();
      setPhase("break");
      reset(breakDuration);
      start();
    } else {
      setPhase("focus");
      resetCelebration();
      reset(activePomodoro.duration * 60);
      start();
    }
  }, [
    timeLeft,
    phase,
    activePomodoro,
    activeTask,
    breakDuration,
    hasHandledCompletion,
  ]);
};