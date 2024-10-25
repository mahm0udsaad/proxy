import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

export const metadata: Metadata = {
  title: "CrumbLab | Expert Branding & Digital Services",
  description:
    "CrumbLab - Top agency providing Branding, Logo Design, SEO, Video Editing, and more. Boost your digital presence today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          {/* Basic SEO Meta Tags */}
          <meta
            name="description"
            content="CrumbLab - Top agency providing Branding, Logo Design, SEO, Video Editing, and more. Boost your digital presence today!"
          />
          <meta
            name="keywords"
            content="Branding, Logo Design, SEO Onsite, Page Speed Optimization, Schema Markup, Video Editing, Marketing Video, Social Media Banners, CrumbLab"
          />
          <meta name="author" content="CrumbLab Agency" />

          {/* Open Graph Meta Tags */}
          <meta
            property="og:title"
            content="CrumbLab | Expert Branding & Digital Services"
          />
          <meta
            property="og:description"
            content="Get expert services in Branding, SEO, Video Editing, and more to enhance your business presence."
          />
          <meta property="og:image" content="/assets/logo_small.png" />
          <meta property="og:url" content="https://crum-blab.vercel.app/" />
          <meta property="og:type" content="website" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="CrumbLab | Expert Branding & Digital Services"
          />
          <meta
            name="twitter:description"
            content="Get expert services in Branding, SEO, Video Editing, and more to enhance your business presence."
          />
          <meta
            name="twitter:image"
            content="https://crum-blab.vercel.app/assets/logo_small.png"
          />
          <meta name="twitter:image:alt" content="CrumbLab Logo" />
          <meta name="twitter:creator" content="@crumbLab" />

          {/* Icon and Fonts */}
          <link rel="icon" type="image/png" href="/logo.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap"
            rel="stylesheet"
          />

          {/* Schema Markup */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "CrumbLab Agency",
              description:
                "We provide expert branding, logo design, SEO, video editing, and more digital services.",
              url: "https://crum-blab.vercel.app/",
              logo: "https://crum-blab.vercel.app/assets/logo_small.png",
              sameAs: [
                "https://facebook.com/crumbLab",
                "https://twitter.com/crumbLab",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "City",
                addressCountry: "Country",
              },
            })}
          </script>
        </Head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
