import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm";
import { useTasksContext } from "../context/TasksContext";
import "./TaskPage.css";

const TasksPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { tasks, getTasksByDate } = useTasksContext();

  const formattedDate = `${selectedDate.getFullYear()}-${String(
    selectedDate.getMonth() + 1,
  ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

  const daysWithTasks = tasks.map((t) => {
    const [year, month, day] = t.date.split("-").map(Number);
    return new Date(year, month - 1, day);
  });

  const tasksOfSelectedDay = getTasksByDate(formattedDate);

  const displayDate = selectedDate.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="tasks-page">
      {/* ── Top row: Calendar + Form ── */}
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

          <div className="tasks-page__date-display">
            ⚔️&nbsp;<span>{displayDate}</span>
          </div>

          <TaskForm date={formattedDate} />
        </div>
      </div>

      {/* ── Task list ── */}
      <div className="tasks-page__list-section">
        <p className="tasks-section__label">Misiones del día</p>

        {tasksOfSelectedDay.length === 0 ? (
          <div className="tasks-page__empty">
            <span className="tasks-page__empty-icon">📜</span>
            No hay misiones para este día
          </div>
        ) : (
          <TaskList tasks={tasksOfSelectedDay} />
        )}
      </div>
    </div>
  );
};

export default TasksPage;
