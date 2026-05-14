import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TasksProvider } from "@/features/tasks/context/TasksContext";
import "react-day-picker/style.css";
import { PomodoroProvider } from "@/features/pomodoro/context/PomodoroContext";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import { WaifuProvider } from "@/features/waifu/context/WaifuProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WaifuProvider>
        <TasksProvider>
          <PomodoroProvider>
            <App />
          </PomodoroProvider>
        </TasksProvider>
      </WaifuProvider>
    </BrowserRouter>
  </StrictMode>,
);
