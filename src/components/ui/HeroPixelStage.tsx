"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const ACCENT = "rgb(var(--accent))";
const ACCENT_LIGHT = "color-mix(in srgb, rgb(var(--accent)) 60%, #fff)";
const SIGNAL = "rgb(var(--signal))";

// -------------------------------------------------------------
// HERO BASELINE: a little robot walks the line and says things.
// -------------------------------------------------------------
const ROBOT_LINES = [
  "Hi! Uwais is open to software engineering internships.",
  "Two papers at ACM AutoUI '26, Gothenburg.",
  "Psst. Give that name badge a swing.",
  "Poke me. Go on.",
  "Try clicking the name up there.",
  "There's a terminal further down. Type help.",
  "Made with Next.js, Tailwind and a lot of pixels.",
];

// What the robot says when you poke it.
const POKE_LINES = [
  "Hey! That tickles.",
  "I'm on break. Mostly.",
  "Fun fact: there's an arcade at the bottom.",
  "Try the terminal. Type play.",
  "Beep. Boop. Hire Uwais.",
  "I've been walking this line all day.",
];

export function HeroPixelBaseline() {
  const reduce = useReducedMotion();
  const [line, setLine] = useState(0);
  const [poke, setPoke] = useState<{ n: number; text: string } | null>(null);
  const pokeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (pokeTimer.current) clearTimeout(pokeTimer.current); }, []);
  const pokeRobot = () => {
    setPoke((p) => ({ n: (p?.n ?? 0) + 1, text: POKE_LINES[((p?.n ?? -1) + 1) % POKE_LINES.length] }));
    if (pokeTimer.current) clearTimeout(pokeTimer.current);
    pokeTimer.current = setTimeout(() => setPoke(null), 2600);
  };
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
          <rect x="2" y="1" width="12" height="7" style={{ fill: "color-mix(in srgb, rgb(var(--signal)) 35%, #000)" }} />
          <rect x="3" y="2" width="6" height="1" style={{ fill: "color-mix(in srgb, rgb(var(--signal)) 70%, #fff)" }} />
          <rect x="3" y="4" width="8" height="1" style={{ fill: "color-mix(in srgb, rgb(var(--signal)) 70%, #fff)" }} />
          <rect x="3" y="6" width="4" height="1" style={{ fill: SIGNAL }} />
          <rect x="7" y="9" width="2" height="2" fill="currentColor" />
          <rect x="4" y="11" width="8" height="1" fill="currentColor" />
        </svg>

        {/* Walking robot */}
        <button
          type="button"
          onClick={pokeRobot}
          aria-label="Poke the robot"
          className="absolute z-10 flex flex-col items-center cursor-pointer transition-all duration-150 ease-linear"
          style={{ left: `${walkPos}%`, transform: `scaleX(${walkDirection})` }}
        >
          <motion.svg
            key={poke?.n ?? 0}
            viewBox="0 0 12 14"
            shapeRendering="crispEdges"
            className="w-6 h-auto text-ink"
            initial={poke && !reduce ? { y: 0 } : false}
            animate={poke && !reduce ? { y: [0, -14, 0, -5, 0] } : { y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <rect x="5" y="0" width="2" height="1" style={{ fill: ACCENT }} />
            <rect x="5" y="1" width="2" height="1" fill="currentColor" />
            <rect x="3" y="2" width="6" height="4" fill="currentColor" />
            <rect x="4" y="3" width="1" height="1" style={{ fill: ACCENT }} />
            <rect x="7" y="3" width="1" height="1" style={{ fill: ACCENT }} />
            <rect x="2" y="6" width="8" height="4" fill="currentColor" />
            <rect x="4" y="7" width="4" height="2" style={{ fill: SIGNAL }} />
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
          </motion.svg>
        </button>

        {/* Speech bubble */}
        <div className="mx-auto max-w-[70%] sm:max-w-md px-3 py-1.5 rounded-full bg-surface border border-line overflow-hidden" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={poke ? `poke-${poke.n}` : line}
              initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="text-[12px] text-ink-2 truncate"
            >
              {poke ? poke.text : ROBOT_LINES[line]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Server */}
        <svg viewBox="0 0 12 14" shapeRendering="crispEdges" className="w-6 h-auto text-ink-2 shrink-0" aria-hidden>
          <rect x="1" y="0" width="10" height="14" fill="currentColor" />
          <rect x="2" y="2" width="8" height="2" style={{ fill: "rgb(var(--paper))" }} />
          <rect x="9" y="2" width="1" height="1" style={{ fill: ACCENT }} />
          <rect x="2" y="6" width="8" height="2" style={{ fill: "rgb(var(--paper))" }} />
          <rect x="9" y="6" width="1" height="1" style={{ fill: SIGNAL }} />
          <rect x="2" y="10" width="8" height="2" style={{ fill: "rgb(var(--paper))" }} />
          <rect x="9" y="10" width="1" height="1" style={{ fill: ACCENT_LIGHT }} />
        </svg>
      </div>
    </div>
  );
}
