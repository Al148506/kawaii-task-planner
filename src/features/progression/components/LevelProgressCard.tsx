import { getLevelProgress } from "@/features/progression/utils/levelSystem";

type Props = {
  xp: number;
};

const LevelProgressCard = ({ xp }: Props) => {
  const levelProgress = getLevelProgress(xp);

  return (
    <section className="progression-level-card">
      <div>
        <p className="progression-kicker">Nivel actual</p>
        <strong className="progression-level-card__level">
          Lv. {levelProgress.level}
        </strong>
        <span className="progression-level-card__xp">{xp} XP acumulada</span>
      </div>

      <div className="progression-level-card__progress">
        <div className="progression-level-card__bar">
          <div style={{ width: `${levelProgress.percent}%` }} />
        </div>
        <span>
          {levelProgress.xpIntoLevel} / {levelProgress.xpNeededForLevel} XP para
          el siguiente nivel
        </span>
      </div>
    </section>
  );
};

export default LevelProgressCard;
