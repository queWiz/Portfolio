import { Trophy, Award, CheckCircle2 } from "lucide-react";

export const TrophyList = () => {
  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-5">
        {/* Award 1 */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#111622] flex items-start gap-4 hover:border-amber-400/50 hover:shadow-md transition-all group">
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-500 group-hover:scale-105 transition-transform">
            <Trophy size={22} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Director&apos;s List (Top 15%)
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border border-amber-500/20">
                Academic Distinction
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Nanyang Polytechnic · Diploma in IT (2019 — 2021)
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Awarded for graduating in the top 15% of the cohort, with distinctions in UX Design and Networking Architecture.
            </p>
          </div>
        </div>

        {/* Award 2 */}
        <div className="p-6 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#111622] flex items-start gap-4 hover:border-cobalt/50 hover:shadow-md transition-all group">
          <div className="p-3 bg-cobalt/10 border border-cobalt/20 rounded-xl text-cobalt group-hover:scale-105 transition-transform">
            <Award size={22} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="text-base font-heading font-bold text-slate-900 dark:text-white">
                Google Data Analytics
              </h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cobalt/10 text-cobalt font-semibold border border-cobalt/20 flex items-center gap-1">
                <CheckCircle2 size={10} /> Professional
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Google Professional Certification (2022)
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              Rigorous data processing, exploratory SQL pipelines, R statistical modeling, and interactive visualization frameworks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};