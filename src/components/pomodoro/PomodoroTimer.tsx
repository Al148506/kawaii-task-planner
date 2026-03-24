import { useEffect } from "react";
import { usePomodoro } from "../../hooks/usePomodoro";
import { usePomodoroContext } from "../../context/PomodoroContext";
import { useTasksContext } from "../../context/TasksContext";
import "./PomodoroTimer.css";
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const PomodoroTimer = () => {
  const { timeLeft, isRunning, start, pause, reset } = usePomodoro(1500);
  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { completePomodoro } = useTasksContext();

  useEffect(() => {
    if (timeLeft === 0 && activePomodoro) {
      completePomodoro(activePomodoro.taskId, activePomodoro.pomodoroId);

      clearPomodoro();
    }
  }, [timeLeft]);

  useEffect(() => {
    if (activePomodoro) {
      reset();
      start();
    }
  }, [activePomodoro]);
  return (
    <div className="pomodoro-timer">
      {" "}
      <h2>{formatTime(timeLeft)}</h2>
      <div className="pomodoro-controls">
        {!isRunning ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
