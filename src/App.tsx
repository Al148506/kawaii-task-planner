import { Route, Routes } from "react-router-dom";
import "./App.css";
import TasksPage from "./pages/TaskPage";
import PomodoroPage from "./pages/PomodoroPage";

function App() {
  return (
    <>
      <h1>Pomodoro Senpai</h1>
      
      {/* Las rutas definen qué componente se monta según la URL */}
      <Routes>
        {/* Página principal: Lista de tareas */}
        <Route path="/" element={<TasksPage />} />
        
        {/* Página del temporizador */}
        <Route path="/pomodoro" element={<PomodoroPage />} />
      </Routes>
    </>
  );
}

export default App;