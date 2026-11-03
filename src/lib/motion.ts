import type { Transition, Variants } from "framer-motion";

/**
 * One motion language for the whole site.
 * Short travel, long soft ease-out: things settle into place rather than fly in.
 * Mirrors `ease-out` in tailwind.config.ts so CSS and JS transitions match.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  fast: 0.25, // hovers, toggles
  base: 0.5, // small UI changes
  reveal: 0.8, // content entering the viewport
} as const;

export const revealTransition = (delay = 0): Transition => ({
  duration: DURATION.reveal,
  ease: EASE_OUT,
  delay,
});

/** Fade + 12px rise. Use with `initial="hidden" whileInView="show" viewport={VIEWPORT}`. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: revealTransition() },
};

/** Parent that staggers `reveal` children by 60ms. */
export const stagger = (step = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren } },
});

/** Reveal once, slightly before the element is fully on screen. */
export const VIEWPORT = { once: true, margin: "0px 0px -10% 0px" } as const;
