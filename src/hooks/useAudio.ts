// hooks/useAudio.ts

import { playAudio } from "../utils/audio";

export const useAudio = (waifuId: string) => {
  return {
    playCompletionSound: () => playAudio(waifuId, "completion"),
    playFinalSound: () => playAudio(waifuId, "final", { volume: 0.8 }),
    playStartSound: () => playAudio(waifuId, "start", { volume: 0.8 }),
  };
};
