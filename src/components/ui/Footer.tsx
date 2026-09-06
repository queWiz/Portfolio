import type { ReactNode } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-black py-12 text-center z-10 relative">
      <div className="flex justify-center gap-8 mb-6">
        <SocialLink href="https://github.com/queWiz" icon={<Github size={18} />} label="GitHub" />
        <SocialLink href="https://linkedin.com/in/ualqarni" icon={<Linkedin size={18} />} label="LinkedIn" />
        <SocialLink href="mailto:ualqarni70@gmail.com" icon={<Mail size={18} />} label="Email" />
      </div>

      <p className="text-muted text-xs font-mono tracking-widest uppercase">
        © {new Date().getFullYear()} Uwais Alqarni · Verified Architecture
      </p>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: ReactNode; label: string }) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
    aria-label={label}
    className="text-muted hover:text-cream transition-colors flex flex-col items-center gap-1.5 group"
  >
    <div className="p-3 rounded-full bg-neutral-900/80 border border-borderWarm group-hover:border-accent-green/50 group-hover:text-accent-green transition-colors">
      {icon}
    </div>
    <span className="text-[11px] font-mono opacity-60 group-hover:opacity-100 transition-opacity">
      {label}
    </span>
  </a>
);