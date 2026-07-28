"use client";

import { useState, useEffect } from "react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ArrowUpRight, MapPin, Images } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectModal, type Project } from "@/components/shared/project-modal";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Category {
  id: string;
  label: string;
  count: number;
}

export function PortfolioSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetch("/api/portfolio/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories ?? []))
      .catch((err) => console.error("Categories fetch error:", err));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/portfolio/projects?category=${selectedCategory}&page=1`)
      .then((r) => r.json())
      .then((d) => {
        setProjects((d.projects ?? []).slice(0, 5));
      })
      .catch((err) => console.error("Projects fetch error:", err))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-black/[0.02] dark:bg-white/[0.02] border-y border-foreground/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="KARYA TERPILIH"
            title="Portofolio Interior & Build"
            subtitle="Jelajahi kurasi dokumentasi pengerjaan proyek interior kami di Jabodetabek, Jawa & Bali."
          />
        </Reveal>

        {/* Category Pill Filters */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3 mt-8 md:mt-12 mb-14">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "font-sans text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 focus:outline-none",
                selectedCategory === "all"
                  ? "bg-primary text-white shadow-sm scale-105"
                  : "bg-background text-warm-gray border border-foreground/10 hover:bg-black/5 hover:text-primary"
              )}
            >
              Semua Proyek
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "font-sans text-xs md:text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 focus:outline-none",
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-sm scale-105"
                    : "bg-background text-warm-gray border border-foreground/10 hover:bg-black/5 hover:text-primary"
                )}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        </Reveal>

        {/* Asymmetrical Bento Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[4/3] rounded-3xl bg-black/5 animate-pulse border border-foreground/10"
              />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-sans text-warm-gray text-sm">Tidak ada proyek dalam kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {projects.map((project, idx) => {
              const colSpanClass =
                idx % 3 === 0
                  ? "lg:col-span-7"
                  : idx % 3 === 1
                  ? "lg:col-span-5"
                  : "lg:col-span-12";

              const aspectClass = idx % 3 === 2 ? "aspect-[16/9]" : "aspect-[4/3] md:aspect-[5/4]";

              const parts = project.name.split(" - ");
              const clientName = parts[0];
              const location = parts.slice(1).join(" - ");

              return (
                <Reveal key={project.id} delay={0.1 * (idx % 4)} className={colSpanClass}>
                  {/* Double-Bezel Card Outer Shell */}
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 cursor-pointer group hover:border-foreground/25 transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Inner Core */}
                    <div className="bg-background rounded-[calc(1.5rem-0.25rem)] overflow-hidden border border-foreground/5 shadow-xs flex flex-col h-full justify-between">
                      <div className={cn("relative w-full overflow-hidden bg-muted", aspectClass)}>
                        <img
                          src={project.coverSrc}
                          alt={project.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 z-10">
                          <span className="text-[10px] font-mono tracking-widest uppercase text-primary bg-background/90 backdrop-blur-md px-3 py-1 rounded-full border border-foreground/10 shadow-xs">
                            {project.categoryLabel}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-10">
                          <span className="text-[10px] font-mono tracking-widest text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
                            <Images className="w-3 h-3" />
                            {project.imageCount} Foto
                          </span>
                        </div>
                      </div>

                      <div className="p-6 md:p-7 flex flex-col justify-between flex-1 gap-4">
                        <div>
                          <div className="flex items-center justify-between gap-4 mb-2">
                            <h3 className="font-serif text-xl md:text-2xl text-primary font-medium group-hover:text-secondary transition-colors line-clamp-1">
                              {clientName}
                            </h3>
                            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                              <ArrowUpRight className="w-4 h-4" />
                            </div>
                          </div>
                          <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed line-clamp-2">
                            Dokumentasi hasil pengerjaan kustom interior dengan standar kualitas tinggi untuk {clientName}.
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-foreground/10 text-xs font-sans text-warm-gray">
                          <span className="flex items-center gap-1.5 font-medium text-primary">
                            <MapPin className="w-3.5 h-3.5 text-secondary" />
                            {location || "Jabodetabek / Jawa"}
                          </span>
                          <span className="font-mono text-[11px]">Buka Dokumentasi ↗</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        )}

        {/* CTA to full portfolio page */}
        <Reveal delay={0.2}>
          <div className="flex flex-col items-center gap-4 mt-16 text-center">
            <p className="font-sans text-xs md:text-sm text-warm-gray">
              Lihat seluruh koleksi dokumentasi foto proyek interior lengkap kami.
            </p>
            <Link
              href="/portofolio"
              className="group inline-flex items-center gap-2.5 bg-primary text-white font-sans text-xs uppercase tracking-wider pl-6 pr-3 py-3.5 rounded-full hover:bg-secondary transition-all shadow-md"
            >
              <span className="font-medium">Lihat Semua Proyek Portofolio</span>
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Dynamic Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </section>
  );
}
