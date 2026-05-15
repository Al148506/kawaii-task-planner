import type { PlayerProgress } from "@/features/progression/types/PlayerProgress";

const STORAGE_KEY = "playerProgress:v1";

export const initialPlayerProgress: PlayerProgress = {
  xp: 0,
  unlockedAchievementIds: [],
  unlockedSkinIds: [],
};

export const loadPlayerProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? { ...initialPlayerProgress, ...(JSON.parse(saved) as PlayerProgress) }
      : initialPlayerProgress;
  } catch {
    return initialPlayerProgress;
  }
};

export const savePlayerProgress = (progress: PlayerProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};
