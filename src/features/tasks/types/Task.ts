import type { Pomodoro } from "@/features/pomodoro/types/Pomodoro";
import type { PomodoroType } from "@/features/pomodoro/types/PomodoroSettings";
import type { TaskCategory } from "@/features/tasks/types/Category";

export interface Task {
  id: string;
  title: string;
  date: string;
  category: TaskCategory;
  pomodoroType: PomodoroType;
  customDuration?: number;
  pomodoros: Pomodoro[];
}
