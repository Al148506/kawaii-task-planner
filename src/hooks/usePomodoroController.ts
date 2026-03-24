import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePomodoro } from "./usePomodoro";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useTasksContext } from "../context/TasksContext";

export const usePomodoroController = () => {
  const navigate = useNavigate();

  const { timeLeft, isRunning, start, pause, reset } = usePomodoro(1500);
  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro } = useTasksContext();

  const selectedDate = activePomodoro?.selectedDate ?? "";
  const taskTitle = activePomodoro?.taskTitle ?? "";

  // 🚨 Validación
  useEffect(() => {
    if (!taskTitle || !selectedDate) {
      navigate("/");
    }
  }, [taskTitle, selectedDate]);

  // ⏱ Finalización
  useEffect(() => {
    if (timeLeft === 0 && activePomodoro) {
      completePomodoro(activePomodoro.taskId, activePomodoro.pomodoroId);
      clearPomodoro();
      navigate("/");
    }
  }, [timeLeft]);

  // ▶ Inicio automático
  useEffect(() => {
    if (activePomodoro) {
      reset();
      start();
    } else {
      navigate("/");
    }
  }, [activePomodoro]);

  const cancelPomodoro = () => {
    reset();
    clearPomodoro();
    navigate("/");
  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    cancelPomodoro,
    taskTitle,
    selectedDate,
  };
};