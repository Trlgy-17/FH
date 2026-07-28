import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  VALID_CAT_NAMES,
  getValidatedProjectInfo,
  normalizeCat,
  slugify,
  cleanProjectName,
} from "../categories/route";

const LOCAL_KONTEN = path.join(process.cwd(), "Portofolio", "FULLHOME");
const EXTERNAL_KONTEN = "F:\\KONTEN";
const PAGE_SIZE = 20;

export interface ProjectImageItem {
  id: string;
  src: string;
  filename: string;
}

export interface Project {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  coverSrc: string;
  images: ProjectImageItem[];
  imageCount: number;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: "fallback-kitchen-set-minimalis",
    name: "Kitchen Set – Minimalis Warm Oak",
    category: "kitchen-set",
    categoryLabel: "Kitchen Set",
    coverSrc: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    images: [
      { id: "f-k-1", src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop", filename: "Kitchen 1" },
      { id: "f-k-2", src: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop", filename: "Kitchen 2" },
      { id: "f-k-3", src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop", filename: "Kitchen 3" },
    ],
    imageCount: 18,
  },
  {
    id: "fallback-wardrobe-semiklasik",
    name: "Wardrobe – Semiklasik Glass Door",
    category: "wardrobe",
    categoryLabel: "Wardrobe",
    coverSrc: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    images: [
      { id: "f-w-1", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop", filename: "Wardrobe 1" },
      { id: "f-w-2", src: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop", filename: "Wardrobe 2" },
      { id: "f-w-3", src: "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1200&auto=format&fit=crop", filename: "Wardrobe 3" },
    ],
    imageCount: 16,
  },
  {
    id: "fallback-bedroom-japandi",
    name: "Bedroom – Japandi Master Suite",
    category: "bedroom",
    categoryLabel: "Bedroom",
    coverSrc: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuUZ0bmxxiKWnvhYX_tS2-PYwkCwP-WI27kxrSUc7UgS98BCPhSQ1r6_TfriXhywdUY00RLLH8sh1-j0oIKkGikXWaqDlrFZ5rPtn5gEs3rNMzVDLoHO4BWTs6geyEy3jRrUsIzLxJ8Ih9khdLt9rgbry3GrxtJ0RumFoZl5Vnrsex_dzqZvGyVDIgBYwtDwISm7Qqvij9_napRrnbmu4QnItrevUd9HQiYDPcwGV0T5Mmk6NhsbgY1QvYsul_lijpMloDVwxeGBGT",
    images: [
      { id: "f-b-1", src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCuUZ0bmxxiKWnvhYX_tS2-PYwkCwP-WI27kxrSUc7UgS98BCPhSQ1r6_TfriXhywdUY00RLLH8sh1-j0oIKkGikXWaqDlrFZ5rPtn5gEs3rNMzVDLoHO4BWTs6geyEy3jRrUsIzLxJ8Ih9khdLt9rgbry3GrxtJ0RumFoZl5Vnrsex_dzqZvGyVDIgBYwtDwISm7Qqvij9_napRrnbmu4QnItrevUd9HQiYDPcwGV0T5Mmk6NhsbgY1QvYsul_lijpMloDVwxeGBGT", filename: "Bedroom 1" },
    ],
    imageCount: 14,
  },
];

function collectProjectImages(dir: string, max: number = 10): ProjectImageItem[] {
  const list: string[] = [];
  function recurse(d: string) {
    try {
      const items = fs.readdirSync(d);
      for (const item of items) {
        const full = path.join(d, item);
        try {
          if (fs.statSync(full).isDirectory()) recurse(full);
          else if (/\.(jpg|jpeg|png|webp|heic)$/i.test(item)) list.push(full);
        } catch {}
      }
    } catch {}
  }
  recurse(dir);
  list.sort();
  return list.slice(0, max).map((fp) => {
    const encoded = Buffer.from(fp).toString("base64url");
    return {
      id: encoded,
      src: `/api/portfolio/image?p=${encoded}`,
      filename: path.basename(fp),
    };
  });
}

function countImages(dir: string): number {
  let n = 0;
  try {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      try {
        if (fs.statSync(full).isDirectory()) n += countImages(full);
        else if (/\.(jpg|jpeg|png|webp|heic)$/i.test(item)) n++;
      } catch {}
    }
  } catch {}
  return n;
}

function scanRootProjects(rootDir: string, projects: Project[], categoryFilter: string, searchQuery: string) {
  try {
    if (!fs.existsSync(rootDir)) return;

    const entries = fs.readdirSync(rootDir).filter((d) => {
      try { return fs.statSync(path.join(rootDir, d)).isDirectory(); } catch { return false; }
    });

    const isDirectCategoryRoot = entries.some((e) => VALID_CAT_NAMES.has(e));
    const yearFolders = isDirectCategoryRoot ? ["."] : entries;

    for (const yr of yearFolders) {
      const yearPath = yr === "." ? rootDir : path.join(rootDir, yr);
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

          const projImages = collectProjectImages(catPath, 10);
          if (projImages.length === 0) continue;

          const label = normalizeCat(cat);
          const slug  = slugify(label);
          const projName = label;

          if (categoryFilter !== "all" && slug !== categoryFilter) continue;
          if (searchQuery && !projName.toLowerCase().includes(searchQuery) && !label.toLowerCase().includes(searchQuery)) continue;

          const projId = Buffer.from(catPath).toString("base64url");
          projects.push({
            id: projId,
            name: projName,
            category: slug,
            categoryLabel: label,
            coverSrc: projImages[0].src,
            images: projImages,
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

            if (clientDirs.length === 0) {
              const imgCount = countImages(stylePath);
              if (imgCount === 0) continue;

              const projImages = collectProjectImages(stylePath, 10);
              if (projImages.length === 0) continue;

              const relPath = path.join(yr, cat, style);
              const validated = getValidatedProjectInfo(cat, style, relPath);

              if (categoryFilter !== "all" && validated.categorySlug !== categoryFilter) continue;
              if (
                searchQuery &&
                !validated.projectName.toLowerCase().includes(searchQuery) &&
                !validated.categoryLabel.toLowerCase().includes(searchQuery)
              ) continue;

              const projId = Buffer.from(stylePath).toString("base64url");
              projects.push({
                id: projId,
                name: validated.projectName,
                category: validated.categorySlug,
                categoryLabel: validated.categoryLabel,
                coverSrc: projImages[0].src,
                images: projImages,
                imageCount: imgCount,
              });
            } else {
              for (const client of clientDirs) {
                const projPath = path.join(stylePath, client);
                const imgCount = countImages(projPath);
                if (imgCount === 0) continue;

                const projImages = collectProjectImages(projPath, 10);
                if (projImages.length === 0) continue;

                const relPath = path.join(yr, cat, style, client);
                const validated = getValidatedProjectInfo(cat, client, relPath);

                if (categoryFilter !== "all" && validated.categorySlug !== categoryFilter) continue;
                if (
                  searchQuery &&
                  !validated.projectName.toLowerCase().includes(searchQuery) &&
                  !validated.categoryLabel.toLowerCase().includes(searchQuery) &&
                  !client.toLowerCase().includes(searchQuery)
                ) continue;

                const projId = Buffer.from(projPath).toString("base64url");
                projects.push({
                  id: projId,
                  name: validated.projectName,
                  category: validated.categorySlug,
                  categoryLabel: validated.categoryLabel,
                  coverSrc: projImages[0].src,
                  images: projImages,
                  imageCount: imgCount,
                });
              }
            }
          }
          continue;
        }

        for (const subDir of subDirs) {
          const projPath = path.join(catPath, subDir);
          const imgCount = countImages(projPath);
          if (imgCount === 0) continue;

          const projImages = collectProjectImages(projPath, 10);
          if (projImages.length === 0) continue;

          const relPath = path.join(yr, cat, subDir);
          const validated = getValidatedProjectInfo(cat, subDir, relPath);

          if (categoryFilter !== "all" && validated.categorySlug !== categoryFilter) continue;

          if (
            searchQuery &&
            !validated.projectName.toLowerCase().includes(searchQuery) &&
            !validated.categoryLabel.toLowerCase().includes(searchQuery) &&
            !subDir.toLowerCase().includes(searchQuery)
          ) continue;

          const projId = Buffer.from(projPath).toString("base64url");
          projects.push({
            id: projId,
            name: validated.projectName,
            category: validated.categorySlug,
            categoryLabel: validated.categoryLabel,
            coverSrc: projImages[0].src,
            images: projImages,
            imageCount: imgCount,
          });
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning root projects in ${rootDir}:`, err);
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "all";
  const search   = (searchParams.get("search") ?? "").toLowerCase().trim();
  const page     = parseInt(searchParams.get("page") ?? "1", 10);

  try {
    const projects: Project[] = [];

    // Scan primary local workspace Portofolio/FULLHOME
    scanRootProjects(LOCAL_KONTEN, projects, category, search);

    // Scan external F:\KONTEN drive if present
    scanRootProjects(EXTERNAL_KONTEN, projects, category, search);

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

    // Sort projects by photo count descending
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
