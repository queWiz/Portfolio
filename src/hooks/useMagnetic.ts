"use client";

import { useEffect, useRef } from "react";

interface MagneticOptions {
  strength?: number;
  textStrength?: number;
}

export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(
  options: MagneticOptions = {}
) {
  const { strength = 0.35, textStrength = 0.55 } = options;
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Strict hardware guard: disable on touch devices
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    let rafId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        const textX = (e.clientX - centerX) * textStrength;
        const textY = (e.clientY - centerY) * textStrength;

        el.style.setProperty("--mag-x", `${deltaX}px`);
        el.style.setProperty("--mag-y", `${deltaY}px`);
        el.style.setProperty("--mag-text-x", `${textX}px`);
        el.style.setProperty("--mag-text-y", `${textY}px`);
      });
    };

    const handlePointerLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.style.setProperty("--mag-x", "0px");
      el.style.setProperty("--mag-y", "0px");
      el.style.setProperty("--mag-text-x", "0px");
      el.style.setProperty("--mag-text-y", "0px");
    };

    el.addEventListener("pointermove", handlePointerMove);
    el.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      el.removeEventListener("pointermove", handlePointerMove);
      el.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [strength, textStrength]);

  return ref;
}
