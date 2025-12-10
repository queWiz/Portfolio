# Portfolio v1 (Data Engineer Edition)

> A high-performance, interactive portfolio built for the modern web. Designed to reflect a focus on backend systems, data pipelines, and clean architecture.

![Tech Stack](https://img.shields.io/badge/Stack-Next.js_14_|_Tailwind_|_Framer_Motion-black)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-success)

## ⚡ Features

*   **3D Interactive Background:** A performant starfield simulation using `React Three Fiber` and `Maath`.
*   **Physics-Based Micro-interactions:** Project cards use 3D tilt geometry based on mouse position.
*   **Data Visualization Aesthetics:** "VS Code" style hero section and "Infinite Marquee" tech stack to represent data flow.
*   **High Performance:** Built on Next.js 14 App Router with strict TypeScript typing and Tailwind CSS optimization.

## 🛠️ Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | Core application structure & SSR |
| **Styling** | Tailwind CSS | Utility-first styling & responsiveness |
| **Animation** | Framer Motion | Layout transitions & scroll reveals |
| **3D Graphics** | React Three Fiber (Three.js) | Background starfield system |
| **Icons** | Lucide React | SVG optimization |

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

4.  Open [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```bash
src/
├── app/              # Next.js App Router pages
├── components/       # Reusable UI components
│   └── ui/           # Complex animated components (Spotlight, Meteors, etc.)
└── lib/              # Utility functions (Tailwind merger)
```

*Designed & Engineered by [Uwais Alqarni]*
