# Uwais Alqarni | Software Engineer Portfolio 🚀

> A high-performance, interactive portfolio engineered to reflect a focus on backend systems, data pipelines, and elegant architecture. 

![Tech Stack](https://img.shields.io/badge/Stack-Next.js_|_Tailwind_|_Framer_Motion-black)
![3D Graphics](https://img.shields.io/badge/3D-React_Three_Fiber-blue)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-success)

🌐 **[View Live Site](portfolio-indol-eight-45.vercel.app)**

## 💡 The Philosophy: Tabayyun (تبيّن)
The design and engineering of this site—and my work in general—is guided by the Islamic principle of **Tabayyun**: *"to verify, ascertain, and seek clarity before acting."* 
Whether validating a high-velocity Kafka stream, cross-referencing messy datasets, or shipping an ML model to production, I believe technology should bring clarity to chaos.

## ✨ Technical Features

This portfolio is not a static template; it is a custom-engineered web application showcasing modern frontend physics and API integrations:

*   **Orbital 3D Kinematics:** A custom-built, continuously rendering 3D orbital system using `Three.js` and `React Three Fiber`, mapped to a 60/40 asymmetrical grid.
*   **Interactive Terminal:** A fully functional, state-driven command-line interface featuring an automated boot-sequence and custom command parsing.
*   **Live GitHub Telemetry:** Integrates with the GitHub REST API to fetch and display recent commits and repository updates in real-time.
*   **Dynamic API Integrations:** Fetches live, geolocated prayer times (Singapore) via the Aladhan API, rendering them into a custom animated CSS astrolabe widget.
*   **Physics-Based Micro-Interactions:** 
    *   Custom Spring-physics cursor mapping (`framer-motion`).
    *   Bi-directional `IntersectionObserver` hooks for smooth scroll reveals.
    *   Animated project slideshows with tracked directional states.
*   **High-Contrast "Cream on Black" UI:** Built with strict Tailwind CSS tokens to ensure readability, accessibility, and a premium editorial aesthetic.

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | Core application structure & SSR |
| **Styling** | Tailwind CSS | Utility-first styling & strict RGBA colour tokens |
| **Animation** | Framer Motion | Spring physics, layout transitions, scroll reveals |
| **3D Graphics** | React Three Fiber | Background starfield and orbital mesh rendering |
| **Data Fetching** | Fetch API / React Hooks | GitHub Activity & Geolocated Time APIs |

## 🚀 Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/YOUR_USERNAME/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the dev server**
    ```bash
    npm run dev
    ```

4.  Open[http://localhost:3000](http://localhost:3000)

## 📂 Project Architecture

```bash
src/
├── app/              # Next.js App Router (page.tsx, layout.tsx)
├── components/       
│   └── ui/           # Bespoke interactive components (Terminal, 3D Canvas, Slideshow)
├── hooks/            # Custom React hooks (e.g., useReveal for scroll physics)
└── lib/              # Utility functions (Tailwind class mergers)
```

---
*Designed & Engineered by Uwais Alqarni*
