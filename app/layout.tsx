import { Nav } from "@/components/layout/nav";
import { Providers } from "@/components/layout/providers";
import { ScrollAnimations } from "@/components/layout/scroll-animations";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { SiteDecorations } from "@/components/layout/site-decorations";
import { SplashScreen } from "@/components/splash-screen";
import { baseMetadata } from "@/lib/metadata";
import { getStructuredData } from "@/lib/structured-data";
import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = baseMetadata;
const structuredData = getStructuredData();

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>): ReactNode {
  return (
    <html
      lang="id"
      className="dark"
      data-splash="pending"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${fraunces.variable} bg-background text-foreground min-h-screen font-sans antialiased`}
      >
        <Providers>
          <SplashScreen />
          <SiteDecorations />
          <SkipToContent />
          <Nav />
          {children}
          <ScrollAnimations />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
