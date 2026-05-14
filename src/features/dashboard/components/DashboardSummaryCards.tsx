import { formatMinutes, type DashboardStats } from "@/features/dashboard/utils/dashboardStats";

type Props = {
  stats: DashboardStats;
};

const DashboardSummaryCards = ({ stats }: Props) => {
  const cards = [
    {
      label: "Completadas hoy",
      value: stats.completedToday,
      detail: "misiones finalizadas",
    },
    {
      label: "Esta semana",
      value: stats.completedThisWeek,
      detail: "misiones finalizadas",
    },
    {
      label: "Este mes",
      value: stats.completedThisMonth,
      detail: "misiones finalizadas",
    },
    {
      label: "Tiempo enfocado",
      value: formatMinutes(stats.totalEstimatedMinutes),
      detail: `${stats.totalCompletedPomodoros} pomodoros completados`,
    },
  ];

  return (
    <section className="dashboard-summary" aria-label="Resumen de progreso">
      {cards.map((card) => (
        <article className="dashboard-card" key={card.label}>
          <span className="dashboard-card__label">{card.label}</span>
          <strong className="dashboard-card__value">{card.value}</strong>
          <span className="dashboard-card__detail">{card.detail}</span>
        </article>
      ))}
    </section>
  );
};

export default DashboardSummaryCards;
