"use client";

import { useEffect, useState } from "react";
import { fetchArtistTracks, type ArtistTrack } from "@/lib/api";
import { useToast } from "@/contexts/ToastContext";

interface ArtistDeepDivePanelProps {
  artist: string;
  onClose: () => void;
  onDiscoverSimilar: (artist: string) => void;
}

export default function ArtistDeepDivePanel({
  artist,
  onClose,
  onDiscoverSimilar,
}: ArtistDeepDivePanelProps) {
  const { showToast } = useToast();
  const [tracks, setTracks] = useState<ArtistTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchArtistTracks(artist, 3)
      .then(setTracks)
      .catch(() => showToast("Something went wrong — please try again"))
      .finally(() => setLoading(false));
  }, [artist, showToast]);

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} aria-hidden />
      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[70vh] overflow-y-auto rounded-t-2xl border-t border-spotify-green bg-spotify-panel p-6 pb-24 md:pb-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">{artist}</h3>
            <button
              type="button"
              onClick={onClose}
              className="text-2xl text-spotify-muted hover:text-white"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {loading ? (
            <p className="text-lg text-spotify-muted">Loading tracks...</p>
          ) : (
            <div className="flex flex-col gap-3">
              {tracks.map((t) => (
                <div
                  key={t.track_id ?? t.track}
                  className="flex items-center gap-3 rounded-lg border border-spotify-border p-3"
                >
                  {t.album_image ? (
                    <img
                      src={t.album_image}
                      alt=""
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-spotify-border">
                      ♪
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-medium text-white">{t.track}</p>
                    <p className="truncate text-base text-spotify-muted">{t.artist}</p>
                  </div>
                  {t.spotify_url && (
                    <a
                      href={t.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-full bg-spotify-green px-3 py-1.5 text-base font-semibold text-black"
                    >
                      Open
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => {
              onDiscoverSimilar(artist);
              onClose();
            }}
            className="mt-6 w-full rounded-full bg-spotify-green py-4 text-lg font-bold text-black hover:opacity-90"
          >
            Discover similar artists
          </button>
        </div>
      </div>
    </>
  );
}
