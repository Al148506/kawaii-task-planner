import { usePomodoroController } from "../hooks/usePomodoroController";
import { usePomodoroDisplay } from "../hooks/usePomodoroDisplay";
import { WaifuAssistant } from "../components/waifu/WaifuAssistant";
import "./PomodoroPage.css";
import { useState } from "react";

export const waifuId = "waifu1";

interface Props {
  onClose?: () => void;
}
const PomodoroPage = ({ onClose }: Props) => {
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    cancelPomodoro,
    taskTitle,
    selectedDate,
    mood,
    message,
    remainingCount,
    totalCount,
    phase,
  } = usePomodoroController();

  const { formattedDate, formatTime } = usePomodoroDisplay(selectedDate);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="pomodoro-page">
      {/* ✨ Decorative */}
      <span className="pomodoro-sparkle pomodoro-sparkle--left">♡ ˖ ✦</span>
      <span className="pomodoro-sparkle pomodoro-sparkle--right">✦ ˖ ♡</span>
      <p className="pomodoro-progress">
        🍅 {remainingCount} / {totalCount} restantes
      </p>
      {/* ⏱ Timer */}
      <div className="pomodoro-header">
        <h1 className={`pomodoro-time${isRunning ? " is-running" : ""}`}>
          {formatTime(timeLeft)}
        </h1>
      </div>

      {/* 🧠 Waifu */}
      <div className="pomodoro-waifu-wrapper">
        <WaifuAssistant
          mood={showConfirm ? "sad" : mood}
          message={
            showConfirm
              ? "¿Ya te vas tan rápido? 😢 Pensé que nos estábamos divirtiendo..."
              : message
          }
          waifuId={waifuId}
        />
      </div>

      {/* 📌 Contexto */}
      {!showConfirm && (
        <p className="pomodoro-context">
          ⚔️ Trabajando en: <strong>{taskTitle}</strong>
          <br />
          📅 {formattedDate}
        </p>
      )}

      <p>{phase === "focus" ? "🔥 Enfoque" : "🌸 Descanso"}</p>

      {/* 🎮 Controles */}
      {!showConfirm && (
        <div className="pomodoro-controls">
          {!isRunning ? (
            <button onClick={start}>▶ Start</button>
          ) : (
            <button onClick={pause}>⏸ Pause</button>
          )}

          {/* 🔄 Reset CORRECTO */}
          <button onClick={() => reset()}>🔄 Reset</button>
        </div>
      )}

      {/* ❌ Cancelación */}
      {!showConfirm ? (
        <button
          className="pomodoro-cancel"
          onClick={() => setShowConfirm(true)}
        >
          ❌ Cancelar Pomodoro
        </button>
      ) : (
        <div className="pomodoro-confirm">
          <p className="pomodoro-confirm__text">
            ¿Segura que quieres cancelar? 🥺
          </p>

          <div className="pomodoro-confirm__actions">
            <button
              className="pomodoro-confirm__btn pomodoro-confirm__btn--yes"
              onClick={() => {
                cancelPomodoro();
                onClose?.();
              }}
            >
              Sí, salir 💔
            </button>

            <button
              className="pomodoro-confirm__btn pomodoro-confirm__btn--no"
              onClick={() => setShowConfirm(false)}
            >
              ¡Me quedo! 🌸
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PomodoroPage;
