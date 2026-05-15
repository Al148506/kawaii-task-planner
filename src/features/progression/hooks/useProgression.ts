import { useEffect, useState } from "react";
import { waifuSkinUnlocks } from "@/features/progression/utils/achievementsCatalog";
import { evaluateAchievements } from "@/features/progression/utils/achievementRules";
import { getLevelFromXp } from "@/features/progression/utils/levelSystem";
import {
  loadPlayerProgress,
  savePlayerProgress,
} from "@/features/progression/utils/progressionStorage";
import type {
  PlayerProgress,
  ProgressionUnlockResult,
} from "@/features/progression/types/PlayerProgress";
import type { PomodoroSession } from "@/features/sessions/types/PomodoroSession";
import type { Task } from "@/features/tasks/types/Task";

const emptyUnlockResult: ProgressionUnlockResult = {
  achievementIds: [],
  skinIds: [],
  xpGained: 0,
};

export const useProgression = () => {
  const [progress, setProgress] = useState<PlayerProgress>(loadPlayerProgress);
  const [lastUnlock, setLastUnlock] = useState<ProgressionUnlockResult | null>(null);

  useEffect(() => {
    savePlayerProgress(progress);
  }, [progress]);

  const processPomodoroCompletion = ({
    sessions,
    tasks,
    latestSession,
  }: {
    sessions: PomodoroSession[];
    tasks: Task[];
    latestSession: PomodoroSession;
  }) => {
    let result = emptyUnlockResult;

    setProgress((prev) => {
      const achievements = evaluateAchievements({ sessions, tasks, latestSession }).filter(
        (achievement) => !prev.unlockedAchievementIds.includes(achievement.id),
      );

      if (achievements.length === 0) {
        setLastUnlock(null);
        return prev;
      }

      const xpGained = achievements.reduce(
        (total, achievement) => total + achievement.xpReward,
        0,
      );
      const nextXp = prev.xp + xpGained;
      const nextLevel = getLevelFromXp(nextXp);
      const nextSkinIds = waifuSkinUnlocks
        .filter((skin) => skin.requiredLevel <= nextLevel)
        .map((skin) => skin.id);
      const newSkinIds = nextSkinIds.filter(
        (skinId) => !prev.unlockedSkinIds.includes(skinId),
      );

      result = {
        achievementIds: achievements.map((achievement) => achievement.id),
        skinIds: newSkinIds,
        xpGained,
      };

      return {
        xp: nextXp,
        unlockedAchievementIds: [
          ...prev.unlockedAchievementIds,
          ...achievements.map((achievement) => achievement.id),
        ],
        unlockedSkinIds: [...prev.unlockedSkinIds, ...newSkinIds],
      };
    });

    setLastUnlock(result.achievementIds.length > 0 ? result : null);
  };

  return {
    progress,
    lastUnlock,
    processPomodoroCompletion,
  };
};
