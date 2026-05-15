import type { WaifuConfig, WaifuMood } from "@/features/waifu/types/waifuTypes";

// ─── Asset Globs ────────────────────────────────────────────────────────────

const images = import.meta.glob<string>("/src/assets/waifus/*/images/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const skinImages = import.meta.glob<string>(
  "/src/assets/waifus/*/skins/*/images/*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
);

const sounds = import.meta.glob<string>("/src/assets/waifus/*/sounds/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
});

const configs = import.meta.glob("/src/assets/waifus/*/config.ts", {
  eager: true,
});

// ─── Types ───────────────────────────────────────────────────────────────────

type Mood = WaifuMood;

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

  //Builder para sonidos

  const buildSoundMap = () => {
  return Object.entries(sounds as GlobRecord).reduce<
    Record<string, Record<string, string>>
  >((acc, [path, url]) => {
    const waifuId = extractSegment(path, -3);
    const soundName = extractSegment(path, -1).replace(".mp3", "");

    if (!acc[waifuId]) acc[waifuId] = {};
    acc[waifuId][soundName] = url;

    return acc;
  }, {});
};

const attachSkinImages = (waifuMap: Record<string, WaifuConfig>) => {
  Object.entries(skinImages as GlobRecord).forEach(([path, url]) => {
    const parts = path.split("/");
    const waifuId = parts.at(-5) ?? "";
    const skinId = parts.at(-3) ?? "";
    const mood = (parts.at(-1) ?? "").replace(".png", "") as Mood;

    if (!waifuMap[waifuId]) return;

    waifuMap[waifuId].skins ??= {};
    waifuMap[waifuId].skins[skinId] ??= {};
    waifuMap[waifuId].skins[skinId][mood] = url;
  });
};

// ─── Builder ─────────────────────────────────────────────────────────────────

const buildWaifus = (): Record<string, WaifuConfig> => {
  const configMap = buildConfigMap();
  const waifuMap = buildImageMap(configMap);
  const soundMap = buildSoundMap();

  Object.keys(waifuMap).forEach((id) => {
    waifuMap[id].sounds = soundMap[id] ?? {};
  });

  attachSkinImages(waifuMap);

  return waifuMap;
};

export const waifus = buildWaifus();
