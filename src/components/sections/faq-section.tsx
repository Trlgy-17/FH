import { faqData } from "@/data/faq";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-surface-container-low/30 border-t border-light-taupe/30">
      <div className="max-w-container-max mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* FAQ Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                eyebrow="Pertanyaan Umum"
                title="Sering Ditanyakan (FAQ)"
                subtitle="Temukan jawaban cepat seputar alur konsultasi, estimasi pengerjaan, dan skema garansi kami."
                align="left"
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="bg-soft-white p-6 rounded-2xl border border-light-taupe/40 shadow-sm flex flex-col gap-4">
                <div className="flex items-center gap-3 text-secondary">
                  <HelpCircle className="w-6 h-6" />
                  <h4 className="font-serif text-lg font-medium text-primary">
                    Punya pertanyaan lain?
                  </h4>
                </div>
                <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                  Tim kami siap menjawab pertanyaan spesifik seputar ruang dan anggaran Anda secara langsung via WhatsApp.
                </p>
                <WhatsAppButton variant="outline" className="w-full">
                  Tanyakan via WhatsApp
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>

          {/* FAQ Accordion Right Column */}
          <div className="lg:col-span-7 bg-soft-white p-6 md:p-8 rounded-2xl border border-light-taupe/40 shadow-sm">
            <Reveal delay={0.1}>
              <Accordion items={faqData} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
