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
            className={`feature-tour-card flex flex-1 cursor-pointer items-center justify-between gap-3 rounded-lg border border-gray-200 border-l-[3px] border-l-[#1DB954] bg-white px-4 py-3.5 text-left shadow-md transition-all hover:bg-[#e8f9ee] ${
              isActive ? "ring-2 ring-[#1DB954]/40" : ""
            }`}
          >
            <p className="min-w-0 text-base leading-snug text-black">
              <span className="font-bold">
                {card.emoji} {card.name}
              </span>
              <span className="font-normal text-gray-700"> — {card.description}</span>
            </p>
            <span className="shrink-0 text-lg font-semibold text-[#1DB954]" aria-hidden="true">
              →
            </span>
          </button>
        );
      })}
    </div>
  );
}
