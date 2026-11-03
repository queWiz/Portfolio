"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { HeroPixelBaseline } from "@/components/ui/HeroPixelStage";
import { revealBlur } from "@/lib/motion";
import { BadgeMascot } from "@/components/mascot/Mascots";

const EMAIL = "ualqarni70@gmail.com";
const NAME = "Uwais Alqarni";

/** Timeline for the hero cascade (seconds). Nav enters at 0. */
const T = { pill: 0.1, name: 0.2, lede: 0.45, body: 0.7, actions: 0.82, proof: 0.94 };

// PARKED DECISION (revisit with the palette at the end): signature (default) vs pixel nameplate.
// Preview the pixel version with ?name=pixel. Remove the loser and its font when decided.
type NameStyle = "pixel" | "signature";
function useNamePreview(): NameStyle {
  const [n, setN] = useState<NameStyle>("signature");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("name") === "pixel") requestAnimationFrame(() => setN("pixel"));
  }, []);
  return n;
}

/* ---------- B. Pixel nameplate that decodes like the terminal ---------- */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=?/<>01";
function PixelName() {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? NAME : NAME.replace(/\S/g, " "));
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const total = 26; // frames until every letter has locked in
    const id = setInterval(() => {
      frame++;
      setShown(
        [...NAME]
          .map((ch, i) => {
            if (ch === " ") return " ";
            const lockAt = 4 + Math.floor((i / NAME.length) * (total - 6));
            if (frame >= lockAt) return ch;
            return frame > i * 0.6 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : " ";
          })
          .join("")
      );
      if (frame >= total) clearInterval(id);
    }, 45);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <h1 aria-label={NAME} className="mt-6 font-pixel text-[3.2rem] leading-none sm:text-[4.4rem] lg:text-[5.2rem] text-ink whitespace-pre">
      <span aria-hidden>{shown}</span>
      <span aria-hidden className="ml-2 inline-block h-[0.78em] w-[0.12em] translate-y-[0.06em] bg-accent animate-[blink_1.1s_steps(1)_infinite]" />
    </h1>
  );
}

/* ---------- C. Signature, written on left to right ---------- */
function SignatureName() {
  const reduce = useReducedMotion();
  return (
    <h1 aria-label={NAME} className="mt-4 -mb-2">
      <motion.span
        aria-hidden
        className="inline-block -rotate-3 font-signature text-[4.2rem] leading-[1.25] sm:text-[5.4rem] lg:text-[6.2rem] text-accent pr-6"
        initial={reduce ? false : { clipPath: "inset(-20% 100% -20% 0)" }}
        animate={{ clipPath: "inset(-20% 0% -20% 0)" }}
        transition={{ duration: 1.8, ease: [0.45, 0, 0.2, 1], delay: T.name }}
      >
        {NAME}
      </motion.span>
    </h1>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const nameStyle = useNamePreview();
  const item = (delay: number) =>
    reduce ? {} : { initial: "hidden" as const, animate: "show" as const, variants: revealBlur(delay) };

  return (
    <section id="home" className="relative w-full min-h-[92svh] flex flex-col pt-28 sm:pt-32 pb-8 px-5 sm:px-10 lg:px-16 isolate">
      <div
        aria-hidden
        className="absolute right-[8%] top-[18%] -z-10 h-[420px] w-[520px] rounded-full bg-accent/[0.045] dark:bg-accent/[0.03] blur-3xl pointer-events-none"
      />

      <div className="mx-auto w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        <div className="lg:col-span-7">
          <motion.p
            {...item(T.pill)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 pl-2.5 pr-3 py-1 text-[13px] text-ink-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
            <span className="font-medium text-ink">Open to SWE internships</span>
            <span className="h-3 w-px bg-line" aria-hidden />
            <span>Singapore</span>
          </motion.p>

          {nameStyle === "pixel" ? <PixelName /> : <SignatureName />}
              <RevealText
                as="p"
                trigger="mount"
                delay={T.lede}
                className="mt-5 text-[1.6rem] leading-[1.15] sm:text-[2rem] lg:text-[2.25rem] font-semibold tracking-[-0.03em] text-ink"
                segments={[
                  { text: "Software & data engineer," },
                  { text: "building for real clients and real research.", className: "text-muted" },
                ]}
              />

          <motion.p {...item(T.body)} className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-ink-2">
            I study Software Engineering at SIT. I&apos;ve shipped platforms for Singapore clients, built AI that runs
            offline in the browser, and co-authored two papers at ACM&nbsp;AutoUI&nbsp;&apos;26.
          </motion.p>

          <motion.div {...item(T.actions)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-[transform,background-color] duration-300 ease-out hover:bg-accent-strong active:scale-[0.98]"
            >
              See my work
              <ArrowDown size={15} className="transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            </a>
            <a href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-1 text-sm font-medium text-ink">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
                Email me
              </span>
              <ArrowUpRight size={15} className="text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.ul {...item(T.proof)} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] text-muted">
            <li>2 papers at ACM AutoUI &apos;26</li>
            <li aria-hidden className="h-3 w-px bg-line" />
            <li>Director&apos;s List, NYP</li>
          </motion.ul>
        </div>

        <div className="lg:col-span-5">
          <BadgeMascot />
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mx-auto w-full max-w-6xl mt-6"
      >
        <HeroPixelBaseline />
      </motion.div>
    </section>
  );
}
