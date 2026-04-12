import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/ui/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { SideHUD } from "@/components/ui/SideHUD";
// import { ShimmerButton } from "@/components/ui/ShimmerButton";

const inter = Inter({ subsets:["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Uwais Alqarni | Software Engineer",
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
        <SideHUD /> 
        {children}
        <Footer /> 
      </body>
    </html>
  );
}