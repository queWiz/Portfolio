"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, X, RotateCcw, Trophy } from "lucide-react";

// Standard 7x5 pixel glyph definitions
const GLYPHS: Record<string, number[][]> = {
  L: [
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 1, 0, 0, 1],
    [1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 1, 1, 0],
  ],
  I: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  O: [
    [0, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 0, 1, 0],
    [1, 1, 0, 0, 1],
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
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export function PixelBreakoutGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [brokenCount, setBrokenCount] = useState(0);
  const [ballsLeft, setBallsLeft] = useState(3);
  const [gameState, setGameState] = useState<"idle" | "ready" | "running" | "lost" | "won">("idle");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Physics state stored in refs for 60fps zero-react-render lag
  const bricksRef = useRef<Brick[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const ballRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    speed: number;
  }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 6,
    speed: 6,
  });
  const paddleRef = useRef<{
    x: number;
    y: number;
    w: number;
    h: number;
    targetX: number;
  }>({
    x: 0,
    y: 0,
    w: 110,
    h: 12,
    targetX: 0,
  });

  // Build the pixel grid bricks for "LESS IS MORE"
  const buildBricks = useCallback((canvasWidth: number, canvasHeight: number) => {
    const isMobile = canvasWidth < 680;
    // On mobile, split into 2 rows: "LESS" and "IS MORE"
    const words = isMobile ? ["LESS", "IS MORE"] : ["LESS IS MORE"];

    // Compute pixel cell size to fit cleanly
    const maxCols = isMobile ? 22 : 46;
    const paddingX = isMobile ? 16 : 40;
    const availableW = canvasWidth - paddingX * 2;
    const blockSize = Math.max(4, Math.min(13, Math.floor(availableW / maxCols)));
    const gap = blockSize >= 8 ? 1.5 : 1;

    const newBricks: Brick[] = [];
    const totalRows = words.length * 8;
    const startY = Math.max(isMobile ? 35 : 45, Math.floor((canvasHeight * 0.38) - (totalRows * (blockSize + gap)) / 2));

    words.forEach((line, lineIdx) => {
      // Calculate total pixel width of line
      let totalLineWidth = 0;
      for (const char of line) {
        const glyph = GLYPHS[char] || GLYPHS[" "];
        const cols = glyph[0].length;
        totalLineWidth += cols * (blockSize + gap) + (blockSize + gap);
      }

      let currentX = Math.floor((canvasWidth - totalLineWidth) / 2);
      const lineY = startY + lineIdx * (8 * (blockSize + gap) + 12);

      for (const char of line) {
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
              });
            }
          }
        }
        currentX += cols * (blockSize + gap) + (blockSize + gap);
      }
    });

    bricksRef.current = newBricks;
  }, []);

  // Initialize or reset game arena
  const initGame = useCallback(
    (resetScores = true) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      buildBricks(rect.width, rect.height);

      paddleRef.current = {
        w: rect.width < 500 ? 90 : 120,
        h: 10,
        x: rect.width / 2 - (rect.width < 500 ? 45 : 60),
        y: rect.height - 40,
        targetX: rect.width / 2 - (rect.width < 500 ? 45 : 60),
      };

      ballRef.current = {
        x: rect.width / 2,
        y: paddleRef.current.y - 12,
        vx: 4 * (Math.random() > 0.5 ? 1 : -1),
        vy: -5,
        radius: 6,
        speed: 6.5,
      };

      particlesRef.current = [];

      if (resetScores) {
        setBrokenCount(0);
        setBallsLeft(3);
      }
      setGameState("running");
    },
    [buildBricks]
  );

  // Spawn visual destruction particle sparks
  const spawnParticles = (x: number, y: number, count = 4) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        size: 2 + Math.random() * 2.5,
        alpha: 1,
      });
    }
  };

  // Main 60fps Game Loop
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);
      if (!isVisible) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Smooth paddle tracking
      const paddle = paddleRef.current;
      paddle.x += (paddle.targetX - paddle.x) * 0.28;
      // Clamp paddle inside canvas bounds
      paddle.x = Math.max(0, Math.min(width - paddle.w, paddle.x));

      const ball = ballRef.current;

      // Update ball physics if game is running
      if (gameState === "running") {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce walls
        if (ball.x - ball.radius <= 0) {
          ball.x = ball.radius;
          ball.vx = Math.abs(ball.vx);
        } else if (ball.x + ball.radius >= width) {
          ball.x = width - ball.radius;
          ball.vx = -Math.abs(ball.vx);
        }

        // Bounce ceiling
        if (ball.y - ball.radius <= 0) {
          ball.y = ball.radius;
          ball.vy = Math.abs(ball.vy);
        }

        // Bounce Paddle
        if (
          ball.y + ball.radius >= paddle.y &&
          ball.y - ball.radius <= paddle.y + paddle.h &&
          ball.x >= paddle.x - ball.radius &&
          ball.x <= paddle.x + paddle.w + ball.radius &&
          ball.vy > 0
        ) {
          // Calculate angle based on impact point
          const hitPos = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
          const maxAngle = Math.PI / 3; // 60 deg
          const angle = hitPos * maxAngle;
          ball.vx = ball.speed * Math.sin(angle);
          ball.vy = -Math.abs(ball.speed * Math.cos(angle));
          ball.y = paddle.y - ball.radius - 1;
        }

        // Check Brick collisions
        const bricks = bricksRef.current;
        let activeCount = 0;
        for (let i = 0; i < bricks.length; i++) {
          const b = bricks[i];
          if (!b.alive) continue;
          activeCount++;

          // AABB vs Circle
          const testX = Math.max(b.x, Math.min(ball.x, b.x + b.w));
          const testY = Math.max(b.y, Math.min(ball.y, b.y + b.h));
          const distX = ball.x - testX;
          const distY = ball.y - testY;
          const distance = distX * distX + distY * distY;

          if (distance <= ball.radius * ball.radius) {
            b.alive = false;
            setBrokenCount((c) => c + 1);
            spawnParticles(b.x + b.w / 2, b.y + b.h / 2, 4);

            // Deflect ball
            const overlapX = ball.radius - Math.abs(distX);
            const overlapY = ball.radius - Math.abs(distY);
            if (overlapX < overlapY) {
              ball.vx = -ball.vx;
            } else {
              ball.vy = -ball.vy;
            }
            break; // One collision per frame
          }
        }

        if (activeCount === 0 && bricks.length > 0) {
          setGameState("won");
        }

        // Ball fell out bottom
        if (ball.y - ball.radius > height) {
          setBallsLeft((prev) => {
            const next = prev - 1;
            if (next <= 0) {
              setGameState("lost");
            } else {
              // Reset ball atop paddle
              ball.x = paddle.x + paddle.w / 2;
              ball.y = paddle.y - 14;
              ball.vx = 4 * (Math.random() > 0.5 ? 1 : -1);
              ball.vy = -5;
            }
            return next;
          });
        }
      }

      // Update Particles
      for (let pIdx = particlesRef.current.length - 1; pIdx >= 0; pIdx--) {
        const p = particlesRef.current[pIdx];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gentle gravity
        p.alpha -= 0.04;
        if (p.alpha <= 0) {
          particlesRef.current.splice(pIdx, 1);
        }
      }

      // ------------------------------------
      // DRAW CANVAS
      // ------------------------------------
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Bricks (Havu-Style Pixel Grid Letters)
      const isDarkMode = document.documentElement.classList.contains("dark");
      const brickFill = isDarkMode ? "#F1F5F9" : "#0F172A";
      const brickBorder = isDarkMode ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.5)";

      ctx.fillStyle = brickFill;
      ctx.strokeStyle = brickBorder;
      ctx.lineWidth = 1;

      const bricks = bricksRef.current;
      for (let i = 0; i < bricks.length; i++) {
        const b = bricks[i];
        if (!b.alive) continue;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeRect(b.x, b.y, b.w, b.h);
      }

      // 2. Draw Particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = isDarkMode
          ? `rgba(241, 245, 249, ${p.alpha})`
          : `rgba(15, 23, 42, ${p.alpha})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      // 3. Draw Paddle & Ball (Only if active game)
      if (gameState === "running") {
        // Paddle
        ctx.fillStyle = isDarkMode ? "#FFFFFF" : "#0F172A";
        ctx.beginPath();
        ctx.roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);
        ctx.fill();

        // Ball
        ctx.fillStyle = isDarkMode ? "#FFFFFF" : "#2563EB";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    loop();

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, gameState]);

  // Initial draw of static pixel letters on mount / resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      buildBricks(rect.width, rect.height);

      if (!isPlaying) {
        // Draw static resting state
        const isDarkMode = document.documentElement.classList.contains("dark");
        ctx?.clearRect(0, 0, rect.width, rect.height);
        if (ctx) {
          ctx.fillStyle = isDarkMode ? "#F1F5F9" : "#0F172A";
          ctx.strokeStyle = isDarkMode ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.5)";
          ctx.lineWidth = 1;
          bricksRef.current.forEach((b) => {
            ctx.fillRect(b.x, b.y, b.w, b.h);
            ctx.strokeRect(b.x, b.y, b.w, b.h);
          });
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buildBricks, isPlaying]);

  // Mouse / Touch controller
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    paddleRef.current.targetX = clientX - paddleRef.current.w / 2;
  };

  const startPlaying = () => {
    setIsPlaying(true);
    initGame(true);
  };

  const closeGame = () => {
    setIsPlaying(false);
    setGameState("idle");
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    // Redraw static letters
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      buildBricks(rect.width, rect.height);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const isDarkMode = document.documentElement.classList.contains("dark");
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = isDarkMode ? "#F1F5F9" : "#0F172A";
        ctx.strokeStyle = isDarkMode ? "rgba(15, 23, 42, 0.45)" : "rgba(241, 245, 249, 0.5)";
        ctx.lineWidth = 1;
        bricksRef.current.forEach((b) => {
          ctx.fillRect(b.x, b.y, b.w, b.h);
          ctx.strokeRect(b.x, b.y, b.w, b.h);
        });
      }
    }
  };

  return (
    <section className="w-full bg-[#04060A] dark:bg-[#04060A] text-white py-16 px-4 relative overflow-hidden select-none border-t border-slate-200/20 dark:border-white/[0.06]">
      {/* Background Subtle Star Dust */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        {/* Game HUD Bar (Visible when active) */}
        <div className="w-full flex items-center justify-between mb-4 px-2 sm:px-6 h-6 font-mono text-xs text-slate-400">
          {isPlaying ? (
            <>
              <div className="flex items-center gap-4">
                <span className="tracking-widest uppercase text-slate-300">
                  BROKEN <strong className="text-cobalt font-bold">{brokenCount}</strong>
                </span>
                <span className="tracking-widest uppercase text-slate-300">
                  BALLS <strong className="text-emerald-400 font-bold">{ballsLeft}</strong>
                </span>
              </div>
              <div className="text-[11px] text-slate-500 hidden sm:block">
                MOVE MOUSE / DRAG TO DEFLECT
              </div>
            </>
          ) : (
            <div className="w-full flex justify-between items-center text-[11px] text-slate-500 uppercase tracking-widest">
              <span>EASTER EGG // INTERACTIVE PIXEL BREAKOUT</span>
              <span className="hidden sm:inline">ZERO-OVERHEAD CANVAS ENGINE</span>
            </div>
          )}
        </div>

        {/* Game Arena Canvas */}
        <div className="relative w-full h-[220px] sm:h-[300px] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            onPointerMove={handlePointerMove}
            className={`w-full h-full block ${isPlaying ? "cursor-none touch-none" : "cursor-default"}`}
          />

          {/* Overlay: Game Won */}
          {isPlaying && gameState === "won" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <Trophy size={36} className="text-amber-400 animate-bounce" />
              <div className="text-xl font-heading font-extrabold tracking-wider text-white">
                ALL PIXELS VERIFIED &amp; BROKEN!
              </div>
              <p className="text-xs font-mono text-slate-400">Score: {brokenCount} blocks obliterated</p>
              <button
                type="button"
                onClick={() => initGame(true)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cobalt text-white font-mono text-xs font-bold hover:bg-cobalt/90 transition-all"
              >
                <RotateCcw size={13} /> PLAY AGAIN
              </button>
            </div>
          )}

          {/* Overlay: Game Lost */}
          {isPlaying && gameState === "lost" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <div className="text-xl font-heading font-extrabold tracking-wider text-rose-400">
                OUT OF BALLS!
              </div>
              <p className="text-xs font-mono text-slate-400">You broke {brokenCount} pixel blocks</p>
              <button
                type="button"
                onClick={() => initGame(true)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold border border-white/20 transition-all"
              >
                <RotateCcw size={13} /> TRY AGAIN
              </button>
            </div>
          )}
        </div>

        {/* Action Button: ▶ PLAY / ✕ CLOSE */}
        <div className="mt-6 flex flex-col items-center gap-2">
          {!isPlaying ? (
            <button
              type="button"
              onClick={startPlaying}
              aria-label="Play Breakout Easter Egg"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-bold tracking-widest uppercase text-white shadow-lg transition-all hover:scale-105 active:scale-95 group"
            >
              <Play size={13} className="text-cobalt fill-cobalt group-hover:scale-110 transition-transform" />
              <span>PLAY</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={closeGame}
              aria-label="Close Breakout Easter Egg"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-mono font-semibold tracking-wider uppercase text-slate-300 hover:text-white transition-all active:scale-95"
            >
              <X size={13} />
              <span>CLOSE</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-slate-500">
            {isPlaying ? "Drag paddle to bounce the ball · Break all blocks" : "Atari Breakout homage · Built with vanilla Canvas 2D"}
          </span>
        </div>
      </div>
    </section>
  );
}
