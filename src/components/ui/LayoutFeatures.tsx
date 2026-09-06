"use client";
import { useEffect, useState } from "react";
import { PrayerTime } from "./StatusWidgets";
import { Menu, X } from "lucide-react";

export function TopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0f]/85 backdrop-blur-md border-b border-borderWarm/70 py-3.5 shadow-xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Brand Logo */}
        <a
          href="#home"
          aria-label="Uwais Alqarni Home"
          className="font-mono font-bold text-cream text-lg tracking-tighter hover:text-accent-green transition-colors"
        >
          UA<span className="text-accent-green">.</span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-xs font-mono text-muted font-semibold absolute left-1/2 -translate-x-1/2"
        >
          <a href="#about" className="hover:text-cream transition-colors">
            /about
          </a>
          <a href="#work" className="hover:text-cream transition-colors">
            /work
          </a>
          <a href="mailto:ualqarni70@gmail.com" className="hover:text-cream transition-colors">
            /contact
          </a>
        </nav>

        {/* Action Group */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            aria-label="Download Uwais Alqarni Resume PDF"
            className="inline-flex h-9 items-center justify-center rounded-full border border-accent-green/40 bg-accent-green/10 px-5 font-mono text-xs font-bold tracking-widest text-accent-green hover:bg-accent-green hover:text-black transition-all"
          >
            RESUME
          </a>

          {/* Sticky Animated Prayer Time */}
          <div className="hidden sm:block">
            <PrayerTime />
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2 md:hidden text-muted hover:text-cream rounded-lg border border-borderWarm/60 bg-black/40"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-borderWarm bg-[#0a0a0f]/95 backdrop-blur-xl px-6 py-6 transition-all">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-4 font-mono text-sm">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-cream transition-colors py-1"
            >
              /about
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-cream transition-colors py-1"
            >
              /work
            </a>
            <a
              href="mailto:ualqarni70@gmail.com"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted hover:text-cream transition-colors py-1"
            >
              /contact
            </a>
            <div className="pt-2 sm:hidden border-t border-borderWarm/40">
              <PrayerTime />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}