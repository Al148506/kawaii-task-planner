import { useMemo } from "react";
import { getBreakDuration } from "@/features/pomodoro/utils/pomodoroUtils";
import { useActiveTask } from "./useActiveTask";
import type { ActivePomodoro } from "@/features/pomodoro/context/PomodoroContext";
import type { Task } from "@/features/tasks/types/Task";

export const usePomodoroSession = (
  tasks: Task[],
  activePomodoro: ActivePomodoro | null
) => {
  const { activeTask, completedCount, totalCount, remainingCount } =
    useActiveTask(tasks, activePomodoro);

  const taskTitle = activePomodoro?.taskTitle ?? "";
  const selectedDate = activePomodoro?.selectedDate ?? "";

  const durationInSeconds = useMemo(
    () => (activePomodoro ? activePomodoro.duration * 60 : 0),
    [activePomodoro?.duration]
  );

  const breakDuration = useMemo(
    () => getBreakDuration(activeTask?.pomodoroType),
    [activeTask?.pomodoroType]
  );

  return {
    activeTask,
    taskTitle,
    selectedDate,
    durationInSeconds,
    breakDuration,
    completedCount,
    totalCount,
    remainingCount,
  };
};
