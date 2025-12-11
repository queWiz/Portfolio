"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-white font-mono p-4">
      <h1 className="text-9xl font-bold text-neutral-800">404</h1>
      <div className="z-10 text-center">
        <h2 className="text-2xl mb-4 text-red-500">Error: Path Not Found</h2>
        <p className="text-neutral-400 mb-8">
          The requested data segment is corrupted or does not exist.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 border border-neutral-800 bg-neutral-900 rounded-md hover:bg-neutral-800 transition-colors"
        >
          &gt; Return_Home()
        </Link>
      </div>
      
      {/* Background Grid (Reused) */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
    </div>
  );
}