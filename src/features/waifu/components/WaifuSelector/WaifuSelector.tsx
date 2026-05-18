import { waifus } from "@/features/waifu/data/waifus";
import { useSound } from "@/shared/hooks/useSound";
import "./WaifuSelector.css";
import { useWaifuContext } from "@/features/waifu/context/WaifuContext";
import { useProgressionContext } from "@/features/progression/context/ProgressionContext";
import { waifuSkinUnlocks } from "@/features/progression/utils/achievementsCatalog";

type Props = {
  onClose: () => void;
};

const WaifuSelector = ({ onClose }: Props) => {
  const {
    waifu: currentWaifu,
    selectedSkinByWaifu,
    setWaifu,
    setWaifuSkin,
  } = useWaifuContext();
  const { progress } = useProgressionContext();
  const { play } = useSound();

  const handleSelect = (id: string) => {
    const selected = waifus[id];
    if (!selected) return;

    setWaifu(id); 

    const sound = selected.sounds?.selected;
    if (sound) {
      play(sound, { volume: 0.8, interrupt: true });
    }
  };

  return (
    <div className="waifu-selector">
      <button className="modal-close-btn" onClick={onClose}>
        ×
      </button>

      <h2>Elige tu Waifu</h2>

      <div className="waifu-grid">
        {Object.values(waifus).map((waifu) => (
          <div
            key={waifu.id}
            className={`waifu-card ${
              currentWaifu?.id === waifu.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(waifu.id)}
          >
            {waifu.images.happy && <img src={waifu.images.happy} alt={waifu.name} />}
            <p>{waifu.name}</p>
            <div className="waifu-skin-list">
              {waifuSkinUnlocks
                .filter((skin) => skin.waifuId === waifu.id)
                .map((skin) => {
                  const isUnlocked = progress.unlockedSkinIds.includes(skin.id);
                  const isSelected = selectedSkinByWaifu[waifu.id] === skin.skinId;

                  return (
                    <button
                      key={skin.id}
                      className={`waifu-skin-chip${isSelected ? " is-selected" : ""}`}
                      disabled={!isUnlocked}
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (isUnlocked) setWaifuSkin(waifu.id, skin.skinId);
                      }}
                    >
                      {isUnlocked ? skin.name : `Lv. ${skin.requiredLevel}`}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaifuSelector;
