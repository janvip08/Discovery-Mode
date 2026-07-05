import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discovery Mode",
  description: "Break your listening loop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-spotify-bg antialiased">{children}</body>
    </html>
  );
}
