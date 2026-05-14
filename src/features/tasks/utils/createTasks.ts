import type { PomodoroType } from "@/features/pomodoro/types/PomodoroSettings";
import type { RepetitionSettings } from "@/features/tasks/types/RepetitionSettings";
import type { Task } from "@/features/tasks/types/Task";
import type { Pomodoro } from "@/features/pomodoro/types/Pomodoro";
import { generateDatesByRepetition } from "@/features/tasks/utils/generateDatesByRepetition";

interface CreateTasksParams {
  title: string;
  date: string;
  pomodoroCount: number;
  pomodoroType: PomodoroType;
  customDuration: number;
  repetitionType: RepetitionSettings;
}

// 👉 helper para crear pomodoros
const createPomodoros = (
  count: number,
  pomodoroType: PomodoroType,
  customDuration: number,
): Pomodoro[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: crypto.randomUUID(),
    type: pomodoroType,
    duration: pomodoroType === "custom" ? customDuration : undefined,
    completed: false,
    order: i + 1,
  }));
};

export const createTasks = ({
  title,
  date,
  pomodoroCount,
  pomodoroType,
  customDuration,
  repetitionType,
}: CreateTasksParams): Task[] => {
  const dates =
    repetitionType === "None"
      ? [date]
      : generateDatesByRepetition(date, repetitionType);

  return dates.map((d) => ({
    id: crypto.randomUUID(),
    title,
    date: d,
    pomodoroType,
    customDuration: pomodoroType === "custom" ? customDuration : undefined,
    pomodoros: createPomodoros(pomodoroCount, pomodoroType, customDuration),
  }));
};
