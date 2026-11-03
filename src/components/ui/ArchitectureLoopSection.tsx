"use client";

import { useState } from "react";
import { ShieldCheck, Cpu, Database, CheckCircle2, Sparkles } from "lucide-react";

interface PipelineStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  summary: string;
  contract: string;
  icon: typeof Cpu;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "edge",
    step: "STAGE 01",
    title: "Client & WASM Edge Gate",
    subtitle: "In-Browser Inference & Zero Egress",
    badge: "0B EGRESS",
    summary:
      "Untrusted inputs and camera frames are validated at the edge. For Tabayyun, YOLOv8n and Tesseract OCR run entirely inside WebAssembly memory with zero network transmission.",
    contract: `{\n  "stage": "01_CLIENT_EDGE_GATE",\n  "runtime": "WebAssembly (SIMD + WebGL)",\n  "models": ["YOLOv8n.onnx", "Tesseract.wasm"],\n  "network_egress_bytes": 0,\n  "latency_p95": "118ms"\n}`,
    icon: Cpu,
  },
  {
    id: "sanitization",
    step: "STAGE 02",
    title: "SSR RBAC & PDPA Scrubbing",
    subtitle: "Server-Side Identity & PII Masking",
    badge: "PDPA COMPLIANT",
    summary:
      "Before any payload reaches application logic, Next.js Server Components enforce Role-Based Access Control (RBAC) and scrub sensitive Singapore NRIC/PII fields.",
    contract: `{\n  "stage": "02_SSR_PDPA_SANITIZER",\n  "auth_guard": "Next.js App Router SSR RBAC",\n  "pii_scrubbing": "NRIC_REGEX_HMAC_MASK",\n  "sql_protection": "Parameterized ADO.NET / Npgsql",\n  "csrf_token": "SHA256_VERIFIED"\n}`,
    icon: ShieldCheck,
  },
  {
    id: "storage",
    step: "STAGE 03",
    title: "Relational & Vector Persistence",
    subtitle: "PostgreSQL + pgvector + ACID Locks",
    badge: "-30% DB COST",
    summary:
      "Persists verified state across 10+ interconnected Supabase PostgreSQL tables, hybrid JSONB layouts (Unit of Work), and pgvector HNSW embeddings with AWS S3 media tiering.",
    contract: `{\n  "stage": "03_RELATIONAL_VECTOR_CORE",\n  "engine": "PostgreSQL 16 + pgvector HNSW",\n  "isolation_level": "SERIALIZABLE (Pessimistic Lock)",\n  "schema_pattern": "Hybrid Relational + JSONB",\n  "storage_optimization": "-30% overhead via AWS S3"\n}`,
    icon: Database,
  },
  {
    id: "verification",
    step: "STAGE 04",
    title: "Playwright 20/20 Regression Gate",
    subtitle: "Deterministic CI/CD Verification",
    badge: "100% PASS",
    summary:
      "Every pull request triggers GitHub Actions CI and 20 automated Playwright end-to-end regression suites asserting RBAC boundaries, schema integrity, and idempotent APIs.",
    contract: `{\n  "stage": "04_PLAYWRIGHT_AUDIT_GATE",\n  "ci_pipeline": "GitHub Actions Matrix",\n  "e2e_suites": 20,\n  "pass_rate": "100%",\n  "high_cves": 0\n}`,
    icon: CheckCircle2,
  },
  {
    id: "research",
    step: "STAGE 05",
    title: "ACM Benchmarking & Feedback",
    subtitle: "Peer-Reviewed Empirical Telemetry",
    badge: "2x ACM PAPERS",
    summary:
      "Production insights feed back into empirical research benchmarks — including TakeoverBench and YOLOv8 driver supervision published at ACM AutomotiveUI '26.",
    contract: `{\n  "stage": "05_EMPIRICAL_BENCHMARK_LOOP",\n  "venue": "ACM AutomotiveUI Adjunct '26 (Sweden)",\n  "dois": [\n    "10.1145/3828158.3833210",\n    "10.1145/3828158.3834806"\n  ],\n  "feedback_loop": "CLOSED_LOOP_ACTIVE"\n}`,
    icon: Sparkles,
  },
];

export function ArchitectureLoopSection() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeStage = PIPELINE_STAGES[selectedIdx];

  return (
    <div className="w-full">
      {/* Clean Section Header */}
      <div className="flex items-center justify-between pt-4 mb-6 border-t border-slate-200/80 dark:border-white/[0.08] text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="text-cobalt font-bold">02 / 06</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider">
            Philosophy in Practice
          </span>
        </div>
        <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">
          CLOSED-LOOP VERIFICATION ARCHITECTURE
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-[-0.035em] text-slate-950 dark:text-white">
            Tabayyun (تَبَيَّنُوا): Continuous Verification.
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Rooted in <strong className="text-slate-900 dark:text-white">Al-Hujurat 49:6</strong> — the
            mandate to investigate and verify before accepting. Click any stage in the pipeline below to inspect how untrusted inputs are verified end-to-end.
          </p>
        </div>
      </div>

      {/* Decision #3: Interactive SVG Pipeline Schematic + Live Contract Inspector */}
      <div className="rounded-3xl bg-surface dark:bg-surface border border-slate-200/80 dark:border-white/[0.07] p-6 sm:p-10 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.05)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] space-y-8">
        {/* SVG Connected Pipeline Nodes */}
        <div className="relative">
          {/* Desktop Horizontal SVG Connector Line with Animated Data Pulse */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[2px] bg-slate-200 dark:bg-white/[0.08] pointer-events-none z-0">
            <div
              className="h-full bg-gradient-to-r from-cobalt via-emerald-400 to-cobalt transition-all duration-500"
              style={{ width: `${((selectedIdx + 1) / PIPELINE_STAGES.length) * 100}%` }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 relative z-10">
            {PIPELINE_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = idx === selectedIdx;

              return (
                <button
                  key={stage.id}
                  onClick={() => setSelectedIdx(idx)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between min-h-[128px] ${
                    isSelected
                      ? "bg-surface dark:bg-surface border-cobalt shadow-lg ring-2 ring-cobalt/20 -translate-y-0.5"
                      : "bg-slate-50/90 dark:bg-surface/60 border-slate-200/80 dark:border-white/[0.07] hover:border-cobalt/40"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 w-full mb-3">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isSelected ? "text-cobalt" : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {stage.step}
                    </span>
                    <span
                      className={`text-xs font-mono px-2 py-0.5 rounded font-semibold ${
                        isSelected
                          ? "bg-cobalt/15 text-cobalt"
                          : "bg-slate-200/70 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      {stage.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <Icon
                        size={15}
                        className={isSelected ? "text-cobalt shrink-0" : "text-slate-400 shrink-0"}
                      />
                      <h3 className="text-sm font-heading font-semibold text-slate-950 dark:text-white leading-tight">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {stage.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Closed-Loop Return Vector Path (SVG) */}
          <div className="hidden lg:flex items-center justify-between px-6 pt-4 text-xs font-mono text-slate-400 dark:text-slate-500">
            <span>┌── CLOSED-LOOP EMPIRICAL FEEDBACK (AL-HUJURAT 49:6 VERIFICATION)</span>
            <span className="text-cobalt font-semibold">
              ACTIVE NODE: {activeStage.step} ({activeStage.title.toUpperCase()}) ──┘
            </span>
          </div>
        </div>

        {/* Selected Stage Details + Live Telemetry Contract */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 border-t border-slate-100 dark:border-white/[0.06]">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cobalt font-bold uppercase">
              <span>{activeStage.step} SPECIFICATION</span>
              <span>·</span>
              <span>{activeStage.subtitle}</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-heading font-semibold text-slate-950 dark:text-white">
              {activeStage.title}
            </h4>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeStage.summary}
            </p>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-console border border-slate-800 p-5 font-mono text-xs text-slate-200 shadow-xl">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs">
              <span className="text-cobalt font-bold">VERIFICATION CONTRACT // JSON</span>
              <span className="text-emerald-400 font-semibold">{activeStage.badge}</span>
            </div>
            <pre className="overflow-x-auto leading-relaxed text-slate-300">
              {activeStage.contract}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
