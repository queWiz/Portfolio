// "use client";
// import { useEffect, useState } from "react";

// export function TopNavbar() {
//   const[scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   },[]);

//   return (
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-base/80 backdrop-blur-md border-b border-borderWarm py-4" : "bg-transparent py-6"}`}>
//       <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
//         <div className="font-bold text-cream text-xl tracking-tighter">UWAIS</div>
//         <div className="hidden md:flex gap-8 text-sm font-mono text-muted">
//           <a href="#about" className="hover:text-cream transition-colors">/about</a>
//           <a href="#work" className="hover:text-cream transition-colors">/work</a>
//           <a href="/resume.pdf" target="_blank" className="text-accent-green hover:text-accent-green/80 transition-colors">/resume</a>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export function TabayyunBanner() {
//   return (
//     <div className="w-full bg-gradient-to-br from-surface to-base border border-borderWarm rounded-2xl p-8 md:p-14 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
      
//       {/* Decorative Background Blur */}
//       <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent-green/10 rounded-full blur-[100px] pointer-events-none" />

//       <div className="flex-1 relative z-10">
//         <div className="text-[10px] tracking-[0.3em] text-accent-green mb-4 font-mono uppercase">Core Principle</div>
//         <h3 className="text-3xl md:text-4xl font-bold text-cream mb-6">Tabayyun (تبيّن)</h3>
//         <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
//           An Islamic principle meaning <strong className="text-cream">to verify and ascertain before acting.</strong><br/><br/>
//           Whether validating a high-velocity Kafka stream, cross-referencing messy datasets, or shipping an ML model to production—I believe engineering should bring clarity to chaos, not add to it.
//         </p>
//       </div>

//       <div className="relative z-10 hidden md:block">
//          <span className="text-8xl text-accent-green/20 font-serif drop-shadow-2xl">تبيّن</span>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { PrayerTime } from "./StatusWidgets"; // Import the updated widget

export function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/80 backdrop-blur-md border-b border-borderWarm py-4 shadow-lg" : "bg-transparent py-6"}`}>
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="font-bold text-cream text-xl tracking-tighter">UA</div>
        
        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-8 text-sm font-mono text-muted font-medium absolute left-1/2 -translate-x-1/2">
          <a href="#about" className="hover:text-cream transition-colors">/about</a>
          <a href="#work" className="hover:text-cream transition-colors">/work</a>
        </div>
        
        <div className="flex items-center gap-4">

          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-flex h-10 animate-shimmer items-center justify-center rounded-full border border-accent-green/30 bg-[linear-gradient(110deg,#0a0a0f,45%,#1c2620,55%,#0a0a0f)] bg-[length:200%_100%] px-6 font-medium text-accent-green transition-colors hover:text-white hover:border-accent-green"
          >
            <span className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest">
              RESUME
            </span>
          </a>

          {/* FIX 3: Sticky Animated Prayer Time */}
          <div className="hidden sm:block">
            <PrayerTime />
          </div>
          
        </div>
      </div>
    </nav>
  );
}