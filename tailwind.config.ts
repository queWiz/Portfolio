import type { Config } from "tailwindcss";

/** Token backed by an `R G B` CSS variable so Tailwind opacity modifiers (`bg-accent/10`) work. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (palette "Deep Teal & Flare"). Values live in globals.css
        // and switch automatically in dark mode, so new markup needs no `dark:` colour variants.
        paper: token("paper"),
        surface: token("surface"),
        ink: { DEFAULT: token("ink"), 2: token("ink-2") },
        muted: token("muted"),
        line: token("line"),
        accent: { DEFAULT: token("accent"), strong: token("accent-strong"), soft: token("accent-soft") },
        signal: token("signal"),
        "on-accent": token("on-accent"),
        console: { DEFAULT: token("console"), raised: token("console-raised"), line: token("console-line") },

        // Legacy alias: older components still say `cobalt`. Remove once each section is rebuilt.
        cobalt: { DEFAULT: token("accent"), dark: token("accent-strong"), light: token("accent-soft") },

        // Remaps of Tailwind's slate/emerald so the few leftover classes (arcade loadout panel) match the palette.
        slate: {
          50: "#FCF5EA", 100: "#F7EAD6", 200: "#E6D3B8", 300: "#D9CDB9", 400: "#90AEAD", 500: "#5B6767",
          600: "#3B6676", 700: "#2F4A53", 800: "#1F3E49", 900: "#16313A", 950: "#0F2229",
        },
        emerald: {
          50: "#EEF3F3", 100: "#DCE7E6", 200: "#C2D5D4", 300: "#A9C2C1", 400: "#90AEAD", 500: "#6F9190",
          600: "#557776", 700: "#3F5D5C", 800: "#2E4645", 900: "#1F3030", 950: "#132020",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        arabic: ["var(--font-arabic)", "serif"],
        pixel: ["var(--font-pixel)", "monospace"],
        signature: ["var(--font-signature)", "cursive"],
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        scroll: "scroll 40s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
