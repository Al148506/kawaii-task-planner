import { useCallback, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfetti } from "./useConfetti";
import { usePomodoro } from "./usePomodoro";
import { usePomodoroContext } from "@/features/pomodoro/context/PomodoroContext";
import { useTasksContext } from "@/features/tasks/context/TasksContext";
import { useWaifuMood } from "@/features/waifu/hooks/useWaifuMood";
import { useCelebration } from "./useCelebration";
import { useWaifuValidation } from "@/features/waifu/hooks/useWaifuValidation";
import { usePomodoroMessage } from "./usePomodoroMessage";
import { usePomodoroDebug } from "./usePomodoroDebug";
import { usePomodoroPlaySound } from "./usePomodoroPlaySound";
import { pomodoroReducer, initialState } from "./usePomodoroReducer";

import { usePomodoroSession } from "./usePomodoroSession";
import { usePomodoroAutoStart } from "./usePomodoroAutoStart";
import { usePomodoroCycle } from "./usePomodoroCycle";
import { usePomodoroCancel } from "./usePomodoroCancel";
import { usePomodoroSessionsContext } from "@/features/sessions/context/PomodoroSessionsContext";
import { getPomodoroDuration } from "@/features/pomodoro/utils/pomodoro";
import type { Task } from "@/features/tasks/types/Task";
import { useProgressionContext } from "@/features/progression/context/ProgressionContext";

export const usePomodoroController = () => {
  const navigate = useNavigate();

  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro, tasks } = useTasksContext();
  const { sessions, addSession } = usePomodoroSessionsContext();
  const { processPomodoroCompletion } = useProgressionContext();
  const focusStartedAtRef = useRef<Date | null>(null);
  const pauseCountRef = useRef(0);

  const [state, dispatch] = useReducer(pomodoroReducer, initialState);
  const { phase, showConfetti } = state;

  const [wasCancelled, setWasCancelled] = useState(false);

  // 🎵 Sonidos
  const playPomodoroSound = usePomodoroPlaySound();

  const handleFocusStart = useCallback(() => {
    focusStartedAtRef.current = new Date();
    pauseCountRef.current = 0;
  }, []);

  const handleFocusComplete = useCallback(
    ({
      task,
      pomodoroId,
      completedAt,
    }: {
      task: Task;
      pomodoroId: string;
      completedAt: Date;
    }) => {
      const startedAt = focusStartedAtRef.current ?? new Date(
        completedAt.getTime() - getPomodoroDuration(task) * 60 * 1000,
      );
      const actualSeconds = Math.max(
        0,
        Math.round((completedAt.getTime() - startedAt.getTime()) / 1000),
      );
      const completedTask = {
        ...task,
        pomodoros: task.pomodoros.map((pomodoro) =>
          pomodoro.id === pomodoroId
            ? { ...pomodoro, completed: true }
            : pomodoro,
        ),
      };
      const updatedTasks = tasks.map((item) =>
        item.id === task.id ? completedTask : item,
      );
      const session = {
        id: crypto.randomUUID(),
        taskId: task.id,
        pomodoroId,
        taskTitle: task.title,
        taskDate: task.date,
        startedAt: startedAt.toISOString(),
        completedAt: completedAt.toISOString(),
        estimatedMinutes: getPomodoroDuration(task),
        actualSeconds,
        pauseCount: pauseCountRef.current,
      };

      addSession(session);
      processPomodoroCompletion({
        sessions: [...sessions, session],
        tasks: updatedTasks,
        latestSession: session,
      });

      focusStartedAtRef.current = null;
      pauseCountRef.current = 0;
    },
    [addSession, processPomodoroCompletion, sessions, tasks],
  );

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

  const pauseWithTracking = useCallback(() => {
    if (isRunning && phase === "focus") {
      pauseCountRef.current += 1;
    }

    pause();
  }, [isRunning, pause, phase]);

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
    onFocusStart: handleFocusStart,
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
    onFocusStart: handleFocusStart,
    onFocusComplete: handleFocusComplete,
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
    timer: { timeLeft, isRunning, start, pause: pauseWithTracking, reset },
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
