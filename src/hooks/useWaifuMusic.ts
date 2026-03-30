import { useState } from "react";
import { getRandomTracks, type MusicTrack } from "../assets/music/MusicTracks";

export const useWaifuMusic = () => {
  const [showMusic, setShowMusic] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);
  const [visibleTracks, setVisibleTracks] = useState<MusicTrack[]>(() =>
    getRandomTracks(3),
  );

  const toggleMusic = () => setShowMusic((prev) => !prev);

  const playTrack = (url: string) => {
    setActiveTrack((prev) => (prev === url ? null : url));
  };

  const shuffleTracks = () => {
    const next = getRandomTracks(3);
    setVisibleTracks(next);

    if (activeTrack && !next.find((t) => t.url === activeTrack)) {
      setActiveTrack(null);
    }
  };

  return {
    showMusic,
    activeTrack,
    visibleTracks,
    toggleMusic,
    playTrack,
    shuffleTracks,
  };
};
