export const getBreakDuration = (type?: string) => {
  switch (type) {
    case "52_17":
      return 17 * 60;
    case "50_10":
      return 10 * 60;
    case "classic":
    default:
      return 5 * 60;
  }
};