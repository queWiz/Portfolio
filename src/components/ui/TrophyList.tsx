import { Trophy, Award, Medal } from "lucide-react";

export const TrophyList = () => {
  return (
    <section className="max-w-4xl w-full mb-32 px-4 z-10">
      <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
        <span className="w-8 h-[1px] bg-neutral-800"></span>
        Achievements
        <span className="w-full h-[1px] bg-neutral-800"></span>
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-start gap-4 hover:border-yellow-600/50 transition-colors group">
          <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500 group-hover:text-yellow-400">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Director's List</h3>
            <p className="text-sm text-neutral-400 mb-1">Singapore Institute of Technology</p>
            <p className="text-xs font-mono text-neutral-500">Top 15% of Cohort (2021, 2022)</p>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-start gap-4 hover:border-blue-600/50 transition-colors group">
          <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500 group-hover:text-blue-400">
            <Award size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Google Data Analytics</h3>
            <p className="text-sm text-neutral-400 mb-1">Professional Certificate</p>
            <p className="text-xs font-mono text-neutral-500">Data Cleaning, R, Visualization (2022)</p>
          </div>
        </div>
      </div>
    </section>
  );
};