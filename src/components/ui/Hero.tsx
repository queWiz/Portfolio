"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { HeroPixelBaseline } from "@/components/ui/HeroPixelStage";
import { revealBlur } from "@/lib/motion";
import { BadgeMascot } from "@/components/mascot/Mascots";


const EMAIL = "ualqarni70@gmail.com";

/** Timeline for the hero cascade (seconds). Nav enters at 0. */
const T = { pill: 0.1, heading: 0.22, body: 0.75, actions: 0.88, proof: 1.0 };

export function Hero() {
  const reduce = useReducedMotion();
  const item = (delay: number) =>
    reduce
      ? {}
      : {
          initial: "hidden" as const,
          animate: "show" as const,
          variants: revealBlur(delay),
        };

  return (
    <section
      id="home"
      className="relative w-full min-h-[92svh] flex flex-col pt-28 sm:pt-32 pb-8 px-5 sm:px-10 lg:px-16 isolate"
    >
      {/* One soft warm glow behind the badge; the paper grain does the rest. */}
      <div
        aria-hidden
        className="absolute right-[8%] top-[22%] -z-10 h-[420px] w-[520px] rounded-full bg-accent/[0.045] dark:bg-accent/[0.03] blur-3xl pointer-events-none"
      />

      <div className="mx-auto w-full max-w-6xl flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        <div className="lg:col-span-8">
          <motion.p
            {...item(T.pill)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 pl-2.5 pr-3 py-1 text-[13px] text-ink-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
            <span className="font-medium text-ink">Uwais Alqarni</span>
            <span className="h-3 w-px bg-line" aria-hidden />
            <span>Singapore</span>
          </motion.p>

          <RevealText
            as="h1"
            trigger="mount"
            delay={T.heading}
            className="mt-6 text-[2.5rem] leading-[1.05] sm:text-[3.25rem] lg:text-[3.5rem] font-semibold tracking-[-0.035em] text-ink"
            segments={[
              { text: "Software & data engineer," },
              { text: "building for real clients and real research.", className: "text-muted", breakBefore: true },
            ]}
          />

          <motion.p
            {...item(T.body)}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-ink-2"
          >
            I study Software Engineering at SIT. I&apos;ve shipped platforms for Singapore clients,
            built AI that runs offline in the browser, and co-authored two papers at ACM&nbsp;AutoUI&nbsp;&apos;26.
          </motion.p>

          <motion.div {...item(T.actions)} className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-[transform,background-color] duration-300 ease-out hover:bg-accent-strong active:scale-[0.98]"
            >
              See my work
              <ArrowDown size={15} className="transition-transform duration-300 ease-out group-hover:translate-y-0.5" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-1 text-sm font-medium text-ink"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px]">
                Email me
              </span>
              <ArrowUpRight size={15} className="text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.ul
            {...item(T.proof)}
            className="mt-12 flex flex-col sm:flex-row sm:items-center gap-x-5 gap-y-1.5 text-[13px] text-muted"
          >
            <li className="flex items-center gap-2 text-moss font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
              Open to SWE internships
            </li>
            <li aria-hidden className="hidden sm:block h-3 w-px bg-line" />
            <li>2 ACM papers</li>
            <li aria-hidden className="hidden sm:block h-3 w-px bg-line" />
            <li>Director&apos;s List, NYP</li>
          </motion.ul>
        </div>

        <div className="lg:col-span-4">
          <BadgeMascot />
        </div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mx-auto w-full max-w-6xl mt-6"
      >
        <HeroPixelBaseline />
      </motion.div>
    </section>
  );
}
