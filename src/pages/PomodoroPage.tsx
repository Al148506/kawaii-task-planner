import { usePomodoroController } from "../hooks/usePomodoroController";
import { usePomodoroDisplay } from "../hooks/usePomodoroDisplay";
import "./PomodoroPage.css";

const PomodoroPage = () => {
  const {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    cancelPomodoro,
    taskTitle,
    selectedDate,
  } = usePomodoroController();

  const { formattedDate, formatTime } = usePomodoroDisplay(selectedDate);

  return (
    <div className="pomodoro-page">
      <h1 className="pomodoro-time">{formatTime(timeLeft)}</h1>

      <p className="pomodoro-context">
        ⚔️ Trabajando en: <strong>{taskTitle}</strong> <br />
        📅 {formattedDate}
      </p>

      <div className="pomodoro-controls">
        {!isRunning ? (
          <button onClick={start}>▶ Start</button>
        ) : (
          <button onClick={pause}>⏸ Pause</button>
        )}
        <button onClick={reset}>🔄 Reset</button>
      </div>

      <button className="pomodoro-cancel" onClick={cancelPomodoro}>
        ❌ Cancelar Pomodoro
      </button>
    </div>
  );
};

export default PomodoroPage;