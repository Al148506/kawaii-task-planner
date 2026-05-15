export type WaifuMood =
  | "happy"
  | "blush"
  | "sad"
  | "surprised"
  | "angry"
  | "focused"
  | "selected"
  | "break"
  | "success";

  

export type WaifuId = string;

export type WaifuConfig = {
  id: WaifuId;
  name: string;
  images: Record<WaifuMood, string>;
  skins?: Record<string, Partial<Record<WaifuMood, string>>>;
  sounds?: Record<WaifuMood, string>;
};
