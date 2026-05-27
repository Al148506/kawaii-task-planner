import {  Route, Routes } from "react-router-dom";
import "./App.css";
import TasksPage from "@/features/tasks/pages/TaskPage";
import PomodoroPage from "@/features/pomodoro/pages/PomodoroPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProgressionPage from "@/features/progression/pages/ProgressionPage";
import { useState } from "react";
import GenericModal from "@/shared/components/modal/GenericModal";
import WaifuSelector from "@/features/waifu/components/WaifuSelector/WaifuSelector";
import { useTheme } from "./hooks/useTheme";
import { AppSidebar } from "@/shared/layout/AppSidebar/AppSidebar";
import { AppTopbar } from "@/shared/layout/AppTopbar/AppTopbar";

const navItems = [
  { to: "/", label: "Misiones", icon: "📋", helper: "Quest board" },
  { to: "/dashboard", label: "Dashboard", icon: "📊", helper: "Estadisticas" },
  { to: "/progress", label: "Progreso", icon: "📈", helper: "RPG log" },
];

function App() {
  const { isDark, toggle } = useTheme();
  const [isWaifuModalOpen, setIsWaifuModalOpen] = useState(false);

  return (
    <div className="app-shell">
      <AppSidebar onOpenWaifuModal={() => setIsWaifuModalOpen(true)} />

      <div className="app-content">
        <AppTopbar
          isDark={isDark}
          toggle={toggle}
        />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/progress" element={<ProgressionPage />} />
            <Route path="/pomodoro" element={<PomodoroPage />} />
          </Routes>
          <GenericModal
            isOpen={isWaifuModalOpen}
            onClose={() => setIsWaifuModalOpen(false)}
          >
            <WaifuSelector onClose={() => setIsWaifuModalOpen(false)} />
          </GenericModal>
        </main>
      </div>
    </div>
  );
}

export default App;
