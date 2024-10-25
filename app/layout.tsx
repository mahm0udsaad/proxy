import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  metadataBase: new URL("https://crum-blab.vercel.app"),
  title: {
    default: "CrumbLab | Expert Branding & Digital Services",
    template: "%s | CrumbLab",
  },
  description:
    "CrumbLab - Top agency providing Branding, Logo Design, SEO, Video Editing, and more. Boost your digital presence today!",
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
    title: "CrumbLab | Expert Branding & Digital Services",
    description:
      "Get expert services in Branding, SEO, Video Editing, and more to enhance your business presence.",
    url: "https://crum-blab.vercel.app/",
    siteName: "CrumbLab",
    images: [
      {
        url: "/assets/logo_small.png",
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
    images: ["/assets/logo_small.png"],
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
