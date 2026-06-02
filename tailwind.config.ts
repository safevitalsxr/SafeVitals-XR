import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        surface: "#12161F",
        "surface-alt": "#171C26",
        text: "#F8FAFC",
        "text-secondary": "#9AA4B2",
        border: "#242B36",
        accent: "#7AA2FF",
        success: "#8ED8B3",
        warning: "#E7B96B",
        danger: "#FF8A8A",
      },
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
    },
  },
  plugins: [],
};

export default config;
