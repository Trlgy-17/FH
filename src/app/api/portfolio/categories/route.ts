import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KONTEN_ROOT = "F:\\KONTEN";

// WHITELIST: only these exact folder names are valid category folders.
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

/**
 * Data Validation Skill: Validates category and project naming based on actual content
 */
export function getValidatedProjectInfo(
  parentCat: string,
  subfolderName: string,
  relativePath: string
) {
  const normPath = relativePath.replace(/\\/g, '/').toLowerCase();

  // Data Validation override: 'kitchenset/semiklasik' is actually a Wardrobe category
  if (normPath.includes('kitchenset/semiklasik')) {
    return {
      categorySlug: 'wardrobe',
      categoryLabel: 'Wardrobe',
      projectName: 'Wardrobe – Semiklasik'
    };
  }

  // Default mappings based on parent category folder name
  const label = normalizeCat(parentCat);
  const slug = slugify(label);

  // Clean and format default project name
  let formattedName = subfolderName;
  if (STYLE_CATEGORIES.has(parentCat)) {
    const styleName = subfolderName.charAt(0).toUpperCase() + subfolderName.slice(1).toLowerCase();
    formattedName = `${label} – ${styleName}`;
  }

  return {
    categorySlug: slug,
    categoryLabel: label,
    projectName: formattedName
  };
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
        if (!VALID_CAT_NAMES.has(cat)) continue;

        const catPath = path.join(yearPath, cat);

        // Scan subfolders to validate individually
        const subDirs = fs.readdirSync(catPath).filter((d) => {
          try { return fs.statSync(path.join(catPath, d)).isDirectory(); } catch { return false; }
        });

        if (subDirs.length === 0) {
          const imgCount = countImages(catPath);
          const label = normalizeCat(cat);
          const slug  = slugify(label);
          
          const existing = catMap.get(slug);
          if (existing) {
            existing.count += imgCount;
          } else {
            catMap.set(slug, { label, count: imgCount });
          }
        } else {
          for (const subDir of subDirs) {
            const subDirPath = path.join(catPath, subDir);
            const imgCount = countImages(subDirPath);
            const relPath = path.join(yr, cat, subDir);
            
            const validated = getValidatedProjectInfo(cat, subDir, relPath);
            
            const existing = catMap.get(validated.categorySlug);
            if (existing) {
              existing.count += imgCount;
            } else {
              catMap.set(validated.categorySlug, { label: validated.categoryLabel, count: imgCount });
            }
          }
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
