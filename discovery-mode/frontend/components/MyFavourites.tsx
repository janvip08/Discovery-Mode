import type { Recommendation } from "@/lib/api";

interface MyFavouritesProps {
  favourites: Recommendation[];
}

export default function MyFavourites({ favourites }: MyFavouritesProps) {
  return (
    <div className="mt-10 border-t border-spotify-border pt-8">
      <h3 className="text-xl font-bold text-white">My Favourites</h3>
      {favourites.length === 0 ? (
        <p className="mt-4 text-lg text-spotify-muted">Heart songs to save them here.</p>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {favourites.map((rec) => (
            <div
              key={rec.track_id ?? `${rec.artist}-${rec.track}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-spotify-border bg-spotify-panel px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate font-semibold text-white">{rec.artist}</p>
                <p className="truncate text-base text-spotify-muted">{rec.track}</p>
              </div>
              {rec.spotify_url && (
                <a
                  href={rec.spotify_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full bg-spotify-green px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
                >
                  Open in Spotify
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
