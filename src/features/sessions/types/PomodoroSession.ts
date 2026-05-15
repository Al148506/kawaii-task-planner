export type PomodoroSession = {
  id: string;
  taskId: string;
  pomodoroId: string;
  taskTitle: string;
  taskDate: string;
  startedAt: string;
  completedAt: string;
  estimatedMinutes: number;
  actualSeconds: number;
  pauseCount?: number;
};

export type CreatePomodoroSessionParams = Omit<PomodoroSession, "id">;
