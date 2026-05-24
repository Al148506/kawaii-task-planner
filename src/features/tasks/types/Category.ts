export type TaskCategory = "trabajo" | "estudio" | "personal" | "salud" | "creativa" | "ocio";

export type CategoryConfig = {
  id: TaskCategory;
  label: string;
  emoji: string;
  color: string;
};

export const TASK_CATEGORIES: CategoryConfig[] = [
  { id: "trabajo", label: "Trabajo", emoji: "💼", color: "#ec4899" },
  { id: "estudio", label: "Estudio", emoji: "📚", color: "#a855f7" },
  { id: "personal", label: "Personal", emoji: "🌸", color: "#06b6d4" },
  { id: "salud", label: "Salud", emoji: "❤️", color: "#f43f5e" },
  { id: "creativa", label: "Creativa", emoji: "🎨", color: "#f97316" },
  { id: "ocio", label: "Ocio", emoji: "🎮", color: "#22c55e" },
];

export const DEFAULT_CATEGORY: TaskCategory = "trabajo";

export const getCategoryConfig = (category: TaskCategory): CategoryConfig =>
  TASK_CATEGORIES.find((c) => c.id === category) ?? TASK_CATEGORIES[0];
