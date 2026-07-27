"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, MessageCircle, MapPin } from "lucide-react";

export interface Project {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  coverSrc: string;
  imageCount: number;
}

export interface ProjectImage {
  id: string;
  src: string;
  filename: string;
}

// ─── Lightbox Component ───────────────────────────────────────────────────────
export function Lightbox({
  images,
  index,
  projectName,
  onClose,
  onPrev,
  onNext,
}: {
  images: ProjectImage[];
  index: number;
  projectName: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose, onPrev, onNext]);

  const img = images[index];
  if (!img) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/97"
      onClick={onClose}
    >
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-black/80 to-transparent z-10">
        <p className="font-sans text-sm text-white/80 font-medium truncate max-w-xs">{projectName}</p>
        <span className="font-sans text-xs text-white/55 mx-4 shrink-0">
          {index + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Prev button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Sebelumnya"
        className="absolute left-3 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Image */}
      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.18 }}
        className="max-h-[90vh] max-w-[90vw] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.filename}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-md"
        />
      </motion.div>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Berikutnya"
        className="absolute right-3 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </motion.div>
  );
}

// ─── Modal Grid Item ──────────────────────────────────────────────────────────
export function ModalGridItem({
  img,
  index,
  onClick,
}: {
  img: ProjectImage;
  index: number;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.02, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-light-taupe/15 cursor-pointer border border-light-taupe/30 hover:border-secondary/50 transition-all duration-300 shadow-xs hover:shadow-md"
      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-light-taupe/25 to-light-taupe/10 animate-pulse" />
      )}
      <img
        src={img.src}
        alt={img.filename}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      />
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/25 transition-all duration-300 flex items-center justify-center">
        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 drop-shadow-md" />
      </div>
    </motion.div>
  );
}

// ─── Project Modal Component ──────────────────────────────────────────────────
export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/portfolio/project-images?id=${project.id}`)
      .then((r) => r.json())
      .then((d) => setImages(d.images ?? []))
      .finally(() => setLoading(false));
  }, [project.id]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closeLightbox = () => setLightboxIndex(null);
  const prevLb = () => setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const nextLb = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  // Parse client + location from project name
  const parts = project.name.split(" - ");
  const clientName = parts[0];
  const location = parts.slice(1).join(" - ");

  return (
    <>
      {/* Dimmed backdrop with smooth blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Popup Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 28 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-2 bottom-0 top-12 sm:inset-4 md:inset-8 z-[201] bg-background rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-light-taupe/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-8 py-5 border-b border-light-taupe/30 shrink-0 bg-background/90 backdrop-blur-sm">
          <div>
            <span className="inline-block font-sans text-[11px] font-semibold uppercase tracking-widest text-secondary mb-1">
              {project.categoryLabel}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-primary leading-snug">{clientName}</h2>
            {location && (
              <p className="flex items-center gap-1.5 font-sans text-sm text-warm-gray mt-1">
                <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                {location}
              </p>
            )}
            <p className="font-sans text-xs text-warm-gray/60 mt-2">
              {loading ? "Memuat foto..." : `${images.length} foto dokumentasi`}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/6281237533193?text=Halo%20FULLHOME%20ID%2C%20Saya%20tertarik%20dengan%20project%20${encodeURIComponent(
                project.name
              )}%20(${encodeURIComponent(project.categoryLabel)}).%20Boleh%20konsultasi%3F`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-full text-sm font-sans font-semibold hover:bg-secondary/80 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi
            </a>
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="p-2.5 rounded-full bg-light-taupe/20 hover:bg-light-taupe/40 text-warm-gray hover:text-primary transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Photo Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] rounded-xl bg-light-taupe/20 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img, i) => (
                <ModalGridItem key={img.id} img={img} index={i} onClick={() => setLightboxIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox inside modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            index={lightboxIndex}
            projectName={project.name}
            onClose={closeLightbox}
            onPrev={prevLb}
            onNext={nextLb}
          />
        )}
      </AnimatePresence>
    </>
  );
}
