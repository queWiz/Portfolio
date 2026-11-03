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
import { RecognitionSection } from "@/components/ui/TrophyList";
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

      {/* --- RESEARCH --- */}
      <PublicationsSection />

      {/* --- RECOGNITION --- */}
      <RecognitionSection />

      {/* --- ARCADE (easter egg: click the walking engineer) --- */}
      <section className="w-full z-10">
        <PixelBreakoutGame />
      </section>

      {/* --- FOOTER --- */}
      <Footer />
    </main>
  );
}
