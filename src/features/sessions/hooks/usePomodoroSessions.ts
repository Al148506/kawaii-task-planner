import { useEffect, useState } from "react";
import type {
  CreatePomodoroSessionParams,
  PomodoroSession,
} from "@/features/sessions/types/PomodoroSession";
import {
  loadPomodoroSessions,
  savePomodoroSessions,
} from "@/features/sessions/utils/sessionStorage";

export const usePomodoroSessions = () => {
  const [sessions, setSessions] = useState<PomodoroSession[]>(loadPomodoroSessions);

  useEffect(() => {
    savePomodoroSessions(sessions);
  }, [sessions]);

  const addSession = (session: CreatePomodoroSessionParams) => {
    setSessions((prev) => {
      const alreadyRecorded = prev.some(
        (item) => item.pomodoroId === session.pomodoroId,
      );

      if (alreadyRecorded) return prev;

      return [
        ...prev,
        {
          ...session,
          id: crypto.randomUUID(),
        },
      ];
    });
  };

  const clearSessions = () => {
    setSessions([]);
  };

  return {
    sessions,
    addSession,
    clearSessions,
  };
};
