import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { PomodoroSoundEvent } from "../types/PomodoroSettings";

type Params = {
  playPomodoroSound: (event: PomodoroSoundEvent) => void;
  reset: () => void;
  clearPomodoro: () => void;
  setWasCancelled: (value: boolean) => void;
};

export const usePomodoroCancel = ({
  playPomodoroSound,
  reset,
  clearPomodoro,
  setWasCancelled,
}: Params) => {
  const navigate = useNavigate();

  const cancelPomodoro = useCallback(() => {
    setWasCancelled(true);

    setTimeout(() => {
      reset();
      clearPomodoro();
      navigate("/");
    }, 800);
  }, [reset, clearPomodoro, navigate, setWasCancelled]);

  return { cancelPomodoro };
};
