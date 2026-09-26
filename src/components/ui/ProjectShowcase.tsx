"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheck,
  Cpu,
  Github,
  Play,
  CheckCircle2,
  Zap,
  Activity,
  ArrowUpRight,
  Monitor,
  Smartphone,
} from "lucide-react";

interface ProjectData {
  num: string;
  id: string;
  title: string;
  tagline: string;
  role: string;
  client: string;
  year: string;
  domain: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  overview: string;
  bulletPoints: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const PROJECTS: ProjectData[] = [
  {
    num: "01",
    id: "pergas",
    title: "Pergas Members Platform",
    tagline: "Enterprise Member & Admin Digital Platform",
    role: "Lead Technical Delivery",
    client: "Pergas (Registered Singapore NGO)",
    year: "2026",
    domain: "pergas.org.sg",
    tags: ["Next.js (App Router)", "Supabase", "PostgreSQL", "Playwright", "PDPA"],
    metrics: [
      { label: "Regression Pass", value: "100% (20 Suites)" },
      { label: "Relational Schema", value: "10+ Tables" },
      { label: "Data Compliance", value: "Server-side PDPA" },
      { label: "Architecture", value: "SSR + RBAC" },
    ],
    overview:
      "Led technical delivery for Pergas, a registered Singapore NGO, replacing fragmented Telegram, email, and physical card workflows with a unified, high-integrity digital platform.",
    bulletPoints: [
      "Architected full-stack Member and Admin portals on a single domain using Next.js App Router with server-side Role-Based Access Control (RBAC).",
      "Integrated Zoho Backstage and Google Maps APIs for event registration, ticketing, and merchant discovery.",
      "Designed and deployed a relational Supabase (PostgreSQL) schema spanning 10+ interconnected tables, enforcing data integrity across tiers.",
      "Authored a Playwright test suite achieving 100% pass rate across 20 regression scenarios; implemented server-side NRIC scrubbing for PDPA compliance.",
    ],
    githubUrl: "https://github.com/queWiz/Pergas-Members-Integrated-System",
  },
  {
    num: "02",
    id: "cleanbrilliant",
    title: "Clean Brilliant Carbon Analytics",
    tagline: "Layout Persistence & Enterprise Analytics Engine",
    role: "Backend & Systems Architect",
    client: "Enterprise Carbon Reporting",
    year: "2025",
    domain: "cleanbrilliant.carbon.io",
    tags: ["C# / .NET Core", "ASP.NET Core", "PostgreSQL", "JSONB", "Table Data Gateway"],
    metrics: [
      { label: "Architecture", value: "BCE Pattern" },
      { label: "Schema", value: "Hybrid Relational + JSONB" },
      { label: "Security", value: "Parameterized ADO.NET" },
      { label: "State Model", value: "Unit of Work" },
    ],
    overview:
      "Built the Dashboard Customization & Layout Persistence Engine for an enterprise C#/.NET web application, applying Table Data Gateway and Unit of Work patterns against PostgreSQL.",
    bulletPoints: [
      "Designed a hybrid relational + JSONB schema to persist flexible, schema-less dashboard layouts with full ACID transactional integrity.",
      "Developed complete layout lifecycle logic (add, remove, reorder, auto-pack widgets) using Strategy, Builder, and Serialization design patterns.",
      "Implemented parameterized ADO.NET/Npgsql queries to eliminate SQL injection risks across high-concurrency analytical reads.",
      "Built MVC controller endpoints including a drag-and-drop reordering API consuming dynamic JSON payloads in ASP.NET Core.",
    ],
    githubUrl: "https://github.com/queWiz",
  },
  {
    num: "03",
    id: "codex",
    title: "Codex Multimodal RAG Engine",
    tagline: "AI Video Knowledge & Semantic Q&A Platform",
    role: "AI & Systems Engineer",
    client: "AI Video Intelligence Lab",
    year: "2026",
    domain: "codex-rag.internal",
    tags: ["Python", "FastAPI", "Gemini API", "pgvector", "PostgreSQL", "AWS S3"],
    metrics: [
      { label: "Search Infra", value: "pgvector Embeddings" },
      { label: "Cost Optimization", value: "-30% DB Overhead" },
      { label: "Concurrency", value: "Async FastAPI" },
      { label: "Multimodal", value: "Gemini Vision & Audio" },
    ],
    overview:
      "Architected a multimodal Retrieval-Augmented Generation (RAG) pipeline using the Gemini API and pgvector embeddings for semantic insight extraction across video, audio, and documents.",
    bulletPoints: [
      "Tuned the chunking, embedding, and vector search retrieval pipeline through iterative experimentation to maximize semantic-search relevance.",
      "Developed a fault-tolerant asynchronous FastAPI backend with lazy database connections to prevent timeouts during large video chunking.",
      "Deployed pipeline with AWS S3 for media storage, cutting database infrastructure costs by 30% through optimized storage tiering.",
      "Supported Q&A-style precise timestamp retrieval across hour-long video files with multimodal context verification.",
    ],
    githubUrl: "https://github.com/queWiz",
  },
  {
    num: "04",
    id: "bidforgood",
    title: "BidForGood Defensive Auction",
    tagline: "Secure Real-Time Auction & Concurrency Engine",
    role: "Full-Stack Security Lead",
    client: "Community Charity Platform",
    year: "2026",
    domain: "bidforgood.charity.sg",
    tags: ["TypeScript", "Node.js", "PostgreSQL", "GitHub Actions CI/CD", "CSRF"],
    metrics: [
      { label: "CI/CD Pipeline", value: "GitHub Actions CI" },
      { label: "Defense In-Depth", value: "CSRF & SQLi Proof" },
      { label: "Concurrency", value: "ACID Safe Locks" },
      { label: "Vulnerability Scan", value: "Zero High CVEs" },
    ],
    overview:
      "A defensive charity auction application engineered to guarantee transactional integrity during high-frequency concurrent bidding while shielding against web attack vectors.",
    bulletPoints: [
      "Engineered automated GitHub Actions CI/CD pipelines enforcing linting, secret scanning, and regression tests on every pull request.",
      "Implemented strict defensive SQL parameterization and anti-CSRF token handshakes to block injection and cross-site forgery exploits.",
      "Designed pessimistic locking mechanisms in PostgreSQL to eliminate race conditions during split-second auction bid increments.",
      "Hardened API endpoints with rate limiters and session verification middleware to prevent automated bidding bots.",
    ],
    githubUrl: "https://github.com/queWiz/BidForGood",
  },
  {
    num: "05",
    id: "tabayyun",
    title: "Tabayyun Hybrid AI Food Scanner",
    tagline: "Zero-Egress In-Browser Vision & OCR Verification",
    role: "Solo Architect",
    client: "Edge AI / Computer Vision",
    year: "2025",
    domain: "tabayyun-edge.app",
    tags: ["WebAssembly (WASM)", "TensorFlow.js", "YOLOv8n", "Tesseract.js OCR"],
    metrics: [
      { label: "Network Egress", value: "0 Bytes (Offline)" },
      { label: "Inference Latency", value: "<150ms WASM" },
      { label: "Accuracy", value: "90% Ground-Truth" },
      { label: "Privacy SLA", value: "100% On-Device" },
    ],
    overview:
      "A hybrid computer-vision pipeline combining YOLOv8n object detection with Tesseract.js OCR, compiled to WebAssembly for real-time, on-device inference in an offline-first PWA.",
    bulletPoints: [
      "Optimized model inference performance on mobile hardware through dynamic resolution scaling, drastically reducing RAM overhead and iOS crash rates.",
      "Designed and evaluated a custom heuristic post-processing algorithm to correct OCR errors, iteratively testing against ground-truth labels to achieve 90% accuracy.",
      "Engineered an offline-first Progressive Web App architecture with zero telemetry, ensuring complete on-device privacy.",
      "Sub-150ms inference times on commodity consumer hardware without requiring dedicated cloud GPU acceleration.",
    ],
    githubUrl: "https://github.com/queWiz",
  },
];

const SLIDE_DURATION = 7000; // 7 seconds per slide

export function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [deviceView, setDeviceView] = useState<"desktop" | "mobile">("desktop");
  const [showSimulator, setShowSimulator] = useState(false);
  const [viewLayout, setViewLayout] = useState<"carousel" | "stacked">("carousel");

  const currentProject = PROJECTS[currentIndex];

  // Zero-lag auto-advancing slideshow: Single setTimeout update per slide;
  // Progress bar is driven 100% on the GPU via CSS scaleX keyframes (0 re-renders)
  useEffect(() => {
    if (isPaused || viewLayout === "stacked") return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, SLIDE_DURATION);

    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, viewLayout]);

  const selectProject = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="w-full flex flex-col gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 
        VIEW SWITCHER CONTROLLER:
        Allows recruiters and visitors to toggle between the default interactive carousel 
        and the full Havu-style Stacking Sticky Deep-Dive.
      */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
            {viewLayout === "carousel"
              ? `PROJECT ${currentProject.num} OF 05 · INTERACTIVE STAGE`
              : "ALL 5 PRODUCTION CASE STUDIES · STACKED"}
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-full bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/10 shadow-sm text-xs font-mono">
          <button
            onClick={() => setViewLayout("carousel")}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              viewLayout === "carousel"
                ? "bg-cobalt text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            ⌁ Carousel View
          </button>
          <button
            onClick={() => setViewLayout("stacked")}
            className={`px-3 py-1 rounded-full font-semibold transition-all ${
              viewLayout === "stacked"
                ? "bg-cobalt text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            ☰ Stacked Deep-Dive
          </button>
        </div>
      </div>

      {viewLayout === "stacked" ? (
        /* ==============================================================
           HAVU STACKING STICKY SECTIONS DEEP-DIVE
           All 5 projects laid out in sticky cascading depth
           ============================================================== */
        <div className="w-full flex flex-col gap-8 relative pb-10">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              style={{
                top: `calc(5rem + ${idx * 20}px)`,
                zIndex: idx + 5,
              }}
              className="sticky w-full rounded-3xl bg-white/95 dark:bg-[#111622]/95 backdrop-blur-xl border border-slate-200/90 dark:border-white/[0.08] p-5 sm:p-8 lg:p-10 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:border-cobalt/40 transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                {/* Left Column: Project Info & Tradeoffs */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-5 sm:gap-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold text-cobalt px-2.5 py-0.5 rounded-full bg-cobalt/10 border border-cobalt/20">
                        {proj.num} · CASE STUDY
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {proj.client} · {proj.year}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cobalt font-semibold uppercase tracking-wider mt-1">
                      {proj.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.overview}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06]">
                    {proj.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-heading font-bold text-slate-800 dark:text-slate-200">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Technical Highlights */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
                      Technical Highlights
                    </span>
                    <ul className="space-y-2">
                      {proj.bulletPoints.map((bp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                          <span className="text-cobalt text-xs mt-0.5">✦</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags and Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                    <div className="flex flex-wrap gap-1.5">
                      {proj.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.08]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${proj.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-white text-xs font-mono font-semibold hover:bg-cobalt hover:text-white transition-colors"
                      >
                        <Github size={13} />
                        <span>Repo</span>
                        <ArrowUpRight size={11} className="opacity-70" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Screenshot & Mockup Frame with Havu Sheen */}
                <div className="lg:col-span-6 w-full flex flex-col gap-4">
                  <DesktopBrowserMockup project={proj} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ==============================================================
           INTERACTIVE CAROUSEL VIEW (DEFAULT)
           With vertical-only tab translation (no horizontal scrollbar)
           and stable min-height (zero layout shifting below)
           ============================================================== */
        <>
          {/* Mobile Top Quick Switcher */}
          <div className="sm:hidden flex items-center justify-between gap-2 px-1 mb-1">
            <span className="text-xs font-mono text-cobalt font-bold">
              PROJECT {currentProject.num} OF 05
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => selectProject((currentIndex - 1 + PROJECTS.length) % PROJECTS.length)}
                aria-label="Previous Project"
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-white/5 active:scale-95 transition-transform"
              >
                ← Prev
              </button>
              <button
                onClick={() => selectProject((currentIndex + 1) % PROJECTS.length)}
                aria-label="Next Project"
                className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-white/5 active:scale-95 transition-transform"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Tabs list: Vertical translation on hover to completely prevent horizontal scrollbar */}
          <div className="tab-sibling-focus flex sm:grid sm:grid-cols-5 gap-2 sm:gap-3 overflow-x-auto snap-x scrollbar-none pb-2 pt-1 -mx-1 px-1">
            {PROJECTS.map((proj, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(idx)}
                  className={`tab-sibling-item text-left p-3 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between shrink-0 sm:shrink min-w-[145px] sm:min-w-0 snap-start min-h-[82px] sm:min-h-[90px] ${
                    isActive
                      ? "bg-white dark:bg-[#111622] border-cobalt/60 shadow-md ring-1 ring-cobalt/20 !opacity-100 !transform-none"
                      : "bg-white/60 dark:bg-[#111622]/50 border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 w-full mb-1">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? "text-cobalt" : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {proj.num}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                      {proj.year}
                    </span>
                  </div>

                  <div
                    className={`text-xs sm:text-sm font-heading font-bold truncate leading-tight ${
                      isActive
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {proj.title}
                  </div>

                  {/* Timed Horizontal Progress Bar (Hardware accelerated CSS scaleX) */}
                  <div className="w-full h-1 bg-slate-100 dark:bg-white/[0.05] rounded-full overflow-hidden mt-3">
                    {isActive ? (
                      <div
                        key={currentIndex}
                        className="h-full bg-cobalt rounded-full animate-progress-fill"
                        style={{ animationPlayState: isPaused ? "paused" : "running" }}
                      />
                    ) : (
                      <div
                        className={`h-full ${
                          idx < currentIndex ? "bg-slate-300 dark:bg-white/20 w-full" : "w-0"
                        }`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* 
            MAIN SHOWCASE STAGE:
            Locked with consistent minimum height (min-h-[520px]) so switching projects
            produces ZERO layout shift or bouncing on elements below!
          */}
          <div className="w-full rounded-3xl bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/[0.08] p-4 sm:p-8 lg:p-12 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.06)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.5)] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              {/* Left Column: Project Info & Tradeoffs (Locked min-height for 0 layout shift) */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-5 sm:gap-6 min-h-[460px] sm:min-h-[500px] lg:min-h-[530px]">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs font-bold text-cobalt px-2.5 py-0.5 rounded-full bg-cobalt/10 border border-cobalt/20">
                        {currentProject.num} · CASE STUDY
                      </span>
                      <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                        {currentProject.client}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cobalt font-semibold uppercase tracking-wider mt-1">
                      {currentProject.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentProject.overview}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06]">
                    {currentProject.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-heading font-bold text-slate-800 dark:text-slate-200">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Engineering Bullets */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold">
                      Technical Highlights
                    </span>
                    <ul className="space-y-2">
                      {currentProject.bulletPoints.map((bp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                          <span className="text-cobalt text-xs mt-0.5">✦</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                  <div className="flex flex-wrap gap-1.5">
                    {currentProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.08]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${currentProject.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-800 dark:text-white text-xs font-mono font-semibold hover:bg-cobalt hover:text-white transition-colors"
                      >
                        <Github size={13} />
                        <span>Repo</span>
                        <ArrowUpRight size={11} className="opacity-70" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column: Web & Mobile Mockup Frame */}
              <div className="lg:col-span-6 w-full flex flex-col justify-between gap-4 min-h-[460px] sm:min-h-[500px] lg:min-h-[530px]">
                {/* View Mode Controller Switch: Desktop / Mobile / Simulator */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                  <div className="inline-flex items-center p-1 rounded-full bg-slate-100 dark:bg-[#141B28] border border-slate-200 dark:border-white/10">
                    <button
                      onClick={() => {
                        setShowSimulator(false);
                        setDeviceView("desktop");
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                        !showSimulator && deviceView === "desktop"
                          ? "bg-white dark:bg-cobalt text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Monitor size={12} />
                      <span>Desktop</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowSimulator(false);
                        setDeviceView("mobile");
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all ${
                        !showSimulator && deviceView === "mobile"
                          ? "bg-white dark:bg-cobalt text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Smartphone size={12} />
                      <span>Mobile</span>
                    </button>
                  </div>

                  {/* Simulator Mode Toggle */}
                  <button
                    onClick={() => setShowSimulator(!showSimulator)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all ${
                      showSimulator
                        ? "bg-cobalt text-white border-cobalt"
                        : "bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-cobalt"
                    }`}
                  >
                    <Zap size={12} />
                    <span>{showSimulator ? "Exit Simulator" : "Simulator ⌁"}</span>
                  </button>
                </div>

                {/* Display Either the Interactive Simulator OR the Web/Mobile Mockup */}
                {showSimulator ? (
                  <div className="w-full">
                    {currentProject.id === "pergas" && <PergasInteractiveSimulator />}
                    {currentProject.id === "cleanbrilliant" && <CleanBrilliantSimulator />}
                    {currentProject.id === "codex" && <CodexRAGSimulator />}
                    {currentProject.id === "bidforgood" && <BidForGoodInteractiveSimulator />}
                    {currentProject.id === "tabayyun" && <TabayyunInteractiveSimulator />}
                  </div>
                ) : (
                  <div className="w-full relative flex items-center justify-center my-auto">
                    {deviceView === "desktop" ? (
                      <DesktopBrowserMockup project={currentProject} />
                    ) : (
                      <MobilePhoneMockup project={currentProject} />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// REALISTIC BROWSER MOCKUP (Inspired by Image 3)
// -------------------------------------------------------------
function DesktopBrowserMockup({ project }: { project: ProjectData }) {
  return (
    <div className="w-full max-w-full rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-2xl overflow-hidden font-sans">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-slate-950 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#5fc98e]" />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-[150px] sm:max-w-xs mx-auto py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full bg-slate-900 border border-slate-800 text-[10px] sm:text-[11px] font-mono text-slate-400 text-center truncate">
          https://{project.domain}
        </div>

        <div className="w-6 sm:w-10" />
      </div>

      {/* Mockup Screen Content */}
      <div className="p-3.5 sm:p-5 bg-slate-900 min-h-[290px] sm:min-h-[340px] flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-1 pb-2.5 sm:pb-3 mb-3 border-b border-slate-800">
            <span className="font-heading font-extrabold text-xs sm:text-sm text-white truncate max-w-[190px] sm:max-w-none">
              {project.title}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cobalt/20 text-cobalt font-semibold">
              LIVE SYSTEM
            </span>
          </div>

          {/* Screenshot / Architecture Viewport with Havu Grayscale-to-Full-Color Sheen */}
          <div className="group/screen relative w-full h-28 sm:h-32 rounded-xl overflow-hidden border border-slate-800/90 mb-3 bg-slate-950">
            <div className="sheen-media-card w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-slate-900/95 via-[#0c1424] to-slate-950">
              <div className="absolute inset-0 isometric-grid-bg opacity-30 pointer-events-none" />
              <div className="relative z-10 flex flex-col items-center gap-1 max-w-xs">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cobalt/20 text-cobalt border border-cobalt/30 font-bold uppercase tracking-wider">
                  {project.domain}
                </span>
                <span className="text-xs font-heading font-bold text-slate-200">
                  {project.tagline}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  [Drop Screenshot Here · Hover for Vivid Sheen]
                </span>
              </div>
              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 border border-white/10 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[9px] sm:text-[10px] text-slate-400 block font-mono">STATUS</span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={12} /> Production Verified
              </span>
            </div>
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[9px] sm:text-[10px] text-slate-400 block font-mono">STACK</span>
              <span className="text-xs font-bold text-slate-200 truncate mt-0.5 block">
                {project.tags.slice(0, 2).join(" · ")}
              </span>
            </div>
          </div>

          <div className="p-2.5 sm:p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 font-mono text-[10px] sm:text-[11px] text-slate-300">
            <div className="text-cobalt font-bold">&gt; ARCHITECTURAL SPECIFICATION:</div>
            <div className="text-slate-400 leading-relaxed text-[10px] sm:text-[11px] break-words">
              {project.bulletPoints[0]}
            </div>
          </div>
        </div>

        <div className="pt-2.5 sm:pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
          <span>Singapore SGT Hosted</span>
          <span className="text-emerald-400 font-semibold">100% SLA</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// REALISTIC MOBILE PHONE MOCKUP (Inspired by Image 3)
// -------------------------------------------------------------
function MobilePhoneMockup({ project }: { project: ProjectData }) {
  return (
    <div className="w-full max-w-[260px] sm:max-w-[280px] rounded-[36px] bg-slate-950 border-[5px] sm:border-[6px] border-slate-800 shadow-2xl overflow-hidden font-sans p-2 mx-auto">
      {/* Phone Speaker & Dynamic Island Notch */}
      <div className="w-20 sm:w-24 h-3.5 sm:h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-slate-800 mr-2" />
        <div className="w-6 sm:w-8 h-1 bg-slate-800 rounded-full" />
      </div>

      <div className="rounded-[24px] bg-slate-900 p-4 min-h-[360px] flex flex-col justify-between text-slate-100">
        <div>
          <div className="text-[10px] font-mono text-cobalt font-bold uppercase mb-1">
            {project.num} · MOBILE VIEW
          </div>
          <h4 className="font-heading font-extrabold text-sm text-white mb-2 leading-tight">
            {project.title}
          </h4>

          {/* Mobile Screenshot Slot with Sheen */}
          <div className="group/screen relative w-full h-24 rounded-xl overflow-hidden border border-slate-800 mb-2.5 bg-slate-950">
            <div className="sheen-media-card w-full h-full flex flex-col items-center justify-center p-2 text-center bg-gradient-to-br from-slate-900 via-[#0c1424] to-slate-950">
              <span className="text-[9px] font-mono text-cobalt font-bold uppercase tracking-wider">
                {project.id}.app
              </span>
              <span className="text-[10px] font-heading font-bold text-white mt-0.5 line-clamp-1">
                {project.title}
              </span>
              <span className="text-[8px] font-mono text-slate-400 mt-0.5">
                [Screenshot Drop-in]
              </span>
            </div>
          </div>

          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 mb-2.5 space-y-0.5">
            <span className="text-[9px] font-mono text-slate-400 block">KEY OUTCOME</span>
            <span className="text-xs font-bold text-emerald-400 block">
              {project.metrics[0].value}
            </span>
          </div>

          <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400 leading-snug">
            {project.overview.slice(0, 95)}...
          </div>
        </div>

        {/* Mobile App Navigation Simulation */}
        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-around text-[10px] font-mono text-slate-400">
          <span className="text-cobalt font-bold">Portal</span>
          <span>Logs</span>
          <span>Audit</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 1: PERGAS (Playwright Test Runner + Schema Inspector)
// -------------------------------------------------------------
function PergasInteractiveSimulator() {
  const [testState, setTestState] = useState<"idle" | "running" | "done">("done");

  const runTests = () => {
    setTestState("running");
    setTimeout(() => {
      setTestState("done");
    }, 900);
  };

  const TEST_SPECS = [
    { name: "nric_server_scrubbing_pdpa.spec.ts", time: "34ms" },
    { name: "rbac_admin_escalation_denied.spec.ts", time: "22ms" },
    { name: "zoho_event_booking_idempotent.spec.ts", time: "48ms" },
    { name: "supabase_schema_fk_integrity.spec.ts", time: "29ms" },
    { name: "membership_tier_renewal_flow.spec.ts", time: "55ms" },
  ];

  return (
    <div className="w-full rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fc98e]" />
          <span className="text-[11px] text-slate-400 ml-2 font-mono">
            pergas-platform // playwright-runner
          </span>
        </div>
        <button
          onClick={runTests}
          disabled={testState === "running"}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
        >
          <Play size={10} />
          <span>{testState === "running" ? "Running..." : "Run 20 Suites"}</span>
        </button>
      </div>

      <div className="p-4 sm:p-5 min-h-[290px] flex flex-col justify-between">
        {testState === "running" ? (
          <div className="flex flex-col items-center justify-center py-10 gap-3 text-slate-400">
            <div className="w-5 h-5 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Executing 20 regression scenarios...</span>
          </div>
        ) : (
          <div className="space-y-2">
            {TEST_SPECS.map((spec, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-1.5 px-2.5 rounded bg-slate-950/40 border border-slate-800/80"
              >
                <div className="flex items-center gap-2 truncate">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  <span className="text-slate-300 truncate text-[11px]">
                    {spec.name}
                  </span>
                </div>
                <span className="text-slate-500 text-[10px] shrink-0 font-mono">
                  {spec.time}
                </span>
              </div>
            ))}
            <div className="text-[11px] text-emerald-400 pt-2 flex items-center justify-between">
              <span>20 passed (100% pass rate)</span>
              <span className="text-slate-500">Duration: 1.84s</span>
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck size={12} /> Server-Side PDPA Scrubbing Active
          </span>
          <span className="font-mono text-slate-500">Supabase 10+ Tables</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 2: CLEAN BRILLIANT (C# / .NET Layout Engine)
// -------------------------------------------------------------
function CleanBrilliantSimulator() {
  const [widgets, setWidgets] = useState(["Emissions Gauge", "Scope 1/2 Tracker", "Grid Carbon Intensity"]);

  const reorderWidgets = () => {
    setWidgets((w) => [...w.slice(1), w[0]]);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fc98e]" />
          <span className="text-[11px] text-slate-400 ml-2 font-mono">
            dotnet // table-data-gateway
          </span>
        </div>
        <button
          onClick={reorderWidgets}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cobalt/20 text-cobalt border border-cobalt/30 hover:bg-cobalt/30 transition-colors"
        >
          <Activity size={10} />
          <span>Reorder Layout</span>
        </button>
      </div>

      <div className="p-4 sm:p-5 min-h-[290px] flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="text-[11px] text-slate-400 pb-1 border-b border-slate-800">
            JSONB Layout State Transition (Unit of Work)
          </div>
          {widgets.map((widget, i) => (
            <div
              key={i}
              className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between"
            >
              <span className="text-white font-bold">{widget}</span>
              <span className="text-[10px] text-slate-500">Slot: #{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span className="text-emerald-400">Parameterized Npgsql Query</span>
          <span>BCE Architecture</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 3: CODEX (Multimodal RAG with Gemini & pgvector)
// -------------------------------------------------------------
function CodexRAGSimulator() {
  const [queryState, setQueryState] = useState<"idle" | "searching" | "done">("done");

  const runQuery = () => {
    setQueryState("searching");
    setTimeout(() => {
      setQueryState("done");
    }, 700);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fc98e]" />
          <span className="text-[11px] text-slate-400 ml-2 font-mono">
            codex // multimodal-rag
          </span>
        </div>
        <button
          onClick={runQuery}
          className="px-2.5 py-1 rounded bg-cobalt/20 text-cobalt border border-cobalt/30 hover:bg-cobalt/30 transition-colors"
        >
          {queryState === "searching" ? "Searching..." : "Vector Search"}
        </button>
      </div>

      <div className="p-4 sm:p-5 min-h-[290px] flex flex-col justify-between">
        <div className="space-y-3">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
            <span className="text-cobalt font-bold">&gt; Semantic Prompt:</span> &quot;Find
            moments where battery temperature exceeded 45C&quot;
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1.5">
            <div className="flex justify-between text-[11px] text-white font-bold">
              <span>Timestamp Match: 00:14:32</span>
              <span className="text-emerald-400">Cosine Sim: 0.942</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Gemini Vision frame analysis confirmed thermal throttle spike in video telemetry.
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
          <span>Lazy Async Connections</span>
          <span className="text-emerald-400">-30% DB Overhead</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 4: BIDFORGOOD (Defensive Security & CI/CD Pipeline)
// -------------------------------------------------------------
function BidForGoodInteractiveSimulator() {
  const [currentBid, setCurrentBid] = useState(450);

  const placeBid = () => {
    setCurrentBid((b) => b + 25);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fc98e]" />
          <span className="text-[11px] text-slate-400 ml-2 font-mono">
            bidforgood // defensive-runtime
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
          CI/CD GREEN
        </span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[290px]">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 text-xs">Active Charity Lot #104</span>
            <span className="text-xs font-bold text-white">${currentBid} SGD</span>
          </div>

          <button
            onClick={placeBid}
            className="w-full py-1.5 rounded-lg bg-cobalt hover:bg-cobalt-dark text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Zap size={12} />
            <span>Bid +$25 (Pessimistic Lock)</span>
          </button>

          <div className="text-[10px] text-slate-400 space-y-1 pt-1 border-t border-slate-800/80">
            <div className="flex justify-between">
              <span>CSRF Handshake Token:</span>
              <span className="text-emerald-400">VALID (SHA256)</span>
            </div>
            <div className="flex justify-between">
              <span>SQL Sanitization:</span>
              <span className="text-emerald-400">PARAMETERIZED</span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
          <span>Concurrency Guard: Serializable</span>
          <span className="text-emerald-400 font-bold">0 High CVEs</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 5: TABAYYUN (Offline WASM YOLOv8 + OCR Scanner)
// -------------------------------------------------------------
function TabayyunInteractiveSimulator() {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 800);
  };

  return (
    <div className="w-full rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fc98e]" />
          <span className="text-[11px] text-slate-400 ml-2 font-mono">
            wasm-edge-scanner // runtime-local
          </span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-cobalt/20 text-cobalt font-bold">
          0 BYTES EGRESS
        </span>
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between min-h-[290px]">
        <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-3.5 space-y-2">
          {isScanning && (
            <div className="absolute inset-x-0 h-0.5 bg-cobalt shadow-[0_0_12px_#3b82f6] animate-pulse top-1/2" />
          )}

          <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-700/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-white">YOLOv8n + Tesseract.js</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                WASM IN-BROWSER
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              Heuristic OCR Post-Processing Accuracy: 90%
            </div>
          </div>
        </div>

        <div className="pt-3 flex flex-col gap-2">
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-cobalt text-white font-semibold text-xs hover:bg-cobalt-dark transition-colors"
          >
            <Cpu size={13} />
            <span>{isScanning ? "Processing In-Browser..." : "Simulate WASM Inference"}</span>
          </button>
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Dynamic Resolution Scaling</span>
            <span className="text-emerald-400 font-bold">Zero iOS Crash</span>
          </div>
        </div>
      </div>
    </div>
  );
}
