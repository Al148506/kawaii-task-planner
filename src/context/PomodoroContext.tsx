import { createContext, useContext, useState } from "react";

interface ActivePomodoro {
  taskId: string;
  pomodoroId: string;
  selectedDate: string;
  taskTitle: string;
}

interface PomodoroContextType {
  activePomodoro: ActivePomodoro | null;
  lastSelectedDate: string | null;
  startPomodoro: (
    taskId: string,
    pomodoroId: string,
    selectedDate: string,
    taskTitle: string
  ) => void;
  clearPomodoro: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | null>(null);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activePomodoro, setActivePomodoro] = useState<ActivePomodoro | null>(null);
  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null);

  const startPomodoro = (
    taskId: string,
    pomodoroId: string,
    selectedDate: string,
    taskTitle: string
  ) => {
    // 🔥 Guardamos la última fecha SIEMPRE
    setLastSelectedDate(selectedDate);

    // 🔥 Guardamos el pomodoro activo
    setActivePomodoro({ taskId, pomodoroId, selectedDate, taskTitle });
  };

  const clearPomodoro = () => {
    setActivePomodoro(null);
    // ⚠️ NO borramos lastSelectedDate (esto es intencional)
  };

  return (
    <PomodoroContext.Provider
      value={{
        activePomodoro,
        lastSelectedDate,
        startPomodoro,
        clearPomodoro,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export const usePomodoroContext = () => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoroContext must be used inside provider");
  }
  return context;
};