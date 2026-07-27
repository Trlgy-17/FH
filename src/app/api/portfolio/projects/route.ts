import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import {
  CATEGORY_MAP,
  VALID_CAT_NAMES,
  STYLE_CATEGORIES,
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

/** Convert raw folder name to clean display name */
function formatProjectName(raw: string): string {
  const cleaned = raw.replace(/^\d+[\.\s]+/, "").trim();
  return cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")
    .replace(/\bJakpus\b/gi, "Jakarta Pusat")
    .replace(/\bJaksel\b/gi, "Jakarta Selatan")
    .replace(/\bJakbar\b/gi, "Jakarta Barat")
    .replace(/\bJakut\b/gi, "Jakarta Utara")
    .replace(/\bJaktim\b/gi, "Jakarta Timur")
    .replace(/\bTangsel\b/gi, "Tangerang Selatan")
    .replace(/\bTanggerang\b/gi, "Tangerang")
    .replace(/\bBojonsoang\b/gi, "Bojongsoang");
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
        // ✅ WHITELIST CHECK — only process known category folders
        if (!VALID_CAT_NAMES.has(cat)) continue;

        const catLabel = normalizeCat(cat);
        const catSlug  = slugify(catLabel);

        if (category !== "all" && catSlug !== category) continue;

        const catPath = path.join(yearPath, cat);

        // ── Special handling: "Before after" has images directly (no subfolders)
        //    Treat the whole folder as ONE project
        const subDirs = fs.readdirSync(catPath).filter((d) => {
          try { return fs.statSync(path.join(catPath, d)).isDirectory(); } catch { return false; }
        });

        if (subDirs.length === 0) {
          // No subfolders → all images are directly in the category folder
          const imgCount = countImages(catPath);
          if (imgCount === 0) continue;

          const firstImg = findFirstImage(catPath);
          if (!firstImg) continue;

          const projName = catLabel; // Use category name as project name
          if (search && !projName.toLowerCase().includes(search) && !catLabel.toLowerCase().includes(search)) continue;

          const projId  = Buffer.from(catPath).toString("base64url");
          const coverId = Buffer.from(firstImg).toString("base64url");
          projects.push({
            id: projId,
            name: projName,
            category: catSlug,
            categoryLabel: catLabel,
            coverSrc: `/api/portfolio/image?p=${coverId}`,
            imageCount: imgCount,
          });
          continue;
        }

        // ── KITCHENSET (and similar) have STYLE subfolders, not client subfolders.
        //    Merge all style subfolders into ONE project per style.
        if (STYLE_CATEGORIES.has(cat)) {
          for (const style of subDirs) {
            const stylePath = path.join(catPath, style);
            const imgCount  = countImages(stylePath);
            if (imgCount === 0) continue;

            const firstImg = findFirstImage(stylePath);
            if (!firstImg) continue;

            // Format style name (MINIMALIS → Minimalis)
            const styleName = style.charAt(0).toUpperCase() + style.slice(1).toLowerCase();
            const projName  = `${catLabel} – ${styleName}`;

            if (search && !projName.toLowerCase().includes(search) && !catLabel.toLowerCase().includes(search) && !style.toLowerCase().includes(search)) continue;

            const projId  = Buffer.from(stylePath).toString("base64url");
            const coverId = Buffer.from(firstImg).toString("base64url");
            projects.push({
              id: projId,
              name: projName,
              category: catSlug,
              categoryLabel: catLabel,
              coverSrc: `/api/portfolio/image?p=${coverId}`,
              imageCount: imgCount,
            });
          }
          continue;
        }

        // ── Standard case: each subfolder is a client/project folder
        for (const proj of subDirs) {
          const projName = formatProjectName(proj);
          const projPath = path.join(catPath, proj);

          if (
            search &&
            !projName.toLowerCase().includes(search) &&
            !catLabel.toLowerCase().includes(search) &&
            !proj.toLowerCase().includes(search)
          ) continue;

          const imgCount = countImages(projPath);
          if (imgCount === 0) continue;

          const firstImg = findFirstImage(projPath);
          if (!firstImg) continue;

          const projId  = Buffer.from(projPath).toString("base64url");
          const coverId = Buffer.from(firstImg).toString("base64url");
          projects.push({
            id: projId,
            name: projName,
            category: catSlug,
            categoryLabel: catLabel,
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
