import {
  formatMinutes,
  type DashboardSeriesItem,
} from "@/features/dashboard/utils/dashboardStats";

type Props = {
  series: DashboardSeriesItem[];
};

const TimeSpentChart = ({ series }: Props) => {
  const maxMinutes = Math.max(1, ...series.map((item) => item.estimatedMinutes));

  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__header">
        <p className="dashboard-section-label">Tiempo estimado</p>
        <span>por pomodoros completados</span>
      </div>

      <div className="dashboard-time-list">
        {series.map((item) => {
          const width = Math.max(4, (item.estimatedMinutes / maxMinutes) * 100);

          return (
            <div className="dashboard-time-row" key={item.label}>
              <span className="dashboard-time-row__label">{item.label}</span>
              <div className="dashboard-time-row__track">
                <div className="dashboard-time-row__fill" style={{ width: `${width}%` }} />
              </div>
              <strong>{formatMinutes(item.estimatedMinutes)}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimeSpentChart;
