import { Route, Routes } from "react-router-dom";
import "./App.css";
import TasksPage from "./pages/TaskPage";
import PomodoroPage from "./pages/PomodoroPage";

function App() {
  return (
    <>
      {/* <header className="app-header">
        <div className="app-header-inner">
          <span className="header-ornament">estudio · descanso · flujo</span>
          <h1>Pomodoro Senpai</h1>
          <p className="app-subtitle">your kawaii productivity companion</p>
          <div className="header-divider">
            <div className="header-divider-line" />
            <span className="header-divider-icon">✦</span>
            <div className="header-divider-line" />
          </div>
        </div>
      </header> */}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;