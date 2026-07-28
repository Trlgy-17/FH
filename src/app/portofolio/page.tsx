"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  Search,
  ArrowLeft,
  MessageCircle,
  Images,
  Loader2,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { ProjectModal, type Project } from "@/components/shared/project-modal";

interface Category {
  id: string;
  label: string;
  count: number;
}

// ─── Double-Bezel Project Card ───────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const parts = project.name.split(" - ");
  const clientName = parts[0];
  const location = parts.slice(1).join(" - ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
      onClick={onClick}
      className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 cursor-pointer group hover:border-foreground/25 transition-all duration-500 flex flex-col h-full"
    >
      {/* Inner Core */}
      <div className="bg-background rounded-[calc(1.5rem-0.25rem)] overflow-hidden border border-foreground/5 shadow-xs flex flex-col h-full justify-between">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {!loaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/10 animate-pulse" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.coverSrc}
            alt={`${project.categoryLabel} – ${project.name}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="text-[10px] font-mono tracking-widest uppercase text-primary bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-foreground/10 shadow-xs">
              {project.categoryLabel}
            </span>
          </div>
          <div className="absolute top-3 right-3 z-10">
            <span className="text-[10px] font-mono tracking-widest text-white bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1.5">
              <Images className="w-3 h-3" />
              {project.imageCount} Foto
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 gap-3">
          <div>
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-serif text-base font-medium text-primary truncate leading-snug group-hover:text-secondary transition-colors">
                {clientName}
              </h3>
              <ArrowUpRight className="w-4 h-4 text-warm-gray group-hover:text-primary transition-colors shrink-0" />
            </div>
            {location && (
              <p className="flex items-center gap-1 font-sans text-xs text-warm-gray mt-1 truncate">
                <MapPin className="w-3 h-3 text-secondary shrink-0" />
                {location}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Portfolio Page ──────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [totalProjects, setTotalProjects] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const search = useDebounce(searchInput, 400);

  useEffect(() => {
    fetch("/api/portfolio/categories")
      .then((r) => r.json())
      .then((d) => {
        const cats = d.categories ?? [];
        setCategories(cats);
        setTotalImages(cats.reduce((sum: number, c: Category) => sum + c.count, 0));
      });
    fetch("/api/portfolio/projects?category=all&page=1")
      .then((r) => r.json())
      .then((d) => setTotalProjects(d.total ?? 0));
  }, []);

  const fetchProjects = useCallback(
    async (cat: string, q: string, pg: number, append = false) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          category: cat,
          page: String(pg),
          ...(q ? { search: q } : {}),
        });
        const res = await fetch(`/api/portfolio/projects?${params}`);
        const data = await res.json();
        setProjects((prev) => (append ? [...prev, ...data.projects] : data.projects ?? []));
        setTotalPages(data.totalPages ?? 1);
        setTotal(data.total ?? 0);
        setPage(data.page ?? 1);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    setProjects([]);
    fetchProjects(activeCategory, search, 1, false);
  }, [activeCategory, search, fetchProjects]);

  const loadMore = () => {
    if (!loading && page < totalPages) {
      fetchProjects(activeCategory, search, page + 1, true);
    }
  };

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Floating Header Bar */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-foreground/10 h-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-warm-gray hover:text-primary transition-colors text-xs font-mono uppercase tracking-wider shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali Ke Beranda</span>
            <span className="sm:hidden">Kembali</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-serif text-base text-primary font-medium">FULLHOME ID</span>
            <span className="text-foreground/30 text-sm">·</span>
            <span className="font-sans text-xs text-warm-gray">Portofolio Projek</span>
          </div>

          <a
            href="https://wa.me/6281237533193?text=Halo%20FULLHOME%20ID%2C%20Saya%20tertarik%20dengan%20portofolio%20yang%20saya%20lihat.%20Boleh%20konsultasi%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-secondary transition-colors shrink-0 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Konsultasi Gratis</span>
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        {/* Page Hero */}
        <div className="py-12 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-widest uppercase text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 mb-4"
          >
            <span>DOKUMENTASI NYATA • 100% ASLI</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-serif text-4xl md:text-6xl text-primary font-medium leading-[1.1] mb-4 tracking-tight"
          >
            Portofolio Proyek Studio
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="font-sans text-warm-gray max-w-lg mx-auto text-xs md:text-sm leading-relaxed"
          >
            Ratusan hasil dokumentasi pengerjaan interior kustom asli dari klien FULLHOME ID di Jabodetabek, Jawa & Bali.
          </motion.p>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-10 mt-8"
          >
            {[
              { value: totalProjects > 0 ? `${totalProjects}+` : "…", label: "Proyek" },
              { value: totalImages > 0 ? `${totalImages.toLocaleString("id")}+` : "…", label: "Foto Dokumentasi" },
              { value: categories.length > 0 ? String(categories.length) : "…", label: "Kategori" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl md:text-3xl font-medium text-primary">{s.value}</div>
                <div className="font-mono text-[10px] text-warm-gray mt-0.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray pointer-events-none" />
            {loading && searchInput && (
              <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary animate-spin" />
            )}
            <input
              id="portfolio-search"
              type="search"
              autoComplete="off"
              placeholder="Cari nama klien atau lokasi..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 bg-background border border-foreground/15 rounded-full text-xs font-sans text-primary placeholder:text-warm-gray/60 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition-all shadow-xs"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {search && !loading && (
            <p className="text-center font-sans text-xs text-warm-gray mt-2">
              {total} proyek ditemukan untuk &ldquo;{search}&rdquo;
            </p>
          )}
        </div>

        <div className="flex gap-8 pb-24">
          {/* Sidebar categories */}
          <aside className="hidden sm:block w-52 flex-shrink-0">
            <div className="sticky top-20 space-y-1 p-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-warm-gray px-3 py-2 border-b border-foreground/10 mb-1">
                KATEGORI PROYEK
              </p>
              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                  activeCategory === "all"
                    ? "bg-primary text-white font-semibold shadow-xs"
                    : "text-warm-gray hover:bg-black/5 hover:text-primary"
                }`}
              >
                <span>Semua</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md tabular-nums ${
                  activeCategory === "all" ? "bg-white/20 text-white" : "bg-black/5 text-warm-gray"
                }`}>
                  {activeCategory === "all" && total > 0 ? total : "—"}
                </span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                    activeCategory === cat.id
                      ? "bg-primary text-white font-semibold shadow-xs"
                      : "text-warm-gray hover:bg-black/5 hover:text-primary"
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md tabular-nums ${
                    activeCategory === cat.id ? "bg-white/20 text-white" : "bg-black/5 text-warm-gray"
                  }`}>
                    {cat.count.toLocaleString("id")}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 min-w-0">
            {/* Mobile category pills */}
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  activeCategory === "all" ? "bg-primary text-white" : "bg-background border border-foreground/15 text-warm-gray"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                    activeCategory === cat.id ? "bg-primary text-white" : "bg-background border border-foreground/15 text-warm-gray"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            {!loading && total > 0 && (
              <p className="font-sans text-xs text-warm-gray mb-5">
                Menampilkan {projects.length} dari {total} proyek
                {activeCategory !== "all" && ` · ${categories.find((c) => c.id === activeCategory)?.label}`}
              </p>
            )}

            {/* Project Cards Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {projects.map((proj, i) => (
                  <ProjectCard
                    key={proj.id}
                    project={proj}
                    index={i}
                    onClick={() => setSelectedProject(proj)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Skeleton loading */}
            {loading && projects.length === 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="p-2 rounded-3xl bg-black/5 animate-pulse border border-foreground/10">
                    <div className="aspect-[4/3] bg-muted rounded-2xl" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-foreground/10 rounded w-3/4" />
                      <div className="h-3 bg-foreground/5 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Loading more */}
            {loading && projects.length > 0 && (
              <div className="flex justify-center py-10">
                <Loader2 className="w-6 h-6 text-secondary animate-spin" />
              </div>
            )}

            {/* Empty state */}
            {!loading && projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-14 h-14 rounded-full bg-black/5 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-warm-gray" />
                </div>
                <p className="font-sans text-warm-gray text-sm">Tidak ada proyek ditemukan</p>
                {(searchInput || activeCategory !== "all") && (
                  <button
                    onClick={() => {
                      setSearchInput("");
                      setActiveCategory("all");
                    }}
                    className="mt-3 font-sans text-xs text-secondary hover:underline"
                  >
                    Reset filter pencarian
                  </button>
                )}
              </div>
            )}

            {/* Load more button */}
            {!loading && page < totalPages && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  className="group inline-flex items-center gap-2 bg-primary text-white rounded-full px-8 py-3.5 font-sans text-xs font-mono uppercase tracking-wider hover:bg-secondary transition-all shadow-md"
                >
                  <span>Muat Lebih Banyak Proyek</span>
                  <span className="opacity-60 text-[11px]">
                    ({Math.min((totalPages - page) * 20, total - projects.length)} lagi)
                  </span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Project Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
