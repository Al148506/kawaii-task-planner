import { useRef } from "react";

type PlayOptions = {
  volume?: number;
  interrupt?: boolean; // detener sonido anterior
};

export const useSound = () => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const play = (url?: string, options?: PlayOptions) => {
    if (!url) return;

    try {
      let audio = audioCache.current[url];

      // 🔥 cache para evitar recrear audio
      if (!audio) {
        audio = new Audio(url);
        audioCache.current[url] = audio;
      }

      // 🔥 detener audio anterior si se desea
      if (options?.interrupt && currentAudio.current) {
        currentAudio.current.pause();
        currentAudio.current.currentTime = 0;
      }

      // 🔥 configurar volumen
      if (options?.volume !== undefined) {
        audio.volume = options.volume;
      }

      audio.currentTime = 0;
      audio.play().catch(() => {});

      currentAudio.current = audio;
    } catch (error) {
      console.warn("Error reproduciendo sonido:", error);
    }
  };

  const stop = () => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
  };

  const stopAll = () => {
    Object.values(audioCache.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  };

  return {
    play,
    stop,
    stopAll,
  };
};