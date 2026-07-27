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
            <a href="#" className="flex flex-col w-fit">
              <span className="font-serif text-3xl font-medium tracking-tight text-primary">
                FULLHOME ID
              </span>
              <span className="font-sans text-xs text-warm-gray tracking-widest uppercase mt-0.5">
                Editorial Minimalism Studio
              </span>
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
