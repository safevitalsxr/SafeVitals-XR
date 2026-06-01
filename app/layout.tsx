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
    default: "SafeVitals XR | Real-Time Healthcare Intelligence",
    template: "%s | SafeVitals XR",
  },
  description:
    "SafeVitals XR connects existing hospital monitoring systems and transforms patient monitoring into immersive clinical intelligence through XR, cloud, and real-time analytics.",
  keywords: [
    "SafeVitals",
    "SafeVitals XR",
    "safe vitals",
    "healthcare XR",
    "hospital monitoring",
    "ICU monitoring",
    "medical dashboard",
    "patient monitoring XR",
    "hospital cloud monitoring",
    "digital twin healthcare",
    "clinical intelligence",
    "real-time patient monitoring",
  ],
  metadataBase: new URL("https://safevitals.in"),
  openGraph: {
    title: "SafeVitals XR | Real-Time Healthcare Intelligence",
    description:
      "SafeVitals XR connects existing hospital monitoring systems and transforms patient monitoring into immersive clinical intelligence through XR, cloud, and real-time analytics.",
    url: "https://safevitals.in",
    siteName: "SafeVitals XR",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeVitals XR | Real-Time Healthcare Intelligence",
    description:
      "Real-Time Healthcare Intelligence in XR. Transform ICU monitoring through immersive visualization, digital twins, and AI-powered analytics.",
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
  logo: "https://safevitals.in/logo.png",
  description:
    "Real-Time Healthcare Intelligence in XR. SafeVitals connects existing hospital monitoring systems and transforms patient monitoring into immersive clinical intelligence.",
  sameAs: [],
};

export default function RootLayout({
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
