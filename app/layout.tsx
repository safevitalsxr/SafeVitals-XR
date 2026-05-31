import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafeVitals XR - Immersive Healthcare Monitoring",
  description:
    "Transforming ICU monitoring through XR, Digital Twins, and AI-powered clinical intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased bg-background text-text font-sans selection:bg-accent/30`} suppressHydrationWarning>
        <SmoothScroll />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
