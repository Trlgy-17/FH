import { TestimonialItem } from "@/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Star, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

export function TestimonialsSection({ testimonials = [] }: TestimonialsSectionProps) {
  // Strict compliance with guidelines: Hide section completely if no verified testimonials exist
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 max-w-container-max mx-auto px-6 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Pengalaman Klien"
          title="Ulasan & Kepercayaan Klien"
          subtitle="Tanggapan langsung dari pemilik hunian yang telah mempercayakan pengerjaan interiornya kepada FULLHOME ID."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 md:mt-16">
        {testimonials.map((item, idx) => (
          <Reveal key={item.id} delay={idx * 0.1}>
            <div className="bg-soft-white p-8 rounded-2xl border border-light-taupe/40 shadow-sm flex flex-col justify-between h-full relative">
              <Quote className="w-8 h-8 text-secondary/20 mb-4" />
              <p className="font-sans text-sm md:text-base text-warm-gray leading-relaxed italic mb-6">
                "{item.quote}"
              </p>

              <div className="pt-4 border-t border-light-taupe/30 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-lg font-medium text-primary">
                    {item.clientName}
                  </h4>
                  <p className="font-sans text-xs text-warm-gray">
                    {item.projectType} • {item.location}
                  </p>
                </div>
                {item.rating && (
                  <div className="flex gap-1 text-secondary">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-secondary" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
