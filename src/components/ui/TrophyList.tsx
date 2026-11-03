export const TrophyList = () => {
  return (
    <div className="w-full">
      {/* Open Editorial Columns (Contrasts with the Publications Ledger above so not everything is boxed) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 pt-2">
        {/* Distinction 01 */}
        <div className="flex flex-col justify-between gap-3 border-l-2 border-amber-500/70 pl-5 sm:pl-6 py-1">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span className="text-amber-600 dark:text-amber-400 font-bold">2019 — 2021</span>
              <span>·</span>
              <span>Nanyang Polytechnic (NYP)</span>
            </div>
            <h4 className="text-lg sm:text-xl font-heading font-semibold text-slate-950 dark:text-white">
              Director&apos;s List Academic Distinction (Top 15%)
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              Awarded for graduating in the top 15% of the Information Technology cohort, achieving module distinctions in Software Engineering, UX Design, and Networking Architecture.
            </p>
          </div>
        </div>

        {/* Distinction 02 */}
        <div className="flex flex-col justify-between gap-3 border-l-2 border-cobalt/80 pl-5 sm:pl-6 py-1">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-slate-500 dark:text-slate-400 mb-1.5">
              <span className="text-cobalt font-bold">2022</span>
              <span>·</span>
              <span>Google Professional Certification</span>
            </div>
            <h4 className="text-lg sm:text-xl font-heading font-semibold text-slate-950 dark:text-white">
              Google Data Analytics Professional Certificate
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
              Verified proficiency in end-to-end data cleaning pipelines, relational SQL querying, R statistical modeling, and quantitative decision dashboards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
