import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-foreground/10 text-primary pt-16 md:pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-16 border-b border-foreground/10">
          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3 w-fit group">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-foreground/15 bg-white shadow-xs shrink-0 group-hover:scale-105 transition-all">
                <Image
                  src="/logo-v3.png"
                  alt="FULLHOME ID Logo"
                  fill
                  sizes="40px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-medium tracking-tight text-primary leading-none">
                  FULLHOME ID
                </span>
                <span className="font-sans text-[9px] font-mono tracking-widest text-warm-gray uppercase mt-1">
                  Warm Minimal Luxury Studio
                </span>
              </div>
            </Link>
            <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed max-w-sm">
              Mewujudkan interior custom bernuansa hangat, fungsional, dan presisi tinggi untuk hunian serta ruang komersial di Jabodetabek, Jawa & Bali.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-gray mb-1">
              NAVIGASI PROYEK
            </span>
            {siteConfig.mainNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-xs md:text-sm text-warm-gray hover:text-primary transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Area, Address & Social Column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-semibold text-warm-gray mb-1">
              LOKASI OFFICE & KONTAK
            </span>
            <div className="flex items-start gap-2 text-xs md:text-sm text-warm-gray">
              <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <span className="text-primary font-medium leading-snug">
                  {siteConfig.address}
                </span>
                <span className="font-mono text-[11px] text-secondary tracking-wider">
                  Plus Code: {siteConfig.plusCode}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-secondary hover:text-primary transition-colors w-fit"
              >
                <span>Petunjuk Arah Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-warm-gray hover:text-primary transition-colors w-fit"
              >
                <span>WhatsApp Official Studio</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium text-warm-gray hover:text-primary transition-colors w-fit"
              >
                <span>Instagram @fullhome.id</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs font-sans text-warm-gray">
          <p>© {currentYear} FULLHOME ID Studio. Warm Minimal Luxury Interior Design.</p>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#about" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
