"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { GitHubFeed } from "@/components/ui/StatusWidgets";

function TimelineTrackNode({
  progress,
  threshold,
}: {
  progress: MotionValue<number>;
  threshold: number;
}) {
  const scale = useTransform(progress, [threshold - 0.08, threshold], [0.2, 1], {
    clamp: true,
  });
  const opacity = useTransform(progress, [threshold - 0.08, threshold], [0.35, 1], {
    clamp: true,
  });
  const glow = useTransform(
    progress,
    [threshold - 0.05, threshold, threshold + 0.08],
    [0.4, 1, 0.85],
    { clamp: true }
  );

  return (
    <div className="absolute -left-[15px] sm:-left-[25px] top-8 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
      <motion.div
        style={{ opacity: glow }}
        className="w-5 h-5 rounded-full bg-white dark:bg-[#080C14] border-2 border-cobalt flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.7)]"
      >
        <motion.span
          style={{ scale, opacity }}
          className="w-2 h-2 rounded-full bg-cobalt shadow-[0_0_8px_rgba(37,99,235,0.9)]"
        />
      </motion.div>
    </div>
  );
}

interface Milestone {
  step: string;
  period: string;
  roleType: string;
  title: string;
  institution: string;
  description: string;
  metricValue: string;
  tags: string[];
}

const MILESTONES: Milestone[] = [
  {
    step: "01",
    period: "2018 — 2021",
    roleType: "Academic Distinction",
    title: "Diploma in Information Technology",
    institution: "Nanyang Polytechnic (NYP)",
    description:
      "Graduated in the top 15% of cohort and awarded Director's List honors. Achieved distinctions across Software Engineering, Relational Database Systems, and Network Architecture.",
    metricValue: "Director's List · Top 15% Cohort",
    tags: ["Software Engineering", "Relational DBs", "Network Architecture", "UX Systems"],
  },
  {
    step: "02",
    period: "Sep 2021 — Nov 2021",
    roleType: "Engineering Internship",
    title: "Software Engineer Intern",
    institution: "Aktus MU Kreativ",
    description:
      "Engineered an offline-first Progressive Web App (PWA) attendance tracking system. Trained and integrated a machine learning pricing forecast model that boosted operational revenue by 15% through algorithmic dynamic pricing.",
    metricValue: "+15% Revenue via ML Pricing",
    tags: ["Offline-First PWA", "Machine Learning", "Dynamic Pricing Model", "Frontend Systems"],
  },
  {
    step: "03",
    period: "2024 — Present",
    roleType: "Undergraduate Degree",
    title: "Bachelor of ICT (Software Engineering)",
    institution: "Singapore Institute of Technology (SIT)",
    description:
      "Specializing in enterprise software engineering, scalable distributed architectures, and advanced data analytics. Designing high-throughput data processing pipelines, predictive analytical models, and robust cloud services with quantitative algorithmic discipline.",
    metricValue: "Distributed Systems & Edge AI",
    tags: ["Software Engineering", "Data Analytics", "Distributed Systems", "PostgreSQL", "Next.js"],
  },
];

export function HavuExperienceSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 py-24 z-10"
    >
      {/* Clean Top Hairline */}
      <div className="flex items-center justify-between pt-4 mb-8 border-t border-slate-200/80 dark:border-white/[0.08] text-xs font-mono">
        <div className="flex items-center gap-2.5">
          <span className="text-cobalt font-bold">04 / 06</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider">
            Academic &amp; Industry Track
          </span>
        </div>
        <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">
          2018 — PRESENT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* LEFT COLUMN: STICKY EDITORIAL SECTION */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
              Engineering Progression &amp;<br />Experience.
            </h2>
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Chronological progression across computer science foundations, enterprise software
            engineering internships, and advanced data analytics at SIT. Grounded in distributed
            systems, predictive modeling, and verified production delivery.
          </p>

          <div className="w-full pt-1">
            <GitHubFeed defaultUsername="queWiz" />
          </div>
        </div>

        {/* RIGHT COLUMN: BREATHING EDITORIAL TIMELINE (No Boxed Spreadsheet Cells) */}
        <div className="lg:col-span-7 relative flex flex-col gap-6 pl-6 sm:pl-10 sibling-focus-group">
          <div className="absolute left-2 sm:left-3.5 top-6 bottom-8 w-[2px] bg-slate-200 dark:bg-white/[0.08] rounded-full" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2 sm:left-3.5 top-6 w-[2px] bg-gradient-to-b from-cobalt via-cobalt to-cyan-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.7)] origin-top pointer-events-none"
          />

          {MILESTONES.map((item, index) => {
            const threshold = [0.08, 0.48, 0.88][index];

            return (
              <div
                key={item.step}
                className="sibling-item rounded-2xl bg-white dark:bg-[#101520] border border-slate-200/80 dark:border-white/[0.07] p-6 sm:p-8 shadow-[0_12px_35px_-10px_rgba(15,23,42,0.05)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)] relative hover:border-cobalt/40 transition-all duration-300"
              >
                <TimelineTrackNode
                  progress={smoothProgress}
                  threshold={threshold}
                />

                {/* Open, Breathing Metadata Line */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <span className="text-cobalt font-bold">{item.period}</span>
                    <span>·</span>
                    <span>{item.institution}</span>
                  </div>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                    {item.metricValue}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-950 dark:text-white leading-snug mb-2.5">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100/80 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
