import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-neutral-900 bg-black pt-12 pb-32 text-center z-10 relative">
      {/* 
         pb-32 (Padding Bottom 8rem) ensures content is well above the Floating Dock.
      */}
      
      <div className="flex justify-center gap-8 mb-8">
        <SocialLink href="https://github.com/queWiz" icon={<Github size={20} />} label="GitHub" />
        <SocialLink href="https://linkedin.com/in/ualqarni" icon={<Linkedin size={20} />} label="LinkedIn" />
        <SocialLink href="mailto:your.email@example.com" icon={<Mail size={20} />} label="Email" />
      </div>
      
      <p className="text-neutral-700 text-xs font-mono uppercase tracking-widest">
        © {new Date().getFullYear()} System Online.
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