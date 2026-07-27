"use client";

import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { X, MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  function resolveHref(href: string): string {
    if (href.startsWith("/")) return href;
    if (href === "#") return isHomePage ? "#" : "/";
    return isHomePage ? href : `/${href}`;
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const waLink = buildWhatsAppLink();

  return (
    <div className="fixed inset-0 z-50 md:hidden flex flex-col bg-background/98 backdrop-blur-xl transition-all duration-300">
      {/* Top bar inside drawer */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-light-taupe/30">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-light-taupe/60 bg-soft-white/90 shadow-xs shrink-0">
            <Image
              src="/logo.png"
              alt="FULLHOME ID Logo"
              fill
              sizes="36px"
              className="object-contain p-1"
            />
          </div>
          <span className="font-serif text-xl font-medium tracking-tight text-primary">
            FULLHOME ID
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup Menu"
          className="p-2 text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-6 py-8 flex flex-col gap-6 overflow-y-auto">
        {siteConfig.mainNav.map((item) => (
          <Link
            key={item.label}
            href={resolveHref(item.href)}
            onClick={onClose}
            className="font-serif text-2xl text-primary hover:text-secondary transition-colors border-b border-light-taupe/20 pb-3"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Footer CTA */}
      <div className="p-6 border-t border-light-taupe/30 flex flex-col gap-4">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="w-full bg-primary text-soft-white py-4 rounded-full font-sans font-semibold text-sm hover:bg-secondary transition-all flex items-center justify-center gap-2.5 shadow-md"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Konsultasi WhatsApp</span>
        </a>
        <p className="font-sans text-xs text-warm-gray text-center">
          Editorial Minimalism in Interior Design
        </p>
      </div>
    </div>
  );
}
