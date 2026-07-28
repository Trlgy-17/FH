import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  VALID_CAT_NAMES,
  getValidatedProjectInfo,
  normalizeCat,
  slugify,
} from "../categories/route";

const KONTEN_ROOT = "F:\\KONTEN";
const PAGE_SIZE = 20;

export interface Project {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  coverSrc: string;
  imageCount: number;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-kitchen-set-minimalis",
    name: "Kitchen Set – Minimalis Warm Oak",
    category: "kitchen-set",
    categoryLabel: "Kitchen Set",
    coverSrc: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    imageCount: 18,
  },
  {
    id: "fallback-wardrobe-semiklasik",
    name: "Wardrobe – Semiklasik Glass Door",
    category: "wardrobe",
    categoryLabel: "Wardrobe",
    coverSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    imageCount: 16,
  },
  {
    id: "fallback-bedroom-japandi",
    name: "Bedroom – Japandi Master Suite",
    category: "bedroom",
    categoryLabel: "Bedroom",
    coverSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuUZ0bmxxiKWnvhYX_tS2-PYwkCwP-WI27kxrSUc7UgS98BCPhSQ1r6_TfriXhywdUY00RLLH8sh1-j0oIKkGikXWaqDlrFZ5rPtn5gEs3rNMzVDLoHO4BWTs6geyEy3jRrUsIzLxJ8Ih9khdLt9rgbry3GrxtJ0RumFoZl5Vnrsex_dzqZvGyVDIgBYwtDwISm7Qqvij9_napRrnbmu4QnItrevUd9HQiYDPcwGV0T5Mmk6NhsbgY1QvYsul_lijpMloDVwxeGBGT",
    imageCount: 14,
  },
  {
    id: "fallback-living-room-warm",
    name: "Living Room – Warm Luxury Lounge",
    category: "living-room",
    categoryLabel: "Living Room",
    coverSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnf7IHhlnFt4MEJ4OmsbMm7TPs4KNZ42RdsDmkqPAFMYMUY-skbw070g2Gkxd7at73Ezs-E1tw1IQfQVsBqLGbPK2BdyDIhlAQ58-wXYfxSuFtEgXqGC_ZYvLJVS-vEE3TjaKjgCd05I2ZOYfWQELfMuEoPP_QnUAzDDGYjoW-8otjTufT5JZkRW1y-6gxu-kbgl4meu11BVviBlvmOCo7O_F_em2OJpuIA2bWxZVnptdgkiDt-MfVeOz1EKcy0u57PcFo3BTGoEbc",
    imageCount: 22,
  },
  {
    id: "fallback-semi-full-home-villa",
    name: "Semi & Full Home – Villa Dago Luxury",
    category: "semi-full-home",
    categoryLabel: "Semi & Full Home",
    coverSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    imageCount: 32,
  },
  {
    id: "fallback-apartemen-penthouse",
    name: "Apartemen – Penthouse SCBD",
    category: "apartemen",
    categoryLabel: "Apartemen",
    coverSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    imageCount: 15,
  },
];

/** Find first image recursively, returns null if none */
function findFirstImage(dir: string): string | null {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      try {
        if (!fs.statSync(full).isDirectory() && /\.(jpg|jpeg|png|webp)$/i.test(item)) {
          return full;
        }
      } catch {}
    }
    for (const item of items) {
      const full = path.join(dir, item);
      try {
        if (fs.statSync(full).isDirectory()) {
          const found = findFirstImage(full);
          if (found) return found;
        }
      } catch {}
    }
  } catch {}
  return null;
}

/** Count images recursively */
function countImages(dir: string): number {
  let n = 0;
  try {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      try {
        if (fs.statSync(full).isDirectory()) n += countImages(full);
        else if (/\.(jpg|jpeg|png|webp)$/i.test(item)) n++;
      } catch {}
    }
  } catch {}
  return n;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "all";
  const search   = (searchParams.get("search") ?? "").toLowerCase().trim();
  const page     = parseInt(searchParams.get("page") ?? "1", 10);

  try {
    if (!fs.existsSync(KONTEN_ROOT)) {
      // Filter fallback projects
      let filtered = FALLBACK_PROJECTS;
      if (category !== "all") {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (search) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(search) ||
            p.categoryLabel.toLowerCase().includes(search)
        );
      }
      const total = filtered.length;
      const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
      const offset = (Math.max(page, 1) - 1) * PAGE_SIZE;
      const items = filtered.slice(offset, offset + PAGE_SIZE);

      return NextResponse.json({ projects: items, total, totalPages, page });
    }

    const yearFolders = fs.readdirSync(KONTEN_ROOT).filter((d) => {
      try { return fs.statSync(path.join(KONTEN_ROOT, d)).isDirectory(); } catch { return false; }
    });

    const projects: Project[] = [];

    for (const yr of yearFolders) {
      const yearPath = path.join(KONTEN_ROOT, yr);
      const catFolders = fs.readdirSync(yearPath).filter((d) => {
        try { return fs.statSync(path.join(yearPath, d)).isDirectory(); } catch { return false; }
      });

      for (const cat of catFolders) {
        if (!VALID_CAT_NAMES.has(cat)) continue;

        const catPath = path.join(yearPath, cat);

        const subDirs = fs.readdirSync(catPath).filter((d) => {
          try { return fs.statSync(path.join(catPath, d)).isDirectory(); } catch { return false; }
        });

        if (subDirs.length === 0) {
          const imgCount = countImages(catPath);
          if (imgCount === 0) continue;

          const firstImg = findFirstImage(catPath);
          if (!firstImg) continue;

          const label = normalizeCat(cat);
          const slug  = slugify(label);
          const projName = label;

          if (category !== "all" && slug !== category) continue;
          if (search && !projName.toLowerCase().includes(search) && !label.toLowerCase().includes(search)) continue;

          const projId  = Buffer.from(catPath).toString("base64url");
          const coverId = Buffer.from(firstImg).toString("base64url");
          projects.push({
            id: projId,
            name: projName,
            category: slug,
            categoryLabel: label,
            coverSrc: `/api/portfolio/image?p=${coverId}`,
            imageCount: imgCount,
          });
          continue;
        }

        if (cat === "KITCHENSET") {
          for (const style of subDirs) {
            const stylePath = path.join(catPath, style);
            const clientDirs = fs.readdirSync(stylePath).filter((d) => {
              try { return fs.statSync(path.join(stylePath, d)).isDirectory(); } catch { return false; }
            });

            for (const client of clientDirs) {
              const projPath = path.join(stylePath, client);
              const imgCount = countImages(projPath);
              if (imgCount === 0) continue;

              const firstImg = findFirstImage(projPath);
              if (!firstImg) continue;

              const relPath = path.join(yr, cat, style, client);
              const validated = getValidatedProjectInfo(cat, client, relPath);

              if (category !== "all" && validated.categorySlug !== category) continue;

              if (
                search &&
                !validated.projectName.toLowerCase().includes(search) &&
                !validated.categoryLabel.toLowerCase().includes(search) &&
                !client.toLowerCase().includes(search)
              ) continue;

              const projId  = Buffer.from(projPath).toString("base64url");
              const coverId = Buffer.from(firstImg).toString("base64url");
              projects.push({
                id: projId,
                name: validated.projectName,
                category: validated.categorySlug,
                categoryLabel: validated.categoryLabel,
                coverSrc: `/api/portfolio/image?p=${coverId}`,
                imageCount: imgCount,
              });
            }
          }
          continue;
        }

        for (const subDir of subDirs) {
          const projPath = path.join(catPath, subDir);
          const imgCount = countImages(projPath);
          if (imgCount === 0) continue;

          const firstImg = findFirstImage(projPath);
          if (!firstImg) continue;

          const relPath = path.join(yr, cat, subDir);
          const validated = getValidatedProjectInfo(cat, subDir, relPath);

          if (category !== "all" && validated.categorySlug !== category) continue;

          if (
            search &&
            !validated.projectName.toLowerCase().includes(search) &&
            !validated.categoryLabel.toLowerCase().includes(search) &&
            !subDir.toLowerCase().includes(search)
          ) continue;

          const projId  = Buffer.from(projPath).toString("base64url");
          const coverId = Buffer.from(firstImg).toString("base64url");
          projects.push({
            id: projId,
            name: validated.projectName,
            category: validated.categorySlug,
            categoryLabel: validated.categoryLabel,
            coverSrc: `/api/portfolio/image?p=${coverId}`,
            imageCount: imgCount,
          });
        }
      }
    }

    if (projects.length === 0) {
      let filtered = FALLBACK_PROJECTS;
      if (category !== "all") {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (search) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(search) ||
            p.categoryLabel.toLowerCase().includes(search)
        );
      }
      const total = filtered.length;
      const totalPages = Math.ceil(total / PAGE_SIZE) || 1;
      const offset = (Math.max(page, 1) - 1) * PAGE_SIZE;
      const items = filtered.slice(offset, offset + PAGE_SIZE);

      return NextResponse.json({ projects: items, total, totalPages, page });
    }

    projects.sort((a, b) => b.imageCount - a.imageCount);

    const total      = projects.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const offset     = (Math.max(page, 1) - 1) * PAGE_SIZE;
    const items      = projects.slice(offset, offset + PAGE_SIZE);

    return NextResponse.json({ projects: items, total, totalPages, page });
  } catch (err) {
    console.error("Portfolio projects error:", err);
    return NextResponse.json({ projects: FALLBACK_PROJECTS, total: FALLBACK_PROJECTS.length, totalPages: 1, page: 1 });
  }
}
