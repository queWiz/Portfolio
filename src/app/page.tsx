"use client";

import { TopNavbar } from "@/components/ui/LayoutFeatures";
import { Hero } from "@/components/ui/Hero";
import { WorkHeader } from "@/components/ui/WorkHeader";
import { PROJECTS } from "@/components/projects/data";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ProjectShowcase } from "@/components/ui/ProjectShowcase";
import { ApproachSection } from "@/components/ui/ApproachSection";
import { TerminalSection } from "@/components/ui/Terminal";
import { PublicationsSection } from "@/components/ui/PublicationsSection";
import { TrophyList } from "@/components/ui/TrophyList";
import { PixelBreakoutGame } from "@/components/ui/PixelBreakoutGame";
import { AboutSection } from "@/components/ui/AboutSection";
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
        <WorkHeader count={PROJECTS.length} />

        <ProjectShowcase />
      </section>

      {/* --- HOW I WORK (Tabayyun) --- */}
      <ApproachSection />

      {/* --- TERMINAL --- */}
      <TerminalSection />

      {/* --- ABOUT (+ experience) --- */}
      <AboutSection />

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
