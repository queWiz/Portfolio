"use client";
import { useEffect, useState } from 'react';

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

export function GitHubFeed({ username = 'queWiz' }) {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    // Fetch recently updated repositories instead of events (much more reliable)
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const recentRepos = data.map((r: any) => ({
            name: r.name,
            lang: r.language || 'Code',
            url: r.html_url,
            time: new Date(r.updated_at),
          }));
          setRepos(recentRepos);
        }
      }).catch(() => {});
  }, [username]);

  const timeAgo = (d: Date) => {
    const mins = Math.floor((Date.now() - d.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins/60)}h ago`;
    return `${Math.floor(mins/1440)}d ago`;
  };

  if (!repos.length) return null;

  return (
    <div className="flex flex-col gap-2 max-w-xs text-left z-50">
      <span className="text-[14px] font-mono text-muted uppercase tracking-widest mb-1">Recent Commits</span>
      {repos.map((r, i) => (
        <a key={i} href={r.url} target="_blank" className="flex items-start gap-3 p-3 bg-surface border border-borderWarm rounded-lg hover:border-accent-lavender/50 transition-colors">
          <span className="text-accent-lavender text-[10px] mt-1">✦</span>
          <div>
            <div className="text-[14px] text-cream font-bold leading-tight">{r.name}</div>
            <div className="text-[12px] text-muted font-mono mt-1">
              {r.lang} · Updated {timeAgo(r.time)}
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