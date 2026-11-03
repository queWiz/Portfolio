"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RevealText } from "@/components/motion/RevealText";
import { VIEWPORT, revealBlur } from "@/lib/motion";

/** Work opener: one oversized, single-tone heading with the project count as a superscript. */
export function WorkHeader({ count }: { count: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="mb-14 sm:mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex items-start gap-3">
        <RevealText
          as="h2"
          className="text-[3.5rem] leading-[0.92] sm:text-[5.5rem] lg:text-[7rem] font-semibold tracking-[-0.05em] text-ink"
          segments={[{ text: "Selected work" }]}
        />
        <motion.sup
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-2 sm:mt-4 font-mono text-[13px] sm:text-[15px] text-muted"
        >
          ({String(count).padStart(2, "0")})
        </motion.sup>
      </div>
      <motion.p
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={revealBlur(0.25)}
        className="max-w-xs text-[15px] leading-relaxed text-ink-2 md:text-right"
      >
        Client platforms, research tools and on-device AI. Open any card for the full story.
      </motion.p>
    </div>
  );
}
