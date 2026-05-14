import { NavLink, Route, Routes } from "react-router-dom";
import "./App.css";
import TasksPage from "@/features/tasks/pages/TaskPage";
import PomodoroPage from "@/features/pomodoro/pages/PomodoroPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import { useState } from "react";
import GenericModal from "@/shared/components/modal/GenericModal";
import WaifuSelector from "@/features/waifu/components/WaifuSelector/WaifuSelector";

function App() {
  const [isWaifuModalOpen, setIsWaifuModalOpen] = useState(false);

  const handleOpenWaifuModal = () => {
    setIsWaifuModalOpen(true);
  };

  const handleCloseWaifuModal = () => {
    setIsWaifuModalOpen(false);
  };
  return (
    <>
      <header className="app-header">
        <div className="app-header-inner">
          <span className="header-ornament">estudio · descanso · flujo</span>
          <h1>Pomodoro Senpai</h1>
          <p className="app-subtitle">your kawaii productivity companion</p>
          <div className="header-divider">
            <div className="header-divider-line" />
            <span className="header-divider-icon">✦</span>
            <div className="header-divider-line" />
          </div>
          <nav className="app-nav" aria-label="Navegacion principal">
            <NavLink to="/" className={({ isActive }) => (isActive ? "is-active" : undefined)}>
              Misiones
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "is-active" : undefined)}
            >
              Dashboard
            </NavLink>
          </nav>
          <button onClick={handleOpenWaifuModal}>💕 Seleccionar Acompañante</button>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<TasksPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
        </Routes>
        <GenericModal isOpen={isWaifuModalOpen} onClose={handleCloseWaifuModal}>
          <WaifuSelector onClose={handleCloseWaifuModal} />
        </GenericModal>
      </main>
    </>
  );
}

export default App;
