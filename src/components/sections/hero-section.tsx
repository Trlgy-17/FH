import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-6 md:pt-14 pb-20 md:pb-32 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-6 flex flex-col gap-6 z-10">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 w-fit backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>INTERIOR STUDIO & CUSTOM FURNITURE</span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-medium leading-[1.08] tracking-tight">
              Ruang Yang Dirancang Khusus <br className="hidden sm:block" />
              <span className="italic font-normal text-secondary">Untuk Jiwa & Karakter</span> Anda.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-warm-gray leading-relaxed max-w-xl">
              FULLHOME ID menghadirkan solusi interior custom presisi tinggi — menggabungkan fungsi, estetika Warm Minimal Luxury, dan transparansi anggaran RAB dari awal hingga pengerjaan selesai.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <WhatsAppButton variant="primary">
                Konsultasi Gratis via WhatsApp
              </WhatsAppButton>

              <Link
                href="/portofolio"
                className="group inline-flex items-center justify-center border border-foreground/15 text-primary font-sans font-medium text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:border-foreground/30 hover:bg-black/5 transition-all duration-300 backdrop-blur-sm"
              >
                <span>Lihat Portofolio Proyek</span>
                <span className="w-6 h-6 rounded-full bg-black/5 ml-2.5 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                </span>
              </Link>
            </div>
          </Reveal>

          {/* Micro Trust Pills */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center gap-5 pt-3 text-xs font-sans text-warm-gray">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Visualisasi 3D Detail</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Transparansi Biaya RAB</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                <span>Garansi Kualitas Material</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Double-Bezel Architectural Image Showcase */}
        <div className="lg:col-span-6 relative">
          <Reveal delay={0.2} direction="left">
            {/* Outer Hardware Shell (Bezel 1) */}
            <div className="p-2.5 sm:p-3.5 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl backdrop-blur-md">
              {/* Inner Core Container (Bezel 2) */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-[calc(2.5rem-0.75rem)] overflow-hidden bg-muted border border-foreground/10">
                <Image
                  src="/images/hero-luxury-living-room.jpg"
                  alt="Dokumentasi Interior Luxury Living Room FULLHOME ID"
                  fill
                  priority
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Micro floating glass badge inside image */}
                <div className="absolute top-4 right-4 bg-background/85 backdrop-blur-md border border-foreground/15 px-3.5 py-1.5 rounded-full text-[11px] font-mono text-primary shadow-lg flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Survei Lokasi & Layout 2D</span>
                </div>
              </div>
            </div>

            {/* Floating Glass Trust Card */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-background/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl border border-foreground/15 flex items-center gap-5 z-20">
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-primary leading-none">
                  100+
                </span>
                <span className="font-sans text-[11px] text-warm-gray mt-1">
                  Proyek Interior Selesai
                </span>
              </div>
              <div className="w-px h-8 bg-foreground/15" />
              <div className="flex flex-col">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-primary leading-none">
                  4.9★
                </span>
                <span className="font-sans text-[11px] text-warm-gray mt-1">
                  Kepuasan Klien Kustom
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
