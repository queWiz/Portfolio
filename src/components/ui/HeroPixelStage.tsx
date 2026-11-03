"use client";

import { useState, useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { EASE_OUT, SPRING_SOFT } from "@/lib/motion";

const ACCENT = "rgb(var(--accent))";
const ACCENT_LIGHT = "color-mix(in srgb, rgb(var(--accent)) 60%, #fff)";
const ACCENT_PALE = "color-mix(in srgb, rgb(var(--accent)) 32%, #fff)";
const ACCENT_DEEP = "color-mix(in srgb, rgb(var(--accent)) 55%, #000)";
const MOSS = "rgb(var(--moss))";

// -------------------------------------------------------------
// 1. PIXEL DRONE
// Drops in on a spring, idles with a float, and can be dragged:
// it tilts with drag velocity and springs back home on release.
// -------------------------------------------------------------
export function HeroPixelDrone() {
  const reduce = useReducedMotion();
  const [pings, setPings] = useState<number[]>([]);
  const [hasDragged, setHasDragged] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xVelocity = useVelocity(x);
  const tilt = useSpring(useTransform(xVelocity, [-1600, 0, 1600], [-16, 0, 16]), {
    stiffness: 220,
    damping: 18,
  });
  // Ground shadow shrinks and fades as the drone is lifted away from it.
  const shadowScale = useTransform(y, [-220, 0, 120], [0.45, 1, 1.12]);
  const shadowOpacity = useTransform(y, [-220, 0, 120], [0.12, 0.5, 0.6]);
  const shadowX = useTransform(x, (v) => v * 0.85);

  // Framer can report a tap at the end of a drag; ignore taps right after a drag ends.
  const lastDragEnd = useRef(0);
  const ping = () => {
    if (Date.now() - lastDragEnd.current < 300) return;
    setPings((p) => [...p.slice(-2), Date.now()]);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[360px] lg:h-[420px] flex items-center justify-center select-none">
      <motion.div
        className="relative flex flex-col items-center"
        initial={reduce ? false : { y: -160, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...SPRING_SOFT, delay: 0.5 }}
      >
        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.45}
          dragTransition={{ bounceStiffness: 240, bounceDamping: 14 }}
          whileDrag={{ scale: 1.06 }}
          onDragStart={() => setHasDragged(true)}
          onDragEnd={() => (lastDragEnd.current = Date.now())}
          onTap={ping}
          style={{ x, y, rotate: tilt }}
          className="relative cursor-grab active:cursor-grabbing touch-none"
          aria-label="Pixel drone. Drag it around or tap it."
          role="img"
        >
          {/* Radar ping on tap */}
          <AnimatePresence>
            {pings.map((id) => (
              <motion.span
                key={id}
                className="absolute left-1/2 top-1/2 -ml-24 -mt-24 h-48 w-48 rounded-full border border-accent/60 pointer-events-none"
                initial={{ scale: 0.3, opacity: 0.8 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 0.9, ease: EASE_OUT }}
                onAnimationComplete={() => setPings((p) => p.filter((v) => v !== id))}
              />
            ))}
          </AnimatePresence>

          <div className={`flex flex-col items-center ${reduce ? "" : "animate-float"}`}>
            <svg viewBox="0 0 24 10" shapeRendering="crispEdges" className="w-48 sm:w-56 lg:w-64 h-auto">
              {/* Cockpit dome */}
              <rect x="9" y="0" width="6" height="1" style={{ fill: ACCENT }} />
              <rect x="8" y="1" width="8" height="1" style={{ fill: ACCENT_LIGHT }} />
              <rect x="7" y="2" width="10" height="1" style={{ fill: ACCENT_PALE }} />
              <rect x="11" y="2" width="2" height="1" style={{ fill: ACCENT_DEEP }} />
              {/* Hull */}
              <rect x="4" y="3" width="16" height="1" fill="currentColor" className="text-ink-2" />
              <rect x="2" y="4" width="20" height="1" fill="currentColor" className="text-ink" />
              <rect x="0" y="5" width="24" height="2" fill="currentColor" className="text-ink" />
              {/* Lights */}
              <rect x="3" y="5" width="2" height="1" style={{ fill: ACCENT_LIGHT }} />
              <rect x="7" y="5" width="2" height="1" fill="#E0A23B" />
              <rect x="11" y="5" width="2" height="1" style={{ fill: MOSS }} />
              <rect x="15" y="5" width="2" height="1" style={{ fill: ACCENT }} />
              <rect x="19" y="5" width="2" height="1" style={{ fill: ACCENT_LIGHT }} />
              {/* Propulsion ring */}
              <rect x="2" y="7" width="20" height="1" fill="currentColor" className="text-ink-2" />
              <rect x="6" y="8" width="12" height="1" fill="currentColor" className="text-muted" />
              <rect x="9" y="9" width="6" height="1" style={{ fill: ACCENT }} />
            </svg>
            {/* Thruster */}
            <svg viewBox="0 0 6 4" shapeRendering="crispEdges" className="mt-0.5 w-12 h-auto animate-pulse">
              <rect x="1" y="0" width="4" height="1" style={{ fill: ACCENT_LIGHT }} />
              <rect x="2" y="1" width="2" height="2" style={{ fill: ACCENT }} />
              <rect x="2" y="3" width="2" height="1" style={{ fill: ACCENT_PALE }} />
            </svg>
          </div>
        </motion.div>

        {/* Ground shadow */}
        <motion.div
          aria-hidden
          style={{ scaleX: shadowScale, opacity: shadowOpacity, x: shadowX }}
          className="mt-8 h-2.5 w-40 rounded-[50%] bg-ink/40 dark:bg-black/80 blur-[6px]"
        />

        <motion.p
          aria-hidden
          animate={{ opacity: hasDragged ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="mt-5 font-mono text-[11px] text-muted"
        >
          drag me
        </motion.p>
      </motion.div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. HERO BASELINE: a little robot walks the line and says things.
// -------------------------------------------------------------
const ROBOT_LINES = [
  "Hi! Uwais is open to software engineering internships.",
  "Two papers at ACM AutoUI '26, Gothenburg.",
  "Psst. The drone up there can be dragged.",
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
