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
  title: {
    default: "SafeVitals XR",
    template: "%s | SafeVitals XR",
  },
  description:
    "SafeVitals XR transforms patient monitoring into immersive healthcare intelligence through SafeVitals Bridge, cloud infrastructure, medical dashboards, and XR visualization.",
  keywords: [
    "SafeVitals",
    "SafeVitals XR",
    "Safe Vitals",
    "Hospital Monitoring",
    "ICU Monitoring",
    "Patient Monitoring",
    "Healthcare XR",
    "Medical Dashboard",
    "SafeVitals Bridge",
    "Healthcare Intelligence",
  ],
  metadataBase: new URL("https://safevitals.in"),
  openGraph: {
    title: "SafeVitals XR",
    description: "Real-Time Healthcare Intelligence in XR",
    url: "https://safevitals.in",
    siteName: "SafeVitals XR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeVitals Technologies Pvt Ltd | SafeVitals XR",
    description: "Real-Time Healthcare Intelligence in XR",
    site: "@SafeVitalsXR",
    creator: "@SafeVitalsXR",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://safevitals.in",
  },
};

// JSON-LD structured data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "SafeVitals Technologies Pvt Ltd",
  url: "https://safevitals.in",
  description: "Real-Time Healthcare Intelligence in XR",
  sameAs: [
    "https://x.com/SafeVitalsXR",
    "https://www.instagram.com/safevitals_xr"
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} antialiased bg-background text-text font-sans selection:bg-accent/30`} suppressHydrationWarning>
        <SmoothScroll />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
