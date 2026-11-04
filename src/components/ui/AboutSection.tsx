"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { PixelPortrait } from "@/components/mascot/PixelPortrait";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/**
 * About + experience as one card (the Sam Ortega pattern): a portrait banner, a short
 * personal story, a plain "where I've studied and worked" list, side projects and stack.
 * Facts carried over from the previous Experience section and project write-ups.
 */

const EMAIL = "ualqarni70@gmail.com";

const HISTORY = [
  { period: "2024 — now", title: "Bachelor of ICT, Software Engineering", org: "Singapore Institute of Technology", note: "Software engineering with a focus on data and distributed systems." },
  { period: "Sep — Nov 2021", title: "Software Engineer Intern", org: "Aktus MU Kreativ", note: "Built an offline-first attendance PWA and a pricing model that raised revenue by 15%." },
  { period: "2019 — 2021", title: "Diploma in Information Technology", org: "Nanyang Polytechnic", note: "Director's List (top 15% of the cohort), with distinctions in Network Engineering and UX Design." },
];

const SIDE = [
  { name: "kafka-telemetry-anomaly-detection", note: "Kafka stream of game telemetry with an Isolation Forest flagging anomalies." },
  { name: "drama-discovery-engine", note: "Recommends anime and K-dramas by theme and trope." },
  { name: "Job-Application-Bot", note: "Fills in internship applications with Selenium." },
];

const STACK = ["TypeScript", "Python", "SQL", "C#", "Next.js", "React", "FastAPI", "PostgreSQL", "Docker", "Playwright"];

const UNMASK = [0.16, 1, 0.3, 1] as const;

// The photo is not in the repo. It is hosted separately (Vercel Blob) and its URL comes from an env var,
// so cloning the repo never gives anyone the file. Without the variable, the pixel-portrait banner shows.
// Local dev: put the file in public/about/ (gitignored) and set NEXT_PUBLIC_ABOUT_PHOTO_URL=/about/uwais.webp in .env.local.
const PHOTO_URL = process.env.NEXT_PUBLIC_ABOUT_PHOTO_URL;
const USE_PHOTO = Boolean(PHOTO_URL);

function PhotoBanner() {
  const reduce = useReducedMotion();
  return (
    <div
      className="relative h-[460px] sm:h-[600px] overflow-hidden select-none [-webkit-touch-callout:none]"
      // Discourage casual saving. Anything shown on screen can still be screenshotted.
      onContextMenu={(e) => e.preventDefault()}
    >
      <motion.div
        className="absolute inset-0"
        // settles from a slight zoom as the card opens
        initial={reduce ? false : { scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.6, ease: UNMASK }}
      >
        <Image
          src={PHOTO_URL!}
          alt="Uwais standing in front of a wall covered in colourful graffiti, wearing a black cap, glasses and a black T-shirt"
          fill
          sizes="(min-width: 700px) 672px, 100vw"
          quality={85}
          draggable={false}
          className="object-cover object-[52%_30%] pointer-events-none"
        />
      </motion.div>
      {/* Transparent shield so right-click and long-press land on this div, not the image. */}
      <div aria-hidden className="absolute inset-0" />
    </div>
  );
}

function PixelBanner() {
  const reduce = useReducedMotion();
  return (
    <div className="group relative flex h-[240px] sm:h-[300px] items-end justify-center overflow-hidden bg-accent">
      <div aria-hidden className="absolute bottom-[-30%] left-1/2 h-[90%] w-[70%] -translate-x-1/2 rounded-full bg-white/15 blur-3xl" />
      <motion.div
        initial={reduce ? false : { y: 60 }}
        whileInView={{ y: 0 }}
        viewport={VIEWPORT}
        transition={{ type: "spring", stiffness: 110, damping: 16, delay: 0.5 }}
        className="relative w-[190px] sm:w-[230px] transition-transform duration-500 ease-out group-hover:-translate-y-2"
      >
        <PixelPortrait className="h-auto w-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]" />
      </motion.div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <h3 className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">{children}</h3>;
}

export function AboutSection() {
  const reduce = useReducedMotion();
  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14, filter: "blur(6px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          viewport: VIEWPORT,
          transition: { duration: 0.8, ease: EASE_OUT, delay },
        };

  return (
    <section id="about" className="w-full max-w-6xl px-5 sm:px-10 lg:px-0 pt-28 pb-24 scroll-mt-20">
      <motion.article
        initial={reduce ? false : { clipPath: "inset(10% 6% 0% 6% round 32px)", y: 48, opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 32px)", y: 0, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.3, ease: UNMASK }}
        className="mx-auto max-w-2xl overflow-hidden rounded-[32px] border border-line bg-surface"
      >
        {USE_PHOTO ? <PhotoBanner /> : <PixelBanner />}

        <div className={`relative bg-surface px-6 py-9 sm:px-10 sm:py-11 ${USE_PHOTO ? "-mt-8 rounded-t-[28px]" : ""}`}>
          <motion.p {...rise(0.2)} className="font-mono text-[12px] uppercase tracking-[0.08em] text-accent">
            About
          </motion.p>
          <motion.h2 {...rise(0.28)} className="mt-3 text-[2rem] leading-[1.08] sm:text-[2.5rem] font-semibold tracking-[-0.035em] text-ink">
            I build software people rely on, and I check that it works.
          </motion.h2>

          <motion.div {...rise(0.36)} className="mt-6 space-y-4 text-[16px] leading-relaxed text-ink-2">
            <p>
              I&apos;m studying Software Engineering at SIT in Singapore. Most of my work sits where software meets data: a
              members platform for a Singapore NGO, a layout engine for carbon reporting, search across hour-long videos,
              and AI that runs offline on a phone.
            </p>
            <p>
              Before SIT I did a Diploma in IT at Nanyang Polytechnic and interned at Aktus MU Kreativ. Alongside my
              degree I co-authored two papers at ACM AutoUI &apos;26, on takeover requests in automated vehicles and
              low-cost driver supervision.
            </p>
          </motion.div>

          <motion.div {...rise(0.44)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[15px] font-medium text-paper transition-transform duration-200 ease-out active:scale-[0.98]"
            >
              <Mail size={16} /> Email me
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-line px-5 py-3 text-[15px] font-medium text-ink transition-colors duration-200 hover:bg-ink/[0.04]"
            >
              Résumé <ArrowUpRight size={15} />
            </a>
          </motion.div>

          {/* Where I've studied and worked */}
          <div className="mt-12">
            <Label>Where I&apos;ve studied and worked</Label>
            <ol className="mt-3 divide-y divide-line border-t border-line">
              {HISTORY.map((h, i) => (
                <motion.li key={h.org} {...rise(0.05 * i)} className="py-5">
                  <p className="font-mono text-[12px] text-muted">{h.period}</p>
                  <p className="mt-1 text-[17px] font-medium tracking-[-0.01em] text-ink">{h.title}</p>
                  <p className="text-[14px] text-muted">{h.org}</p>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{h.note}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Side projects */}
          <div className="mt-10">
            <Label>On the side</Label>
            <ul className="mt-3 divide-y divide-line border-t border-line">
              {SIDE.map((r) => (
                <li key={r.name}>
                  <a href={`https://github.com/queWiz/${r.name}`} target="_blank" rel="noreferrer" className="group flex items-start gap-3 py-4">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-mono text-[13px] text-ink transition-colors duration-200 group-hover:text-accent">{r.name}</span>
                      <span className="mt-1 block text-[14px] leading-relaxed text-ink-2">{r.note}</span>
                    </span>
                    <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tools I use">
            {STACK.map((t, i) => (
              <motion.li
                key={t}
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={VIEWPORT}
                transition={{ type: "spring", stiffness: 380, damping: 24, delay: i * 0.03 }}
                className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-medium text-ink"
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.article>
    </section>
  );
}
