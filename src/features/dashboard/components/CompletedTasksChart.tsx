import type { DashboardSeriesItem } from "@/features/dashboard/utils/dashboardStats";

type Props = {
  series: DashboardSeriesItem[];
};

const CompletedTasksChart = ({ series }: Props) => {
  const maxValue = Math.max(1, ...series.map((item) => item.completedTasks));

  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__header">
        <p className="dashboard-section-label">Tareas completadas</p>
        <span>por periodo</span>
      </div>

      <div className="dashboard-bars" aria-label="Grafica de tareas completadas">
        {series.map((item) => {
          const height = Math.max(8, (item.completedTasks / maxValue) * 100);

          return (
            <div className="dashboard-bars__item" key={item.label}>
              <div className="dashboard-bars__track">
                <div className="dashboard-bars__fill" style={{ height: `${height}%` }} />
              </div>
              <strong>{item.completedTasks}</strong>
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CompletedTasksChart;
