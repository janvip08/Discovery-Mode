import type { TrendingTrack } from "./api";

export type GenreFilter =
  | "All"
  | "Bollywood"
  | "Pop"
  | "Hip-Hop"
  | "Regional";

export const GENRE_FILTERS: GenreFilter[] = [
  "All",
  "Bollywood",
  "Pop",
  "Hip-Hop",
  "Regional",
] as const;

const GENRE_KEYWORDS: Record<Exclude<GenreFilter, "All">, string[]> = {
  Bollywood: ["bollywood", "film", "movie", "hindi song", "loves", "romantic"],
  Pop: ["pop", "catchy", "mainstream", "hit", "chart", "viral"],
  "Hip-Hop": ["hip-hop", "hip hop", "rap", "trap", "beats", "drip", "bars"],
  Regional: [
    "tamil",
    "telugu",
    "punjabi",
    "malayalam",
    "kannada",
    "bengali",
    "marathi",
    "regional",
    "bhojpuri",
  ],
};

function trackFields(track: TrendingTrack): string[] {
  return [track.artist, track.track, track.blurb].map((s) => (s ?? "").toLowerCase());
}

export function matchesGenre(track: TrendingTrack, genre: GenreFilter): boolean {
  if (genre === "All") return true;
  const fields = trackFields(track);
  return GENRE_KEYWORDS[genre].some((kw) =>
    fields.some((field) => field.includes(kw))
  );
}

export function filterTrendingByGenre(
  tracks: TrendingTrack[],
  genre: GenreFilter
): TrendingTrack[] {
  if (genre === "All") return tracks;
  const filtered = tracks.filter((t) => matchesGenre(t, genre));
  return filtered.length > 0 ? filtered : tracks;
}
