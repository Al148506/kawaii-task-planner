import { useMemo } from "react";
import { getBreakDuration } from "@/features/pomodoro/utils/pomodoroUtils";
import type { ActivePomodoro } from "@/features/pomodoro/context/PomodoroContext";
import type { Task } from "@/features/tasks/types/Task";

export const usePomodoroSession = (
  tasks: Task[],
  activePomodoro: ActivePomodoro | null
) => {
  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activePomodoro?.taskId),
    [tasks, activePomodoro?.taskId],
  );

  const completedCount = activeTask?.pomodoros.filter((pomodoro) => pomodoro.completed).length ?? 0;
  const totalCount = activeTask?.pomodoros.length ?? 0;
  const remainingCount = totalCount - completedCount;

  const taskTitle = activePomodoro?.taskTitle ?? "";
  const selectedDate = activePomodoro?.selectedDate ?? "";

  const durationInSeconds = activePomodoro ? activePomodoro.duration * 60 : 0;

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
