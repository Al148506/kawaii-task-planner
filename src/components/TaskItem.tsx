import type { Task } from "../types/Task";
import { useTasksContext } from "../context/TasksContext";
import { usePomodoroContext } from "../context/PomodoroContext";
import { getPomodoroDuration, getTotalTaskDuration } from "../utils/pomodoro";
interface Props {
  task: Task;
  onStartPomodoro: () => void;
}

const TaskItem = ({ task, onStartPomodoro }: Props) => {
  const { deleteTask } = useTasksContext();
  const { startPomodoro, activePomodoro } = usePomodoroContext();
  const duration = getPomodoroDuration(task);

  const handleStartPomodoro = (taskId: string, pomodoroId: string) => {
    if (activePomodoro) return;
    startPomodoro(
      taskId,
      pomodoroId,
      task.date,
      task.title,
      duration
    );

    onStartPomodoro();
  };

  return (
    <div className="task-item">
      <div className="task-item__content">
        <span className="task-item__title">{task.title}</span>

        {/* 🍅 Lista de pomodoros */}
        <div className="pomodoro-list">
          {task.pomodoros.map((p) => (
            <button
              key={p.id}
              className={`pomodoro-btn 
                ${p.completed ? "completed" : ""} 
                ${activePomodoro?.pomodoroId === p.id ? "active" : ""}
              `}
              disabled={p.completed}
              onClick={() => handleStartPomodoro(task.id, p.id)}
            >
              {p.completed ? "✔" : "🍅"}
            </button>
          ))}
        </div>

        {/* ⏱ Info opcional (muy útil para UX) */}
        <div style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.25rem" }}>
          {task.pomodoroType === "custom"
            ? `Custom (${task.customDuration ?? 25} min)`
            : `${task.pomodoroType} ${getTotalTaskDuration(task)} min)`
          }
        </div>
      </div>

      {/* 🗑 Eliminar */}
      <button
        className="task-item__delete"
        onClick={() => deleteTask(task.id)}
      >
        Eliminar
      </button>
    </div>
  );
};

export default TaskItem;