import type { TrendingTrack } from "./api";

export type GenreFilter =
  | "All"
  | "Bollywood"
  | "Hindi Indie"
  | "Pop"
  | "Hip-Hop"
  | "Regional";

export const GENRE_FILTERS: GenreFilter[] = [
  "All",
  "Bollywood",
  "Hindi Indie",
  "Pop",
  "Hip-Hop",
  "Regional",
];

const GENRE_KEYWORDS: Record<Exclude<GenreFilter, "All">, string[]> = {
  Bollywood: ["bollywood", "film", "movie", "hindi song", "loves", "romantic"],
  "Hindi Indie": ["indie", "independent", "alternative", "underground", "fresh"],
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

function trackText(track: TrendingTrack): string {
  return `${track.artist} ${track.track} ${track.blurb}`.toLowerCase();
}

export function matchesGenre(track: TrendingTrack, genre: GenreFilter): boolean {
  if (genre === "All") return true;
  const text = trackText(track);
  return GENRE_KEYWORDS[genre].some((kw) => text.includes(kw));
}

export function filterTrendingByGenre(
  tracks: TrendingTrack[],
  genre: GenreFilter
): TrendingTrack[] {
  if (genre === "All") return tracks;
  return tracks.filter((t) => matchesGenre(t, genre));
}
