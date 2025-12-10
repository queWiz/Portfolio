"use client";
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const ROTATION_RANGE = 20; // Degrees the card tilts
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export const ProjectCard = ({
  title,
  description,
  tags,
  repoLink,
  demoLink,
  color = "#007AFF", // Default color
}: {
  title: string;
  description: string;
  tags: string[];
  repoLink?: string;
  demoLink?: string;
  color?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to the card (0 to 1)
    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    // Convert to rotation degrees
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-full rounded-xl bg-neutral-900 border border-neutral-800 p-8"
    >
      <div 
        style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
        className="relative z-10 pointer-events-none"
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl"
            style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}40` }}
          >
            {title[0]} {/* First Letter Icon */}
          </div>
          
          <div className="flex gap-3 pointer-events-auto">
            {repoLink && (
              <a href={repoLink} target="_blank" className="p-2 bg-black/50 rounded-full hover:text-white text-neutral-400 transition-colors">
                <Github size={18} />
              </a>
            )}
            {demoLink && (
              <a href={demoLink} target="_blank" className="p-2 bg-black/50 rounded-full hover:text-white text-neutral-400 transition-colors">
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 leading-relaxed text-sm mb-6">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-mono px-2 py-1 rounded bg-black/30 border border-neutral-800 text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Decorative Gradient Background */}
      <div 
        className="absolute inset-0 z-0 rounded-xl opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}, transparent 70%)`
        }}
      />
    </motion.div>
  );
};