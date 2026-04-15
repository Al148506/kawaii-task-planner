import { useCallback, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfetti } from "./useConfetti";

import { usePomodoro } from "./usePomodoro";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useTasksContext } from "../context/TasksContext";
import { useWaifuMood } from "./useWaifuMood";

import { useAudio } from "./useAudio";
import { useCelebration } from "./useCelebration";
import { useActiveTask } from "./useActiveTask";
import { getBreakDuration } from "../utils/pomodoroUtils";
import { usePomodoroMessage } from "./usePomodoroMessage";
import { usePomodoroDebug } from "./usePomodoroDebug";

import { pomodoroReducer, initialState } from "./usePomodoroReducer";

export const usePomodoroController = () => {
  const navigate = useNavigate();

  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro, tasks } = useTasksContext();

  // 🎯 Reducer (estado central)
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const { phase, showConfetti } = state;

  const [wasCancelled, setWasCancelled] = useState(false);

  // 🎵 Audio & 🎉 Celebración
  const { playCompletionSound, playFinalSound, playStartSound } =
    useAudio("waifu1");

  const { triggerCelebration, resetCelebration } = useCelebration();

  // 📊 Task
  const { activeTask, completedCount, totalCount, remainingCount } =
    useActiveTask(tasks, activePomodoro);

  const taskTitle = activePomodoro?.taskTitle ?? "";
  const selectedDate = activePomodoro?.selectedDate ?? "";

  const breakDuration = getBreakDuration(activeTask?.pomodoroType);

  const durationInSeconds = activePomodoro ? activePomodoro.duration * 60 : 0;

  // ⏱ Timer
  const { timeLeft, isRunning, start, pause, reset, setTimeLeft } =
    usePomodoro(durationInSeconds);

  // 🧠 Mood + mensaje
  const mood = useWaifuMood(isRunning, timeLeft, wasCancelled);

  const message = usePomodoroMessage({
    phase,
    mood,
    timeLeft,
    showConfetti,
  });

  useConfetti(showConfetti);

  // 🚨 Validación
  useEffect(() => {
    if (!activePomodoro) {
      navigate("/");
    }
  }, [activePomodoro, navigate]);

  // ▶️ Inicio automático
  useEffect(() => {
    if (!activePomodoro) return;

    dispatch({ type: "START_FOCUS" });
    resetCelebration();
    playStartSound();

    reset(activePomodoro.duration * 60);
    start();
  }, [activePomodoro?.pomodoroId]);

  // 🔥 Lógica principal (ciclo)
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
        playFinalSound();
        triggerCelebration();

        setTimeout(() => {
          clearPomodoro();
        }, 4000);

        return;
      }

      // ☕ descanso
      dispatch({ type: "START_BREAK" });
      playCompletionSound();
      reset(breakDuration);
      start();
    } else if (phase === "break") {
      dispatch({ type: "START_FOCUS" });
      playStartSound();
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
    reset,
    start,
    navigate,
    clearPomodoro,
    completePomodoro,
    playCompletionSound,
    playFinalSound,
    triggerCelebration,
    resetCelebration,
  ]);

  // ❌ Cancelar
  const cancelPomodoro = useCallback(() => {
    setWasCancelled(true);

    setTimeout(() => {
      reset();
      clearPomodoro();
      navigate("/");
    }, 800);
  }, [reset, clearPomodoro, navigate]);

  // 🧪 Debug
  const debug = usePomodoroDebug({
    setTimeLeft,
    dispatch,
  });

  // 📦 API
  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    cancelPomodoro,

    taskTitle,
    selectedDate,
    mood,
    message,

    completedCount,
    remainingCount,
    totalCount,

    phase,
    showConfetti,

    debug,
  };
};
