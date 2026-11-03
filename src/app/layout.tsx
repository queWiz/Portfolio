import type { Metadata } from "next";
import { Amiri, Geist, Geist_Mono, Mrs_Saint_Delafield, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider, themeInitScript } from "@/components/ThemeProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Arabic display face for the single word in the "How I work" section.
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["700"],
  variable: "--font-arabic",
  preload: false,
});

// PARKED: pixel vs signature name treatment; remove the unused font once decided.
const pixel = Pixelify_Sans({ subsets: ["latin"], weight: ["600"], variable: "--font-pixel", preload: false });
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: ["400"], variable: "--font-signature", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-indol-eight-45.vercel.app"),
  title: "Uwais Alqarni — Software & Data Engineer",
  description:
    "Portfolio of Uwais Alqarni — Software Engineering student at Singapore Institute of Technology (SIT). Focused on distributed data systems, edge AI, and verified software architecture.",
  openGraph: {
    title: "Uwais Alqarni — Software & Data Engineer",
    description: "Distributed data pipelines, edge AI, and verified architecture.",
    url: "https://portfolio-indol-eight-45.vercel.app",
    siteName: "Uwais Alqarni Portfolio",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uwais Alqarni — Software & Data Engineer",
    description: "Distributed data pipelines, edge AI, and verified architecture.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${amiri.variable} ${pixel.variable} ${signature.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
