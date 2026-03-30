import type { MusicTrack } from "../../assets/music/MusicTracks";

interface Props {
  show: boolean;
  tracks: MusicTrack[];
  activeTrack: string | null;
  onTrack: (url: string) => void;
  onShuffle: () => void;
}

const WaifuMusicPanel = ({
  show,
  tracks,
  activeTrack,
  onTrack,
  onShuffle,
}: Props) => {
  return (
    <div
      className={`waifu-music-panel ${show ? "waifu-music-panel--visible" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="waifu-music-header">
        <p className="waifu-music-title">¿Ponemos algo de música? 🎶</p>
        <button onClick={onShuffle}>🔀</button>
      </div>

      <div className="waifu-music-tracks">
        {tracks.map((track) => (
          <button
            key={track.url}
            className={activeTrack === track.url ? "active" : ""}
            onClick={() => onTrack(track.url)}
          >
            {activeTrack === track.url ? "⏹" : "▶"} {track.emoji} {track.label}
          </button>
        ))}
      </div>

      {activeTrack && (
        <iframe
          key={activeTrack}
          width="100%"
          height="80"
          src={activeTrack}
          allow="autoplay"
        />
      )}
    </div>
  );
};

export default WaifuMusicPanel;