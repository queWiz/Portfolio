import type { Metadata } from "next";
import { Amiri, Geist, Geist_Mono, Mrs_Saint_Delafield, Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { headInitScript } from "@/lib/initScripts";

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

// Hero name: the two treatments alternate per visit (see lib/initScripts.ts).
const pixel = Pixelify_Sans({ subsets: ["latin"], weight: ["600"], variable: "--font-pixel", preload: false });
const signature = Mrs_Saint_Delafield({ subsets: ["latin"], weight: ["400"], variable: "--font-signature", preload: false });

const TITLE = "Uwais Alqarni · Software & Data Engineer";
const DESCRIPTION =
  "Software Engineering student at SIT, Singapore. Platforms for real clients, AI that runs offline in the browser, and two papers at ACM AutoUI '26.";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-indol-eight-45.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://portfolio-indol-eight-45.vercel.app",
    siteName: "Uwais Alqarni",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headInitScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} ${amiri.variable} ${pixel.variable} ${signature.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
