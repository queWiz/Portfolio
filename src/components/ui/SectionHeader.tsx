"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { RevealText } from "@/components/motion/RevealText";
import { revealBlur, VIEWPORT } from "@/lib/motion";

type Props = {
  /** e.g. "01" → renders "(01) — Work" */
  index: string;
  eyebrow: string;
  title: string;
  /** Muted continuation of the title (the Leo two-tone heading). */
  titleMuted?: string;
  aside?: ReactNode;
};

export function SectionHeader({ index, eyebrow, title, titleMuted, aside }: Props) {
  return (
    <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-end">
      <div className="lg:col-span-8">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={revealBlur(0)}
          className="mb-4 font-mono text-[12px] text-muted"
        >
          ({index}) — {eyebrow}
        </motion.p>
        <RevealText
          as="h2"
          className="text-[2rem] leading-[1.08] sm:text-5xl font-semibold tracking-[-0.035em] text-ink"
          segments={[{ text: title }, ...(titleMuted ? [{ text: titleMuted, className: "text-muted" }] : [])]}
        />
      </div>
      {aside && (
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={revealBlur(0.25)}
          className="lg:col-span-4 text-[15px] leading-relaxed text-ink-2"
        >
          {aside}
        </motion.div>
      )}
    </div>
  );
}
