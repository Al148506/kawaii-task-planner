export type WaifuMood =
  | "happy"
  | "blush"
  | "sad"
  | "surprised"
  | "upset"
  | "focused"
  | "selected"
  | "break"
  | "success";

  

export type WaifuId = string;

export type WaifuConfig = {
  id: WaifuId;
  name: string;
  images: Partial<Record<WaifuMood, string>>;
  skins?: Record<string, Partial<Record<WaifuMood, string>>>;
  sounds?: Partial<Record<WaifuMood, string>>;
};
