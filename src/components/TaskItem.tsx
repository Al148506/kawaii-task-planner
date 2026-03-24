import type { Task } from "../types/Task";
import { useTasksContext } from "../context/TasksContext";
import { usePomodoroContext } from "../context/PomodoroContext";
import { useNavigate } from "react-router-dom";
interface Props {
  task: Task;
}

const TaskItem = ({ task }: Props) => {
  const { deleteTask } = useTasksContext();
  const { startPomodoro, activePomodoro } = usePomodoroContext();
  const navigate = useNavigate(); // 👈 agregar esto

  const handleStartPomodoro = (taskId: string, pomodoroId: string) => {
    if (activePomodoro) return;

    startPomodoro(taskId, pomodoroId, task.date, task.title);

    navigate("/pomodoro");
  };
  return (
    <div className="task-item">
      <div className="task-item__content">
        <span className="task-item__title">{task.title}</span>

        <div className="pomodoro-list">
          {task.pomodoros.map((p) => (
            <button
              key={p.id}
              className={`pomodoro-btn 
    ${p.completed ? "completed" : ""} 
    ${activePomodoro?.pomodoroId === p.id ? "active" : ""}`}
              disabled={p.completed}
              onClick={() => handleStartPomodoro(task.id, p.id)}
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
