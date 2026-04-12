"use client";
import { useEffect, useState } from 'react';

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

type Commit = { repo: string; message: string; url: string; time: Date };
type GitHubPushEvent = {
  type: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: { commits?: Array<{ message?: string }> };
};
type GitHubRepo = {
  name?: string;
  description?: string | null;
  html_url?: string;
  pushed_at?: string | null;
  updated_at?: string | null;
};

export function GitHubFeed({ username = 'queWiz' }) {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
        const events: unknown = await eventsRes.json();

        if (Array.isArray(events)) {
          const pushCommits: Commit[] = events
            .filter((event): event is GitHubPushEvent => {
              return (
                typeof event === 'object' &&
                event !== null &&
                'type' in event &&
                (event as GitHubPushEvent).type === 'PushEvent'
              );
            })
            .flatMap((event) =>
              (event.payload?.commits ?? []).map((commit) => ({
                repo: (event.repo?.name ?? '').split('/')[1] ?? username,
                message: (commit.message ?? 'commit').split('\n')[0].slice(0, 60),
                url: `https://github.com/${event.repo?.name ?? username}`,
                time: new Date(event.created_at ?? Date.now()),
              }))
            )
            .slice(0, 3);

          if (pushCommits.length > 0) {
            setCommits(pushCommits);
            setStatus('ok');
            return;
          }
        }

        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
        const repos: unknown = await reposRes.json();

        if (Array.isArray(repos) && repos.length > 0) {
          const repoCommits: Commit[] = repos
            .filter((repo): repo is GitHubRepo => typeof repo === 'object' && repo !== null)
            .map((repo) => ({
              repo: repo.name ?? username,
              message: repo.description ?? 'No description',
              url: repo.html_url ?? `https://github.com/${username}`,
              time: new Date(repo.pushed_at ?? repo.updated_at ?? Date.now()),
            }))
            .slice(0, 3);

          setCommits(repoCommits);
          setStatus('ok');
          return;
        }

        setStatus('error');
      } catch {
        setStatus('error');
      }
    }

    void load();
  }, [username]);

  const timeAgo = (d: Date) => {
    const mins = Math.floor((nowMs - d.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  return (
    <div className="flex flex-col gap-2 text-left z-50">
      <span className="text-[14px] font-mono text-muted uppercase tracking-widest mb-1">
        Recent Commits
      </span>

      {status === 'loading' && (
        <>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 bg-surface border border-borderWarm rounded-lg animate-pulse"
            >
              <span className="text-accent-lavender text-[10px] mt-1 opacity-30">✦</span>
              <div className="min-w-0 flex-1">
                <div className="h-3 bg-borderWarm rounded w-3/4 mb-2" />
                <div className="h-2 bg-borderWarm rounded w-1/2 opacity-50" />
              </div>
            </div>
          ))}
        </>
      )}

      {status === 'error' && (
        <div className="p-3 bg-surface border border-borderWarm rounded-lg">
          <p className="text-[12px] text-muted font-mono">
            Could not load activity.{' '}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="text-accent-lavender hover:underline"
            >
              View on GitHub ↗
            </a>
          </p>
        </div>
      )}

      {status === 'ok' &&
        commits.map((commit, i) => (
          <a
            key={i}
            href={commit.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-3 p-3 bg-surface border border-borderWarm rounded-lg hover:border-accent-lavender/50 transition-colors"
          >
            <span className="text-accent-lavender text-[10px] mt-1">✦</span>
            <div className="min-w-0">
              <div className="text-[13px] text-cream font-bold leading-tight truncate">
                {commit.message}
              </div>
              <div className="text-[11px] text-muted font-mono mt-1">
                {commit.repo} · {timeAgo(commit.time)}
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
        const [h, min] = hhmm.split(':').map((value) => Number.parseInt(value, 10));
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
        const response = await fetch(
          `https://api.aladhan.com/v1/timingsByCity/${d}-${m}-${y}?city=Singapore&country=SG&method=11`
        );
        const data: unknown = await response.json();
        const dailyTimings =
          typeof data === 'object' &&
          data !== null &&
          'data' in data &&
          typeof (data as { data?: { timings?: Record<PrayerName, string> } }).data?.timings === 'object'
            ? (data as { data: { timings: Record<PrayerName, string> } }).data.timings
            : null;

        if (!dailyTimings) return;

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
    <div className="flex items-center gap-3 bg-surface border border-borderWarm px-4 py-2 rounded-full shadow-lg pointer-events-auto">
      <div className="relative w-4 h-4 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-accent-amber/30 animate-[spin_3s_linear_infinite]" />
        <div className="absolute inset-0 rounded-full border border-accent-lavender/40 animate-[spin_4s_linear_infinite_reverse]" />
        <div className="w-1.5 h-1.5 bg-accent-amber rounded-full shadow-[0_0_8px_#fbbf24]" />
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
