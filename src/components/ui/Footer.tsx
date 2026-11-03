"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { RevealText } from "@/components/motion/RevealText";
import { EASE_OUT, VIEWPORT, revealBlur } from "@/lib/motion";

const EMAIL = "ualqarni70@gmail.com";

const LINKS = [
  { label: "GitHub", sub: "@queWiz", href: "https://github.com/queWiz" },
  { label: "GitHub", sub: "@ooWise", href: "https://github.com/ooWise" },
  { label: "LinkedIn", sub: "ualqarni", href: "https://linkedin.com/in/ualqarni" },
  { label: "ORCID", sub: "0009-0006-6833-4965", href: "https://orcid.org/0009-0006-6833-4965" },
  { label: "Résumé", sub: "PDF", href: "/Resume.pdf" },
];

function useSgt() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-SG", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function Footer() {
  const reduce = useReducedMotion();
  const time = useSgt();
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <footer id="contact" className="w-full border-t border-line">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-10 lg:px-0 pt-24 pb-10">
        <motion.p initial="hidden" whileInView="show" viewport={VIEWPORT} variants={revealBlur(0)} className="font-mono text-[12px] uppercase tracking-[0.08em] text-muted">
          Contact
        </motion.p>
        <RevealText
          as="h2"
          className="mt-3 max-w-3xl text-[2.75rem] leading-[1] sm:text-[4.5rem] font-semibold tracking-[-0.045em] text-ink"
          segments={[{ text: "Have a role in mind?" }, { text: "Let's talk.", className: "text-muted" }]}
        />
        <motion.p initial="hidden" whileInView="show" viewport={VIEWPORT} variants={revealBlur(0.25)} className="mt-5 max-w-lg text-[16px] leading-relaxed text-ink-2">
          I&apos;m looking for software engineering internships. Email is the quickest way to reach me; I usually reply within a day.
        </motion.p>

        {/* Email: big link + copy */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-3 text-[1.5rem] sm:text-[2.25rem] font-semibold tracking-[-0.03em] text-ink"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:0%_2px] group-hover:bg-right-bottom">
              {EMAIL}
            </span>
            <ArrowUpRight className="h-6 w-6 sm:h-8 sm:w-8 text-accent transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy email address"
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] text-ink-2 transition-colors duration-200 hover:bg-ink/[0.04] hover:text-ink"
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
                {copied ? <Check size={14} className="text-moss" /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </motion.span>
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Links */}
        <ul className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-line">
          {LINKS.map((l, i) => (
            <motion.li
              key={l.href}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 * i }}
              className="border-b border-line lg:border-b-0"
            >
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-2 py-5 pr-4"
              >
                <span>
                  <span className="block text-[15px] font-medium text-ink transition-colors duration-200 group-hover:text-accent">{l.label}</span>
                  <span className="mt-0.5 block truncate font-mono text-[11px] text-muted">{l.sub}</span>
                </span>
                <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between text-[13px] text-muted">
          <p>
            © {new Date().getFullYear()} Uwais Alqarni · Built with Next.js and Tailwind
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 font-mono text-[12px] tabular-nums">
              <span className="h-1.5 w-1.5 rounded-full bg-moss" aria-hidden />
              Singapore, {time || "--:--"}
            </span>
            <a href="#home" className="group inline-flex items-center gap-1 text-ink-2 hover:text-ink">
              Back to top
              <ArrowUp size={14} className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
