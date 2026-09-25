"use client";

import { ExternalLink, ArrowUpRight } from "lucide-react";

interface Publication {
  id: string;
  title: string;
  conference: string;
  location: string;
  year: string;
  doi: string;
  doiUrl: string;
  authorship: string;
  contribution: string;
  tags: string[];
}

const PUBLICATIONS: Publication[] = [
  {
    id: "takeoverbench",
    title:
      "TakeoverBench: A Benchmarking Platform for Takeover Requests (TOR) in Conditionally Automated Vehicles",
    conference: "18th International Conference on Automotive User Interfaces (AutomotiveUI Adjunct '26)",
    location: "Gothenburg, Sweden · ACM",
    year: "2026",
    doi: "10.1145/3828158.3833210",
    doiUrl: "https://doi.org/10.1145/3828158.3833210",
    authorship: "2nd Author of 7",
    contribution:
      "Built the system's Flask backend and core simulation baseline (later extended by teammates), and researched and selected takeover-performance metrics used for the benchmark platform.",
    tags: ["Automated Vehicles", "Flask Backend", "TOR Benchmarking", "Simulation", "ACM"],
  },
  {
    id: "driver-supervision",
    title:
      "Student Research Track: Towards Low-Cost Driver Supervision: Evaluating a Smartphone Interface for Driver Inattention Monitoring in Simulated Driving",
    conference: "18th International Conference on Automotive User Interfaces (AutomotiveUI Adjunct '26)",
    location: "Gothenburg, Sweden · ACM",
    year: "2026",
    doi: "10.1145/3828158.3834806",
    doiUrl: "https://doi.org/10.1145/3828158.3834806",
    authorship: "3rd Author of 6",
    contribution:
      "Developed the custom YOLOv8 object-detection model used to classify driver non-driving-related tasks (phone-like interaction, reading) and contributed to team research and final interactive demo.",
    tags: ["Computer Vision", "YOLOv8", "Driver Inattention", "Smartphone Interface", "ACM"],
  },
];

export function PublicationsSection() {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200/80 dark:border-white/[0.08]">
        <div>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="w-8 h-0.5 bg-cobalt" />
            <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
              ACADEMIC RESEARCH &amp; PAPERS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white">
            Peer-Reviewed Publications.
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://orcid.org/0009-0006-6833-4965"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-semibold hover:bg-emerald-100 transition-colors"
          >
            <span>ORCID: 0009-0006-6833-4965</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PUBLICATIONS.map((pub) => (
          <div
            key={pub.id}
            className="rounded-3xl bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-cobalt/40 hover:shadow-md transition-all duration-300 group"
          >
            <div>
              {/* Badge & Year */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cobalt/10 text-cobalt font-bold border border-cobalt/20">
                  {pub.authorship}
                </span>
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  {pub.year}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mb-2 leading-snug group-hover:text-cobalt transition-colors">
                {pub.title}
              </h3>

              {/* Conference */}
              <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-4">
                {pub.conference} · {pub.location}
              </p>

              {/* Contribution Description */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.05] text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                <span className="text-cobalt font-bold font-mono block mb-1">
                  Key Technical Contribution:
                </span>
                {pub.contribution}
              </div>
            </div>

            {/* Tags and DOI Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {pub.tags.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={pub.doiUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-cobalt hover:underline font-semibold"
              >
                <span>DOI: {pub.doi}</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
