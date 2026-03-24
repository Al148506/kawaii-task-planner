import { useEffect, useState } from "react";
import Calendar from "../components/calendar/Calendar";
import TaskList from "../components/TaskList/TaskList";
import TaskForm from "../components/TaskForm";
import { useTasksContext } from "../context/TasksContext";
import { usePomodoroContext } from "../context/PomodoroContext";
import "./TaskPage.css";

// 🔧 Convierte "YYYY-MM-DD" a Date local (sin bugs de zona horaria)
const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

// 🔧 Convierte Date → "YYYY-MM-DD"
const toFormattedDate = (date: Date): string =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const TasksPage = () => {
  const { tasks, getTasksByDate } = useTasksContext();
  const { lastSelectedDate } = usePomodoroContext();

  // 📅 Estado principal
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    lastSelectedDate ? parseLocalDate(lastSelectedDate) : new Date(),
  );

  // 🔥 Sincroniza cuando vienes del Pomodoro
  useEffect(() => {
    if (lastSelectedDate) {
      setSelectedDate(parseLocalDate(lastSelectedDate));
    }
  }, [lastSelectedDate]);

  // 📆 Formato para lógica
  const formattedDate = toFormattedDate(selectedDate);

  // 📆 Días con tareas (para el calendario)
  const daysWithTasks = tasks.map((t) => parseLocalDate(t.date));

  // 📋 Tareas del día seleccionado
  const tasksOfSelectedDay = getTasksByDate(formattedDate);

  // 🧾 Texto bonito
  const displayDate = selectedDate.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

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
