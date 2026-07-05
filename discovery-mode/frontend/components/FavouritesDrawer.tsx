"use client";

import type { Recommendation } from "@/lib/api";
import { removeFavourite } from "@/lib/storage";
import { useToast } from "@/contexts/ToastContext";

interface FavouritesDrawerProps {
  open: boolean;
  favourites: Recommendation[];
  onClose: () => void;
  onFavouriteChange: () => void;
}

export default function FavouritesDrawer({
  open,
  favourites,
  onClose,
  onFavouriteChange,
}: FavouritesDrawerProps) {
  const { showToast } = useToast();

  const handleRemove = (rec: Recommendation) => {
    removeFavourite(rec);
    onFavouriteChange();
    showToast("Removed from favourites");
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-spotify-border bg-spotify-panel shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-spotify-border px-5 py-4">
          <h2 className="text-xl font-bold text-white">My Favourites</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-spotify-muted transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close favourites"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {favourites.length === 0 ? (
            <p className="text-lg text-spotify-muted">
              No favourites yet — tap ♡ on any track to save it here
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {favourites.map((rec) => (
                <div
                  key={rec.track_id ?? `${rec.artist}-${rec.track}`}
                  className="flex items-center gap-3 rounded-lg border border-spotify-border bg-black/40 p-3"
                >
                  {rec.album_image ? (
                    <img
                      src={rec.album_image}
                      alt={`${rec.track} cover`}
                      className="h-10 w-10 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-spotify-border text-spotify-muted">
                      ♪
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-white">{rec.artist}</p>
                    <p className="truncate text-sm text-spotify-muted">{rec.track}</p>
                    {rec.spotify_url && (
                      <a
                        href={rec.spotify_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-sm font-medium text-spotify-green hover:underline"
                      >
                        Open in Spotify
                      </a>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(rec)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-500/10"
                    aria-label="Remove from favourites"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
