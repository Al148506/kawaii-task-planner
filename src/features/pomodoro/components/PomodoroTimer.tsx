import { useEffect } from "react";
import { usePomodoro } from "@/features/pomodoro/hooks/usePomodoro";
import { usePomodoroContext } from "@/features/pomodoro/context/PomodoroContext";
import { useTasksContext } from "@/features/tasks/context/TasksContext";
import "./PomodoroTimer.css";
import { utilFormatTime } from "@/shared/utils/utilFormatTime";


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
      <h2>{utilFormatTime(timeLeft)}</h2>
      <div className="pomodoro-controls">
        {!isRunning ? (
          <button onClick={start}>Start</button>
        ) : (
          <button onClick={pause}>Pause</button>
        )}
        <button onClick={() => reset()}>Reset</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;
