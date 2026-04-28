import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { TasksProvider } from "./context/TasksContext.tsx";
import "react-day-picker/dist/style.css";
import { PomodoroProvider } from "./context/PomodoroContext.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { WaifuProvider } from "./context/WaifuProvider.tsx";

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
