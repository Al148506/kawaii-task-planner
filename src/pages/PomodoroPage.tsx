import { usePomodoroController } from "../hooks/usePomodoroController";
import { usePomodoroDisplay } from "../hooks/usePomodoroDisplay";
import WaifuAssistant from "../components/waifu/WaifuAssitant";
import { useWaifuMood } from "../hooks/useWaifuMood";
import { getWaifuMessage } from "../helpers/getWaifuMessage";
import PomodoroGauge from "../components/pomodoro/PomodoroGauge";
import "./PomodoroPage.css";
import { useState } from "react";

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
    mood,
    message,
  } = usePomodoroController();

  const { formattedDate, formatTime } = usePomodoroDisplay(selectedDate);

  return (
    <div className="pomodoro-page">
      <PomodoroGauge timeLeft={timeLeft} totalTime={1500} />
      <h1 className="pomodoro-time">{formatTime(timeLeft)}</h1>
      <WaifuAssistant mood={mood} message={message} />

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
