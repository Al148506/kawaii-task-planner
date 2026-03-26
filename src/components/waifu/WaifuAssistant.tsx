import { useState } from "react";
import type { WaifuMood, WaifuId } from "../../types/waifuTypes";
import { waifus } from "../../data/waifus/index";
import {
  getRandomTracks,
  type MusicTrack,
} from "../../assets/music/MusicTracks";

import "./WaifuAssistant.css";

interface Props {
  mood: WaifuMood;
  message: string;
  waifuId: WaifuId;
}

const WaifuAssistant = ({ mood, message, waifuId = "waifu1" }: Props) => {
  const [showMusic, setShowMusic] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  // 3 tracks aleatorios al montar el componente
  const [visibleTracks, setVisibleTracks] = useState<MusicTrack[]>(() =>
    getRandomTracks(3),
  );

  const handleImageClick = () => setShowMusic((prev) => !prev);

  const handleTrack = (url: string) => {
    setActiveTrack((prev) => (prev === url ? null : url));
  };
  const handleShuffle = () => {
    const next = getRandomTracks(3);
    setVisibleTracks(next);
    // Si el track activo no está en la nueva selección, detenerlo
    if (activeTrack && !next.find((t) => t.url === activeTrack)) {
      setActiveTrack(null);
    }
  };

   const waifu = waifus[waifuId];

  return (
    <div className="waifu-container">
      <div
        className={`waifu-image-wrap ${showMusic ? "waifu-image-wrap--active" : ""}`}
        onClick={handleImageClick}
        title="Clic para música de ambiente ♪"
      >
        <img src={waifu.images[mood]} alt="waifu" className="waifu-image" />

        <div
          className={`waifu-music-hint ${
            showMusic
              ? "waifu-music-hint--visible"
              : activeTrack
                ? "waifu-music-hint--playing"
                : ""
          }`}
        >
          {showMusic ? "✕ cerrar" : activeTrack ? "♫ sonando" : "♪ música"}
        </div>
      </div>

      {/* Panel: siempre en el DOM, ocultado con CSS para no interrumpir el audio */}
      <div
        className={`waifu-music-panel ${showMusic ? "waifu-music-panel--visible" : ""}`}
        onClick={(e) => e.stopPropagation()}
        aria-hidden={!showMusic}
      >
        <div className="waifu-music-header">
          <p className="waifu-music-title">¿Ponemos algo de música? 🎶</p>
          <button
            className="waifu-music-shuffle"
            onClick={handleShuffle}
            title="Otras opciones"
          >
            🔀
          </button>
        </div>

        <div className="waifu-music-tracks">
          {visibleTracks.map((track) => (
            <button
              key={track.url}
              className={`waifu-music-btn ${activeTrack === track.url ? "waifu-music-btn--active" : ""}`}
              onClick={() => handleTrack(track.url)}
            >
              <span className="waifu-music-btn__icon">
                {activeTrack === track.url ? "⏹" : "▶"}
              </span>
              <span className="waifu-music-btn__emoji">{track.emoji}</span>
              {track.label}
            </button>
          ))}
        </div>

        {activeTrack && (
          <div className="waifu-music-player">
            <iframe
              key={activeTrack}
              width="100%"
              height="80"
              src={activeTrack}
              title="Música de ambiente"
              allow="autoplay"
              style={{ border: "none", display: "block" }}
            />
          </div>
        )}
      </div>

      <div className="waifu-dialog">{message}</div>
    </div>
  );
};

export default WaifuAssistant;
