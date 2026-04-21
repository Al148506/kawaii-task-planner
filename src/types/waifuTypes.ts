export type WaifuMood =
  | "happy"
  | "blush"
  | "sad"
  | "surprised"
  | "angry"
  | "focused";

export type WaifuId = string;

export type WaifuConfig = {
  id: WaifuId;
  name: string;
  images: Record<WaifuMood, string>;
  sounds?: Record<WaifuMood, string>;
};