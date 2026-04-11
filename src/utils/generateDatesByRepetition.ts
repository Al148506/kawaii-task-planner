import type { RepetitionSettings } from "../types/repetitionSettings";

export const generateDatesByRepetition = (
  startDate: string,
  repetition: RepetitionSettings
) => {
  const dates: string[] = [];

  const start = new Date(startDate);
  const year = start.getFullYear();

  const end = new Date(year, 11, 31); // 31 diciembre

  const current = new Date(start);

  while (current <= end) {
    const day = current.getDay(); // 0 = domingo, 6 = sábado

    let shouldInclude = false;

    switch (repetition) {
      case "Daily":
        shouldInclude = true;
        break;

      case "Weekdays":
        shouldInclude = day >= 1 && day <= 5;
        break;

      case "Weekends":
        shouldInclude = day === 0 || day === 6;
        break;
    }

    if (shouldInclude) {
      dates.push(current.toISOString().split("T")[0]);
    }

    current.setDate(current.getDate() + 1);
  }

  return dates;
};