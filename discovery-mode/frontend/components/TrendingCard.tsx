"use client";

import { useState } from "react";
import ActionButtons from "./ActionButtons";
import type { Recommendation, TrendingTrack } from "@/lib/api";

interface TrendingCardProps {
  track: TrendingTrack;
  onArtistClick?: (artist: string) => void;
  onFavouriteChange?: () => void;
  onLike?: (rec: Recommendation) => void;
  favouritesVersion?: number;
  likedVersion?: number;
  isLiked?: boolean;
  highlighted?: boolean;
}

export default function TrendingCard({
  track,
  onArtistClick,
  onFavouriteChange,
  onLike,
  favouritesVersion,
  likedVersion,
  isLiked = false,
  highlighted = false,
}: TrendingCardProps) {
  const [imageError, setImageError] = useState(false);
  const showPlaceholder = !track.album_image || imageError;
  const artistInitial = track.artist?.trim().charAt(0).toUpperCase() || "?";

  const rec: Recommendation = {
    artist: track.artist,
    track: track.track,
    reason: track.blurb,
    spotify_url: track.spotify_url,
    preview_url: track.preview_url,
    album_image: track.album_image,
    track_id: track.track_id,
    novelty_score: 0,
  };

  return (
    <div
      className={`card-glow flex flex-col rounded-lg border bg-spotify-panel p-4 transition-all duration-300 ${
        highlighted ? "border-spotify-green ring-2 ring-spotify-green/40" : "border-spotify-border"
      }`}
    >
      <div className="relative mb-3">
        {showPlaceholder ? (
          <div className="flex aspect-square w-full items-center justify-center rounded bg-spotify-green text-4xl font-bold text-black">
            {artistInitial}
          </div>
        ) : (
          <img
            src={track.album_image}
            alt={`${track.track} cover`}
            className="aspect-square w-full rounded object-cover"
            onError={() => setImageError(true)}
          />
        )}
        <span className="absolute right-2 top-2 rounded-full bg-[#e85d04] px-2 py-0.5 text-base font-bold text-white">
          🔥 Trending on Reels
        </span>
      </div>
      <button
        type="button"
        onClick={() => onArtistClick?.(track.artist)}
        className="truncate text-left text-lg font-semibold text-white hover:text-spotify-green hover:underline"
      >
        {track.artist}
      </button>
      <p className="truncate text-base text-spotify-muted">{track.track}</p>
      {isLiked && (
        <p className="mt-0.5 text-sm text-spotify-green">✓ You liked this</p>
      )}
      <p className="mt-2 text-[13px] italic leading-snug text-spotify-green">{track.blurb}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ActionButtons
          rec={rec}
          onFavouriteChange={onFavouriteChange}
          onLike={onLike}
          favouritesVersion={favouritesVersion}
          likedVersion={likedVersion}
        />
        {track.spotify_url && (
          <a
            href={track.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-spotify-green px-4 py-2 text-center text-base font-semibold text-black transition-opacity hover:opacity-90"
          >
            Open in Spotify
          </a>
        )}
      </div>
    </div>
  );
}
