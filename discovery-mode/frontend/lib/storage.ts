import type { Recommendation } from "./api";
import type { Tab } from "./types";

const MOOD_HISTORY_KEY = "discovery-mode-mood-history";
const SAVED_SESSIONS_KEY = "discovery-mode-saved-sessions";
const MAX_MOOD_HISTORY = 3;
const MAX_SAVED_SESSIONS = 3;

export interface SavedSession {
  id: string;
  timestamp: number;
  mood: string;
  seedArtist: string;
  results: Recommendation[];
  tab?: Tab;
  deepMood?: string;
  deepPrompt?: string;
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

export function getSavedSessions(): SavedSession[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SAVED_SESSIONS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveSession(
  name: string,
  seedArtist: string,
  results: Recommendation[],
  options?: { tab?: Tab; deepMood?: string; deepPrompt?: string }
): SavedSession[] {
  const sessions = getSavedSessions();
  const newSession: SavedSession = {
    id: `${Date.now()}`,
    timestamp: Date.now(),
    mood: name,
    seedArtist,
    results,
    tab: options?.tab,
    deepMood: options?.deepMood,
    deepPrompt: options?.deepPrompt,
  };
  const updated = [newSession, ...sessions].slice(0, MAX_SAVED_SESSIONS);
  localStorage.setItem(SAVED_SESSIONS_KEY, JSON.stringify(updated));
  return updated;
}
