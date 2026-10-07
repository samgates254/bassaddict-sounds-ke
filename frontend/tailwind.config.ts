import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090A0C",
        panel: "#12151A",
        panel2: "#181C22",
        line: "#2C323A",
        paper: "#F4F1EA",
        mute: "#A39E93",
        steel: "#9AA8B5",
        ember: "#E23D2B",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Narrow", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
