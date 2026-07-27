"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { MobileNav } from "./mobile-nav";
import { Menu, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Image from "next/image";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /**
   * Resolve the correct href for a nav item:
   * - If on the homepage, anchor links (#services, etc.) work as-is.
   * - If on another page (/portofolio, etc.), anchor links must go to /#services.
   * - Full-path links (/portofolio) work on any page.
   */
  function resolveHref(href: string): string {
    if (href.startsWith("/")) return href;      // e.g. /portofolio
    if (href === "#") return isHomePage ? "#" : "/";
    return isHomePage ? href : `/${href}`;       // #services → /#services when off-home
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-primary text-soft-white py-2 px-4 text-center font-sans text-xs tracking-wider uppercase">
        <span>Konsultasikan kebutuhan interior Anda bersama tim FULLHOME ID.</span>
      </div>

      {/* Main Header */}
      <header
        id="main-header"
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-background/90 backdrop-blur-md border-light-taupe/40 shadow-sm py-3"
            : "bg-background/70 backdrop-blur-sm border-transparent py-4 md:py-5"
        )}
      >
        <div className="max-w-container-max mx-auto px-6 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm"
          >
            <div className="relative w-8 h-8 md:w-9 md:h-9 shrink-0 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="FULLHOME ID Logo"
                fill
                sizes="36px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl md:text-2xl font-medium tracking-tight text-primary group-hover:text-secondary transition-colors leading-none">
                FULLHOME ID
              </span>
              <span className="font-sans text-[9px] md:text-[10px] text-warm-gray tracking-widest uppercase mt-1">
                Interior Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-8">
            {siteConfig.mainNav.map((item) => {
              const href = resolveHref(item.href);
              const isActive = item.href === "/portofolio" && pathname === "/portofolio";
              return (
                <Link
                  key={item.label}
                  href={href}
                  className={cn(
                    "font-sans text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm",
                    isActive ? "text-primary font-semibold" : "text-warm-gray hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={isHomePage ? "#contact" : "/#contact"}
              className="inline-flex items-center justify-center bg-primary text-soft-white font-sans font-semibold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-secondary transition-all hover:scale-[1.02] shadow-sm"
            >
              <span>Konsultasi Gratis</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Buka Menu Navigasi"
            className="md:hidden p-2 text-primary hover:text-secondary focus:outline-none focus:ring-2 focus:ring-secondary rounded-sm"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />
    </>
  );
}
