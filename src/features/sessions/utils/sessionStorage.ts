import type { PomodoroSession } from "@/features/sessions/types/PomodoroSession";

const STORAGE_KEY = "pomodoroSessions:v1";

export const loadPomodoroSessions = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as PomodoroSession[]) : [];
  } catch {
    return [];
  }
};

export const savePomodoroSessions = (sessions: PomodoroSession[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
};
