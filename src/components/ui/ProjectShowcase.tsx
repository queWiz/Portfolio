"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { PROJECTS, type Project } from "@/components/projects/data";
import { ProjectMockup } from "@/components/projects/ProjectMockups";
import { ProjectShots, layoutOf } from "@/components/projects/ProjectVisual";
import { EASE_OUT, VIEWPORT } from "@/lib/motion";

/** Leo-style unmask: the card opens out of an inset clip while rising. */
const UNMASK_EASE = [0.16, 1, 0.3, 1] as const;

export function ProjectShowcase() {
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const show = (p: Project, el: HTMLElement) => {
    opener.current = el;
    setOpen(p);
  };
  const close = useCallback(() => {
    setOpen(null);
    // Return focus to the card that opened the dialog.
    requestAnimationFrame(() => opener.current?.focus());
  }, []);

  const [featured, ...rest] = PROJECTS;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14">
        <ProjectCard project={featured} order={0} featured onOpen={show} />
        {rest.map((p, i) => (
          <ProjectCard key={p.id} project={p} order={i + 1} onOpen={show} />
        ))}
      </div>

      <AnimatePresence>{open && <CaseStudy project={open} onClose={close} />}</AnimatePresence>
    </>
  );
}

function ProjectCard({
  project,
  order,
  featured,
  onOpen,
}: {
  project: Project;
  order: number;
  featured?: boolean;
  onOpen: (p: Project, el: HTMLElement) => void;
}) {
  const reduce = useReducedMotion();
  // Cards in the same row start a beat apart.
  const delay = featured ? 0 : ((order - 1) % 2) * 0.12;

  return (
    <article className={`group/card ${featured ? "md:col-span-2" : ""}`}>
      <motion.div
        initial={reduce ? false : { clipPath: "inset(14% 7% 0% 7% round 28px)", y: 56, opacity: 0 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", y: 0, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 1.3, ease: UNMASK_EASE, delay }}
        style={{ background: project.tint }}
        className={`relative overflow-hidden rounded-[28px] border border-line/60 ${panelPadding(project, featured)}`}
      >
        <Visual project={project} featured={featured} />
      </motion.div>

      <motion.button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={VIEWPORT}
        transition={{ duration: 0.8, ease: EASE_OUT, delay: delay + 0.35 }}
        className={`group mt-5 w-full text-left rounded-2xl ${featured ? "md:grid md:grid-cols-12 md:gap-6" : ""}`}
        aria-haspopup="dialog"
      >
        <div className={featured ? "md:col-span-5" : undefined}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.025em] text-ink">{project.title}</h3>
            <span className="shrink-0 font-mono text-[12px] text-muted">{project.year}</span>
          </div>
          <p className="mt-1 font-mono text-[12px] text-muted">{project.kind}</p>
        </div>
        <div className={featured ? "md:col-span-7" : undefined}>
          <p className={`text-[15px] leading-relaxed text-ink-2 ${featured ? "mt-3 md:mt-1" : "mt-3"}`}>{project.summary}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-ink">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">
              Read case study
            </span>
            <ArrowUpRight size={15} className="text-muted transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </motion.button>
    </article>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      // Keep Tab inside the dialog.
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button aria-label="Close case study" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-black/35 dark:bg-black/60 backdrop-blur-sm cursor-default" />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`cs-${project.id}`}
        initial={{ y: 48, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 32, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="relative w-full sm:max-w-3xl overflow-hidden rounded-t-[28px] sm:rounded-[28px] border border-line bg-surface shadow-2xl"
      >
        {/* The rounded shell clips; this inner layer scrolls, so the scrollbar never crosses the corners. */}
        <div className="case-scroll max-h-[92svh] overflow-y-auto overscroll-contain">
        <div className={`relative overflow-hidden ${layoutOf(project) === "phone" ? "px-5 pt-10 sm:px-12" : "px-5 py-10 sm:px-12"}`} style={{ background: project.tint }}>
          <button
            ref={closeBtn}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-surface/80 text-ink-2 backdrop-blur transition-colors hover:text-ink"
          >
            <X size={16} />
          </button>
          <Visual project={project} inDialog />
        </div>

        <div className="px-6 py-8 sm:px-12 sm:py-10">
          <p className="font-mono text-[12px] text-muted">
            {project.kind} · {project.year}
          </p>
          <h3 id={`cs-${project.id}`} className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink">
            {project.title}
          </h3>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{project.overview}</p>

          {project.stats.length > 0 && (
            <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-line py-6">
              {project.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-3xl font-semibold tracking-tight text-ink">{s.value}</dd>
                  <dd className="mt-1 text-[13px] text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          )}

          <h4 className="mt-8 text-[13px] font-medium text-ink">What I did · {project.role}</h4>
          <ul className="mt-3 space-y-3">
            {project.work.map((w) => (
              <li key={w} className="flex gap-3 text-[15px] leading-relaxed text-ink-2">
                <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                {w}
              </li>
            ))}
          </ul>

          {project.shots && project.hasMock && (
            <div className="mt-10">
              <h4 className="text-[13px] font-medium text-ink">How it works</h4>
              <p className="mt-1 text-[13px] text-muted">A small interactive sketch of the idea. Try the controls.</p>
              <div className="mt-4 rounded-2xl p-5 sm:p-8" style={{ background: project.tint }}>
                <div className="mx-auto max-w-md">
                  <ProjectMockup id={project.id} />
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <ul className="flex flex-wrap gap-1.5" aria-label="Stack">
              {project.stack.map((t) => (
                <li key={t} className="rounded-full bg-ink/[0.05] px-2.5 py-1 text-[12px] text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-paper transition-transform duration-200 ease-out active:scale-[0.97]"
              >
                <Github size={14} /> Source <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function panelPadding(project: Project, featured?: boolean) {
  const layout = layoutOf(project);
  if (featured) return "px-5 py-10 sm:px-12 sm:py-14 lg:py-16";
  // Every grid card shares one fixed visual height so rows line up whatever the content.
  // Phone screenshots start near the top and are clipped by the bottom edge (they "rise" out of it).
  if (layout === "phone") return "flex h-[380px] sm:h-[440px] items-start justify-center px-5 pt-10 sm:px-10";
  return "flex h-[380px] sm:h-[440px] items-center px-5 sm:px-10";
}

/** Screenshots when we have them, otherwise the interactive mockup. */
function Visual({ project, featured, inDialog }: { project: Project; featured?: boolean; inDialog?: boolean }) {
  if (project.shots?.length) {
    const wide = layoutOf(project) !== "phone";
    return (
      <div className={`mx-auto w-full ${wide ? (featured ? "max-w-3xl" : inDialog ? "max-w-2xl" : "max-w-xl") : ""}`}>
        <ProjectShots project={project} large={featured} />
      </div>
    );
  }
  return (
    <div className={`mx-auto w-full ${featured ? "max-w-xl" : "max-w-md"}`}>
      <ProjectMockup id={project.id} />
    </div>
  );
}
