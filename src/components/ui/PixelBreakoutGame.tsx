"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, RotateCcw, Trophy, Layers, Wind, MousePointer, Keyboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FlappyPixelGame } from "./FlappyPixelGame";

// 7x5 pixel glyph definitions for retro typography
const GLYPHS: Record<string, number[][]> = {
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  F: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  B: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  " ": [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ],
};

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
  color: string;
  borderColor: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

// -------------------------------------------------------------
// EASTER EGG PIXEL MASCOT & FULL-WIDTH DUAL ARCADE HUB
// -------------------------------------------------------------
export function PixelBreakoutGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGame, setActiveGame] = useState<"breakout" | "flappy">("breakout");
  const [isShocked, setIsShocked] = useState(false);
  const [positionX, setPositionX] = useState(32);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [walkFrame, setWalkFrame] = useState(0);
  const arcadeRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Pause mascot walk loop when off-screen to preserve CPU cycles
  useEffect(() => {
    const el = arcadeRef.current;
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

  // Mascot walking animation loop
  useEffect(() => {
    if (!isInView || isShocked || isOpen) return;

    const interval = setInterval(() => {
      setPositionX((prev) => {
        const next = prev + direction * 0.45;
        if (next >= 82) {
          setDirection(-1);
          return 82;
        }
        if (next <= 18) {
          setDirection(1);
          return 18;
        }
        return next;
      });
      setWalkFrame((f) => (f + 1) % 4);
    }, 60);

    return () => clearInterval(interval);
  }, [isInView, direction, isShocked, isOpen]);

  const handleMascotClick = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setIsShocked(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsShocked(false);
      arcadeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 380);
  };

  const handleGameSwitch = (game: "breakout" | "flappy") => {
    setActiveGame(game);
    // Smoothly keep the entire arcade stage centered in the user's viewport without cutting off
    requestAnimationFrame(() => {
      arcadeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  };

  return (
    <div
      ref={arcadeRef}
      className="w-full relative border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-50/50 dark:bg-[#070A10] select-none transition-colors duration-300"
    >
      {/* Subtle baseline track indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-5 relative flex items-center justify-between">
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-widest hidden sm:inline">
            SYSTEM STATUS: SECURE &amp; VERIFIED
          </span>
          <span className="uppercase tracking-widest sm:hidden">SYS OK</span>
        </div>

        {/* Walking Mascot Area: The Sole Trigger for Secret Arcade */}
        <div
          className="absolute top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-75 group"
          style={{ left: `${positionX}%` }}
          onClick={handleMascotClick}
          role="button"
          tabIndex={0}
          aria-label={isOpen ? "Collapse Arcade" : "Secret System Terminal"}
        >
          {/* Exclamation mark on shocked state */}
          {isShocked && (
            <motion.div
              initial={{ scale: 0, y: 0 }}
              animate={{ scale: [0, 1.4, 1], y: -24 }}
              className="absolute -top-7 left-1/2 -translate-x-1/2 text-amber-400 font-extrabold text-sm font-mono pointer-events-none drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
            >
              ! ? !
            </motion.div>
          )}

          {/* Speech Bubble on hover */}
          {!isShocked && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-slate-900 text-white font-mono text-[10px] tracking-wider border border-white/20 pointer-events-none shadow-md">
              {isOpen ? "CLICK TO COLLAPSE" : "RUN DIAGNOSTIC"}
            </div>
          )}

          {/* Pixel Character Canvas/SVG */}
          <div
            className={`transition-transform duration-150 ${
              isShocked ? "-translate-y-4 scale-125" : ""
            } ${direction === -1 ? "-scale-x-100" : "scale-x-100"}`}
          >
            <PixelEngineerAvatar walkFrame={walkFrame} isShocked={isShocked} />
          </div>
        </div>

        {/* Right baseline status indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 tracking-widest hidden sm:inline">
            SIT // RUNTIME: VERIFIED
          </span>
        </div>
      </div>

      {/* 
        INLINE FLUIDLY-EXPANDING ARCADE (Seamless Full-Width Integration)
      */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: {
                height: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.2 },
              },
            }}
            className="w-full overflow-hidden border-t border-slate-200/80 dark:border-white/[0.08]"
          >
            {/* Top Shared Arcade Header: Branding, Game Switcher Slider, & Single Collapse */}
            <div className="w-full border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-100/90 dark:bg-[#070A10]/95 backdrop-blur-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-2.5 flex flex-wrap items-center justify-between gap-4">
                {/* Left: Arcade branding */}
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
                  <span className="font-mono text-xs font-bold text-slate-900 dark:text-white tracking-widest uppercase flex items-center gap-2">
                    <span>TABAYYUN ARCADE</span>
                    <span className="text-slate-400 dark:text-slate-600 hidden md:inline">//</span>
                    <span className="text-slate-500 dark:text-slate-400 font-normal hidden md:inline text-[11px]">
                      {activeGame === "breakout" ? "BREAKOUT PROTOCOL" : "FLAPPY SECURITY RUN"}
                    </span>
                  </span>
                </div>

                {/* Center: Sliding Game Switcher Button */}
                <div className="flex items-center p-1 rounded-full bg-slate-200/70 dark:bg-black/70 border border-slate-300 dark:border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.currentTarget.blur();
                      handleGameSwitch("breakout");
                    }}
                    className={`relative px-3.5 py-1 rounded-full font-bold transition-colors ${
                      activeGame === "breakout"
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {activeGame === "breakout" && (
                      <motion.div
                        layoutId="activeGameIndicator"
                        className="absolute inset-0 rounded-full bg-cobalt shadow-[0_0_12px_rgba(37,99,235,0.6)]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Layers size={13} />
                      <span>BREAKOUT</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.currentTarget.blur();
                      handleGameSwitch("flappy");
                    }}
                    className={`relative px-3.5 py-1 rounded-full font-bold transition-colors ${
                      activeGame === "flappy"
                        ? "text-white"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {activeGame === "flappy" && (
                      <motion.div
                        layoutId="activeGameIndicator"
                        className="absolute inset-0 rounded-full bg-emerald-600 shadow-[0_0_12px_rgba(16,185,129,0.6)]"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Wind size={13} />
                      <span>FLAPPY PIXEL</span>
                    </span>
                  </button>
                </div>

                {/* Right: The ONLY Clean Collapse Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors text-xs font-mono font-semibold"
                  aria-label="Collapse Arcade"
                >
                  <X size={13} />
                  <span>COLLAPSE</span>
                </button>
              </div>
            </div>

            {/* Active Game Stage View */}
            {activeGame === "breakout" ? (
              <InlineBreakoutStage onClose={() => setIsOpen(false)} />
            ) : (
              <FlappyPixelGame />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// RETRO PIXEL ENGINEER AVATAR
// -------------------------------------------------------------
function PixelEngineerAvatar({
  walkFrame,
  isShocked,
}: {
  walkFrame: number;
  isShocked: boolean;
}) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 16 16"
      className="pixelated drop-shadow-[0_4px_8px_rgba(37,99,235,0.3)]"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Hardhat / Cap (Electric Cobalt) */}
      <rect x="4" y="2" width="8" height="2" fill="#2563EB" />
      <rect x="3" y="4" width="10" height="1" fill="#3B82F6" />

      {/* Face Skin */}
      <rect x="5" y="5" width="6" height="4" fill="#FCD34D" />

      {/* Eyes */}
      {isShocked ? (
        <>
          <rect x="5" y="6" width="2" height="2" fill="#0F172A" />
          <rect x="9" y="6" width="2" height="2" fill="#0F172A" />
          <rect x="5" y="6" width="1" height="1" fill="#FFFFFF" />
          <rect x="9" y="6" width="1" height="1" fill="#FFFFFF" />
          {/* Shocked open mouth */}
          <rect x="7" y="8" width="2" height="1" fill="#0F172A" />
        </>
      ) : (
        <>
          <rect x="6" y="6" width="1" height="2" fill="#0F172A" />
          <rect x="9" y="6" width="1" height="2" fill="#0F172A" />
          <rect x="7" y="8" width="2" height="1" fill="#D97706" />
        </>
      )}

      {/* Engineer Body / Jacket (Dark Slate & Cobalt Accent) */}
      <rect x="4" y="9" width="8" height="4" fill="#1E293B" />
      <rect x="7" y="9" width="2" height="4" fill="#2563EB" />

      {/* Legs & Animated Walking Cycle */}
      {walkFrame === 0 && (
        <>
          <rect x="5" y="13" width="2" height="3" fill="#2563EB" />
          <rect x="9" y="13" width="2" height="3" fill="#2563EB" />
        </>
      )}
      {walkFrame === 1 && (
        <>
          <rect x="4" y="13" width="2" height="2" fill="#2563EB" />
          <rect x="10" y="12" width="2" height="3" fill="#2563EB" />
        </>
      )}
      {walkFrame === 2 && (
        <>
          <rect x="5" y="13" width="2" height="3" fill="#2563EB" />
          <rect x="9" y="13" width="2" height="3" fill="#2563EB" />
        </>
      )}
      {walkFrame === 3 && (
        <>
          <rect x="5" y="12" width="2" height="2" fill="#2563EB" />
          <rect x="11" y="12" width="2" height="3" fill="#2563EB" />
        </>
      )}
    </svg>
  );
}

// -------------------------------------------------------------
// INLINE EMBEDDED BREAKOUT STAGE (Seamless Full-Width Stage)
// -------------------------------------------------------------
function InlineBreakoutStage({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [brokenCount, setBrokenCount] = useState(0);
  const [totalBricks, setTotalBricks] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(3);
  const [isBallAttached, setIsBallAttached] = useState(true);
  const [gameResult, setGameResult] = useState<"playing" | "won" | "lost">("playing");

  const gameResultRef = useRef<"playing" | "won" | "lost">("playing");
  gameResultRef.current = gameResult;

  const bricksRef = useRef<Brick[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const ballRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    speed: number;
    attached: boolean;
  }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 6,
    speed: 3.2,
    attached: true,
  });

  const paddleRef = useRef<{
    x: number;
    y: number;
    w: number;
    h: number;
  }>({
    x: 0,
    y: 0,
    w: 160,
    h: 12,
  });

  // Construct Bricks: Proportional, responsive scaling across desktop, iPad, and mobile
  const buildBricks = useCallback((width: number, height: number) => {
    interface WordDef {
      text: string;
      fill: string;
      border: string;
    }
    interface LineDef {
      words: WordDef[];
    }

    const verifyWord: WordDef = { text: "VERIFY", fill: "#3B82F6", border: "#93C5FD" }; // Cobalt
    const beforeWord: WordDef = { text: "BEFORE", fill: "#10B981", border: "#6EE7B7" }; // Mint
    const trustWord: WordDef = { text: "TRUST", fill: "#F59E0B", border: "#FDE68A" }; // Amber

    // Responsive lines:
    // - Extra-wide screens (>= 1350px): 1 single horizontal marquee line
    // - Desktop & iPad (768px - 1349px): 2 balanced lines ("VERIFY BEFORE" / "TRUST")
    // - Mobile (< 768px): 3 lines ("VERIFY" / "BEFORE" / "TRUST")
    let lineLayout: LineDef[];
    if (width >= 1350) {
      lineLayout = [{ words: [verifyWord, beforeWord, trustWord] }];
    } else if (width >= 768) {
      lineLayout = [
        { words: [verifyWord, beforeWord] },
        { words: [trustWord] },
      ];
    } else {
      lineLayout = [
        { words: [verifyWord] },
        { words: [beforeWord] },
        { words: [trustWord] },
      ];
    }

    const paddingX = width < 640 ? 14 : width < 1024 ? 24 : 36;
    const availableW = Math.max(280, width - paddingX * 2);

    const getWordCols = (text: string) => {
      let cols = 0;
      for (const char of text) {
        const glyph = GLYPHS[char] || GLYPHS[" "];
        cols += glyph[0].length + 1;
      }
      return cols;
    };

    let maxLineCols = 0;
    lineLayout.forEach((line) => {
      let lineCols = 0;
      line.words.forEach((w, idx) => {
        lineCols += getWordCols(w.text);
        if (idx < line.words.length - 1) lineCols += 3; // Word space
      });
      if (lineCols > maxLineCols) maxLineCols = lineCols;
    });

    const numLines = lineLayout.length;
    const paddleTop = height - 34;
    const maxBrickBottom = Math.min(paddleTop - 130, height * 0.48);
    const startY = Math.max(26, Math.floor(height * 0.07));
    const availableH = Math.max(70, maxBrickBottom - startY);

    const gap = 1.8;
    const lineGap = Math.max(8, Math.min(18, Math.floor(availableH * 0.1)));
    const totalLineGaps = lineGap * (numLines - 1);
    const availableForRows = availableH - totalLineGaps;

    const maxBlockFromH = Math.floor(availableForRows / (numLines * 7)) - gap;
    const maxBlockFromW = Math.floor(availableW / (maxLineCols + 2)) - gap;

    // Scale up blocks properly: 7.5px - 13.5px (chunky and proportional across all devices)
    const blockSize = Math.max(7.5, Math.min(13.5, Math.min(maxBlockFromH, maxBlockFromW)));

    const newBricks: Brick[] = [];

    lineLayout.forEach((line, lineIdx) => {
      let lineCols = 0;
      line.words.forEach((w, idx) => {
        lineCols += getWordCols(w.text);
        if (idx < line.words.length - 1) lineCols += 3;
      });

      const linePixelWidth = lineCols * (blockSize + gap);
      let currentX = Math.floor((width - linePixelWidth) / 2);
      const lineY = startY + lineIdx * (7 * (blockSize + gap) + lineGap);

      line.words.forEach((wordDef, wordIdx) => {
        for (const char of wordDef.text) {
          const glyph = GLYPHS[char] || GLYPHS[" "];
          const cols = glyph[0].length;

          for (let r = 0; r < glyph.length; r++) {
            for (let c = 0; c < cols; c++) {
              if (glyph[r][c] === 1) {
                newBricks.push({
                  x: currentX + c * (blockSize + gap),
                  y: lineY + r * (blockSize + gap),
                  w: blockSize,
                  h: blockSize,
                  alive: true,
                  color: wordDef.fill,
                  borderColor: wordDef.border,
                });
              }
            }
          }
          currentX += (cols + 1) * (blockSize + gap);
        }

        if (wordIdx < line.words.length - 1) {
          currentX += 3 * (blockSize + gap);
        }
      });
    });

    bricksRef.current = newBricks;
    setTotalBricks(newBricks.length);
  }, []);

  // Launch the attached ball
  const launchBall = useCallback(() => {
    if (!ballRef.current.attached || gameResultRef.current !== "playing") return;
    ballRef.current.attached = false;
    setIsBallAttached(false);

    // Initial moderate launch angle
    const angle = Math.PI / 4 + (Math.random() * Math.PI) / 2; // Upwards spread
    const speed = ballRef.current.speed;
    ballRef.current.vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
    ballRef.current.vy = -Math.abs(Math.sin(angle) * speed);
  }, []);

  // Reset or initialize game state
  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    buildBricks(rect.width, rect.height);
    setBrokenCount(0);
    setBallsLeft(3);
    setGameResult("playing");
    gameResultRef.current = "playing";

    const padW = rect.width < 600 ? 105 : rect.width < 1000 ? 140 : 170;
    paddleRef.current = {
      w: padW,
      h: 12,
      x: rect.width / 2 - padW / 2,
      y: rect.height - 34,
    };

    ballRef.current = {
      x: paddleRef.current.x + padW / 2,
      y: paddleRef.current.y - 8,
      vx: 0,
      vy: 0,
      radius: 6,
      speed: 3.2,
      attached: true,
    };

    setIsBallAttached(true);
    particlesRef.current = [];
  }, [buildBricks]);

  // Handle particle explosion
  const spawnParticles = (x: number, y: number, color: string) => {
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 2.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 2,
        color,
        alpha: 1,
      });
    }
  };

  // Keyboard navigation & controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        launchBall();
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        const canvas = canvasRef.current;
        if (!canvas) return;
        paddleRef.current.x = Math.max(0, paddleRef.current.x - 36);
        if (ballRef.current.attached) {
          ballRef.current.x = paddleRef.current.x + paddleRef.current.w / 2;
        }
      } else if (e.key === "ArrowRight" || e.key === "d") {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        paddleRef.current.x = Math.min(rect.width - paddleRef.current.w, paddleRef.current.x + 36);
        if (ballRef.current.attached) {
          ballRef.current.x = paddleRef.current.x + paddleRef.current.w / 2;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launchBall, onClose]);

  // ResizeObserver for fluid canvas scaling
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let hasInitialized = false;

    const updateCanvasDimensions = (isInitial: boolean) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      if (isInitial || !hasInitialized) {
        buildBricks(rect.width, rect.height);
        setBrokenCount(0);
        setBallsLeft(3);
        setGameResult("playing");
        gameResultRef.current = "playing";

        const padW = rect.width < 600 ? 105 : rect.width < 1000 ? 140 : 170;
        paddleRef.current = {
          w: padW,
          h: 12,
          x: rect.width / 2 - padW / 2,
          y: rect.height - 34,
        };

        ballRef.current = {
          x: paddleRef.current.x + padW / 2,
          y: paddleRef.current.y - 8,
          vx: 0,
          vy: 0,
          radius: 6,
          speed: 3.2,
          attached: true,
        };
        setIsBallAttached(true);
        hasInitialized = true;
      } else {
        const padW = rect.width < 600 ? 105 : rect.width < 1000 ? 140 : 170;
        paddleRef.current.w = padW;
        paddleRef.current.y = rect.height - 34;
        paddleRef.current.x = Math.max(0, Math.min(rect.width - padW, paddleRef.current.x));

        if (ballRef.current.attached) {
          ballRef.current.x = paddleRef.current.x + padW / 2;
          ballRef.current.y = paddleRef.current.y - 8;
        }
      }
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 50 && entry.contentRect.height > 50) {
          updateCanvasDimensions(false);
        }
      }
    });

    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    updateCanvasDimensions(true);

    return () => ro.disconnect();
  }, [buildBricks]);

  // 60FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const tick = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      if (width <= 0 || height <= 0) {
        animId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Retro Background Grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Draw Bricks
      let activeBricks = 0;
      for (const b of bricksRef.current) {
        if (!b.alive) continue;
        activeBricks++;

        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);

        ctx.strokeStyle = b.borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);

        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillRect(b.x + 1, b.y + 1, b.w - 2, 1.5);
      }

      // Check Victory Condition
      if (
        activeBricks === 0 &&
        bricksRef.current.length > 0 &&
        gameResultRef.current === "playing"
      ) {
        setGameResult("won");
        gameResultRef.current = "won";
      }

      // 3. Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
        ctx.restore();
      }

      // 4. Draw & Update Ball
      const ball = ballRef.current;
      const pad = paddleRef.current;

      if (ball.attached) {
        ball.x = pad.x + pad.w / 2;
        ball.y = pad.y - ball.radius - 2;
      } else if (gameResultRef.current === "playing") {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Walls
        if (ball.x - ball.radius <= 0) {
          ball.x = ball.radius;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x + ball.radius >= width) {
          ball.x = width - ball.radius;
          ball.vx = -Math.abs(ball.vx);
        }

        if (ball.y - ball.radius <= 0) {
          ball.y = ball.radius;
          ball.vy = Math.abs(ball.vy);
        }

        // Paddle Collision
        if (
          ball.y + ball.radius >= pad.y &&
          ball.y - ball.radius <= pad.y + pad.h &&
          ball.x >= pad.x - ball.radius &&
          ball.x <= pad.x + pad.w + ball.radius &&
          ball.vy > 0
        ) {
          const hitOffset = (ball.x - (pad.x + pad.w / 2)) / (pad.w / 2);
          const clampedOffset = Math.max(-0.92, Math.min(0.92, hitOffset));
          const maxAngle = (Math.PI / 180) * 60;
          const bounceAngle = clampedOffset * maxAngle;

          ball.vx = ball.speed * Math.sin(bounceAngle);
          ball.vy = -Math.abs(ball.speed * Math.cos(bounceAngle));
          spawnParticles(ball.x, pad.y, "#93C5FD");
        }

        // Brick Collision
        for (const b of bricksRef.current) {
          if (!b.alive) continue;

          if (
            ball.x + ball.radius >= b.x &&
            ball.x - ball.radius <= b.x + b.w &&
            ball.y + ball.radius >= b.y &&
            ball.y - ball.radius <= b.y + b.h
          ) {
            b.alive = false;
            setBrokenCount((c) => c + 1);
            spawnParticles(b.x + b.w / 2, b.y + b.h / 2, b.color);

            const prevX = ball.x - ball.vx;
            if (prevX + ball.radius <= b.x || prevX - ball.radius >= b.x + b.w) {
              ball.vx = -ball.vx;
            } else {
              ball.vy = -ball.vy;
            }
            break;
          }
        }

        // Bottom Boundary / Ball Lost
        if (ball.y - ball.radius > height) {
          ball.vx = 0;
          ball.vy = 0;
          ball.attached = true;
          ball.x = pad.x + pad.w / 2;
          ball.y = pad.y - ball.radius - 2;

          setBallsLeft((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setGameResult("lost");
              gameResultRef.current = "lost";
              setIsBallAttached(false);
              return 0; // Strictly 0, never negative!
            }
            setIsBallAttached(true);
            return next;
          });
        }
      }

      // Draw Ball
      if (gameResultRef.current !== "lost") {
        ctx.save();
        ctx.shadowColor = "rgba(59, 130, 246, 0.85)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#60A5FA";
        ctx.stroke();
        ctx.restore();
      }

      // Draw Paddle
      ctx.save();
      ctx.shadowColor = "rgba(37, 99, 235, 0.8)";
      ctx.shadowBlur = 12;

      ctx.fillStyle = "#2563EB";
      ctx.beginPath();
      ctx.roundRect(pad.x, pad.y, pad.w, pad.h, 6);
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#93C5FD";
      ctx.stroke();

      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(pad.x + 4, pad.y + 2, pad.w - 8, 2.5, 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(tick);
      animFrameRef.current = animId;
    };

    animId = requestAnimationFrame(tick);
    animFrameRef.current = animId;

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  // Pointer Movement Follows Paddle
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const padW = paddleRef.current.w;

    paddleRef.current.x = Math.max(0, Math.min(rect.width - padW, mouseX - padW / 2));
    if (ballRef.current.attached) {
      ballRef.current.x = paddleRef.current.x + padW / 2;
    }
  };

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col relative select-none"
    >
      {/* Sub-header Bar: Breakout Live Status */}
      <div className="w-full border-b border-slate-200/80 dark:border-white/[0.08] bg-slate-100/60 dark:bg-[#070A10]/70 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400">
            <span className="text-cobalt font-bold">TARGET:</span>
            <span className="text-slate-700 dark:text-slate-300 font-semibold tracking-wide">
              VERIFY BEFORE TRUST (AL-HUJURAT 49:6)
            </span>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400">
              BALLS:{" "}
              <strong className="text-amber-500 dark:text-amber-400 font-bold">
                {ballsLeft}
              </strong>
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              BROKEN:{" "}
              <strong className="text-emerald-500 dark:text-emerald-400 font-bold">
                {brokenCount}
              </strong>
              <span className="text-slate-400 dark:text-slate-600">/{totalBricks}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Seamless Game Stage Canvas */}
      <div className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] bg-[#05070D] cursor-crosshair overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onClick={launchBall}
          className="w-full h-full block touch-none"
        />

        {/* 100% Mathematically Centered Launch Overlay */}
        {isBallAttached && gameResult === "playing" && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              onClick={launchBall}
              className="pointer-events-auto cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-slate-950/95 dark:bg-[#030712]/95 border border-cobalt/60 shadow-[0_0_35px_rgba(37,99,235,0.45),0_10px_25px_rgba(0,0,0,0.85)] backdrop-blur-xl group-hover:border-cobalt group-hover:shadow-[0_0_45px_rgba(37,99,235,0.65)] transition-all duration-200">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-xs sm:text-sm font-mono tracking-wider font-semibold text-slate-200 uppercase flex items-center gap-2">
                  PRESS
                  <kbd className="px-2 py-0.5 rounded-md bg-white/10 dark:bg-white/15 border border-white/20 text-cyan-300 font-mono text-xs font-bold shadow-inner">
                    SPACE
                  </kbd>
                  OR
                  <kbd className="px-2 py-0.5 rounded-md bg-white/10 dark:bg-white/15 border border-white/20 text-white font-mono text-xs font-bold shadow-inner">
                    CLICK CANVAS
                  </kbd>
                  TO LAUNCH
                </span>
                <span className="text-cyan-400 font-bold group-hover:translate-x-0.5 transition-transform text-sm">
                  →
                </span>
              </div>
            </motion.div>
          </div>
        )}

        {/* Victory Overlay */}
        {gameResult === "won" && (
          <div className="absolute inset-0 bg-slate-950/90 dark:bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.25)]">
              <Trophy size={28} className="animate-bounce" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2 tracking-tight">
              VERIFICATION COMPLETE
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mb-6 leading-relaxed">
              All blocks verified with zero failures. True to Al-Hujurat 49:6 Tabayyun standards!
            </p>
            <button
              onClick={resetGame}
              className="btn-nordic px-6 py-2.5 font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              <RotateCcw size={14} />
              <span>PLAY AGAIN</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameResult === "lost" && (
          <div className="absolute inset-0 bg-slate-950/90 dark:bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="text-3xl sm:text-4xl mb-2 font-mono font-extrabold text-rose-500 tracking-wider">
              GAME OVER
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mb-6">
              Out of balls! You cleared <strong className="text-emerald-400 font-bold">{brokenCount}</strong> of <strong className="text-white font-bold">{totalBricks}</strong> blocks.
            </p>
            <button
              onClick={resetGame}
              className="btn-nordic px-6 py-2.5 font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              <RotateCcw size={14} />
              <span>TRY AGAIN</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar: Instructions */}
      <div className="w-full border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-100/50 dark:bg-[#070A10]/70 py-2.5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <MousePointer size={12} className="text-slate-400" />
              <span>Move cursor / touch to guide paddle</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Keyboard size={12} className="text-slate-400" />
              <span>A / D or Arrow keys</span>
            </span>
            <span className={isBallAttached ? "text-amber-500 dark:text-amber-400 font-semibold" : "text-emerald-500 dark:text-emerald-400 font-semibold"}>
              {isBallAttached ? "Ready for launch" : "Ball in play"}
            </span>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300 font-bold border border-white/10">ESC</kbd> or Collapse to close
          </div>
        </div>
      </div>
    </div>
  );
}
