export type PomodoroPhase = "focus" | "break" | "finished";

type State = {
  phase: PomodoroPhase;
  showConfetti: boolean;
};

type Action =
  | { type: "START_FOCUS" }
  | { type: "START_BREAK" }
  | { type: "FINISH_ALL" };

export const initialState: State = {
  phase: "focus",
  showConfetti: false,
};

export const pomodoroReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "START_FOCUS":
      return {
        ...state,
        phase: "focus",
        showConfetti: false,
      };

    case "START_BREAK":
      return {
        ...state,
        phase: "break",
      };

    case "FINISH_ALL":
      return {
        ...state,
        phase: "finished",
        showConfetti: true,
      };

    default:
      return state;
  }
};
