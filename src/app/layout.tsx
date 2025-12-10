import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Uwais Alqarni | Data Engineer",
  description: "Portfolio of a Full Stack Data Engineer specializing in Kafka, RAG, and AI.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark scroll-smooth"> {/* Added scroll-smooth */}
      <body className={`${inter.variable} ${mono.variable} font-sans bg-black text-white antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}