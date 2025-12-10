import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-black py-12 text-center z-10 relative">
      <div className="flex justify-center gap-8 mb-8">
        <SocialLink href="https://github.com/YOUR_GITHUB" icon={<Github size={20} />} label="GitHub" />
        <SocialLink href="https://linkedin.com/in/YOUR_LINKEDIN" icon={<Linkedin size={20} />} label="LinkedIn" />
        <SocialLink href="mailto:your.email@example.com" icon={<Mail size={20} />} label="Email" />
      </div>
      <p className="text-neutral-600 text-sm font-mono">
        © {new Date().getFullYear()} System Offline.
      </p>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }: { href: string; icon: any; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    className="text-neutral-500 hover:text-white transition-colors flex flex-col items-center gap-2 group"
  >
    <div className="p-3 rounded-full bg-neutral-900 border border-neutral-800 group-hover:border-neutral-600 transition-colors">
      {icon}
    </div>
    <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
  </a>
);