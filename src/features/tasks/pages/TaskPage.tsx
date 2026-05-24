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
import { useWaifuContext } from "@/features/waifu/context/WaifuContext";

import "./TaskPage.css";
import DayProgress from "@/features/tasks/components/DayProgress/DayProgress";

const TasksPage = () => {
  const { selectedDate, setSelectedDate, formattedDate, displayDate } =
    useTaskDate();

  const { tasksOfSelectedDay, daysWithTasks } = useTasksOfDay(formattedDate);

  const { activePomodoro, clearPomodoro } = usePomodoroContext();
  const { waifu } = useWaifuContext();

  // estado del modal
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(null);

  const filteredTasks = selectedCategory
    ? tasksOfSelectedDay.filter((task) => task.category === selectedCategory)
    : tasksOfSelectedDay;

  // handler para abrir modal
  const handleOpenPomodoro = () => {
    if (activePomodoro) return;
    setIsPomodoroOpen(true);
  };

  // handler para cerrar modal
  const handleClosePomodoro = () => {
    clearPomodoro();
    setIsPomodoroOpen(false);
  };

  // Get waifu image
  const getWaifuImage = () => {
    if (!waifu) return null;
    // Use the main images from the waifu config
    return waifu.images?.happy || waifu.images?.focused || null;
  };

  const waifuImage = getWaifuImage();

  return (
    <div className="tasks-page">
      {/* Top: 3-column layout */}
      <div className="tasks-page__grid">
        {/* Column 1: Calendar */}
        <div className="tasks-page__card tasks-page__calendar-card">
          <p className="tasks-section__label">Calendario</p>
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            daysWithTasks={daysWithTasks}
          />
        </div>

        {/* Column 2: New Mission Form */}
        <div className="tasks-page__card tasks-page__form-card">
          <p className="tasks-section__label">Nueva Mision</p>
          <div className="tasks-page__date-display">
            <span className="tasks-page__date-icon">📅</span>
            <span>{displayDate}</span>
          </div>
          <TaskForm date={formattedDate} />
        </div>

        {/* Column 3: Day Progress + Waifu */}
        <div className="tasks-page__right-col">
          <div className="tasks-page__card tasks-page__progress-card">
            <DayProgress tasks={tasksOfSelectedDay} />
          </div>
          
          {waifuImage && (
            <div className="tasks-page__waifu-container">
              <img 
                src={waifuImage} 
                alt="Waifu companion" 
                className="tasks-page__waifu-image"
              />
            </div>
          )}
        </div>
      </div>

      {/* Task List Section */}
      <div className="tasks-page__list-section">
        <p className="tasks-section__label">Misiones del Dia</p>

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
            No hay misiones de esta categoria
          </div>
        ) : tasksOfSelectedDay.length === 0 ? (
          <div className="tasks-page__empty">
            <span className="tasks-page__empty-icon">📜</span>
            No hay misiones para este dia
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onStartPomodoro={handleOpenPomodoro}
          />
        )}
      </div>

      {/* Modal Pomodoro */}
      <GenericModal isOpen={isPomodoroOpen} onClose={handleClosePomodoro}>
        <PomodoroPage onClose={handleClosePomodoro} />
      </GenericModal>
    </div>
  );
};

export default TasksPage;
