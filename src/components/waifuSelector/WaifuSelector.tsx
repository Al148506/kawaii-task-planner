import { waifus } from "../../data/waifus";
import { useSound } from "../../hooks/useSound";
import "./WaifuSelector.css";
import { useWaifuContext } from "../../context/WaifuContext";

type Props = {
  onClose: () => void;
};

const WaifuSelector = ({ onClose }: Props) => {
  const { waifu: currentWaifu, setWaifu } = useWaifuContext();
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
            <img src={waifu.images.happy} alt={waifu.name} />
            <p>{waifu.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaifuSelector;