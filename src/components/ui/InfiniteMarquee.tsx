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
  // Two identical halves + translateX(-50%) = a seamless loop.
  const items = [...TECHNOLOGIES, ...TECHNOLOGIES];
  return (
    <div
      className="w-full overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      aria-label="Technologies I work with"
    >
      <ul className="flex w-max animate-scroll hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <li
            key={i}
            aria-hidden={i >= TECHNOLOGIES.length}
            className="flex shrink-0 items-center gap-2 pr-12 sm:pr-16 text-muted transition-colors duration-300 hover:text-ink"
          >
            <span className="opacity-70">{tech.icon}</span>
            <span className="text-[14px] text-ink-2">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
