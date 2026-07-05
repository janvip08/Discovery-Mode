import type { SavedSession } from "@/lib/storage";

interface SavedSessionsProps {
  sessions: SavedSession[];
  onRestore: (session: SavedSession) => void;
}

function timeAgo(ts: number): string {
  const deltaMs = Date.now() - ts;
  const mins = Math.floor(deltaMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

export default function SavedSessions({ sessions, onRestore }: SavedSessionsProps) {
  if (sessions.length === 0) return null;

  return (
    <div className="mt-10 border-t border-spotify-border pt-8">
      <h3 className="text-xl font-bold text-white">Saved Sessions</h3>
      <div className="mt-4 flex flex-col gap-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between gap-4 rounded-lg border border-spotify-border bg-spotify-panel px-4 py-4"
          >
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-white">{session.mood}</p>
              <p className="mt-1 text-base text-spotify-muted">
                {timeAgo(session.timestamp)} · {session.results.length} tracks
              </p>
            </div>
            <button
              type="button"
              onClick={() => onRestore(session)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-spotify-green text-black hover:opacity-90"
              aria-label="Restore session"
              title="Restore session"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
