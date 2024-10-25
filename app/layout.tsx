import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "CrumbLab | Expert Branding & Digital Services",
  description:
    "CrumbLab - Top agency providing Branding, Logo Design, SEO, Video Editing, and more. Boost your digital presence today!",
  keywords:
    "Branding, Logo Design, SEO Onsite, Page Speed Optimization, Schema Markup, Video Editing, Marketing Video, Social Media Banners, CrumbLab",
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
    images: [
      {
        url: "https://crum-blab.vercel.app/assets/logo_small.png",
        alt: "CrumbLab Logo",
      },
    ],
  },
  icons: {
    icon: "/logo.png",
  },
  other: {
    "google-font-preconnect": "https://fonts.googleapis.com",
    "google-font-preconnect-crossorigin": "https://fonts.gstatic.com",
    "google-font-stylesheet":
      "https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap",
  },
};

// Schema.org JSON-LD
export const generateSchemaMarkup = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "CrumbLab Agency",
  description:
    "We provide expert branding, logo design, SEO, video editing, and more digital services.",
  url: "https://crum-blab.vercel.app/",
  logo: "https://crum-blab.vercel.app/assets/logo_small.png",
  sameAs: ["https://facebook.com/crumbLab", "https://twitter.com/crumbLab"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "City",
    addressCountry: "Country",
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
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(generateSchemaMarkup),
            }}
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
