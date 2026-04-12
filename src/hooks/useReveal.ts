"use client";
import { useEffect, useRef } from "react";

export function useReveal({ delay = 0 }: { delay?: number } = {}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }, delay);
        } else {
          // Fade out when scrolling away (bi-directional)
          el.style.opacity = "0";
          el.style.transform = "translateY(24px)";
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return ref;
}