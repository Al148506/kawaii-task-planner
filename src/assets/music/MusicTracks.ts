export interface MusicTrack {
  label: string;
  emoji: string;
  url: string;
}

const SC = (path: string) =>
  `https://w.soundcloud.com/player/?auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&buying=false&sharing=false&color=%23c77dcc&url=${path}`;

export const MUSIC_TRACKS: MusicTrack[] = [
  // ── Lofi Hip Hop ───────────────────────────────────────────
  {
    label: "Lofi Hip Hop",
    emoji: "🎵",
    url: SC("https://soundcloud.com/chillhopdotcom/sets/lofihiphop"),
  },
  {
    label: "Lofi Beats",
    emoji: "🎧",
    url: SC("https://soundcloud.com/s1xmusic/sets/lofi"),
  },
  {
    label: "Lofi Copyright Free",
    emoji: "🆓",
    url: SC("https://soundcloud.com/ghosthi/sets/chill-lofi-hip-hop-copyright"),
  },
  {
    label: "Lo-fi Chill Beats",
    emoji: "🌙",
    url: SC("https://soundcloud.com/sc-playlists/sets/lo-fi-chill-beats"),
  },
  {
    label: "Chillhop Essentials",
    emoji: "🌿",
    url: SC("https://soundcloud.com/lofi-music-online/sets/chillhop-essentials-summer"),
  },
  {
    label: "3h Lofi Ambient",
    emoji: "💤",
    url: SC("https://soundcloud.com/this_is_lofi/sets/playlist-in-worked"),
  },
  // ── Jazz Hop ───────────────────────────────────────────────
  {
    label: "Jazz Lofi",
    emoji: "🎺",
    url: SC("https://soundcloud.com/lofi_girl/sets/jazz-lofi"),
  },
  {
    label: "Jazz Hop Radio",
    emoji: "🎷",
    url: SC("https://soundcloud.com/komplextrus/sets/chillhop-radio-jazz-lofi-hip"),
  },
  {
    label: "Lofi Jazz Hop",
    emoji: "🎻",
    url: SC("https://soundcloud.com/chill-playlister/sets/lofi-jazz-hop-lo-fi-beats"),
  },
  // ── Ambient / Chill ────────────────────────────────────────
  {
    label: "Calm Evenings",
    emoji: "🍵",
    url: SC("https://soundcloud.com/chillhopdotcom/sets/calm-evenings-chill-ambient-lofi-beats-instrumental-mix"),
  },
  {
    label: "Sleep Lofi",
    emoji: "😴",
    url: SC("https://soundcloud.com/chill-playlister/sets/sleep-lofi-chillhop-lo-fi-hip"),
  },
  {
    label: "Midnight Walk",
    emoji: "🌃",
    url: SC("https://soundcloud.com/jazzhopcafe/midnight-walk-lofi-jazzhop-chill-mix"),
  },
];

/** Devuelve `count` tracks únicos al azar */
export const getRandomTracks = (count = 3): MusicTrack[] => {
  const shuffled = [...MUSIC_TRACKS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};