"use client";

import { useState } from "react";
import { useToast } from "@/contexts/ToastContext";

interface ActionButtonsProps {
  onDislike?: () => void;
}

export default function ActionButtons({ onDislike }: ActionButtonsProps) {
  const { showToast } = useToast();
  const [favourited, setFavourited] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleFavourite = () => {
    setFavourited(true);
    showToast("Saved to favourites");
  };

  const handleLike = () => {
    setLiked(true);
    showToast("Liked");
  };

  const handleDislike = () => {
    showToast("Noted — we'll avoid this direction.");
    onDislike?.();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleFavourite}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          favourited
            ? "border-spotify-green bg-spotify-green text-black"
            : "border-spotify-border text-spotify-muted hover:border-spotify-green hover:text-spotify-green"
        }`}
        aria-label="Favourite"
      >
        <svg
          className="h-5 w-5"
          fill={favourited ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleLike}
        className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
          liked
            ? "border-spotify-green bg-spotify-green text-black"
            : "border-spotify-border text-spotify-muted hover:border-spotify-green hover:text-spotify-green"
        }`}
        aria-label="Thumbs up"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14zm-8 11H3V9h3v11z" />
        </svg>
      </button>
      <button
        type="button"
        onClick={handleDislike}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-spotify-border text-spotify-muted transition-colors hover:border-spotify-green hover:text-spotify-green"
        aria-label="Thumbs down"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10zm8-13h3v11h-3V2z" />
        </svg>
      </button>
    </div>
  );
}
