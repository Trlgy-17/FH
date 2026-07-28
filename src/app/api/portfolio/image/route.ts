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

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".heic": "image/heic",
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const encoded = searchParams.get("p");

  if (!encoded) {
    return new NextResponse("Missing parameter", { status: 400 });
  }

  try {
    const filePath = Buffer.from(encoded, "base64url").toString("utf-8");

    if (!isPathSafe(filePath)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] ?? "image/jpeg";
    const stat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mime,
        "Content-Length": stat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Portfolio image serve error:", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
