import { faqData } from "@/data/faq";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { HelpCircle } from "lucide-react";

export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-black/[0.02] dark:bg-white/[0.02] border-t border-foreground/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* FAQ Left Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-28">
            <Reveal>
              <SectionHeading
                eyebrow="PERTANYAAN UMUM"
                title="Sering Ditanyakan (FAQ)"
                subtitle="Temukan jawaban cepat seputar cakupan wilayah operasional, estimasi waktu produksi, dan skema pembayaran."
                align="left"
              />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10">
                <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-6 md:p-7 flex flex-col gap-4 border border-foreground/5 shadow-xs">
                  <div className="flex items-center gap-3 text-secondary">
                    <HelpCircle className="w-5 h-5" />
                    <h4 className="font-serif text-lg font-medium text-primary">
                      Punya Pertanyaan Spesifik?
                    </h4>
                  </div>
                  <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                    Tim desainer kami siap berdiskusi langsung mengenai denah, jenis material, dan estimasi anggaran proyek Anda.
                  </p>
                  <WhatsAppButton variant="outline" className="w-full justify-center">
                    Konsultasi Langsung via WhatsApp
                  </WhatsAppButton>
                </div>
              </div>
            </Reveal>
          </div>

          {/* FAQ Accordion Right Column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10">
                <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-6 md:p-8 border border-foreground/5 shadow-xs">
                  <Accordion items={faqData} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
