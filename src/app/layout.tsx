import type { Metadata } from "next";
import { Poppins, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
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
      <body
        className={`${poppins.variable} ${inter.variable} ${mono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}