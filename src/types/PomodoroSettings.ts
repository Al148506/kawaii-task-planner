export type PomodoroType = "classic" | "52_17" | "50_10" | "custom";

export const PomodoroDurations: Record<Exclude<PomodoroType, "custom">, number> = {
  classic: 25,
  "52_17": 52,
  "50_10": 50,
};

export type PomodoroSoundEvent =
  | "focusStart"
  | "breakStart"
  | "finished"
  | "cancelled";