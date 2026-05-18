import type { WaifuMood, WaifuId } from "@/features/waifu/types/waifuTypes";
import { waifus } from "@/features/waifu/data/waifus";
import { useWaifuContext } from "@/features/waifu/context/WaifuContext";

interface Props {
  mood: WaifuMood;
  waifuId: WaifuId;
  onClick: () => void;
  isActive: boolean;
  isPlaying: boolean;
}

const WaifuAvatar = ({ mood, waifuId, onClick, isActive, isPlaying }: Props) => {
  const waifu = waifus[waifuId];
  const { selectedSkinByWaifu } = useWaifuContext();

  if (!waifu) return null;

  const selectedSkin = selectedSkinByWaifu[waifuId];
  const image = selectedSkin
    ? waifu.skins?.[selectedSkin]?.[mood] ?? waifu.images[mood] ?? waifu.images.happy
    : waifu.images[mood] ?? waifu.images.happy;

  if (!image) return null;

  return (
    <div
      className={`waifu-image-wrap ${isActive ? "waifu-image-wrap--active" : ""}`}
      onClick={onClick}
    >
      <img src={image} alt={waifu.name} className="waifu-image" />

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
