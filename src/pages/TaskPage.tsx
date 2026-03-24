import Calendar from "../components/calendar/Calendar";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm";
import { useTaskDate } from "../hooks/useTaskDate";
import { useTasksOfDay } from "../hooks/useTasksOfDay";
import "./TaskPage.css";

const TasksPage = () => {
  const {
    selectedDate,
    setSelectedDate,
    formattedDate,
    displayDate,
  } = useTaskDate();

  const { tasksOfSelectedDay, daysWithTasks } =
    useTasksOfDay(formattedDate);

  return (
    <div className="tasks-page">
      {/* ── Top: Calendario + Formulario ── */}
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

      {/* ── Lista de tareas ── */}
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