import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        // Existing BASSADICT colours
        ink: "#070A07",
        panel: "#0A0E0A",
        panel2: "#111611",
        line: "rgba(168,255,0,0.15)",
        paper: "#F4F7EF",
        mute: "#B5BCAF",
        steel: "#899384",
        ember: "#A8FF00",

        // Semantic colours for shadcn components
        background: "#070A07",
        foreground: "#F4F7EF",
        card: "#0A0E0A",
        "card-foreground": "#F4F7EF",
        popover: "#111611",
        "popover-foreground": "#F4F7EF",
        primary: "#A8FF00",
        "primary-foreground": "#070A07",
        secondary: "#111611",
        "secondary-foreground": "#F4F7EF",
        muted: "#111611",
        "muted-foreground": "#B5BCAF",
        accent: "#A8FF00",
        "accent-foreground": "#070A07",
        destructive: "#EF4444",
        border: "rgba(168,255,0,0.15)",
        input: "rgba(168,255,0,0.22)",
        ring: "#A8FF00",

        // Additional semantic tokens
        "chart-1": "#A8FF00",
        "chart-2": "#899384",
        "chart-3": "#64748B",
        "chart-4": "#22C55E",
        "chart-5": "#F59E0B",
      },

      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        impact: ["var(--font-impact)", "Anton", "Impact", "sans-serif"],
        tech: ["var(--font-mono-tech)", "monospace"],
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

        // Animata and shadcn-compatible animations
        "blink-cursor": "blink-cursor 1.2s step-end infinite",
        "shape-shift": "shape-shift 5s ease-in-out infinite",
        "reveal-up": "reveal-up 0.8s ease-out both",
        "reveal-down": "reveal-down 0.8s ease-out both",
        "content-blur": "content-blur 0.8s ease-out both",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },

      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
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
          "0%, 100%": {
            opacity: "0",
            transform: "translate3d(0, 16px, 0) scale(.65)",
          },
          "35%, 70%": { opacity: ".85" },
          "50%": {
            transform: "translate3d(12px, -22px, 0) scale(1.15)",
          },
        },

        "wave-bars": {
          from: { transform: "scaleY(.45)", opacity: ".6" },
          to: { transform: "scaleY(1)", opacity: "1" },
        },

        "blink-cursor": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },

        "shape-shift": {
          "0%": { width: "40px", height: "20px" },
          "20%": { width: "240px", height: "128px" },
          "40%": { width: "80px", height: "80px" },
          "80%": { width: "128px", height: "240px" },
          "100%": { width: "40px", height: "20px" },
        },

        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "reveal-down": {
          "0%": { opacity: "0", transform: "translateY(-80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },

        "content-blur": {
          "0%": { filter: "blur(0.3rem)" },
          "100%": { filter: "blur(0)" },
        },
      },
    },
  },

  plugins: [],
};

export default config;
