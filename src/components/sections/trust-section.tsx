import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { ShieldCheck, Compass, Sparkles, Layers } from "lucide-react";

const trustPillars = [
  {
    icon: Sparkles,
    title: "Warm Minimal Luxury",
    description:
      "Memadukan kesederhanaan minimalis dengan kehangatan warna tanah dan tekstur kaya material kayu serta kain alami.",
  },
  {
    icon: Compass,
    title: "Desain Berorientasi Manusia",
    description:
      "Setiap sudut ruangan dirancang menyesuaikan ritme aktivitas harian Anda, mengutamakan kenyamanan dan fungsi bawaan.",
  },
  {
    icon: Layers,
    title: "Craftsmanship & Material Presisi",
    description:
      "Pemilihan finishing kayu, batu alami, dan fitting aksesoris kelas atas dengan pengerjaan terstandar workshop profesional.",
  },
  {
    icon: ShieldCheck,
    title: "Transparansi Biaya & Garansi",
    description:
      "Perhitungan Rencana Anggaran Biaya (RAB) jujur di awal tanpa kompromi kualitas, didukung jaminan pemeliharaan pengerjaan.",
  },
];

export function TrustSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-container-low/60 border-y border-light-taupe/30">
      <div className="max-w-container-max mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Pendekatan Kami"
            title="Mengapa Memilih FULLHOME ID?"
            subtitle="Kami percaya bahwa interior rumah bukan sekadar dekorasi, melainkan tempat berlindung tempat hidup berkembang."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={idx * 0.1}>
                <div className="bg-soft-white p-6 md:p-8 rounded-xl border border-light-taupe/40 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col gap-4 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-soft-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-medium text-primary">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
