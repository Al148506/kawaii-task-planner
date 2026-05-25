import type { CSSProperties } from "react";
import "./SidebarCompanion.css";
import { useWaifuContext } from "../../context/WaifuContext";

interface SidebarCompanionProps {
  onOpen: () => void;
}

export const SidebarCompanion = ({
  onOpen,
}: SidebarCompanionProps) => {
  const { waifu: currentWaifu } = useWaifuContext();

  return (
    <section
      className="sidebar-companion"
      style={
        {
          "--waifu-accent":
            currentWaifu?.accentColor ?? "#ec4899",
        } as CSSProperties
      }
    >
      <div className="sidebar-companion__glow" />

      <div className="sidebar-companion__header">
        <span className="sidebar-companion__eyebrow">
          Acompañante
        </span>
      </div>

      <div className="sidebar-companion__profile">
        <img
          src={
            currentWaifu?.sidebarImage ??
            currentWaifu?.images.happy
          }
          alt={currentWaifu?.name}
          className="sidebar-companion__image"
        />

        <div className="sidebar-companion__info">
          <strong className="sidebar-companion__name">
            {currentWaifu?.name ?? "Waifu Senpai"}
          </strong>

          <p className="sidebar-companion__description">
            {currentWaifu?.description ??
              "Tu compañera kawaii para sesiones de enfoque y productividad."}
          </p>
        </div>
      </div>

      <div className="sidebar-companion__footer">
        <button
          className="sidebar-companion__button"
          onClick={onOpen}
        >
          Cambiar waifu
        </button>
      </div>
    </section>
  );
};