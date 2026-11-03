"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const ACCENT = "rgb(var(--accent))";
const ACCENT_LIGHT = "color-mix(in srgb, rgb(var(--accent)) 60%, #fff)";
const MOSS = "rgb(var(--moss))";

// -------------------------------------------------------------
// HERO BASELINE: a little robot walks the line and says things.
// -------------------------------------------------------------
const ROBOT_LINES = [
  "Hi! Uwais is open to software engineering internships.",
  "Two papers at ACM AutoUI '26, Gothenburg.",
  "Psst. Give that name badge a swing.",
  "There's a terminal further down. Type help.",
  "Made with Next.js, Tailwind and a lot of pixels.",
];

export function HeroPixelBaseline() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [walkFrame, setWalkFrame] = useState(0);
  const [walkPos, setWalkPos] = useState(30);
  const [walkDirection, setWalkDirection] = useState<1 | -1>(1);
  const baselineRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Pause loops when the hero is off screen.
  useEffect(() => {
    const el = baselineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => setLine((p) => (p + 1) % ROBOT_LINES.length), 4200);
    return () => clearInterval(id);
  }, [isInView]);

  useEffect(() => {
    if (!isInView || reduce) return;
    const walkTimer = setInterval(() => {
      setWalkFrame((f) => (f + 1) % 4);
      setWalkPos((pos) => {
        if (pos >= 68) {
          setWalkDirection(-1);
          return 67;
        }
        if (pos <= 22) {
          setWalkDirection(1);
          return 23;
        }
        return pos + walkDirection * 0.7;
      });
    }, 140);
    return () => clearInterval(walkTimer);
  }, [isInView, walkDirection, reduce]);

  return (
    <div ref={baselineRef} className="w-full pt-4 border-t border-line select-none">
      <div className="relative w-full min-h-[44px] flex items-center justify-between gap-4">
        {/* Workstation */}
        <svg viewBox="0 0 16 12" shapeRendering="crispEdges" className="w-8 h-auto text-ink-2 shrink-0" aria-hidden>
          <rect x="1" y="0" width="14" height="9" fill="currentColor" />
          <rect x="2" y="1" width="12" height="7" style={{ fill: "color-mix(in srgb, rgb(var(--moss)) 35%, #000)" }} />
          <rect x="3" y="2" width="6" height="1" style={{ fill: "color-mix(in srgb, rgb(var(--moss)) 70%, #fff)" }} />
          <rect x="3" y="4" width="8" height="1" style={{ fill: "color-mix(in srgb, rgb(var(--moss)) 70%, #fff)" }} />
          <rect x="3" y="6" width="4" height="1" style={{ fill: MOSS }} />
          <rect x="7" y="9" width="2" height="2" fill="currentColor" />
          <rect x="4" y="11" width="8" height="1" fill="currentColor" />
        </svg>

        {/* Walking robot */}
        <div
          aria-hidden
          className="absolute transition-all duration-150 ease-linear flex flex-col items-center pointer-events-none"
          style={{ left: `${walkPos}%`, transform: `scaleX(${walkDirection})` }}
        >
          <svg viewBox="0 0 12 14" shapeRendering="crispEdges" className="w-6 h-auto text-ink">
            <rect x="5" y="0" width="2" height="1" style={{ fill: ACCENT }} />
            <rect x="5" y="1" width="2" height="1" fill="currentColor" />
            <rect x="3" y="2" width="6" height="4" fill="currentColor" />
            <rect x="4" y="3" width="1" height="1" style={{ fill: ACCENT }} />
            <rect x="7" y="3" width="1" height="1" style={{ fill: ACCENT }} />
            <rect x="2" y="6" width="8" height="4" fill="currentColor" />
            <rect x="4" y="7" width="4" height="2" style={{ fill: MOSS }} />
            {walkFrame === 0 && (
              <>
                <rect x="3" y="10" width="2" height="3" fill="currentColor" />
                <rect x="7" y="10" width="2" height="3" fill="currentColor" />
                <rect x="2" y="13" width="3" height="1" fill="currentColor" />
                <rect x="7" y="13" width="3" height="1" fill="currentColor" />
              </>
            )}
            {walkFrame === 1 && (
              <>
                <rect x="4" y="10" width="2" height="2" fill="currentColor" />
                <rect x="7" y="10" width="2" height="4" fill="currentColor" />
                <rect x="4" y="12" width="3" height="1" fill="currentColor" />
                <rect x="6" y="13" width="3" height="1" fill="currentColor" />
              </>
            )}
            {walkFrame === 2 && (
              <>
                <rect x="3" y="10" width="2" height="4" fill="currentColor" />
                <rect x="7" y="10" width="2" height="2" fill="currentColor" />
                <rect x="2" y="13" width="3" height="1" fill="currentColor" />
                <rect x="7" y="12" width="3" height="1" fill="currentColor" />
              </>
            )}
            {walkFrame === 3 && (
              <>
                <rect x="4" y="10" width="2" height="3" fill="currentColor" />
                <rect x="6" y="10" width="2" height="3" fill="currentColor" />
                <rect x="3" y="13" width="3" height="1" fill="currentColor" />
                <rect x="6" y="13" width="3" height="1" fill="currentColor" />
              </>
            )}
          </svg>
        </div>

        {/* Speech bubble */}
        <div className="mx-auto max-w-[70%] sm:max-w-md px-3 py-1.5 rounded-full bg-surface border border-line overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="text-[12px] text-ink-2 truncate"
            >
              {ROBOT_LINES[line]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Server */}
        <svg viewBox="0 0 12 14" shapeRendering="crispEdges" className="w-6 h-auto text-ink-2 shrink-0" aria-hidden>
          <rect x="1" y="0" width="10" height="14" fill="currentColor" />
          <rect x="2" y="2" width="8" height="2" style={{ fill: "rgb(var(--paper))" }} />
          <rect x="9" y="2" width="1" height="1" style={{ fill: ACCENT }} />
          <rect x="2" y="6" width="8" height="2" style={{ fill: "rgb(var(--paper))" }} />
          <rect x="9" y="6" width="1" height="1" style={{ fill: MOSS }} />
          <rect x="2" y="10" width="8" height="2" style={{ fill: "rgb(var(--paper))" }} />
          <rect x="9" y="10" width="1" height="1" style={{ fill: ACCENT_LIGHT }} />
        </svg>
      </div>
    </div>
  );
}
