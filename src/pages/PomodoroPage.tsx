// PomodoroPage.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePomodoro } from "../hooks/usePomodoro";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useTasksContext } from "../context/TasksContext";

import "./PomodoroPage.css";

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

// Garantiza que la fecha llegue como "YYYY-MM-DD" local sin desfase UTC

const PomodoroPage = () => {
  const navigate = useNavigate();
  const { timeLeft, isRunning, start, pause, reset } = usePomodoro(1500);
  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro } = useTasksContext();
 

  // selectedDate siempre será un string "YYYY-MM-DD"
  const selectedDate = activePomodoro?.selectedDate ?? "";
  const taskTitle = activePomodoro?.taskTitle ?? "";

  const formattedDate = selectedDate
    ? new Date(selectedDate + "T00:00:00") // forzar parseo local
        .toLocaleDateString("es-MX", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
    : "";

  useEffect(() => {
    if (!taskTitle || !selectedDate) {
      navigate("/");
    }
  }, [taskTitle, selectedDate]);

  useEffect(() => {
    if (timeLeft === 0 && activePomodoro) {
      completePomodoro(activePomodoro.taskId, activePomodoro.pomodoroId);
      clearPomodoro();
      navigate("/", { state: { selectedDate } }); // ya es string limpio
    }
  }, [timeLeft]);

  useEffect(() => {
    if (activePomodoro) {
      reset();
      start();
    } else {
      navigate("/");
    }
  }, [activePomodoro]);

  const handleCancel = () => {
    reset();
    clearPomodoro();
    navigate("/", { state: { selectedDate } }); // ya es string limpio
  };

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
      <button className="pomodoro-cancel" onClick={handleCancel}>
        ❌ Cancelar Pomodoro
      </button>
    </div>
  );
};

export default PomodoroPage;
