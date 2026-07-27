import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 gap-6 bg-background">
      <span className="font-serif text-6xl md:text-8xl text-secondary/40 font-semibold">
        404
      </span>
      <h1 className="font-serif text-3xl md:text-4xl text-primary font-medium">
        Halaman Tidak Ditemukan
      </h1>
      <p className="font-sans text-sm md:text-base text-warm-gray max-w-md">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Silakan kembali ke beranda FULLHOME ID.
      </p>
      <Link href="/">
        <Button size="lg" className="rounded-full font-sans font-semibold">
          Kembali ke Beranda
        </Button>
      </Link>
    </div>
  );
}
