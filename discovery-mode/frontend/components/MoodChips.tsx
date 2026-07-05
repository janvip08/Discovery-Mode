import { MOODS } from "@/lib/api";

interface MoodChipsProps {
  selected: string | null;
  onSelect: (mood: string) => void;
  large?: boolean;
}

export default function MoodChips({ selected, onSelect, large = false }: MoodChipsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {MOODS.map((mood) => {
        const isSelected = selected === mood;
        return (
          <button
            key={mood}
            type="button"
            onClick={() => onSelect(mood)}
            className={`rounded-full border-2 border-spotify-green font-semibold transition-colors ${
              large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
            } ${
              isSelected
                ? "bg-spotify-green text-black"
                : "bg-transparent text-white hover:bg-spotify-green/10"
            }`}
          >
            {mood}
          </button>
        );
      })}
    </div>
  );
}
