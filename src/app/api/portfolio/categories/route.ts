import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOCAL_KONTEN = path.join(process.cwd(), "Portofolio", "FULLHOME");
const EXTERNAL_KONTEN = "F:\\KONTEN";

// WHITELIST: maps raw folder names to clean display labels
export const CATEGORY_MAP: Record<string, string> = {
  "APARTEMEN": "Apartemen",
  "BACDROP TV": "Backdrop TV",
  "BEDROOM": "Bedroom",
  "BEFORE-AFTER": "Before & After",
  "Before after": "Before & After",
  "INTERIOR TOKO": "Interior Toko",
  "KITCHENSET": "Kitchen Set",
  "LEMARI BAWAH TANGGA": "Lemari Bawah Tangga",
  "WARDROBE": "Wardrobe",
  "LIVINGROOM": "Living Room",
  "SEMI & FULLHOME": "Semi & Full Home",
  "SEMI - FULLHOME": "Semi & Full Home",
  "WORKING SPACE  INTERIOR KANTOR": "Interior Kantor",
  "INTERIOR KANTOR": "Interior Kantor",
  "INTERIOR SALON": "Interior Salon",
  "LOUNDRY ROOM": "Laundry Room",
  "DAILY": "Daily",
  "LIVE STREAMING ROOM": "Live Streaming Room",
};

export const VALID_CAT_NAMES = new Set(Object.keys(CATEGORY_MAP));

export interface PortfolioCategory {
  id: string;
  label: string;
  count: number;
}

const FALLBACK_CATEGORIES: PortfolioCategory[] = [
  { id: "kitchen-set", label: "Kitchen Set", count: 48 },
  { id: "wardrobe", label: "Wardrobe", count: 38 },
  { id: "bedroom", label: "Bedroom", count: 26 },
  { id: "backdrop-tv", label: "Backdrop TV", count: 18 },
  { id: "apartemen", label: "Apartemen", count: 19 },
  { id: "lemari-bawah-tangga", label: "Lemari Bawah Tangga", count: 22 },
  { id: "interior-toko", label: "Interior Toko", count: 14 },
  { id: "before-after", label: "Before & After", count: 10 },
];

export function normalizeCat(raw: string): string {
  return CATEGORY_MAP[raw] ?? raw.replace(/_/g, " ").trim();
}

export function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Clean project folder names into display names */
export function cleanProjectName(raw: string): string {
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
    .replace(/\bBojonsoang\b/gi, "Bojongsoang")
    .replace(/-/g, "–");
}

export function getValidatedProjectInfo(
  parentCat: string,
  subfolderName: string,
  relativePath: string
) {
  const normPath = relativePath.replace(/\\/g, '/').toLowerCase();
  const cleanedName = cleanProjectName(subfolderName);

  if (
    normPath.includes('wardrobe') ||
    normPath.includes('wardrop') ||
    normPath.includes('lemari') ||
    normPath.includes('09.ibu winda - cibaduyut')
  ) {
    return {
      categorySlug: 'wardrobe',
      categoryLabel: 'Wardrobe',
      projectName: `Wardrobe – ${cleanedName}`
    };
  }

  if (
    normPath.includes('kitchen') ||
    normPath.includes('dapur')
  ) {
    return {
      categorySlug: 'kitchen-set',
      categoryLabel: 'Kitchen Set',
      projectName: `Kitchen Set – ${cleanedName}`
    };
  }

  const label = normalizeCat(parentCat);
  const slug = slugify(label);
  return {
    categorySlug: slug,
    categoryLabel: label,
    projectName: `${label} – ${cleanedName}`
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

function scanCategoryRoot(rootDir: string, catMap: Map<string, { label: string; count: number }>) {
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
          const label = normalizeCat(cat);
          const slug  = slugify(label);
          
          const existing = catMap.get(slug);
          if (existing) existing.count += imgCount;
          else catMap.set(slug, { label, count: imgCount });
        } else if (cat === "KITCHENSET") {
          for (const style of subDirs) {
            const stylePath = path.join(catPath, style);
            const clientDirs = fs.readdirSync(stylePath).filter((d) => {
              try { return fs.statSync(path.join(stylePath, d)).isDirectory(); } catch { return false; }
            });

            if (clientDirs.length === 0) {
              const imgCount = countImages(stylePath);
              const relPath = path.join(yr, cat, style);
              const validated = getValidatedProjectInfo(cat, style, relPath);
              const existing = catMap.get(validated.categorySlug);
              if (existing) existing.count += imgCount;
              else catMap.set(validated.categorySlug, { label: validated.categoryLabel, count: imgCount });
            } else {
              for (const client of clientDirs) {
                const clientPath = path.join(stylePath, client);
                const imgCount = countImages(clientPath);
                const relPath = path.join(yr, cat, style, client);
                
                const validated = getValidatedProjectInfo(cat, client, relPath);
                const existing = catMap.get(validated.categorySlug);
                if (existing) existing.count += imgCount;
                else catMap.set(validated.categorySlug, { label: validated.categoryLabel, count: imgCount });
              }
            }
          }
        } else {
          for (const subDir of subDirs) {
            const subDirPath = path.join(catPath, subDir);
            const imgCount = countImages(subDirPath);
            const relPath = path.join(yr, cat, subDir);
            
            const validated = getValidatedProjectInfo(cat, subDir, relPath);
            const existing = catMap.get(validated.categorySlug);
            if (existing) existing.count += imgCount;
            else catMap.set(validated.categorySlug, { label: validated.categoryLabel, count: imgCount });
          }
        }
      }
    }
  } catch (err) {
    console.error(`Error scanning ${rootDir}:`, err);
  }
}

export async function GET() {
  try {
    const catMap = new Map<string, { label: string; count: number }>();

    scanCategoryRoot(LOCAL_KONTEN, catMap);
    scanCategoryRoot(EXTERNAL_KONTEN, catMap);

    const categories: PortfolioCategory[] = Array.from(catMap.entries())
      .map(([id, { label, count }]) => ({ id, label, count }))
      .filter((c) => c.count > 0)
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      categories: categories.length > 0 ? categories : FALLBACK_CATEGORIES,
    });
  } catch (err) {
    console.error("Portfolio categories error:", err);
    return NextResponse.json({ categories: FALLBACK_CATEGORIES });
  }
}
