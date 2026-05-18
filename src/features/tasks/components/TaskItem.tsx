import type { Task } from "@/features/tasks/types/Task";
import { useTasksContext } from "@/features/tasks/context/TasksContext";
import { usePomodoroContext } from "@/features/pomodoro/context/PomodoroContext";
import { getPomodoroDuration, getTotalTaskDuration } from "@/features/pomodoro/utils/pomodoro";
import { getCategoryConfig } from "@/features/tasks/types/Category";
interface Props {
  task: Task;
  onStartPomodoro: () => void;
}

const TaskItem = ({ task, onStartPomodoro }: Props) => {
  const { deleteTask } = useTasksContext();
  const { startPomodoro, activePomodoro } = usePomodoroContext();
  const duration = getPomodoroDuration(task);
  const category = getCategoryConfig(task.category);

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
        <div className="task-item__title-row">
          <span
            className="task-item__category-badge"
            style={{ background: `${category.color}33`, color: category.color, border: `1px solid ${category.color}55` }}
          >
            {category.emoji}
          </span>
          <span className="task-item__title">{task.title}</span>
        </div>

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
