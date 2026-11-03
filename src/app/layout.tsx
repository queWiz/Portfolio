import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
