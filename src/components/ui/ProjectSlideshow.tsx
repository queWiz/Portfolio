"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

// ... Keep your 'projects' array here ...
const projects =[
  {
    tag: 'EDGE AI · PWA',
    name: 'Tabayyun',
    desc: 'Offline-first halal scanner for Muslim travelers in Korea. YOLOv8 + Tesseract OCR runs entirely in the browser.',
    metrics:[{ val: '100%', label: 'OFFLINE' }, { val: '<200ms', label: 'INFERENCE' }],
    stack:['React PWA', 'TensorFlow.js', 'YOLOv8', 'Tesseract OCR'],
    code: `const model = await tf.loadGraphModel('./model.json')\nconst result = model.predict(tensor)\n// ✓ halal — no pork derivatives`,
    link: "https://tabayyun-15jmmqpn3-uwais-projects-97ad8443.vercel.app"
  },
  {
    tag: 'RAG · LLM',
    name: 'Drama Discovery',
    desc: 'AI search engine finding dramas by narrative vibe using ChromaDB and LangChain embeddings.',
    metrics:[{ val: 'RAG', label: 'PIPELINE' }, { val: 'Vibe', label: 'SEARCH' }],
    stack:['RAG', 'LangChain', 'ChromaDB', 'FastAPI'],
    code: `def search_by_vibe(query: str):\n  embedding = encoder.encode(query)\n  results = chroma.query(\n    query_embeddings=[embedding], n_results=5\n  )\n  return results['documents']`,
    link: "https://drama-discovery-engine-6glgmcrhm-uwais-projects-97ad8443.vercel.app"
  },
  {
    tag: 'STREAMING · ML',
    name: 'Project Sentinel',
    desc: 'Real-time anomaly detection on a Kafka stream at 50+ events/sec with sub-100ms alert latency.',
    metrics:[{ val: '50+', label: 'EVENTS/SEC' }, { val: '<100ms', label: 'ALERT LAG' }],
    stack:['Kafka', 'Scikit-Learn', 'Docker', 'Isolation Forest'],
    code: `for msg in consumer:\n  score = model.score_samples([parse(msg)])\n  if score < -0.15:\n    alert.send("anomaly", event)\n    # latency: ~80ms avg`,
    link: "https://github.com/queWiz/kafka-telemetry-anomaly-detection"
  },
  {
    tag: 'RAG · FULL STACK',
    name: 'Codex Platform',
    desc: 'Enterprise-grade GenAI analytics engine. Uses vector embeddings and streaming LLM responses to provide hallucination-free contextual answers.',
    metrics:[{ val: 'pgvector', label: 'VECTOR DB' }, { val: 'Edge', label: 'STREAMING' }],
    stack:['Next.js 14', 'Supabase', 'OpenAI', 'TypeScript'],
    code: `const search_codex = async (query: string) => {\n  const embedding = await createEmbedding(query);\n  const { data } = await supabase.rpc('match_docs', {\n    query_embedding: embedding,\n    match_threshold: 0.8\n  });\n  return generateGroundedResponse(data);\n};`,
    link: "https://codex-platform.vercel.app/"
  }
];

export function ProjectSlideshow() {
  const [cur, setCur] = useState(0);
  const[dir, setDir] = useState(1); // 1 for right, -1 for left
  const revealRef = useReveal({ delay: 100 });

  const paginate = (newIndex: number) => {
    setDir(newIndex > cur ? 1 : -1);
    setCur(newIndex);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDir(1);
      setCur((c) => (c + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const p = projects[cur];

  return (
    <div ref={revealRef} className="w-full bg-surface border border-borderWarm rounded-2xl overflow-hidden shadow-2xl">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={cur}
          custom={dir}
          initial={{ opacity: 0, x: dir > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir > 0 ? -50 : 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center"
        >
          {/* Left Side: Info */}
          <div>
            <span className="text-accent-lavender font-mono text-xs tracking-widest font-semibold uppercase">
              {p.tag} · {String(cur + 1).padStart(2, "0")}/{projects.length}
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-cream mt-3 mb-4">{p.name}</h3>
            <p className="text-muted leading-relaxed mb-8">{p.desc}</p>
            
            {/* Metrics */}
            <div className="flex gap-8 mb-8">
              {p.metrics.map((m) => (
                <div key={m.label}>
                  <div className="text-2xl font-bold text-accent-amber">{m.val}</div>
                  <div className="text-[10px] font-mono text-muted mt-1 tracking-widest">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {p.stack.map((s) => (
                <span key={s} className="px-3 py-1 bg-black/40 border border-borderWarm rounded-md text-xs font-mono text-muted">
                  {s}
                </span>
              ))}
            </div>

            <a href={p.link} target="_blank" className="inline-block px-6 py-3 bg-cream text-base font-bold rounded-lg hover:bg-white transition-colors">
              View Live Demo
            </a>
          </div>

          {/* Right Side: Code Window */}
          <div className="bg-[#0a0a0f] border border-borderWarm rounded-xl p-6 font-mono text-sm overflow-x-auto shadow-inner relative">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <pre className="text-accent-lavender leading-relaxed whitespace-pre-wrap">
              {p.code}
            </pre>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Nav */}
      <div className="border-t border-borderWarm px-8 py-4 flex justify-between items-center bg-black/40 relative z-20">
        <div className="flex gap-3">
          {projects.map((_, i) => (
            <button 
              key={i} 
              onClick={() => paginate(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === cur ? "w-6 bg-cream" : "w-2 bg-muted/30 hover:bg-muted"}`} 
            />
          ))}
        </div>
        <div className="flex gap-4">
          <button onClick={() => paginate((cur + projects.length - 1) % projects.length)} className="text-muted hover:text-cream text-2xl transition-colors">←</button>
          <button onClick={() => paginate((cur + 1) % projects.length)} className="text-muted hover:text-cream text-2xl transition-colors">→</button>
        </div>
      </div>
    </div>
  );
}