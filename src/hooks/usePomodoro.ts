import { useEffect, useRef, useState } from "react";

export const usePomodoro = (initialSeconds: number = 1500) => {
const [timeLeft, setTimeLeft] = useState(initialSeconds);
const [isRunning, setIsRunning] = useState(false);

const intervalRef = useRef<number | null>(null);

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

const start = () => setIsRunning(true);
const pause = () => setIsRunning(false);
const reset = () => {
setIsRunning(false);
setTimeLeft(initialSeconds);
};

return {
timeLeft,
isRunning,
start,
pause,
reset,
setTimeLeft,
};
};
