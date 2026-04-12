"use client";
import { motion } from "framer-motion";

export function TabayyunCard() {
  return (
    <motion.div 
      // Classy breathing animation
      animate={{ 
        boxShadow:["0px 0px 0px rgba(134,239,172,0)", "0px 0px 30px rgba(134,239,172,0.15)", "0px 0px 0px rgba(134,239,172,0)"],
        borderColor:["rgba(134,239,172,0.1)", "rgba(134,239,172,0.3)", "rgba(134,239,172,0.1)"]
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="bg-[#0a0a0f] border border-accent-green/20 rounded-xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-center h-full"
    >
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent-green/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="text-xs tracking-[0.3em] text-accent-green/80 mb-4 font-mono font-bold uppercase">Core Principle</div>
      <h3 className="text-3xl font-bold text-cream mb-6 flex items-center gap-4">
        Tabayyun <span className="text-4xl text-accent-green/40 font-serif font-normal">تبيّن</span>
      </h3>
      
      <p className="text-muted text-base leading-relaxed">
        Technology should clarify, not confuse. Whether validating a high-velocity Kafka stream or shipping an ML model to production, I build systems grounded in verification and data integrity.
        <br/><br/>
      </p>

      <div className="mt-auto border-l-2 border-accent-green/50 pl-4 py-1">
        <p className="text-sm text-cream font-serif italic tracking-wide">
          "Verify it, lest you harm people in ignorance..."
        </p>
        <p className="text-xs text-accent-green/60 font-mono mt-2">— Quran 49:6</p>
      </div>
    </motion.div>
  );
}