import { useEffect, useRef, useState } from "react";

export const usePomodoro = (initialSeconds: number = 1500) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);

  // ⏱ Timer
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]);

  

  // ▶ Start
  const start = () => setIsRunning(true);

  // ⏸ Pause
  const pause = () => setIsRunning(false);

  // 🔄 Reset (ahora acepta duración dinámica)
  const reset = (newTime?: number) => {
    clearInterval(intervalRef.current!); // 🔥 importante evitar interval duplicado
    setIsRunning(false);
    setTimeLeft(newTime ?? initialSeconds);
  };

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTimeLeft,
    setIsRunning,
  };
};