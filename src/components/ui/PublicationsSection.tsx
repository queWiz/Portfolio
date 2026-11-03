"use client";

import { useState } from "react";
import { ExternalLink, ArrowUpRight, Copy, Check } from "lucide-react";

interface Publication {
  id: string;
  index: string;
  title: string;
  venueShort: string;
  conference: string;
  location: string;
  year: string;
  doi: string;
  doiUrl: string;
  authorship: string;
  contribution: string;
  tags: string[];
  bibtex: string;
}

const PUBLICATIONS: Publication[] = [
  {
    id: "takeoverbench",
    index: "PUB-01",
    title:
      "TakeoverBench: A Benchmarking Platform for Takeover Requests (TOR) in Conditionally Automated Vehicles",
    venueShort: "ACM AUTO-UI '26",
    conference: "18th International Conference on Automotive User Interfaces (AutomotiveUI Adjunct '26)",
    location: "Gothenburg, Sweden",
    year: "2026",
    doi: "10.1145/3828158.3833210",
    doiUrl: "https://doi.org/10.1145/3828158.3833210",
    authorship: "2nd Author of 7",
    contribution:
      "Built the system's Flask backend and core simulation baseline (later extended by teammates), and researched and selected takeover-performance metrics used for the benchmark platform.",
    tags: ["Automated Vehicles", "Flask Backend", "TOR Benchmarking", "Simulation", "ACM"],
    bibtex: `@inproceedings{takeoverbench2026,\n  title={TakeoverBench: A Benchmarking Platform for Takeover Requests (TOR) in Conditionally Automated Vehicles},\n  booktitle={Adjunct Proceedings of the 18th International Conference on Automotive User Interfaces (AutomotiveUI '26)},\n  year={2026},\n  publisher={ACM},\n  doi={10.1145/3828158.3833210}\n}`,
  },
  {
    id: "driver-supervision",
    index: "PUB-02",
    title:
      "Student Research Track: Towards Low-Cost Driver Supervision: Evaluating a Smartphone Interface for Driver Inattention Monitoring in Simulated Driving",
    venueShort: "ACM AUTO-UI '26",
    conference: "18th International Conference on Automotive User Interfaces (AutomotiveUI Adjunct '26)",
    location: "Gothenburg, Sweden",
    year: "2026",
    doi: "10.1145/3828158.3834806",
    doiUrl: "https://doi.org/10.1145/3828158.3834806",
    authorship: "3rd Author of 6",
    contribution:
      "Developed the custom YOLOv8 object-detection model used to classify driver non-driving-related tasks (phone-like interaction, reading) and contributed to team research and final interactive demo.",
    tags: ["Computer Vision", "YOLOv8", "Driver Inattention", "Smartphone Interface", "ACM"],
    bibtex: `@inproceedings{driversupervision2026,\n  title={Towards Low-Cost Driver Supervision: Evaluating a Smartphone Interface for Driver Inattention Monitoring in Simulated Driving},\n  booktitle={Adjunct Proceedings of the 18th International Conference on Automotive User Interfaces (AutomotiveUI '26)},\n  year={2026},\n  publisher={ACM},\n  doi={10.1145/3828158.3834806}\n}`,
  },
];

export function PublicationsSection() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (pub: Publication) => {
    navigator.clipboard?.writeText(pub.bibtex);
    setCopiedId(pub.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full">
      {/* Structural Editorial Index Bar (05 / 06) */}
      <div className="flex items-center justify-between pt-4 mb-6 border-t border-slate-200/90 dark:border-white/[0.08] text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-cobalt/10 text-cobalt font-bold border border-cobalt/20">
            05 / 06
          </span>
          <span className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider">
            Academic Research &amp; Proceedings
          </span>
        </div>
        <span className="text-slate-400 dark:text-slate-500">
          ACM DIGITAL LIBRARY · PEER-REVIEWED
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-heading font-semibold tracking-[-0.035em] text-slate-950 dark:text-white">
            Peer-Reviewed Publications.
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 mt-2 max-w-2xl">
            Published human-computer interaction, autonomous vehicle benchmarking, and computer vision research indexed by the Association for Computing Machinery (ACM).
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://orcid.org/0009-0006-6833-4965"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface dark:bg-surface border border-slate-200/90 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-slate-300 hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>ORCID: 0009-0006-6833-4965</span>
            <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Editorial Research Citation Ledger (1px Shared Hairlines, Zero SaaS Card Bloat) */}
      <div className="rounded-xl border border-slate-200/90 dark:border-white/[0.08] bg-surface dark:bg-surface overflow-hidden divide-y divide-slate-200/90 dark:divide-white/[0.08]">
        {/* Ledger Column Header Strip (Desktop) */}
        <div className="hidden lg:grid lg:grid-cols-12 px-6 py-3 bg-slate-50/80 dark:bg-white/[0.02] text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          <div className="col-span-2">Proceedings / Role</div>
          <div className="col-span-7">Citation &amp; Systems Contribution</div>
          <div className="col-span-3 text-right">Identifier / DOI</div>
        </div>

        {PUBLICATIONS.map((pub) => (
          <article
            key={pub.id}
            className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-slate-50/50 dark:hover:bg-white/[0.015] transition-colors group"
          >
            {/* Left Column: Venue Monogram & Authorship Rank */}
            <div className="lg:col-span-2 flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start gap-2 font-mono text-xs">
              <div>
                <div className="font-bold text-slate-900 dark:text-white tracking-tight">
                  {pub.venueShort}
                </div>
                <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                  {pub.location} · {pub.year}
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded bg-cobalt/10 text-cobalt font-semibold border border-cobalt/20 lg:mt-2">
                {pub.authorship}
              </span>
            </div>

            {/* Center Column: Title, Conference String & Unboxed Technical Contribution */}
            <div className="lg:col-span-7 space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-950 dark:text-white leading-snug group-hover:text-cobalt transition-colors">
                  {pub.title}
                </h3>
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-1">
                  {pub.conference}
                </p>
              </div>

              {/* Unboxed Editorial Contribution Callout (2px Left Rule instead of nested card) */}
              <div className="border-l-2 border-cobalt pl-3.5 py-0.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <span className="font-mono text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mr-2">
                  Engineering Contribution:
                </span>
                {pub.contribution}
              </div>

              {/* Clean Inline Indexing Keywords */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {pub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 border border-slate-200/70 dark:border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: DOI Monograph & Copy BibTeX Actions */}
            <div className="lg:col-span-3 flex flex-wrap lg:flex-col lg:items-end justify-between gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.06] font-mono text-xs">
              <a
                href={pub.doiUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-slate-200/90 dark:border-white/[0.08] hover:border-cobalt hover:text-cobalt transition-colors font-semibold"
              >
                <span>DOI: {pub.doi}</span>
                <ExternalLink size={12} />
              </a>

              <button
                onClick={() => handleCopyBibtex(pub)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Copy BibTeX citation"
              >
                {copiedId === pub.id ? (
                  <>
                    <Check size={12} className="text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">BibTeX Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy BibTeX</span>
                  </>
                )}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
