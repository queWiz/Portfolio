"use client";
import { StarsCanvas } from "@/components/ui/StarBackground"; 
import { HeroCanvas } from "@/components/ui/HeroCanvas";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { ProjectSlideshow } from "@/components/ui/ProjectSlideshow";
import { InteractiveTerminal } from "@/components/ui/Terminal";
import { TabayyunCard } from "@/components/ui/TabayyunCard";
import { GitHubFeed } from "@/components/ui/StatusWidgets";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { TopNavbar } from "@/components/ui/LayoutFeatures";
import { useReveal } from "@/hooks/useReveal";
import { motion } from "framer-motion";
import { TrophyList } from "@/components/ui/TrophyList";

export default function Home() {
  const terminalRef = useReveal({ delay: 0 });
  const workRef = useReveal({ delay: 0 });
  const experienceRef = useReveal({ delay: 0 });
  const trophyRef = useReveal({ delay: 0 });

  return (
    <main className="min-h-screen bg-base flex flex-col items-center relative overflow-x-hidden selection:bg-accent-green selection:text-black">
      <TopNavbar />

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative isolate w-full min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <StarsCanvas />
        </div>
        
        <HeroCanvas />

        <div className="max-w-[90rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 md:px-12 relative z-10 pointer-events-none">
          
          <div className="flex flex-col justify-center max-w-2xl pointer-events-auto">
            <div className="flex items-center gap-6 mb-8">
              <div className="inline-flex items-center gap-2 bg-accent-green/10 border border-accent-green/30 rounded-full px-4 py-2 shadow-[0_0_15px_rgba(134,239,172,0.15)]">
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-accent-green">Open to Work</span>
              </div>
            </div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-bold text-cream mb-6 tracking-tighter"
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
            >
              Uwais Alqarni
            </motion.h1>
            
            <p className="text-sm font-mono text-accent-lavender font-bold mb-8 uppercase tracking-[0.3em]">
              Software Engineer · Data Engineer · SIT
            </p>
            
            <p className="text-muted text-xl leading-relaxed mb-10 font-medium">
              I am a Software Engineer who builds end-to-end systems. From architecting high-throughput data pipelines to crafting seamless, AI-driven user experiences, I solve complex problems across the entire stack.
            </p>

            <div className="flex gap-4 mb-12">
              <a href="#work" className="px-8 py-3 bg-cream text-base font-bold text-black rounded-lg hover:bg-white transition-colors shadow-lg">
                View Work
              </a>
              <a href="mailto:ualqarni70@gmail.com" className="px-8 py-3 border border-borderWarm text-cream font-bold rounded-lg hover:bg-surface transition-colors">
                Get in Touch
              </a>
            </div>

            <div className="max-w-md hidden md:block">
               <CodeWindow />
            </div>
          </div>
          
          {/* We removed the right-side grid column div for the canvas, because HeroCanvas is now absolute over everything */}
        </div>
      </section>

      {/* --- INFINITE MARQUEE --- */}
      <section className="w-full bg-[rgba(245,240,232,0.02)] z-10">
         <InfiniteMarquee />
      </section>

      {/* --- ABOUT & PHILOSOPHY --- */}
      <section ref={terminalRef} id="about" className="w-full max-w-[90rem] px-6 md:px-12 mt-16 mb-24 z-10">
        <h2 className="text-m font-mono text-muted font-bold mb-12 uppercase tracking-[0.3em] flex items-center gap-4">
          <span className="w-12 h-px bg-borderWarm"></span> About & Philosophy
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InteractiveTerminal />
          <TabayyunCard />
        </div>
      </section>

      <SectionDivider />

      {/* --- PROJECTS SLIDESHOW --- */}
      <section ref={workRef} id="work" className="w-full bg-[rgba(245,240,232,0.02)] py-20 px-6 md:px-12 mb-20 z-10 flex justify-center">
        <div className="max-w-[90rem] w-full">
          <h2 className="text-m font-mono text-accent-green font-bold mb-12 uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="w-12 h-px bg-borderWarm"></span> Selected Works
          </h2>
          <ProjectSlideshow />
        </div>
      </section>

      {/* --- EXPERIENCE & ACTIVITY (Side by Side) --- */}
      <section ref={experienceRef} className="w-full max-w-[90rem] px-6 md:px-12 mb-20 z-10 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left: Experience Timeline (Takes up 2 columns) */}
        <div className="lg:col-span-2">
          <h2 className="text-m font-mono text-accent-green font-bold mb-12 uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="w-12 h-px bg-borderWarm"></span> Experience
          </h2>
          
          <div className="space-y-12 border-l border-borderWarm ml-3 pl-10 relative">
            <div className="relative">
              <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-base border-2 border-accent-lavender rounded-full" />
              <div className="text-xs font-mono text-accent-lavender font-bold tracking-widest uppercase mb-2">2024 — Present</div>
              <h3 className="text-xl font-bold text-cream">Bachelor of ICT (Software Engineering)</h3>
              <div className="text-sm text-accent-amber font-mono mt-1 mb-4">Singapore Institute of Technology</div>
              <p className="text-muted text-base leading-relaxed">Specializing in Software Engineering.</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-base border-2 border-borderWarm rounded-full" />
              <div className="text-xs font-mono text-muted font-bold tracking-widest uppercase mb-2">Sep 2021 — Nov 2021</div>
              <h3 className="text-xl font-bold text-cream">Software Engineer Intern</h3>
              <div className="text-sm text-accent-amber font-mono mt-1 mb-4">Aktus MU Kreativ</div>
              <p className="text-muted text-base leading-relaxed">Built an offline-first PWA attendance system. Deployed a pricing forecast ML model that increased revenue by 15% through smarter pricing strategies.</p>
            </div>

            <div className="relative">
              <div className="absolute -left-[45px] top-1.5 w-3 h-3 bg-base border-2 border-borderWarm rounded-full" />
              <div className="text-xs font-mono text-muted font-bold tracking-widest uppercase mb-2">2018 - 2021</div>
              <h3 className="text-xl font-bold text-cream">Diploma in Information Technology</h3>
              <div className="text-sm text-accent-amber font-mono mt-1 mb-4">Nanyang Polytechnic</div>
              <p className="text-muted text-base leading-relaxed">Distinctions in UX Design and Networking Technology. Director&apos;s List (Top 15%)</p>
            </div>

          </div>
        </div>

        {/* Right: GitHub Activity Feed (Visible!) */}
        <div className="lg:col-span-1">
          <h2 className="text-m font-mono text-accent-green font-bold mb-12 uppercase tracking-[0.3em] flex items-center gap-4">
            <span className="w-12 h-px bg-borderWarm"></span> Activity
          </h2>

          <GitHubFeed username="queWiz" />
        </div>

      </section>

      <SectionDivider />

      <section ref={trophyRef} className="w-full bg-[rgba(245,240,232,0.02)] py-16 px-6 md:px-12 mb-16 z-10 flex justify-center">
        <TrophyList />
      </section>

    </main>
  );
}

// --- ELEGANT SECTION DIVIDER ---
function SectionDivider() {
  return (
    <div className="w-full flex justify-center py-16 z-10 pointer-events-none">
      {/* 
        max-w-5xl ensures it doesn't stretch too far.
        bg-gradient-to-r creates the fade effect: transparent -> solid -> transparent 
      */}
      <div className="w-full max-w-7xl h-[3px] bg-gradient-to-r from-transparent via-borderWarm to-transparent opacity-90" />
    </div>
  );
}