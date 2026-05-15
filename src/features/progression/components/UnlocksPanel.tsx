import { waifuSkinUnlocks } from "@/features/progression/utils/achievementsCatalog";
import { getLevelFromXp } from "@/features/progression/utils/levelSystem";

type Props = {
  xp: number;
  unlockedSkinIds: string[];
};

const UnlocksPanel = ({ xp, unlockedSkinIds }: Props) => {
  const level = getLevelFromXp(xp);

  return (
    <section className="progression-panel">
      <div className="progression-panel__header">
        <p className="progression-kicker">Skins de waifu</p>
        <span>{unlockedSkinIds.length} desbloqueadas</span>
      </div>

      <div className="progression-skins">
        {waifuSkinUnlocks.map((skin) => {
          const isUnlocked = unlockedSkinIds.includes(skin.id);
          const canUnlock = level >= skin.requiredLevel;

          return (
            <article
              className={`progression-skin${isUnlocked ? " is-unlocked" : ""}`}
              key={skin.id}
            >
              <div className="progression-skin__badge">{skin.waifuId}</div>
              <div>
                <strong>{skin.name}</strong>
                <p>Skin {skin.skinId}</p>
                <span>
                  {isUnlocked
                    ? "Desbloqueada"
                    : canUnlock
                      ? "Lista para desbloquear"
                      : `Requiere nivel ${skin.requiredLevel}`}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default UnlocksPanel;
