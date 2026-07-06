import type { CSSProperties } from "react";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Recommendation {
  artist: string;
  track: string;
  reason: string;
  spotify_url: string | null;
  preview_url: string | null;
  album_image: string | null;
  track_id: string | null;
  novelty_score: number;
}

export interface TrendingTrack {
  artist: string;
  track: string;
  spotify_url: string | null;
  preview_url: string | null;
  album_image: string | null;
  track_id: string | null;
  blurb: string;
}

export const MOODS = [
  "Energetic",
  "Chill",
  "Melancholic",
  "Focus",
  "Party",
  "Adventurous",
] as const;

export type Mood = (typeof MOODS)[number];

export async function fetchQuickRecommendations(
  mood: string,
  seedArtist?: string
): Promise<Recommendation[]> {
  const res = await fetch(`${API_URL}/recommend/quick`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mood,
      seed_artist: seedArtist || null,
    }),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.recommendations;
}

export async function fetchDeepRecommendations(body: {
  prompt: string;
  artists: string;
  mood: string;
  adventure_level: number;
}): Promise<Recommendation[]> {
  const res = await fetch(`${API_URL}/recommend/deep`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.recommendations;
}

export async function fetchTrending(signal?: AbortSignal): Promise<TrendingTrack[]> {
  const res = await fetch(`${API_URL}/trending`, { signal });
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.tracks;
}

export interface ArtistTrack {
  artist: string;
  track: string;
  spotify_url: string | null;
  preview_url: string | null;
  album_image: string | null;
  track_id: string | null;
}

export async function fetchArtistTracks(
  artist: string,
  limit = 3
): Promise<ArtistTrack[]> {
  const res = await fetch(
    `${API_URL}/search/artist?artist=${encodeURIComponent(artist)}&limit=${limit}`
  );
  if (!res.ok) throw new Error("API error");
  const data = await res.json();
  return data.tracks;
}

export async function fetchQuickWithBackup(
  mood: string,
  seedArtist?: string
): Promise<{ visible: Recommendation[]; backup: Recommendation[] }> {
  const [batch1, batch2] = await Promise.all([
    fetchQuickRecommendations(mood, seedArtist),
    fetchQuickRecommendations(mood, seedArtist),
  ]);
  const merged: Recommendation[] = [];
  const seen = new Set<string>();
  for (const rec of [...batch1, ...batch2]) {
    const id = rec.track_id ?? `${rec.artist}-${rec.track}`;
    if (seen.has(id)) continue;
    seen.add(id);
    merged.push(rec);
    if (merged.length >= 15) break;
  }
  return {
    visible: merged.slice(0, 10),
    backup: merged.slice(10, 15),
  };
}

export function buildShareText(
  artist: string,
  track: string,
  spotifyUrl: string
): string {
  return `${artist} — ${track} 🎵 Found this on Discovery Mode ${spotifyUrl}`;
}

export function noveltyBadgeStyle(score: number): CSSProperties {
  if (score <= 50) {
    return { backgroundColor: "#888888", color: "#ffffff" };
  }
  if (score <= 70) {
    return { backgroundColor: "#9acd32", color: "#000000" };
  }
  return { backgroundColor: "#1db954", color: "#000000" };
}

export function noveltyTooltip(score: number): string {
  return `${score}% outside your usual listening zone`;
}
