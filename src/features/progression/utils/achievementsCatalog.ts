import type {
  Achievement,
  WaifuSkinUnlock,
} from "@/features/progression/types/Achievement";

export const achievementsCatalog: Achievement[] = [
  {
    id: "first_pomodoro",
    title: "Primer enfoque",
    description: "Completa tu primer pomodoro.",
    xpReward: 50,
    category: "pomodoro",
  },
  {
    id: "three_pomodoros_in_row",
    title: "Combo x3",
    description: "Completa 3 pomodoros seguidos.",
    xpReward: 120,
    category: "pomodoro",
  },
  {
    id: "focus_without_pause",
    title: "Concentracion perfecta",
    description: "Completa un pomodoro sin pausar.",
    xpReward: 100,
    category: "focus",
  },
  {
    id: "five_tasks_day",
    title: "Dia legendario",
    description: "Completa 5 tareas en un dia.",
    xpReward: 220,
    category: "tasks",
  },
  {
    id: "ten_pomodoros_total",
    title: "Ritmo constante",
    description: "Completa 10 pomodoros en total.",
    xpReward: 180,
    category: "pomodoro",
  },
  {
    id: "first_full_task",
    title: "Mision cumplida",
    description: "Completa una tarea con todos sus pomodoros.",
    xpReward: 80,
    category: "tasks",
  },
  {
    id: "one_hour_focus",
    title: "Una hora de poder",
    description: "Acumula 60 minutos estimados de enfoque.",
    xpReward: 140,
    category: "focus",
  },
  {
    id: "daily_warrior",
    title: "Guerrero diario",
    description: "Completa 3 pomodoros en un mismo dia.",
    xpReward: 160,
    category: "pomodoro",
  },
];

export const waifuSkinUnlocks: WaifuSkinUnlock[] = [
  {
    id: "waifu1_sakura",
    waifuId: "waifu1",
    skinId: "sakura",
    name: "Sakura Bloom",
    requiredLevel: 2,
  },
  {
    id: "waifu2_moonlight",
    waifuId: "waifu2",
    skinId: "moonlight",
    name: "Moonlight Study",
    requiredLevel: 3,
  },
  {
    id: "waifu3_legendary",
    waifuId: "waifu3",
    skinId: "legendary",
    name: "Legendary Partner",
    requiredLevel: 5,
  },
];
