export type TaskCategory = "trabajo" | "estudio" | "personal" | "salud" | "creativa" | "ocio";

export type CategoryConfig = {
  id: TaskCategory;
  label: string;
  emoji: string;
  color: string;
};

export const TASK_CATEGORIES: CategoryConfig[] = [
  { id: "trabajo", label: "Trabajo", emoji: "💼", color: "#f9a8d4" },
  { id: "estudio", label: "Estudio", emoji: "📚", color: "#a78bfa" },
  { id: "personal", label: "Personal", emoji: "🌸", color: "#67e8f9" },
  { id: "salud", label: "Salud", emoji: "💪", color: "#86efac" },
  { id: "creativa", label: "Creativa", emoji: "🎨", color: "#fde68a" },
  { id: "ocio", label: "Ocio", emoji: "🎮", color: "#fdba74" },
];

export const DEFAULT_CATEGORY: TaskCategory = "trabajo";

export const getCategoryConfig = (category: TaskCategory): CategoryConfig =>
  TASK_CATEGORIES.find((c) => c.id === category) ?? TASK_CATEGORIES[0];
