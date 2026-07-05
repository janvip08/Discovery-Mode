"use client";

import { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import MoodChips from "@/components/MoodChips";
import MoodHistory from "@/components/MoodHistory";
import SongCard from "@/components/SongCard";
import TrendingCard from "@/components/TrendingCard";
import SkeletonLoader from "@/components/SkeletonLoader";
import QuickEmptyState from "@/components/QuickEmptyState";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";
import SessionSummary from "@/components/SessionSummary";
import SavedSessions from "@/components/SavedSessions";
import GenreFilterChips from "@/components/GenreFilterChips";
import ArtistDeepDivePanel from "@/components/ArtistDeepDivePanel";
import SpotifyHome from "@/components/SpotifyHome";
import { ToastProvider, useToast } from "@/contexts/ToastContext";
import {
  fetchDeepRecommendations,
  fetchQuickWithBackup,
  fetchTrending,
  type Recommendation,
  type TrendingTrack,
} from "@/lib/api";
import {
  addMoodToHistory,
  clearMoodHistory,
  getMoodHistory,
  getSavedSessions,
  saveSession,
  type SavedSession,
} from "@/lib/storage";
import { filterTrendingByGenre, type GenreFilter } from "@/lib/trendingGenres";
import type { Tab } from "@/lib/types";

function DiscoveryApp({ onBackToSpotify }: { onBackToSpotify: () => void }) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("quick");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [moodHistory, setMoodHistory] = useState<string[]>([]);
  const [quickMood, setQuickMood] = useState<string | null>(null);
  const [seedArtist, setSeedArtist] = useState("");
  const [quickResults, setQuickResults] = useState<Recommendation[]>([]);
  const [quickBackup, setQuickBackup] = useState<Recommendation[]>([]);
  const [savedSessions, setSavedSessions] = useState<SavedSession[]>([]);

  const [deepPrompt, setDeepPrompt] = useState("");
  const [deepArtists, setDeepArtists] = useState("");
  const [deepMood, setDeepMood] = useState<string | null>(null);
  const [adventureLevel, setAdventureLevel] = useState(3);
  const [deepResults, setDeepResults] = useState<Recommendation[]>([]);
  const [showDeepInfo, setShowDeepInfo] = useState(false);

  const [trendingTracks, setTrendingTracks] = useState<TrendingTrack[]>([]);
  const [trendingLoaded, setTrendingLoaded] = useState(false);
  const [genreFilter, setGenreFilter] = useState<GenreFilter>("All");

  const [deepDiveArtist, setDeepDiveArtist] = useState<string | null>(null);

  useEffect(() => {
    setMoodHistory(getMoodHistory());
    setSavedSessions(getSavedSessions());
  }, []);

  const loadTrending = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const tracks = await fetchTrending();
      setTrendingTracks(tracks);
      setTrendingLoaded(true);
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "trending" && !trendingLoaded && !loading) {
      loadTrending();
    }
  }, [activeTab, trendingLoaded, loading, loadTrending]);

  const runQuickDiscover = async (mood: string) => {
    setLoading(true);
    setError(null);
    try {
      const { visible, backup } = await fetchQuickWithBackup(
        mood,
        seedArtist.trim() || undefined
      );
      setQuickResults(visible);
      setQuickBackup(backup);
      const updated = addMoodToHistory(mood);
      setMoodHistory(updated);
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickMoodSelect = (mood: string) => {
    setQuickMood(mood);
  };

  const handleQuickSubmit = () => {
    if (!quickMood) return;
    runQuickDiscover(quickMood);
  };

  const handleQuickStartOver = () => {
    setQuickMood(null);
    setSeedArtist("");
    setQuickResults([]);
    setQuickBackup([]);
    clearMoodHistory();
    setMoodHistory([]);
    setError(null);
  };

  const handleNotForMe = (index: number) => {
    if (quickBackup.length === 0) {
      setQuickResults((prev) => prev.filter((_, i) => i !== index));
      return;
    }
    const [replacement, ...rest] = quickBackup;
    setQuickBackup(rest);
    setQuickResults((prev) => {
      const next = [...prev];
      next[index] = replacement;
      return next;
    });
    showToast("Here's something different for you.");
  };

  const handleSaveSession = () => {
    if (!quickMood || quickResults.length === 0) return;
    const updated = saveSession(quickMood, seedArtist, quickResults, { tab: "quick" });
    setSavedSessions(updated);
    showToast("Session saved");
  };

  const handleDeepSaveSession = () => {
    if (deepResults.length === 0) return;
    const sessionName = deepPrompt.trim() || deepMood;
    if (!sessionName) return;
    const updated = saveSession(sessionName, deepArtists, deepResults, {
      tab: "deep",
      deepMood: deepMood ?? undefined,
      deepPrompt: deepPrompt.trim() || undefined,
    });
    setSavedSessions(updated);
    showToast("Session saved");
  };

  const handleRestoreSession = (session: SavedSession) => {
    if (session.tab === "deep") {
      setActiveTab("deep");
      setDeepPrompt(session.deepPrompt ?? "");
      setDeepArtists(session.seedArtist);
      setDeepMood(session.deepMood ?? session.mood);
      setDeepResults(session.results);
      showToast("Session restored!");
      return;
    }
    setActiveTab("quick");
    setQuickMood(session.mood);
    setSeedArtist(session.seedArtist);
    setQuickResults(session.results);
    setQuickBackup([]);
    showToast("Session restored!");
  };

  const handleDeepSubmit = async () => {
    if (!deepMood) return;
    setLoading(true);
    setError(null);
    try {
      const effectivePrompt = deepPrompt.trim()
        ? deepPrompt.trim()
        : `Mood: ${deepMood}`;
      const results = await fetchDeepRecommendations({
        prompt: effectivePrompt,
        artists: deepArtists.trim(),
        mood: deepMood,
        adventure_level: adventureLevel,
      });
      setDeepResults(results);
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleDeepStartOver = () => {
    setDeepPrompt("");
    setDeepArtists("");
    setDeepMood(null);
    setAdventureLevel(3);
    setDeepResults([]);
    setShowDeepInfo(false);
    clearMoodHistory();
    setMoodHistory([]);
    setError(null);
  };

  const handleDiscoverSimilar = async (artist: string) => {
    setActiveTab("deep");
    setDeepArtists(artist);
    setDeepPrompt(`I want to discover artists similar to ${artist}`);
    setDeepMood("Adventurous");
    setAdventureLevel(3);
    setLoading(true);
    setError(null);
    try {
      const results = await fetchDeepRecommendations({
        prompt: `I want to discover artists similar to ${artist}`,
        artists: artist,
        mood: "Adventurous",
        adventure_level: 3,
      });
      setDeepResults(results);
      showToast("Finding similar artists...");
    } catch {
      setError("Something went wrong — please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    setError(null);
  };

  const filteredTrending = filterTrendingByGenre(trendingTracks, genreFilter);
  const showQuickEmpty =
    activeTab === "quick" && !quickMood && quickResults.length === 0 && !loading;

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onBackToSpotify={onBackToSpotify}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-800 bg-red-950/50 px-4 py-3 text-lg text-red-300">
            {error}
          </div>
        )}

        {activeTab === "quick" && (
          <section>
            <h2 className="text-2xl font-bold text-white">Start discovering in 2 taps</h2>
            <p className="mt-1 text-lg text-spotify-muted">
              Pick a mood, hit go. Music that drifts from familiar to fresh.
            </p>

            <div className="mt-6">
              <MoodHistory moods={moodHistory} onSelect={handleQuickMoodSelect} />
              <MoodChips
                selected={quickMood}
                onSelect={handleQuickMoodSelect}
                large
              />
            </div>

            <input
              type="text"
              placeholder="Your favourite artist (optional)"
              value={seedArtist}
              onChange={(e) => setSeedArtist(e.target.value)}
              className="mt-4 w-full rounded-lg px-4 py-3 text-lg sm:max-w-md"
            />

            <button
              type="button"
              onClick={handleQuickSubmit}
              disabled={!quickMood}
              className="mt-6 w-full rounded-full bg-spotify-green py-5 text-xl font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Start Discovering
            </button>

            {showQuickEmpty && <QuickEmptyState />}

            {loading && <SkeletonLoader />}

            {quickResults.length > 0 && !loading && (
              <div className="mt-10">
                <AnimatedProgressBar key={quickMood ?? "default"} />
                <div className="flex flex-col gap-4">
                  {quickResults.map((rec, i) => (
                    <SongCard
                      key={`${rec.track_id ?? rec.track}-${i}`}
                      rec={rec}
                      onDislike={() => handleNotForMe(i)}
                      onArtistClick={setDeepDiveArtist}
                    />
                  ))}
                </div>
                <SessionSummary results={quickResults} />
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleSaveSession}
                    className="rounded-full bg-spotify-green px-6 py-3 text-lg font-semibold text-black hover:opacity-90"
                  >
                    Save this session
                  </button>
                  <button
                    type="button"
                    onClick={handleQuickStartOver}
                    className="rounded-full border border-spotify-border px-6 py-3 text-lg font-semibold text-white hover:border-spotify-green"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            )}

            <SavedSessions sessions={savedSessions} onRestore={handleRestoreSession} />
          </section>
        )}

        {activeTab === "deep" && (
          <section>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">
                Tell us what you&apos;re looking for
              </h2>
              <button
                type="button"
                onClick={() => setShowDeepInfo(!showDeepInfo)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-spotify-green hover:bg-spotify-green/10"
                aria-label="More info"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                </svg>
              </button>
            </div>
            {showDeepInfo && (
              <div className="mt-3 rounded-lg border border-spotify-green bg-spotify-panel p-4 text-lg text-spotify-muted">
                Unlike Spotify&apos;s algorithm which learns from what you&apos;ve already
                played, Discovery Mode understands what you&apos;re looking for right now,
                in your own words. Traditional systems cannot do this.
              </div>
            )}
            <p className="mt-1 text-lg text-spotify-muted">
              Natural language. Real recommendations. One-line reasons.
            </p>

            <textarea
              placeholder="I love... but I want something... (optional)"
              value={deepPrompt}
              onChange={(e) => setDeepPrompt(e.target.value)}
              rows={4}
              className="mt-6 w-full resize-none rounded-lg px-4 py-3 text-lg"
            />

            <input
              type="text"
              placeholder="Your top artists (comma separated)"
              value={deepArtists}
              onChange={(e) => setDeepArtists(e.target.value)}
              className="mt-4 w-full rounded-lg px-4 py-3 text-lg"
            />

            <div className="mt-6">
              <MoodChips selected={deepMood} onSelect={setDeepMood} />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-lg">
                <span className="text-spotify-muted">Safe</span>
                <span className="font-bold text-spotify-green">{adventureLevel}</span>
                <span className="text-spotify-muted">Wild</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={adventureLevel}
                onChange={(e) => setAdventureLevel(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <button
              type="button"
              onClick={handleDeepSubmit}
              disabled={!deepMood}
              className="mt-6 w-full rounded-full bg-spotify-green py-4 text-xl font-bold text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-12"
            >
              Discover Music
            </button>

            {loading && <SkeletonLoader />}

            {deepResults.length > 0 && !loading && (
              <div className="mt-10">
                <div className="flex flex-col gap-4">
                  {deepResults.map((rec, i) => (
                    <SongCard
                      key={`${rec.track_id ?? rec.track}-${i}`}
                      rec={rec}
                      onArtistClick={setDeepDiveArtist}
                      deepContext={{
                        prompt: deepPrompt,
                        mood: deepMood!,
                        adventureLevel,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleDeepSubmit}
                    className="rounded-full bg-spotify-green px-6 py-3 text-lg font-semibold text-black hover:opacity-90"
                  >
                    Show Me 5 More
                  </button>
                  <button
                    type="button"
                    onClick={handleDeepSaveSession}
                    className="rounded-full bg-spotify-green px-6 py-3 text-lg font-semibold text-black hover:opacity-90"
                  >
                    Save this session
                  </button>
                  <button
                    type="button"
                    onClick={handleDeepStartOver}
                    className="rounded-full border border-spotify-border px-6 py-3 text-lg font-semibold text-white hover:border-spotify-green"
                  >
                    Start Over
                  </button>
                </div>
                <SavedSessions sessions={savedSessions} onRestore={handleRestoreSession} />
              </div>
            )}
          </section>
        )}

        {activeTab === "trending" && (
          <section>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  What India is listening to right now
                </h2>
                <p className="mt-1 text-lg text-spotify-muted">
                  Trending tracks — full versions, curated by AI
                </p>
              </div>
              <button
                type="button"
                onClick={loadTrending}
                className="shrink-0 rounded-full border border-spotify-green px-4 py-2 text-lg font-medium text-spotify-green hover:bg-spotify-green hover:text-black"
              >
                Refresh
              </button>
            </div>

            <GenreFilterChips selected={genreFilter} onSelect={setGenreFilter} />

            {loading && trendingTracks.length === 0 && <SkeletonLoader />}

            {filteredTrending.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredTrending.map((track, i) => (
                  <TrendingCard
                    key={`${track.track_id ?? track.track}-${i}`}
                    track={track}
                    onArtistClick={setDeepDiveArtist}
                  />
                ))}
              </div>
            )}

            {trendingTracks.length > 0 && filteredTrending.length === 0 && (
              <p className="mt-8 text-lg text-spotify-muted">
                No tracks match this genre filter.
              </p>
            )}
          </section>
        )}
      </main>

      <Footer />
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {deepDiveArtist && (
        <ArtistDeepDivePanel
          artist={deepDiveArtist}
          onClose={() => setDeepDiveArtist(null)}
          onDiscoverSimilar={handleDiscoverSimilar}
        />
      )}
    </div>
  );
}

function AppShell() {
  const [view, setView] = useState<"home" | "discovery">("home");

  if (view === "home") {
    return <SpotifyHome onEnterDiscovery={() => setView("discovery")} />;
  }

  return <DiscoveryApp onBackToSpotify={() => setView("home")} />;
}

export default function Home() {
  return (
    <ToastProvider>
      <AppShell />
    </ToastProvider>
  );
}
