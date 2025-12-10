"use client";
import { motion } from "framer-motion";
import { TypewriterEffect } from "./TypewriterEffect";

export const CodeWindow = () => {
  return (
    <div className="w-full rounded-lg border border-neutral-800 bg-[#1e1e1e] overflow-hidden shadow-2xl font-mono text-sm md:text-base relative z-20">
      
      {/* VS Code Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#252526] border-b border-neutral-800">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-neutral-500 text-xs">portfolio.py</span>
      </div>

      {/* Code Body */}
      <div className="p-6 text-neutral-300">
        <div className="flex gap-4">
          <div className="text-neutral-600 select-none text-right">
            1<br/>2<br/>3<br/>4<br/>5
          </div>
          <div>
            <span className="text-purple-400">class</span> <span className="text-yellow-400">Engineer</span>: <br/>
            &nbsp;&nbsp;<span className="text-blue-400">def</span> <span className="text-yellow-400">__init__</span>(self):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">self</span>.name = <span className="text-green-400">"Uwais Alqarni"</span><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">self</span>.stack = [<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <TypewriterEffect 
              words={[
                { text: '"Kafka",', className: "text-green-400" },
                { text: '"RAG",', className: "text-green-400" },
                { text: '"Edge_AI"', className: "text-green-400" }
              ]}
              className="text-sm md:text-base inline-block"
              cursorClassName="bg-green-400 w-[2px] h-3 md:h-5 translate-y-1"
            />
            <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;]
          </div>
        </div>
      </div>
    </div>
  );
};