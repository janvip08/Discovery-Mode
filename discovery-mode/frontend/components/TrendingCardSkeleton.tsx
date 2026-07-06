interface TrendingCardSkeletonProps {
  count?: number;
}

export default function TrendingCardSkeleton({ count = 6 }: TrendingCardSkeletonProps) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-lg border border-spotify-border bg-spotify-panel p-4"
        >
          <div className="skeleton-shimmer mb-3 aspect-square w-full rounded" />
          <div className="skeleton-shimmer mb-2 h-4 w-2/3 rounded" />
          <div className="skeleton-shimmer h-3 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
}
