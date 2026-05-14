import { getPomodoroDuration } from "@/features/pomodoro/utils/pomodoro";
import type { Task } from "@/features/tasks/types/Task";

export type DashboardPeriod = "day" | "week" | "month";

export type DashboardSeriesItem = {
  label: string;
  completedTasks: number;
  totalTasks: number;
  estimatedMinutes: number;
  completedPomodoros: number;
};

export type DashboardStats = {
  completedToday: number;
  completedThisWeek: number;
  completedThisMonth: number;
  totalEstimatedMinutes: number;
  totalCompletedTasks: number;
  totalTasks: number;
  totalCompletedPomodoros: number;
  completionRate: number;
  currentSeries: DashboardSeriesItem[];
  topTasks: Array<{
    id: string;
    title: string;
    date: string;
    completedPomodoros: number;
    estimatedMinutes: number;
  }>;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const parseLocalDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const startOfWeek = (date: Date) => {
  const start = startOfDay(date);
  const day = start.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  start.setDate(start.getDate() + diff);
  return start;
};

const endOfWeek = (date: Date) => {
  const end = startOfWeek(date);
  end.setDate(end.getDate() + 6);
  return end;
};

const startOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const endOfMonth = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth() + 1, 0);

const isSameDay = (dateA: Date, dateB: Date) =>
  formatDateKey(dateA) === formatDateKey(dateB);

const isWithinRange = (date: Date, start: Date, end: Date) =>
  date >= startOfDay(start) && date <= startOfDay(end);

const isTaskCompleted = (task: Task) =>
  task.pomodoros.length > 0 && task.pomodoros.every((pomodoro) => pomodoro.completed);

const getCompletedPomodoroCount = (task: Task) =>
  task.pomodoros.filter((pomodoro) => pomodoro.completed).length;

const getEstimatedMinutes = (task: Task) =>
  getCompletedPomodoroCount(task) * getPomodoroDuration(task);

const createDaySeries = (tasks: Task[], referenceDate: Date) => {
  const key = formatDateKey(referenceDate);
  return [createSeriesItem(tasks, key, "Hoy")];
};

const createWeekSeries = (tasks: Task[], referenceDate: Date) => {
  const labels = ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"];
  const weekStart = startOfWeek(referenceDate);

  return labels.map((label, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    return createSeriesItem(tasks, formatDateKey(date), label);
  });
};

const createMonthSeries = (tasks: Task[], referenceDate: Date) => {
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);
  const weeks: DashboardSeriesItem[] = [];

  let cursor = new Date(monthStart);
  let week = 1;

  while (cursor <= monthEnd) {
    const weekStart = new Date(cursor);
    const weekEnd = new Date(Math.min(cursor.getTime() + 6 * DAY_MS, monthEnd.getTime()));
    const weekTasks = tasks.filter((task) => {
      const taskDate = parseLocalDate(task.date);
      return isWithinRange(taskDate, weekStart, weekEnd);
    });

    weeks.push(createAggregatedSeriesItem(weekTasks, `S${week}`));
    cursor = new Date(weekEnd.getTime() + DAY_MS);
    week += 1;
  }

  return weeks;
};

const createSeriesItem = (tasks: Task[], dateKey: string, label: string) => {
  const tasksForDate = tasks.filter((task) => task.date === dateKey);
  return createAggregatedSeriesItem(tasksForDate, label);
};

const createAggregatedSeriesItem = (tasks: Task[], label: string): DashboardSeriesItem => ({
  label,
  completedTasks: tasks.filter(isTaskCompleted).length,
  totalTasks: tasks.length,
  estimatedMinutes: tasks.reduce((total, task) => total + getEstimatedMinutes(task), 0),
  completedPomodoros: tasks.reduce(
    (total, task) => total + getCompletedPomodoroCount(task),
    0,
  ),
});

export const formatMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} h`;
  return `${hours} h ${remainingMinutes} min`;
};

export const getDashboardStats = (
  tasks: Task[],
  period: DashboardPeriod,
  referenceDate = new Date(),
): DashboardStats => {
  const today = startOfDay(referenceDate);
  const weekStart = startOfWeek(referenceDate);
  const weekEnd = endOfWeek(referenceDate);
  const monthStart = startOfMonth(referenceDate);
  const monthEnd = endOfMonth(referenceDate);

  const completedTasks = tasks.filter(isTaskCompleted);
  const totalEstimatedMinutes = tasks.reduce(
    (total, task) => total + getEstimatedMinutes(task),
    0,
  );
  const totalCompletedPomodoros = tasks.reduce(
    (total, task) => total + getCompletedPomodoroCount(task),
    0,
  );

  const currentSeries =
    period === "day"
      ? createDaySeries(tasks, referenceDate)
      : period === "week"
        ? createWeekSeries(tasks, referenceDate)
        : createMonthSeries(tasks, referenceDate);

  return {
    completedToday: completedTasks.filter((task) => isSameDay(parseLocalDate(task.date), today)).length,
    completedThisWeek: completedTasks.filter((task) =>
      isWithinRange(parseLocalDate(task.date), weekStart, weekEnd),
    ).length,
    completedThisMonth: completedTasks.filter((task) =>
      isWithinRange(parseLocalDate(task.date), monthStart, monthEnd),
    ).length,
    totalEstimatedMinutes,
    totalCompletedTasks: completedTasks.length,
    totalTasks: tasks.length,
    totalCompletedPomodoros,
    completionRate: tasks.length === 0 ? 0 : Math.round((completedTasks.length / tasks.length) * 100),
    currentSeries,
    topTasks: [...tasks]
      .map((task) => ({
        id: task.id,
        title: task.title,
        date: task.date,
        completedPomodoros: getCompletedPomodoroCount(task),
        estimatedMinutes: getEstimatedMinutes(task),
      }))
      .filter((task) => task.completedPomodoros > 0)
      .sort((taskA, taskB) => taskB.estimatedMinutes - taskA.estimatedMinutes)
      .slice(0, 5),
  };
};
