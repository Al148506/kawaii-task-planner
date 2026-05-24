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
  
  const completedCount = task.pomodoros.filter(p => p.completed).length;
  const totalPomodoros = task.pomodoros.length;

  const handleStartPomodoro = (taskId: string, pomodoroId: string) => {
    if (activePomodoro) return;
    startPomodoro(taskId, pomodoroId, task.date, task.title, duration);
    onStartPomodoro();
  };

  return (
    <div className="task-item">
      <div className="task-item__content">
        {/* Checkbox visual */}
        <div className={`task-item__checkbox ${completedCount === totalPomodoros ? "task-item__checkbox--completed" : ""}`}>
          {completedCount === totalPomodoros && "✓"}
        </div>
        
        <div className="task-item__info">
          <div className="task-item__title-row">
            <span className="task-item__title">{task.title}</span>
            <span
              className="task-item__category-badge"
              style={{ "--category-color": category.color } as React.CSSProperties}
            >
              {category.label}
            </span>
          </div>

          <div className="task-item__meta">
            <span>⏱ {getTotalTaskDuration(task)} min</span>
          </div>
        </div>
      </div>

      <div className="task-item__actions">
        {/* Pomodoro badge */}
        <span className="task-item__pomodoro-badge">
          {completedCount}/{totalPomodoros} pomodoro{totalPomodoros > 1 ? "s" : ""}
        </span>

        {/* Pomodoro buttons */}
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
              title={p.completed ? "Completado" : "Iniciar pomodoro"}
            >
              {p.completed ? "✔" : "▶"}
            </button>
          ))}
        </div>

        {/* Delete button */}
        <button
          className="task-item__delete"
          onClick={() => deleteTask(task.id)}
          title="Eliminar tarea"
        >
          ⋮
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
