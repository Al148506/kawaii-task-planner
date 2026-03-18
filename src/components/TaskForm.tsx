import { useState } from "react";
import { useTasksContext } from "../context/TasksContext";
import type { PomodoroType } from "../types/PomodoroSettings";

interface Props {
  date: string;
}

const TaskForm = ({ date }: Props) => {

  const { addTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [plannedHours, setPlannedHours] = useState(1);
  const [pomodoroType, setPomodoroType] = useState<PomodoroType>("classic");
  const [customDuration, setCustomDuration] = useState(25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    addTask(
      title,
      date,
      plannedHours,
      pomodoroType,
      pomodoroType === "custom" ? customDuration : 0
    );

    setTitle("");
    setPlannedHours(1);
    setPomodoroType("classic");
    setCustomDuration(25);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>

      <input
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div style={{ marginTop: "0.5rem" }}>
        <label>Horas planeadas:</label>

        <input
          type="number"
          min="0.5"
          step="0.5"
          value={plannedHours}
          onChange={(e) => setPlannedHours(Number(e.target.value))}
        />
      </div>

      <div style={{ marginTop: "0.5rem" }}>
        <label>Tipo de Pomodoro:</label>

        <select
          value={pomodoroType}
          onChange={(e) => setPomodoroType(e.target.value as PomodoroType)}
        >
          <option value="short">Corto (15 min)</option>
          <option value="classic">Clásico (25 min)</option>
          <option value="long">Largo (50 min)</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {pomodoroType === "custom" && (
        <div style={{ marginTop: "0.5rem" }}>
          <label>Duración custom (minutos):</label>

          <input
            type="number"
            min="5"
            value={customDuration}
            onChange={(e) => setCustomDuration(Number(e.target.value))}
          />
        </div>
      )}

      <button style={{ marginTop: "1rem" }}>
        Agregar
      </button>

    </form>
  );
};

export default TaskForm;