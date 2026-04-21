import { usePomodoroController } from "../hooks/usePomodoroController";
import { usePomodoroDisplay } from "../hooks/usePomodoroDisplay";
import { WaifuAssistant } from "../components/waifuAssistant/WaifuAssistant";
import "./PomodoroPage.css";
import { useState } from "react";
import { useWaifu } from "../hooks/useWaifu";



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

  const isFinished = phase === "finished";

  // Calcula el porcentaje de pomodoros completados para la barra
  const completedCount = totalCount - remainingCount;
  const progressPercent =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Genera los dots de progreso
  const progressDots = Array.from({ length: totalCount }, (_, i) => (
    <span
      key={i}
      className={`pomodoro-dot${i < completedCount ? " done" : ""}`}
    />
  ));

  const { waifuId } = useWaifu();

  const phaseLabel =
    phase === "focus"
      ? "🔥 Enfoque"
      : phase === "break"
        ? "🌸 Descanso"
        : "🎉 ¡Completado!";

  return (
    <div className="pomodoro-page">
      {/* ── Burbujas decorativas ── */}
      <div className="pomodoro-bubble pomodoro-bubble--1" />
      <div className="pomodoro-bubble pomodoro-bubble--2" />
      <div className="pomodoro-bubble pomodoro-bubble--3" />

      {/* ── Sparkles ── */}
      <span className="pomodoro-sparkle pomodoro-sparkle--tl">♡ ˖ ✦</span>
      <span className="pomodoro-sparkle pomodoro-sparkle--tr">✦ ˖ ♡</span>
      <span className="pomodoro-sparkle pomodoro-sparkle--bl">· · ˚</span>
      <span className="pomodoro-sparkle pomodoro-sparkle--br">˚ · ·</span>

      {/* ── Badge de progreso con dots ── */}
      {!isFinished && (
        <p className="pomodoro-progress">
          🍅 {remainingCount} / {totalCount} restantes
          {totalCount > 0 && (
            <span className="pomodoro-dots">{progressDots}</span>
          )}
        </p>
      )}

      {/* ── Timer ── */}
      <div className="pomodoro-header">
        <span className="pomodoro-phase-tag">{phaseLabel}</span>
        <h1 className={`pomodoro-time${isRunning ? " is-running" : ""}`}>
          {formatTime(timeLeft)}
        </h1>
      </div>

      {/* ── Waifu ── */}
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

      {/* ── Contexto ── */}
      {!showConfirm && !isFinished && (
        <p className="pomodoro-context">
          ⚔️ Trabajando en: <strong>{taskTitle}</strong>
          <br />
          📅 {formattedDate}
        </p>
      )}

      {/* ── Controles ── */}
      {!showConfirm && !isFinished && (
        <div className="pomodoro-controls">
          {!isRunning ? (
            <button onClick={start}>▶ Start</button>
          ) : (
            <button onClick={pause}>⏸ Pause</button>
          )}
          <button onClick={() => reset()}>🔄 Reset</button>
        </div>
      )}

      {/* ── Cancelación ── */}
      {!isFinished && (
        <>
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
                ¿Seguro que quieres cancelar? 🥺
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
        </>
      )}

      {/* ── Botón final ── */}
      {isFinished && (
        <div className="pomodoro-finished">
          <button
            className="pomodoro-finished__btn"
            onClick={() => onClose?.()}
          >
            🎉 Terminar y volver
          </button>
        </div>
      )}

      {/* ── Barra de progreso inferior ── */}
      <div className="pomodoro-bar-track">
        <div
          className="pomodoro-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default PomodoroPage;
