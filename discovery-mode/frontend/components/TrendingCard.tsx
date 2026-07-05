import ActionButtons from "./ActionButtons";
import type { TrendingTrack } from "@/lib/api";

interface TrendingCardProps {
  track: TrendingTrack;
  onArtistClick?: (artist: string) => void;
  onFavouriteChange?: () => void;
  favouritesVersion?: number;
}

export default function TrendingCard({
  track,
  onArtistClick,
  onFavouriteChange,
  favouritesVersion,
}: TrendingCardProps) {
  return (
    <div className="card-glow flex flex-col rounded-lg border border-spotify-border bg-spotify-panel p-4 transition-shadow">
      <div className="relative mb-3">
        {track.album_image ? (
          <img
            src={track.album_image}
            alt={`${track.track} cover`}
            className="aspect-square w-full rounded object-cover"
          />
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded bg-spotify-border text-4xl text-spotify-muted">
            ♪
          </div>
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
      <p className="mt-2 text-[13px] italic leading-snug text-spotify-green">{track.blurb}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ActionButtons
          rec={{
            artist: track.artist,
            track: track.track,
            reason: track.blurb,
            spotify_url: track.spotify_url,
            preview_url: track.preview_url,
            album_image: track.album_image,
            track_id: track.track_id,
            novelty_score: 0,
          }}
          onFavouriteChange={onFavouriteChange}
          favouritesVersion={favouritesVersion}
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
