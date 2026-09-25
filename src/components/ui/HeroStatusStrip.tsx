"use client";

import { ShieldCheck } from "lucide-react";

export function HeroStatusStrip() {
  return (
    <div className="w-full max-w-2xl rounded-2xl bg-white/70 dark:bg-[#111622]/70 border border-slate-200/80 dark:border-white/[0.08] p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        {/* Status 1 */}
        <div className="flex flex-col gap-1 border-r border-slate-100 dark:border-white/[0.06] pr-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Current Track
          </span>
          <span className="text-xs font-heading font-bold text-slate-800 dark:text-slate-200">
            SIT · Software Eng
          </span>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Top 15% NYP
          </span>
        </div>

        {/* Status 2 */}
        <div className="flex flex-col gap-1 sm:border-r border-slate-100 dark:border-white/[0.06] pr-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Primary Stack
          </span>
          <span className="text-xs font-heading font-bold text-slate-800 dark:text-slate-200">
            Next.js · Python
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            PostgreSQL · Kafka
          </span>
        </div>

        {/* Status 3 */}
        <div className="flex flex-col gap-1 border-r border-slate-100 dark:border-white/[0.06] pr-2 pt-2 sm:pt-0 border-t sm:border-t-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Verification Rate
          </span>
          <span className="text-xs font-heading font-bold text-cobalt flex items-center gap-1">
            <ShieldCheck size={13} /> 100% Pass
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            20 Playwright Suites
          </span>
        </div>

        {/* Status 4 */}
        <div className="flex flex-col gap-1 pt-2 sm:pt-0 border-t sm:border-t-0">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Focus Discipline
          </span>
          <span className="text-xs font-heading font-bold text-slate-800 dark:text-slate-200">
            Distributed Systems
          </span>
          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
            Edge AI &amp; Privacy
          </span>
        </div>
      </div>
    </div>
  );
}
