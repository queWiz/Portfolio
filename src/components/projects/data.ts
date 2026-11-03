export type ProjectId = "pergas" | "cleanbrilliant" | "codex" | "bidforgood" | "tabayyun";

export interface Shot {
  src: string;
  width: number;
  height: number;
  alt: string;
  frame: "browser" | "phone";
}

export interface Project {
  id: ProjectId;
  title: string;
  /** One line for the card. */
  summary: string;
  /** Short context line, e.g. "Client project". */
  kind: string;
  role: string;
  year: string;
  /** 0–3 headline numbers shown in the case study. Only facts from the original write-up. */
  stats: { value: string; label: string }[];
  overview: string;
  work: string[];
  stack: string[];
  /** Only set when it points at this project's own repository. */
  repoUrl?: string;
  /** Real screenshots. When present they lead the card; the mockup moves into the case study. */
  shots?: Shot[];
  /** Interactive mockup that explains something the screenshots can't show. */
  hasMock: boolean;
  /** Background tint behind the visual (any CSS colour). */
  tint: string;
}

const tint = (token: string, pct: number) => `color-mix(in srgb, rgb(var(--${token})) ${pct}%, rgb(var(--paper)))`;

export const PROJECTS: Project[] = [
  {
    id: "pergas",
    title: "Pergas Members Platform",
    summary: "One portal for members and admins, replacing Telegram groups, email threads and physical cards.",
    kind: "Client project · Singapore NGO",
    role: "Led technical delivery",
    year: "2026",
    stats: [
      { value: "20/20", label: "Playwright suites passing" },
      { value: "10+", label: "related tables in Postgres" },
    ],
    overview:
      "Pergas, a registered Singapore NGO, ran its membership through Telegram, email and physical cards. I led technical delivery of a single platform for members and admins that replaces all three.",
    work: [
      "Built the member and admin portals on one Next.js App Router codebase, with role-based access checked on the server.",
      "Designed the Supabase (PostgreSQL) schema: 10+ related tables, with integrity enforced in the database.",
      "Connected Zoho Backstage for event registration and ticketing, and Google Maps for finding merchants.",
      "Wrote 20 Playwright regression suites, all passing, and scrubbed NRIC numbers on the server for PDPA compliance.",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "Playwright"],
    repoUrl: "https://github.com/queWiz/Pergas-Members-Integrated-System",
    shots: [
      { src: "/projects/pergas-admin.webp", width: 1600, height: 810, frame: "browser", alt: "Pergas admin portal dashboard showing member, event and community counts, recent activity and quick actions" },
      { src: "/projects/pergas-member.webp", width: 516, height: 1052, frame: "phone", alt: "Pergas member app home screen with digital card, events, benefits and a member perk carousel" },
    ],
    hasMock: true,
    tint: tint("moss", 14),
  },
  {
    id: "cleanbrilliant",
    title: "Clean Brilliant Carbon Analytics",
    summary: "The engine that saves and restores custom dashboard layouts in an enterprise carbon-reporting app.",
    kind: "Enterprise app",
    role: "Backend engineer",
    year: "2025",
    stats: [],
    overview:
      "Users of an enterprise C#/.NET carbon-reporting app can rearrange their dashboards. I built the part that stores those layouts in PostgreSQL and brings them back exactly as they were left.",
    work: [
      "Stored flexible layouts as JSONB alongside relational data, so every save stays transactional.",
      "Wrote the add, remove, reorder and auto-pack logic using the Strategy, Builder and serialisation patterns.",
      "Used parameterised ADO.NET/Npgsql queries throughout to rule out SQL injection.",
      "Built the ASP.NET Core MVC endpoints, including drag-and-drop reordering from JSON payloads.",
    ],
    stack: ["C#", "ASP.NET Core", "PostgreSQL", "JSONB"],
    repoUrl: "https://github.com/Fokku/ICT2112-Clean-Brilliant-Company",
    shots: [
      // Real UI and layout engine, run locally with sample emissions data (no access to the team database).
      { src: "/projects/cleanbrilliant.webp", width: 1320, height: 800, frame: "browser", alt: "Clean Brilliant dashboard customisation screen with layout tabs, four CO2 stat widgets, a daily emissions bar chart and a packaging share pie chart" },
    ],
    hasMock: true,
    tint: tint("accent", 10),
  },
  {
    id: "codex",
    title: "Codex Video Search",
    summary: "Ask a question about an hour-long video and jump straight to the moment that answers it.",
    kind: "AI / retrieval",
    role: "AI & backend engineer",
    year: "2026",
    stats: [{ value: "−30%", label: "database infrastructure cost" }],
    overview:
      "A retrieval-augmented generation (RAG) pipeline over video, audio and documents. Gemini handles understanding, pgvector handles search, and answers come back with precise timestamps.",
    work: [
      "Tuned chunking, embeddings and vector search through repeated experiments to improve answer relevance.",
      "Built an async FastAPI backend with lazy database connections, so long video processing doesn't time out.",
      "Moved media storage to AWS S3, cutting database infrastructure cost by 30%.",
      "Returned answers as exact timestamps inside hour-long videos.",
    ],
    stack: ["Python", "FastAPI", "Gemini API", "pgvector", "AWS S3"],
    repoUrl: "https://github.com/queWiz/Codex-Platform",
    shots: [
      { src: "/projects/codex.webp", width: 1600, height: 810, frame: "browser", alt: "Codex knowledge base home with a search bar reading Ask the archive, beneath a 3D robot" },
    ],
    hasMock: true,
    tint: tint("ink", 7),
  },
  {
    id: "bidforgood",
    title: "BidForGood",
    summary: "A charity auction that stays correct when many people bid in the same second.",
    kind: "Web security",
    role: "Full-stack & security lead",
    year: "2026",
    stats: [],
    overview:
      "An auction app for charity where bids can land at the same moment. The work focused on keeping every bid correct under concurrency and keeping the app safe from common web attacks.",
    work: [
      "Used pessimistic row locking in PostgreSQL so simultaneous bids can't overwrite each other.",
      "Added CSRF tokens and parameterised SQL to block cross-site request forgery and injection.",
      "Set up GitHub Actions to run linting, secret scanning and regression tests on every pull request.",
      "Added rate limiting and session checks to stop automated bidding bots.",
    ],
    stack: ["TypeScript", "Node.js", "PostgreSQL", "GitHub Actions"],
    repoUrl: "https://github.com/derickiscool/ICT2216-P1-Group2-Bidding-Charity-Website",
    shots: [
      // Run locally with the repo's own seed data; listing photos are the seed's stock images.
      { src: "/projects/bidforgood.webp", width: 1000, height: 600, frame: "browser", alt: "BidForGood listing page with the bid panel: current highest bid of $420, a countdown, a $440 minimum bid, Place Bid button and auto-bid toggle" },
    ],
    hasMock: true,
    tint: tint("accent-soft", 16),
  },
  {
    id: "tabayyun",
    title: "Tabayyun Food Scanner",
    summary: "Point a phone at a food product and it recognises it right on the device, even offline.",
    kind: "Solo project · Edge AI",
    role: "Sole developer",
    year: "2025",
    stats: [
      { value: "<150ms", label: "inference on ordinary phones" },
      { value: "90%", label: "accuracy after OCR correction" },
    ],
    overview:
      "A food-label scanner that pairs YOLOv8n object detection with Tesseract.js OCR, compiled to WebAssembly. Everything runs on the phone as an offline-first PWA, so images never leave the device.",
    work: [
      "Scaled input resolution on the fly to cut memory use on phones, which stopped crashes on iOS.",
      "Designed a post-processing step that corrects OCR mistakes, tested against ground-truth labels to reach 90% accuracy.",
      "Built it offline-first with no telemetry: nothing is uploaded.",
      "Kept inference under 150ms on ordinary phones without a cloud GPU.",
    ],
    stack: ["WebAssembly", "TensorFlow.js", "YOLOv8n", "Tesseract.js"],
    repoUrl: "https://github.com/queWiz/Tabayyun",
    shots: [
      { src: "/projects/tabayyun-detect.webp", width: 515, height: 1043, frame: "phone", alt: "Tabayyun scanner on a phone, with a green bounding box labelled Buldak Carbonara around a noodle packet" },
    ],
    hasMock: false,
    tint: tint("moss", 8),
  },
];
