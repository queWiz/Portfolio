"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, RotateCcw, Trophy, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
// EASTER EGG PIXEL MASCOT & INLINE FLUID EXPANDABLE ARCADE
// -------------------------------------------------------------
export function PixelBreakoutGame() {
  const [isOpen, setIsOpen] = useState(false);
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

  // Mascot walking animation loop (only active when in viewport and not open/shocked)
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
    }, 450);
  };

  return (
    <div ref={arcadeRef} className="w-full relative border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-100/50 dark:bg-[#070A10] py-6 px-4 select-none">
      {/* Subtle baseline track indicator */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-between">
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
              {isOpen ? "CLICK TO COLLAPSE ▲" : "⌁ RUN DIAGNOSTIC?"}
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

        <div className="flex items-center gap-3">
          {isOpen ? (
            <button
              onClick={() => setIsOpen(false)}
              className="text-[11px] font-mono text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 font-bold tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <X size={12} />
              <span>COLLAPSE ✕</span>
            </button>
          ) : (
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 tracking-widest hidden sm:inline">
              SIT // RUNTIME: VERIFIED
            </span>
          )}
        </div>
      </div>

      {/* 
        INLINE FLUIDLY-EXPANDING BREAKOUT ARCADE (Smooth GPU Transition)
        Opens directly in-page between the mascot line and footer without any popup modal!
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
                opacity: { duration: 0.35, delay: 0.1 },
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
            className="overflow-hidden w-full max-w-5xl mx-auto pt-6"
          >
            <InlineBreakoutStage onClose={() => setIsOpen(false)} />
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
// INLINE EMBEDDED BREAKOUT STAGE (Directly in page canvas)
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
    speed: 4.4,
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
    w: 120,
    h: 12,
  });

  // Construct Bricks for "VERIFY BEFORE TRUST"
  const buildBricks = useCallback((width: number) => {
    const lines = ["VERIFY", "BEFORE", "TRUST"];
    const colors = [
      { fill: "#3B82F6", border: "#93C5FD" }, // Row 1: High-Contrast Electric Cobalt
      { fill: "#10B981", border: "#6EE7B7" }, // Row 2: Vivid Mint Emerald
      { fill: "#F59E0B", border: "#FDE68A" }, // Row 3: Radiant Amber Gold
    ];

    const isMobile = width < 600;
    const maxCols = 36;
    const paddingX = isMobile ? 16 : 40;
    const availableW = width - paddingX * 2;
    const blockSize = Math.max(5, Math.min(14, Math.floor(availableW / maxCols)));
    const gap = 1.5;

    const newBricks: Brick[] = [];
    const startY = isMobile ? 36 : 44;

    lines.forEach((lineText, lineIdx) => {
      let totalLineWidth = 0;
      for (const char of lineText) {
        const glyph = GLYPHS[char] || GLYPHS[" "];
        totalLineWidth += glyph[0].length * (blockSize + gap) + (blockSize + gap);
      }

      let currentX = Math.floor((width - totalLineWidth) / 2);
      const lineY = startY + lineIdx * (8 * (blockSize + gap) + 12);

      for (const char of lineText) {
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
                color: colors[lineIdx % colors.length].fill,
                borderColor: colors[lineIdx % colors.length].border,
              });
            }
          }
        }
        currentX += cols * (blockSize + gap) + (blockSize + gap);
      }
    });

    bricksRef.current = newBricks;
    setTotalBricks(newBricks.length);
  }, []);

  // Launch the attached ball
  const launchBall = useCallback(() => {
    if (!ballRef.current.attached) return;
    ballRef.current.attached = false;
    setIsBallAttached(false);

    // Initial moderate launch angle
    const angle = (Math.PI / 4) + (Math.random() * Math.PI) / 2; // Upwards spread
    const speed = ballRef.current.speed;
    ballRef.current.vx = Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1);
    ballRef.current.vy = -Math.abs(Math.sin(angle) * speed);
  }, []);

  // Initialize or reset game
  const initGame = useCallback((resetLives = true) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    if (resetLives) {
      buildBricks(rect.width);
      setBrokenCount(0);
      setBallsLeft(3);
      setGameResult("playing");
    }

    const padW = rect.width < 500 ? 95 : 125;
    paddleRef.current = {
      w: padW,
      h: 12,
      x: rect.width / 2 - padW / 2,
      y: rect.height - 38,
    };

    ballRef.current = {
      x: paddleRef.current.x + padW / 2,
      y: paddleRef.current.y - 8,
      vx: 0,
      vy: 0,
      radius: 6,
      speed: 4.4, // Controlled, responsive speed
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

  // Keyboard navigation & space to launch / escape to close
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
        paddleRef.current.x = Math.max(0, paddleRef.current.x - 30);
        if (ballRef.current.attached) {
          ballRef.current.x = paddleRef.current.x + paddleRef.current.w / 2;
        }
      } else if (e.key === "ArrowRight" || e.key === "d") {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        paddleRef.current.x = Math.min(rect.width - paddleRef.current.w, paddleRef.current.x + 30);
        if (ballRef.current.attached) {
          ballRef.current.x = paddleRef.current.x + paddleRef.current.w / 2;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [launchBall, onClose]);

  // Smooth resize handling during fluid container expansion
  useEffect(() => {
    initGame(true);

    const t1 = setTimeout(() => initGame(false), 200);
    const t2 = setTimeout(() => initGame(false), 680);

    const handleResize = () => initGame(false);
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", handleResize);
    };
  }, [initGame]);

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

      // 1. DRAW SUBTLE RETRO BACKGROUND GRID
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. DRAW BRICKS
      let activeBricks = 0;
      for (const b of bricksRef.current) {
        if (!b.alive) continue;
        activeBricks++;

        // Solid Vibrant Body
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);

        // Crisp 1px Bright Border for Pop Against Dark Background
        ctx.strokeStyle = b.borderColor;
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x + 0.5, b.y + 0.5, b.w - 1, b.h - 1);

        // Subtle specular glint at top of each brick
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fillRect(b.x + 1, b.y + 1, b.w - 2, 1.5);
      }

      // Check Victory Condition
      if (activeBricks === 0 && bricksRef.current.length > 0) {
        setGameResult("won");
      }

      // 3. DRAW PARTICLES
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

      // 4. DRAW & UPDATE BALL
      const ball = ballRef.current;
      const pad = paddleRef.current;

      if (ball.attached) {
        // Keep ball anchored to paddle center until launched
        ball.x = pad.x + pad.w / 2;
        ball.y = pad.y - ball.radius - 2;
      } else {
        // Ball in motion
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Left / Right Walls
        if (ball.x - ball.radius <= 0) {
          ball.x = ball.radius;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x + ball.radius >= width) {
          ball.x = width - ball.radius;
          ball.vx = -Math.abs(ball.vx);
        }

        // Top Wall
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
          // Calculate bounce angle based on where ball hits paddle
          const hitOffset = (ball.x - (pad.x + pad.w / 2)) / (pad.w / 2);
          const maxAngle = (Math.PI / 180) * 60; // 60 degrees max
          const bounceAngle = hitOffset * maxAngle;

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

            // Determine collision edge
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
          setBallsLeft((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setGameResult("lost");
            } else {
              // Reset onto paddle in attached state (NO AUTO-SHOOT)
              ball.attached = true;
              setIsBallAttached(true);
              ball.x = pad.x + pad.w / 2;
              ball.y = pad.y - ball.radius - 2;
              ball.vx = 0;
              ball.vy = 0;
            }
            return next;
          });
        }
      }

      // Draw Ball (Bright radiant white sphere with cobalt halo)
      ctx.save();
      ctx.shadowColor = "rgba(59, 130, 246, 0.85)";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Outer rim
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#60A5FA";
      ctx.stroke();
      ctx.restore();

      // 5. DRAW HIGH-CONTRAST PADDLE (Cobalt body with bright white core)
      ctx.save();
      ctx.shadowColor = "rgba(37, 99, 235, 0.8)";
      ctx.shadowBlur = 12;

      // Base paddle
      ctx.fillStyle = "#2563EB";
      ctx.beginPath();
      ctx.roundRect(pad.x, pad.y, pad.w, pad.h, 6);
      ctx.fill();

      // Bright border
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#93C5FD";
      ctx.stroke();

      // Specular white center stripe
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
  }, [initGame]);

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
      className="w-full rounded-3xl bg-[#090D16] border border-slate-700/80 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_35px_rgba(37,99,235,0.18)] overflow-hidden flex flex-col mb-4"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-slate-900/90">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping" />
          <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
            TABAYYUN ARCADE // VERIFY BEFORE TRUST
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-4 text-xs font-mono text-slate-300">
            <span>
              BALLS: <strong className="text-amber-400">{ballsLeft}</strong>
            </span>
            <span>
              BROKEN: <strong className="text-emerald-400">{brokenCount}</strong>/{totalBricks}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono font-semibold"
            aria-label="Collapse Arcade"
          >
            <X size={14} />
            <span className="hidden sm:inline">COLLAPSE</span>
          </button>
        </div>
      </div>

      {/* Game Stage Canvas */}
      <div className="relative w-full h-[360px] sm:h-[440px] bg-[#090D16] cursor-crosshair">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onClick={launchBall}
          className="w-full h-full block touch-none"
        />

        {/* Prompt when ball is attached */}
        {isBallAttached && gameResult === "playing" && (
          <div
            onClick={launchBall}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-cobalt/25 border border-cobalt/50 text-white font-mono text-xs tracking-wider animate-pulse pointer-events-auto cursor-pointer shadow-[0_0_15px_rgba(37,99,235,0.4)] whitespace-nowrap"
          >
            ⌁ CLICK CANVAS OR PRESS SPACE TO LAUNCH ⌁
          </div>
        )}

        {/* Victory Overlay */}
        {gameResult === "won" && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <Trophy size={48} className="text-amber-400 mb-3 animate-bounce" />
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white mb-2">
              VERIFICATION COMPLETE
            </h3>
            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mb-6">
              All blocks verified with zero failures. True to Al-Hujurat 49:6 Tabayyun standards!
            </p>
            <button
              onClick={() => initGame(true)}
              className="btn-nordic px-6 py-2.5 font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <RotateCcw size={14} />
              <span>PLAY AGAIN</span>
            </button>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameResult === "lost" && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <div className="text-4xl mb-2 font-mono text-rose-500 font-bold">GAME OVER</div>
            <p className="text-xs sm:text-sm font-mono text-slate-300 max-w-md mb-6">
              Ran out of balls! You cleared {brokenCount} of {totalBricks} blocks.
            </p>
            <button
              onClick={() => initGame(true)}
              className="btn-nordic px-6 py-2.5 font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2"
            >
              <RotateCcw size={14} />
              <span>TRY AGAIN</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Bar: Instructions */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-3 border-t border-white/[0.08] bg-slate-900/60 text-[11px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span>🖱️ Move mouse / touch to aim paddle</span>
          <span className="hidden sm:inline">⌨️ A/D or Arrow keys</span>
          <span className={isBallAttached ? "text-amber-400 font-semibold animate-pulse" : "text-emerald-400 font-semibold"}>
            {isBallAttached ? "⌁ SPACE / CLICK to launch ball" : "● Ball in Play"}
          </span>
        </div>
        <div>Press ESC or Collapse to close</div>
      </div>
    </div>
  );
}
