import { useEffect, useState } from "react";

export const useWaifuMood = (
  isRunning: boolean,
  timeLeft: number,
  wasCancelled: boolean
) => {
  const [mood, setMood] = useState<"happy" | "blush" | "sad" | "surprised">("happy");

  useEffect(() => {
    if (wasCancelled) {        
      setMood("sad");
      return;
    }

    if (!isRunning) {
      setMood("blush");
      return;
    }

    if (timeLeft < 60) {
      setMood("surprised");
      return;
    }

    setMood("happy");
  }, [isRunning, timeLeft, wasCancelled]);

  return mood;
};