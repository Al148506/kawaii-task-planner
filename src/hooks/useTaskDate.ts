import { useEffect, useState } from "react";
import { usePomodoroContext } from "../context/PomodoroContext";
import { utilFormattedDate } from "../utils/utilFormatDate";

// helpers internos
const parseLocalDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};



export const useTaskDate = () => {
  const { lastSelectedDate } = usePomodoroContext();

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    lastSelectedDate ? parseLocalDate(lastSelectedDate) : new Date(),
  );

  // sincronización automática
  useEffect(() => {
    if (lastSelectedDate) {
      // eslint-disable-next-line
      setSelectedDate(parseLocalDate(lastSelectedDate));
    }
  }, [lastSelectedDate]);

  const formattedDate = utilFormattedDate(selectedDate);

  const displayDate = selectedDate.toLocaleDateString("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return {
    selectedDate,
    setSelectedDate,
    formattedDate,
    displayDate,
  };
};
