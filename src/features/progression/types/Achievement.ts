export type AchievementCategory = "pomodoro" | "tasks" | "focus";

export type Achievement = {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  category: AchievementCategory;
};

export type WaifuSkinUnlock = {
  id: string;
  waifuId: string;
  skinId: string;
  name: string;
  requiredLevel: number;
};
