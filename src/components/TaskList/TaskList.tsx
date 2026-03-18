import type { Task } from "../../types/Task.ts";
import TaskItem from "../TaskItem.tsx";
import "./TaskList.css";
interface Props {
  tasks: Task[];
}

const TaskList = ({ tasks }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="tasks-page__empty">
        {" "}
        <span className="tasks-page__empty-icon">🧸</span>{" "}
        <p>No tasks for this day</p>{" "}
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
