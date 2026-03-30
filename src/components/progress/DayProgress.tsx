import React, { useMemo } from "react";
import type { Task } from "../../types/Task";
import "./DayProgress.css";

interface Props {
  tasks: Task[];
}

const DayProgress = ({ tasks }: Props) => {
  const totalTasks = tasks.length;

  const isTaskCompleted = (task: Task) =>
    task.pomodoros.length > 0 && task.pomodoros.every((p) => p.completed);

  const completedTasks = useMemo(
    () => tasks.filter(isTaskCompleted).length,
    [tasks],
  );

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getMessage = () => {
    if (progress === 100) return "Misión completada";
    if (progress >= 70) return "Casi lo logras";
    if (progress >= 40) return "Buen progreso";
    return "Comienza tu aventura";
  };

  return (
    <div className="tasks-page__progress">
      <div className="tasks-page__progress-header">
        <div>
          <div className="tasks-page__progress-title">progreso del día</div>
          <p className="tasks-page__progress-message">{getMessage()}</p>
        </div>
        <div className="tasks-page__progress-pct">
          <span className="tasks-page__progress-pct-number">{progress}</span>
          <span className="tasks-page__progress-pct-label">%</span>
        </div>
      </div>

      <div className="tasks-page__progress-bar">
        <div
          className="tasks-page__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="tasks-page__progress-info">
        <span className="tasks-page__progress-count">
          {completedTasks} / {totalTasks} completadas
        </span>
        <div className="tasks-page__progress-dots">
          {tasks.map((task, i) => (
            <div
              key={i}
              className={`tasks-page__progress-dot${
                isTaskCompleted(task) ? " tasks-page__progress-dot--done" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DayProgress;
