"use client";
import { useEffect, useState } from 'react';

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'] as const;

type Commit = { repo: string; message: string; url: string; time: Date };
type GitHubEvent = {
  type: string;
  repo?: { name?: string };
  created_at?: string;
  payload?: {
    action?: string;
    commits?: Array<{ message?: string }>;
    pull_request?: { title?: string; html_url?: string };
  };
};
type GitHubRepo = {
  name?: string;
  description?: string | null;
  html_url?: string;
  pushed_at?: string | null;
  updated_at?: string | null;
};

export function GitHubFeed({ defaultUsername = 'queWiz' }: { defaultUsername?: string }) {
  const [selectedUser, setSelectedUser] = useState<'queWiz' | 'ooWise'>(
    defaultUsername as 'queWiz' | 'ooWise'
  );
  const [commits, setCommits] = useState<Commit[]>([]);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNowMs(Date.now()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    async function load() {
      setStatus('loading');
      try {
        const eventsRes = await fetch(`https://api.github.com/users/${selectedUser}/events/public`);
        const events: unknown = await eventsRes.json();

        if (Array.isArray(events)) {
          const publicActivity: Commit[] = events
            .filter((event): event is GitHubEvent => {
              return (
                typeof event === 'object' &&
                event !== null &&
                'type' in event &&
                ((event as GitHubEvent).type === 'PushEvent' ||
                  (event as GitHubEvent).type === 'PullRequestEvent')
              );
            })
            .flatMap((event) => {
              const fullRepo = event.repo?.name ?? selectedUser;
              if (event.type === 'PushEvent') {
                return (event.payload?.commits ?? []).map((commit) => ({
                  repo: fullRepo,
                  message: (commit.message ?? 'commit').split('\n')[0].slice(0, 60),
                  url: `https://github.com/${fullRepo}`,
                  time: new Date(event.created_at ?? Date.now()),
                }));
              }
              if (event.type === 'PullRequestEvent') {
                const pr = event.payload?.pull_request;
                const action = event.payload?.action ?? 'updated';
                return [
                  {
                    repo: fullRepo,
                    message: `[PR ${action}] ${pr?.title ?? 'Contribution'}`.slice(0, 60),
                    url: pr?.html_url ?? `https://github.com/${fullRepo}`,
                    time: new Date(event.created_at ?? Date.now()),
                  },
                ];
              }
              return [];
            })
            .slice(0, 4);

          if (publicActivity.length > 0) {
            setCommits(publicActivity);
            setStatus('ok');
            return;
          }
        }

        const reposRes = await fetch(`https://api.github.com/users/${selectedUser}/repos?sort=updated&per_page=4`);
        const repos: unknown = await reposRes.json();

        if (Array.isArray(repos) && repos.length > 0) {
          const repoCommits: Commit[] = repos
            .filter((repo): repo is GitHubRepo => typeof repo === 'object' && repo !== null)
            .map((repo) => ({
              repo: repo.name ?? selectedUser,
              message: repo.description ?? 'Active repository commit',
              url: repo.html_url ?? `https://github.com/${selectedUser}`,
              time: new Date(repo.pushed_at ?? repo.updated_at ?? Date.now()),
            }))
            .slice(0, 4);

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
  }, [selectedUser]);

  const timeAgo = (d: Date) => {
    const mins = Math.floor((nowMs - d.getTime()) / 60000);
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  };

  return (
    <div className="flex flex-col gap-3 text-left">
      <div className="flex items-center justify-between pb-1">
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt animate-pulse" />
          Live Git Commits
        </span>

        {/* Account Selector Switch */}
        <div className="flex items-center gap-1.5 p-0.5 rounded-full bg-slate-100 dark:bg-[#141B28] border border-slate-200 dark:border-white/10 text-[11px] font-mono">
          <button
            onClick={() => setSelectedUser('queWiz')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              selectedUser === 'queWiz'
                ? 'bg-cobalt text-white font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            @queWiz
          </button>
          <button
            onClick={() => setSelectedUser('ooWise')}
            className={`px-2.5 py-0.5 rounded-full transition-all ${
              selectedUser === 'ooWise'
                ? 'bg-cobalt text-white font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            @ooWise
          </button>
        </div>
      </div>

      {status === "loading" && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06] animate-pulse flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-cobalt/40 mt-1" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
                <div className="h-2 bg-slate-100 dark:bg-white/5 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {status === "error" && (
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141B28] border border-slate-200/80 dark:border-white/[0.06]">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Direct feed offline.{" "}
            <a
              href={`https://github.com/${selectedUser}`}
              target="_blank"
              rel="noreferrer"
              className="text-cobalt hover:underline"
            >
              View profile on GitHub ↗
            </a>
          </p>
        </div>
      )}

      {status === "ok" && (
        <div className="space-y-2.5">
          {commits.map((commit, i) => (
            <a
              key={i}
              href={commit.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`View commit "${commit.message}" on GitHub`}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-[#111622] border border-slate-200/80 dark:border-white/[0.08] hover:border-cobalt/50 hover:shadow-sm transition-all duration-200 group"
            >
              <span className="text-cobalt text-xs mt-0.5 group-hover:scale-125 transition-transform">
                ✦
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug truncate group-hover:text-cobalt transition-colors">
                  {commit.message}
                </div>
                <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono mt-1 flex items-center justify-between">
                  <span className="font-semibold text-slate-600 dark:text-slate-300 truncate max-w-[140px] sm:max-w-none">
                    {commit.repo}
                  </span>
                  <span>{timeAgo(commit.time)}</span>
                </div>
              </div>
            </a>
          ))}

          <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 pt-1 flex items-center justify-between">
            <span>Public commits &amp; PRs</span>
            <span title="Private school/client repos are protected by GitHub privacy rules">
              Private repos shielded
            </span>
          </div>
        </div>
      )}
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
