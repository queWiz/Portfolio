import { Terminal, Database, Cpu, Globe, Server, Code, Layers, Box } from "lucide-react";

const TECHNOLOGIES = [
  { name: "Python", icon: <Terminal size={20} /> },
  { name: "Kafka", icon: <Layers size={20} /> },
  { name: "TensorFlow", icon: <Cpu size={20} /> },
  { name: "PostgreSQL", icon: <Database size={20} /> },
  { name: "Next.js", icon: <Globe size={20} /> },
  { name: "Docker", icon: <Box size={20} /> },
  { name: "FastAPI", icon: <Server size={20} /> },
  { name: "TypeScript", icon: <Code size={20} /> },
];

export const InfiniteMarquee = () => {
  return (
    <div className="w-full overflow-hidden border-y border-neutral-900 bg-neutral-950/50 py-10 relative z-10 backdrop-blur-sm">
      <div className="flex w-max animate-scroll gap-16 px-16 hover:[animation-play-state:paused]">
        {/* Render twice to create seamless loop */}
        {[...TECHNOLOGIES, ...TECHNOLOGIES].map((tech, i) => (
          <div key={i} className="flex items-center gap-3 text-neutral-400 group cursor-default">
            <span className="group-hover:text-blue-400 transition-colors">{tech.icon}</span>
            <span className="font-mono text-lg font-bold group-hover:text-white transition-colors">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};