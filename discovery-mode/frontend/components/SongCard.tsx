"use client";

import { useState } from "react";
import AudioPreview from "./AudioPreview";
import ActionButtons from "./ActionButtons";
import type { Recommendation } from "@/lib/api";
import type { DeepContext } from "@/lib/types";

interface SongCardProps {
  rec: Recommendation;
  deepContext?: DeepContext;
  onDislike?: () => void;
  onArtistClick?: (artist: string) => void;
  onFavouriteChange?: () => void;
  favouritesVersion?: number;
}

export default function SongCard({
  rec,
  deepContext,
  onDislike,
  onArtistClick,
  onFavouriteChange,
  favouritesVersion,
}: SongCardProps) {
  const [whyExpanded, setWhyExpanded] = useState(false);
  const [fading, setFading] = useState(false);

  const whyText = deepContext
    ? `You said "${deepContext.prompt}". This track shares ${rec.reason.toLowerCase()} which matches your ${deepContext.mood} mood.`
    : "";

  const handleDislike = () => {
    if (!onDislike) return;
    setFading(true);
    setTimeout(() => onDislike(), 300);
  };

  return (
    <div
      className={`card-glow flex flex-col gap-3 rounded-lg border border-spotify-border bg-spotify-panel p-4 transition-all duration-300 sm:flex-row sm:items-start ${
        fading ? "scale-95 opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-1 gap-4">
        {rec.album_image ? (
          <img
            src={rec.album_image}
            alt={`${rec.track} cover`}
            className="h-16 w-16 shrink-0 rounded object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-spotify-border text-spotify-muted">
            ♪
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="min-w-0">
            <button
              type="button"
              onClick={() => onArtistClick?.(rec.artist)}
              className="truncate text-left text-lg font-semibold text-white hover:text-spotify-green hover:underline"
            >
              {rec.artist}
            </button>
            <p className="truncate text-base text-spotify-muted">{rec.track}</p>
          </div>
          <p className="mt-2 text-[14px] leading-snug text-white">{rec.reason}</p>

          {deepContext && (
            <div className="mt-2">
              <button
                type="button"
                onClick={() => setWhyExpanded(!whyExpanded)}
                className="text-base text-spotify-green hover:underline"
              >
                {whyExpanded ? "Hide" : "Why this was recommended"}
              </button>
              {whyExpanded && (
                <p className="mt-2 text-base leading-relaxed text-spotify-muted">{whyText}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-3">
        <ActionButtons
          rec={rec}
          favouritesVersion={favouritesVersion}
          onFavouriteChange={onFavouriteChange}
          onDislike={onDislike ? handleDislike : undefined}
        />
        <div className="flex items-center gap-2">
          {rec.preview_url && <AudioPreview previewUrl={rec.preview_url} />}
          {rec.spotify_url && (
            <a
              href={rec.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-spotify-green px-4 py-2 text-base font-semibold text-black transition-opacity hover:opacity-90"
            >
              Open in Spotify
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
