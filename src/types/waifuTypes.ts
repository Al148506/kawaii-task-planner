export type WaifuMood =
  | "happy"
  | "blush"
  | "sad"
  | "surprised"
  | "angry";

export type WaifuId = "waifu1" | "waifu2" | "waifu3";

export type WaifuConfig = {
  id: WaifuId;
  name: string;
  images: Record<WaifuMood, string>;
  sounds?: Record<WaifuMood, string>;
};