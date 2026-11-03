"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  RotateCcw,
  Trophy,
  HardHat,
  Crown,
  Glasses,
  Shield,
  Zap,
  User,
  Flame,
  Wind,
  Sparkles,
  Palette,
  X,
  Check,
  SlidersHorizontal,
  Play,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type HeadgearId = "hardhat" | "crown" | "goggles" | "helmet" | "ninja" | "none";
export type PropulsionId = "jetpack" | "wings" | "lightning" | "balloon";
export type SuitId = "cobalt" | "cyber" | "emerald" | "hazard";

export interface Loadout {
  headgear: HeadgearId;
  propulsion: PropulsionId;
  suit: SuitId;
}

interface HeadgearOption {
  id: HeadgearId;
  name: string;
  tag: string;
  spec: string;
  desc: string;
  icon: typeof HardHat;
  color: string;
}

interface PropulsionOption {
  id: PropulsionId;
  name: string;
  tag: string;
  spec: string;
  desc: string;
  icon: typeof Flame;
  color: string;
}

interface SuitOption {
  id: SuitId;
  name: string;
  tag: string;
  color: string;
  accent: string;
  desc: string;
}

const HEADGEAR_CATALOG: HeadgearOption[] = [
  {
    id: "hardhat",
    name: "Cyber Hardhat",
    tag: "INDUSTRIAL-A4",
    spec: "Grade-5 Polymer",
    desc: "Reinforced impact brim with cobalt HUD optics",
    icon: HardHat,
    color: "#3B82F6",
  },
  {
    id: "crown",
    name: "Royal Crown",
    tag: "PRECISION-GOLD",
    spec: "Ruby Crystal Core",
    desc: "24-karat pixel coronal structure with gemstone diodes",
    icon: Crown,
    color: "#F59E0B",
  },
  {
    id: "goggles",
    name: "VR Cyber Visor",
    tag: "OPTIC-SCAN",
    spec: "Dual Neon Scan",
    desc: "Full-spectrum optical matrix with real-time telemetry",
    icon: Glasses,
    color: "#06B6D4",
  },
  {
    id: "helmet",
    name: "Titanium Helm",
    tag: "TACTICAL-HEAVY",
    spec: "Composite Alloy",
    desc: "Full-containment ballistic shell with emerald filtration",
    icon: Shield,
    color: "#94A3B8",
  },
  {
    id: "ninja",
    name: "Crimson Band",
    tag: "STEALTH-FABRIC",
    spec: "Carbon Weave",
    desc: "Aerodynamic fluttering ribbon for reduced wind drag",
    icon: Zap,
    color: "#EF4444",
  },
  {
    id: "none",
    name: "Default Crew",
    tag: "STANDARD",
    spec: "Unmodified",
    desc: "Standard hair silhouette without external headgear",
    icon: User,
    color: "#64748B",
  },
];

const PROPULSION_CATALOG: PropulsionOption[] = [
  {
    id: "jetpack",
    name: "Dual Rocket Thrusters",
    tag: "THERMAL-BURST",
    spec: "Twin Combustion",
    desc: "High-temperature dual chamber liquid propellant rockets",
    icon: Flame,
    color: "#F59E0B",
  },
  {
    id: "wings",
    name: "Cyber Holographic Wings",
    tag: "AERO-HOLO",
    spec: "Kinetic Lift",
    desc: "Dual cyan photonic wings that flap during altitude changes",
    icon: Wind,
    color: "#06B6D4",
  },
  {
    id: "lightning",
    name: "Plasma Arc Reactor",
    tag: "ION-DISCHARGE",
    spec: "Electrostatic Pulse",
    desc: "Magnetic core venting supercharged electric spark trails",
    icon: Zap,
    color: "#FACC15",
  },
  {
    id: "balloon",
    name: "Antigravity Void Orb",
    tag: "GRAV-PULSE",
    spec: "Zero-G Stabilizer",
    desc: "Dark-matter micro sphere tethered with harmonic balance",
    icon: Sparkles,
    color: "#A855F7",
  },
];

const SUIT_CATALOG: SuitOption[] = [
  {
    id: "cobalt",
    name: "Cobalt Engineer",
    tag: "CORE BLUE",
    color: "#1E293B",
    accent: "#2563EB",
    desc: "Heavy slate insulation with electric cobalt primary accents",
  },
  {
    id: "cyber",
    name: "Neon Synthwave",
    tag: "CYBERPUNK",
    color: "#3B0764",
    accent: "#EC4899",
    desc: "Ultraviolet composite shell with high-luma magenta tracing",
  },
  {
    id: "emerald",
    name: "Matrix Runner",
    tag: "STEALTH RUNNER",
    color: "#064E3B",
    accent: "#10B981",
    desc: "Deep obsidian stealth mesh with phosphor emerald piping",
  },
  {
    id: "hazard",
    name: "Solar Hazard",
    tag: "HIGH VISIBILITY",
    color: "#7C2D12",
    accent: "#F97316",
    desc: "Extreme environment survival suit with solar flare orange",
  },
];

interface Pipe {
  x: number;
  topHeight: number;
  bottomY: number;
  w: number;
  passed: boolean;
}

interface FlapParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export function FlappyPixelGame() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Loadout state (persisted in localStorage)
  const [loadout, setLoadout] = useState<Loadout>({
    headgear: "hardhat",
    propulsion: "jetpack",
    suit: "cobalt",
  });
  const [isArmoryOpen, setIsArmoryOpen] = useState(false);
  const [armoryTab, setArmoryTab] = useState<"headgear" | "propulsion" | "suit">("headgear");

  const [gameState, setGameState] = useState<"idle" | "playing" | "dead">("idle");
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [levelNotification, setLevelNotification] = useState<string | null>(null);

  const gameStateRef = useRef<"idle" | "playing" | "dead">("idle");
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  const loadoutRef = useRef<Loadout>(loadout);
  useEffect(() => {
    loadoutRef.current = loadout;
  }, [loadout]);

  // Physics state (tuned to be floaty and accessible)
  const birdRef = useRef<{
    x: number;
    y: number;
    vy: number;
    radius: number;
    angle: number;
    wingFlap: number;
  }>({
    x: 120,
    y: 200,
    vy: 0,
    radius: 13,
    angle: 0,
    wingFlap: 0,
  });

  const pipesRef = useRef<Pipe[]>([]);
  const particlesRef = useRef<FlapParticle[]>([]);
  const frameCountRef = useRef(0);
  const scoreRef = useRef(0);

  // Load loadout & best score from localStorage
  useEffect(() => {
    // Read after mount (localStorage is browser-only), applied on the next frame.
    const id = requestAnimationFrame(() => {
      try {
        const savedScore = localStorage.getItem("portfolio_flappy_best");
        if (savedScore) setBestScore(parseInt(savedScore, 10) || 0);

        const savedLoadout = localStorage.getItem("portfolio_flappy_loadout");
        if (savedLoadout) {
          const parsed = JSON.parse(savedLoadout);
          setLoadout((prev) => ({ ...prev, ...parsed }));
        }
      } catch {}
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const updateLoadout = (partial: Partial<Loadout>) => {
    setLoadout((prev) => {
      const next = { ...prev, ...partial };
      try {
        localStorage.setItem("portfolio_flappy_loadout", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const saveHighScore = (newScore: number) => {
    setBestScore((prev) => {
      if (newScore > prev) {
        try {
          localStorage.setItem("portfolio_flappy_best", String(newScore));
        } catch {}
        return newScore;
      }
      return prev;
    });
  };

  // Gap difficulty scaling: starts SUPER BIG, smoothly narrows down without slowing flight speed
  const getPipeGap = (curScore: number, width: number) => {
    const isMobile = width < 640;
    if (curScore < 5) {
      return isMobile ? 185 : 210; // Extra huge starting gap
    } else if (curScore < 10) {
      return isMobile ? 172 : 192;
    } else if (curScore < 20) {
      return isMobile ? 158 : 176;
    } else if (curScore < 30) {
      return isMobile ? 144 : 162;
    } else {
      return isMobile ? 134 : 150;
    }
  };

  // Spawn propulsion particles
  const spawnFlapParticles = (x: number, y: number, propType: PropulsionId) => {
    let colors = ["#F59E0B", "#EF4444", "#FCD34D"];
    if (propType === "wings") colors = ["#38BDF8", "#06B6D4", "#E0F2FE"];
    if (propType === "lightning") colors = ["#FACC15", "#38BDF8", "#FFFFFF"];
    if (propType === "balloon") colors = ["#C084FC", "#A855F7", "#F472B6"];

    for (let i = 0; i < 7; i++) {
      particlesRef.current.push({
        x: x - 10,
        y: y + 2,
        vx: -(1.8 + Math.random() * 2.2),
        vy: (Math.random() - 0.5) * 2.5,
        size: 2.5 + Math.random() * 2.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
      });
    }
  };

  // Flap action
  const flap = useCallback(() => {
    if (isArmoryOpen) return;

    if (gameStateRef.current === "idle") {
      setGameState("playing");
      gameStateRef.current = "playing";
      birdRef.current.vy = -4.5;
      birdRef.current.angle = -0.3;
      spawnFlapParticles(birdRef.current.x, birdRef.current.y, loadoutRef.current.propulsion);
      return;
    }

    if (gameStateRef.current === "playing") {
      birdRef.current.vy = -4.5;
      birdRef.current.angle = -0.3;
      spawnFlapParticles(birdRef.current.x, birdRef.current.y, loadoutRef.current.propulsion);
    }
  }, [isArmoryOpen]);

  // Reset game state
  const resetGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();

    birdRef.current = {
      x: Math.min(180, Math.floor(rect.width * 0.22)),
      y: rect.height / 2,
      vy: 0,
      radius: 13,
      angle: 0,
      wingFlap: 0,
    };

    pipesRef.current = [];
    particlesRef.current = [];
    frameCountRef.current = 0;
    scoreRef.current = 0;
    setScore(0);
    setLevelNotification(null);
    setGameState("idle");
    gameStateRef.current = "idle";
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        flap();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flap]);

  // ResizeObserver for canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);

      if (gameStateRef.current === "idle") {
        birdRef.current.x = Math.min(180, Math.floor(rect.width * 0.22));
        birdRef.current.y = rect.height / 2;
      }
    };

    const ro = new ResizeObserver(updateCanvas);
    if (canvas.parentElement) ro.observe(canvas.parentElement);
    updateCanvas();

    return () => ro.disconnect();
  }, []);

  // 60FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const PIPE_SPEED = 2.5; // Constant, smooth arcade flight velocity

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

      const bird = birdRef.current;
      frameCountRef.current++;
      const currentGap = getPipeGap(scoreRef.current, width);

      // 2. Bird Motion & Physics
      if (gameStateRef.current === "idle") {
        bird.y = height / 2 + Math.sin(frameCountRef.current * 0.06) * 10;
        bird.angle = Math.sin(frameCountRef.current * 0.06) * 0.06;
        bird.wingFlap = Math.sin(frameCountRef.current * 0.15) * 6;
      } else if (gameStateRef.current === "playing") {
        // Floaty, comfortable gravity
        bird.vy += 0.17;
        bird.vy = Math.min(bird.vy, 5.8);
        bird.y += bird.vy;

        // Angle tilt
        const targetAngle = bird.vy < 0 ? -0.3 : Math.min(0.8, bird.vy * 0.14);
        bird.angle += (targetAngle - bird.angle) * 0.12;

        bird.wingFlap = bird.vy < 0 ? -6 : 3;

        // Boundaries
        if (bird.y + bird.radius >= height - 10) {
          bird.y = height - 10 - bird.radius;
          setGameState("dead");
          gameStateRef.current = "dead";
          saveHighScore(scoreRef.current);
        } else if (bird.y - bird.radius <= 0) {
          bird.y = bird.radius;
          bird.vy = 0;
        }

        // Spawn Pipes
        const pipeSpacing = width < 600 ? 210 : 270;
        const lastPipe = pipesRef.current[pipesRef.current.length - 1];

        if (!lastPipe || width - lastPipe.x >= pipeSpacing) {
          const gapSize = currentGap;
          const minPipeH = 45;
          const maxPipeH = height - gapSize - minPipeH;
          const topH = Math.floor(minPipeH + Math.random() * (maxPipeH - minPipeH));
          const pipeWidth = width < 600 ? 56 : 68;

          pipesRef.current.push({
            x: width + 20,
            topHeight: topH,
            bottomY: topH + gapSize,
            w: pipeWidth,
            passed: false,
          });
        }

        // Move Pipes & Check Collisions
        for (let i = pipesRef.current.length - 1; i >= 0; i--) {
          const p = pipesRef.current[i];
          p.x -= PIPE_SPEED;

          if (!p.passed && p.x + p.w < bird.x) {
            p.passed = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
            saveHighScore(scoreRef.current);

            if (scoreRef.current === 10) setLevelNotification("LEVEL 2 // DRIFT ACCELERATION");
            else if (scoreRef.current === 20) setLevelNotification("LEVEL 3 // HYPER FOCUS");
            else if (scoreRef.current === 30) setLevelNotification("LEVEL 4 // TABAYYUN OVERDRIVE");
          }

          const hitX = bird.x + bird.radius > p.x + 3 && bird.x - bird.radius < p.x + p.w - 3;
          const hitTop = bird.y - bird.radius < p.topHeight;
          const hitBottom = bird.y + bird.radius > p.bottomY;

          if (hitX && (hitTop || hitBottom)) {
            setGameState("dead");
            gameStateRef.current = "dead";
            saveHighScore(scoreRef.current);
          }

          if (p.x + p.w < -30) {
            pipesRef.current.splice(i, 1);
          }
        }
      }

      // 3. Draw Pipes (Cyber Firewall Towers)
      for (const p of pipesRef.current) {
        // TOP PILLAR
        ctx.fillStyle = "#0B111E";
        ctx.fillRect(p.x, 0, p.w, p.topHeight);
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x, 0, p.w, p.topHeight);

        // Glowing Cap
        ctx.fillStyle = "#0284C7";
        ctx.fillRect(p.x - 3, p.topHeight - 12, p.w + 6, 12);
        ctx.strokeStyle = "#38BDF8";
        ctx.strokeRect(p.x - 3, p.topHeight - 12, p.w + 6, 12);

        // Blinking LEDs
        ctx.fillStyle = "#38BDF8";
        ctx.fillRect(p.x + 8, Math.max(8, p.topHeight - 32), 4, 4);
        ctx.fillStyle = "#10B981";
        ctx.fillRect(p.x + 16, Math.max(8, p.topHeight - 32), 4, 4);

        // BOTTOM PILLAR
        const bottomHeight = height - p.bottomY;
        ctx.fillStyle = "#0B111E";
        ctx.fillRect(p.x, p.bottomY, p.w, bottomHeight);
        ctx.strokeStyle = "#1E293B";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(p.x, p.bottomY, p.w, bottomHeight);

        ctx.fillStyle = "#0284C7";
        ctx.fillRect(p.x - 3, p.bottomY, p.w + 6, 12);
        ctx.strokeStyle = "#38BDF8";
        ctx.strokeRect(p.x - 3, p.bottomY, p.w + 6, 12);

        ctx.fillStyle = "#F59E0B";
        ctx.fillRect(p.x + 8, p.bottomY + 20, 4, 4);
        ctx.fillStyle = "#38BDF8";
        ctx.fillRect(p.x + 16, p.bottomY + 20, 4, 4);
      }

      // 4. Draw Particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.032;

        if (pt.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.fillRect(pt.x, pt.y, pt.size, pt.size);
        ctx.restore();
      }

      // 5. Draw Customized Character
      ctx.save();
      ctx.translate(bird.x, bird.y);
      ctx.rotate(bird.angle);

      const curLoadout = loadoutRef.current;

      // --- A. PROPULSION ITEM ---
      if (curLoadout.propulsion === "jetpack") {
        ctx.fillStyle = "#94A3B8";
        ctx.fillRect(-13, -2, 5, 11);
        ctx.fillStyle = "#64748B";
        ctx.fillRect(-12, 9, 3, 2);
        if (gameStateRef.current === "playing") {
          ctx.fillStyle = "#38BDF8";
          ctx.fillRect(-19, 3, 7, 4);
          ctx.fillStyle = "#F59E0B";
          ctx.fillRect(-23, 4, 5, 2);
        }
      } else if (curLoadout.propulsion === "wings") {
        ctx.fillStyle = "#0284C7";
        ctx.beginPath();
        ctx.ellipse(-5, bird.wingFlap, 11, 6, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#38BDF8";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else if (curLoadout.propulsion === "lightning") {
        ctx.fillStyle = "#FACC15";
        ctx.shadowColor = "#FACC15";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(-11, 4, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (curLoadout.propulsion === "balloon") {
        ctx.fillStyle = "#A855F7";
        ctx.beginPath();
        ctx.arc(-12, -7, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#E9D5FF";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-12, -1);
        ctx.lineTo(-7, 3);
        ctx.stroke();
      }

      // --- B. SUIT BODY ---
      const suitDef = SUIT_CATALOG.find((s) => s.id === curLoadout.suit) || SUIT_CATALOG[0];
      ctx.fillStyle = suitDef.color;
      ctx.fillRect(-8, 3, 16, 9);
      ctx.fillStyle = suitDef.accent;
      ctx.fillRect(-2, 3, 5, 9);

      // --- C. FACE & EYES ---
      ctx.fillStyle = "#FCD34D";
      ctx.fillRect(-6, -5, 13, 8);
      ctx.fillStyle = "#0F172A";
      ctx.fillRect(1, -3, 3, 3);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(2, -3, 1, 1);

      // --- D. HEADGEAR ITEM ---
      if (curLoadout.headgear === "hardhat") {
        ctx.fillStyle = "#2563EB";
        ctx.fillRect(-8, -12, 16, 5);
        ctx.fillStyle = "#60A5FA";
        ctx.fillRect(-10, -8, 20, 3);
      } else if (curLoadout.headgear === "crown") {
        ctx.fillStyle = "#F59E0B";
        ctx.fillRect(-7, -13, 15, 6);
        ctx.fillRect(-7, -15, 3, 2);
        ctx.fillRect(-1, -15, 3, 2);
        ctx.fillRect(5, -15, 3, 2);
        ctx.fillStyle = "#EF4444";
        ctx.fillRect(-6, -11, 2, 2);
        ctx.fillRect(0, -11, 2, 2);
        ctx.fillRect(6, -11, 2, 2);
      } else if (curLoadout.headgear === "goggles") {
        ctx.fillStyle = "#06B6D4";
        ctx.shadowColor = "#06B6D4";
        ctx.shadowBlur = 6;
        ctx.fillRect(-1, -4, 9, 5);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(4, -3, 2, 1);
      } else if (curLoadout.headgear === "helmet") {
        ctx.fillStyle = "#334155";
        ctx.fillRect(-8, -13, 17, 10);
        ctx.fillStyle = "#10B981";
        ctx.fillRect(1, -6, 8, 2);
      } else if (curLoadout.headgear === "ninja") {
        ctx.fillStyle = "#DC2626";
        ctx.fillRect(-8, -9, 16, 4);
        ctx.fillRect(-13, -8, 5, 2);
        ctx.fillRect(-16, -6, 4, 2);
      } else {
        ctx.fillStyle = "#78350F";
        ctx.fillRect(-8, -11, 16, 6);
      }

      ctx.restore();

      // 6. Score Overlay
      if (gameStateRef.current === "playing") {
        ctx.save();
        ctx.font = "bold 38px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
        ctx.shadowBlur = 8;
        ctx.fillText(String(scoreRef.current), width / 2, 60);
        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
      animFrameRef.current = animId;
    };

    animId = requestAnimationFrame(tick);
    animFrameRef.current = animId;

    return () => cancelAnimationFrame(animId);
  }, []);

  const curHeadgear = HEADGEAR_CATALOG.find((h) => h.id === loadout.headgear) || HEADGEAR_CATALOG[0];
  const curPropulsion = PROPULSION_CATALOG.find((p) => p.id === loadout.propulsion) || PROPULSION_CATALOG[0];
  const curSuit = SUIT_CATALOG.find((s) => s.id === loadout.suit) || SUIT_CATALOG[0];

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col relative select-none"
    >
      {/* Sub-header Bar: Clean Enterprise Stats & Armory Access */}
      <div className="w-full border-b border-line bg-surface/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 py-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsArmoryOpen(true)}
              className="flex items-center gap-2 px-3 py-1 rounded-full border border-line text-ink-2 hover:text-ink hover:bg-ink/[0.05] text-[13px] transition-colors group"
            >
              <SlidersHorizontal size={13} className="group-hover:rotate-45 transition-transform" />
              <span>Customise</span>
            </button>

            <div className="hidden md:flex items-center gap-2 text-[12px] text-muted">
              <span>{curHeadgear.name}</span>
              <span aria-hidden>·</span>
              <span>{curPropulsion.name}</span>
              <span aria-hidden>·</span>
              <span>{curSuit.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-5 font-mono text-[12px] text-muted tabular-nums">
            <span>Score <strong className="font-medium text-ink">{score}</strong></span>
            <span className="flex items-center gap-1.5">
              <Trophy size={13} />
              Best <strong className="font-medium text-accent">{bestScore}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Game Stage Canvas */}
      <div
        onClick={flap}
        className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] bg-console cursor-pointer overflow-hidden"
      >
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />

        {/* Milestone Toast Notification */}
        <AnimatePresence>
          {levelNotification && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onAnimationComplete={() => {
                setTimeout(() => setLevelNotification(null), 2000);
              }}
              className="absolute top-14 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md text-white text-[13px] pointer-events-none z-20"
            >
              {levelNotification}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 100% Centered Pre-Game Start Overlay */}
        {gameState === "idle" && !isArmoryOpen && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-none z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="pointer-events-auto cursor-pointer"
              onClick={flap}
            >
              <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-black/50 px-5 py-3 text-[14px] text-white/85 backdrop-blur-md transition-colors duration-200 hover:border-white/30">
                Press <kbd className="rounded-md border border-white/20 px-1.5 py-0.5 font-mono text-[12px] text-white">Space</kbd> or click to fly
                <span>▲</span>
              </div>
            </motion.div>

            <div className="flex items-center gap-2 mt-4 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsArmoryOpen(true);
                }}
                className="px-4 py-1.5 rounded-full border border-white/15 text-[13px] text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal size={12} />
                <span>Change your look</span>
              </button>
            </div>
          </div>
        )}

        {/* Game Over Overlay */}
        {gameState === "dead" && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 pointer-events-auto">
            {score > 0 && score >= bestScore && (
              <motion.p
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 14 }}
                className="mb-3 rounded-full bg-[rgb(var(--arcade-a))] px-3 py-1 font-mono text-[12px] font-medium text-black"
              >
                New best
              </motion.p>
            )}
            <h3 className="text-3xl sm:text-4xl font-semibold tracking-[-0.035em] text-white">Crashed.</h3>
            <p className="mt-2 mb-5 max-w-md text-[15px] text-white/70">Happens to the best pilots.</p>

            <div className="flex items-center gap-8 px-8 py-3.5 rounded-2xl border border-white/10 mb-6">
              <div className="text-center">
                <div className="font-mono text-[11px] text-white/50">Score</div>
                <div className="text-3xl font-semibold tabular-nums text-white">{score}</div>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                <div className="font-mono text-[11px] text-white/50">Best</div>
                <div className="text-3xl font-semibold tabular-nums text-[rgb(var(--arcade-a))]">{bestScore}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  resetGame();
                }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-black transition-transform active:scale-[0.97]"
              >
                <RotateCcw size={14} />
                <span>Fly again</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsArmoryOpen(true);
                }}
                className="px-5 py-2.5 rounded-full border border-white/20 hover:bg-white/10 text-[14px] text-white/85 transition-colors flex items-center gap-2"
              >
                <SlidersHorizontal size={13} />
                <span>Change look</span>
              </button>
            </div>
          </div>
        )}

        {/* IN-GAME EQUIPMENT ARMORY (Enterprise Card Conventions, Zero Emojis) */}
        <AnimatePresence>
          {isArmoryOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-0 bg-slate-950/95 dark:bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center p-4 sm:p-6"
            >
              <div className="w-full max-w-3xl bg-console border border-slate-800 dark:border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-cobalt/15 border border-cobalt/30 text-cobalt dark:text-cyan-400">
                      <SlidersHorizontal size={16} />
                    </span>
                    <div>
                      <h4 className="font-heading font-semibold text-white text-base sm:text-lg tracking-[-0.035em]">
                        Agent Loadout Configuration
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">
                        Operational equipment modules &amp; harmonic frequency matrix
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsArmoryOpen(false)}
                    className="p-1.5 rounded-full hover:bg-surface/10 text-slate-400 hover:text-white transition-colors"
                    aria-label="Close loadout armory"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Main Body: Live Holochamber Preview + Tabbed Selector */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-4">
                  {/* Left Column: Live Tactical Holochamber */}
                  <div className="md:col-span-4 rounded-xl bg-slate-950 border border-white/10 p-4 flex flex-col items-center justify-between shadow-inner">
                    <div className="w-full flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-white/5">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Preview</span>
                      </span>
                      <span></span>
                    </div>

                    {/* Scaled Preview Sprite */}
                    <div className="my-4 relative w-24 h-24 flex items-center justify-center">
                      <svg width="64" height="64" viewBox="-18 -20 36 36" className="">
                        {/* Propulsion */}
                        {loadout.propulsion === "jetpack" && (
                          <>
                            <rect x="-13" y="-2" width="5" height="11" fill="#94A3B8" />
                            <rect x="-12" y="9" width="3" height="2" fill="#64748B" />
                            <rect x="-19" y="3" width="7" height="4" fill="#38BDF8" />
                            <rect x="-23" y="4" width="5" height="2" fill="#F59E0B" />
                          </>
                        )}
                        {loadout.propulsion === "wings" && (
                          <ellipse cx="-5" cy="0" rx="11" ry="6" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
                        )}
                        {loadout.propulsion === "lightning" && (
                          <circle cx="-11" cy="4" r="5" fill="#FACC15" />
                        )}
                        {loadout.propulsion === "balloon" && (
                          <>
                            <circle cx="-12" cy="-7" r="6" fill="#A855F7" stroke="#E9D5FF" strokeWidth="1" />
                            <line x1="-12" y1="-1" x2="-7" y2="3" stroke="#E9D5FF" strokeWidth="1" />
                          </>
                        )}

                        {/* Suit */}
                        <rect x="-8" y="3" width="16" height="9" fill={curSuit.color} />
                        <rect x="-2" y="3" width="5" height="9" fill={curSuit.accent} />

                        {/* Face */}
                        <rect x="-6" y="-5" width="13" height="8" fill="#FCD34D" />
                        <rect x="1" y="-3" width="3" height="3" fill="#0F172A" />
                        <rect x="2" y="-3" width="1" height="1" fill="#FFFFFF" />

                        {/* Headgear */}
                        {loadout.headgear === "hardhat" && (
                          <>
                            <rect x="-8" y="-12" width="16" height="5" fill="#2563EB" />
                            <rect x="-10" y="-8" width="20" height="3" fill="#3B82F6" />
                          </>
                        )}
                        {loadout.headgear === "crown" && (
                          <>
                            <rect x="-7" y="-13" width="15" height="6" fill="#F59E0B" />
                            <rect x="-7" y="-15" width="3" height="2" fill="#F59E0B" />
                            <rect x="-1" y="-15" width="3" height="2" fill="#F59E0B" />
                            <rect x="5" y="-15" width="3" height="2" fill="#F59E0B" />
                            <rect x="-6" y="-11" width="2" height="2" fill="#EF4444" />
                            <rect x="0" y="-11" width="2" height="2" fill="#EF4444" />
                            <rect x="6" y="-11" width="2" height="2" fill="#EF4444" />
                          </>
                        )}
                        {loadout.headgear === "goggles" && (
                          <>
                            <rect x="-1" y="-4" width="9" height="5" fill="#06B6D4" />
                            <rect x="4" y="-3" width="2" height="1" fill="#FFFFFF" />
                          </>
                        )}
                        {loadout.headgear === "helmet" && (
                          <>
                            <rect x="-8" y="-13" width="17" height="10" fill="#334155" />
                            <rect x="1" y="-6" width="8" height="2" fill="#10B981" />
                          </>
                        )}
                        {loadout.headgear === "ninja" && (
                          <>
                            <rect x="-8" y="-9" width="16" height="4" fill="#DC2626" />
                            <rect x="-13" y="-8" width="5" height="2" fill="#DC2626" />
                            <rect x="-16" y="-6" width="4" height="2" fill="#DC2626" />
                          </>
                        )}
                        {loadout.headgear === "none" && (
                          <rect x="-8" y="-11" width="16" height="6" fill="#78350F" />
                        )}
                      </svg>
                    </div>

                    <div className="w-full text-[10px] font-mono space-y-1 text-slate-400 pt-2 border-t border-white/5">
                      <div className="flex justify-between">
                        <span>Head:</span>
                        <span className="text-white font-bold">{curHeadgear.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Thrust:</span>
                        <span className="text-white font-bold">{curPropulsion.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Suit:</span>
                        <span className="text-white font-bold">{curSuit.name}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Category Tabs & Option Cards */}
                  <div className="md:col-span-8 flex flex-col">
                    {/* Category Navigation Pills */}
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10 mb-3.5">
                      <button
                        onClick={() => setArmoryTab("headgear")}
                        className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          armoryTab === "headgear"
                            ? "bg-cobalt text-on-accent shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <HardHat size={13} />
                        <span>Headgear</span>
                      </button>
                      <button
                        onClick={() => setArmoryTab("propulsion")}
                        className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          armoryTab === "propulsion"
                            ? "bg-cobalt text-on-accent shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Wind size={13} />
                        <span>Thrusters</span>
                      </button>
                      <button
                        onClick={() => setArmoryTab("suit")}
                        className={`flex-1 py-1.5 px-2 rounded-lg font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                          armoryTab === "suit"
                            ? "bg-cobalt text-on-accent shadow"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Palette size={13} />
                        <span>Suit</span>
                      </button>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto pr-1">
                      {armoryTab === "headgear" &&
                        HEADGEAR_CATALOG.map((item) => {
                          const isEquipped = loadout.headgear === item.id;
                          const IconComp = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => updateLoadout({ headgear: item.id })}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                isEquipped
                                  ? "bg-cobalt/15 border-cobalt ring-1 ring-cobalt/40 shadow-sm"
                                  : "bg-surface/[0.02] border-white/10 hover:border-white/20 hover:bg-surface/[0.04]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="p-1 rounded-md bg-surface/5 border border-white/10">
                                    <IconComp size={15} style={{ color: item.color }} />
                                  </span>
                                  <span className="font-mono text-xs font-bold text-white">
                                    {item.name}
                                  </span>
                                </div>
                                {isEquipped && (
                                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
                                    <Check size={10} />
                                    <span>Equipped</span>
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400 leading-snug">
                                {item.desc}
                              </div>
                            </button>
                          );
                        })}

                      {armoryTab === "propulsion" &&
                        PROPULSION_CATALOG.map((item) => {
                          const isEquipped = loadout.propulsion === item.id;
                          const IconComp = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => updateLoadout({ propulsion: item.id })}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                isEquipped
                                  ? "bg-cobalt/15 border-cobalt ring-1 ring-cobalt/40 shadow-sm"
                                  : "bg-surface/[0.02] border-white/10 hover:border-white/20 hover:bg-surface/[0.04]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span className="p-1 rounded-md bg-surface/5 border border-white/10">
                                    <IconComp size={15} style={{ color: item.color }} />
                                  </span>
                                  <span className="font-mono text-xs font-bold text-white">
                                    {item.name}
                                  </span>
                                </div>
                                {isEquipped && (
                                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
                                    <Check size={10} />
                                    <span>Equipped</span>
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400 leading-snug">
                                {item.desc}
                              </div>
                            </button>
                          );
                        })}

                      {armoryTab === "suit" &&
                        SUIT_CATALOG.map((item) => {
                          const isEquipped = loadout.suit === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => updateLoadout({ suit: item.id })}
                              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                                isEquipped
                                  ? "bg-cobalt/15 border-cobalt ring-1 ring-cobalt/40 shadow-sm"
                                  : "bg-surface/[0.02] border-white/10 hover:border-white/20 hover:bg-surface/[0.04]"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-4 h-4 rounded-full border border-white/20 shadow-sm"
                                    style={{ backgroundColor: item.accent }}
                                  />
                                  <span className="font-mono text-xs font-bold text-white">
                                    {item.name}
                                  </span>
                                </div>
                                {isEquipped && (
                                  <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-800">
                                    <Check size={10} />
                                    <span>Equipped</span>
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-slate-400 leading-snug">
                                {item.desc}
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                </div>

                {/* Footer Save & Confirm Button */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                    <ShieldCheck size={14} className="text-emerald-400" />
                    <span>Hardware state synchronized to terminal storage</span>
                  </span>
                  <button
                    onClick={() => setIsArmoryOpen(false)}
                    className="btn-nordic px-5 py-2 font-mono text-xs font-bold tracking-wider uppercase flex items-center gap-2"
                  >
                    <Check size={14} />
                    <span>Done</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="w-full border-t border-line bg-surface/60 py-2.5 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-12 flex flex-wrap items-center justify-between gap-3 text-[12px] text-muted">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <Play size={11} />
              <span>Space or click to flap</span>
            </span>
            <span className={gameState === "playing" ? "text-moss" : "text-accent"}>
              {gameState === "playing" ? "In flight" : "Ready"}
            </span>
          </div>
          <div>
            <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px]">Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
}
