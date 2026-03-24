export const usePomodoroDisplay = (selectedDate: string) => {
  const formattedDate = selectedDate
    ? new Date(selectedDate + "T00:00:00").toLocaleDateString("es-MX", {
        weekday: "long",
        day: "numeric",
        month: "long",
      })
    : "";

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    formattedDate,
    formatTime,
  };
};