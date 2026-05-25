import { NavLink } from "react-router-dom";
import { SidebarCompanion } from "@/features/waifu/components/SidebarCompanion/SidebarCompanion";
import "./AppSidebar.css";

interface AppSidebarProps {
  onOpenWaifuModal: () => void;
}

const navItems = [
  {
    to: "/",
    label: "Misiones",
    icon: "📋",
    helper: "Quest board",
  },
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: "📊",
    helper: "Estadísticas",
  },
  {
    to: "/progress",
    label: "Progreso",
    icon: "📈",
    helper: "RPG log",
  },
];

export const AppSidebar = ({ onOpenWaifuModal }: AppSidebarProps) => {
  return (
    <aside className="app-sidebar" aria-label="Navegación principal">
      <div className="app-sidebar__top">
        <div className="app-brand">
          <div className="app-brand__mark">
            <span>🌸</span>
          </div>

          <div className="app-brand__content">
            <p className="app-brand__eyebrow">Pomodoro</p>

            <h1 className="app-brand__title">Senpai</h1>
          </div>
        </div>

        <nav className="app-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "app-nav__item is-active" : "app-nav__item"
              }
            >
              <span className="app-nav__icon">{item.icon}</span>

              <span className="app-nav__content">
                <strong>{item.label}</strong>
                <small>{item.helper}</small>
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <SidebarCompanion onOpen={onOpenWaifuModal} />
    </aside>
  );
};
