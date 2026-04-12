"use client";
import { useEffect, useState } from 'react';

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

type GitHubEvent = {
  type?: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: {
    commits?: Array<{ message?: string }>;
  };
};

export function GitHubFeed({ username = "queWiz" }) {
  const [commits, setCommits] = useState<
    { repo: string; message: string; url: string; time: Date }[]
  >([]);
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((r) => r.json())
      .then((data: unknown) => {
        if (!Array.isArray(data)) return;
        const pushes = data
          .filter((e): e is GitHubEvent => typeof e === 'object' && e !== null)
          .filter((e) => e.type === "PushEvent" && typeof e.repo?.name === 'string')
          .flatMap((e) =>
            (e.payload?.commits ?? []).map((c) => ({
              repo: e.repo?.name?.split("/")[1] ?? 'repo',
              message: (c.message ?? 'commit').split("\n")[0].slice(0, 60),
              url: `https://github.com/${e.repo?.name ?? username}`,
              time: new Date(e.created_at ?? Date.now()),
            }))
          )
          .slice(0, 3);
        setCommits(pushes);
      })
      .catch(() => {});
  }, [username]);

  const timeAgo = (d: Date) => {
    const mins = Math.floor((nowMs - d.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  if (!commits.length) return null;

  return (
    <div className="flex flex-col gap-2 text-left z-50">
      <span className="text-[14px] font-mono text-muted uppercase tracking-widest mb-1">
        Recent Commits
      </span>
      {commits.map((c, i) => (
        <a
          key={i}
          href={c.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-3 p-3 bg-surface border border-borderWarm rounded-lg hover:border-accent-lavender/50 transition-colors"
        >
          <span className="text-accent-lavender text-[10px] mt-1">✦</span>
          <div className="min-w-0">
            <div className="text-[13px] text-cream font-bold leading-tight truncate">
              {c.message}
            </div>
            <div className="text-[11px] text-muted font-mono mt-1">
              {c.repo} · {timeAgo(c.time)}
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export function PrayerTime() {
  type PrayerName = typeof PRAYERS[number];

  const [info, setInfo] = useState<string | null>(null);
  const [timings, setTimings] = useState<Record<PrayerName, string> | null>(null);
  const [timingsDayKey, setTimingsDayKey] = useState('');

  useEffect(() => {
    const getDayKey = (date: Date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    const getNextPrayerInfo = (now: Date, prayerTimings: Record<PrayerName, string>) => {
      for (const name of PRAYERS) {
        const hhmm = prayerTimings[name].split(' ')[0];
        const [h, min] = hhmm.split(':').map(v => Number.parseInt(v, 10));
        if (Number.isNaN(h) || Number.isNaN(min)) continue;

        const target = new Date(now);
        target.setHours(h, min, 0, 0);
        if (target >= now) {
          const diff = Math.floor((target.getTime() - now.getTime()) / 60000);
          const hrs = Math.floor(diff / 60);
          const mins = diff % 60;
          return `${name} in ${hrs > 0 ? `${hrs}h ` : ''}${mins}m`;
        }
      }

      return 'Isha passed';
    };

    const loadTimings = async (date: Date) => {
      const d = date.getDate();
      const m = date.getMonth() + 1;
      const y = date.getFullYear();

      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${d}-${m}-${y}?city=Singapore&country=SG&method=11`);
        const data = await response.json();
        if (!data?.data?.timings) return;

        const dailyTimings = data.data.timings as Record<PrayerName, string>;
        setTimings(dailyTimings);
        setTimingsDayKey(getDayKey(date));
        setInfo(getNextPrayerInfo(new Date(), dailyTimings));
      } catch {
        // Keep existing state if fetch fails; we'll retry on the next tick.
      }
    };

    const tick = () => {
      const now = new Date();
      const todayKey = getDayKey(now);

      if (!timings || timingsDayKey !== todayKey) {
        void loadTimings(now);
        return;
      }

      setInfo(getNextPrayerInfo(now, timings));
    };

    tick();
    const interval = window.setInterval(tick, 30000);
    return () => window.clearInterval(interval);
  }, [timings, timingsDayKey]);

  if (!info) return null;

  return (
    <div className="flex items-center gap-3 bg-surface border border-borderWarm  px-4 py-2 rounded-full shadow-lg pointer-events-auto">
      
      {/* FIX 3: Fun Animated Sprite / Orbital Compass */}
      <div className="relative w-4 h-4 flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute inset-0 rounded-full border border-accent-amber/30 animate-[spin_3s_linear_infinite]" />
        {/* Inner spinning ring (reverse) */}
        <div className="absolute inset-0 rounded-full border border-accent-lavender/40 animate-[spin_4s_linear_infinite_reverse]" />
        {/* Core dot */}
        <div className="w-1.5 h-1.5 bg-accent-amber rounded-full shadow-[0_0_8px_#fbbf24]" />
        {/* Orbiting moon dot */}
        <div className="absolute top-0 w-full h-full animate-[spin_2s_linear_infinite]">
          <div className="w-1 h-1 bg-cream rounded-full absolute -top-0.5 left-1/2 -translate-x-1/2 shadow-[0_0_5px_#fff]" />
        </div>
      </div>

      <span className="text-[10px] font-mono text-cream uppercase tracking-[0.2em] font-bold mt-0.5">
        SG · {info}
      </span>
    </div>
  );
}