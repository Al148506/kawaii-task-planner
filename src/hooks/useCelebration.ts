import { useState, useCallback } from "react";

export const useCelebration = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const triggerCelebration = useCallback(() => {
    setShowConfetti(true);
  }, []);

  const resetCelebration = useCallback(() => {
    setShowConfetti(false);
  }, []);

  return {
    showConfetti,
    triggerCelebration,
    resetCelebration,
  };
};