import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        spotify: {
          bg: "#0a0a0a",
          panel: "#111111",
          green: "#1db954",
          muted: "#aaaaaa",
          border: "#222222",
        },
      },
    },
  },
  plugins: [],
};

export default config;
