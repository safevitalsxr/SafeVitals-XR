import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { SmoothScroll } from "@/components/smooth-scroll";
import { headers } from "next/headers";
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
    "SafeVitals XR transforms patient monitoring into immersive healthcare intelligence through SafeVitals Bridge, cloud infrastructure, medical dashboards, mobile applications, and XR visualization.",
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
    title: "SafeVitals XR",
    description: "Real-Time Healthcare Intelligence in XR",
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
  name: "SafeVitals XR",
  url: "https://safevitals.in",
  description: "Real-Time Healthcare Intelligence in XR",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const isMobileHeader = headersList.get("x-is-mobile") === "true";
  const isMobile = host.startsWith("mobile.") || isMobileHeader;

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
        {!isMobile && <SmoothScroll />}
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
