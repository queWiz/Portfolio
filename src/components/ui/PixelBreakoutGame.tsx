"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { X, RotateCcw, Trophy, Sparkles } from "lucide-react";
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
// EASTER EGG PIXEL MASCOT (Patrols above the footer)
// -------------------------------------------------------------
export function PixelBreakoutGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [isShocked, setIsShocked] = useState(false);
  const [positionX, setPositionX] = useState(30);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [walkFrame, setWalkFrame] = useState(0);

  // Mascot walking animation loop
  useEffect(() => {
    if (isShocked || isOpen) return;

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
  }, [direction, isShocked, isOpen]);

  const handleMascotClick = () => {
    if (isShocked || isOpen) return;
    setIsShocked(true);

    // Shock animation plays for 380ms before expanding into game modal
    setTimeout(() => {
      setIsOpen(true);
      setIsShocked(false);
    }, 420);
  };

  return (
    <div className="w-full relative border-t border-slate-200/80 dark:border-white/[0.08] bg-slate-100/50 dark:bg-[#070A10] py-6 px-4 select-none overflow-hidden">
      {/* Subtle baseline track indicator */}
      <div className="max-w-7xl mx-auto relative flex items-center justify-between">
        <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="uppercase tracking-widest hidden sm:inline">
            SYSTEM STATUS: SECURE &amp; VERIFIED
          </span>
          <span className="uppercase tracking-widest sm:hidden">SYS OK</span>
        </div>

        {/* Walking Mascot Area */}
        <div
          className="absolute top-1/2 -translate-y-1/2 cursor-pointer transition-all duration-75 group"
          style={{ left: `${positionX}%` }}
          onClick={handleMascotClick}
          role="button"
          tabIndex={0}
          aria-label="Secret Easter Egg Breakout Game"
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
              DEBUG MODE? ⌁ CLICK ME
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

        <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <Sparkles size={12} className="text-cobalt" />
          <span className="hidden sm:inline">AL-HUJURAT 49:6 · VERIFICATION OPERATING LOOP</span>
          <span className="sm:hidden">VERIFIED 2026</span>
        </div>
      </div>

      {/* FULLSCREEN BREAKOUT ARCADE MODAL */}
      <AnimatePresence>
        {isOpen && (
          <BreakoutModal onClose={() => setIsOpen(false)} />
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
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className="w-7 h-7 sm:w-8 sm:h-8 filter drop-shadow-[0_4px_6px_rgba(37,99,235,0.3)]"
    >
      {/* Head / Helmet (Cobalt) */}
      <rect x="4" y="1" width="8" height="6" fill="#2563EB" />
      <rect x="3" y="2" width="10" height="4" fill="#3B82F6" />

      {/* Face Visor / Screen */}
      <rect x="5" y="3" width="6" height="3" fill="#0B0F19" />

      {/* Eyes: Normal vs Shocked */}
      {isShocked ? (
        <>
          <rect x="5" y="3" width="2" height="3" fill="#FBBF24" />
          <rect x="9" y="3" width="2" height="3" fill="#FBBF24" />
        </>
      ) : (
        <>
          <rect x="6" y="4" width="1" height="1" fill="#60A5FA" />
          <rect x="9" y="4" width="1" height="1" fill="#60A5FA" />
        </>
      )}

      {/* Torso */}
      <rect x="4" y="7" width="8" height="5" fill="#1E293B" />
      <rect x="6" y="8" width="4" height="3" fill="#38BDF8" />

      {/* Legs (Animated Walk Cycle) */}
      {walkFrame === 0 && (
        <>
          <rect x="4" y="12" width="2" height="3" fill="#2563EB" />
          <rect x="10" y="12" width="2" height="3" fill="#2563EB" />
        </>
      )}
      {walkFrame === 1 && (
        <>
          <rect x="3" y="12" width="2" height="3" fill="#2563EB" />
          <rect x="9" y="12" width="2" height="2" fill="#2563EB" />
        </>
      )}
      {walkFrame === 2 && (
        <>
          <rect x="5" y="12" width="2" height="3" fill="#2563EB" />
          <rect x="9" y="12" width="2" height="3" fill="#2563EB" />
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
// BREAKOUT ARCADE MODAL
// -------------------------------------------------------------
function BreakoutModal({ onClose }: { onClose: () => void }) {
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
    const startY = isMobile ? 40 : 50;

    lines.forEach((lineText, lineIdx) => {
      let totalLineWidth = 0;
      for (const char of lineText) {
        const glyph = GLYPHS[char] || GLYPHS[" "];
        totalLineWidth += glyph[0].length * (blockSize + gap) + (blockSize + gap);
      }

      let currentX = Math.floor((width - totalLineWidth) / 2);
      const lineY = startY + lineIdx * (8 * (blockSize + gap) + 14);

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
      y: rect.height - 42,
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

  // Main 60fps Game Loop
  useEffect(() => {
    initGame(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const tick = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // 1. CLEAR CANVAS WITH DEEP NAVY OBSIDIAN
      ctx.fillStyle = "#090D16";
      ctx.fillRect(0, 0, width, height);

      // Subtle Background Grid Lines
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

        // Crisp 1px Bright Border for Pop Against Black Background
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

      // 4. DRAW PADDLE (Distinct, High-Contrast Electric Cobalt + White Core)
      const pad = paddleRef.current;
      // Ambient Drop Glow
      ctx.shadowColor = "rgba(37, 99, 235, 0.6)";
      ctx.shadowBlur = 12;

      // Rounded Capsule Paddle
      ctx.fillStyle = "#2563EB";
      ctx.beginPath();
      ctx.roundRect(pad.x, pad.y, pad.w, pad.h, 6);
      ctx.fill();

      // Bright White Highlight Strip Along Paddle Center
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.roundRect(pad.x + 8, pad.y + 2, pad.w - 16, 2.5, 2);
      ctx.fill();

      // Outer Crisp Slate Rim
      ctx.strokeStyle = "#93C5FD";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(pad.x, pad.y, pad.w, pad.h, 6);
      ctx.stroke();

      // 5. UPDATE & DRAW BALL
      const ball = ballRef.current;

      if (ball.attached) {
        // Stick to paddle center
        ball.x = pad.x + pad.w / 2;
        ball.y = pad.y - ball.radius - 2;

        // Render "CLICK TO LAUNCH" pulsing indicator
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText("⌁ CLICK OR PRESS SPACE TO LAUNCH ⌁", width / 2, pad.y - 24);
      } else {
        // Move ball
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Wall collisions
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
          ball.x >= pad.x - 4 &&
          ball.x <= pad.x + pad.w + 4
        ) {
          ball.y = pad.y - ball.radius;
          // Calculate angle reflection based on where ball hits paddle (-1 to 1)
          const hitOffset = (ball.x - (pad.x + pad.w / 2)) / (pad.w / 2);
          const maxAngle = (Math.PI / 3); // 60 deg max spread
          const angle = hitOffset * maxAngle;

          ball.vx = Math.sin(angle) * ball.speed;
          ball.vy = -Math.abs(Math.cos(angle) * ball.speed);

          spawnParticles(ball.x, ball.y, "#60A5FA");
        }

        // Brick Collisions
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

      // Draw Ball (Glowing Neon Orb)
      ctx.shadowColor = "#38BDF8";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      // Ball Outer Accent Ring
      ctx.strokeStyle = "#38BDF8";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(tick);
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.93, y: 16 }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
        className="w-full max-w-4xl rounded-3xl bg-[#090D16] border border-slate-700/80 shadow-[0_0_60px_rgba(37,99,235,0.25)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-white/[0.08] bg-slate-900/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cobalt animate-ping" />
            <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">
              TABAYYUN ARCADE // VERIFY BEFORE TRUST
            </span>
          </div>

          <div className="flex items-center gap-6">
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
              className="p-1.5 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Arcade"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Game Stage Canvas */}
        <div className="relative w-full h-[380px] sm:h-[460px] bg-[#090D16] cursor-crosshair">
          <canvas
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            onClick={launchBall}
            className="w-full h-full block touch-none"
          />

          {/* Victory Modal Overlay */}
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

          {/* Game Over Modal Overlay */}
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
          <div>Press ESC to close</div>
        </div>
      </motion.div>
    </motion.div>
  );
}
