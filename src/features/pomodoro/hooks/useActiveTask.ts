//useActiveTask.ts
import { useMemo } from "react";
import type { Pomodoro } from "@/features/pomodoro/types/Pomodoro";
import type { Task } from "@/features/tasks/types/Task";
import type { ActivePomodoro } from "@/features/pomodoro/context/PomodoroContext";

export const useActiveTask = (tasks: Task[], activePomodoro: ActivePomodoro | null) => {
  const activeTask = useMemo(
    () => tasks.find((t) => t.id === activePomodoro?.taskId),
    [tasks, activePomodoro?.taskId]
  );

  const counts = useMemo(() => {
    const completed =
      activeTask?.pomodoros.filter((p:Pomodoro) => p.completed).length ?? 0;

    const total = activeTask?.pomodoros.length ?? 0;

    return {
      completedCount: completed,
      totalCount: total,
      remainingCount: total - completed,
    };
  }, [activeTask?.pomodoros]);

  return { activeTask, ...counts };
};
