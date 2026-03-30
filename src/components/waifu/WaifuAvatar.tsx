import type { WaifuMood, WaifuId } from "../../types/waifuTypes";
import { waifus } from "../../data/waifus";

interface Props {
  mood: WaifuMood;
  waifuId: WaifuId;
  onClick: () => void;
  isActive: boolean;
  isPlaying: boolean;
}

const WaifuAvatar = ({ mood, waifuId, onClick, isActive, isPlaying }: Props) => {
  const waifu = waifus[waifuId];

  return (
    <div
      className={`waifu-image-wrap ${isActive ? "waifu-image-wrap--active" : ""}`}
      onClick={onClick}
    >
      <img src={waifu.images[mood]} alt={waifu.name} className="waifu-image" />

      <div
        className={`waifu-music-hint ${
          isActive
            ? "waifu-music-hint--visible"
            : isPlaying
            ? "waifu-music-hint--playing"
            : ""
        }`}
      >
        {isActive ? "✕ cerrar" : isPlaying ? "♫ sonando" : "♪ música"}
      </div>
    </div>
  );
};

export default WaifuAvatar;