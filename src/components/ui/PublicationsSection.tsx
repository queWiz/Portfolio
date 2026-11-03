"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { VIEWPORT, revealBlur } from "@/lib/motion";

interface Paper {
  id: string;
  title: string;
  track?: string;
  position: number; // author position, 1-based
  authors: number;
  contribution: string;
  doi: string;
  bibtex: string;
}

// Facts carried over from the previous publications section.
const PAPERS: Paper[] = [
  {
    id: "takeoverbench",
    title: "TakeoverBench: A Benchmarking Platform for Takeover Requests (TOR) in Conditionally Automated Vehicles",
    position: 2,
    authors: 7,
    contribution:
      "Built the Flask backend and core simulation baseline (later extended by teammates), and researched and chose the takeover-performance metrics the benchmark uses.",
    doi: "10.1145/3828158.3833210",
    bibtex: `@inproceedings{takeoverbench2026,\n  title={TakeoverBench: A Benchmarking Platform for Takeover Requests (TOR) in Conditionally Automated Vehicles},\n  booktitle={Adjunct Proceedings of the 18th International Conference on Automotive User Interfaces (AutomotiveUI '26)},\n  year={2026},\n  publisher={ACM},\n  doi={10.1145/3828158.3833210}\n}`,
  },
  {
    id: "driver-supervision",
    title: "Towards Low-Cost Driver Supervision: Evaluating a Smartphone Interface for Driver Inattention Monitoring in Simulated Driving",
    track: "Student Research Track",
    position: 3,
    authors: 6,
    contribution:
      "Built the custom YOLOv8 model that classifies drivers' non-driving tasks (phone use, reading), and contributed to the research and the final interactive demo.",
    doi: "10.1145/3828158.3834806",
    bibtex: `@inproceedings{driversupervision2026,\n  title={Towards Low-Cost Driver Supervision: Evaluating a Smartphone Interface for Driver Inattention Monitoring in Simulated Driving},\n  booktitle={Adjunct Proceedings of the 18th International Conference on Automotive User Interfaces (AutomotiveUI '26)},\n  year={2026},\n  publisher={ACM},\n  doi={10.1145/3828158.3834806}\n}`,
  },
];

const ordinal = (n: number) => `${n}${["th", "st", "nd", "rd"][n % 10 > 3 || [11, 12, 13].includes(n % 100) ? 0 : n % 10]}`;

/** Author list as pixel squares, with Uwais's position filled. */
function AuthorDots({ position, authors }: { position: number; authors: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex gap-1" aria-hidden>
        {Array.from({ length: authors }, (_, i) => (
          <span key={i} className={`h-2.5 w-2.5 ${i + 1 === position ? "bg-accent" : "bg-ink/15"}`} />
        ))}
      </span>
      <span className="font-mono text-[12px] text-muted">
        {ordinal(position)} of {authors} authors
      </span>
    </div>
  );
}

function CopyBibtex({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (permissions/insecure context); the DOI link still works.
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] text-ink-2 transition-colors duration-200 hover:bg-ink/[0.05] hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "y" : "n"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18 }}
          className="inline-flex items-center gap-1.5"
        >
          {copied ? <Check size={14} className="text-signal" /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy BibTeX"}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function PublicationsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="publications" className="w-full max-w-6xl px-5 sm:px-10 lg:px-0 pt-28 pb-20 scroll-mt-20">
      <div className="mb-12 sm:mb-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-end">
        <div className="lg:col-span-8">
          <motion.p initial="hidden" whileInView="show" viewport={VIEWPORT} variants={revealBlur(0)} className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
            Research
          </motion.p>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            variants={revealBlur(0.1)}
            className="mt-3 text-[2.5rem] leading-[1.02] sm:text-[3.5rem] font-semibold tracking-[-0.04em] text-ink"
          >
            Two papers at ACM AutoUI &apos;26.
          </motion.h2>
        </div>
        <motion.p initial="hidden" whileInView="show" viewport={VIEWPORT} variants={revealBlur(0.2)} className="lg:col-span-4 text-[15px] leading-relaxed text-ink-2">
          Adjunct proceedings of the 18th International Conference on Automotive User Interfaces, Gothenburg.{" "}
          <a href="https://orcid.org/0009-0006-6833-4965" target="_blank" rel="noreferrer" className="whitespace-nowrap text-ink underline decoration-line underline-offset-2 hover:decoration-current">
            ORCID ↗
          </a>
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {PAPERS.map((p, i) => (
          <motion.article
            key={p.id}
            // Papers set down on the desk: a little tilt and drop, then they straighten.
            initial={reduce ? false : { opacity: 0, y: 40, rotate: i === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={VIEWPORT}
            transition={{ type: "spring", stiffness: 90, damping: 16, delay: i * 0.12 }}
            whileHover={reduce ? undefined : { y: -4 }}
            className="relative flex flex-col rounded-[6px] border border-line bg-surface p-6 sm:p-8 shadow-[0_1px_2px_rgb(var(--ink)/0.05),0_24px_40px_-28px_rgb(var(--ink)/0.35)]"
          >
            {/* folded corner */}
            <span aria-hidden className="absolute right-0 top-0 h-6 w-6 bg-[linear-gradient(225deg,rgb(var(--paper))_50%,rgb(var(--line))_50%)]" />

            <div className="flex items-center justify-between gap-3 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              <span>ACM AutoUI &apos;26 · Adjunct</span>
              <span>{p.track ?? "Paper"}</span>
            </div>

            <h3 className="mt-5 text-[19px] sm:text-[21px] font-semibold leading-snug tracking-[-0.015em] text-ink">{p.title}</h3>

            <div className="mt-5">
              <AuthorDots position={p.position} authors={p.authors} />
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-ink-2">
              <span className="font-medium text-ink">What I did. </span>
              {p.contribution}
            </p>

            <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-7">
              <a
                href={`https://doi.org/${p.doi}`}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper transition-transform duration-200 ease-out active:scale-[0.97]"
              >
                Read the paper
                <ArrowUpRight size={14} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <span className="flex items-center gap-1">
                <span className="hidden sm:inline font-mono text-[11px] text-muted">doi:{p.doi}</span>
                <CopyBibtex text={p.bibtex} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>

    </section>
  );
}
