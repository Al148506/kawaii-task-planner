import { createContext, useContext } from "react";
import { useTasks } from "@/features/tasks/hooks/useTasks";

const TasksContext = createContext<ReturnType<typeof useTasks> | null>(null);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const tasks = useTasks();

  return (
    <TasksContext.Provider value={tasks}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);

  if (!context) {
    throw new Error("useTasksContext must be used within TasksProvider");
  }

  return context;
};
