import { useState, useEffect } from "react";
import type { PomodoroType } from "../types/PomodoroSettings";
import type { Task } from "../types/Task";

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

  const addTask = (task: Task): boolean => {
  let wasAdded = true;

  setTasks((prev) => {
    const exists = prev.some(
      (t) =>
        t.date === task.date &&
        t.title.trim().toLowerCase() === task.title.trim().toLowerCase()
    );

    if (exists) {
      wasAdded = false;
      return prev;
    }

    return [...prev, task];
  });

  return wasAdded;
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
