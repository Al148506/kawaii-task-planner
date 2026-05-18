import type { Achievement } from "@/features/progression/types/Achievement";
import type { PomodoroSession } from "@/features/sessions/types/PomodoroSession";
import type { Task } from "@/features/tasks/types/Task";
import { achievementsCatalog } from "@/features/progression/utils/achievementsCatalog";

type EvaluationParams = {
  sessions: PomodoroSession[];
  tasks: Task[];
  latestSession: PomodoroSession;
};

const getDateKey = (date: string) => date.slice(0, 10);

const isTaskCompleted = (task: Task) =>
  task.pomodoros.length > 0 && task.pomodoros.every((pomodoro) => pomodoro.completed);

const getAchievement = (id: string) =>
  achievementsCatalog.find((achievement) => achievement.id === id);

const isThreePomodoroCombo = (sessions: PomodoroSession[]) => {
  const sortedSessions = [...sessions].sort(
    (sessionA, sessionB) =>
      new Date(sessionA.completedAt).getTime() - new Date(sessionB.completedAt).getTime(),
  );

  return sortedSessions.length >= 3;
};

const getCompletedTasksForDay = (tasks: Task[], date: string) =>
  tasks.filter((task) => task.date === date && isTaskCompleted(task)).length;

const getPomodorosForDay = (sessions: PomodoroSession[], date: string) =>
  sessions.filter((session) => getDateKey(session.completedAt) === date).length;

const getCompletedTasksByCategory = (tasks: Task[], category: string) =>
  tasks.filter((task) => task.category === category && isTaskCompleted(task)).length;

export const evaluateAchievements = ({
  sessions,
  tasks,
  latestSession,
}: EvaluationParams): Achievement[] => {
  const unlocked: Achievement[] = [];
  const totalEstimatedMinutes = sessions.reduce(
    (total, session) => total + session.estimatedMinutes,
    0,
  );
  const latestDate = getDateKey(latestSession.completedAt);

  const checks: Array<[string, boolean]> = [
    ["first_pomodoro", sessions.length >= 1],
    ["three_pomodoros_in_row", isThreePomodoroCombo(sessions)],
    ["focus_without_pause", (latestSession.pauseCount ?? 0) === 0],
    ["five_tasks_day", getCompletedTasksForDay(tasks, latestSession.taskDate) >= 5],
    ["ten_pomodoros_total", sessions.length >= 10],
    ["first_full_task", tasks.some(isTaskCompleted)],
    ["one_hour_focus", totalEstimatedMinutes >= 60],
    ["daily_warrior", getPomodorosForDay(sessions, latestDate) >= 3],
    ["study_dedication", getCompletedTasksByCategory(tasks, "estudio") >= 5],
  ];

  checks.forEach(([id, passed]) => {
    const achievement = getAchievement(id);
    if (passed && achievement) unlocked.push(achievement);
  });

  return unlocked;
};
