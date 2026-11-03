"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT, VIEWPORT, revealBlur } from "@/lib/motion";

/** Tiny pixel sprites drawn from character grids (same approach as the portrait). */
function Sprite({ rows, palette, className }: { rows: string[]; palette: Record<string, string>; className?: string }) {
  return (
    <svg viewBox={`0 0 ${rows[0].length} ${rows.length}`} shapeRendering="crispEdges" className={className} aria-hidden>
      {rows.flatMap((r, y) =>
        [...r].map((c, x) => (palette[c] ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} style={{ fill: palette[c] }} /> : null))
      )}
    </svg>
  );
}

const ACCENT = "rgb(var(--accent))";
const MOSS = "rgb(var(--moss))";

// prettier-ignore
const MEDAL = [
  "..RR..BB..",
  "..RR..BB..",
  "...RRBB...",
  "....RB....",
  "...GGGG...",
  "..GGYYGG..",
  ".GGYGGYGG.",
  ".GYGGGGYG.",
  ".GYGGGGYG.",
  ".GGYGGYGG.",
  "..GGYYGG..",
  "...GGGG...",
];
const MEDAL_PAL = { R: ACCENT, B: MOSS, G: "#C9932B", Y: "#F1C75B" };

// prettier-ignore
const CERT = [
  "WWWWWWWWWWWW..",
  "WLLLLLLLLLLW..",
  "WWWWWWWWWWWW..",
  "WLLLLLLLW.....",
  "WWWWWWWWW.....",
  "WLLLLLW..RRR..",
  "WWWWWWW.RRRRR.",
  "WWWWWWW.RRRRR.",
  ".........RRR..",
  ".........B.B..",
  "........B...B.",
];
const CERT_PAL = { W: "rgb(var(--surface))", L: "rgb(var(--line))", R: ACCENT, B: MOSS };

const ITEMS = [
  {
    sprite: <Sprite rows={MEDAL} palette={MEDAL_PAL} className="h-14 w-auto" />,
    title: "Director's List",
    by: "Nanyang Polytechnic · 2019–2021",
    note: "Top 15% of the Information Technology cohort, with distinctions in Network Engineering and UX Design.",
  },
  {
    sprite: <Sprite rows={CERT} palette={CERT_PAL} className="h-12 w-auto drop-shadow-[0_1px_0_rgb(var(--line))]" />,
    title: "Google Data Analytics Professional Certificate",
    by: "Google · 2022",
    note: "Data cleaning, SQL, R and dashboards.",
  },
];

export function RecognitionSection() {
  const reduce = useReducedMotion();
  return (
    <section id="honors" className="w-full max-w-6xl px-5 sm:px-10 lg:px-0 pb-28 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-line pt-10">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          variants={revealBlur(0)}
          className="lg:col-span-4 font-mono text-[12px] uppercase tracking-[0.08em] text-muted"
        >
          Recognition
        </motion.h2>
        <ul className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {ITEMS.map((it, i) => (
            <motion.li
              key={it.title}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 + i * 0.1 }}
              className="group flex gap-5"
            >
              <motion.span
                className="flex h-16 w-14 shrink-0 items-start justify-center"
                whileHover={reduce ? undefined : { rotate: [0, -8, 8, -4, 0], transition: { duration: 0.6 } }}
              >
                {it.sprite}
              </motion.span>
              <span>
                <span className="block text-[17px] font-semibold tracking-[-0.01em] text-ink">{it.title}</span>
                <span className="mt-0.5 block font-mono text-[12px] text-muted">{it.by}</span>
                <span className="mt-2 block text-[15px] leading-relaxed text-ink-2">{it.note}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
