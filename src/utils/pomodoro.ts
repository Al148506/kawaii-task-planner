import type { Task } from "../types/Task";
import { PomodoroDurations } from "../types/PomodoroSettings";

// Obtener duración en minutos según el tipo
export const getPomodoroDuration = (task: Task): number => {
  if (task.pomodoroType === "custom") {
    return task.customDuration ?? 25;
  }

  return PomodoroDurations[task.pomodoroType];
};

export const getTotalTaskDuration = (task: Task): number => {
  const duration = getPomodoroDuration(task);
  return duration * task.pomodoros.length;
};