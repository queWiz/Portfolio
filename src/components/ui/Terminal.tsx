"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft } from "lucide-react";

const COMMANDS: Record<string, string> = {
  help: `> AVAILABLE COMMANDS:
  [about]        — Candidate summary & software philosophy
  [skills]       — Production technologies & architectural tools
  [projects]     — Flagship systems (Pergas, Tabayyun, Sentinel)
  [contact]      — Direct outreach channels & email
  [verification] — Testing pass rates & data privacy compliance
  [clear]        — Reset terminal console`,

  about: `> CANDIDATE DOSSIER // UWAIS ALQARNI
  Degree:     Bachelor of ICT (Software Engineering) · SIT Singapore
  Track:      Distributed Data Systems, Edge AI & Verified Architecture
  Honors:     Director's List (Top 15% Cohort NYP)
  Research:   2x Published Papers at ACM AutomotiveUI '26 (Sweden)
  Philosophy: Tabayyun — Rigorous validation over blind trust`,

  skills: `> CORE SYSTEM CAPABILITIES:
  Languages:   TypeScript, Python, SQL, C#, Java, C++, HTML/CSS
  Frameworks:  Next.js 15 (App Router, SSR), ASP.NET Core, FastAPI, React
  Data/Infra:  Apache Kafka, Supabase (PostgreSQL), Docker Compose, AWS S3
  Edge AI:     WebAssembly (WASM), YOLOv8, Tesseract OCR, Gemini API RAG
  Quality:     Playwright (20 regression suites, 100% pass), PDPA compliance`,

  projects: `> FLAGSHIP ARCHITECTURES:
  01. Pergas Members Platform  — Real-client Singapore NGO digital system (Next.js, Supabase, Playwright)
  02. Clean Brilliant Carbon   — Enterprise layout persistence & BCE architecture in C#/.NET Core
  03. Codex AI Video Engine    — Multimodal RAG with Gemini API and pgvector (-30% DB overhead)
  04. BidForGood               — Defensive charity auction with automated GitHub Actions CI/CD
  05. Tabayyun Edge AI         — In-browser WASM YOLOv8 scanner (0 network egress, 100% privacy)`,

  publications: `> PEER-REVIEWED RESEARCH (ACM AutomotiveUI Adjunct '26, Gothenburg, Sweden):
  01. TakeoverBench: Benchmarking Platform for Takeover Requests in CAVs
      Role: 2nd Author of 7 · Built Flask backend & simulation baseline
      DOI:  10.1145/3828158.3833210
  02. Towards Low-Cost Driver Supervision: Smartphone Interface for Inattention
      Role: 3rd Author of 6 · Custom YOLOv8 driver inattention detection model
      DOI:  10.1145/3828158.3834806
  ORCID: 0009-0006-6833-4965`,

  contact: `> SECURE CHANNELS:
  Email:    ualqarni70@gmail.com
  GitHubs:  github.com/queWiz · github.com/ooWise
  LinkedIn: linkedin.com/in/ualqarni
  ORCID:    orcid.org/0009-0006-6833-4965
  Location: Singapore (SGT / UTC+8)`,

  verification: `> SYSTEM INTEGRITY AUDIT:
  Playwright Pass Rate: 100% across 20 production regression scenarios
  Privacy Governance:   Server-side NRIC/PII scrubbing (Singapore PDPA)
  Edge Data Egress:     0 bytes transmitted over network (Local WASM)`,

  clear: "__CLEAR__",
};

const INITIAL_DOSSIER = [
  "UWAIS_ALQARNI_SYS // KERNEL v2.4 (SIT SINGAPORE)",
  "STATUS: OPEN TO SOFTWARE ENGINEERING INTERNSHIPS",
  "--------------------------------------------------",
  "CANDIDATE:  Uwais Alqarni (Software & Data Engineer)",
  "CORE STACK: Next.js 15 · Kafka · PostgreSQL · Python · WASM",
  "TEST SLA:   100% Pass Rate across 20 Playwright Suites",
  "TYPE 'help' OR CLICK QUICK RUN BUTTONS BELOW:",
];

export function InteractiveTerminal() {
  const [lines, setLines] = useState<string[]>(INITIAL_DOSSIER);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  const executeCommand = (cmdStr: string) => {
    const cleanCmd = cmdStr.trim().toLowerCase();
    if (!cleanCmd) return;

    if (cleanCmd === "clear") {
      setLines(INITIAL_DOSSIER);
      return;
    }

    const response =
      COMMANDS[cleanCmd] ||
      `> unknown command: '${cleanCmd}'. Type 'help' to inspect valid commands.`;

    setLines((prev) => [...prev, `$ ${cleanCmd}`, ...response.split("\n")]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  return (
    <div
      id="terminal"
      className="w-full max-w-4xl mx-auto rounded-3xl bg-[#090D16] border border-slate-800 text-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden font-mono flex flex-col h-[480px] sm:h-[500px]"
    >
      {/* Hardware Console Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0D121E] border-b border-slate-800/90">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-[#f06a6a]" />
          <span className="w-3 h-3 rounded-full bg-[#f0b74a]" />
          <span className="w-3 h-3 rounded-full bg-[#5fc98e]" />
          <span className="text-xs text-slate-400 font-semibold ml-2 flex items-center gap-1.5">
            <TerminalIcon size={14} className="text-cobalt" />
            candidate-dossier // cli-interactive
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">
            SGT ONLINE
          </span>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-5 sm:p-6 text-xs sm:text-sm space-y-1.5 leading-relaxed selection:bg-cobalt selection:text-white"
      >
        {lines.map((l, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap ${
              l.startsWith("$")
                ? "text-white font-bold"
                : l.includes("CANDIDATE:") || l.includes("UWAIS_ALQARNI")
                ? "text-cobalt font-bold"
                : l.includes("STATUS:")
                ? "text-emerald-400 font-semibold"
                : "text-slate-300"
            }`}
          >
            {l}
          </div>
        ))}
      </div>

      {/* Quick Run Buttons Bar */}
      <div className="px-5 py-2.5 bg-[#0B0F19] border-t border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-1">
          QUICK RUN:
        </span>
        {["about", "skills", "projects", "publications", "contact", "verification", "clear"].map(
          (btn) => (
            <button
              key={btn}
              onClick={() => executeCommand(btn)}
              className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-cobalt/20 hover:text-cobalt hover:border-cobalt/40 border border-white/[0.08] text-[11px] text-slate-300 font-semibold transition-all duration-150"
            >
              [{btn}]
            </button>
          )
        )}
      </div>

      {/* Interactive Command Prompt */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#090D16] border-t border-slate-800/60">
        <span className="text-cobalt font-bold text-sm">$</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Terminal command prompt"
          placeholder="Type 'help' or click any button above..."
          className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs sm:text-sm placeholder:text-slate-600"
          spellCheck={false}
        />
        <button
          onClick={() => {
            executeCommand(input);
            setInput("");
          }}
          className="text-slate-500 hover:text-white transition-colors"
          aria-label="Submit command"
        >
          <CornerDownLeft size={16} />
        </button>
      </div>
    </div>
  );
}