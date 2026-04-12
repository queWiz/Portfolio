"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Replace these with your actual screenshots in the /public folder
const IMAGES =[
  "/tabayyun-demo.jpg",  // e.g. the UI of Tabayyun
  "/codex-graph.jpg",    // e.g. the RAG chart
  "/sentinel-dash.jpg",  // e.g. anomaly detection dashboard
  "/code-snippet.jpg",   // e.g. a cool snippet of your python code
];

export const DynamicGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-cycle through images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  },[]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={IMAGES[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          alt="Project Showcase"
        />
      </AnimatePresence>
      
      {/* Soft gradient overlay to ensure text on top is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      <div className="absolute bottom-6 left-6 right-6">
        <h3 className="text-3xl font-bold text-white mb-6">Deep Work Showcase</h3>
        <p className="text-neutral-300 text-sm">A visual journey through my system architectures and user interfaces.</p>
      </div>
    </div>
  );
};