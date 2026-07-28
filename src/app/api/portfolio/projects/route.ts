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

/** Find first image recursively, returns null if none */
function findFirstImage(dir: string): string | null {
  try {
    const items = fs.readdirSync(dir);
    // Files first (more likely to be images at top level)
    for (const item of items) {
      const full = path.join(dir, item);
      try {
        if (!fs.statSync(full).isDirectory() && /\.(jpg|jpeg|png|webp)$/i.test(item)) {
          return full;
        }
      } catch {}
    }
    // Then recurse into subdirectories
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

export interface Project {
  id: string;
  name: string;
  category: string;
  categoryLabel: string;
  coverSrc: string;
  imageCount: number;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "all";
  const search   = (searchParams.get("search") ?? "").toLowerCase().trim();
  const page     = parseInt(searchParams.get("page") ?? "1", 10);

  try {
    if (!fs.existsSync(KONTEN_ROOT)) {
      return NextResponse.json({ projects: [], total: 0, totalPages: 0, page: 1 });
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
          // Process nested client projects under KITCHENSET styles
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

              // Category filter
              if (category !== "all" && validated.categorySlug !== category) continue;

              // Search filter
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

        // Standard categories
        for (const subDir of subDirs) {
          const projPath = path.join(catPath, subDir);
          const imgCount = countImages(projPath);
          if (imgCount === 0) continue;

          const firstImg = findFirstImage(projPath);
          if (!firstImg) continue;

          const relPath = path.join(yr, cat, subDir);
          const validated = getValidatedProjectInfo(cat, subDir, relPath);

          // Category filter
          if (category !== "all" && validated.categorySlug !== category) continue;

          // Search filter
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

    // Sort: most photos first
    projects.sort((a, b) => b.imageCount - a.imageCount);

    const total      = projects.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const offset     = (Math.max(page, 1) - 1) * PAGE_SIZE;
    const items      = projects.slice(offset, offset + PAGE_SIZE);

    return NextResponse.json({ projects: items, total, totalPages, page });
  } catch (err) {
    console.error("Portfolio projects error:", err);
    return NextResponse.json({ projects: [], total: 0, totalPages: 0, page: 1 }, { status: 500 });
  }
}
