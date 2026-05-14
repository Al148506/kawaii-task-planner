import { useMemo } from "react";
import { useTasksContext } from "@/features/tasks/context/TasksContext";
import {
  getDashboardStats,
  type DashboardPeriod,
} from "@/features/dashboard/utils/dashboardStats";

export const useDashboardStats = (period: DashboardPeriod) => {
  const { tasks } = useTasksContext();

  return useMemo(() => getDashboardStats(tasks, period), [tasks, period]);
};
