export default function SkeletonLoader() {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex gap-4 rounded-lg border border-spotify-border bg-spotify-panel p-4"
        >
          <div className="skeleton-shimmer h-16 w-16 shrink-0 rounded" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="skeleton-shimmer h-4 w-1/3 rounded" />
            <div className="skeleton-shimmer h-3 w-1/2 rounded" />
            <div className="skeleton-shimmer h-3 w-2/3 rounded" />
          </div>
        </div>
      ))}
      <p className="text-center text-sm text-spotify-green/80">
        Finding your next favourite song...
      </p>
    </div>
  );
}
