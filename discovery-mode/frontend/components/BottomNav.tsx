"use client";

import type { ReactNode } from "react";
import type { Tab } from "@/lib/types";

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  visitedTabs: Tab[];
}

const NAV_ITEMS: { id: Tab; label: string; icon: ReactNode }[] = [
  {
    id: "quick",
    label: "Quick",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "deep",
    label: "Find Sound",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    id: "trending",
    label: "Trending",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 23c-2.5 0-4.8-1.2-6.2-3.1-.4-.5-.2-1.2.3-1.6.5-.4 1.2-.2 1.6.3 1 1.3 2.5 2.1 4.3 2.1s3.3-.8 4.3-2.1c.4-.5 1.1-.7 1.6-.3.5.4.7 1.1.3 1.6C16.8 21.8 14.5 23 12 23zm-1.5-9.5V7c0-1.1.9-2 2-2s2 .9 2 2v6.5c0 .8-.7 1.5-1.5 1.5S10.5 14.3 10.5 13.5zM6 10c0-3.3 2.7-6 6-6s6 2.7 6 6c0 .8-.7 1.5-1.5 1.5S15 10.8 15 10c0-1.7-1.3-3-3-3S9 8.3 9 10c0 .8-.7 1.5-1.5 1.5S6 10.8 6 10z" />
      </svg>
    ),
  },
];

function shouldPulse(tabId: Tab, activeTab: Tab, visitedTabs: Tab[]): boolean {
  return tabId !== activeTab && !visitedTabs.includes(tabId);
}

export default function BottomNav({ activeTab, onTabChange, visitedTabs }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-spotify-green bg-spotify-panel md:hidden">
      <div className="flex items-stretch justify-around px-1 py-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`relative flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-1 py-2 text-[10px] font-medium transition-colors ${
                isActive ? "text-spotify-green" : "text-spotify-muted"
              }`}
            >
              <span className="relative">
                {item.icon}
                {shouldPulse(item.id, activeTab, visitedTabs) && (
                  <span className="tab-pulse-dot" aria-hidden="true" />
                )}
              </span>
              <span className="max-w-full truncate text-center leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
