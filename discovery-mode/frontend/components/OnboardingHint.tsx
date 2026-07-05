"use client";

interface OnboardingHintProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function OnboardingHint({ visible, onDismiss }: OnboardingHintProps) {
  if (!visible) return null;

  return (
    <div className="animate-pulse border-b border-spotify-green/30 bg-[#0f1f14] px-4 py-3">
      <div className="mx-auto flex max-w-6xl items-start justify-between gap-3">
        <p className="text-sm text-spotify-green sm:text-base">
          New here? Start with Quick Discover — pick a mood and tap go. Takes 2 taps.
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-spotify-muted transition-colors hover:text-white"
          aria-label="Dismiss hint"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
