import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOCAL_KONTEN = path.join(process.cwd(), "Portofolio", "FULLHOME");
const EXTERNAL_KONTEN = "F:\\KONTEN";

function isPathSafe(filePath: string): boolean {
  const resolved = path.resolve(filePath);
  return (
    resolved.startsWith(path.resolve(LOCAL_KONTEN)) ||
    resolved.startsWith(path.resolve(EXTERNAL_KONTEN))
  );
}

function collectImages(dir: string, results: string[]) {
  try {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      try {
        if (fs.statSync(full).isDirectory()) collectImages(full, results);
        else if (/\.(jpg|jpeg|png|webp|heic)$/i.test(item)) results.push(full);
      } catch {}
    }
  } catch {}
}

export interface ProjectImage {
  id: string;
  src: string;
  filename: string;
}

const FALLBACK_IMAGES: Record<string, string[]> = {
  "fallback-kitchen-set-minimalis": [
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  ],
  "fallback-wardrobe-semiklasik": [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558882224-dda166733046?q=80&w=1200&auto=format&fit=crop",
  ],
  "default": [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
  ],
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encodedId = searchParams.get("id");

  if (!encodedId) return NextResponse.json({ images: [] }, { status: 400 });

  if (encodedId.startsWith("fallback-")) {
    const list = FALLBACK_IMAGES[encodedId] ?? FALLBACK_IMAGES["default"];
    const images: ProjectImage[] = list.map((url, idx) => ({
      id: `img-${idx}`,
      src: url,
      filename: `Foto Dokumentasi ${idx + 1}.jpg`,
    }));
    return NextResponse.json({ images, total: images.length });
  }

  try {
    const projPath = Buffer.from(encodedId, "base64url").toString("utf-8");
    if (!isPathSafe(projPath)) return NextResponse.json({ images: [] }, { status: 403 });

    if (!fs.existsSync(projPath)) {
      const list = FALLBACK_IMAGES["default"];
      const images: ProjectImage[] = list.map((url, idx) => ({
        id: `img-${idx}`,
        src: url,
        filename: `Foto Dokumentasi ${idx + 1}.jpg`,
      }));
      return NextResponse.json({ images, total: images.length });
    }

    const raw: string[] = [];
    collectImages(projPath, raw);
    raw.sort();

    const images: ProjectImage[] = raw.map((fp) => ({
      id: Buffer.from(fp).toString("base64url"),
      src: `/api/portfolio/image?p=${Buffer.from(fp).toString("base64url")}`,
      filename: path.basename(fp),
    }));

    return NextResponse.json({ images, total: images.length });
  } catch (err) {
    console.error("Project images error:", err);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
