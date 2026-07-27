import type { Metadata, Viewport } from "next";
import { EB_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/config/site";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500", "600"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "interior design",
    "desain interior jakarta",
    "custom furniture",
    "renovasi rumah",
    "warm minimal luxury",
    "fullhome id",
    "interior tangerang",
    "kitchen set custom",
  ],
  authors: [{ name: "FULLHOME ID Studio" }],
  creator: "FULLHOME ID",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnf7IHhlnFt4MEJ4OmsbMm7TPs4KNZ42RdsDmkqPAFMYMUY-skbw070g2Gkxd7at73Ezs-E1tw1IQfQVsBqLGbPK2BdyDIhlAQ58-wXYfxSuFtEgXqGC_ZYvLJVS-vEE3TjaKjgCd05I2ZOYfWQELfMuEoPP_QnUAzDDGYjoW-8otjTufT5JZkRW1y-6gxu-kbgl4meu11BVviBlvmOCo7O_F_em2OJpuIA2bWxZVnptdgkiDt-MfVeOz1EKcy0u57PcFo3BTGoEbc",
        width: 1200,
        height: 630,
        alt: "FULLHOME ID Interior Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnf7IHhlnFt4MEJ4OmsbMm7TPs4KNZ42RdsDmkqPAFMYMUY-skbw070g2Gkxd7at73Ezs-E1tw1IQfQVsBqLGbPK2BdyDIhlAQ58-wXYfxSuFtEgXqGC_ZYvLJVS-vEE3TjaKjgCd05I2ZOYfWQELfMuEoPP_QnUAzDDGYjoW-8otjTufT5JZkRW1y-6gxu-kbgl4meu11BVviBlvmOCo7O_F_em2OJpuIA2bWxZVnptdgkiDt-MfVeOz1EKcy0u57PcFo3BTGoEbc",
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf9f3",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.whatsappNumber,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressRegion: "DKI Jakarta",
      addressCountry: "ID",
    },
    areaServed: "Jabodetabek",
    priceRange: "$$",
  };

  return (
    <html
      lang="id"
      className={`${ebGaramond.variable} ${plusJakartaSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
