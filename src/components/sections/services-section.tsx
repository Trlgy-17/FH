import { servicesData } from "@/data/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { PenTool, Armchair, Compass, Hammer, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

const iconMap = {
  PenTool,
  Armchair,
  Compass,
  Hammer,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="LAYANAN UNGGULAN"
          title="Solusi Interior & Custom Furniture"
          subtitle="Dari perancangan tata ruang, visualisasi 3D presisi, hingga pembuatan furnitur custom terintegrasi."
        />
      </Reveal>

      {/* Asymmetric Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-14 md:mt-20">
        {servicesData.map((service, idx) => {
          const Icon = iconMap[service.iconName as keyof typeof iconMap] || PenTool;
          return (
            <Reveal key={service.id} delay={idx * 0.1}>
              {/* Outer Shell */}
              <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 h-full group hover:border-foreground/25 transition-all duration-500">
                {/* Inner Core */}
                <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-7 md:p-9 h-full flex flex-col justify-between border border-foreground/5 shadow-xs group-hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-13 h-13 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest text-warm-gray uppercase bg-black/5 px-3 py-1 rounded-full border border-foreground/10">
                        {service.subtitle}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl md:text-3xl font-medium text-primary mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="space-y-3 pt-5 border-t border-foreground/10 mb-8">
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

                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-primary hover:text-secondary transition-colors group/link w-fit pt-2"
                  >
                    <span>Konsultasikan Layanan Ini</span>
                    <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
