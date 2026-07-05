import type { Tab } from "@/lib/types";

interface HeaderProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onBackToSpotify?: () => void;
}

const TABS: { id: Tab; label: string }[] = [
  { id: "quick", label: "Quick Discover" },
  { id: "deep", label: "Find My Sound" },
  { id: "trending", label: "Trending Now" },
];

export default function Header({ activeTab, onTabChange, onBackToSpotify }: HeaderProps) {
  return (
    <>
      {onBackToSpotify && (
        <div className="border-b border-spotify-border bg-black">
          <div className="mx-auto max-w-6xl px-4 py-2">
            <button
              type="button"
              onClick={onBackToSpotify}
              className="text-sm font-medium text-spotify-muted transition-colors hover:text-spotify-green"
            >
              ← Back to Spotify
            </button>
          </div>
        </div>
      )}
      <header className="border-b border-spotify-green bg-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-spotify-green">
              <svg
                aria-label="Spotify"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="white"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.972-.519.781.781 0 01.52-.972c3.632-1.102 8.147-.568 11.233 1.328a.78.78 0 01.256 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.794c3.543-1.073 9.431-.866 13.157 1.368a.937.937 0 01-.997 1.583z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Spotify — Discovery Mode</h1>
              <p className="text-sm text-spotify-green">
                AI-powered music discovery. Find music you never knew you&apos;d love
              </p>
            </div>
          </div>
          <nav className="hidden flex-wrap gap-2 md:flex">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-spotify-green text-black"
                    : "bg-transparent text-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <div className="bg-[#0a2e1a] px-4 py-2 text-center text-xs text-spotify-green">
        Powered by AI that understands what you&apos;re looking for — not just what
        you&apos;ve listened to before.
      </div>
    </>
  );
}
