"use client";

import { useEffect, useState } from "react";

export default function AnimatedProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = requestAnimationFrame(() => setWidth(100));
    return () => cancelAnimationFrame(timer);
  }, []);

  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-xs text-spotify-muted">
        <span>Familiar</span>
        <span>Fresh</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-spotify-border">
        <div
          className="progress-fill h-full rounded-full"
          style={{ width: `${width}%` }}
        />
      </div>
      <p className="mt-1 text-center text-xs text-spotify-muted">Familiar → Fresh</p>
    </div>
  );
}
