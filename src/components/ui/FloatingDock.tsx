"use client";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Mail } from "lucide-react";
import Link from "next/link";

const NAV_ITEMS = [
  { name: "Home", icon: <Home size={20} />, href: "#home" },
  { name: "About", icon: <User size={20} />, href: "#about" },
  { name: "Work", icon: <Briefcase size={20} />, href: "#work" },
  { name: "Contact", icon: <Mail size={20} />, href: "#contact" },
];

export const FloatingDock = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-2 items-end rounded-full border border-neutral-800 bg-black/80 p-3 backdrop-blur-md shadow-2xl">
        {NAV_ITEMS.map((item) => (
          <Link key={item.name} href={item.href}>
            <motion.div
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
              className="relative group p-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-800 hover:border-neutral-600 transition-colors"
            >
              {item.icon}
              
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 border border-neutral-700 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};