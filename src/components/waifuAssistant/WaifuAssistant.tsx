import { useWaifuMusic } from "../../hooks/useWaifuMusic";
import type { WaifuId } from "../../types/waifuTypes";
import WaifuAvatar from "./WaifuAvatar";
import type { WaifuMood } from "./waifuExpressions";
import WaifuMusicPanel from "./WaifuMusicPanel";
import "./WaifuAssistant.css";
interface Props {
  mood: WaifuMood;
  message: string;
  waifuId: WaifuId;
}

export const WaifuAssistant = ({ mood, message, waifuId }: Props) => {
  const {
    showMusic,
    activeTrack,
    visibleTracks,
    toggleMusic,
    playTrack,
    shuffleTracks,
  } = useWaifuMusic();

  return (
    <div className="waifu-container">
      <WaifuAvatar
        mood={mood}
        waifuId={waifuId}
        onClick={toggleMusic}
        isActive={showMusic}
        isPlaying={!!activeTrack}
      />

      <WaifuMusicPanel
        show={showMusic}
        tracks={visibleTracks}
        activeTrack={activeTrack}
        onTrack={playTrack}
        onShuffle={shuffleTracks}
      />

      <div className="waifu-dialog">{message}</div>
    </div>
  );
};
