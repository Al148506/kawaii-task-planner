import { formatMinutes, type DashboardStats } from "@/features/dashboard/utils/dashboardStats";

type Props = {
  stats: DashboardStats;
};

const TaskProgressChart = ({ stats }: Props) => (
  <section className="dashboard-panel dashboard-progress-panel">
    <div className="dashboard-panel__header">
      <p className="dashboard-section-label">Progreso general</p>
      <span>{stats.totalCompletedTasks} de {stats.totalTasks} tareas</span>
    </div>

    <div className="dashboard-progress-ring" style={{ "--progress": `${stats.completionRate}%` } as React.CSSProperties}>
      <div className="dashboard-progress-ring__inner">
        <strong>{stats.completionRate}%</strong>
        <span>completado</span>
      </div>
    </div>

    <div className="dashboard-top-tasks">
      <p className="dashboard-section-label">Mas enfoque acumulado</p>
      {stats.topTasks.length === 0 ? (
        <div className="dashboard-empty">Completa pomodoros para ver tu ranking.</div>
      ) : (
        stats.topTasks.map((task) => (
          <div className="dashboard-top-task" key={task.id}>
            <div>
              <strong>{task.title}</strong>
              <span>{task.date}</span>
            </div>
            <span>{formatMinutes(task.estimatedMinutes)}</span>
          </div>
        ))
      )}
    </div>
  </section>
);

export default TaskProgressChart;
