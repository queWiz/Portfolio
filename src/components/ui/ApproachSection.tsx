"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT, VIEWPORT, revealBlur } from "@/lib/motion";

/**
 * "How I work": the Tabayyun principle (Al-Hujurat 49:6, verify before you accept)
 * and how it shows up in the projects. Every claim here comes from the project write-ups.
 */
const PRINCIPLES = [
  {
    title: "Check input where it arrives",
    body: "Tabayyun runs detection on the phone, so images never leave the device. Pergas checks roles on the server and scrubs NRIC numbers before anything is stored.",
    evidence: ["Tabayyun", "Pergas"],
  },
  {
    title: "Let the database hold the line",
    body: "Rules live in Postgres, not only in the UI: 10+ related tables with enforced integrity for Pergas, row locks so simultaneous BidForGood bids can't overwrite each other, and parameterised SQL throughout.",
    evidence: ["Pergas", "BidForGood", "Clean Brilliant"],
  },
  {
    title: "Prove it with tests",
    body: "Twenty Playwright regression suites, all passing, guard the Pergas portal. BidForGood runs linting, secret scanning and tests on every pull request.",
    evidence: ["Pergas", "BidForGood"],
  },
  {
    title: "Measure it, then share it",
    body: "Tabayyun's OCR correction was tested against ground-truth labels. Codex's retrieval was tuned through repeated experiments. The research side became two papers at ACM AutoUI '26.",
    evidence: ["Tabayyun", "Codex", "ACM AutoUI '26"],
  },
];

export function ApproachSection() {
  const reduce = useReducedMotion();

  return (
    <section id="approach" className="w-full max-w-6xl px-5 sm:px-10 lg:px-0 pt-28 pb-24 scroll-mt-20">
      <SectionHeader index="02" eyebrow="How I work" title="Verify before you trust," titleMuted="the one principle behind what I build." />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* The word, pinned while the principles scroll past */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <motion.p
              lang="ar"
              dir="rtl"
              // Reveal right-to-left, the direction Arabic is read.
              initial={reduce ? false : { clipPath: "inset(0 0 0 100%)", opacity: 0.4 }}
              whileInView={{ clipPath: "inset(0 0 0 0%)", opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              // Set without diacritics: at display size they float too far above the letters.
              // The transliteration below carries the pronunciation.
              className="font-arabic pt-2 pb-2 text-[4.5rem] leading-[1.4] sm:text-[6rem] text-ink text-left"
            >
              تبينوا
            </motion.p>
            <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={revealBlur(0.4)} className="mt-2">
              <p className="text-[15px] text-ink">
                <span className="italic">tabayyanū</span> <span className="text-muted">·</span> investigate, make sure
              </p>
              <p className="mt-1 font-mono text-[12px] text-muted">Al-Hujurat 49:6</p>
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-2">
                The verse asks you to check information before acting on it, so you don&apos;t harm people out of
                ignorance. I hold software to the same rule: nothing is trusted until it has been checked.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Principles */}
        <ol className="lg:col-span-7 border-t border-line">
          {PRINCIPLES.map((p, i) => (
            <motion.li
              key={p.title}
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: i * 0.08 }}
              className="group relative grid grid-cols-[3rem_1fr] gap-x-2 border-b border-line py-8 sm:py-10"
            >
              {/* accent rule that draws in on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100"
              />
              <span className="pt-1.5 font-mono text-[12px] text-muted transition-colors duration-300 group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-ink">{p.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{p.body}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Where this shows up">
                  {p.evidence.map((e) => (
                    <li key={e} className="rounded-full bg-ink/[0.05] px-2.5 py-1 text-[12px] text-ink-2">
                      {e}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
