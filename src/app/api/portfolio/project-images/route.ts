import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const KONTEN_ROOT = "F:\\KONTEN";

function isPathSafe(filePath: string): boolean {
  return path.resolve(filePath).startsWith(path.resolve(KONTEN_ROOT));
}

function collectImages(dir: string, results: string[]) {
  try {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      try {
        if (fs.statSync(full).isDirectory()) collectImages(full, results);
        else if (/\.(jpg|jpeg|png|webp)$/i.test(item)) results.push(full);
      } catch {}
    }
  } catch {}
}

export interface ProjectImage {
  id: string;
  src: string;
  filename: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encodedId = searchParams.get("id");

  if (!encodedId) return NextResponse.json({ images: [] }, { status: 400 });

  try {
    const projPath = Buffer.from(encodedId, "base64url").toString("utf-8");
    if (!isPathSafe(projPath)) return NextResponse.json({ images: [] }, { status: 403 });

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
