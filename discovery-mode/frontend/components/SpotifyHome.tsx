"use client";

import type { ReactNode } from "react";

interface SpotifyHomeProps {
  onEnterDiscovery: () => void;
}

const MADE_FOR_YOU = [
  {
    id: "daily-mix-1",
    title: "Daily Mix 1",
    subtitle: "Made for you",
    gradient: "from-[#5038a0] to-[#8e24aa]",
    icon: "🎵",
  },
  {
    id: "liked-songs-mfy",
    title: "Liked Songs",
    subtitle: "127 songs",
    gradient: "from-[#5038a0] via-[#6a1b9a] to-[#1e3264]",
    icon: "💜",
  },
  {
    id: "discover-weekly",
    title: "Discover Weekly",
    subtitle: "Updated every Monday",
    gradient: "from-[#1db954] to-[#14833b]",
    icon: "✨",
  },
];

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 17) return "Good afternoon";
  if (hour >= 17 && hour < 21) return "Good evening";
  return "Good night";
}

function SpotifyLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      aria-label="Spotify"
      className={className}
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.077-.496 9.712 1.115a.623.623 0 01.207.857zm1.223-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.972-.519.781.781 0 01.52-.972c3.632-1.102 8.147-.568 11.233 1.328a.78.78 0 01.256 1.072zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.937.937 0 11-.543-1.794c3.543-1.073 9.431-.866 13.157 1.368a.937.937 0 01-.997 1.583z" />
    </svg>
  );
}

function NavIcon({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-1 flex-col items-center gap-1 py-2 ${
        active ? "text-white" : "text-spotify-muted"
      }`}
      aria-label={label}
    >
      {children}
      <span className="text-[10px] font-medium">{label}</span>
    </div>
  );
}

function PlayerBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-[#282828] bg-[#181818]">
      <div className="h-1 w-full bg-[#4d4d4d]">
        <div className="h-full w-[30%] bg-spotify-green" />
      </div>
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-2 sm:px-6">
        <div className="h-12 w-12 shrink-0 rounded bg-spotify-green shadow-md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-white">Dil Se Re</p>
          <p className="truncate text-xs text-spotify-muted">A.R. Rahman</p>
        </div>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white"
          aria-hidden="true"
        >
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function SpotifyHome({ onEnterDiscovery }: SpotifyHomeProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black pb-24">
      <div className="border-b border-[#282828] bg-black px-4 py-1.5 text-center text-xs text-spotify-muted">
        Concept prototype — Discovery Mode features are fully interactive
      </div>

      <header className="sticky top-0 z-10 border-b border-[#282828] bg-black/95 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 pt-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-spotify-green">
              <SpotifyLogo className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">{getTimeGreeting()}</h1>
          </div>
          <nav className="mt-2 flex border-t border-[#282828]/60">
            <NavIcon label="Home" active>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3l9 8v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V11l9-8z" />
              </svg>
            </NavIcon>
            <NavIcon label="Search">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </NavIcon>
            <NavIcon label="Library">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 3h3v18H6V3zm5 4h3v14h-3V7zm5-2h3v16h-3V5z" />
              </svg>
            </NavIcon>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <section className="mb-8">
          <div className="rounded-xl border-2 border-spotify-green bg-spotify-panel p-5 sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Ready to discover something new?
            </h2>
            <p className="mt-2 max-w-xl text-base text-spotify-muted sm:text-lg">
              Break your listening loop — find music you never knew you&apos;d love
            </p>
            <button
              type="button"
              onClick={onEnterDiscovery}
              className="mt-5 rounded-full bg-spotify-green px-6 py-3 text-base font-bold text-black transition-opacity hover:opacity-90 sm:text-lg"
            >
              Try Discovery Mode →
            </button>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-bold text-white sm:text-2xl">Made for you</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {MADE_FOR_YOU.map((playlist) => (
              <div
                key={playlist.id}
                className="flex cursor-default items-center gap-4 rounded-md bg-spotify-panel/80 p-3"
              >
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded bg-gradient-to-br ${playlist.gradient} text-2xl shadow-lg`}
                >
                  {playlist.icon}
                </div>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white">{playlist.title}</p>
                  <p className="truncate text-sm text-spotify-muted">{playlist.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={onEnterDiscovery}
            className="mt-4 w-full rounded-lg border border-spotify-border bg-[#181818] px-4 py-3 text-left text-sm text-spotify-muted transition-colors hover:border-spotify-green hover:text-white sm:text-base"
          >
            Discover Weekly feeling stale?{" "}
            <span className="font-semibold text-spotify-green">
              Try Discovery Mode →
            </span>
          </button>
        </section>
      </main>

      <PlayerBar />
    </div>
  );
}
