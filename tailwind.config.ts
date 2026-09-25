import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ceramic: {
          bg: "#F8F9FA",
          subtle: "#F1F3F5",
          border: "#E2E8F0",
          card: "#FFFFFF",
          text: "#0F172A",
          muted: "#64748B",
        },
        obsidian: {
          bg: "#080C14",
          subtle: "#101520",
          border: "rgba(255, 255, 255, 0.08)",
          card: "#111622",
          text: "#EFF3F8",
          muted: "#8C9BAE",
        },
        cobalt: {
          DEFAULT: "#2563EB",
          dark: "#1D4ED8",
          light: "#3B82F6",
          soft: "rgba(37, 99, 235, 0.1)",
        },
        emerald: {
          DEFAULT: "#10B981",
          soft: "rgba(16, 185, 129, 0.1)",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-poppins)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "scroll": "scroll 40s linear infinite",
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(0.98)" },
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