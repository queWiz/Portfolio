"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Check, Play, Search, Shuffle } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import type { ProjectId } from "./data";

/**
 * Product-style UI mockups (Saro-like): calm cards, believable data, one interaction each.
 * Everything uses theme tokens, so they follow light/dark automatically.
 */

const SPRING = { type: "spring", stiffness: 380, damping: 32 } as const;

function Window({ title, chip, children }: { title: string; chip?: ReactNode; children: ReactNode }) {
  return (
    <div className="w-full rounded-2xl border border-line bg-surface shadow-[0_1px_2px_rgb(var(--ink)/0.04),0_16px_40px_-20px_rgb(var(--ink)/0.25)] overflow-hidden text-ink">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex gap-1" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-line" />
            <i className="h-2 w-2 rounded-full bg-line" />
            <i className="h-2 w-2 rounded-full bg-line" />
          </span>
          <span className="truncate text-[12px] font-medium text-ink-2">{title}</span>
        </div>
        {chip}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function Chip({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "signal" | "accent" }) {
  const tones = {
    muted: "bg-ink/[0.05] text-ink-2",
    signal: "bg-signal/[0.12] text-signal",
    accent: "bg-accent/10 text-accent",
  };
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

function ActionButton({ onClick, children, disabled }: { onClick: () => void; children: ReactNode; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[12px] font-medium text-paper transition-[transform,opacity] duration-200 ease-out hover:opacity-90 active:scale-[0.97] disabled:opacity-60"
    >
      {children}
    </button>
  );
}

// ------------------------------------------------------------------
// Pergas: member directory with NRIC masking and an admin/member view
// ------------------------------------------------------------------
function PergasMock() {
  const [view, setView] = useState<"member" | "admin">("admin");
  const rows = [
    { name: "Member 0142", nric: "S****345Z", tier: "Gold" },
    { name: "Member 0388", nric: "T****912E", tier: "Ordinary" },
    { name: "Member 0517", nric: "S****192B", tier: "Life" },
  ];
  return (
    <Window title="Members · Admin portal" chip={<Chip tone="signal"><Check size={11} /> 20/20 tests</Chip>}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full bg-ink/[0.05] p-0.5 text-[12px]" role="tablist" aria-label="Portal view">
          {(["admin", "member"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className="relative whitespace-nowrap rounded-full px-3 py-1 capitalize text-ink-2 aria-selected:text-ink"
            >
              {view === v && <motion.span layoutId="pergas-view" transition={SPRING} className="absolute inset-0 -z-0 rounded-full bg-surface shadow-sm" />}
              <span className="relative">{v}</span>
            </button>
          ))}
        </div>
        <span className="hidden sm:inline text-[11px] text-muted">NRIC masked on server</span>
      </div>
      <ul className="divide-y divide-line rounded-xl border border-line">
        {rows.map((r, i) => (
          <li key={r.name} className="flex items-center justify-between gap-3 px-3 py-2.5 text-[13px]">
            <div className="min-w-0">
              <p className="truncate font-medium">{view === "admin" || i === 0 ? r.name : "Hidden member"}</p>
              <p className="font-mono text-[11px] text-muted">{r.nric}</p>
            </div>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={view}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                {view === "admin" ? <Chip>{r.tier}</Chip> : i === 0 ? <Chip tone="accent">You</Chip> : <Chip>Hidden</Chip>}
              </motion.span>
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </Window>
  );
}

// ------------------------------------------------------------------
// Clean Brilliant: dashboard widgets that reorder and "save" the layout
// ------------------------------------------------------------------
function CleanBrilliantMock() {
  const initial = [
    { id: "w1", title: "Scope 1 & 2 emissions", kpi: "142.8 tCO₂e", wide: true },
    { id: "w2", title: "Grid intensity", kpi: "0.408 kg/kWh", wide: false },
    { id: "w3", title: "Reporting status", kpi: "On track", wide: false },
  ];
  const [widgets, setWidgets] = useState(initial);
  const [saves, setSaves] = useState(14);
  const shuffle = () => {
    setWidgets((w) => {
      const next = [w[1], w[2], w[0]];
      // the first widget always spans both columns
      return next.map((x, i) => ({ ...x, wide: i === 0 }));
    });
    setSaves((s) => s + 1);
  };
  return (
    <Window title="Dashboard · Edit layout" chip={<ActionButton onClick={shuffle}><Shuffle size={12} /> Rearrange</ActionButton>}>
      <LayoutGroup>
        <div className="grid grid-cols-2 gap-2">
          {widgets.map((w) => (
            <motion.div
              layout
              key={w.id}
              transition={SPRING}
              className={`${w.wide ? "col-span-2" : ""} rounded-xl border border-line bg-paper/60 p-3`}
            >
              <motion.p layout="position" className="text-[11px] text-muted">{w.title}</motion.p>
              <motion.p layout="position" className="mt-1 text-lg font-semibold tracking-tight">{w.kpi}</motion.p>
            </motion.div>
          ))}
        </div>
      </LayoutGroup>
      <div className="mt-3 flex items-center justify-between gap-2 rounded-lg bg-ink/[0.04] px-3 py-2 font-mono text-[11px] text-ink-2">
        <span className="truncate">layout = {JSON.stringify(widgets.map((w) => w.id))}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span key={saves} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="shrink-0 text-signal">
            saved #{saves}
          </motion.span>
        </AnimatePresence>
      </div>
    </Window>
  );
}

// ------------------------------------------------------------------
// Codex: ask a question, jump to a timestamp in a long video
// ------------------------------------------------------------------
function CodexMock() {
  const queries = [
    { q: "Where does the speaker explain the database schema?", t: "00:14:32", at: 24, score: "0.94" },
    { q: "What caused the timeout issue in the demo?", t: "00:38:15", at: 63, score: "0.92" },
    { q: "Show me the slide with the cost breakdown", t: "00:51:07", at: 85, score: "0.89" },
  ];
  const [i, setI] = useState(0);
  const cur = queries[i];
  return (
    <Window title="Lecture recording · 58 min" chip={<Chip>pgvector</Chip>}>
      <button
        type="button"
        onClick={() => setI((v) => (v + 1) % queries.length)}
        className="group flex w-full items-center gap-2 rounded-full border border-line bg-paper/60 px-3 py-2 text-left text-[13px] transition-colors hover:border-ink/20"
        aria-label="Try another question"
      >
        <Search size={14} className="shrink-0 text-muted" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={i} initial={{ opacity: 0, filter: "blur(4px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(4px)" }} transition={{ duration: 0.25 }} className="truncate">
            {cur.q}
          </motion.span>
        </AnimatePresence>
        <span className="ml-auto shrink-0 text-[11px] text-muted group-hover:text-ink-2">next ↻</span>
      </button>

      <div className="mt-4 rounded-xl border border-line p-3">
        <div className="relative h-10 overflow-hidden rounded-md bg-[repeating-linear-gradient(90deg,rgb(var(--ink)/0.07)_0_2px,transparent_2px_6px)]">
          <motion.div
            className="absolute inset-y-0 w-[14%] rounded-md bg-accent/25 ring-1 ring-accent/60"
            animate={{ left: `${cur.at - 7}%` }}
            transition={{ type: "spring", stiffness: 160, damping: 20 }}
          />
          <motion.div className="absolute inset-y-0 w-0.5 bg-accent" animate={{ left: `${cur.at}%` }} transition={{ type: "spring", stiffness: 160, damping: 20 }} />
        </div>
        <div className="mt-2 flex items-center justify-between font-mono text-[11px] text-muted">
          <span>00:00</span>
          <span>58:12</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-[13px]">
        <span className="flex items-center gap-2">
          <Play size={13} className="text-accent" />
          Jump to <span className="font-mono font-medium">{cur.t}</span>
        </span>
        <Chip tone="signal">match {cur.score}</Chip>
      </div>
    </Window>
  );
}

// ------------------------------------------------------------------
// BidForGood: place a bid, watch it commit in order under a row lock
// ------------------------------------------------------------------
function BidForGoodMock() {
  const [bid, setBid] = useState(450);
  const [log, setLog] = useState([
    { who: "Bidder 18", amt: 450 },
    { who: "Bidder 07", amt: 425 },
  ]);
  const place = () => {
    const next = bid + 25;
    setBid(next);
    setLog((l) => [{ who: "You", amt: next }, ...l].slice(0, 3));
  };
  return (
    <Window title="Lot 104 · Signed football" chip={<Chip tone="signal">Row locked</Chip>}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] text-muted">Current bid</p>
          <div className="relative h-9 overflow-hidden text-3xl font-semibold tracking-tight tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={bid} className="block" initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={SPRING}>
                S${bid}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
        <ActionButton onClick={place}>Bid S${bid + 25}</ActionButton>
      </div>
      {/* Fixed height: exactly three rows, so rapid clicks can never grow the card. */}
      <ul className="mt-4 h-[120px] space-y-1.5 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {log.map((e, idx) => (
            <motion.li
              key={`${e.who}-${e.amt}`}
              layout
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.12 } }}
              transition={SPRING}
              className="flex items-center justify-between rounded-lg bg-paper/60 px-3 py-2 text-[13px]"
            >
              <span className={e.who === "You" ? "font-medium" : "text-ink-2"}>{e.who}</span>
              <span className="flex items-center gap-2 font-mono text-[12px] text-muted">
                S${e.amt}
                {idx === 0 && <Check size={12} className="text-signal" />}
              </span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <p className="mt-3 text-[11px] text-muted">One bid commits at a time; the other waits, then re-reads the price.</p>
    </Window>
  );
}

export function ProjectMockup({ id }: { id: ProjectId }) {
  switch (id) {
    case "pergas":
      return <PergasMock />;
    case "cleanbrilliant":
      return <CleanBrilliantMock />;
    case "codex":
      return <CodexMock />;
    case "bidforgood":
      return <BidForGoodMock />;
    default:
      // Tabayyun leads with a real screenshot; its ingredient scanner isn't demo-ready yet.
      return null;
  }
}
