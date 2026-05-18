import type { WaifuMood } from "@/features/waifu/types/waifuTypes";

export const useWaifuMood = (
  isRunning: boolean,
  timeLeft: number,
  wasCancelled: boolean,
  isCompleted: boolean,
): WaifuMood => {
  if (wasCancelled) return "sad";
  if (isCompleted) return "success";
  if (!isRunning) return "blush";
  if (timeLeft < 60) return "surprised";

  return "happy";
};
