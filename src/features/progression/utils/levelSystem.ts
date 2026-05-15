export const getLevelFromXp = (xp: number) => Math.floor(Math.sqrt(xp / 100)) + 1;

export const getXpForLevel = (level: number) => Math.pow(level - 1, 2) * 100;

export const getLevelProgress = (xp: number) => {
  const level = getLevelFromXp(xp);
  const currentLevelXp = getXpForLevel(level);
  const nextLevelXp = getXpForLevel(level + 1);
  const xpIntoLevel = xp - currentLevelXp;
  const xpNeededForLevel = nextLevelXp - currentLevelXp;

  return {
    level,
    currentLevelXp,
    nextLevelXp,
    xpIntoLevel,
    xpNeededForLevel,
    percent: Math.round((xpIntoLevel / xpNeededForLevel) * 100),
  };
};
