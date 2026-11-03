"use client";

import { motion } from "framer-motion";
import { TopNavbar } from "@/components/ui/LayoutFeatures";
import { Hero } from "@/components/ui/Hero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ProjectShowcase } from "@/components/ui/ProjectShowcase";
import { ArchitectureLoopSection } from "@/components/ui/ArchitectureLoopSection";
import { InteractiveTerminal } from "@/components/ui/Terminal";
import { PublicationsSection } from "@/components/ui/PublicationsSection";
import { TrophyList } from "@/components/ui/TrophyList";
import { PixelBreakoutGame } from "@/components/ui/PixelBreakoutGame";
import { HavuExperienceSection } from "@/components/ui/HavuExperienceSection";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="min-h-screen paper-grain text-ink flex flex-col items-center relative overflow-x-clip transition-colors duration-300">
      {/* Floating Glass Pill Header */}
      <TopNavbar />

      <Hero />

      {/* --- RUNTIME CAPABILITIES MARQUEE --- */}
      <section className="w-full z-10">
        <InfiniteMarquee />
      </section>

      {/* --- WORK --- */}
      <section id="projects" className="w-full max-w-6xl px-5 sm:px-10 lg:px-0 pt-28 pb-24 scroll-mt-20">
        <SectionHeader
          index="01"
          eyebrow="Work"
          title="Selected work,"
          titleMuted="from client platforms to on-device AI."
          aside={<>Five projects from the last two years, from real screens to small interactive sketches. Open any card for the full story.</>}
        />

        <ProjectShowcase />

        {/* Tabayyun Verification Methodology & Operating Loop */}
        <div className="mt-24">
          <ArchitectureLoopSection />
        </div>
      </section>

      {/* --- CANDIDATE INTERACTIVE TERMINAL (CLI) --- */}
      <section
        id="terminal"
        className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 py-20 z-10"
      >
        {/* Structural Editorial Index Bar (03 / 06) */}
        <div className="flex items-center justify-between pt-4 mb-6 border-t border-slate-200/90 dark:border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-cobalt/10 text-cobalt font-bold border border-cobalt/20">
              03 / 06
            </span>
            <span className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider">
              Developer Console
            </span>
          </div>
          <span className="text-slate-400 dark:text-slate-500">
            INTERACTIVE DOSSIER · CLI
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="overflow-hidden pb-1 -mb-1">
            <motion.h2
              initial={{ y: "100%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl font-heading font-semibold tracking-[-0.035em] text-slate-950 dark:text-white"
            >
              Interactive Candidate Terminal.
            </motion.h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Direct CLI access to candidate background, stack proficiencies, target roles,
            and verification standards.
          </p>
        </div>

        <InteractiveTerminal />
      </section>

      {/* --- HAVU-STYLE STICKY EXPERIENCE TIMELINE & LIVE ACTIVITY --- */}
      <HavuExperienceSection />

      {/* --- PEER-REVIEWED PUBLICATIONS --- */}
      <section
        id="publications"
        className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 py-16 z-10"
      >
        <PublicationsSection />
      </section>

      {/* --- HONORS & CREDENTIALS --- */}
      <section
        id="honors"
        className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 pb-24 z-10"
      >
        {/* Structural Editorial Index Bar (06 / 06) */}
        <div className="flex items-center justify-between pt-4 mb-6 border-t border-slate-200/90 dark:border-white/[0.08] text-xs font-mono">
          <div className="flex items-center gap-2.5">
            <span className="px-2 py-0.5 rounded bg-cobalt/10 text-cobalt font-bold border border-cobalt/20">
              06 / 06
            </span>
            <span className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider">
              Credentials &amp; Distinctions
            </span>
          </div>
          <span className="text-slate-400 dark:text-slate-500">
            ACADEMIC HONORS &amp; CERTIFICATIONS
          </span>
        </div>
        <TrophyList />
      </section>

      {/* --- HAVU-STYLE INTERACTIVE PIXEL BREAKOUT GAME --- */}
      <section className="w-full z-10">
        <PixelBreakoutGame />
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </main>
  );
}
