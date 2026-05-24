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
  const [repetitionType, setRepetitionType] = useState<RepetitionSettings>("None");

  const baseDuration =
    pomodoroType === "custom"
      ? customDuration
      : PomodoroDurations[pomodoroType];

  const totalMinutes = baseDuration * pomodoroCount;

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

  const decrementPomodoro = () => {
    if (pomodoroCount > 1) setPomodoroCount(pomodoroCount - 1);
  };

  const incrementPomodoro = () => {
    setPomodoroCount(pomodoroCount + 1);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        className="task-form__input"
        placeholder="Nueva tarea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Categoria */}
      <div className="task-form__field">
        <label className="task-form__label">Categoria</label>
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

      {/* Pomodoros y Tipo en fila */}
      <div className="task-form__row">
        <div className="task-form__field task-form__field--half">
          <label className="task-form__label">Pomodoros</label>
          <div className="task-form__counter">
            <button 
              type="button" 
              className="task-form__counter-btn"
              onClick={decrementPomodoro}
            >
              -
            </button>
            <span className="task-form__counter-value">{pomodoroCount}</span>
            <button 
              type="button" 
              className="task-form__counter-btn"
              onClick={incrementPomodoro}
            >
              +
            </button>
          </div>
        </div>

        <div className="task-form__field task-form__field--half">
          <label className="task-form__label">Tipo de Pomodoro</label>
          <select
            value={pomodoroType}
            onChange={(e) => setPomodoroType(e.target.value as PomodoroType)}
            className="task-form__select"
          >
            <option value="classic">Clasico (25/5)</option>
            <option value="52_17">52/17</option>
            <option value="50_10">50/10</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </div>

      {/* Repeticion y Tiempo en fila */}
      <div className="task-form__row">
        <div className="task-form__field task-form__field--half">
          <label className="task-form__label">Ciclo de Repeticion</label>
          <select
            value={repetitionType}
            onChange={(e) => setRepetitionType(e.target.value as RepetitionSettings)}
            className="task-form__select"
          >
            <option value="None">Ninguno</option>
            <option value="Daily">Todos los dias</option>
            <option value="Weekdays">De Lunes a Viernes</option>
            <option value="Weekends">Fines de Semana</option>
          </select>
        </div>

        <div className="task-form__field task-form__field--half">
          <label className="task-form__label">Tiempo total</label>
          <div className="task-form__time-display">
            <span className="task-form__time-icon">⏱</span>
            <span className="task-form__time-value">{totalMinutes} min</span>
            <span className="task-form__time-hours">({(totalMinutes / 60).toFixed(1)} hrs)</span>
          </div>
        </div>
      </div>

      {/* Custom */}
      {pomodoroType === "custom" && (
        <div className="task-form__field">
          <label className="task-form__label">Duracion custom (minutos)</label>
          <input
            type="number"
            min="5"
            value={customDuration}
            onChange={(e) => setCustomDuration(Number(e.target.value))}
            className="task-form__input task-form__input--small"
          />
        </div>
      )}

      <button type="submit" className="task-form__submit">
        <span className="task-form__submit-icon">✨</span>
        Agregar Mision
      </button>
    </form>
  );
};

export default TaskForm;
