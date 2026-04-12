"use client";
import { useState, useRef, useEffect } from 'react';

const COMMANDS: Record<string, string> = {
  help: '> available: about · skills · contact · projects · clear',
  about: '> Uwais Alqarni — SIT Software Engineering student.\n> Specializing in Python, ML, and Edge AI.\n> Guided by the principle of Tabayyun (تبيّن) — verify before you act.',
  skills: '> Python · Kafka · TensorFlow · PostgreSQL · Docker · FastAPI · Next.js · TypeScript',
  contact: '> github.com/queWiz\n> linkedin.com/in/ualqarni\n> ualqarni70@gmail.com',
  projects: '> Tabayyun — Edge AI halal scanner\n> Drama Discovery — RAG vibe search\n> Project Sentinel — Kafka anomaly engine',
  clear: '__CLEAR__',
};

export function InteractiveTerminal() {
  const [lines, setLines] = useState<string[]>(['> welcome. type "help" for commands.']);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [lines]);

  const run = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
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
    <div className="bg-black/40 border border-borderWarm rounded-xl p-6 font-mono text-xs md:text-sm shadow-xl flex flex-col h-[350px] backdrop-blur-sm">
      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar pr-2">
        {lines.map((l, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${l.startsWith('$') ? 'text-cream' : 'text-accent-lavender'}`}>
            {l}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-4 pt-4 border-t border-borderWarm">
        <span className="text-accent-green">$</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={run}
          className="bg-transparent border-none outline-none text-cream flex-1 font-mono"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}