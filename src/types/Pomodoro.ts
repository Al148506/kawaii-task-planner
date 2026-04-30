export interface Pomodoro {
  id: string;
  completed: boolean;
}

export type PomodoroStatus = 
  | "idle"
  | "running"
  | "paused"
  | "cancelled"
  | "finished"
  | "completed";

  export type PomodoroEvent =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "TICK" }
  | { type: "FINISH_SESSION" }   // terminó un pomodoro
  | { type: "START_BREAK" }
  | { type: "END_BREAK" }
  | { type: "COMPLETE_TASK" }    // todos los pomodoros listos
  | { type: "RESET" }
  | { type: "CANCEL" };
