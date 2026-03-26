import { waifu1 } from "./waifu1";
import { waifu2 } from "./waifu2";
import { waifu3 } from "./waifu3";
import type { WaifuId, WaifuConfig } from "../../types/waifuTypes";

export const waifus: Record<WaifuId, WaifuConfig> = {
  waifu1,
  waifu2,
  waifu3,
};