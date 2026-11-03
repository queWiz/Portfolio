import Image from "next/image";
import type { Project, Shot } from "./data";

/**
 * Real screenshots, framed. Layouts:
 * - browser + phone: phone overlaps the browser's lower-right corner (Pergas)
 * - browser only:    full-width browser window (Codex)
 * - phone only:      phone rises from the bottom edge of the panel (Tabayyun)
 * Hover depth comes from the parent `group/card`.
 */

function BrowserFrame({ shot, sizes, priority }: { shot: Shot; sizes: string; priority?: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-[0_1px_2px_rgb(var(--ink)/0.05),0_24px_48px_-24px_rgb(var(--ink)/0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden>
        <i className="h-2 w-2 rounded-full bg-line" />
        <i className="h-2 w-2 rounded-full bg-line" />
        <i className="h-2 w-2 rounded-full bg-line" />
      </div>
      <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={sizes} priority={priority} className="block h-auto w-full" />
    </div>
  );
}

function PhoneFrame({ shot, sizes }: { shot: Shot; sizes: string }) {
  return (
    <div className="rounded-[2rem] bg-[#151412] p-[6px] shadow-[0_2px_4px_rgb(0_0_0/0.12),0_30px_60px_-24px_rgb(0_0_0/0.45)] ring-1 ring-black/10">
      <div className="overflow-hidden rounded-[1.6rem]">
        <Image src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} sizes={sizes} className="block h-auto w-full" />
      </div>
    </div>
  );
}

export type VisualLayout = "browser+phone" | "browser" | "phone";

export function layoutOf(project: Project): VisualLayout | null {
  const shots = project.shots ?? [];
  const browser = shots.some((s) => s.frame === "browser");
  const phone = shots.some((s) => s.frame === "phone");
  if (browser && phone) return "browser+phone";
  if (browser) return "browser";
  if (phone) return "phone";
  return null;
}

export function ProjectShots({ project, large }: { project: Project; large?: boolean }) {
  const shots = project.shots ?? [];
  const browser = shots.find((s) => s.frame === "browser");
  const phone = shots.find((s) => s.frame === "phone");
  const lift = "transition-transform duration-700 ease-out";

  if (browser && phone) {
    return (
      <div className="relative pb-[6%] pr-[6%]">
        <div className={`${lift} group-hover/card:-translate-y-1`}>
          <BrowserFrame shot={browser} sizes={large ? "(min-width: 1024px) 860px, 90vw" : "(min-width: 768px) 45vw, 90vw"} priority={large} />
        </div>
        <div className={`absolute bottom-0 right-0 w-[24%] min-w-[92px] ${lift} group-hover/card:-translate-y-3`}>
          <PhoneFrame shot={phone} sizes="240px" />
        </div>
      </div>
    );
  }
  if (browser) {
    return (
      <div className={`${lift} group-hover/card:-translate-y-1`}>
        <BrowserFrame shot={browser} sizes="(min-width: 768px) 45vw, 90vw" />
      </div>
    );
  }
  if (phone) {
    // Rises from the bottom edge; the panel clips the lower part.
    return (
      <div className={`mx-auto w-[200px] sm:w-[220px] ${lift} group-hover/card:-translate-y-2`}>
        <PhoneFrame shot={phone} sizes="220px" />
      </div>
    );
  }
  return null;
}
