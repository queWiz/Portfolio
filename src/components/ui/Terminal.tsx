"use client";
import { useState, useRef, useEffect } from 'react';

const COMMANDS: Record<string, string> = {
  help: '> available: about · skills · contact · projects · clear',
  // about: '> Uwais Alqarni — SIT Software Engineering student.\n> Specializing in Python, ML, and Edge AI.\n> Guided by the principle of Tabayyun (تبيّن) — verify before you act.',
  about: '> Hi, I\'m Uwais, a Software & Data Engineer based in Singapore.\n> I specialize in bridging the gap between heavy backend systems (Kafka, PostgreSQL, AI) and seamless frontends (React, Next.js).\n> I am a language-agnostic problem solver. I don\'t just stick to one stack. I learn whatever tool best solves the problem, from configuring Docker containers to crafting pixel-perfect UIs.',
  skills: '> Python · Kafka · TensorFlow · PostgreSQL · Docker · FastAPI · Next.js · TypeScript',
  contact: '> github.com/queWiz\n> linkedin.com/in/ualqarni\n> ualqarni70@gmail.com',
  projects: '> Tabayyun — Edge AI halal scanner\n> Drama Discovery — RAG vibe search\n> Project Sentinel — Kafka anomaly engine\n> Codex — Video Analytics engine',
  clear: '__CLEAR__',
};

export function InteractiveTerminal() {
  const [lines, setLines] = useState<string[]>(['> initializing terminal...']);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  // FIX 2: Boot Sequence Animation
  useEffect(() => {
    const bootSequence =[
      "init_sys --mode=portfolio",
      "loading modules: [Python, Kafka, Edge_AI]... OK",
      "establishing About Page... OK",
      "> welcome. type 'help' for commands."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      const nextLine = bootSequence[i];
      if (nextLine !== undefined) {
        setLines(prev => [...prev, nextLine]);
        i++;
      } else {
        setIsBooting(false); // Enable input after boot
        clearInterval(interval);
      }
    }, 400); // 400ms delay between each line

    return () => clearInterval(interval);
  },[]);

  const run = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || !input.trim() || isBooting) return;
    const cmd = input.trim().toLowerCase();
    const response = COMMANDS[cmd] || `> command not found: ${cmd}`;

    if (response === '__CLEAR__') {
      setLines([]);
    } else {
      setLines(l => [...l, `$ ${input}`, ...response.split('\n')]);
    }
    setInput('');
  };

  return (
    <div className="bg-[#0a0a0f] border border-borderWarm rounded-xl p-6 font-mono text-xs md:text-sm shadow-xl flex flex-col h-[350px]">
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto pr-2" style={{ scrollbarWidth: 'none' }}>
        {lines.map((l, i) => {
          const line = typeof l === 'string' ? l : '';
          return (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${line.startsWith('$') ? 'text-cream font-bold' : 'text-accent-lavender'}`}>
            {line}
          </div>
          );
        })}
      </div>

      <div className={`flex gap-2 mt-4 pt-4 border-t border-borderWarm shrink-0 transition-opacity ${isBooting ? 'opacity-50' : 'opacity-100'}`}>
        <span className="text-accent-green">$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={run}
          disabled={isBooting}
          className="bg-transparent border-none outline-none text-cream flex-1 font-mono"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}