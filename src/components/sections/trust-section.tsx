import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ShieldCheck, Compass, Sparkles, Layers } from "lucide-react";

const trustPillars = [
  {
    icon: Sparkles,
    badge: "DESAIN BESPOKE",
    title: "Warm Minimal Luxury",
    description:
      "Memadukan kesederhanaan minimalis dengan kehangatan elemen kayu alami dan tekstur kain yang menenangkan jiwa.",
  },
  {
    icon: Compass,
    badge: "ERGONOMI RUANG",
    title: "Berorientasi Penghuni",
    description:
      "Setiap tata letak dirancang mengikuti Alur Aktivitas Harian Anda — mengutamakan kemudahan navigasi dan fungsi maksimal.",
  },
  {
    icon: Layers,
    badge: "CRAFTSMANSHIP",
    title: "Presisi & Finishing Rapi",
    description:
      "Diproduksi langsung di workshop profesional dengan pemilihan material HPL, Duco, dan fitting hardware kelas atas.",
  },
  {
    icon: ShieldCheck,
    badge: "TRANSPARANSI",
    title: "Estimasi Jujur & Garansi",
    description:
      "Perhitungan Rencana Anggaran Biaya (RAB) jelas tanpa hidden cost, didukung garansi garansi garansi pemeliharaan.",
  },
];

export function TrustSection() {
  return (
    <section className="py-20 md:py-32 bg-black/[0.02] dark:bg-white/[0.02] border-y border-foreground/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="PENDEKATAN KAMI"
            title="Mengapa Dipercaya Ratusan Klien?"
            subtitle="Kami percaya interior rumah bukan sekadar susunan perabot, melainkan sanctuary tempat cerita kehidupan bermula."
          />
        </Reveal>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 md:mt-20">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={idx * 0.1}>
                {/* Double-Bezel Shell */}
                <div className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 h-full group hover:border-foreground/25 transition-all duration-500">
                  {/* Inner Core */}
                  <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-6 md:p-7 h-full flex flex-col justify-between border border-foreground/5 shadow-xs group-hover:shadow-md transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-warm-gray uppercase bg-black/5 px-2.5 py-1 rounded-full">
                          {pillar.badge}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-medium text-primary mb-3 leading-snug">
                        {pillar.title}
                      </h3>
                      <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-foreground/10 flex items-center gap-2 text-[11px] font-mono text-warm-gray">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                      <span>Standar FULLHOME ID</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
