import { useEffect, useState } from "react";
import { waifus } from "../../data/waifus";
import "./WaifuSelector.css";

const LOCAL_KEY = "selectedWaifu";

type Props = {
  onClose: () => void;
};

const WaifuSelector = ({ onClose }: Props) => {
  const [selectedWaifu, setSelectedWaifu] = useState<string | null>(null);

  // 🔥 cargar desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setSelectedWaifu(saved);
  }, []);

  // 🔥 guardar en localStorage
  const handleSelect = (id: string) => {
    setSelectedWaifu(id);
    localStorage.setItem(LOCAL_KEY, id);
  };

  console.log("🧪 waifus object:", waifus);

  return (
    <div className="waifu-selector">
      <h2>Elige tu Waifu</h2>

      <div className="waifu-grid">
        {Object.values(waifus).map((waifu) => {
          console.log("🧪 waifu:", waifu);

          return (
            <div
              key={waifu.id}
              className={`waifu-card ${
                selectedWaifu === waifu.id ? "selected" : ""
              }`}
              onClick={() => handleSelect(waifu.id)}
            >
              <img
                src={waifu.images.happy}
                alt={waifu.name}
                onLoad={() => console.log("✅ loaded:", waifu.images.happy)}
                onError={() =>
                  console.error("❌ error loading:", waifu.images.happy)
                }
              />
              <p>{waifu.name} </p>
            </div>
          );
        })}
        <button className="modal-close-btn" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
};

export default WaifuSelector;
