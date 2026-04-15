import { useEffect } from "react";
import confetti from "canvas-confetti";

export const useConfetti = (trigger: boolean) => {
  useEffect(() => {
    if (!trigger) return;

    // 🎉 explosión inicial
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      zIndex: 9999,
    });

    // 🎉 efecto continuo corto (opcional)
    const duration = 3000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 30,
        spread: 60,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });
    }, 250);

    return () => clearInterval(interval);
  }, [trigger]);
};
