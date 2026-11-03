import type { Config } from "tailwindcss";

/** Token backed by an `R G B` CSS variable so Tailwind opacity modifiers (`bg-accent/10`) work. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Semantic tokens (palette "M1 · Rust & Moss"). Values live in globals.css
        // and switch automatically in dark mode, so new markup needs no `dark:` colour variants.
        paper: token("paper"),
        surface: token("surface"),
        ink: { DEFAULT: token("ink"), 2: token("ink-2") },
        muted: token("muted"),
        line: token("line"),
        accent: { DEFAULT: token("accent"), strong: token("accent-strong"), soft: token("accent-soft") },
        moss: token("moss"),
        "on-accent": token("on-accent"),
        console: { DEFAULT: token("console"), raised: token("console-raised"), line: token("console-line") },

        // Legacy alias: older components still say `cobalt`. Remove once each section is rebuilt.
        cobalt: { DEFAULT: token("accent"), dark: token("accent-strong"), light: token("accent-soft") },

        // Interim warm remaps of Tailwind's cool scales so un-rebuilt sections already match M1.
        // Section rebuilds should switch to the semantic tokens above.
        slate: {
          50: "#F5F1EA",
          100: "#EBE5DA",
          200: "#DDD5C6",
          300: "#CEC7BA",
          400: "#9A9387",
          500: "#6B6458",
          600: "#4F493F",
          700: "#3F3B33",
          800: "#2E2A24",
          900: "#24211C",
          950: "#1C1A16",
        },
        emerald: {
          50: "#EEF4EF",
          100: "#DCE8DF",
          200: "#BCD4C3",
          300: "#9CC4AA",
          400: "#86BE9F",
          500: "#4F8A68",
          600: "#3A7155",
          700: "#2F5D46",
          800: "#264B39",
          900: "#1D3A2C",
          950: "#13271D",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["var(--font-geist)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
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
