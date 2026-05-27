import "./AppTopbar.css";

interface AppTopbarProps {
  isDark: boolean;
  toggle: () => void;
}

export const AppTopbar = ({ isDark, toggle }: AppTopbarProps) => {
  return (
    <header className="app-topbar">
      <div className="app-topbar__brand">
        <p className="app-topbar__subtitle">estudio · descanso · flujo</p>
        <h1 className="app-topbar__title">Productivity dashboard</h1>
      </div>

      <div className="app-topbar__actions" aria-label="Acciones rápidas">
        <button
          type="button"
          className="topbar-icon-button"
          onClick={toggle}
          aria-label="Alternar tema de color"
          aria-pressed={isDark}
        >
          <span aria-hidden="true">{isDark ? "☀️" : "🌙"}</span>
        </button>
      </div>
    </header>
  );
};
