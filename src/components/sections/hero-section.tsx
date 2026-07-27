import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-6 md:pt-12 pb-16 md:pb-24 px-6 md:px-8 max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-6 flex flex-col gap-6 z-10">
          <Reveal direction="down">
            <span className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-warm-gray tracking-widest uppercase bg-surface-container px-3.5 py-1.5 rounded-full border border-light-taupe/40 w-fit">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Interior Design & Build Studio
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-primary font-medium leading-[1.15] tracking-tight text-balance">
              Ruang yang Dirancang untuk Hidup Anda.
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-warm-gray leading-relaxed max-w-xl">
              FULLHOME ID membantu Anda merancang dan mewujudkan interior custom yang nyaman, fungsional, dan sesuai karakter ruang serta anggaran Anda.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <WhatsAppButton variant="primary">
                Konsultasi Gratis via WhatsApp
              </WhatsAppButton>
              <a
                href="/portofolio"
                className="inline-flex items-center justify-center border border-light-taupe text-primary font-sans font-semibold text-sm px-6 py-3.5 rounded-full hover:border-warm-gray hover:bg-surface-container-low transition-all duration-300 bg-soft-white/60 backdrop-blur-sm group"
              >
                <span>Lihat Portofolio</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-sans text-warm-gray">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Desain Presisi 3D</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Transparansi Biaya RAB</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span>Garansi Pengerjaan</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hero Visual */}
        <div className="lg:col-span-6 relative">
          <Reveal delay={0.2} direction="left">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-md border border-light-taupe/30 bg-surface-container-low">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnf7IHhlnFt4MEJ4OmsbMm7TPs4KNZ42RdsDmkqPAFMYMUY-skbw070g2Gkxd7at73Ezs-E1tw1IQfQVsBqLGbPK2BdyDIhlAQ58-wXYfxSuFtEgXqGC_ZYvLJVS-vEE3TjaKjgCd05I2ZOYfWQELfMuEoPP_QnUAzDDGYjoW-8otjTufT5JZkRW1y-6gxu-kbgl4meu11BVviBlvmOCo7O_F_em2OJpuIA2bWxZVnptdgkiDt-MfVeOz1EKcy0u57PcFo3BTGoEbc"
                alt="Interior ruang keluarga Warm Minimal Luxury oleh FULLHOME ID dengan sofa linen charcoal dan pencahayaan alami."
                fill
                priority
                loading="eager"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Trust Card */}
            <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-soft-white p-5 sm:p-6 rounded-xl shadow-xl border border-light-taupe/40 flex items-center gap-6 z-20">
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-primary">
                  100% Custom
                </div>
                <div className="font-sans text-xs text-warm-gray">
                  Presisi Ukuran Ruang
                </div>
              </div>
              <div className="w-px h-10 bg-light-taupe/50" />
              <div>
                <div className="font-serif text-2xl sm:text-3xl font-medium text-primary">
                  Jabodetabek
                </div>
                <div className="font-sans text-xs text-warm-gray">
                  Fokus Area Layanan
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
