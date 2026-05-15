import { achievementsCatalog } from "@/features/progression/utils/achievementsCatalog";

type Props = {
  unlockedAchievementIds: string[];
};

const AchievementsPanel = ({ unlockedAchievementIds }: Props) => (
  <section className="progression-panel">
    <div className="progression-panel__header">
      <p className="progression-kicker">Logros</p>
      <span>
        {unlockedAchievementIds.length} / {achievementsCatalog.length} desbloqueados
      </span>
    </div>

    <div className="progression-achievements">
      {achievementsCatalog.map((achievement) => {
        const isUnlocked = unlockedAchievementIds.includes(achievement.id);

        return (
          <article
            className={`progression-achievement${isUnlocked ? " is-unlocked" : ""}`}
            key={achievement.id}
          >
            <span className="progression-achievement__icon">
              {isUnlocked ? "✦" : "?"}
            </span>
            <div>
              <strong>{achievement.title}</strong>
              <p>{achievement.description}</p>
              <span>+{achievement.xpReward} XP</span>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default AchievementsPanel;
