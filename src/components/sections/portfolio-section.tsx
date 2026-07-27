"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioData, portfolioCategories } from "@/data/portfolio";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredProjects =
    selectedCategory === "Semua"
      ? portfolioData
      : portfolioData.filter((p) => p.category === selectedCategory);

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-surface-container-low/40 border-y border-light-taupe/30">
      <div className="max-w-container-max mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Karya Terpilih"
            title="Portofolio Interior & Build"
            subtitle="Jelajahi kurasi hasil pengerjaan interior kami yang mengusung karakter Warm Minimal Luxury."
          />
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mt-8 md:mt-10 mb-12">
            {portfolioCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "font-sans text-xs md:text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary",
                  selectedCategory === cat
                    ? "bg-primary text-soft-white shadow-sm scale-105"
                    : "bg-soft-white text-warm-gray border border-light-taupe/50 hover:bg-surface-container hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Portfolio Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {filteredProjects.map((project, idx) => {
            // Asymmetrical grid column calculation for editorial feel
            const colSpanClass =
              idx % 3 === 0
                ? "lg:col-span-7"
                : idx % 3 === 1
                ? "lg:col-span-5"
                : "lg:col-span-12";

            const aspectClass =
              idx % 3 === 2 ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[5/4]";

            return (
              <Reveal key={project.id} delay={0.1 * (idx % 4)} className={colSpanClass}>
                <div className="group cursor-pointer bg-soft-white rounded-2xl overflow-hidden border border-light-taupe/30 shadow-sm hover:shadow-md transition-all duration-500 flex flex-col h-full">
                  <div className={cn("relative w-full overflow-hidden bg-surface-container", aspectClass)}>
                    <Image
                      src={project.image}
                      alt={project.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-sans text-[11px] font-semibold text-primary uppercase tracking-wider bg-soft-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-light-taupe/40 shadow-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-4">
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <h3 className="font-serif text-2xl text-primary font-medium group-hover:text-secondary transition-colors">
                          {project.title}
                        </h3>
                        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-warm-gray group-hover:bg-primary group-hover:text-soft-white transition-colors duration-300 shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-light-taupe/20 text-xs font-sans text-warm-gray">
                      <span className="flex items-center gap-1.5 font-medium text-primary">
                        <MapPin className="w-3.5 h-3.5 text-secondary" />
                        {project.location}
                      </span>
                      {project.scope && <span>{project.scope}</span>}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
        {/* CTA to full portfolio page */}
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-4 mt-14 text-center">
            <p className="font-sans text-sm text-warm-gray">
              Ini hanya sebagian kecil dari ribuan proyek yang telah kami kerjakan.
            </p>
            <a
              href="/portofolio"
              className="inline-flex items-center gap-2.5 bg-primary text-soft-white font-sans font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-secondary transition-all duration-300 group shadow-sm"
            >
              <span>Lihat Semua Foto (9.800+ Dokumentasi)</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
