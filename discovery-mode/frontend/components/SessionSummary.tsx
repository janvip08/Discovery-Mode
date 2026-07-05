import type { Recommendation } from "@/lib/api";

interface SessionSummaryProps {
  results: Recommendation[];
}

export default function SessionSummary({ results }: SessionSummaryProps) {
  const highestNovelty = Math.max(...results.map((r) => r.novelty_score));
  const uniqueArtists = new Set(results.map((r) => r.artist)).size;

  return (
    <div className="mt-6 rounded-lg bg-spotify-green p-6 text-black">
      <p className="text-lg font-semibold leading-relaxed">
        This session took you {highestNovelty}% outside your comfort zone. You
        discovered {uniqueArtists} new artists.
      </p>
    </div>
  );
}
