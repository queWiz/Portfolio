"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment } from "react";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

export type RevealSegment = {
  text: string;
  className?: string;
  /** Line break before this segment on sm+ screens; on phones the text wraps naturally. */
  breakBefore?: boolean;
};

const TAGS = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p, span: motion.span, div: motion.div } as const;
type Tag = keyof typeof TAGS;

type Props = {
  segments: RevealSegment[];
  as?: Tag;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
  /** "mount" for above-the-fold, "inView" for section headings. */
  trigger?: "mount" | "inView";
};

const word: Variants = {
  hidden: { opacity: 0, y: "0.3em", filter: "blur(10px)" },
  show: { opacity: 1, y: "0em", filter: "blur(0px)", transition: { duration: 0.8, ease: EASE_OUT } },
};

/**
 * Word-by-word blur reveal (the Saro / Leo heading entrance).
 * Screen readers get the plain sentence; the animated words are aria-hidden.
 */
export function RevealText({
  segments,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.055,
  trigger = "inView",
}: Props) {
  const reduce = useReducedMotion();
  const label = segments.map((s) => s.text).join(" ").replace(/\s+/g, " ").trim();

  if (reduce) {
    return (
      <PlainTag as={as} className={className}>
        {segments.map((s, i) => (
          <Fragment key={i}>
            {s.breakBefore && <br className="hidden sm:block" />}
            <span className={s.className}>{s.text} </span>
          </Fragment>
        ))}
      </PlainTag>
    );
  }

  const MotionTag = TAGS[as];
  const play = trigger === "mount" ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };

  return (
    <MotionTag
      className={className}
      aria-label={label}
      initial="hidden"
      {...play}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {segments.map((s, si) => (
        <Fragment key={si}>
          {s.breakBefore && <br aria-hidden className="hidden sm:block" />}
          {s.text.split(/\s+/).filter(Boolean).map((w, wi) => (
            <Fragment key={wi}>
              <motion.span aria-hidden variants={word} className={`inline-block will-change-[transform,filter,opacity] ${s.className ?? ""}`}>
                {w}
              </motion.span>{" "}
            </Fragment>
          ))}
        </Fragment>
      ))}
    </MotionTag>
  );
}

function PlainTag({ as, className, children }: { as: Tag; className?: string; children: React.ReactNode }) {
  const T = as;
  return <T className={className}>{children}</T>;
}
