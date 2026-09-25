"use client";

import { useState } from "react";
import { Cpu } from "lucide-react";
import { motion } from "framer-motion";

export function ArchitectureLoopSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const STEPS = [
    { name: "REQUIREMENTS", desc: "Pergas client workflows & PDPA constraints", angle: 270 },
    { name: "ARCHITECTURE", desc: "Single-domain Next.js SSR + server-side RBAC", angle: 345 },
    { name: "VERIFICATION", desc: "Playwright 20/20 regression suites (100% pass)", angle: 55 },
    { name: "DEPLOYMENT", desc: "Supabase PostgreSQL + Zoho event APIs", angle: 125 },
    { name: "KNOWLEDGE", desc: "TakeoverBench & ACM research benchmarks", angle: 195 },
  ];

  return (
    <div className="w-full">
      {/* Section Header: Merging Tabayyun Philosophy with Verified Engineering */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80 dark:border-white/[0.08]"
      >
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-0.5 bg-cobalt" />
            <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
              02 // PHILOSOPHY IN PRACTICE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white">
            Tabayyun (تَبَيَّنُوا): Continuous Verification.
          </h2>
        </div>
        <div className="max-w-md">
          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
            Rooted in <strong className="text-slate-900 dark:text-white">Al-Hujurat 49:6</strong> — the
            mandate to investigate and verify before accepting. In software engineering, this means
            zero blind trust in client inputs, deterministic regression testing, and PDPA privacy compliance.
          </p>
        </div>
      </motion.div>

      {/* Main 3-Column Diagram Stage */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-8 lg:p-10 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5)]"
      >
        {/* Unified Top Header Baseline for all 3 columns */}
        <div className="hidden lg:grid grid-cols-12 gap-8 border-b border-slate-200/80 dark:border-white/[0.06] pb-3 mb-6">
          <div className="col-span-4">
            <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-widest">
              01 — ACTORS (CLIENT &amp; USERS)
            </span>
          </div>
          <div className="col-span-5 text-center">
            <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-widest">
              02 — TABAYYUN OPERATING LOOP
            </span>
          </div>
          <div className="col-span-3">
            <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-widest">
              03 — ACCUMULATION (COMPOUNDING)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Column 1: 01 — ACTORS (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col space-y-4"
          >
            <div className="lg:hidden border-b border-slate-200/80 dark:border-white/[0.06] pb-2 mb-2">
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-widest">
                01 — ACTORS
              </span>
            </div>

            {/* Actor 1: Who Builds */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] flex items-start gap-3.5 hover:border-cobalt/40 transition-colors">
              <div className="shrink-0 pt-0.5 text-cobalt">
                {/* 8-bit Robot */}
                <svg viewBox="0 0 14 14" shapeRendering="crispEdges" className="w-7 h-7">
                  <rect x="6" y="0" width="2" height="2" fill="currentColor" />
                  <rect x="3" y="2" width="8" height="5" fill="currentColor" />
                  <rect x="4" y="3" width="2" height="2" fill="#FFFFFF" />
                  <rect x="8" y="3" width="2" height="2" fill="#FFFFFF" />
                  <rect x="2" y="7" width="10" height="4" fill="currentColor" />
                  <rect x="3" y="11" width="3" height="3" fill="currentColor" />
                  <rect x="8" y="11" width="3" height="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900 dark:text-white">
                  Who builds
                </h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Systems &amp; Software Engineer
                </p>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-1 leading-snug">
                  Next.js App Router, Supabase (PostgreSQL), Playwright, C#/.NET Core.
                </span>
              </div>
            </div>

            {/* Actor 2: Who Decides */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] flex items-start gap-3.5 hover:border-cobalt/40 transition-colors">
              <div className="shrink-0 pt-0.5 text-emerald-500">
                {/* 8-bit Leader */}
                <svg viewBox="0 0 14 14" shapeRendering="crispEdges" className="w-7 h-7">
                  <rect x="4" y="1" width="6" height="5" fill="currentColor" />
                  <rect x="5" y="3" width="1" height="1" fill="#FFFFFF" />
                  <rect x="8" y="3" width="1" height="1" fill="#FFFFFF" />
                  <rect x="2" y="6" width="10" height="5" fill="currentColor" />
                  <rect x="4" y="11" width="2" height="3" fill="currentColor" />
                  <rect x="8" y="11" width="2" height="3" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900 dark:text-white">
                  Who decides
                </h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Real Clients &amp; Partners
                </p>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-1 leading-snug">
                  Pergas (Singapore NGO), Enterprise ESG Stakeholders, Academic PIs.
                </span>
              </div>
            </div>

            {/* Actor 3: Who Uses */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] flex items-start gap-3.5 hover:border-cobalt/40 transition-colors">
              <div className="shrink-0 pt-0.5 text-amber-500">
                {/* 8-bit Users */}
                <svg viewBox="0 0 16 14" shapeRendering="crispEdges" className="w-7 h-7">
                  <rect x="2" y="2" width="4" height="4" fill="currentColor" />
                  <rect x="1" y="6" width="6" height="6" fill="currentColor" />
                  <rect x="10" y="2" width="4" height="4" fill="currentColor" />
                  <rect x="9" y="6" width="6" height="6" fill="currentColor" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-heading font-bold text-slate-900 dark:text-white">
                  Who uses
                </h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                  Members &amp; Automated Systems
                </p>
                <span className="text-[11px] text-slate-600 dark:text-slate-300 block mt-1 leading-snug">
                  4,000+ NGO members, community donors, and autonomous vehicle simulators.
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2: 02 — TABAYYUN OPERATING LOOP (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center my-4 lg:my-0"
          >
            <div className="lg:hidden w-full text-center border-b border-slate-200/80 dark:border-white/[0.06] pb-2 mb-4">
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-widest">
                02 — TABAYYUN OPERATING LOOP
              </span>
            </div>

            {/* Circular Orbit Loop with Ample Radius to Prevent Overlap */}
            <div className="relative w-[340px] sm:w-[380px] h-[340px] sm:h-[380px] flex items-center justify-center">
              {/* Outer Dashed Orbit Ring */}
              <div className="absolute inset-2 rounded-full border border-dashed border-slate-300 dark:border-white/20 animate-[spin_60s_linear_infinite]" />

              {/* Orbiting Pulses */}
              <div className="absolute inset-2 rounded-full animate-[spin_14s_linear_infinite] pointer-events-none">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cobalt shadow-[0_0_12px_rgba(37,99,235,0.8)]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400" />
              </div>

              {/* Central Core Box (Compact to Guarantee 0 Overlap) */}
              <div className="relative z-10 w-32 sm:w-36 rounded-2xl bg-white dark:bg-[#141B28] border-2 border-cobalt/80 p-3 shadow-xl text-center">
                <div className="w-5 h-5 mx-auto mb-1 rounded bg-cobalt/10 text-cobalt flex items-center justify-center">
                  <Cpu size={12} />
                </div>
                <h4 className="text-[11px] font-heading font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  TABAYYUN CORE
                </h4>
                <div className="text-[9px] font-mono text-cobalt font-semibold mt-0.5">
                  Zero Blind Trust
                </div>
                <div className="text-[8px] font-mono text-slate-400 mt-1.5 pt-1.5 border-t border-slate-100 dark:border-white/10 leading-tight">
                  PDPA · 20 Suites · Relational
                </div>
              </div>

              {/* Orbiting Step Nodes (Well-Spaced at 160px Radius) */}
              {STEPS.map((s, idx) => {
                const rad = (s.angle * Math.PI) / 180;
                const r = 158; // Generous radius ensuring pills never collide with center box
                const x = Math.cos(rad) * r;
                const y = Math.sin(rad) * r;

                const isCurrent = activeStep === idx;

                return (
                  <div
                    key={s.name}
                    onMouseEnter={() => setActiveStep(idx)}
                    onMouseLeave={() => setActiveStep(null)}
                    className="absolute cursor-pointer transition-transform hover:scale-110 z-20"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <div
                      className={`px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider transition-all shadow-sm ${
                        isCurrent
                          ? "bg-cobalt text-white scale-105 shadow-md ring-1 ring-cobalt/40"
                          : "bg-white dark:bg-[#161F30] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/15"
                      }`}
                    >
                      {s.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Loop Interactive Descriptor */}
            <div className="mt-3 text-center min-h-[20px]">
              <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {activeStep !== null
                  ? `> ${STEPS[activeStep].desc}`
                  : "Hover any orbit node to inspect verified pipeline stage"}
              </span>
            </div>
          </motion.div>

          {/* Column 3: 03 — ACCUMULATION (3 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3 flex flex-col space-y-3.5"
          >
            <div className="lg:hidden border-b border-slate-200/80 dark:border-white/[0.06] pb-2 mb-2">
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-widest">
                03 — ACCUMULATION
              </span>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900 dark:text-white mb-0.5">
                It compounds every lap.
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-mono">
                Real-client platforms and testbenches continuously harden code reliability.
              </p>
            </div>

            {/* Stacked Laps: Lap 3 / Lap 2 / Lap 1 */}
            <div className="space-y-2.5">
              {/* Lap 3 */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between hover:border-cobalt/40 transition-colors">
                <div>
                  <div className="text-[9px] font-mono text-cobalt font-bold uppercase">
                    Lap 03 · Research Rigor
                  </div>
                  <div className="text-xs font-heading font-bold text-slate-900 dark:text-white mt-0.5">
                    ACM AutomotiveUI &apos;26
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    2x Peer-Reviewed Papers
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-200/50 dark:bg-white/10">
                  L3
                </span>
              </div>

              {/* Lap 2 */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between hover:border-cobalt/40 transition-colors">
                <div>
                  <div className="text-[9px] font-mono text-cobalt font-bold uppercase">
                    Lap 02 · Defensive Security
                  </div>
                  <div className="text-xs font-heading font-bold text-slate-900 dark:text-white mt-0.5">
                    100% Playwright Pass
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Server-Side PDPA Scrubbing
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-200/50 dark:bg-white/10">
                  L2
                </span>
              </div>

              {/* Lap 1 */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between hover:border-cobalt/40 transition-colors">
                <div>
                  <div className="text-[9px] font-mono text-cobalt font-bold uppercase">
                    Lap 01 · Client Delivery
                  </div>
                  <div className="text-xs font-heading font-bold text-slate-900 dark:text-white mt-0.5">
                    Pergas Members Platform
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Replaced fragmented Telegram/cards
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 px-2 py-0.5 rounded bg-slate-200/50 dark:bg-white/10">
                  L1
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
