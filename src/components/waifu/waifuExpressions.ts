export type WaifuMood =
  | "happy"
  | "blush"
  | "sad"
  | "surprised"
  | "angry";

export const waifuImages: Record<WaifuMood, string> = {
  happy: "/waifu/happy.png",
  blush: "/waifu/blush.png",
  sad: "/waifu/sad.png",
  surprised: "/waifu/surprised.png",
  angry: "/waifu/angry.png",
};