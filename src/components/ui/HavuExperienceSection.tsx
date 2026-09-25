"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GraduationCap, Briefcase, BookOpen } from "lucide-react";
import { GitHubFeed } from "@/components/ui/StatusWidgets";

interface Milestone {
  step: string;
  period: string;
  roleType: string;
  title: string;
  institution: string;
  description: string;
  icon: typeof GraduationCap;
  tags: string[];
  highlight?: string;
}

const MILESTONES: Milestone[] = [
  {
    step: "01",
    period: "2024 — Present",
    roleType: "Undergraduate Degree",
    title: "Bachelor of ICT (Software Engineering)",
    institution: "Singapore Institute of Technology (SIT)",
    description:
      "Specializing in distributed systems architecture, enterprise cloud-native microservices, relational schema design, and deterministic automated testing. Authoring client-verified production systems with 100% Playwright test pass rates.",
    icon: GraduationCap,
    tags: ["Distributed Systems", "PostgreSQL", "Next.js SSR", "Playwright", "PDPA Compliance"],
  },
  {
    step: "02",
    period: "Sep 2021 — Nov 2021",
    roleType: "Engineering Internship",
    title: "Software Engineer Intern",
    institution: "Aktus MU Kreativ",
    description:
      "Engineered an offline-first Progressive Web App (PWA) attendance tracking system. Trained and integrated a machine learning pricing forecast model that boosted operational revenue by 15% through algorithmic dynamic pricing.",
    icon: Briefcase,
    tags: ["Offline-First PWA", "Machine Learning", "Dynamic Pricing Model", "Frontend Systems"],
  },
  {
    step: "03",
    period: "2018 — 2021",
    roleType: "Academic Distinction",
    title: "Diploma in Information Technology",
    institution: "Nanyang Polytechnic (NYP)",
    description:
      "Graduated in the top 15% of cohort and awarded Director's List honors. Achieved distinctions across UX Design, Relational Database Systems, and Network Architecture.",
    icon: BookOpen,
    highlight: "Director's List (Top 15%)",
    tags: ["Director's List", "Top 15% Cohort", "UX Design", "Network Architecture", "Relational DBs"],
  },
];

export function HavuExperienceSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll progress through the entire timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth spring for line filling (bi-directional, no jitter)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  // Scale line height from 0% to 100%
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 py-24 z-10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* 
          LEFT COLUMN: STICKY EDITORIAL SECTION (Havu Inspiration - Screenshots 3 & 4)
          Pins neatly at eye level on desktop as user scrolls through the timeline milestones.
        */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-0.5 bg-cobalt" />
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
                03 — ACADEMIC &amp; INDUSTRY TRACK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
              Engineering Progression &amp;<br />Experience.
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400 leading-relaxed">
            Continuous progression across computer science degrees, production internships,
            and real-time open-source commits. Grounded in deterministic regression testing,
            relational schemas, and verified delivery.
          </p>

          {/* Quick Active Milestone Indicator */}
          <div className="hidden lg:flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/[0.08] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping" />
            <div className="text-xs font-mono text-slate-700 dark:text-slate-300">
              <strong className="text-cobalt">LIVE TRACK:</strong> 3 Progressive Milestones
            </div>
          </div>

          {/* Live GitHub Status Feed Mounted Directly on the Sticky Side */}
          <div className="w-full pt-2">
            <GitHubFeed defaultUsername="queWiz" />
          </div>
        </div>

        {/* 
          RIGHT COLUMN: TIMELINE WITH CONTINUOUS SCROLL-LINKED FILL LINE (Screenshot 1)
          AND BI-DIRECTIONAL STACKING CARDS (Screenshot 2)
        */}
        <div className="lg:col-span-7 relative flex flex-col gap-8 sm:gap-10 pl-6 sm:pl-10">
          {/* Vertical Track Background Line */}
          <div className="absolute left-2 sm:left-3.5 top-6 bottom-12 w-[2px] bg-slate-200 dark:bg-white/[0.08] rounded-full" />

          {/* Bi-Directional Animated Fill Line (Cobalt) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-2 sm:left-3.5 top-6 w-[2px] bg-gradient-to-b from-cobalt via-cobalt to-cyan-400 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.7)] origin-top pointer-events-none"
          />

          {/* Stacking Milestone Cards */}
          {MILESTONES.map((item, idx) => {
            const Icon = item.icon;
            // Sticky top offsets create the seamless deck-of-cards stacking effect from Screenshot 2
            const stickyTop = 110 + idx * 24;

            return (
              <div
                key={item.step}
                style={{ top: `${stickyTop}px` }}
                className="sticky rounded-3xl bg-white dark:bg-[#111622] border border-slate-200/90 dark:border-white/[0.08] p-6 sm:p-8 shadow-[0_8px_30px_-8px_rgba(15,23,42,0.08)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-shadow duration-300 relative group hover:border-cobalt/40"
              >
                {/* Milestone Node on the Timeline Track (Screenshot 1) */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-7 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-white dark:bg-[#080C14] border-2 border-cobalt flex items-center justify-center shadow-[0_0_12px_rgba(37,99,235,0.5)] group-hover:scale-125 transition-transform duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                  </div>
                </div>

                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-extrabold text-cobalt tracking-wider">
                      STEP {item.step}
                    </span>
                    <span className="text-slate-300 dark:text-slate-600">/</span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      {item.roleType}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-medium">
                    {item.period}
                  </span>
                </div>

                {/* Title & Organization */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className="p-2.5 rounded-xl bg-cobalt/10 border border-cobalt/20 text-cobalt shrink-0 mt-0.5">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-950 dark:text-white leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono text-cobalt font-semibold mt-0.5">
                      {item.institution}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-5">
                  {item.description}
                </p>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-white/[0.06]">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-50 dark:bg-[#141B28] text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/[0.06]"
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
