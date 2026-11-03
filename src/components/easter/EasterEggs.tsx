"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Site-wide easter eggs:
 * - Konami code (↑ ↑ ↓ ↓ ← → ← → B A) bursts pixels across the screen and opens the arcade.
 * - A hello in the browser console for anyone who opens DevTools.
 */

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const COLORS = ["rgb(var(--arcade-a))", "rgb(var(--arcade-b))", "rgb(var(--arcade-c))", "rgb(var(--accent))"];

type Pixel = { id: number; x: number; y: number; size: number; color: string; rotate: number };

let greeted = false;

export function EasterEggs() {
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState<{ key: number; pixels: Pixel[] } | null>(null);

  // Console hello (once per page load)
  useEffect(() => {
    if (greeted) return;
    greeted = true;
    console.log(
      "%c▚▚ hi, curious one ▞▞%c\nYou opened DevTools on a portfolio, so you're my kind of person.\nTry the terminal on the page (type `help`), or press ↑ ↑ ↓ ↓ ← → ← → B A.\nSay hello: ualqarni70@gmail.com",
      "font: 600 14px ui-monospace, monospace; color: #E64833;",
      "font: 12px ui-monospace, monospace; color: inherit;"
    );
  }, []);

  // Konami code listener
  useEffect(() => {
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === KONAMI[pos] ? pos + 1 : k === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) {
        pos = 0;
        const pixels: Pixel[] = Array.from({ length: reduce ? 0 : 70 }, (_, i) => {
          const angle = Math.random() * Math.PI * 2;
          const dist = 180 + Math.random() * 520;
          return {
            id: i,
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist * 0.75 - 80,
            size: 6 + Math.floor(Math.random() * 3) * 4,
            color: COLORS[i % COLORS.length],
            rotate: Math.random() * 180 - 90,
          };
        });
        setBurst({ key: Date.now(), pixels });
        setTimeout(() => setBurst(null), 1600);
        window.dispatchEvent(new CustomEvent("arcade:open", { detail: { game: "breakout" } }));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduce]);

  return (
    <AnimatePresence>
      {burst && (
        <div key={burst.key} aria-hidden className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center">
          <motion.p
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            className="absolute rounded-full bg-ink px-4 py-2 font-mono text-[13px] text-paper shadow-lg"
          >
            +30 lives. Just kidding. Enjoy the arcade.
          </motion.p>
          {burst.pixels.map((p) => (
            <motion.span
              key={p.id}
              className="absolute"
              style={{ width: p.size, height: p.size, background: p.color }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: p.x, y: [0, p.y, p.y + 260], opacity: [1, 1, 0], rotate: p.rotate }}
              transition={{ duration: 1.4, ease: "easeOut", times: [0, 0.45, 1] }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
