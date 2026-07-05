"use client";

import { useToast } from "@/contexts/ToastContext";

const REMINDER_TEXT = "Discover new music today → https://discovery-mode.vercel.app/";

export default function DailyDiscoveryCard() {
  const { showToast } = useToast();

  const handleSetReminder = async () => {
    try {
      await navigator.clipboard.writeText(REMINDER_TEXT);
      showToast("Link copied — share it or bookmark it!");
    } catch {
      showToast("Could not copy link — please try again");
    }
  };

  return (
    <div className="mt-8 rounded-xl border border-spotify-border bg-spotify-panel p-5">
      <h3 className="text-lg font-bold text-white">🎵 Come back tomorrow</h3>
      <p className="mt-2 text-base leading-relaxed text-spotify-muted">
        Discovery Mode refreshes trending tracks daily and learns from your favourites.
        Your taste evolves — so do your recommendations.
      </p>
      <button
        type="button"
        onClick={handleSetReminder}
        className="mt-4 rounded-full bg-spotify-green px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
      >
        Set a reminder
      </button>
    </div>
  );
}
