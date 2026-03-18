import { useState, useEffect } from "react";
import type { PomodoroType } from "../types/PomodoroSettings";
import type { Task } from "../types/Task";
import { calculatePomodoros } from "../utils/pomodoroCalculator";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem("tasks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (
    title: string,
    date: string,
    plannedHours: number,
    pomodoroType: PomodoroType,
    customDuration?: number,
  ) => {
    const pomodoroCount = calculatePomodoros(
      plannedHours,
      pomodoroType,
      customDuration,
    );
    const newTask: Task = {
        id: crypto.randomUUID(),
        title,
        date,
        pomodoros: Array.from({ length: pomodoroCount }, () => ({
            id: crypto.randomUUID(),
            completed: false,
        })),
        plannedHours: 0,
        pomodoroType: "short"
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const completePomodoro = (taskId: string, pomodoroId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              pomodoros: task.pomodoros.map((p) =>
                p.id === pomodoroId ? { ...p, completed: true } : p,
              ),
            }
          : task,
      ),
    );
  };

  const getTasksByDate = (date: string) => {
    return tasks.filter((task) => task.date === date);
  };

  return {
    tasks,
    addTask,
    deleteTask,
    completePomodoro,
    getTasksByDate,
  };
};
