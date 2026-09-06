"use client";
import { useState, useEffect } from "react";
import { Terminal as TerminalIcon, Activity } from "lucide-react";

interface TelemetryEvent {
  id: string;
  time: string;
  stream: "KAFKA" | "EDGE_AI" | "TABAYYUN" | "VECTOR";
  msg: string;
  status: "OK" | "SYNC" | "VERIFIED" | "ALERT";
}

const SEED_EVENTS: TelemetryEvent[] = [
  {
    id: "e1",
    time: "11:20:04.102",
    stream: "KAFKA",
    msg: "Consumer group 'sentinel_stream': partition 0 offset #148920 committed (lag: 14ms)",
    status: "SYNC",
  },
  {
    id: "e2",
    time: "11:20:04.288",
    stream: "EDGE_AI",
    msg: "Tabayyun ONNX WebAssembly: YOLOv8-nano inference complete (lat: 172ms, 0 API egress)",
    status: "OK",
  },
  {
    id: "e3",
    time: "11:20:04.450",
    stream: "TABAYYUN",
    msg: "Tabayyun Assertion: schema verified across 48 batch records before compute dispatch",
    status: "VERIFIED",
  },
  {
    id: "e4",
    time: "11:20:04.712",
    stream: "VECTOR",
    msg: "ChromaDB: Top-K cosine similarity query evaluated in 84ms (dim: 384)",
    status: "OK",
  },
  {
    id: "e5",
    time: "11:20:05.021",
    stream: "KAFKA",
    msg: "IsolationForest window [1000 items]: anomaly_score=-0.041 (within normal bounds)",
    status: "SYNC",
  },
];

export function TelemetryStream() {
  const [events, setEvents] = useState<TelemetryEvent[]>(SEED_EVENTS);

  useEffect(() => {
    const generatorInterval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0] + "." + String(now.getMilliseconds()).padStart(3, "0");

      const streamTypes = ["KAFKA", "EDGE_AI", "TABAYYUN", "VECTOR"] as const;
      const chosenStream = streamTypes[Math.floor(Math.random() * streamTypes.length)];

      let msg = "";
      let status: "OK" | "SYNC" | "VERIFIED" | "ALERT" = "OK";

      if (chosenStream === "KAFKA") {
        const lag = 12 + Math.floor(Math.random() * 18);
        msg = `Consumer group 'sentinel_stream': batch partition ACK (lag: ${lag}ms, 52 msg/s)`;
        status = "SYNC";
      } else if (chosenStream === "EDGE_AI") {
        const lat = 160 + Math.floor(Math.random() * 25);
        msg = `Tabayyun Edge: WebAssembly YOLOv8 inference cycle complete (lat: ${lat}ms)`;
        status = "OK";
      } else if (chosenStream === "TABAYYUN") {
        msg = "Tabayyun Assertion: data sanitization verified; 0 schema divergence";
        status = "VERIFIED";
      } else {
        const queryLat = 75 + Math.floor(Math.random() * 30);
        msg = `ChromaDB: cosine nearest-neighbor search resolved in ${queryLat}ms`;
        status = "OK";
      }

      const newEvent: TelemetryEvent = {
        id: Math.random().toString(36).substring(2, 9),
        time: timeStr,
        stream: chosenStream,
        msg,
        status,
      };

      setEvents((prev) => [...prev.slice(1), newEvent]);
    }, 2800);

    return () => clearInterval(generatorInterval);
  }, []);

  return (
    <div className="w-full rounded-xl border border-borderWarm/90 bg-[#0a0a0f] overflow-hidden shadow-2xl font-mono text-xs relative z-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-borderWarm/70">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 text-muted font-bold text-[11px] flex items-center gap-1.5">
            <TerminalIcon size={12} className="text-accent-lavender" />
            telemetry.pipe.sh
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-green/10 border border-accent-green/30">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          <span className="text-[9px] uppercase tracking-wider text-accent-green font-bold flex items-center gap-1">
            <Activity size={10} /> LIVE STREAM
          </span>
        </div>
      </div>

      {/* Stream Content */}
      <div className="p-4 space-y-2 text-[11px] leading-relaxed bg-[#0a0a0f]/95">
        {events.map((e) => (
          <div key={e.id} className="flex items-start gap-2.5 border-b border-white/[0.02] pb-1.5 last:border-0 last:pb-0">
            <span className="text-muted/60 select-none shrink-0 font-mono text-[10px]">
              {e.time}
            </span>

            <span
              className={`shrink-0 px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider ${
                e.stream === "KAFKA"
                  ? "bg-accent-lavender/10 text-accent-lavender border border-accent-lavender/20"
                  : e.stream === "EDGE_AI"
                  ? "bg-accent-green/10 text-accent-green border border-accent-green/20"
                  : e.stream === "TABAYYUN"
                  ? "bg-accent-amber/10 text-accent-amber border border-accent-amber/20"
                  : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              }`}
            >
              {e.stream}
            </span>

            <span className="text-cream/90 flex-1 truncate font-mono">
              {e.msg}
            </span>

            <span
              className={`text-[9px] font-bold shrink-0 ${
                e.status === "VERIFIED"
                  ? "text-accent-green"
                  : e.status === "SYNC"
                  ? "text-accent-lavender"
                  : "text-muted"
              }`}
            >
              [{e.status}]
            </span>
          </div>
        ))}
      </div>

      {/* Footer Banner */}
      <div className="px-4 py-2 border-t border-borderWarm/40 bg-black/40 flex items-center justify-between text-[10px] text-muted font-mono">
        <span>TOPICS: sentinel-events · onnx-edge · tabayyun-rules</span>
        <span className="text-accent-green font-bold">STATUS: 0 ERRORS</span>
      </div>
    </div>
  );
}
