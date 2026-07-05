export default function QuickEmptyState() {
  const placeholders = [
    { artist: "Artist Name", track: "Track Title" },
    { artist: "Artist Name", track: "Track Title" },
    { artist: "Artist Name", track: "Track Title" },
  ];

  return (
    <div className="relative mt-10">
      <div className="flex flex-col gap-4 blur-sm opacity-40">
        {placeholders.map((p, i) => (
          <div
            key={i}
            className="flex gap-4 rounded-lg border border-spotify-border bg-spotify-panel p-4"
          >
            <div className="h-16 w-16 shrink-0 rounded bg-spotify-border" />
            <div className="flex-1">
              <div className="h-4 w-32 rounded bg-spotify-border" />
              <div className="mt-2 h-3 w-48 rounded bg-spotify-border" />
              <div className="mt-3 h-3 w-full rounded bg-spotify-border" />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="rounded-lg bg-black/70 px-6 py-3 text-center text-sm font-medium text-white">
          Pick a mood to unlock your discoveries
        </p>
      </div>
    </div>
  );
}
