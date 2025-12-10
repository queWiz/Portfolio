"use client";
import { StarsCanvas } from "@/components/ui/StarBackground"; // 3D Stars
import { SpotlightCard } from "@/components/ui/Spotlight";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { AboutSection } from "@/components/ui/AboutSection";
import { FloatingDock } from "@/components/ui/FloatingDock";
import { motion } from "framer-motion";
import { Terminal, Database, Cpu, Globe } from "lucide-react"; 
import { BorderBeam } from "@/components/ui/BorderBeam";
import { Meteors } from "@/components/ui/Meteors";

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center relative overflow-x-hidden">
      
      {/* 1. 3D Background */}
      <StarsCanvas />
      
      {/* 2. Floating Navbar */}
      <FloatingDock />

      {/* 3. HERO SECTION */}
      <div id="home" className="flex items-center justify-center min-h-screen w-full p-4">
        <SpotlightCard className="max-w-5xl w-full p-8 md:p-12 z-10 relative overflow-hidden bg-black/40 backdrop-blur-sm border-neutral-800">
          
          <div className="absolute inset-0 h-full w-full overflow-hidden pointer-events-none">
             <Meteors number={20} className="-left-20" />
          </div>
          <BorderBeam size={300} duration={10} delay={5} colorFrom="#007AFF" colorTo="#00FFFF" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-20">
            {/* Left */}
            <div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full overflow-hidden border-2 border-neutral-800 mb-8 grayscale hover:grayscale-0 transition-all duration-500"
              >
                {/* <Image src="/me.jpg" alt="Me" width={96} height={96} /> */}
                <div className="w-full h-full bg-neutral-900 animate-pulse"></div>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-5xl md:text-6xl font-bold text-white mb-6"
              >
                Uwais Alqarni
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-neutral-400 text-xl leading-relaxed mb-8"
              >
                Data Engineer. System Architect.<br/>
                Specializing in <span className="text-white font-medium">Kafka</span>, <span className="text-white font-medium">RAG</span>, and <span className="text-white font-medium">Edge AI</span>.
              </motion.p>

              <div className="flex flex-wrap gap-3">
                <TechBadge icon={<Terminal size={16}/>} label="Python" />
                <TechBadge icon={<Database size={16}/>} label="PostgreSQL" />
                <TechBadge icon={<Cpu size={16}/>} label="TensorFlow" />
              </div>
            </div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <CodeWindow />
            </motion.div>
          </div>
        </SpotlightCard>
      </div>

      {/* 4. MARQUEE (Tech Stack) */}
      <InfiniteMarquee />

      {/* 5. ABOUT / PHILOSOPHY */}
      <AboutSection />

      {/* 6. EXPERIENCE */}
      <div className="max-w-4xl w-full my-32 px-4 z-10">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-neutral-800"></span>
          Experience
          <span className="w-full h-[1px] bg-neutral-800"></span>
        </h2>
        <div className="relative">
          <TimelineItem 
            year="2024 - Present"
            title="Software Engineering Intern"
            company="Company Name"
            description="Built scalable data pipelines using Kafka. Optimized API latency by 40% using Redis caching."
          />
          <TimelineItem 
            year="2023 - 2024"
            title="Research Assistant"
            company="University Lab"
            description="Developed NLP models for sentiment analysis on financial datasets using PyTorch."
          />
        </div>
      </div>

      {/* 7. PROJECTS */}
      <div id="work" className="max-w-6xl w-full mb-32 px-4 z-10">
        <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-neutral-800"></span>
          Selected Works
          <span className="w-full h-[1px] bg-neutral-800"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollReveal>
            <ProjectCard 
              title="Tabayyun"
              description="Offline-first Hybrid AI scanner for Muslim travelers in Korea. Runs YOLOv8 and Tesseract OCR entirely in the browser."
              tags={["React PWA", "TensorFlow.js", "Edge AI"]}
              repoLink="https://github.com/queWiz/Tabayyun"
              demoLink="https://tabayyun-six.vercel.app"
              color="#10b981"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <ProjectCard 
              title="Drama Discovery"
              description="AI-powered RAG search engine with ChromaDB and LangChain to find content based on narrative vibes."
              tags={["RAG", "LangChain", "FastAPI"]}
              repoLink="https://github.com/queWiz/drama-discovery-engine"
              demoLink="https://drama-discovery-engine.vercel.app"
              color="#8b5cf6"
            />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <ProjectCard 
              title="Project Sentinel"
              description="Real-time anomaly detection engine processing 50+ events/sec using Isolation Forest models."
              tags={["Kafka", "Scikit-Learn", "Docker"]}
              repoLink="https://github.com/queWiz/kafka-telemetry-anomaly-detection"
              color="#f97316"
            />
          </ScrollReveal>
        </div>
      </div>

      {/* Footer is handled by layout.tsx, but we add an ID here for the scroll anchor */}
      <div id="contact" className="h-10"></div>

    </main>
  );
}

// --- HELPERS ---
function TechBadge({ icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-md text-sm text-neutral-300 font-mono hover:bg-neutral-800 transition-colors cursor-default">
      {icon}
      {label}
    </div>
  );
}

const TimelineItem = ({ year, title, company, description }: any) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-5 md:gap-10 group">
    <div className="absolute left-0 top-0 h-full w-[1px] bg-neutral-800 md:left-auto md:right-0 md:col-start-2 md:col-end-3 md:mx-auto">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neutral-900 border border-neutral-700 group-hover:border-white transition-colors" />
    </div>
    <div className="hidden md:block md:col-span-2 md:text-right pt-5 pr-12">
      <span className="font-mono text-sm text-neutral-500">{year}</span>
    </div>
    <div className="md:col-span-3 pt-4 pb-12">
      <div className="md:hidden font-mono text-xs text-neutral-500 mb-1">{year}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="text-sm font-mono text-blue-400 mb-4">{company}</div>
      <p className="text-neutral-400 text-sm leading-relaxed max-w-md">{description}</p>
    </div>
  </div>
);

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}