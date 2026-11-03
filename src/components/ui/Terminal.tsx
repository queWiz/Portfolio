"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { EASE_OUT, VIEWPORT, revealBlur } from "@/lib/motion";

/**
 * A small, honest shell about Uwais. Real shell manners: ↑/↓ history, Tab completion,
 * Ctrl+L to clear, clickable links, and a few commands that act on the page (cd, theme, resume).
 */

type Kind = "cmd" | "out" | "err" | "sys";
type Line = { id: number; kind: Kind; text: string; order: number };

const EMAIL = "ualqarni70@gmail.com";

const SECTIONS: Record<string, string> = {
  home: "home",
  work: "projects",
  "how-i-work": "approach",
  experience: "experience",
  research: "publications",
  honors: "honors",
};

const STATIC: Record<string, string> = {
  help: `Commands:
  about        who I am, in four lines
  projects     the five things I've built
  skills       what I work with
  research     papers and DOIs
  contact      how to reach me
  resume       open my résumé (PDF)
  ls / cd      list and jump to sections of this page
  theme        switch light/dark
  whoami, date, echo, clear
Tip: ↑/↓ for history, Tab to complete.`,
  about: `Uwais Alqarni, software & data engineer in Singapore.
Studying Software Engineering at SIT (Bachelor of ICT).
Diploma in IT from Nanyang Polytechnic, Director's List.
Two papers at ACM AutoUI '26. Open to SWE internships.`,
  projects: `pergas          members & admin portal for a Singapore NGO
cleanbrilliant  dashboard layout engine for carbon reporting (C#/.NET)
codex           ask questions of long videos, get timestamps (RAG)
bidforgood      charity auction that stays correct under concurrent bids
tabayyun        on-device food recognition, works offline (WASM)
Full write-ups: cd work`,
  skills: `languages  TypeScript, Python, SQL, C#, Java, C++
web        Next.js, React, Node.js, ASP.NET Core, FastAPI
data       PostgreSQL (Supabase, pgvector), Kafka, AWS S3, Docker
ai         YOLOv8, Tesseract OCR, WebAssembly, Gemini API
testing    Playwright, GitHub Actions`,
  research: `ACM AutoUI '26 (Adjunct), Gothenburg
1. TakeoverBench: benchmarking takeover requests in automated vehicles
   2nd of 7 authors. Built the Flask backend and simulation baseline.
   https://doi.org/10.1145/3828158.3833210
2. Low-cost driver supervision with a smartphone interface
   3rd of 6 authors. YOLOv8 model for driver inattention.
   https://doi.org/10.1145/3828158.3834806
ORCID https://orcid.org/0009-0006-6833-4965`,
  contact: `email     ${EMAIL}
github    https://github.com/queWiz
          https://github.com/ooWise
linkedin  https://linkedin.com/in/ualqarni
I usually reply within a day (SGT, UTC+8).`,
  ls: `work/  how-i-work/  experience/  research/  honors/  resume.pdf`,
  whoami: `You're a visitor. I'm Uwais. Nice to meet you.`,
};

const COMMAND_NAMES = [...Object.keys(STATIC), "resume", "cd", "theme", "date", "echo", "clear", "sudo"].sort();
const QUICK = ["about", "projects", "skills", "research", "contact", "resume"];

let nextId = 1;
const toLines = (kind: Kind, text: string): Line[] =>
  text.split("\n").map((t, i) => ({ id: nextId++, kind, text: t, order: i }));

/** Turn URLs and the email address into links. */
function linkify(text: string): ReactNode[] {
  const parts = text.split(/(https?:\/\/[^\s]+|[\w.+-]+@[\w-]+\.[\w.]+)/g);
  return parts.map((p, i) => {
    if (/^https?:\/\//.test(p))
      return (
        <a key={i} href={p} target="_blank" rel="noreferrer" className="underline decoration-white/25 underline-offset-2 hover:decoration-current">
          {p.replace(/^https?:\/\//, "")}
        </a>
      );
    if (/@/.test(p) && /^[\w.+-]+@/.test(p))
      return (
        <a key={i} href={`mailto:${p}`} className="underline decoration-white/25 underline-offset-2 hover:decoration-current">
          {p}
        </a>
      );
    return <span key={i}>{p}</span>;
  });
}

function Prompt() {
  return (
    <span aria-hidden className="select-none">
      <span className="text-[#9FCDB2]">uwais@sg</span> <span className="text-[#E8A06A]">~</span> <span className="text-white/50">%</span>{" "}
    </span>
  );
}

export function InteractiveTerminal() {
  const reduce = useReducedMotion();
  const { theme, toggleTheme } = useTheme();
  const [lines, setLines] = useState<Line[]>(() => [
    ...toLines("sys", "Welcome. This is a small shell about me."),
    ...toLines("sys", "Type help, or tap a command below."),
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const out = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const shell = useRef<HTMLDivElement>(null);
  const inView = useInView(shell, { once: true, amount: 0.6 });
  const touched = useRef(false);
  const demoing = useRef(false);
  // The visitor takes over: stop the demo and drop its half-typed text.
  const takeOver = () => {
    touched.current = true;
    if (demoing.current) { demoing.current = false; setInput(""); }
  };

  // "Last login" line uses the visitor's clock, so add it after mount (no hydration mismatch).
  useEffect(() => {
    const stamp = new Intl.DateTimeFormat("en-SG", {
      weekday: "short", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Singapore",
    }).format(new Date());
    requestAnimationFrame(() => setLines((l) => [...toLines("sys", `Last login: ${stamp} SGT`), ...l]));
  }, []);

  useEffect(() => {
    const el = out.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [lines, reduce]);

  const run = useCallback(
    (raw: string) => {
      const cmdLine = raw.trim();
      if (!cmdLine) return;
      setHistory((h) => [...h, cmdLine]);
      setCursor(null);
      const [cmd, ...args] = cmdLine.split(/\s+/);
      const c = cmd.toLowerCase();
      const echo = toLines("cmd", cmdLine);

      if (c === "clear") return setLines([]);

      let reply: Line[];
      if (STATIC[c]) reply = toLines("out", STATIC[c]);
      else if (c === "resume") {
        window.open("/Resume.pdf", "_blank", "noopener");
        reply = toLines("out", "Opening resume.pdf in a new tab…");
      } else if (c === "cd") {
        const target = (args[0] ?? "").replace(/\/$/, "").toLowerCase();
        const id = SECTIONS[target || "home"];
        if (id && document.getElementById(id)) {
          document.getElementById(id)!.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
          reply = toLines("out", `→ ${target || "home"}`);
        } else reply = toLines("err", `cd: no such section: ${target}. Try ls.`);
      } else if (c === "theme") {
        toggleTheme();
        reply = toLines("out", `Switched to ${theme === "light" ? "dark" : "light"} mode.`);
      } else if (c === "date") {
        reply = toLines("out", new Intl.DateTimeFormat("en-SG", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Singapore" }).format(new Date()) + " (SGT)");
      } else if (c === "echo") {
        reply = toLines("out", args.join(" "));
      } else if (c === "sudo") {
        reply = toLines("err", `uwais is not in the sudoers file. This incident will be reported.\n(Kidding. Email ${EMAIL} instead.)`);
      } else {
        reply = toLines("err", `command not found: ${cmd}. Type help.`);
      }
      setLines((l) => [...l, ...echo, ...reply]);
    },
    [reduce, theme, toggleTheme]
  );

  // First time the shell is on screen, type "about" like a person would, then run it.
  // Skipped if the visitor already started typing.
  useEffect(() => {
    if (!inView || touched.current) return;
    const demo = "about";
    if (reduce) { requestAnimationFrame(() => run(demo)); return; }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (touched.current) return;
      demoing.current = true;
      i++;
      setInput(demo.slice(0, i));
      if (i < demo.length) timer = setTimeout(step, 90 + Math.random() * 60);
      else timer = setTimeout(() => { demoing.current = false; if (!touched.current) { run(demo); setInput(""); } }, 380);
    };
    timer = setTimeout(step, 600);
    return () => clearTimeout(timer);
  }, [inView, reduce, run]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    takeOver();
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) { setCursor(null); setInput(""); }
      else { setCursor(next); setInput(history[next]); }
    } else if (e.key === "Tab") {
      const [word, ...rest] = input.split(" ");
      if (rest.length) {
        // complete section names after cd
        const part = rest.join(" ");
        const hit = Object.keys(SECTIONS).filter((s) => s.startsWith(part));
        if (word === "cd" && hit.length === 1) { e.preventDefault(); setInput(`cd ${hit[0]}`); }
        return;
      }
      const hits = COMMAND_NAMES.filter((n) => n.startsWith(word.toLowerCase()));
      if (word && hits.length) {
        e.preventDefault();
        if (hits.length === 1) setInput(hits[0] + " ");
        else setLines((l) => [...l, ...toLines("sys", hits.join("  "))]);
      }
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const color: Record<Kind, string> = {
    cmd: "text-white",
    out: "text-white/75",
    err: "text-[#F0A27A]",
    sys: "text-white/45",
  };

  return (
    <div
      ref={shell}
      className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 focus-within:border-black/25 dark:focus-within:border-white/25 transition-colors duration-300 bg-console font-mono shadow-[0_2px_4px_rgb(0_0_0/0.08),0_30px_60px_-30px_rgb(0_0_0/0.55)]"
      onClick={() => {
        // Clicking anywhere focuses the prompt, unless the user is selecting text or clicked a link.
        if (!window.getSelection()?.toString()) field.current?.focus({ preventScroll: true });
      }}
    >
      {/* Title bar */}
      <div className="relative flex items-center border-b border-console-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <i className="h-3 w-3 rounded-full bg-white/15" />
          <i className="h-3 w-3 rounded-full bg-white/15" />
          <i className="h-3 w-3 rounded-full bg-white/15" />
        </span>
        <span className="absolute left-1/2 -translate-x-1/2 text-[12px] text-white/50">uwais — zsh — 80×24</span>
      </div>

      {/* Output */}
      <div ref={out} role="log" aria-live="polite" aria-label="Terminal output" className="h-[340px] sm:h-[380px] overflow-y-auto px-5 py-4 text-[13px] sm:text-[14px] leading-relaxed">
        {lines.map((l) => (
          <motion.div
            key={l.id}
            initial={reduce ? false : { opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: EASE_OUT, delay: Math.min(l.order, 12) * 0.025 }}
            className={`whitespace-pre-wrap break-words ${color[l.kind]}`}
          >
            {l.kind === "cmd" && <Prompt />}
            {l.kind === "cmd" ? l.text : linkify(l.text)}
          </motion.div>
        ))}

        {/* Live prompt */}
        <label className="mt-1 flex items-center gap-[1ch]">
          <Prompt />
          <span className="sr-only">Command</span>
          <input
            ref={field}
            value={input}
            onFocus={takeOver}
            onChange={(e) => { touched.current = true; setInput(e.target.value); }}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="none"
            className="min-w-0 flex-1 bg-transparent text-white caret-[#E8A06A] outline-none focus-visible:outline-none placeholder:text-white/25"
            placeholder="help"
          />
        </label>
      </div>

      {/* Quick commands */}
      <div className="flex flex-wrap items-center gap-1.5 border-t border-console-line px-4 py-3">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              takeOver();
              setInput("");
              run(q);
            }}
            className="rounded-md border border-white/10 px-2.5 py-1 text-[12px] text-white/70 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:text-white"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function TerminalSection() {
  return (
    <section id="terminal" className="w-full max-w-6xl px-5 sm:px-10 lg:px-0 pt-28 pb-24 scroll-mt-20">
      <SectionHeader
        index="03"
        eyebrow="Terminal"
        title="Prefer a shell?"
        titleMuted="Everything here works from the command line too."
        aside={
          <>
            Type <code className="font-mono text-ink">help</code>, or tap a command. <kbd className="font-mono text-ink">↑</kbd>/<kbd className="font-mono text-ink">↓</kbd> recall history,{" "}
            <kbd className="font-mono text-ink">Tab</kbd> completes, and <code className="font-mono text-ink">cd work</code> jumps around the page.
          </>
        }
      />
      <motion.div initial="hidden" whileInView="show" viewport={VIEWPORT} variants={revealBlur(0.1)}>
        <InteractiveTerminal />
      </motion.div>
    </section>
  );
}
