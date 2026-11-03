"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { useMagnetic } from "@/hooks/useMagnetic";
import { Sun, Moon, ArrowUpRight } from "lucide-react";

export function TopNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [sgtTime, setSgtTime] = useState("");
  const resumeRef = useMagnetic<HTMLAnchorElement>({ strength: 0.28, textStrength: 0.45 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-SG", {
        timeZone: "Asia/Singapore",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(now);
      setSgtTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-surface/85 dark:bg-surface/85 border border-slate-200/80 dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 max-w-5xl w-full"
        >
          {/* Brandmark */}
          <a
            href="#home"
            className="font-heading font-semibold text-sm sm:text-base tracking-[-0.035em] text-slate-900 dark:text-white flex items-center gap-0.5 group"
          >
            ALQARNI
            <span className="text-cobalt group-hover:scale-125 transition-transform duration-200">
              .
            </span>
          </a>

          {/* Center Live Badges */}
          <div className="hidden md:flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] text-slate-600 dark:text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" />
              <span>SGT {sgtTime || "UTC+8"}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>OPEN TO SWE INTERNSHIP</span>
            </div>
          </div>

          {/* Right Navigation & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#projects"
              className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-cobalt dark:hover:text-cobalt transition-colors px-2 py-1"
            >
              /projects
            </a>

            <a
              href="#terminal"
              className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-cobalt dark:hover:text-cobalt transition-colors px-2 py-1 hidden sm:inline-block"
            >
              /cli
            </a>

            <a
              href="#experience"
              className="text-xs font-mono font-medium text-slate-600 dark:text-slate-300 hover:text-cobalt dark:hover:text-cobalt transition-colors px-2 py-1 hidden sm:inline-block"
            >
              /track
            </a>

            {/* Dual Mode Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark Theme"
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08] transition-colors"
            >
              {theme === "light" ? (
                <Moon size={15} className="text-slate-700" />
              ) : (
                <Sun size={15} className="text-amber-400" />
              )}
            </button>

            {/* Magnetic Resume CTA */}
            <a
              ref={resumeRef}
              href="/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              download="Uwais_Alqarni_Resume.pdf"
              title="Download / View Uwais Alqarni's Resume (PDF)"
              className="magnetic-btn inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-cobalt text-on-accent text-xs font-mono font-semibold hover:bg-cobalt-dark shadow-sm transition-all"
            >
              <span className="magnetic-inner">
                <span>RESUME</span>
                <ArrowUpRight size={12} />
              </span>
            </a>
          </div>
        </nav>
      </header>

    </>
  );
}
