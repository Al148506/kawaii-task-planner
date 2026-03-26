import type { Pomodoro } from "./Pomodoro";
import type { PomodoroType } from "./PomodoroSettings";

export interface Task {
  id: string;
  title: string;
  date: string;

  pomodoroType: PomodoroType;
  customDuration?: number;
  
  pomodoros: Pomodoro[];
}
