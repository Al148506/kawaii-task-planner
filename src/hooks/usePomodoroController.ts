import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePomodoro } from "./usePomodoro";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useTasksContext } from "../context/TasksContext";
import { useWaifuMood } from "./useWaifuMood";
import { getWaifuMessage } from "../helpers/getWaifuMessage";

export const usePomodoroController = () => {
  const navigate = useNavigate();

  const { timeLeft, isRunning, start, pause, reset } = usePomodoro(1500);
  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro } = useTasksContext();

  const selectedDate = activePomodoro?.selectedDate ?? "";
  const taskTitle = activePomodoro?.taskTitle ?? "";

  const [wasCancelled, setWasCancelled] = useState(false);

  const mood = useWaifuMood(isRunning, timeLeft, wasCancelled);

  const message = getWaifuMessage(mood, timeLeft);

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
    setWasCancelled(true);

    setTimeout(() => {
      reset();
      clearPomodoro();
      navigate("/");
    }, 800); // 👈 tiempo para ver reacció
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
    mood,
    message,
  };
};
