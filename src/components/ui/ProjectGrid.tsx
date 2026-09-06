"use client";
import { Github, ArrowUpRight, Cpu, Layers, Database, Search } from "lucide-react";

interface Project {
  id: string;
  tag: string;
  icon: typeof Cpu;
  name: string;
  tagline: string;
  desc: string;
  pipeline: string;
  metrics: { val: string; label: string }[];
  stack: string[];
  githubUrl: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "sentinel",
    tag: "STREAMING · DISTRIBUTED SYSTEMS",
    icon: Layers,
    name: "Project Sentinel",
    tagline: "Real-time anomaly detection engine on distributed Kafka event streams",
    desc: "Engineered a high-throughput telemetry anomaly detection pipeline processing event streams under continuous load. Uses windowed Isolation Forest inference to detect statistical deviations with sub-100ms alerting latency.",
    pipeline: "Event Producer → Kafka Cluster → Windowed Consumer Buffer → Scikit-Learn Inference → Alert Dispatcher",
    metrics: [
      { val: "50+ msg/s", label: "THROUGHPUT" },
      { val: "<80ms", label: "ALERT LAG" },
      { val: "99.4%", label: "ACCURACY" },
    ],
    stack: ["Apache Kafka", "Python", "Scikit-Learn", "Docker", "Isolation Forest"],
    githubUrl: "https://github.com/queWiz/kafka-telemetry-anomaly-detection",
  },
  {
    id: "tabayyun",
    tag: "EDGE AI · COMPUTER VISION",
    icon: Cpu,
    name: "Tabayyun",
    tagline: "Client-side offline halal ingredient verification via edge neural models",
    desc: "Architected an offline-first PWA for travelers in Korea. Runs YOLOv8 object detection and Tesseract OCR locally in the browser runtime via WebAssembly, guaranteeing zero privacy leakage and offline operability.",
    pipeline: "Camera Capture → Canvas Normalization → YOLOv8 Tensor Detection → OCR Pipeline → Local Ingredient Rules Engine",
    metrics: [
      { val: "100%", label: "OFFLINE" },
      { val: "<180ms", label: "EDGE INFERENCE" },
      { val: "0 KB", label: "API EGRESS" },
    ],
    stack: ["React PWA", "TensorFlow.js", "YOLOv8", "Tesseract OCR", "WASM"],
    githubUrl: "https://github.com/queWiz/Tabayyun",
    liveUrl: "https://tabayyun-15jmmqpn3-uwais-projects-97ad8443.vercel.app",
  },
  {
    id: "drama-discovery",
    tag: "RAG · SEMANTIC SEARCH",
    icon: Search,
    name: "Drama Discovery Engine",
    tagline: "Vector-indexed narrative search surfacing recommendations by vibe",
    desc: "Built a semantic discovery platform that moves beyond rigid genre filters to query dramas by emotional tone and narrative nuances using ChromaDB embeddings and custom similarity matching.",
    pipeline: "Freeform Query → SentenceTransformer Encoding → ChromaDB Cosine Search → FastAPI Filter Middleware → Grounded Rank",
    metrics: [
      { val: "Top-5", label: "GROUNDED RECALL" },
      { val: "<120ms", label: "VECTOR LATENCY" },
      { val: "10k+", label: "EMBEDDED TITLES" },
    ],
    stack: ["FastAPI", "ChromaDB", "LangChain", "Python", "Sentence-Transformers"],
    githubUrl: "https://github.com/queWiz/drama-discovery-engine",
    liveUrl: "https://drama-discovery-engine-6glgmcrhm-uwais-projects-97ad8443.vercel.app",
  },
  {
    id: "codex",
    tag: "FULL STACK · ENTERPRISE RAG",
    icon: Database,
    name: "Codex Platform",
    tagline: "Enterprise GenAI analytics engine with pgvector-grounded responses",
    desc: "Engineered an enterprise documentation query engine using PostgreSQL pgvector RPC for high-precision retrieval and Server-Sent Events (SSE) for low-latency streaming responses with zero hallucinated references.",
    pipeline: "Document Ingestion → Text Chunker → pgvector Similarity RPC → Context Injection → Edge SSE Stream",
    metrics: [
      { val: "0.80", label: "COSINE THRESHOLD" },
      { val: "Edge SSE", label: "STREAMING LATENCY" },
      { val: "Strict", label: "GROUNDING POLICY" },
    ],
    stack: ["Next.js 14", "TypeScript", "Supabase pgvector", "OpenAI API", "Tailwind CSS"],
    githubUrl: "https://github.com/queWiz/Codex-Platform",
    liveUrl: "https://codex-platform.vercel.app/",
  },
];

export function ProjectGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
      {PROJECTS.map((p) => {
        const IconComponent = p.icon;
        return (
          <article
            key={p.id}
            className="group relative bg-[#0a0a0f] border border-borderWarm/80 hover:border-accent-green/50 rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(134,239,172,0.06)]"
          >
            <div>
              {/* Header: Tag + Links */}
              <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-borderWarm/50">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-accent-green/10 text-accent-green border border-accent-green/20">
                    <IconComponent size={14} />
                  </span>
                  <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-accent-lavender">
                    {p.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${p.name} source code on GitHub`}
                    className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-cream px-3 py-1.5 rounded-md bg-white/[0.03] border border-borderWarm hover:border-cream/40 transition-colors"
                  >
                    <Github size={13} />
                    <span className="hidden sm:inline">Source</span>
                  </a>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${p.name} live application`}
                      className="flex items-center gap-1 text-xs font-mono text-black font-semibold px-3 py-1.5 rounded-md bg-cream hover:bg-white transition-colors"
                    >
                      <span>Live</span>
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl font-bold text-cream tracking-tight mb-2 group-hover:text-accent-green transition-colors">
                {p.name}
              </h3>
              <p className="text-xs font-mono text-accent-amber/90 font-medium mb-4">
                {p.tagline}
              </p>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed mb-6 font-normal">
                {p.desc}
              </p>

              {/* Architecture Pipeline Snippet */}
              <div className="mb-6 p-3 rounded-lg bg-black/50 border border-borderWarm/60 font-mono text-[11px]">
                <div className="text-[10px] uppercase tracking-wider text-muted/70 mb-1 font-semibold">
                  Architecture Pipeline:
                </div>
                <div className="text-accent-lavender/90 truncate" title={p.pipeline}>
                  {p.pipeline}
                </div>
              </div>

              {/* Metric Badges */}
              <div className="grid grid-cols-3 gap-3 mb-6 p-3.5 rounded-xl bg-white/[0.02] border border-borderWarm/40">
                {p.metrics.map((m) => (
                  <div key={m.label} className="text-left">
                    <div className="text-base md:text-lg font-bold font-mono text-cream">
                      {m.val}
                    </div>
                    <div className="text-[9px] font-mono text-muted tracking-wider uppercase mt-0.5">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-borderWarm/40">
              {p.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded bg-black/60 border border-borderWarm/70 text-[11px] font-mono text-muted font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
