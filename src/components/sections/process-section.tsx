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
          title="8 Tahapan Menuju Interior Impian"
          subtitle="Proses kerja terstruktur dari konsultasi gagasan hingga serah terima kunci yang tenang dan terkontrol."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16 relative">
        {processStepsData.map((step, idx) => (
          <Reveal key={step.step} delay={idx * 0.08}>
            <div className="bg-soft-white p-6 md:p-7 rounded-2xl border border-light-taupe/40 shadow-sm flex flex-col justify-between h-full relative group hover:border-secondary/40 transition-all duration-300">
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-serif text-3xl font-semibold text-secondary/80 group-hover:text-secondary transition-colors">
                    0{step.step}
                  </span>
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-warm-gray bg-surface-container px-3 py-1 rounded-full">
                    {step.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-primary mb-2">
                  {step.title}
                </h3>
                <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              {/* Detail Points */}
              <div className="pt-4 border-t border-light-taupe/30 space-y-1.5">
                {step.details.map((detail) => (
                  <div key={detail} className="flex items-center gap-2 text-xs font-sans text-primary">
                    <Check className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
