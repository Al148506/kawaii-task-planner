import type { Pomodoro } from "./Pomodoro";
import type { PomodoroType } from "./PomodoroSettings";

export interface Task {
  id: string;
  title: string;
  date: string;

  plannedHours: number;
  pomodoroType: PomodoroType;
  customPomodoroDuration?: number;

  pomodoros: Pomodoro[];
}