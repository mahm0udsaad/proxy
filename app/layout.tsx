import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://crum-blab.vercel.app"),
  title: {
    default: "Power Proxy | Reliable Mobile Proxy Services",
    template: "%s | CrumbLab",
  },
  description:
    "Power Proxy - Leading provider of fast and secure mobile proxy services. Enhance your online privacy and web scraping capabilities.",
  keywords: [
    "Branding",
    "Logo Design",
    "SEO Onsite",
    "Page Speed Optimization",
    "Schema Markup",
    "Video Editing",
    "Marketing Video",
    "Social Media Banners",
    "CrumbLab",
  ],
  authors: [{ name: "CrumbLab Agency" }],
  openGraph: {
    title: "Power Proxy | Reliable Mobile Proxy Services",
    description:
      "Power Proxy - Leading provider of fast and secure mobile proxy services. Enhance your online privacy and web scraping capabilities.",
    url: "https://crum-blab.vercel.app/",
    siteName: "CrumbLab",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "CrumbLab Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CrumbLab | Expert Branding & Digital Services",
    description:
      "Get expert services in Branding, SEO, Video Editing, and more to enhance your business presence.",
    creator: "@crumbLab",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
