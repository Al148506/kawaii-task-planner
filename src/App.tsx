import { Route, Routes } from "react-router-dom";
import "./App.css";
import TasksPage from "./pages/TaskPage";
import PomodoroPage from "./pages/PomodoroPage";
import { useState } from "react";
import GenericModal from "./components/modal/GenericModal";
import WaifuSelector from "./components/waifuSelector/WaifuSelector";

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
          <button onClick={handleOpenWaifuModal}>💕 Seleccionar Acompañante</button>
        </div>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<TasksPage />} />
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
