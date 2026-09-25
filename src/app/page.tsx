"use client";

import { motion } from "framer-motion";
import { TopNavbar } from "@/components/ui/LayoutFeatures";
import { HeroPixelDrone, HeroPixelBaseline } from "@/components/ui/HeroPixelStage";
import { HeroStatusStrip } from "@/components/ui/HeroStatusStrip";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { ProjectShowcase } from "@/components/ui/ProjectShowcase";
import { ArchitectureLoopSection } from "@/components/ui/ArchitectureLoopSection";
import { InteractiveTerminal } from "@/components/ui/Terminal";
import { GitHubFeed } from "@/components/ui/StatusWidgets";
import { PublicationsSection } from "@/components/ui/PublicationsSection";
import { TrophyList } from "@/components/ui/TrophyList";
import { PixelBreakoutGame } from "@/components/ui/PixelBreakoutGame";
import { Footer } from "@/components/ui/Footer";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Terminal as TerminalIcon,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-[#080C14] text-slate-900 dark:text-[#EFF3F8] flex flex-col items-center relative overflow-x-hidden transition-colors duration-300">
      {/* Floating Glass Pill Header */}
      <TopNavbar />

      {/* --- HERO SECTION --- */}
      <section
        id="home"
        className="relative w-full min-h-[90vh] flex flex-col items-center justify-between pt-28 pb-8 px-4 sm:px-10 lg:px-16 isolate"
      >
        {/* Subtle Radial Gradient + Isometric Dot Grid */}
        <div className="absolute inset-0 isometric-grid-bg pointer-events-none -z-10" />

        {/* Hero Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-cobalt/5 dark:bg-cobalt/[0.08] blur-3xl pointer-events-none -z-10 rounded-full" />

        {/* Unified Main Hero Content Row */}
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
          {/* Left Column: Typographic Identity & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            {/* Kicker Overline */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-[#111622]/80 border border-slate-200/90 dark:border-white/[0.08] shadow-sm mb-6 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.18em] uppercase text-slate-600 dark:text-slate-300">
                Software &amp; Data Engineer · SIT Singapore
              </span>
            </motion.div>

            {/* Oversized Brandmark Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white leading-[1.06] mb-6"
            >
              UWAIS ALQARNI
              <span className="text-cobalt drop-shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                .
              </span>
            </motion.h1>

            {/* Lede Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed mb-8"
            >
              Architecting resilient distributed pipelines, edge AI inference engines,
              and verified full-stack platforms with uncompromising engineering discipline.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              <a
                href="#projects"
                className="btn-nordic px-7 py-3 font-mono text-xs font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
              >
                <span className="bl">
                  <span>EXPLORE CASE STUDIES ↓</span>
                  <span>VIEW ARCHITECTURE</span>
                </span>
              </a>

              <a
                href="#terminal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-white/[0.12] bg-white/60 dark:bg-white/[0.04] text-xs font-mono font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.08] hover:border-slate-400 transition-all shadow-sm"
              >
                <TerminalIcon size={14} className="text-cobalt" />
                <span>LAUNCH CLI ⌁</span>
              </a>

              <a
                href="mailto:ualqarni70@gmail.com"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 hover:text-cobalt transition-colors"
              >
                <span>Get in Touch ↗</span>
              </a>
            </motion.div>

            {/* Real Engineering Status Strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <HeroStatusStrip />
            </motion.div>
          </div>

          {/* Right Column: Open Floating Havu-Style Pixel Drone (5 cols, seamless in open sky) */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <HeroPixelDrone />
          </div>
        </div>

        {/* Full-width continuous baseline spanning bottom of entire Hero */}
        <div className="w-full max-w-7xl mt-6">
          <HeroPixelBaseline />
        </div>
      </section>

      {/* --- RUNTIME CAPABILITIES MARQUEE --- */}
      <section className="w-full z-10">
        <InfiniteMarquee />
      </section>

      {/* --- FLAGSHIP PROJECTS: VERTICAL STAGGERED DEEP-DIVES --- */}
      <section
        id="projects"
        className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 py-24 z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-200/80 dark:border-white/[0.08]"
        >
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-8 h-0.5 bg-cobalt" />
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
                SELECTED WORKS · 2024 — 2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white">
              Engineered Systems &amp;<br />Client Platforms.
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Four production architectures delivered for real-world Singapore clients,
            offline-first edge devices, and event-driven data streaming.
          </p>
        </motion.div>

        {/* Vertical Staggered Case Studies */}
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200/80 dark:border-white/[0.08]"
        >
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-8 h-0.5 bg-cobalt" />
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
                DEVELOPER CONSOLE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white">
              Interactive Candidate Terminal.
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Direct CLI access to candidate background, stack proficiencies, target roles,
            and verification standards.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <InteractiveTerminal />
        </motion.div>
      </section>

      {/* --- EXPERIENCE TIMELINE & LIVE ACTIVITY --- */}
      <section
        id="experience"
        className="w-full max-w-7xl px-4 sm:px-10 lg:px-12 py-20 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-slate-200/80 dark:border-white/[0.08]"
        >
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-8 h-0.5 bg-cobalt" />
              <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
                ACADEMIC &amp; INDUSTRY TRACK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-slate-950 dark:text-white">
              Experience &amp; Live Activity.
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Continuous engineering progression across computer science degrees, production
            internships, and real-time open-source commits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left: 2 Columns for Experience Timeline */}
          <div className="lg:col-span-2 space-y-5">
            {/* Experience Item 01 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#111622] hover:border-cobalt/40 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono text-cobalt uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-cobalt/10 border border-cobalt/20 flex items-center gap-1.5">
                  <GraduationCap size={13} /> 2024 — Present
                </span>
                <span className="text-xs font-mono text-slate-400">Undergraduate</span>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
                Bachelor of ICT (Software Engineering)
              </h3>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                Singapore Institute of Technology (SIT)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Focused on distributed systems, enterprise software architecture, cloud-native
                microservices, and relational schema engineering. Delivering client-verified
                systems and automated Playwright regression testing suites.
              </p>
            </motion.div>

            {/* Experience Item 02 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#111622] hover:border-cobalt/40 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono text-cobalt uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-cobalt/10 border border-cobalt/20 flex items-center gap-1.5">
                  <Briefcase size={13} /> Sep 2021 — Nov 2021
                </span>
                <span className="text-xs font-mono text-slate-400">Internship</span>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
                Software Engineer Intern
              </h3>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                Aktus MU Kreativ
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Engineered an offline-first Progressive Web App (PWA) attendance tracking system.
                Trained and deployed a machine learning pricing forecast model that boosted operational
                revenue by 15% through algorithmic dynamic pricing.
              </p>
            </motion.div>

            {/* Experience Item 03 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 sm:p-7 rounded-2xl border border-slate-200/90 dark:border-white/[0.08] bg-white dark:bg-[#111622] hover:border-cobalt/40 shadow-sm transition-all duration-300"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono text-cobalt uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-full bg-cobalt/10 border border-cobalt/20 flex items-center gap-1.5">
                  <BookOpen size={13} /> 2018 — 2021
                </span>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
                  Director&apos;s List (Top 15%)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
                Diploma in Information Technology
              </h3>
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-3">
                Nanyang Polytechnic (NYP)
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Awarded Director&apos;s List honors for graduating in the top 15% of the cohort.
                Distinctions in UX Design and Networking Technology.
              </p>
            </motion.div>
          </div>

          {/* Right: 1 Column for Live GitHub Commit Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-1"
          >
            <GitHubFeed defaultUsername="queWiz" />
          </motion.div>
        </div>
      </section>

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-0.5 bg-cobalt" />
          <span className="text-xs font-mono text-cobalt font-bold uppercase tracking-[0.25em]">
            CREDENTIALS &amp; DISTINCTIONS
          </span>
        </motion.div>
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