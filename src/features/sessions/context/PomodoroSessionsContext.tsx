import { createContext, useContext } from "react";
import { usePomodoroSessions } from "@/features/sessions/hooks/usePomodoroSessions";

const PomodoroSessionsContext = createContext<ReturnType<
  typeof usePomodoroSessions
> | null>(null);

export const PomodoroSessionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const sessions = usePomodoroSessions();

  return (
    <PomodoroSessionsContext.Provider value={sessions}>
      {children}
    </PomodoroSessionsContext.Provider>
  );
};

export const usePomodoroSessionsContext = () => {
  const context = useContext(PomodoroSessionsContext);

  if (!context) {
    throw new Error(
      "usePomodoroSessionsContext must be used within PomodoroSessionsProvider",
    );
  }

  return context;
};
