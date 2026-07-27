import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-light-taupe/40 text-primary">
      <div className="max-w-container-max mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12 border-b border-light-taupe/30">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3 w-fit group">
              <div className="relative w-11 h-11 md:w-12 md:h-12 rounded-full overflow-hidden border border-primary/25 bg-white shadow-xs shrink-0 group-hover:scale-105 group-hover:border-secondary transition-all duration-300">
                <Image
                  src="/logo.png"
                  alt="FULLHOME ID Logo"
                  fill
                  sizes="48px"
                  className="object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-medium tracking-tight text-primary group-hover:text-secondary transition-colors leading-none">
                  FULLHOME ID
                </span>
                <span className="font-sans text-[10px] text-warm-gray tracking-widest uppercase mt-1">
                  Editorial Minimalism Studio
                </span>
              </div>
            </a>
            <p className="font-sans text-sm text-warm-gray leading-relaxed max-w-sm">
              Mewujudkan interior custom bernuansa hangat, fungsional, dan presisi tinggi untuk hunian serta ruang komersial di Jabodetabek dan sekitarnya.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="font-sans text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Navigasi
            </span>
            {siteConfig.mainNav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-warm-gray hover:text-primary transition-colors w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact & Area */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="font-sans text-xs font-semibold text-primary uppercase tracking-wider mb-1">
              Area Layanan & Kontak
            </span>
            <p className="font-sans text-sm text-warm-gray">
              Area Utama: <span className="text-primary font-medium">Jabodetabek</span>
            </p>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-secondary hover:text-primary transition-colors w-fit"
            >
              <span>Konsultasi WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-warm-gray hover:text-primary transition-colors w-fit"
            >
              <span>Instagram @fullhome.id</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="font-sans text-xs text-warm-gray">
            © {currentYear} FULLHOME ID. All rights reserved. Editorial Minimalism in Interior Design.
          </p>
          <div className="flex gap-6 font-sans text-xs text-warm-gray">
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
