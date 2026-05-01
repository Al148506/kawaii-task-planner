export type WaifuMood =
  | "happy"
  | "blush"
  | "sad"
  | "surprised"
  | "focused"
  | "angry";

export const waifuImages: Record<WaifuMood, string> = {
  happy: "../waifu/happy.png",
  blush: "../waifu/blush.png",
  sad: "../waifu/sad.png",
  surprised: "../waifu/surprised.png",
  focused: "../waifu/focused.png",
  angry: "../waifu/angry.png",

};