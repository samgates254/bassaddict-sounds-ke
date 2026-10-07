import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#08090A",
        panel: "#111315",
        panel2: "#191C1F",
        line: "#2A2E32",
        paper: "#F5F2EA",
        mute: "#AAA69E",
        steel: "#A7B0B8",
        ember: "#E34832",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1240px",
      },
    },
  },
  plugins: [],
};

export default config;
