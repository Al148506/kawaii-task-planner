import { useTasksContext } from "../context/TasksContext";

const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const useTasksOfDay = (formattedDate: string) => {
  const { tasks, getTasksByDate } = useTasksContext();

  const tasksOfSelectedDay = getTasksByDate(formattedDate);

  const daysWithTasks = tasks.map((t) => parseLocalDate(t.date));

  return {
    tasksOfSelectedDay,
    daysWithTasks,
  };
};