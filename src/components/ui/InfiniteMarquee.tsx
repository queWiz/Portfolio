import {
  Terminal,
  Database,
  Globe,
  Server,
  Code,
  Layers,
  Box,
  ShieldCheck,
  Cpu as Chip,
} from "lucide-react";

const TECHNOLOGIES = [
  { name: "Next.js 15 (App Router)", icon: <Globe size={16} /> },
  { name: "Python", icon: <Terminal size={16} /> },
  { name: "Apache Kafka", icon: <Layers size={16} /> },
  { name: "Supabase / PostgreSQL", icon: <Database size={16} /> },
  { name: "WebAssembly (WASM)", icon: <Chip size={16} /> },
  { name: "Playwright (E2E / PDPA)", icon: <ShieldCheck size={16} /> },
  { name: "Docker Compose", icon: <Box size={16} /> },
  { name: "TypeScript", icon: <Code size={16} /> },
  { name: "FastAPI", icon: <Server size={16} /> },
];

export const InfiniteMarquee = () => {
  return (
    <div className="w-full relative overflow-hidden border-y border-slate-200/80 dark:border-white/[0.08] bg-white/60 dark:bg-[#080C14]/60 py-5 backdrop-blur-md">
      {/* Edge gradient masks for seamless fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#F8F9FA] dark:from-[#080C14] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#F8F9FA] dark:from-[#080C14] to-transparent z-10" />

      <div className="flex w-max animate-scroll gap-12 sm:gap-16 px-8 hover:[animation-play-state:paused]">
        {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 group cursor-default transition-all"
          >
            <div className="p-1.5 rounded-md bg-slate-100 dark:bg-white/[0.05] group-hover:text-cobalt group-hover:bg-cobalt/10 transition-colors">
              {tech.icon}
            </div>
            <span className="font-mono text-xs font-semibold tracking-tight text-slate-700 dark:text-slate-200 group-hover:text-cobalt transition-colors">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};