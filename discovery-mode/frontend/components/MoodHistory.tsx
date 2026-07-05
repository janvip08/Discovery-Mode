interface MoodHistoryProps {
  moods: string[];
  onSelect: (mood: string) => void;
}

export default function MoodHistory({ moods, onSelect }: MoodHistoryProps) {
  if (moods.length === 0) return null;

  return (
    <div className="mb-4">
      <p className="mb-2 text-lg text-spotify-muted">Recent:</p>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood}
            type="button"
            onClick={() => onSelect(mood)}
            className="rounded-full border border-spotify-border bg-spotify-panel px-4 py-2 text-lg text-white transition-colors hover:border-spotify-green hover:text-spotify-green"
          >
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
}
