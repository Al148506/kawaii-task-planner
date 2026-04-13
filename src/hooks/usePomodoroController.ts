import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePomodoro } from "./usePomodoro";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useTasksContext } from "../context/TasksContext";
import { useWaifuMood } from "./useWaifuMood";
import { getWaifuMessage } from "../helpers/getWaifuMessage";
import { useAudio } from "./useAudio";
import { useCelebration } from "./useCelebration";
import { waifu1 } from "../data/waifus/waifu1";

// ─── Tipos ────────────────────────────────────────────────────────────────────
type PomodoroPhase = "focus" | "break";

export const usePomodoroController = () => {
  const navigate = useNavigate();
  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro, tasks } = useTasksContext();
  // ─── Estados ───────────────────────────────────────────────────────────────
  const [wasCancelled, setWasCancelled] = useState(false);
  const [phase, setPhase] = useState<PomodoroPhase>("focus");
  const [hasHandledCompletion, setHasHandledCompletion] = useState(false);
  const { playCompletionSound, playFinalSound, playStartSound } =
    useAudio("waifu1");
  const { showConfetti, triggerCelebration, resetCelebration } =
    useCelebration();

  // ─── Derivaciones memorizadas ──────────────────────────────────────────────
  const activeTask = useMemo(
    () => tasks.find((t) => t.id === activePomodoro?.taskId),
    [tasks, activePomodoro?.taskId],
  );

  const { completedCount, totalCount, remainingCount } = useMemo(() => {
    const completed =
      activeTask?.pomodoros.filter((p) => p.completed).length ?? 0;
    const total = activeTask?.pomodoros.length ?? 0;
    return {
      completedCount: completed,
      totalCount: total,
      remainingCount: total - completed,
    };
  }, [activeTask?.pomodoros]);

  const breakDuration = useMemo(() => {
    switch (activeTask?.pomodoroType) {
      case "52_17":
        return 17 * 60;
      case "50_10":
        return 10 * 60;
      case "classic":
      default:
        return 5 * 60;
    }
  }, [activeTask?.pomodoroType]);

  const durationInSeconds = useMemo(
    () => (activePomodoro ? activePomodoro.duration * 60 : 0),
    [activePomodoro?.duration],
  );

  // ─── Timer ─────────────────────────────────────────────────────────────────
  const { timeLeft, isRunning, start, pause, reset } =
    usePomodoro(durationInSeconds);

  // ─── Valores derivados simples ─────────────────────────────────────────────
  const selectedDate = activePomodoro?.selectedDate ?? "";
  const taskTitle = activePomodoro?.taskTitle ?? "";

  // ─── Mood y mensaje ────────────────────────────────────────────────────────
  const mood = useWaifuMood(isRunning, timeLeft, wasCancelled);

  const message = useMemo(() => {
    if (showConfetti) return "¡Lo lograste! ¡Soy tan feliz por ti! 🎉💖";
    if (phase === "break") return "Buen trabajo 💖 descansa un poquito~";
    return getWaifuMessage(mood, timeLeft);
  }, [phase, mood, timeLeft, showConfetti]);

  // ─── Efecto: validación de sesión activa ───────────────────────────────────
  useEffect(() => {
    if (!taskTitle || !selectedDate) navigate("/");
  }, [taskTitle, selectedDate, navigate]);

  // ─── Efecto: inicio automático al montar o cambiar de pomodoro ─────────────
  useEffect(() => {
    if (!activePomodoro) {
      navigate("/");
      return;
    }
    setPhase("focus");
    playStartSound();
    reset(activePomodoro.duration * 60);
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePomodoro?.pomodoroId]); // intencional: solo al cambiar de pomodoro activo

  // ─── Efecto: lógica de finalización de fase ────────────────────────────────
  useEffect(() => {
    if (
      timeLeft !== 0 ||
      !activePomodoro ||
      hasHandledCompletion ||
      !activeTask
    )
      return;
    setHasHandledCompletion(true); // 🔒 bloquea re-ejecución

    if (phase === "focus") {
      // Completar el pomodoro actual

      const pendingPomodoros =
        activeTask?.pomodoros.filter((p) => !p.completed) ?? [];

      const isLastPomodoro = pendingPomodoros.length === 1;

      completePomodoro(activePomodoro.taskId, pendingPomodoros[0].id);

      if (isLastPomodoro) {
        // 🏁 Fin de todos los pomodoros
        playFinalSound();
        triggerCelebration();
        setTimeout(() => {
          clearPomodoro();
          navigate("/");
        }, 4000);
        return;
      }

      // ☕ Hay más pomodoros → iniciar descanso
      playCompletionSound();
      setPhase("break");
      reset(breakDuration);
      start();
    } else {
      // 🔁 Fin del descanso → volver a focus
      setPhase("focus");
      resetCelebration();
      reset(activePomodoro.duration * 60);
      start();
    }
  }, [timeLeft, phase, activePomodoro, remainingCount, breakDuration, hasHandledCompletion, reset, start, navigate, clearPomodoro, completePomodoro, activeTask?.pomodoros, playCompletionSound, playFinalSound, triggerCelebration, resetCelebration, activeTask]);

  // ─── Cancelación manual ────────────────────────────────────────────────────
  const cancelPomodoro = useCallback(() => {
    setWasCancelled(true);
    setTimeout(() => {
      reset();
      clearPomodoro();
      navigate("/");
    }, 800);
  }, [reset, clearPomodoro, navigate]);

  //Resetear el flag cuando el tiempo cambie
  useEffect(() => {
    if (timeLeft > 0) {
      setHasHandledCompletion(false);
    }
  }, [timeLeft]);
  // ─── API pública del hook ──────────────────────────────────────────────────
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
  };
};
