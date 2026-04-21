import type { WaifuConfig } from "../../types/waifuTypes";

// ─── Asset Globs ────────────────────────────────────────────────────────────

const images = import.meta.glob<string>("/src/assets/waifus/*/images/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const sounds = import.meta.glob<string>("/src/assets/waifus/*/sounds/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});

const configs = import.meta.glob("/src/assets/waifus/*/config.ts", {
  eager: true,
});

// ─── Types ───────────────────────────────────────────────────────────────────

type Mood = "happy" | "sad" | "angry" | "blush" | "surprised" | "focused";

type GlobRecord = Record<string, string>;
type ConfigModule = { default?: Partial<WaifuConfig> };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const extractSegment = (path: string, fromEnd: number) =>
  path.split("/").at(fromEnd) ?? "";

const buildConfigMap = (): Record<string, Partial<WaifuConfig>> =>
  Object.fromEntries(
    Object.entries(configs).map(([path, module]) => [
      extractSegment(path, -2),
      (module as ConfigModule).default ?? {},
    ])
  );

const buildImageMap = (
  configMap: Record<string, Partial<WaifuConfig>>
): Record<string, WaifuConfig> =>
  Object.entries(images as GlobRecord).reduce<Record<string, WaifuConfig>>(
    (waifuMap, [path, url]) => {
      const waifuId = extractSegment(path, -3);
      const mood = extractSegment(path, -1).replace(".png", "") as Mood;

      if (!waifuMap[waifuId]) {
        const config = configMap[waifuId];
        waifuMap[waifuId] = {
          id: waifuId,
          name: config.name ?? waifuId,
          images: {} as Record<Mood, string>,
        };
      }

      waifuMap[waifuId].images[mood] = url;
      return waifuMap;
    },
    {}
  );

// ─── Builder ─────────────────────────────────────────────────────────────────

const buildWaifus = (): Record<string, WaifuConfig> => {
  const configMap = buildConfigMap();
  return buildImageMap(configMap);
};

export const waifus = buildWaifus();