"use client";

import type { Tab } from "@/lib/types";

const FEATURE_CARDS: {
  id: Tab;
  emoji: string;
  name: string;
  description: string;
}[] = [
  {
    id: "quick",
    emoji: "⚡",
    name: "Quick Discover",
    description: "Pick a mood, get 10 songs instantly",
  },
  {
    id: "deep",
    emoji: "🎵",
    name: "Find My Sound",
    description: "Describe what you want in words",
  },
  {
    id: "trending",
    emoji: "🔥",
    name: "Trending Now",
    description: "Songs blowing up on Reels right now",
  },
];

interface FeatureTourProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export default function FeatureTour({ activeTab, onTabChange }: FeatureTourProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:gap-3">
      {FEATURE_CARDS.map((card) => {
        const isActive = activeTab === card.id;
        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onTabChange(card.id)}
            className={`feature-tour-card flex flex-1 cursor-pointer flex-col rounded-lg border-l-[3px] border-l-[#1DB954] bg-[#111111] px-4 py-3.5 text-left transition-colors hover:bg-[#1a1a1a] ${
              isActive ? "ring-1 ring-[#1DB954]/30" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-bold text-white">
                {card.emoji} {card.name}
              </p>
              <span className="shrink-0 text-lg text-[#1DB954]" aria-hidden="true">
                →
              </span>
            </div>
            <p className="mt-1 text-sm text-[#aaaaaa]">{card.description}</p>
          </button>
        );
      })}
    </div>
  );
}
