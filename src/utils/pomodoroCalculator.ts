// import { type PomodoroType, PomodoroDurations } from "../types/PomodoroSettings";

// export const calculatePomodoros = (
//   hours: number,
//   type: PomodoroType,
//   customMinutes?: number
// ) => {

//   const totalMinutes = hours * 60;

//   const duration =
//     type === "custom"
//       ? customMinutes ?? 25
//       : PomodoroDurations[type];

//   return Math.ceil(totalMinutes / duration);
// };