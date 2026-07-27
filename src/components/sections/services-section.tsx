import { servicesData } from "@/data/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { PenTool, Armchair, Compass, Hammer, ArrowRight, Check } from "lucide-react";

const iconMap = {
  PenTool,
  Armchair,
  Compass,
  Hammer,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 max-w-container-max mx-auto px-6 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Layanan Unggulan"
          title="Solusi Interior Komprehensif"
          subtitle="Dari konsep tata ruang hingga eksekusi pengerjaan akhir, kami menghadirkan layanan terintegrasi."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-16">
        {servicesData.map((service, idx) => {
          const Icon = iconMap[service.iconName as keyof typeof iconMap] || PenTool;
          return (
            <Reveal key={service.id} delay={idx * 0.1}>
              <div className="bg-soft-white p-8 md:p-10 rounded-2xl border border-light-taupe/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full group hover:border-light-taupe">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-soft-white transition-colors duration-300">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-sans text-xs font-semibold text-warm-gray tracking-wider uppercase bg-surface-container-low px-3 py-1 rounded-full">
                      {service.subtitle}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-medium text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-warm-gray leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-light-taupe/30 mb-8">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-3 text-xs md:text-sm font-sans text-primary">
                        <div className="w-4 h-4 rounded-full bg-secondary/15 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-secondary" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-semibold font-sans text-primary hover:text-secondary transition-colors group/link w-fit"
                >
                  <span>Konsultasikan Layanan Ini</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
