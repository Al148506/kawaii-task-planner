import type { Task } from "../types/Task";
import { useTasksContext } from "../context/TasksContext";

interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { deleteTask, completePomodoro } = useTasksContext();

  return (
    <div className="task-item">
      <div className="task-item__content">
        <span className="task-item__title">{task.title}</span>

        <div className="pomodoro-list">
          {task.pomodoros.map((p) => (
            <button
              key={p.id}
              className={`pomodoro-btn ${p.completed ? "completed" : ""}`}
              disabled={p.completed}
              onClick={() => completePomodoro(task.id, p.id)}
            >
              {p.completed ? "✔" : "🍅"}
            </button>
          ))}
        </div>
      </div>

      <button className="task-item__delete" onClick={() => deleteTask(task.id)}>
        Eliminar
      </button>
    </div>
  );
};

export default TaskItem;
