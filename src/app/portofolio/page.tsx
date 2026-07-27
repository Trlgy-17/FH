"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowLeft,
  ZoomIn,
  MessageCircle,
  Images,
  Loader2,
  MapPin,
} from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";
import { ProjectModal, type Project } from "@/components/shared/project-modal";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
  count: number;
}


// ─── Project Card ─────────────────────────────────────────────────────────────

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
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.5) }}
      className="group cursor-pointer bg-soft-white rounded-2xl overflow-hidden border border-light-taupe/30 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-light-taupe/10">
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-light-taupe/20 to-light-taupe/10 animate-pulse" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.coverSrc}
          alt={`${project.categoryLabel} – ${project.name}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-white bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
            {project.categoryLabel}
          </span>
        </div>
        {/* Photo count badge */}
        <div className="absolute top-3 right-3">
          <span className="flex items-center gap-1 font-sans text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <Images className="w-3 h-3" />
            {project.imageCount}
          </span>
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-sans text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 shadow-md">
            Lihat {project.imageCount} Foto
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-sans text-sm font-semibold text-primary truncate leading-snug">
          {clientName}
        </h3>
        {location && (
          <p className="flex items-center gap-1 font-sans text-xs text-warm-gray mt-1 truncate">
            <MapPin className="w-3 h-3 text-secondary shrink-0" />
            {location}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalImages, setTotalImages] = useState(0); // sum of all images across all categories
  const [totalProjects, setTotalProjects] = useState(0); // all projects regardless of filter
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const search = useDebounce(searchInput, 400);

  // Fetch categories + compute total image count
  useEffect(() => {
    fetch("/api/portfolio/categories")
      .then((r) => r.json())
      .then((d) => {
        const cats = d.categories ?? [];
        setCategories(cats);
        setTotalImages(cats.reduce((sum: number, c: Category) => sum + c.count, 0));
      });
    // Also fetch total project count (no filter)
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

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-light-taupe/30 h-14">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 h-full flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-warm-gray hover:text-primary transition-colors text-sm font-medium shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
            <span className="sm:hidden">Kembali</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-serif text-base text-primary">FULLHOME ID</span>
            <span className="text-light-taupe/60 text-sm">·</span>
            <span className="font-sans text-sm text-warm-gray">Portofolio</span>
          </div>

          <a
            href="https://wa.me/6281237533193?text=Halo%20FULLHOME%20ID%2C%20Saya%20tertarik%20dengan%20portofolio%20yang%20saya%20lihat.%20Boleh%20konsultasi%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-secondary/80 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline">Konsultasi Gratis</span>
          </a>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

        {/* ── Hero ── */}
        <div className="py-10 md:py-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-sans text-xs font-semibold tracking-[0.2em] text-secondary uppercase mb-3"
          >
            Dokumentasi Nyata · 100% Asli
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="font-serif text-4xl md:text-5xl text-primary leading-tight mb-4"
          >
            Portofolio Proyek
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="font-sans text-warm-gray max-w-md mx-auto text-sm md:text-base"
          >
            Ratusan proyek interior nyata dari klien FULLHOME ID — klik proyek untuk lihat semua foto dokumentasinya.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-10 mt-8"
          >
            {[
              { value: totalProjects > 0 ? `${totalProjects}+` : "…", label: "Proyek" },
              { value: totalImages > 0 ? `${totalImages.toLocaleString("id")}+` : "…", label: "Foto" },
              { value: categories.length > 0 ? String(categories.length) : "…", label: "Kategori" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-serif text-2xl md:text-3xl text-primary">{s.value}</div>
                <div className="font-sans text-xs text-warm-gray mt-0.5 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Search ── */}
        <div className="mb-6 max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-gray/50 pointer-events-none" />
            {loading && searchInput && (
              <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary animate-spin" />
            )}
            <input
              id="portfolio-search"
              type="search"
              autoComplete="off"
              placeholder="Cari nama klien atau lokasi…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-soft-white border border-light-taupe/50 rounded-full text-sm font-sans text-primary placeholder:text-warm-gray/40 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary/60 transition-all shadow-sm"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-warm-gray/50 hover:text-warm-gray transition-colors"
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

        <div className="flex gap-6 lg:gap-8 pb-20">

          {/* ── Sidebar categories ── */}
          <aside className="hidden sm:block w-48 lg:w-52 flex-shrink-0">
            <div className="sticky top-20 space-y-0.5">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-warm-gray/50 px-3 pb-2 mb-1 border-b border-light-taupe/20">
                Kategori
              </p>
              <button
                onClick={() => handleCategoryChange("all")}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between gap-2 ${
                  activeCategory === "all"
                    ? "bg-primary text-white font-semibold"
                    : "text-warm-gray hover:bg-light-taupe/20 hover:text-primary"
                }`}
              >
                <span>Semua</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-md tabular-nums flex-shrink-0 ${
                  activeCategory === "all" ? "bg-white/20 text-white" : "bg-light-taupe/30 text-warm-gray"
                }`}>
                  {activeCategory === "all" && total > 0 ? total : "—"}
                </span>
              </button>

              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between gap-2 ${
                    activeCategory === cat.id
                      ? "bg-primary text-white font-semibold"
                      : "text-warm-gray hover:bg-light-taupe/20 hover:text-primary"
                  }`}
                >
                  <span className="truncate">{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md tabular-nums flex-shrink-0 ${
                    activeCategory === cat.id ? "bg-white/20 text-white" : "bg-light-taupe/30 text-warm-gray"
                  }`}>
                    {cat.count.toLocaleString("id")}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* ── Main Grid ── */}
          <main className="flex-1 min-w-0">

            {/* Mobile category pills */}
            <div className="flex sm:hidden gap-2 overflow-x-auto pb-3 mb-4 -mx-4 px-4">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                  activeCategory === "all" ? "bg-primary text-white" : "bg-soft-white border border-light-taupe/40 text-warm-gray"
                }`}
              >
                Semua
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                    activeCategory === cat.id ? "bg-primary text-white" : "bg-soft-white border border-light-taupe/40 text-warm-gray"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Result count */}
            {!loading && total > 0 && (
              <p className="font-sans text-xs text-warm-gray mb-4">
                Menampilkan {projects.length} dari {total} proyek
                {activeCategory !== "all" && ` · ${categories.find(c => c.id === activeCategory)?.label}`}
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
                  <div key={i} className="rounded-2xl overflow-hidden animate-pulse bg-soft-white border border-light-taupe/20">
                    <div className="aspect-[4/3] bg-light-taupe/20" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-light-taupe/20 rounded w-3/4" />
                      <div className="h-3 bg-light-taupe/15 rounded w-1/2" />
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

            {/* Empty */}
            {!loading && projects.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-14 h-14 rounded-full bg-light-taupe/20 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-warm-gray/30" />
                </div>
                <p className="font-sans text-warm-gray text-sm">Tidak ada proyek ditemukan</p>
                {(searchInput || activeCategory !== "all") && (
                  <button
                    onClick={() => { setSearchInput(""); setActiveCategory("all"); }}
                    className="mt-3 font-sans text-sm text-secondary hover:underline"
                  >
                    Reset filter
                  </button>
                )}
              </div>
            )}

            {/* Load more */}
            {!loading && page < totalPages && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={loadMore}
                  className="px-8 py-3 bg-primary text-soft-white rounded-full font-sans text-sm font-semibold hover:bg-secondary transition-all duration-300 shadow-sm"
                >
                  Muat Lebih Banyak
                  <span className="ml-2 opacity-60 text-xs">
                    ({Math.min((totalPages - page) * 20, total - projects.length)} proyek lagi)
                  </span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── Project Modal ── */}
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
