import type { ReactNode } from "react";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200/80 dark:border-white/[0.08] bg-white/50 dark:bg-[#080C14]/50 py-16 px-6 relative z-10 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <div className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white mb-1.5 flex items-center justify-center md:justify-start gap-1">
            UWAIS ALQARNI<span className="text-cobalt">.</span>
          </div>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400 max-w-sm">
            Software &amp; Data Engineer · Singapore Institute of Technology (SIT)
          </p>
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500 mt-1">
            Distributed data systems, edge AI, and verified architecture.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
          <SocialLink
            href="https://github.com/queWiz"
            icon={<Github size={15} />}
            label="queWiz"
          />
          <SocialLink
            href="https://github.com/ooWise"
            icon={<Github size={15} />}
            label="ooWise"
          />
          <SocialLink
            href="https://orcid.org/0009-0006-6833-4965"
            icon={<span className="font-mono text-xs font-bold text-emerald-500">iD</span>}
            label="ORCID"
          />
          <SocialLink
            href="https://linkedin.com/in/ualqarni"
            icon={<Linkedin size={15} />}
            label="LinkedIn"
          />
          <SocialLink
            href="mailto:ualqarni70@gmail.com"
            icon={<Mail size={15} />}
            label="Email"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-12 pt-6 border-t border-slate-200/60 dark:border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-500">
        <span>© {new Date().getFullYear()} Uwais Alqarni · All Rights Reserved</span>
        <span>Nordic Ceramic &amp; Obsidian Architecture · Built for High Integrity</span>
      </div>
    </footer>
  );
};

const SocialLink = ({
  href,
  icon,
  label,
}: {
  href: string;
  icon: ReactNode;
  label: string;
}) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
    aria-label={label}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-[#111622] border border-slate-200/90 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-slate-300 hover:text-cobalt hover:border-cobalt/40 transition-all group"
  >
    <span className="text-slate-500 group-hover:text-cobalt transition-colors">
      {icon}
    </span>
    <span>{label}</span>
    <ArrowUpRight
      size={12}
      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
    />
  </a>
);