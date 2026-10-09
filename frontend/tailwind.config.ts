import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#070A07",
        panel: "#0A0E0A",
        panel2: "#111611",
        line: "rgba(168,255,0,0.15)",
        paper: "#F4F7EF",
        mute: "#B5BCAF",
        steel: "#899384",
        ember: "#A8FF00",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "1240px",
      },
      animation: {
        "orb-lime-one": "orb-lime-one 24s ease-in-out infinite alternate",
        "orb-lime-two": "orb-lime-two 30s ease-in-out infinite alternate",
        "orb-lime-three": "orb-lime-three 26s ease-in-out infinite alternate",
        "hero-float": "hero-float 7s ease-in-out infinite",
        "hero-float-delayed": "hero-float 8s ease-in-out -2.5s infinite",
        "hero-pulse": "hero-pulse 1.4s ease-in-out infinite alternate",
        "hero-particle": "hero-particle 7s ease-in-out infinite",
        "wave-bars": "wave-bars 850ms ease-in-out infinite alternate",
      },
      keyframes: {
        "orb-lime-one": {
          "0%": { transform: "translate3d(-8%, -5%, 0) scale(0.9)" },
          "100%": { transform: "translate3d(17%, 18%, 0) scale(1.12)" },
        },
        "orb-lime-two": {
          "0%": { transform: "translate3d(12%, -12%, 0) scale(1.05)" },
          "100%": { transform: "translate3d(-18%, 14%, 0) scale(0.88)" },
        },
        "orb-lime-three": {
          "0%": { transform: "translate3d(10%, 8%, 0) scale(0.9)" },
          "100%": { transform: "translate3d(-16%, -14%, 0) scale(1.14)" },
        },
        "hero-float": {
          "0%, 100%": { translate: "0 0" },
          "50%": { translate: "0 -16px" },
        },
        "hero-pulse": {
          from: { transform: "scaleY(0.48)", opacity: "0.65" },
          to: { transform: "scaleY(1)", opacity: "1" },
        },
        "hero-particle": {
          "0%, 100%": { opacity: "0", transform: "translate3d(0, 16px, 0) scale(.65)" },
          "35%, 70%": { opacity: ".85" },
          "50%": { transform: "translate3d(12px, -22px, 0) scale(1.15)" },
        },
        "wave-bars": {
          from: { transform: "scaleY(.45)", opacity: ".6" },
          to: { transform: "scaleY(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
