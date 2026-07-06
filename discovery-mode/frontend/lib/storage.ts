import type { Recommendation, TrendingTrack } from "./api";
import type { Tab } from "./types";

const MOOD_HISTORY_KEY = "discovery-mode-mood-history";
const FAVOURITES_KEY = "discovery-mode-favourites";
const LIKED_SONGS_KEY = "likedSongs";
const HAS_VISITED_KEY = "hasVisited";
const VISITED_TABS_KEY = "visitedTabs";
const TRENDING_CACHE_KEY = "discovery-mode-trending-cache";
const TRENDING_CACHE_TTL_MS = 60 * 60 * 1000;
const MAX_MOOD_HISTORY = 3;

interface TrendingCacheEntry {
  tracks: TrendingTrack[];
  cachedAt: number;
}

export function songKey(rec: Recommendation): string {
  return rec.track_id ?? `${rec.artist}::${rec.track}`;
}

export function hasVisited(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(HAS_VISITED_KEY) === "true";
}

export function markVisited(): void {
  localStorage.setItem(HAS_VISITED_KEY, "true");
}

export function getVisitedTabs(): Tab[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(VISITED_TABS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function markTabVisited(tab: Tab): void {
  const visited = getVisitedTabs();
  if (visited.includes(tab)) return;
  localStorage.setItem(VISITED_TABS_KEY, JSON.stringify([...visited, tab]));
}

export function isTabVisited(tab: Tab): boolean {
  return getVisitedTabs().includes(tab);
}

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
  return songKey(rec);
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

export function removeFavourite(rec: Recommendation): Recommendation[] {
  const key = favouriteKey(rec);
  const updated = getFavourites().filter((f) => favouriteKey(f) !== key);
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updated));
  return updated;
}

export function toggleFavourite(rec: Recommendation): { favourites: Recommendation[]; added: boolean } {
  const favourites = getFavourites();
  const key = favouriteKey(rec);
  const exists = favourites.some((f) => favouriteKey(f) === key);
  const updated = exists
    ? favourites.filter((f) => favouriteKey(f) !== key)
    : [rec, ...favourites];
  localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updated));
  return { favourites: updated, added: !exists };
}

export function getLikedSongs(): Recommendation[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(LIKED_SONGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isLikedSong(rec: Recommendation): boolean {
  const key = songKey(rec);
  return getLikedSongs().some((s) => songKey(s) === key);
}

export function addLikedSong(rec: Recommendation): Recommendation[] {
  const liked = getLikedSongs();
  const key = songKey(rec);
  if (liked.some((s) => songKey(s) === key)) {
    return liked;
  }
  const updated = [rec, ...liked];
  localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(updated));
  return updated;
}

export function getTrendingCache(): TrendingTrack[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(TRENDING_CACHE_KEY);
    if (!raw) return null;
    const { tracks, cachedAt } = JSON.parse(raw) as TrendingCacheEntry;
    if (Date.now() - cachedAt > TRENDING_CACHE_TTL_MS) {
      localStorage.removeItem(TRENDING_CACHE_KEY);
      return null;
    }
    return tracks;
  } catch {
    return null;
  }
}

export function setTrendingCache(tracks: TrendingTrack[]): void {
  if (typeof window === "undefined") return;
  const entry: TrendingCacheEntry = { tracks, cachedAt: Date.now() };
  localStorage.setItem(TRENDING_CACHE_KEY, JSON.stringify(entry));
}
