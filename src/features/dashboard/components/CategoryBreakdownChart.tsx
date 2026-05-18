import type { CategoryStat } from "@/features/dashboard/utils/dashboardStats";
import { getCategoryConfig } from "@/features/tasks/types/Category";
import { formatMinutes } from "@/features/dashboard/utils/dashboardStats";

type Props = {
  breakdown: CategoryStat[];
};

const CategoryBreakdownChart = ({ breakdown }: Props) => {
  const maxMinutes = Math.max(1, ...breakdown.map((item) => item.estimatedMinutes));

  return (
    <section className="dashboard-panel">
      <div className="dashboard-panel__header">
        <p className="dashboard-section-label">Tiempo por categoría</p>
        <span>minutos estimados</span>
      </div>

      <div className="dashboard-time-list">
        {breakdown.length === 0 ? (
          <div className="dashboard-empty">Completa pomodoros para ver estadísticas.</div>
        ) : (
          breakdown.map((item) => {
            const config = getCategoryConfig(item.category);
            const width = Math.max(4, (item.estimatedMinutes / maxMinutes) * 100);

            return (
              <div className="dashboard-time-row" key={item.category}>
                <span className="dashboard-time-row__label">
                  {config.emoji} {config.label}
                </span>
                <div className="dashboard-time-row__track">
                  <div
                    className="dashboard-time-row__fill"
                    style={{
                      width: `${width}%`,
                      "--category-color": config.color,
                    } as React.CSSProperties}
                  />
                </div>
                <strong>{formatMinutes(item.estimatedMinutes)}</strong>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default CategoryBreakdownChart;
