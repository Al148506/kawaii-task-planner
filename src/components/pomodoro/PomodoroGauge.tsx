import { useMemo } from "react";
import "./PomodoroGauge.css";
interface Props {
  timeLeft: number;
  totalTime: number;
}

const PomodoroGauge = ({ timeLeft, totalTime }: Props) => {
  // progreso de 0 a 1
  const progress = 1 - timeLeft / totalTime;

  // convertir a grados (de 0 a 180)
  const angle = progress * 180;

  const rotation = useMemo(() => {
    return `rotate(${angle - 90} 100 100)`; // -90 para iniciar a la derecha
  }, [angle]);

  return (
    <svg width="220" height="140" viewBox="0 0 200 120">
      {/* arco fondo */}
      <path
        d="M20 100 A80 80 0 0 1 180 100"
        fill="none"
        stroke="#fbcfe8" // rosa pastel
        strokeWidth="10"
      />

      {/* segmentos kawaii */}
      <path
        d="M20 100 A80 80 0 0 1 70 40"
        stroke="#bbf7d0"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M70 40 A80 80 0 0 1 130 40"
        stroke="#fde68a"
        strokeWidth="10"
        fill="none"
      />
      <path
        d="M130 40 A80 80 0 0 1 180 100"
        stroke="#fca5a5"
        strokeWidth="10"
        fill="none"
      />

      {/* aguja */}
      <line
        x1="100"
        y1="100"
        x2="160"
        y2="100"
        stroke="#7c3aed"
        strokeWidth="4"
        strokeLinecap="round"
        transform={rotation}
        style={{
          transition: "transform 0.5s ease-out",
        }}
      />

      {/* centro */}
      <circle cx="100" cy="100" r="6" fill="#7c3aed" />
    </svg>
  );
};

export default PomodoroGauge;
