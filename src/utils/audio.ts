// utils/audio.ts

export type SoundType = "completion" | "final" | "start" | "cancel" | "idle";

const SOUND_MAP: Record<SoundType, string> = {
  completion: "waifuFelicitacion.mp3",
  final: "waifuFinal.mp3",
  start: "waifuStart.mp3",
  cancel: "",
  idle: "",
};

const BASE_AUDIO_PATH = "/waifu/sounds";

interface PlayAudioOptions {
  volume?: number;
  loop?: boolean;
  onEnd?: () => void;
}

/**
 * Reproduce un sonido asociado a una waifu específica.
 * Retorna null si el sonido no tiene archivo asignado.
 */
export const playAudio = (
  waifuId: string,
  sound: SoundType,
  { volume = 0.7, loop = false, onEnd }: PlayAudioOptions = {}
): Promise<void> | null => {
  const fileName = SOUND_MAP[sound];

  if (!fileName) return null;

  const src = `${BASE_AUDIO_PATH}/${waifuId}/${fileName}`;
  const audio = new Audio(src);

  audio.volume = Math.min(1, Math.max(0, volume)); // Clamp entre 0 y 1
  audio.loop = loop;

  if (onEnd) audio.addEventListener("ended", onEnd, { once: true });

  audio.onerror = () => {
    console.warn(`[audio] Archivo no encontrado: ${src}`);
  };

  return audio.play().catch((err: Error) => {
    console.warn(`[audio] No se pudo reproducir: ${src}`, err.message);
  });
};



