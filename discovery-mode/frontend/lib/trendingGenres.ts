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
  Bollywood: ["bollywood", "hindi", "indian"],
  Pop: ["pop", "catchy", "mainstream", "hit", "chart", "viral", "single"],
  "Hip-Hop": ["hip-hop", "hip hop", "hiphop", "rap", "trap", "beats", "drip", "bars"],
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
    "india",
  ],
};

function trackFields(track: TrendingTrack): string[] {
  return [track.artist, track.track, track.blurb].map((s) => (s ?? "").toLowerCase());
}

function fieldMatchesKeywords(fields: string[], keywords: string[]): boolean {
  return keywords.some((kw) => fields.some((field) => field.includes(kw)));
}

export function matchesGenre(track: TrendingTrack, genre: GenreFilter): boolean {
  if (genre === "All") return true;
  return fieldMatchesKeywords(trackFields(track), GENRE_KEYWORDS[genre]);
}

export function filterTrendingByGenre(
  tracks: TrendingTrack[],
  genre: GenreFilter
): TrendingTrack[] {
  if (genre === "All") return tracks;

  console.log(
    "[Trending genre filter]",
    genre,
    tracks.map((t) => ({ artist: t.artist, track: t.track, blurb: t.blurb }))
  );

  const filtered = tracks.filter((t) => matchesGenre(t, genre));
  return filtered.length > 0 ? filtered : tracks;
}
