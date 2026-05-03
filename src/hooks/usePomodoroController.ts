import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfetti } from "./useConfetti";
import { usePomodoro } from "./usePomodoro";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useTasksContext } from "../context/TasksContext";
import { useWaifuMood } from "./useWaifuMood";
import { useCelebration } from "./useCelebration";
import { useWaifuValidation } from "./useWaifuValidation.ts"; // 👈 ver nota abajo
import { usePomodoroMessage } from "./usePomodoroMessage";
import { usePomodoroDebug } from "./usePomodoroDebug";
import { usePomodoroPlaySound } from "./usePomodoroPlaySound";
import { pomodoroReducer, initialState } from "./usePomodoroReducer";

import { usePomodoroSession } from "./usePomodoroSession";
import { usePomodoroAutoStart } from "./usePomodoroAutoStart";
import { usePomodoroCycle } from "./usePomodoroCycle";
import { usePomodoroCancel } from "./usePomodoroCancel";

export const usePomodoroController = () => {
  const navigate = useNavigate();

  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro, tasks } = useTasksContext();

  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const { phase, showConfetti } = state;

  const [wasCancelled, setWasCancelled] = useState(false);

  // 🎵 Sonidos
  const playPomodoroSound = usePomodoroPlaySound();

  // 🎉 Celebración
  const { triggerCelebration, resetCelebration } = useCelebration();

  // 📊 Sesión: task info + duraciones
  const {
    activeTask,
    taskTitle,
    selectedDate,
    durationInSeconds,
    breakDuration,
    completedCount,
    totalCount,
    remainingCount,
  } = usePomodoroSession(tasks, activePomodoro);

  // ⏱ Timer
  const { timeLeft, isRunning, isCompleted, start, pause, reset, setTimeLeft } =
    usePomodoro(durationInSeconds);

  // 🧠 Mood + mensaje
  const mood = useWaifuMood(isRunning, timeLeft, wasCancelled, isCompleted);
  const message = usePomodoroMessage({ phase, mood, timeLeft, showConfetti });

  // 🎊 Confetti visual
  useConfetti(showConfetti);

  // 🚨 Validación: redirige si no hay pomodoro activo
  useWaifuValidation(activePomodoro, navigate); // 👈 ver nota abajo

  // ▶️ Inicio automático al montar / cambiar pomodoro
  usePomodoroAutoStart({
    activePomodoro,
    durationInSeconds,
    dispatch,
    reset,
    start,
    resetCelebration,
    playPomodoroSound,
  });

  // 🔥 Ciclo focus → break → focus → finish
  usePomodoroCycle({
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
  });

  // ❌ Cancelación
  const { cancelPomodoro } = usePomodoroCancel({
    playPomodoroSound,
    reset,
    clearPomodoro,
    setWasCancelled,
  });

  // 🧪 Debug
  const debug = usePomodoroDebug({ setTimeLeft, dispatch });

  // 📦 API agrupada por dominio
  return {
    timer: { timeLeft, isRunning, start, pause, reset },
    task: {
      taskTitle,
      selectedDate,
      completedCount,
      remainingCount,
      totalCount,
    },
    ui: { mood, message, phase, showConfetti },
    actions: { cancelPomodoro, playPomodoroSound },
    debug,
  };
};
