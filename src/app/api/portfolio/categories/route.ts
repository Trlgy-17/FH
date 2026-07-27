import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KONTEN_ROOT = "F:\\KONTEN";

// WHITELIST: only these exact folder names are valid category folders.
// Anything else at the same level is ignored (could be stray project folders).
export const CATEGORY_MAP: Record<string, string> = {
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

// Categories that have STYLE subfolders instead of client subfolders.
// These are treated as a single merged category (all images counted together).
export const STYLE_CATEGORIES = new Set(["KITCHENSET"]);

export const VALID_CAT_NAMES = new Set(Object.keys(CATEGORY_MAP));

export interface PortfolioCategory {
  id: string;
  label: string;
  count: number; // image count
}

export function normalizeCat(raw: string): string {
  return CATEGORY_MAP[raw] ?? raw.replace(/_/g, " ").trim();
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

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

export async function GET() {
  try {
    const yearFolders = fs.readdirSync(KONTEN_ROOT).filter((d) => {
      try { return fs.statSync(path.join(KONTEN_ROOT, d)).isDirectory(); } catch { return false; }
    });

    const catMap = new Map<string, { label: string; count: number }>();

    for (const yr of yearFolders) {
      const yearPath = path.join(KONTEN_ROOT, yr);
      const catFolders = fs.readdirSync(yearPath).filter((d) => {
        try { return fs.statSync(path.join(yearPath, d)).isDirectory(); } catch { return false; }
      });

      for (const cat of catFolders) {
        // ✅ WHITELIST CHECK — skip any folder that is not a known category
        if (!VALID_CAT_NAMES.has(cat)) continue;

        const label = normalizeCat(cat);
        const slug  = slugify(label);
        const catPath = path.join(yearPath, cat);
        const imgCount = countImages(catPath);

        const existing = catMap.get(slug);
        if (existing) {
          existing.count += imgCount;
        } else {
          catMap.set(slug, { label, count: imgCount });
        }
      }
    }

    const categories: PortfolioCategory[] = Array.from(catMap.entries())
      .map(([id, { label, count }]) => ({ id, label, count }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({ categories });
  } catch (err) {
    console.error("Portfolio categories error:", err);
    return NextResponse.json({ categories: [] }, { status: 500 });
  }
}
