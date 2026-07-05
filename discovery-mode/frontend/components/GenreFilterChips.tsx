import type { GenreFilter } from "@/lib/trendingGenres";
import { GENRE_FILTERS } from "@/lib/trendingGenres";

interface GenreFilterChipsProps {
  selected: GenreFilter;
  onSelect: (genre: GenreFilter) => void;
}

export default function GenreFilterChips({ selected, onSelect }: GenreFilterChipsProps) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {GENRE_FILTERS.map((genre) => (
        <button
          key={genre}
          type="button"
          onClick={() => onSelect(genre)}
          className={`rounded-full px-4 py-2 text-lg font-medium transition-colors ${
            selected === genre
              ? "bg-spotify-green text-black"
              : "border border-spotify-border text-white hover:border-spotify-green"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}
