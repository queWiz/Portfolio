"use client";
import { useState, useEffect } from "react";

export function SideHUD() {
  const [time, setTime] = useState<string>("");

  // Live Clock effect
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Format to Singapore Time (SGT)
      const timeString = now.toLocaleTimeString("en-SG", {
        timeZone: "Asia/Singapore",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(`${timeString} SGT`);
    };
    
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  },[]);

  return (
    <>
      {/* LEFT HUD - Branding & Coordinates */}
      <div className="fixed left-8 bottom-0 z-50 hidden xl:flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
        
        {/* Quirky Personality Stat */}
        <div style={{ writingMode: 'vertical-rl' }} className="font-mono text-[10px] tracking-[0.3em] text-accent-lavender rotate-180">
          SYS.FUEL = "KOPI_O_KOSONG"
        </div>

        <div className="w-[1px] h-12 bg-borderWarm" />

        <div style={{ writingMode: 'vertical-rl' }} className="font-mono text-[10px] tracking-[0.3em] text-cream rotate-180 flex items-center gap-4">
          <span>UWAIS ALQARNI © {new Date().getFullYear()}</span>
        </div>

        {/* Anchor Line */}
        <div className="w-[1px] h-24 bg-gradient-to-t from-cream to-transparent" />
      </div>

      {/* RIGHT HUD - Live Data & Location */}
      <div className="fixed right-8 bottom-0 z-50 hidden xl:flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-500">
        
        {/* Live Ticking Clock */}
        <div style={{ writingMode: 'vertical-rl' }} className="font-mono text-[10px] tracking-[0.3em] text-accent-green rotate-180">
          {time || "LOADING..."}
        </div>

        <div className="w-[1px] h-12 bg-borderWarm" />

        {/* Singapore Coordinates */}
        <div style={{ writingMode: 'vertical-rl' }} className="font-mono text-[10px] tracking-[0.3em] text-cream rotate-180">
          LAT 1.3521° N · LON 103.8198° E
        </div>

        {/* Anchor Line */}
        <div className="w-[1px] h-24 bg-gradient-to-t from-cream to-transparent" />
      </div>
    </>
  );
}