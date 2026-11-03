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
  Layers,
  LayoutGrid,
  Database,
  Lock,
  Sparkles,
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
    client: "Pergas (Singapore NGO)",
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
      { label: "Schema", value: "Relational + JSONB" },
      { label: "Security", value: "Parameterized SQL" },
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
      { label: "Search Infra", value: "pgvector HNSW" },
      { label: "Cost Delta", value: "-30% DB Overhead" },
      { label: "Concurrency", value: "Async FastAPI" },
      { label: "Multimodal", value: "Gemini Vision" },
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
      { label: "Security Audit", value: "Zero High CVEs" },
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

const SLIDE_DURATION = 7500;

export function ProjectShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Decision #1: Interactive Architecture Simulator is now the DEFAULT hero visual!
  const [rightMode, setRightMode] = useState<"simulator" | "desktop" | "mobile">("simulator");
  const [viewLayout, setViewLayout] = useState<"carousel" | "stacked">("carousel");

  const currentProject = PROJECTS[currentIndex];

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
      {/* View Switcher Controller */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1 mb-1">
        <div className="flex items-center gap-2.5">
          <span className="text-xs font-mono font-semibold text-slate-500 dark:text-slate-400">
            {viewLayout === "carousel"
              ? `Showing Case Study ${currentProject.num} of 05`
              : "All 5 Case Studies — Cascading Depth"}
          </span>
        </div>

        <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/[0.07] text-xs font-mono">
          <button
            onClick={() => setViewLayout("carousel")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              viewLayout === "carousel"
                ? "bg-white dark:bg-[#161D2B] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <LayoutGrid size={12} />
            <span>Interactive Stage</span>
          </button>
          <button
            onClick={() => setViewLayout("stacked")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all ${
              viewLayout === "stacked"
                ? "bg-white dark:bg-[#161D2B] text-slate-900 dark:text-white shadow-sm"
                : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers size={12} />
            <span>Stacked Deep-Dive</span>
          </button>
        </div>
      </div>

      {viewLayout === "stacked" ? (
        /* ==============================================================
           STACKING STICKY SECTIONS DEEP-DIVE
           Clean, breathing elevated surfaces with live simulators mounted
           ============================================================== */
        <div className="w-full flex flex-col gap-10 relative pb-10">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              style={{
                top: `calc(5rem + ${idx * 20}px)`,
                zIndex: idx + 5,
              }}
              className="sticky w-full rounded-3xl bg-white/95 dark:bg-[#101520]/95 backdrop-blur-xl border border-slate-200/80 dark:border-white/[0.08] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.07)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.65)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Open Editorial Narrative */}
                <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                      <span className="font-bold text-cobalt">{proj.num}</span>
                      <span>·</span>
                      <span>{proj.client}</span>
                      <span>·</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cobalt font-semibold mt-1">
                      {proj.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {proj.overview}
                  </p>

                  {/* Open, Breathing Metrics Row (No Boxed Spreadsheet Cells) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 dark:border-white/[0.06]">
                    {proj.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-heading font-bold text-slate-900 dark:text-white">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Clean Numbered Engineering Specs (Open Spacing, No Box Dividers) */}
                  <div className="space-y-3">
                    {proj.bulletPoints.map((bp, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        <span className="font-mono text-xs text-cobalt/80 font-bold shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags and Action Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {proj.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-mono text-slate-500 dark:text-slate-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${proj.title} on GitHub`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-800 dark:text-white text-xs font-mono font-semibold hover:bg-cobalt hover:text-white transition-colors"
                      >
                        <Github size={13} />
                        <span>Source</span>
                        <ArrowUpRight size={11} className="opacity-70" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Live Interactive Architecture Simulator Mounted Directly */}
                <div className="lg:col-span-6 w-full flex flex-col gap-4">
                  <ProjectInteractiveVisualizer project={proj} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ==============================================================
           INTERACTIVE CAROUSEL VIEW (DEFAULT)
           Breathing Dribbble/Linear aesthetic + Live Interactive Simulators by default
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

          {/* Selector Tabs */}
          <div className="tab-sibling-focus flex sm:grid sm:grid-cols-5 gap-2.5 overflow-x-auto snap-x scrollbar-none pb-2 pt-1 -mx-1 px-1">
            {PROJECTS.map((proj, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={proj.id}
                  onClick={() => selectProject(idx)}
                  className={`tab-sibling-item text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden flex flex-col justify-between shrink-0 sm:shrink min-w-[145px] sm:min-w-0 snap-start min-h-[82px] sm:min-h-[88px] ${
                    isActive
                      ? "bg-white dark:bg-[#101520] border-cobalt/60 shadow-md ring-1 ring-cobalt/15 !opacity-100 !transform-none"
                      : "bg-white/50 dark:bg-[#101520]/40 border-slate-200/70 dark:border-white/[0.05] hover:border-slate-300 dark:hover:border-white/15"
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
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
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

                  {/* Timed Horizontal Progress Bar */}
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
            Generous whitespace, soft atmospheric surface, open metrics, and Live Interactive Architecture on the right!
          */}
          <div className="w-full rounded-3xl bg-white dark:bg-[#101520] border border-slate-200/80 dark:border-white/[0.07] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.05)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Left Column: Open Editorial Narrative (No Boxed Table Headers) */}
              <div className="lg:col-span-6 flex flex-col justify-between gap-6 min-h-[460px] sm:min-h-[500px]">
                <div className="space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                      <span className="font-bold text-cobalt">{currentProject.num} / 05</span>
                      <span>·</span>
                      <span>{currentProject.client}</span>
                      <span>·</span>
                      <span>{currentProject.role}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-slate-950 dark:text-white tracking-tight leading-snug">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-cobalt font-semibold mt-1.5">
                      {currentProject.tagline}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentProject.overview}
                  </p>

                  {/* Open Key Metrics Row (Breathing whitespace, subtle top/bottom hairline only) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-slate-100 dark:border-white/[0.06]">
                    {currentProject.metrics.map((m, i) => (
                      <div key={i} className="flex flex-col gap-0.5">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                          {m.label}
                        </span>
                        <span className="text-xs sm:text-sm font-heading font-bold text-slate-900 dark:text-white">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Clean Numbered Engineering Specs (Open Spacing) */}
                  <div className="space-y-3 pt-1">
                    {currentProject.bulletPoints.map((bp, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        <span className="font-mono text-xs text-cobalt/80 font-bold shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtle Stack & Repository Footer */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/[0.06]">
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {currentProject.githubUrl && (
                    <a
                      href={currentProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${currentProject.title} on GitHub`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-mono font-semibold hover:bg-cobalt dark:hover:bg-cobalt dark:hover:text-white transition-colors"
                    >
                      <Github size={13} />
                      <span>Source Code</span>
                      <ArrowUpRight size={11} />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Architecture Visualizer by Default! */}
              <div className="lg:col-span-6 w-full flex flex-col justify-between gap-4 min-h-[460px] sm:min-h-[500px]">
                {/* Mode Controller: Interactive Architecture (Default) / Desktop / Mobile */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#161D2B] border border-slate-200/80 dark:border-white/[0.07]">
                    <button
                      onClick={() => setRightMode("simulator")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        rightMode === "simulator"
                          ? "bg-cobalt text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Zap size={12} />
                      <span>Live Architecture</span>
                    </button>
                    <button
                      onClick={() => setRightMode("desktop")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        rightMode === "desktop"
                          ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Monitor size={12} />
                      <span>Desktop Preview</span>
                    </button>
                    <button
                      onClick={() => setRightMode("mobile")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                        rightMode === "mobile"
                          ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      <Smartphone size={12} />
                      <span>Mobile</span>
                    </button>
                  </div>

                  <span className="text-xs font-mono text-slate-400 dark:text-slate-500 hidden sm:inline">
                    Interactive Telemetry
                  </span>
                </div>

                {/* Render Active Right-Column View */}
                <div className="w-full my-auto">
                  {rightMode === "simulator" && (
                    <ProjectInteractiveVisualizer project={currentProject} />
                  )}
                  {rightMode === "desktop" && (
                    <DesktopBrowserMockup project={currentProject} />
                  )}
                  {rightMode === "mobile" && (
                    <MobilePhoneMockup project={currentProject} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectInteractiveVisualizer({ project }: { project: ProjectData }) {
  if (project.id === "pergas") return <PergasInteractiveSimulator />;
  if (project.id === "cleanbrilliant") return <CleanBrilliantSimulator />;
  if (project.id === "codex") return <CodexRAGSimulator />;
  if (project.id === "bidforgood") return <BidForGoodInteractiveSimulator />;
  return <TabayyunInteractiveSimulator />;
}

// -------------------------------------------------------------
// SIMULATOR 1: PERGAS (Interactive PDPA Sanitizer + Playwright Runner)
// -------------------------------------------------------------
function PergasInteractiveSimulator() {
  const [testState, setTestState] = useState<"idle" | "running" | "done">("done");
  const [sampleIdx, setSampleIdx] = useState(0);

  const SAMPLES = [
    { rawNric: "S9912345Z", masked: "S****345Z", role: "MEMBER_TIER_GOLD", access: "PORTAL_SCOPED" },
    { rawNric: "T0284912E", masked: "T****912E", role: "ADMIN_AUDITOR", access: "RBAC_VERIFIED" },
    { rawNric: "S8840192B", masked: "S****192B", role: "EVENT_DELEGATE", access: "ZOHO_SYNCED" },
  ];

  const runTests = () => {
    setTestState("running");
    setSampleIdx((i) => (i + 1) % SAMPLES.length);
    setTimeout(() => {
      setTestState("done");
    }, 650);
  };

  const TEST_SPECS = [
    { name: "nric_server_scrubbing_pdpa.spec.ts", time: "34ms", status: "PASS" },
    { name: "rbac_admin_escalation_denied.spec.ts", time: "22ms", status: "PASS" },
    { name: "zoho_event_booking_idempotent.spec.ts", time: "48ms", status: "PASS" },
    { name: "supabase_schema_fk_integrity.spec.ts", time: "29ms", status: "PASS" },
  ];

  const activeSample = SAMPLES[sampleIdx];

  return (
    <div className="w-full rounded-2xl bg-[#0B0F17] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F1522] border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <ShieldCheck size={15} className="text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">
            pergas-core // pdpa-gate &amp; e2e-runner
          </span>
        </div>
        <button
          onClick={runTests}
          disabled={testState === "running"}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cobalt text-white hover:bg-cobalt/90 transition-colors font-semibold shadow-sm"
        >
          <Play size={11} />
          <span>{testState === "running" ? "Verifying..." : "Simulate Payload"}</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Visual Pipeline Diagram: Raw Input -> SSR Scrubbing -> Supabase RLS */}
        <div className="p-4 rounded-xl bg-[#111827] border border-slate-800/90 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>SINGAPORE PDPA SERVER-SIDE SANITIZATION</span>
            <span className="text-emerald-400 font-semibold">ZERO PII LEAK</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 items-center">
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-red-500/25">
              <div className="text-xs text-slate-500">CLIENT PAYLOAD</div>
              <div className="text-xs sm:text-sm font-bold text-red-400 mt-1">
                {activeSample.rawNric}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xs text-cobalt font-bold">SSR Scrub</span>
              <div className="w-full h-[2px] bg-gradient-to-r from-red-500/40 via-cobalt to-emerald-500/60 my-1.5 rounded-full" />
              <span className="text-xs text-slate-500">{activeSample.role}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#0B0F17] border border-emerald-500/30">
              <div className="text-xs text-slate-500">POSTGRES RLS</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-1">
                {activeSample.masked}
              </div>
            </div>
          </div>
        </div>

        {/* Playwright Suite Telemetry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-1">
            <span>PLAYWRIGHT E2E REGRESSION MATRIX (20 SUITES)</span>
            <span className="text-emerald-400 font-semibold">100% PASS</span>
          </div>
          {testState === "running" ? (
            <div className="flex items-center justify-center py-8 gap-3 text-slate-400">
              <div className="w-4 h-4 border-2 border-cobalt border-t-transparent rounded-full animate-spin" />
              <span>Running 20 automated security &amp; schema assertions...</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              {TEST_SPECS.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#111827]/70 border border-slate-800/70"
                >
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    <span className="text-slate-200 truncate">{spec.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-slate-500">{spec.time}</span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                      {spec.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 2: CLEAN BRILLIANT (C# / .NET Layout Persistence Engine)
// -------------------------------------------------------------
function CleanBrilliantSimulator() {
  const [widgets, setWidgets] = useState([
    { id: "w-01", title: "Scope 1 & 2 Carbon Telemetry", span: "col-span-2", kpi: "142.8 tCO2e" },
    { id: "w-02", title: "Grid Intensity", span: "col-span-1", kpi: "0.408 kg/kWh" },
    { id: "w-03", title: "ESG Audit Trail", span: "col-span-1", kpi: "ACID Verified" },
  ]);
  const [commitCount, setCommitCount] = useState(14);

  const reorderWidgets = () => {
    setWidgets((w) => [w[1], w[2], w[0]]);
    setCommitCount((c) => c + 1);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B0F17] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F1522] border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <Database size={15} className="text-cobalt" />
          <span className="text-xs font-semibold text-slate-200">
            aspnet-core // jsonb-layout-engine
          </span>
        </div>
        <button
          onClick={reorderWidgets}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cobalt text-white hover:bg-cobalt/90 transition-colors font-semibold"
        >
          <Activity size={12} />
          <span>Permute Grid State</span>
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-5">
        {/* Visual Bento Grid Preview */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>LIVE DASHBOARD WIDGET MATRIX (STRATEGY + BUILDER)</span>
            <span className="text-cobalt font-semibold">TX #{commitCount}</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {widgets.map((w, i) => (
              <div
                key={w.id}
                className={`${w.span} p-3.5 rounded-xl bg-[#111827] border border-slate-800 flex items-center justify-between transition-all`}
              >
                <div>
                  <span className="text-xs text-slate-500">SLOT 0{i + 1} · {w.id}</span>
                  <div className="text-xs sm:text-sm font-bold text-white mt-0.5">{w.title}</div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-cobalt/15 text-cobalt font-bold border border-cobalt/25">
                  {w.kpi}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Serialized PostgreSQL JSONB Payload Inspector */}
        <div className="p-3.5 rounded-xl bg-[#111827]/80 border border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>POSTGRESQL HYBRID JSONB PERSISTENCE (UNIT OF WORK)</span>
            <span className="text-emerald-400">PARAMETERIZED SQL</span>
          </div>
          <pre className="text-xs text-slate-300 overflow-x-auto leading-relaxed">
{`UPDATE dashboard_layouts SET widget_order = '${JSON.stringify(widgets.map((w) => w.id))}'::jsonb
WHERE tenant_id = @p0; -- 0 SQLi surface`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 3: CODEX (Multimodal RAG with Gemini & pgvector)
// -------------------------------------------------------------
function CodexRAGSimulator() {
  const [activeQueryIdx, setActiveQueryIdx] = useState(0);

  const QUERIES = [
    {
      prompt: "Locate thermal throttle spike above 45°C in telemetry stream",
      timestamp: "00:14:32",
      similarity: "0.948",
      modality: "Gemini Vision + Audio Frame",
      finding: "Detected battery cell #3 thermal anomaly during high-load discharge.",
    },
    {
      prompt: "Extract architecture latency bottleneck from system review",
      timestamp: "00:38:15",
      similarity: "0.921",
      modality: "Transcript + Slide OCR",
      finding: "Lazy async connection pooling reduced FastAPI timeout rate to 0%.",
    },
  ];

  const current = QUERIES[activeQueryIdx];

  return (
    <div className="w-full rounded-2xl bg-[#0B0F17] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F1522] border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <Sparkles size={15} className="text-cobalt" />
          <span className="text-xs font-semibold text-slate-200">
            codex-rag // pgvector &amp; gemini-multimodal
          </span>
        </div>
        <button
          onClick={() => setActiveQueryIdx((i) => (i + 1) % QUERIES.length)}
          className="px-3 py-1 rounded-lg bg-cobalt text-white hover:bg-cobalt/90 transition-colors font-semibold"
        >
          Switch Semantic Query
        </button>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
          <div className="text-xs text-slate-400 mb-1">MULTIMODAL QUERY VECTOR (768-DIM)</div>
          <div className="text-xs sm:text-sm text-white font-bold">
            &ldquo;{current.prompt}&rdquo;
          </div>
        </div>

        {/* Video Timeline Scrubber Visual */}
        <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-bold">
              MATCH @ {current.timestamp}
            </span>
            <span className="px-2 py-0.5 rounded bg-cobalt/20 text-cobalt font-bold">
              Cosine Sim: {current.similarity}
            </span>
          </div>

          {/* Visual Timeline Bar with Highlighted Frame Marker */}
          <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-cobalt to-emerald-400 rounded-full transition-all duration-500"
              style={{ left: activeQueryIdx === 0 ? "28%" : "64%" }}
            />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{current.finding}</p>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
            <span>Modality: {current.modality}</span>
            <span className="text-emerald-400 font-semibold">S3 Tiering: -30% DB Cost</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SIMULATOR 4: BIDFORGOOD (Defensive Security & Concurrency Lock)
// -------------------------------------------------------------
function BidForGoodInteractiveSimulator() {
  const [currentBid, setCurrentBid] = useState(450);
  const [txId, setTxId] = useState(8042);

  const placeBid = () => {
    setCurrentBid((b) => b + 25);
    setTxId((t) => t + 1);
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B0F17] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F1522] border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <Lock size={15} className="text-emerald-400" />
          <span className="text-xs font-semibold text-slate-200">
            bidforgood // acid-concurrency-guard
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
          0 HIGH CVEs
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        <div className="p-4 rounded-xl bg-[#111827] border border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400">CHARITY LOT #104 · SERIALIZABLE LOCK</div>
            <div className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              ${currentBid} SGD
            </div>
          </div>
          <button
            onClick={placeBid}
            className="px-4 py-2.5 rounded-xl bg-cobalt hover:bg-cobalt/90 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
          >
            <Zap size={13} />
            <span>Atomic Bid +$25</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
            <div className="text-xs text-slate-400">ROW LOCK TX</div>
            <div className="text-xs font-bold text-emerald-400 mt-1">
              SELECT ... FOR UPDATE #{txId}
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#111827] border border-slate-800">
            <div className="text-xs text-slate-400">CSRF &amp; SQLi DEFENSE</div>
            <div className="text-xs font-bold text-emerald-400 mt-1">
              HMAC-SHA256 Verified
            </div>
          </div>
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
  const [itemIdx, setItemIdx] = useState(0);

  const ITEMS = [
    { label: "E471 (Mono-diglycerides)", conf: "96.4%", status: "VERIFIED PLANT-ORIGIN", latency: "118ms" },
    { label: "Whey Powder (Rennet)", conf: "93.8%", status: "FLAGGED FOR REVIEW", latency: "134ms" },
  ];

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setItemIdx((i) => (i + 1) % ITEMS.length);
    }, 550);
  };

  const active = ITEMS[itemIdx];

  return (
    <div className="w-full rounded-2xl bg-[#0B0F17] text-slate-100 border border-slate-800/90 shadow-2xl overflow-hidden font-mono text-xs">
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#0F1522] border-b border-slate-800/80">
        <div className="flex items-center gap-2.5">
          <Cpu size={15} className="text-cobalt" />
          <span className="text-xs font-semibold text-slate-200">
            tabayyun-wasm // yolov8n + tesseract-ocr
          </span>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-cobalt/20 text-cobalt font-bold">
          0 BYTES EGRESS
        </span>
      </div>

      <div className="p-5 sm:p-6 space-y-4">
        {/* Bounding Box Vision Viewport */}
        <div className="relative rounded-xl bg-[#111827] border border-slate-800 p-4 overflow-hidden">
          {isScanning && (
            <div className="absolute inset-x-0 h-0.5 bg-cobalt shadow-[0_0_12px_#3b82f6] animate-pulse top-1/2" />
          )}
          <div className="border-2 border-dashed border-emerald-400/70 rounded-lg p-3.5 bg-[#0B0F17]/80">
            <div className="flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                YOLOv8 BBOX: {active.conf}
              </span>
              <span className="text-slate-400">WASM Latency: {active.latency}</span>
            </div>
            <div className="text-sm font-bold text-white mt-2">{active.label}</div>
            <div className="text-xs text-cobalt font-semibold mt-1">
              OCR Classification: {active.status}
            </div>
          </div>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cobalt text-white font-semibold text-xs hover:bg-cobalt/90 transition-colors"
        >
          <Cpu size={13} />
          <span>{isScanning ? "Running On-Device WASM..." : "Run On-Device Vision Frame"}</span>
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// REALISTIC BROWSER MOCKUP
// -------------------------------------------------------------
function DesktopBrowserMockup({ project }: { project: ProjectData }) {
  return (
    <div className="w-full max-w-full rounded-2xl bg-[#0B0F17] text-slate-100 border border-slate-800 shadow-2xl overflow-hidden font-sans">
      <div className="flex items-center justify-between px-4 py-3 bg-[#0F1522] border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f06a6a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#f0b74a]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#5fc98e]" />
        </div>
        <div className="flex-1 max-w-xs mx-auto py-1 px-3 rounded-md bg-[#0B0F17] border border-slate-800 text-xs font-mono text-slate-400 text-center truncate">
          https://{project.domain}
        </div>
        <div className="w-8" />
      </div>

      <div className="p-5 bg-[#0B0F17] min-h-[300px] flex flex-col justify-between">
        <div className="group/screen relative w-full h-44 rounded-xl overflow-hidden border border-slate-800/90 mb-4 bg-slate-950">
          <div className="sheen-media-card w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-slate-900/95 via-[#0c1424] to-slate-950">
            <div className="relative z-10 flex flex-col items-center gap-1.5 max-w-xs">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cobalt/20 text-cobalt border border-cobalt/30 font-bold uppercase tracking-wider">
                {project.domain}
              </span>
              <span className="text-sm font-heading font-bold text-slate-200 mt-1">
                {project.title}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.tagline}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-2 border-t border-slate-800/80">
          <span>{project.client}</span>
          <span className="text-emerald-400 font-semibold">{project.metrics[0].value}</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// REALISTIC MOBILE PHONE MOCKUP
// -------------------------------------------------------------
function MobilePhoneMockup({ project }: { project: ProjectData }) {
  return (
    <div className="w-full max-w-[270px] rounded-[36px] bg-slate-950 border-[5px] border-slate-800 shadow-2xl overflow-hidden font-sans p-2 mx-auto">
      <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-2 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
        <div className="w-8 h-1 bg-slate-800 rounded-full" />
      </div>

      <div className="rounded-[24px] bg-slate-900 p-4 min-h-[340px] flex flex-col justify-between text-slate-100">
        <div>
          <div className="text-xs font-mono text-cobalt font-bold uppercase mb-1">
            {project.num} · MOBILE VIEW
          </div>
          <h4 className="font-heading font-extrabold text-sm text-white mb-2 leading-tight">
            {project.title}
          </h4>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mb-3 space-y-1">
            <span className="text-xs font-mono text-slate-400 block">VERIFIED METRIC</span>
            <span className="text-xs font-bold text-emerald-400 block">
              {project.metrics[0].value}
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {project.overview}
          </p>
        </div>

        <div className="pt-2.5 border-t border-slate-800/80 flex items-center justify-around text-xs font-mono text-slate-400">
          <span className="text-cobalt font-bold">Portal</span>
          <span>Telemetry</span>
          <span>Audit</span>
        </div>
      </div>
    </div>
  );
}
