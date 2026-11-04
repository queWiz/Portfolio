# Uwais Alqarni, portfolio

My personal site. I'm a Software Engineering student at the Singapore Institute of Technology, and this is where I show the client work, research and side projects I've built.

Live at **[portfolio-indol-eight-45.vercel.app](https://portfolio-indol-eight-45.vercel.app)**

## What's on the page

- **Hero.** My name, which alternates between a handwritten signature and a pixel nameplate on each visit, and a lanyard badge with a pixel portrait you can drag to swing or tap to flip.
- **Selected work.** Five projects with real screenshots: Pergas Members Platform, Clean Brilliant Carbon Analytics, Codex Video Search, BidForGood and Tabayyun Food Scanner. Each card opens a case study with a small interactive mock of how the project works.
- **How I work.** Built around the Arabic word تبينوا ("investigate, make sure", Al-Hujurat 49:6) and four principles I try to follow when building software.
- **Terminal.** A small shell with history, tab completion and commands like `about`, `projects`, `cd contact` and `theme`. Everything on the page is reachable from it.
- **About.** Photo, background, education, side projects and the tools I use.
- **Research.** Two papers at ACM AutoUI '26 on takeover requests and driver monitoring, with DOI links and copyable BibTeX.
- **Recognition and contact.** Director's List at Nanyang Polytechnic, the Google Data Analytics certificate, and an email you can copy in one click.
- **Arcade.** Breakout (the bricks spell "verify before trust") and a Flappy-style game with an outfit picker. Both keep a best score in your browser.

There are a few hidden extras too. Try typing `play` in the terminal, poking the robot in the hero, or the Konami code.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) and React 19
- Tailwind CSS 3 with colour tokens stored as CSS variables
- Framer Motion for the reveals, springs and the badge physics
- Canvas 2D for the two games
- Fonts through `next/font`: Geist, Geist Mono, Amiri, Pixelify Sans and Mrs Saint Delafield
- Hosted on Vercel

## Running it locally

```bash
git clone https://github.com/queWiz/Portfolio.git
cd Portfolio
npm install
npm run dev
```

The dev server runs on [http://127.0.0.1:3457](http://127.0.0.1:3457). The port is set in `package.json`.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build on the same port
npm run lint    # ESLint
```

## Where things live

```
src/
├── app/                 layout, page order, global styles and colour tokens
├── components/
│   ├── ui/              one file per section (Hero, Terminal, AboutSection, Footer, the games...)
│   ├── projects/        project data, screenshot frames and the case-study mocks
│   ├── mascot/          the lanyard badge and the pixel portrait
│   ├── motion/          RevealText, the word-by-word heading reveal
│   └── easter/          Konami code and the console greeting
└── lib/
    ├── motion.ts        shared easing, durations and reveal variants
    └── initScripts.ts   scripts that run in <head> before first paint (theme, name style)
public/
├── projects/            project screenshots (WebP)
├── about/               About photo
└── Resume.pdf
```

## Editing notes

**Projects.** Add or change a project in `src/components/projects/data.ts`. Screenshots go in `public/projects/` as WebP. A project without screenshots falls back to its mock in `ProjectMockups.tsx`.

**Colours.** The palette is "Deep Teal & Flare". Every colour is a CSS variable in `src/app/globals.css`, with light values in `:root` and dark values in `.dark`. Values are stored as `R G B` so Tailwind opacity modifiers like `bg-accent/10` work. Components use the token names (`paper`, `ink`, `accent`, `signal`, `console` and so on) and never hard-code colours, so changing the palette only means editing that file. The games read the same variables, so they follow the theme too.

**About photo.** The photo is not in this repo. It's hosted on Vercel Blob, and the site reads its URL from the `NEXT_PUBLIC_ABOUT_PHOTO_URL` environment variable. If the variable isn't set, the About card shows the pixel-portrait banner instead. For local development, put the image in `public/about/` (gitignored) and add `NEXT_PUBLIC_ABOUT_PHOTO_URL=/about/uwais.webp` to `.env.local`.

**Link preview.** `src/app/opengraph-image.jpg` is the image shown when the link is shared on LinkedIn, WhatsApp, Telegram and similar apps. The alt text is in `opengraph-image.alt.txt`.

**Theme.** Light is the default. Dark mode only turns on through the toggle, and the choice is saved in `localStorage`.

**Head scripts.** The scripts that apply the saved theme and pick the name style live in `src/lib/initScripts.ts`, not in a client component. `layout.tsx` is a server component. If it imports a value from a `"use client"` file, it receives a client reference instead of the string, and the script silently never renders.

## License

MIT. See [LICENSE](LICENSE). The code is free to reuse. The photos, screenshots, résumé and written content are mine, so please don't reuse those.
