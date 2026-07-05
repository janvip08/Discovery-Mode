"use client";

import type { Tab } from "@/lib/types";

const FEATURE_CARDS: { id: Tab; label: string }[] = [
  {
    id: "quick",
    label: "⚡ Quick Discover — Pick a mood, get 10 songs instantly",
  },
  {
    id: "deep",
    label: "🎵 Find My Sound — Describe what you want in words",
  },
  {
    id: "trending",
    label: "🔥 Trending Now — Songs blowing up on Reels right now",
  },
];

interface FeatureTourProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function FeatureTour({ activeTab, onTabChange }: FeatureTourProps) {
  return (
    <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:gap-3">
      {FEATURE_CARDS.map((card) => {
        const isActive = activeTab === card.id;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onTabChange(card.id)}
            className={`feature-tour-card flex-1 rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
              isActive
                ? "border-spotify-green bg-[#0a2e1a] text-white"
                : "border-spotify-border bg-spotify-panel text-spotify-muted hover:border-spotify-green/40 hover:text-white"
            }`}
          >
            {card.label}
          </button>
        );
      })}
    </div>
  );
}
