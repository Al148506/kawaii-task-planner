import AchievementsPanel from "@/features/progression/components/AchievementsPanel";
import LevelProgressCard from "@/features/progression/components/LevelProgressCard";
import UnlocksPanel from "@/features/progression/components/UnlocksPanel";
import { useProgressionContext } from "@/features/progression/context/ProgressionContext";
import "./ProgressionPage.css";

const ProgressionPage = () => {
  const { progress, lastUnlock } = useProgressionContext();

  return (
    <div className="progression-page">
      <section className="progression-hero">
        <div>
          <p className="progression-kicker">Sistema de progreso</p>
          <h2>Logros, experiencia y skins</h2>
          <p>
            Completa pomodoros y misiones para ganar XP, subir de nivel y
            desbloquear skins especiales para tus waifus.
          </p>
        </div>
      </section>

      {lastUnlock && (
        <section className="progression-unlock-alert">
          <strong>Nuevo logro desbloqueado</strong>
          <span>+{lastUnlock.xpGained} XP ganada</span>
        </section>
      )}

      <LevelProgressCard xp={progress.xp} />

      <div className="progression-grid">
        <AchievementsPanel
          unlockedAchievementIds={progress.unlockedAchievementIds}
        />
        <UnlocksPanel xp={progress.xp} unlockedSkinIds={progress.unlockedSkinIds} />
      </div>
    </div>
  );
};

export default ProgressionPage;
