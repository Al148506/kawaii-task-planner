import { useCallback, useRef } from "react";

type PlayOptions = {
  volume?: number;
  interrupt?: boolean; // detener sonido anterior
};

export const useSound = () => {
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});
  const currentAudio = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((url?: string, options?: PlayOptions) => {
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
      audio.play().catch(() => undefined);

      currentAudio.current = audio;
    } catch {
      return;
    }
  }, []);

  const stop = useCallback(() => {
    if (currentAudio.current) {
      currentAudio.current.pause();
      currentAudio.current.currentTime = 0;
    }
  }, []);

  const stopAll = useCallback(() => {
    Object.values(audioCache.current).forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, []);

  return {
    play,
    stop,
    stopAll,
  };
};
