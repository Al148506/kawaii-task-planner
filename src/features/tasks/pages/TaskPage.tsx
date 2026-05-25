import { useState } from "react";
import Calendar from "@/features/tasks/components/Calendar/Calendar";
import TaskList from "@/features/tasks/components/TaskList/TaskList";
import TaskForm from "@/features/tasks/components/TaskForm";
import GenericModal from "@/shared/components/modal/GenericModal";
import PomodoroPage from "@/features/pomodoro/pages/PomodoroPage";

import { useTaskDate } from "@/features/tasks/hooks/useTaskDate";
import { useTasksOfDay } from "@/features/tasks/hooks/useTasksOfDay";
import { usePomodoroContext } from "@/features/pomodoro/context/PomodoroContext";
import type { TaskCategory } from "@/features/tasks/types/Category";
import { TASK_CATEGORIES } from "@/features/tasks/types/Category";

import "./TaskPage.css";
import DayProgress from "@/features/tasks/components/DayProgress/DayProgress";

const TasksPage = () => {
  const { selectedDate, setSelectedDate, formattedDate, displayDate } =
    useTaskDate();

  const { tasksOfSelectedDay, daysWithTasks } = useTasksOfDay(formattedDate);

  const { activePomodoro, clearPomodoro } = usePomodoroContext();

  // 🔥 estado del modal
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

  const filteredTasks = selectedCategory
    ? tasksOfSelectedDay.filter((task) => task.category === selectedCategory)
    : tasksOfSelectedDay;

  // 🔥 handler para abrir modal
  const handleOpenPomodoro = () => {
    if (activePomodoro) return; // evita múltiples pomodoros
    setIsPomodoroOpen(true);
  };

  // 🔥 handler para cerrar modal
  const handleClosePomodoro = () => {
    clearPomodoro();
    setIsPomodoroOpen(false);
  };

  

  return (
    <div className="tasks-page">
      <section className="tasks-hero">
        <div>
          <p className="tasks-section__label">Quest command</p>
          <h2>Misiones del día</h2>
          <p>Organiza tus sesiones Pomodoro por categoria, energia y progreso diario.</p>
        </div>
        <div className="tasks-page__date-display">
          ⚔️&nbsp;<span>{displayDate}</span>
        </div>
      </section>

      <div className="tasks-page__top">
        <div className="tasks-page__calendar-col">
          <p className="tasks-section__label">Calendario</p>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            daysWithTasks={daysWithTasks}
          />
        </div>

        <div className="tasks-page__form-col">
          <p className="tasks-section__label">Nueva misión</p>
          <TaskForm date={formattedDate} />
        </div>
      </div>
      <div className="day-progress">
        <DayProgress tasks={tasksOfSelectedDay} />
      </div>
      {/* ── Lista de tareas ── */}
      <div className="tasks-page__list-section">
        <p className="tasks-section__label">Misiones del día</p>

        {tasksOfSelectedDay.length > 0 && (
          <div className="task-list__filters">
            <button
              className={`task-list__filter-chip ${selectedCategory === null ? "task-list__filter-chip--active" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </button>
            {TASK_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`task-list__filter-chip ${selectedCategory === cat.id ? "task-list__filter-chip--active" : ""}`}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                style={{ "--category-color": cat.color } as React.CSSProperties}
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>
        )}

        {filteredTasks.length === 0 && tasksOfSelectedDay.length > 0 ? (
          <div className="tasks-page__empty">
            <span className="tasks-page__empty-icon">🔍</span>
            No hay misiones de esta categoría
          </div>
        ) : tasksOfSelectedDay.length === 0 ? (
          <div className="tasks-page__empty">
            <span className="tasks-page__empty-icon">📜</span>
            No hay misiones para este día
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onStartPomodoro={handleOpenPomodoro}
          />
        )}
      </div>

      {/* ── Modal Pomodoro ── */}
      <GenericModal isOpen={isPomodoroOpen} onClose={handleClosePomodoro}>
        <PomodoroPage onClose={handleClosePomodoro} />
      </GenericModal>
      {/* ── Modal Waifu Selector ── */}
     
    </div>
  );
};

export default TasksPage;
