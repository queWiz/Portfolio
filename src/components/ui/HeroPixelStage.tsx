"use client";

import { useState, useEffect, useRef } from "react";

// -------------------------------------------------------------
// 1. OPEN SKY PIXEL DRONE (Floats freely in the right hero area)
// -------------------------------------------------------------
export function HeroPixelDrone() {
  const [isScanning, setIsScanning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLDivElement>(null);

  // Zero-react-render mouse parallax: directly mutates GPU transform on the DOM node
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !droneRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 22;
    droneRef.current.style.transform = `translate3d(${x}px, ${y - 8}px, 0)`;
  };

  const handleMouseLeave = () => {
    if (!droneRef.current) return;
    droneRef.current.style.transform = `translate3d(0px, 0px, 0)`;
  };

  const triggerScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 1200);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[320px] sm:h-[380px] lg:h-[440px] flex flex-col items-center justify-center select-none"
    >
      {/* Animated Flying Saucer / Drone */}
      <div
        ref={droneRef}
        onClick={triggerScan}
        title="Click to trigger radar scan"
        className="relative cursor-pointer transition-transform duration-300 ease-out group will-change-transform"
      >
        {/* Pulse Radar Scan Wave on Click */}
        {isScanning && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border-2 border-cobalt animate-ping pointer-events-none opacity-70" />
        )}

        {/* 8-bit Retro UFO SVG (Sharp Crisp Pixels, Havu Style) */}
        <div className="relative flex flex-col items-center">
          {/* UFO Body */}
          <svg
            viewBox="0 0 24 10"
            shapeRendering="crispEdges"
            className="w-48 sm:w-56 lg:w-64 h-auto drop-shadow-[0_12px_28px_rgba(37,99,235,0.22)] transition-transform group-hover:scale-105 duration-300"
          >
            {/* Cockpit Glass Dome */}
            <rect x="9" y="0" width="6" height="1" fill="#3B82F6" />
            <rect x="8" y="1" width="8" height="1" fill="#60A5FA" />
            <rect x="7" y="2" width="10" height="1" fill="#93C5FD" />
            {/* Pilot Eye Pixel */}
            <rect x="11" y="2" width="2" height="1" fill="#1E3A8A" />

            {/* UFO Main Hull */}
            <rect x="4" y="3" width="16" height="1" fill="currentColor" className="text-slate-800 dark:text-slate-100" />
            <rect x="2" y="4" width="20" height="1" fill="currentColor" className="text-slate-900 dark:text-white" />
            <rect x="0" y="5" width="24" height="2" fill="currentColor" className="text-slate-950 dark:text-slate-200" />

            {/* Sensor Lights */}
            <rect x="3" y="5" width="2" height="1" fill="#EF4444" className="animate-pulse" />
            <rect x="7" y="5" width="2" height="1" fill="#F59E0B" />
            <rect x="11" y="5" width="2" height="1" fill="#10B981" />
            <rect x="15" y="5" width="2" height="1" fill="#3B82F6" />
            <rect x="19" y="5" width="2" height="1" fill="#8B5CF6" className="animate-pulse" />

            {/* Lower Propulsion Ring */}
            <rect x="2" y="7" width="20" height="1" fill="currentColor" className="text-slate-700 dark:text-slate-300" />
            <rect x="6" y="8" width="12" height="1" fill="currentColor" className="text-slate-600 dark:text-slate-400" />
            <rect x="9" y="9" width="6" height="1" fill="#2563EB" />
          </svg>

          {/* Flickering Plasma Thruster Plume */}
          <div className="flex justify-center items-start gap-1 mt-0.5">
            <svg viewBox="0 0 6 4" shapeRendering="crispEdges" className="w-12 h-auto text-cobalt animate-pulse">
              <rect x="1" y="0" width="4" height="1" fill="#60A5FA" />
              <rect x="2" y="1" width="2" height="2" fill="#3B82F6" />
              <rect x="2" y="3" width="2" height="1" fill="#93C5FD" />
            </svg>
          </div>
        </div>

        {/* Floating Status Pill */}
        <div className="mt-4 flex items-center justify-center">
          <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-[#111622]/90 backdrop-blur-md text-[10px] font-mono text-slate-800 dark:text-slate-200 tracking-widest uppercase flex items-center gap-1.5 shadow-md border border-slate-200 dark:border-white/10 group-hover:border-cobalt transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>DEV COMPANION · ACTIVE</span>
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. FULL-WIDTH HERO BASELINE (Spans across entire hero bottom)
// -------------------------------------------------------------
export function HeroPixelBaseline() {
  const [activeMessageIdx, setActiveMessageIdx] = useState(0);
  const [walkFrame, setWalkFrame] = useState(0);
  const [walkPos, setWalkPos] = useState(30);
  const [walkDirection, setWalkDirection] = useState<1 | -1>(1);
  const baselineRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  const STATUS_MESSAGES = [
    "Playwright 20/20 Suites Passing ✓",
    "ACM AutomotiveUI '26 (Gothenburg) Verified",
    "Server-Side NRIC PDPA Scrubbing Active",
    "Sub-150ms YOLOv8 WASM Inference",
    "Distributed Schema: 10+ Relational Tables",
  ];

  // Pause background loop when scrolled away from Hero
  useEffect(() => {
    const el = baselineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Rotate speech messages every 3.5s (only when in view)
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveMessageIdx((prev) => (prev + 1) % STATUS_MESSAGES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isInView, STATUS_MESSAGES.length]);

  // Animate walking robot back and forth along the baseline (only when in view)
  useEffect(() => {
    if (!isInView) return;
    const walkTimer = setInterval(() => {
      setWalkFrame((f) => (f + 1) % 4);
      setWalkPos((pos) => {
        if (pos >= 68) {
          setWalkDirection(-1);
          return 67;
        }
        if (pos <= 22) {
          setWalkDirection(1);
          return 23;
        }
        return pos + walkDirection * 0.7;
      });
    }, 140);

    return () => clearInterval(walkTimer);
  }, [isInView, walkDirection]);

  return (
    <div ref={baselineRef} className="w-full max-w-7xl pt-4 border-t border-slate-200/80 dark:border-white/[0.08] select-none">
      <div className="relative w-full min-h-[44px] flex items-center justify-between gap-4">
        {/* Left Station: Engineer Workstation & CRT Monitor */}
        <div className="flex items-center gap-2.5 shrink-0">
          <svg viewBox="0 0 16 12" shapeRendering="crispEdges" className="w-8 sm:w-9 h-auto text-slate-800 dark:text-slate-200">
            {/* Monitor Frame */}
            <rect x="1" y="0" width="14" height="9" fill="currentColor" />
            {/* Green CRT Screen */}
            <rect x="2" y="1" width="12" height="7" fill="#064E3B" />
            {/* Code lines */}
            <rect x="3" y="2" width="6" height="1" fill="#34D399" />
            <rect x="3" y="4" width="8" height="1" fill="#34D399" />
            <rect x="3" y="6" width="4" height="1" fill="#10B981" />
            {/* Stand */}
            <rect x="7" y="9" width="2" height="2" fill="currentColor" />
            <rect x="4" y="11" width="8" height="1" fill="currentColor" />
          </svg>
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:inline">
            DEV CONSOLE
          </span>
        </div>

        {/* Center: Walking Pixel Robot along the continuous baseline */}
        <div
          className="absolute transition-all duration-150 ease-linear flex flex-col items-center pointer-events-none"
          style={{
            left: `${walkPos}%`,
            transform: `scaleX(${walkDirection})`,
          }}
        >
          {/* 8-bit Walking Robot SVG */}
          <svg viewBox="0 0 12 14" shapeRendering="crispEdges" className="w-6 h-auto text-slate-800 dark:text-white">
            {/* Antenna */}
            <rect x="5" y="0" width="2" height="1" fill="#2563EB" />
            <rect x="5" y="1" width="2" height="1" fill="currentColor" />

            {/* Head */}
            <rect x="3" y="2" width="6" height="4" fill="currentColor" />
            {/* Eyes */}
            <rect x="4" y="3" width="1" height="1" fill="#3B82F6" />
            <rect x="7" y="3" width="1" height="1" fill="#3B82F6" />

            {/* Body */}
            <rect x="2" y="6" width="8" height="4" fill="currentColor" />
            <rect x="4" y="7" width="4" height="2" fill="#10B981" />

            {/* Dynamic Walking Legs */}
            {walkFrame === 0 && (
              <>
                <rect x="3" y="10" width="2" height="3" fill="currentColor" />
                <rect x="7" y="10" width="2" height="3" fill="currentColor" />
                <rect x="2" y="13" width="3" height="1" fill="currentColor" />
                <rect x="7" y="13" width="3" height="1" fill="currentColor" />
              </>
            )}
            {walkFrame === 1 && (
              <>
                <rect x="4" y="10" width="2" height="2" fill="currentColor" />
                <rect x="7" y="10" width="2" height="4" fill="currentColor" />
                <rect x="4" y="12" width="3" height="1" fill="currentColor" />
                <rect x="6" y="13" width="3" height="1" fill="currentColor" />
              </>
            )}
            {walkFrame === 2 && (
              <>
                <rect x="3" y="10" width="2" height="4" fill="currentColor" />
                <rect x="7" y="10" width="2" height="2" fill="currentColor" />
                <rect x="2" y="13" width="3" height="1" fill="currentColor" />
                <rect x="7" y="12" width="3" height="1" fill="currentColor" />
              </>
            )}
            {walkFrame === 3 && (
              <>
                <rect x="4" y="10" width="2" height="3" fill="currentColor" />
                <rect x="6" y="10" width="2" height="3" fill="currentColor" />
                <rect x="3" y="13" width="3" height="1" fill="currentColor" />
                <rect x="6" y="13" width="3" height="1" fill="currentColor" />
              </>
            )}
          </svg>
        </div>

        {/* Center-Right Telemetry Speech Bubble */}
        <div className="mx-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#141B28] border border-slate-200/90 dark:border-white/10 shadow-sm max-w-xs sm:max-w-md truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-ping shrink-0" />
          <span className="text-[10px] sm:text-[11px] font-mono text-slate-700 dark:text-slate-300 truncate">
            &gt; {STATUS_MESSAGES[activeMessageIdx]}
          </span>
        </div>

        {/* Right Station: Database Tower */}
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:inline">
            SUPABASE DB
          </span>
          <svg viewBox="0 0 12 14" shapeRendering="crispEdges" className="w-6 sm:w-7 h-auto text-slate-800 dark:text-slate-200">
            <rect x="1" y="0" width="10" height="14" fill="currentColor" />
            {/* Server Bays */}
            <rect x="2" y="2" width="8" height="2" fill="#1E293B" />
            <rect x="9" y="2" width="1" height="1" fill="#3B82F6" className="animate-pulse" />
            <rect x="2" y="6" width="8" height="2" fill="#1E293B" />
            <rect x="9" y="6" width="1" height="1" fill="#10B981" />
            <rect x="2" y="10" width="8" height="2" fill="#1E293B" />
            <rect x="9" y="10" width="1" height="1" fill="#EF4444" className="animate-ping" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. COMBINED EXPORT (For backwards compatibility)
// -------------------------------------------------------------
export function HeroPixelStage() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeroPixelDrone />
      <HeroPixelBaseline />
    </div>
  );
}
