import { useEffect, useState } from "react";
import { useTasksContext } from "../context/TasksContext";
import {
  type PomodoroType,
  PomodoroDurations,
} from "../types/PomodoroSettings";
import type { RepetitionSettings } from "../types/repetitionSettings";
import {generateDatesByRepetition} from "../utils/generateDatesByRepetition"
import { createTasks } from "../helpers/createTasks";
import { showDuplicateTaskAlert } from "../utils/alerts";
interface Props {
  date: string;
}

const TaskForm = ({ date }: Props) => {
  const { addTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [pomodoroCount, setPomodoroCount] = useState(1);
  const [pomodoroType, setPomodoroType] = useState<PomodoroType>("classic");
  const [customDuration, setCustomDuration] = useState(25);

  // 🧮 Calcular duración base
  const baseDuration =
    pomodoroType === "custom"
      ? customDuration
      : PomodoroDurations[pomodoroType];

  // 🧮 Total
  const totalMinutes = baseDuration * pomodoroCount;

  const [repetitionType, setRepetitionType] =
    useState<RepetitionSettings>("None");

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim()) return;

 const tasks = createTasks({
    title,
    date,
    pomodoroCount,
    pomodoroType,
    customDuration,
    repetitionType,
  });

    let duplicates = 0;

  tasks.forEach((task) => {
    const added = addTask(task);
    if (!added) duplicates++;
  });

  if (duplicates > 0) {
    showDuplicateTaskAlert(duplicates);
  }

  // reset (mejor fuera del if)
  setTitle("");
  setPomodoroCount(1);
  setPomodoroType("classic");
  setCustomDuration(25);
  setRepetitionType("None");
};



  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <input
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/*Cantidad de pomodoros */}
      <div style={{ marginTop: "0.5rem" }}>
        <label>Pomodoros:</label>

        <input
          type="number"
          min="1"
          value={pomodoroCount}
          onChange={(e) => setPomodoroCount(Number(e.target.value))}
        />
      </div>

      {/*Tipo */}
      <div style={{ marginTop: "0.5rem" }}>
        <label>Tipo de Pomodoro:</label>

        <select
          value={pomodoroType}
          onChange={(e) => setPomodoroType(e.target.value as PomodoroType)}
        >
          <option value="classic">Clásico (25/5)</option>
          <option value="52_17">52/17</option>
          <option value="50_10">50/10</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {/*Tipo */}
      <div style={{ marginTop: "0.5rem" }}>
        <label>Ciclo de Repetición:</label>

        <select
          value={repetitionType}
          onChange={(e) =>
            setRepetitionType(e.target.value as RepetitionSettings)
          }
        >
          <option value="None">Ninguno</option>
          <option value="Daily">Todos los dias</option>
          <option value="Weekdays">De Lunes a Viernes</option>
          <option value="Weekends">Fines de Semena</option>
        </select>
      </div>

      {/* Custom */}
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
      {/* 📊 Resumen */}
      <div style={{ marginTop: "0.75rem", fontSize: "0.9rem", opacity: 0.8 }}>
        <p>
          ⏳ Tiempo total: <strong>{totalMinutes} min</strong> (
          {(totalMinutes / 60).toFixed(1)} hrs)
        </p>
      </div>

      <button style={{ marginTop: "1rem" }}>Agregar</button>
    </form>
  );
};
export default TaskForm;
