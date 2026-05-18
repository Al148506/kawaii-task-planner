import { useState } from "react";
import CategoryBreakdownChart from "@/features/dashboard/components/CategoryBreakdownChart";
import CompletedTasksChart from "@/features/dashboard/components/CompletedTasksChart";
import DashboardSummaryCards from "@/features/dashboard/components/DashboardSummaryCards";
import PeriodSelector from "@/features/dashboard/components/PeriodSelector";
import TaskProgressChart from "@/features/dashboard/components/TaskProgressChart";
import TimeSpentChart from "@/features/dashboard/components/TimeSpentChart";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import type { DashboardPeriod } from "@/features/dashboard/utils/dashboardStats";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [period, setPeriod] = useState<DashboardPeriod>("week");
  const stats = useDashboardStats(period);

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="dashboard-kicker">Registro de aventura</p>
          <h2>Dashboard de progreso</h2>
          <p>
            Visualiza misiones completadas, pomodoros terminados y tiempo enfocado
            estimado segun tu avance.
          </p>
        </div>
        <PeriodSelector period={period} onChange={setPeriod} />
      </section>

      <DashboardSummaryCards stats={stats} />

      <div className="dashboard-grid">
        <CompletedTasksChart series={stats.currentSeries} />
        <TimeSpentChart series={stats.currentSeries} />
        <TaskProgressChart stats={stats} />
        <CategoryBreakdownChart breakdown={stats.categoryBreakdown} />
      </div>
    </div>
  );
};

export default DashboardPage;
