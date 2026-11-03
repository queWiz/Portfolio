"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { EASE_OUT } from "@/lib/motion";

const LINKS = [
  { href: "#projects", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#publications", label: "Research", hideOnPhone: true },
  { href: "#terminal", label: "Terminal", desktopOnly: true },
] as { href: string; label: string; hideOnPhone?: boolean; desktopOnly?: boolean }[];

function useSingaporeTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-SG", {
      timeZone: "Asia/Singapore",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const reduce = useReducedMotion();
  const time = useSingaporeTime();
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        aria-label="Main"
        initial={reduce ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className={`pointer-events-auto flex items-center gap-1 rounded-full border p-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ease-out ${
          scrolled
            ? "bg-surface/85 border-line shadow-[0_8px_30px_-12px_rgb(var(--ink)/0.25)]"
            : "bg-surface/60 border-line/70 shadow-none"
        }`}
      >
        {/* Monogram */}
        <a
          href="#home"
          aria-label="Uwais Alqarni, back to top"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink text-paper text-[13px] font-semibold tracking-tight transition-transform duration-300 ease-out hover:scale-105"
        >
          <span>
            U<span className="text-accent-soft">.</span>
          </span>
        </a>

        <span className="mx-1 h-4 w-px bg-line hidden sm:block" aria-hidden />

        {/* Links with a sliding hover highlight */}
        <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
          {LINKS.map((l) => (
            <li key={l.href} className={l.desktopOnly ? "hidden md:block" : l.hideOnPhone ? "hidden sm:block" : undefined}>
              <a
                href={l.href}
                onMouseEnter={() => setHovered(l.href)}
                onFocus={() => setHovered(l.href)}
                onBlur={() => setHovered(null)}
                className="relative z-0 block rounded-full px-2 sm:px-3 py-1.5 text-[13px] sm:text-sm text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                {hovered === l.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.07]"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <span className="mx-1 h-4 w-px bg-line hidden sm:block" aria-hidden />

        {/* Local time */}
        <span
          className="hidden sm:flex items-center gap-1.5 px-2 font-mono text-[11px] text-muted tabular-nums"
          title="Local time in Singapore"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal" aria-hidden />
          SGT {time || "--:--"}
        </span>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-2 transition-colors duration-200 hover:bg-ink/[0.07] hover:text-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
              className="grid place-items-center"
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* Résumé */}
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="group ml-0.5 inline-flex shrink-0 items-center gap-1 rounded-full bg-ink px-3 sm:px-3.5 py-1.5 text-[13px] sm:text-sm font-medium text-paper transition-transform duration-300 ease-out active:scale-[0.97]"
        >
          Résumé
          <ArrowUpRight size={14} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.nav>
    </header>
  );
}
