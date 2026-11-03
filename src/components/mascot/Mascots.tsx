"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { PixelPortrait } from "./PixelPortrait";

// -------------------------------------------------------------
// Hero mascot: hanging ID badge on a lanyard
// The strap is drawn live from an anchor above the fold to the badge clip,
// so it stretches as you drag. The badge pivots at its clip like a pendulum.
// Tap flips it to the back.
// -------------------------------------------------------------
const ANCHOR_Y = -260; // strap starts this far above the badge clip (behind the nav)

export function BadgeMascot() {
  const reduce = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const lastDragEnd = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Pendulum: lean away from where it's pulled, plus a kick from horizontal speed.
  const lean = useTransform(x, [-220, 0, 220], [16, 0, -16]);
  const kick = useTransform(useVelocity(x), [-1800, 0, 1800], [-14, 0, 14]);
  const rotate = useSpring(useTransform([lean, kick], ([l, k]: number[]) => l + k), { stiffness: 140, damping: 9, mass: 0.8 });

  // Strap: from the fixed anchor to the (moving) clip, with a little slack.
  const strap = useTransform([x, y], ([vx, vy]: number[]) => {
    const ex = 120 + vx;
    const ey = -ANCHOR_Y + vy;
    const cx = 120 + vx * 0.35;
    const cy = (-ANCHOR_Y + vy) * 0.55;
    return `M 120 0 Q ${cx} ${cy} ${ex} ${ey}`;
  });

  const tap = () => {
    if (Date.now() - lastDragEnd.current < 300) return;
    setFlipped((f) => !f);
  };

  return (
    <div className="relative w-full h-[470px] flex justify-center select-none overflow-hidden lg:overflow-visible">
      {/* Phones stack the badge under the text, so the strap is clipped to this box there; desktop lets it rise behind the nav. */}
      <motion.div
        className="relative mt-[60px] w-[240px]"
        initial={reduce ? false : { y: -420 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 11, mass: 1, delay: 0.45 }}
      >
        {/* Lanyard strap (SVG sits above the clip and extends behind the nav) */}
        <svg
          aria-hidden
          className="pointer-events-none absolute left-0 overflow-visible"
          style={{ top: ANCHOR_Y, width: 240, height: -ANCHOR_Y }}
          viewBox={`0 0 240 ${-ANCHOR_Y}`}
        >
          <motion.path d={strap} fill="none" strokeWidth={14} strokeLinecap="round" className="stroke-accent" />
          <motion.path d={strap} fill="none" strokeWidth={14} strokeLinecap="round" strokeDasharray="1 7" className="stroke-black/15" />
        </svg>

        <motion.div
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragTransition={{ bounceStiffness: 180, bounceDamping: 12 }}
          onDragStart={() => setHasDragged(true)}
          onDragEnd={() => (lastDragEnd.current = Date.now())}
          onTap={tap}
          style={{ x, y, rotate, transformOrigin: "50% 0%" }}
          className="relative cursor-grab active:cursor-grabbing touch-none"
          aria-label="Name badge. Drag it to swing, tap to flip."
          role="img"
        >
          {/* Idle sway, pivoting at the clip */}
          <motion.div
            animate={reduce ? undefined : { rotate: [-1.6, 1.6] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            style={{ transformOrigin: "50% 0%" }}
          >
            {/* Metal clip */}
            <div className="mx-auto h-5 w-9 rounded-b-md rounded-t-sm border border-ink/20 bg-gradient-to-b from-[#d9d6cf] to-[#a9a49a] shadow-sm" />
            <div className="[perspective:900px] -mt-1">
              <motion.div
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                style={{ transformStyle: "preserve-3d" }}
                className="relative h-[330px] w-[240px]"
              >
                <BadgeFront />
                <BadgeBack />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p aria-hidden animate={{ opacity: hasDragged ? 0 : 1 }} className="mt-4 text-center font-mono text-[11px] text-muted">
          drag to swing · tap to flip
        </motion.p>
      </motion.div>
    </div>
  );
}

const faceBase =
  "absolute inset-0 overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_2px_4px_rgb(var(--ink)/0.06),0_28px_50px_-24px_rgb(var(--ink)/0.45)] [backface-visibility:hidden]";

function BadgeFront() {
  return (
    <div className={faceBase}>
      {/* slot punched for the clip */}
      <div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-paper ring-1 ring-line" />
      <div className="mt-3 flex items-center justify-between px-5 font-mono text-[10px] uppercase tracking-wider text-muted">
        <span>SIT · Singapore</span>
        <span className="text-accent">Student</span>
      </div>
      <div className="mx-5 mt-3 grid h-[136px] items-end justify-items-center overflow-hidden rounded-xl bg-[#DDE4DB]">
        <PixelPortrait className="h-auto w-[100px]" />
      </div>
      <div className="px-5 pt-4">
        <p className="text-[19px] font-semibold leading-tight tracking-[-0.02em] text-ink">Uwais Alqarni</p>
        <p className="mt-0.5 text-[13px] text-ink-2">Software &amp; Data Engineer</p>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-line px-5 py-3">
        <span className="flex items-center gap-1.5 text-[11px] font-medium text-moss">
          <span className="h-1.5 w-1.5 rounded-full bg-moss" />
          Open to internships
        </span>
        {/* tiny pixel barcode */}
        <svg viewBox="0 0 28 8" shapeRendering="crispEdges" className="h-4 w-14 text-ink" aria-hidden>
          {[0, 2, 3, 5, 8, 9, 11, 14, 15, 16, 18, 21, 23, 24, 26].map((bx) => (
            <rect key={bx} x={bx} y={0} width={1} height={8} fill="currentColor" />
          ))}
        </svg>
      </div>
    </div>
  );
}

function BadgeBack() {
  return (
    <div className={`${faceBase} [transform:rotateY(180deg)] flex flex-col justify-between p-5`}>
      <div className="mx-auto h-1.5 w-12 rounded-full bg-paper ring-1 ring-line" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-wider text-muted">If found, say hi</p>
        <ul className="mt-3 space-y-2 text-[13px] text-ink">
          <li>ualqarni70@gmail.com</li>
          <li>github.com/queWiz</li>
          <li className="text-ink-2">ACM AutoUI &apos;26 · 2 papers</li>
        </ul>
      </div>
      <p className="text-[11px] text-muted">Tap again to flip back.</p>
    </div>
  );
}
