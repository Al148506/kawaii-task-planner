export const getWaifuMessage = (mood: string, timeLeft: number) => {
  if (mood === "sad") return "¿Ya te rindes...? 😢";
  if (mood === "blush") return "Tomemos un pequeño descanso...";
  if (mood === "surprised") return "¡Ya casi terminamos! 👀";
  if (mood === "upset") return "¡Yamerooooo! 😣";
  if (timeLeft < 300) return "Sigue así, vas muy bien 🔥";

  return "Gambare Gambare Sempaii";
};
