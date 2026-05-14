import type { DashboardPeriod } from "@/features/dashboard/utils/dashboardStats";

type Props = {
  period: DashboardPeriod;
  onChange: (period: DashboardPeriod) => void;
};

const options: Array<{ value: DashboardPeriod; label: string }> = [
  { value: "day", label: "Dia" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
];

const PeriodSelector = ({ period, onChange }: Props) => (
  <div className="dashboard-period" aria-label="Seleccionar periodo">
    {options.map((option) => (
      <button
        key={option.value}
        className={`dashboard-period__btn${period === option.value ? " is-active" : ""}`}
        type="button"
        onClick={() => onChange(option.value)}
      >
        {option.label}
      </button>
    ))}
  </div>
);

export default PeriodSelector;
