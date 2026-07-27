import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio | FULLHOME ID – Dokumentasi Proyek Interior",
  description:
    "Lihat ribuan foto dokumentasi nyata proyek interior FULLHOME ID — Bedroom, Kitchen Set, Living Room, Wardrobe, Semi & Full Home, dan banyak lagi.",
  openGraph: {
    title: "Portofolio FULLHOME ID – Dokumentasi Proyek Interior",
    description:
      "Galeri lengkap dokumentasi nyata pekerjaan interior dari klien FULLHOME ID di seluruh Indonesia.",
    url: "https://fullhome.id/portofolio",
    siteName: "FULLHOME ID",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
