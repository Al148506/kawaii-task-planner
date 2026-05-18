import { useState } from "react";
import { useTasksContext } from "@/features/tasks/context/TasksContext";
import {
  type PomodoroType,
  PomodoroDurations,
} from "@/features/pomodoro/types/PomodoroSettings";
import type { RepetitionSettings } from "@/features/tasks/types/RepetitionSettings";
import type { TaskCategory } from "@/features/tasks/types/Category";
import { TASK_CATEGORIES, DEFAULT_CATEGORY } from "@/features/tasks/types/Category";
import { createTasks } from "@/features/tasks/utils/createTasks";
import { showDuplicateTaskAlert } from "@/shared/utils/alerts";
interface Props {
  date: string;
}

const TaskForm = ({ date }: Props) => {
  const { addTask } = useTasksContext();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<TaskCategory>(DEFAULT_CATEGORY);
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
    category,
  });

    let duplicates = 0;

  tasks.forEach((task) => {
    const added = addTask(task);
    if (!added) duplicates++;
  });

  if (duplicates > 0) {
    showDuplicateTaskAlert(duplicates);
  }

  setTitle("");
  setCategory(DEFAULT_CATEGORY);
  setPomodoroCount(1);
  setPomodoroType("classic");
  setCustomDuration(25);
  setRepetitionType("None");
};



  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Categoría */}
      <div className="task-form__field">
        <label>
          Categoría:
        </label>
        <div className="task-form__category-list">
          {TASK_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`task-form__category-chip${category === cat.id ? " is-active" : ""}`}
              style={{ "--category-color": cat.color } as React.CSSProperties}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/*Cantidad de pomodoros */}
      <div className="task-form__field">
        <label>Pomodoros:</label>

        <input
          type="number"
          min="1"
          value={pomodoroCount}
          onChange={(e) => setPomodoroCount(Number(e.target.value))}
        />
      </div>

      {/*Tipo */}
      <div className="task-form__field">
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
      <div className="task-form__field">
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
        <div className="task-form__field">
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
      <div className="task-form__summary">
        <p>
          ⏳ Tiempo total: <strong>{totalMinutes} min</strong> (
          {(totalMinutes / 60).toFixed(1)} hrs)
        </p>
      </div>

      <button className="task-form__submit">
        Agregar
      </button>
    </form>
  );
};
export default TaskForm;
