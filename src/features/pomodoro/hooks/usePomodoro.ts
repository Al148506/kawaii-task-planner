import { useCallback, useEffect, useRef, useState } from "react";

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

  

  const start = useCallback(() => setIsRunning(true), []);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback((newTime?: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(newTime ?? initialSeconds);
  }, [initialSeconds]);

  const isCompleted = timeLeft === 0;

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    reset,
    setTimeLeft,
    setIsRunning,
    isCompleted,
  };
};
