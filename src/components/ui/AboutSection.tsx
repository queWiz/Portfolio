"use client";
import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="max-w-6xl w-full py-32 grid md:grid-cols-2 gap-16 items-center relative z-10">
      
      {/* Left: Text */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-6">
          <span className="text-blue-500">def</span> philosophy(<span className="text-green-400">self</span>):
        </h2>
        <p className="text-neutral-400 text-lg leading-relaxed mb-6">
          I don't just write code; I engineer <strong className="text-white">reliability</strong>. 
          In a world of messy data and slow pipelines, I build systems that bring order to chaos.
        </p>
        <p className="text-neutral-400 text-lg leading-relaxed">
          My approach is grounded in the principles of <strong className="text-white">Tabayyun</strong> (Verification). 
          Whether it's validating a Kafka stream or cross-referencing food additives, 
          I believe technology should clarify, not confuse.
        </p>
      </motion.div>

      {/* Right: Visual (Code Block Aesthetic) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 blur-3xl opacity-20" />
        <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 p-8 shadow-2xl">
          <div className="space-y-4 font-mono text-sm text-neutral-500">
            <div className="flex gap-4">
              <span>01</span>
              <span className="text-neutral-300">Scalability &gt; Complexity</span>
            </div>
            <div className="flex gap-4">
              <span>02</span>
              <span className="text-neutral-300">Data Integrity is paramount</span>
            </div>
            <div className="flex gap-4">
              <span>03</span>
              <span className="text-neutral-300">Latency kills UX</span>
            </div>
            <div className="flex gap-4">
              <span>04</span>
              <span className="text-blue-400">return</span> <span className="text-green-400">True</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};