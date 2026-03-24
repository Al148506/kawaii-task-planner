import { DayPicker } from "react-day-picker";
import "./Calendar.css";
interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  daysWithTasks: Date[];
}

const Calendar = ({ selectedDate, onSelectDate, daysWithTasks }: Props) => {
  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  return (
    <DayPicker
      mode="single"
      selected={normalizeDate(selectedDate)}
      onSelect={(date) => {
        if (date) onSelectDate(normalizeDate(date));
      }}
      modifiers={{
        hasTasks: daysWithTasks.map(normalizeDate),
      }}
      modifiersClassNames={{
        hasTasks: "has-tasks",
      }}
    />
  );
};

export default Calendar;
