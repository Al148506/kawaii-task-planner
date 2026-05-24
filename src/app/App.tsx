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
import { useProgressionContext } from "@/features/progression/context/ProgressionContext";
import { getLevelProgress } from "@/features/progression/utils/levelSystem";
import { TASK_CATEGORIES } from "@/features/tasks/types/Category";

function App() {
  const { isDark, toggle } = useTheme();
  const [isWaifuModalOpen, setIsWaifuModalOpen] = useState(false);
  const { progress } = useProgressionContext();
  
  const levelInfo = getLevelProgress(progress.xp);
  const xpToNext = levelInfo.xpNeededForLevel - levelInfo.xpIntoLevel;

  return (
    <div className="app-layout">
      {/* ── Sidebar ── */}
      <aside className="sidebar">
        <div className="sidebar__logo">
          <span className="sidebar__logo-icon">🌸</span>
          <div className="sidebar__logo-text">
            <span className="sidebar__logo-title">POMODORO</span>
            <span className="sidebar__logo-subtitle">Senpai</span>
          </div>
        </div>

        <nav className="sidebar__nav">
          <NavLink to="/" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
            <span className="sidebar__link-icon">📋</span>
            Misiones
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
            <span className="sidebar__link-icon">📊</span>
            Dashboard
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
            <span className="sidebar__link-icon">📈</span>
            Progreso
          </NavLink>
        </nav>

        <div className="sidebar__divider" />

        <div className="sidebar__categories">
          <span className="sidebar__section-title">Categorias</span>
          {TASK_CATEGORIES.map((cat) => (
            <div key={cat.id} className="sidebar__category">
              <span className="sidebar__category-icon">{cat.emoji}</span>
              {cat.label}
            </div>
          ))}
        </div>

        <div className="sidebar__spacer" />

        {/* User Profile Card */}
        <div className="sidebar__profile">
          <div className="sidebar__profile-avatar">
            <img src="/senpai-avatar.png" alt="Senpai" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '🌸';
            }} />
          </div>
          <div className="sidebar__profile-info">
            <span className="sidebar__profile-name">Senpai</span>
            <span className="sidebar__profile-level">Nivel {levelInfo.level}</span>
          </div>
          <div className="sidebar__profile-xp">
            <div className="sidebar__profile-xp-bar">
              <div 
                className="sidebar__profile-xp-fill" 
                style={{ width: `${levelInfo.percent}%` }}
              />
            </div>
            <span className="sidebar__profile-xp-text">{xpToNext} XP para subir</span>
          </div>
        </div>

        <button className="sidebar__theme-toggle" onClick={toggle} aria-label={isDark ? "Activar tema claro" : "Activar tema oscuro"}>
          {isDark ? "☀️" : "🌙"}
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <div className="main-header__left">
            <h1 className="main-header__title">
              <span className="main-header__title-pomodoro">Pomodoro</span>
              {" "}
              <span className="main-header__title-senpai">Senpai</span>
            </h1>
            <p className="main-header__subtitle">Tu companera kawaii para ser mas productivo cada dia</p>
          </div>
          <div className="main-header__right">
            <div className="main-header__theme-buttons">
              <button 
                className={`main-header__theme-btn ${isDark ? "" : "main-header__theme-btn--active"}`}
                onClick={() => !isDark || toggle()}
                aria-label="Tema claro"
              >
                🌙
              </button>
              <button 
                className={`main-header__theme-btn ${isDark ? "main-header__theme-btn--active" : ""}`}
                onClick={() => isDark || toggle()}
                aria-label="Tema oscuro"
              >
                ☀️
              </button>
            </div>
            <button className="btn-companion" onClick={() => setIsWaifuModalOpen(true)}>
              💕 Seleccionar Acompanante
            </button>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="main-tabs">
          <NavLink to="/" className={({ isActive }) => `main-tab ${isActive ? "main-tab--active" : ""}`} end>
            ⭐ Misiones
          </NavLink>
          <NavLink to="/dashboard" className={({ isActive }) => `main-tab ${isActive ? "main-tab--active" : ""}`}>
            Dashboard
          </NavLink>
          <NavLink to="/progress" className={({ isActive }) => `main-tab ${isActive ? "main-tab--active" : ""}`}>
            Progreso
          </NavLink>
        </nav>

        {/* Content Area */}
        <div className="main-body">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/progress" element={<ProgressionPage />} />
            <Route path="/pomodoro" element={<PomodoroPage />} />
          </Routes>
        </div>

        <GenericModal isOpen={isWaifuModalOpen} onClose={() => setIsWaifuModalOpen(false)}>
          <WaifuSelector onClose={() => setIsWaifuModalOpen(false)} />
        </GenericModal>
      </main>
    </div>
  );
}

export default App;
