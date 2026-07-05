export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-spotify-border border-t-spotify-green" />
      <p className="text-spotify-muted">Finding your next favourite song...</p>
    </div>
  );
}
