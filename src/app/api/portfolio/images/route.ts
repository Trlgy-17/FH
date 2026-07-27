import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KONTEN_ROOT = "F:\\KONTEN";
const PAGE_SIZE = 24;

const CATEGORY_MAP: Record<string, string> = {
  "BEDROOM": "Bedroom",
  "KITCHENSET": "Kitchen Set",
  "LIVINGROOM": "Living Room",
  "WARDROBE": "Wardrobe",
  "SEMI & FULLHOME": "Semi & Full Home",
  "SEMI - FULLHOME": "Semi & Full Home",
  "WORKING SPACE  INTERIOR KANTOR": "Interior Kantor",
  "INTERIOR KANTOR": "Interior Kantor",
  "INTERIOR TOKO": "Interior Toko",
  "INTERIOR SALON": "Interior Salon",
  "LEMARI BAWAH TANGGA": "Lemari Bawah Tangga",
  "LOUNDRY ROOM": "Laundry Room",
  "APARTEMEN": "Apartemen",
  "Before after": "Before & After",
  "DAILY": "Daily",
  "LIVE STREAMING ROOM": "Live Streaming Room",
};

export interface PortfolioImage {
  id: string;
  src: string;
  category: string;
  categoryLabel: string;
  project: string;
  filename: string;
}

function normalizeCategoryName(raw: string): string {
  return CATEGORY_MAP[raw] ?? raw.replace(/_/g, " ").trim();
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function collectImages(dir: string, results: string[]) {
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) collectImages(full, results);
        else if (/\.(jpg|jpeg|png|webp)$/i.test(item)) results.push(full);
      } catch {}
    }
  } catch {}
}

function extractProjectName(filePath: string): string {
  const rel = filePath.replace(KONTEN_ROOT + "\\", "");
  const parts = rel.split("\\");
  // parts: [year-folder, category, project, ...deeper, filename]
  if (parts.length >= 3) {
    // Clean numbering prefix like "1." or "07." from project name
    return parts[2].replace(/^\d+\./, "").trim();
  }
  return "";
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? "all";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  // Server-side search: filter by project name or category label
  const search = (searchParams.get("search") ?? "").toLowerCase().trim();

  try {
    const yearFolders = fs.readdirSync(KONTEN_ROOT).filter((d) => {
      try {
        return fs.statSync(path.join(KONTEN_ROOT, d)).isDirectory();
      } catch {
        return false;
      }
    });

    const allImages: PortfolioImage[] = [];

    for (const yrFolder of yearFolders) {
      const yearPath = path.join(KONTEN_ROOT, yrFolder);
      const catFolders = fs.readdirSync(yearPath).filter((d) => {
        try {
          return fs.statSync(path.join(yearPath, d)).isDirectory();
        } catch {
          return false;
        }
      });

      for (const cat of catFolders) {
        const normalized = normalizeCategoryName(cat);
        const slug = slugify(normalized);

        // Category filter
        if (category !== "all" && slug !== category) continue;

        const catPath = path.join(yearPath, cat);
        const raw: string[] = [];
        collectImages(catPath, raw);

        for (const filePath of raw) {
          const project = extractProjectName(filePath);

          // Server-side search filter
          if (
            search &&
            !project.toLowerCase().includes(search) &&
            !normalized.toLowerCase().includes(search) &&
            !path.basename(filePath).toLowerCase().includes(search)
          ) {
            continue;
          }

          const encoded = Buffer.from(filePath).toString("base64url");
          allImages.push({
            id: encoded,
            src: `/api/portfolio/image?p=${encoded}`,
            category: slug,
            categoryLabel: normalized,
            project,
            filename: path.basename(filePath),
          });
        }
      }
    }

    // Stable sort by id for consistent pagination
    allImages.sort((a, b) => a.id.localeCompare(b.id));

    const total = allImages.length;
    const totalPages = Math.ceil(total / PAGE_SIZE);
    const safePageNum = Math.min(Math.max(page, 1), totalPages || 1);
    const offset = (safePageNum - 1) * PAGE_SIZE;
    const images = allImages.slice(offset, offset + PAGE_SIZE);

    return NextResponse.json({ images, total, totalPages, page: safePageNum });
  } catch (err) {
    console.error("Portfolio images error:", err);
    return NextResponse.json(
      { images: [], total: 0, totalPages: 0, page: 1 },
      { status: 500 }
    );
  }
}
