import { useEffect, useState } from "react";
import { waifus } from "../../data/waifus";
import { useSound } from "../../hooks/useSound";
import "./WaifuSelector.css";

const LOCAL_KEY = "selectedWaifu";

type Props = {
  onClose: () => void;
};

const WaifuSelector = ({ onClose }: Props) => {
  const [selectedWaifu, setSelectedWaifu] = useState<string | null>(null);
  const { play } = useSound();
  // 🔥 cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setSelectedWaifu(saved);
  }, []);

  // 🔥 guardar en localStorage
  const handleSelect = (id: string) => {
    setSelectedWaifu(id);
    localStorage.setItem(LOCAL_KEY, id);
    const waifu = waifus[id];
    const sound = waifu?.sounds?.selected;

    play(sound, { volume: 0.8, interrupt: true });
  };

  console.log("🧪 waifus object:", waifus);

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
            className={`waifu-card ${selectedWaifu === waifu.id ? "selected" : ""}`}
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
