export const usePomodoroDebug = ({
  setTimeLeft,
  setPhase,
  setHasHandledCompletion,
}: any) => {
  return {
    setTimeLeft,
    forceFinish: () => setTimeLeft(0),
    setPhase,
    resetCompletion: () => setHasHandledCompletion(false),
  };
};