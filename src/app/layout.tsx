import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
// import { ShimmerButton } from "@/components/ui/ShimmerButton";

const inter = Inter({ subsets:["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Uwais Alqarni | Data Engineer",
  description: "Portfolio of Uwais Alqarni, Software Engineering Student at SIT.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans bg-base text-cream antialiased`}>
        <CustomCursor />
        {/* <ShimmerButton href="/resume.pdf" /> */}
        {children}
        {/* Make sure Footer has bg-base instead of black in its own CSS! */}
        <Footer /> 
      </body>
    </html>
  );
}