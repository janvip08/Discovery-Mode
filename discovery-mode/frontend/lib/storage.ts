import type { Recommendation } from "./api";

const MOOD_HISTORY_KEY = "discovery-mode-mood-history";
const FAVOURITES_KEY = "discovery-mode-favourites";
const MAX_MOOD_HISTORY = 3;

export function getMoodHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(MOOD_HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addMoodToHistory(mood: string): string[] {
  const history = getMoodHistory().filter((m) => m !== mood);
  const updated = [mood, ...history].slice(0, MAX_MOOD_HISTORY);
  localStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(updated));
  return updated;
}

export function clearMoodHistory(): void {
  localStorage.removeItem(MOOD_HISTORY_KEY);
}

function favouriteKey(rec: Recommendation): string {
  return rec.track_id ?? `${rec.artist}::${rec.track}`;
}

export function getFavourites(): Recommendation[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVOURITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavourite(rec: Recommendation): boolean {
  const key = favouriteKey(rec);
  return getFavourites().some((f) => favouriteKey(f) === key);
}

export function toggleFavourite(rec: Recommendation): Recommendation[] {
  const favourites = getFavourites();
  const key = favouriteKey(rec);
  const exists = favourites.some((f) => favouriteKey(f) === key);
  const updated = exists
    ? favourites.filter((f) => favouriteKey(f) !== key)
    : [rec, ...favourites];
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updated));
  return updated;
}
