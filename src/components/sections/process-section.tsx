import { processStepsData } from "@/data/process";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Check, ArrowRight } from "lucide-react";

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-32 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="ALUR KERJA TRANSPARAN"
          title="4 Tahapan Menuju Interior Impian"
          subtitle="Proses kerja terstruktur dari konsultasi gagasan hingga instalasi serah terima yang tenang dan terukur."
        />
      </Reveal>

      {/* Process Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 md:mt-20">
        {processStepsData.map((step, idx) => (
          <Reveal key={step.step} delay={idx * 0.08}>
            {/* Outer Shell */}
            <div className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 h-full group hover:border-foreground/25 transition-all duration-500">
              {/* Inner Core */}
              <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-6 md:p-7 h-full flex flex-col justify-between border border-foreground/5 shadow-xs group-hover:shadow-md transition-all">
                <div className="flex-1 flex flex-col">
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-4xl font-bold text-secondary">
                      0{step.step}
                    </span>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-warm-gray bg-black/5 px-2.5 py-1 rounded-full">
                      {step.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-primary mb-2.5">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables Checklist */}
                <div className="pt-5 border-t border-foreground/10 space-y-2 shrink-0">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-warm-gray/80 mb-2">
                    HASIL KELUARAN (DELIVERABLES):
                  </span>
                  {step.details.map((detail) => (
                    <div key={detail} className="flex items-start gap-2.5 text-xs font-sans text-primary leading-normal">
                      <div className="w-3.5 h-3.5 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-secondary" />
                      </div>
                      <span>{detail}</span>
                    </div>
                  ))}
                  {step.footnote && (
                    <p className="font-sans text-[10px] text-warm-gray/70 italic mt-3 leading-snug">
                      {step.footnote}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Summary Payment & Timeline Banner */}
      <Reveal delay={0.2}>
        <div className="mt-12 md:mt-16 p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10">
          <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-6 md:p-8 border border-foreground/5 shadow-xs">
            <h4 className="font-serif text-lg font-medium text-primary mb-6 text-center md:text-left flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Skema & Tahapan Pembayaran Pengerjaan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 relative">
              {[
                { num: "01", label: "Konsultasi", desc: "100% Gratis Tanpa Biaya" },
                { num: "02", label: "Pengembangan Desain", desc: "Deposit Desain (Lanjut 3D)" },
                { num: "03", label: "Produksi Workshop", desc: "DP 50% → Progres ±40%" },
                { num: "04", label: "Instalasi & Garansi", desc: "Pelunasan → Garansi 6 Bulan" },
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
                    <div className="hidden md:block absolute top-3 -right-3 w-6 h-[1px] bg-foreground/15" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
