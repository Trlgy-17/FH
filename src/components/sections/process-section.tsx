import { processStepsData } from "@/data/process";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Check } from "lucide-react";

export function ProcessSection() {
  return (
    <section id="process" className="py-16 md:py-24 max-w-container-max mx-auto px-6 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Alur Kerja Transparan"
          title="4 Tahapan Menuju Interior Impian"
          subtitle="Proses kerja terstruktur dari konsultasi gagasan hingga serah terima kunci yang tenang dan terkontrol."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16">
        {processStepsData.map((step, idx) => (
          <Reveal key={step.step} delay={idx * 0.08}>
            <div className="bg-soft-white p-6 md:p-7 rounded-2xl border border-light-taupe/40 shadow-sm flex flex-col justify-between h-full relative group hover:border-secondary/40 transition-all duration-300">
              <div className="flex-1 flex flex-col">
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-semibold text-secondary/80 group-hover:text-secondary transition-colors">
                    0{step.step}
                  </span>
                  <span className="font-sans text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-warm-gray bg-surface-container px-3 py-1 rounded-full">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-lg md:text-xl font-medium text-primary mb-2.5">
                  {step.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Detail Points */}
              <div className="pt-5 border-t border-light-taupe/30 space-y-2 shrink-0">
                <span className="block font-sans text-[10px] font-semibold uppercase tracking-widest text-warm-gray/70 mb-1">
                  Hasil Keluaran:
                </span>
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-start gap-2 text-xs font-sans text-primary leading-normal">
                    <Check className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
                {step.footnote && (
                  <p className="font-sans text-[10px] text-warm-gray/60 italic mt-2.5 leading-snug">
                    {step.footnote}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Summary Timeline / Tahapan & Skema Biaya Banner */}
      <Reveal delay={0.2}>
        <div className="mt-12 md:mt-16 bg-surface-container-low/30 border border-light-taupe/40 p-6 md:p-8 rounded-2xl">
          <h4 className="font-serif text-lg font-medium text-primary mb-6 text-center md:text-left">
            Tahapan & Skema Pekerjaan
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative">
            {[
              { num: "01", label: "Konsultasi", desc: "Gratis Tanpa Biaya" },
              { num: "02", label: "Desain", desc: "Deposit Desain (Lanjut 3D)" },
              { num: "03", label: "Produksi", desc: "DP 50% → Termin Progres ±40%" },
              { num: "04", label: "Instalasi", desc: "Pelunasan → Garansi 6 Bulan" },
            ].map((item, idx) => (
              <div key={item.num} className="flex gap-4 items-start relative z-10">
                <span className="font-serif text-2xl font-bold text-secondary">
                  {item.num}
                </span>
                <div>
                  <div className="font-sans text-sm font-semibold text-primary">
                    {item.label}
                  </div>
                  <div className="font-sans text-xs text-warm-gray mt-1 leading-relaxed">
                    {item.desc}
                  </div>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-3 -right-4 w-8 h-[1px] bg-light-taupe/60" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
