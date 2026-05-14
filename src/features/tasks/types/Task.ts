import type { Pomodoro } from "@/features/pomodoro/types/Pomodoro";
import type { PomodoroType } from "@/features/pomodoro/types/PomodoroSettings";

export interface Task {
  id: string;
  title: string;
  date: string;

  pomodoroType: PomodoroType;

  customDuration?: number;
  
  pomodoros: Pomodoro[];
}
