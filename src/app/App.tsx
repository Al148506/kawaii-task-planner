import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import TasksPage from "@/features/tasks/pages/TaskPage";
import PomodoroPage from "@/features/pomodoro/pages/PomodoroPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProgressionPage from "@/features/progression/pages/ProgressionPage";
import { useState } from "react";
import GenericModal from "@/shared/components/modal/GenericModal";
import WaifuSelector from "@/features/waifu/components/WaifuSelector/WaifuSelector";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { isDark, toggle } = useTheme();
  const [isWaifuModalOpen, setIsWaifuModalOpen] = useState(false);

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggle}
        aria-label={isDark ? "Activar tema claro" : "Activar tema obscuro"}
        title={isDark ? "Tema claro" : "Tema obscuro"}
      >
        {isDark ? "☀️" : "🌙"}
      </button>

      <header className="app-header">
        <div className="app-header-inner">
          <span className="header-ornament">estudio · descanso · flujo</span>
          <h1 className="app-title">Pomodoro Senpai</h1>
          <p className="app-subtitle">your kawaii productivity companion</p>

          <div className="header-divider" aria-hidden="true">
            <div className="header-divider-line" />
            <span className="header-divider-icon">✦</span>
            <div className="header-divider-line" />
          </div>

          <nav className="app-nav" aria-label="Navegación principal">
            <NavLink to="/" className={({ isActive }) => isActive ? "is-active" : undefined}>
              Misiones
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? "is-active" : undefined}>
              Dashboard
            </NavLink>
            <NavLink to="/progress" className={({ isActive }) => isActive ? "is-active" : undefined}>
              Progreso
            </NavLink>
          </nav>

          <button className="btn-companion" onClick={() => setIsWaifuModalOpen(true)}>
            💕 Seleccionar Acompañante
          </button>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/progress" element={<ProgressionPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
        </Routes>
        <GenericModal isOpen={isWaifuModalOpen} onClose={() => setIsWaifuModalOpen(false)}>
          <WaifuSelector onClose={() => setIsWaifuModalOpen(false)} />
        </GenericModal>
      </main>
    </>
  );
}

export default App;
