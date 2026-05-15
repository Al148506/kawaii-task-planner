export type PlayerProgress = {
  xp: number;
  unlockedAchievementIds: string[];
  unlockedSkinIds: string[];
};

export type ProgressionUnlockResult = {
  achievementIds: string[];
  skinIds: string[];
  xpGained: number;
};
