import { TestimonialItem } from "@/types";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Star, Quote } from "lucide-react";

interface TestimonialsSectionProps {
  testimonials?: TestimonialItem[];
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    clientName: "Ibu Winda",
    projectType: "Wardrobe & Vanity Custom",
    location: "Cibaduyut, Bandung",
    quote: "Hasil pengerjaan wardrobe dan meja rias sangat presisi sesuai gambar 3D. Tim FULLHOME ID sangat responsif dan finishing HPL-nya benar-benar rapi.",
    rating: 5,
  },
  {
    id: "2",
    clientName: "Ibu Grace",
    projectType: "Kitchen Set Semiklasik",
    location: "Ciskul, Bandung",
    quote: "Suka banget dengan kitchen set semiklasik hasil pengerjaannya. Kombinasi warna krem dan profil kabinetnya bikin dapur keliatan luas dan mewah.",
    rating: 5,
  },
  {
    id: "3",
    clientName: "Bpk. Irfan",
    projectType: "Living Room & Credenza",
    location: "Cimahi",
    quote: "Transparansi RAB awal sangat membantu menyesuaikan budget. Hasil instalasi tepat waktu dan garansinya bikin tenang.",
    rating: 5,
  },
];

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const items = testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section className="py-20 md:py-32 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="ULASAN KLIEN"
          title="Pengalaman & Kepercayaan Klien"
          subtitle="Tanggapan nyata dari pemilik hunian yang telah mempercayakan pengerjaan interiornya kepada FULLHOME ID Studio."
        />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14 md:mt-20">
        {items.map((item, idx) => (
          <Reveal key={item.id} delay={idx * 0.1}>
            {/* Outer Shell */}
            <div className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 h-full group hover:border-foreground/25 transition-all duration-500">
              {/* Inner Core */}
              <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-7 md:p-8 h-full flex flex-col justify-between border border-foreground/5 shadow-xs group-hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote className="w-7 h-7 text-secondary/30" />
                    {item.rating && (
                      <div className="flex gap-1 text-secondary">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-secondary" />
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-foreground/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-base font-medium text-primary">
                      {item.clientName}
                    </h4>
                    <p className="font-sans text-[11px] text-warm-gray mt-0.5">
                      {item.projectType} • {item.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
