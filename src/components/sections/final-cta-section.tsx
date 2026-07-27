import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function FinalCtaSection() {
  return (
    <section className="py-16 md:py-24 max-w-container-max mx-auto px-6 md:px-8">
      <Reveal>
        <div className="bg-primary text-soft-white rounded-3xl p-8 sm:p-12 md:p-16 relative overflow-hidden text-center flex flex-col items-center gap-6 shadow-xl">
          {/* Subtle Warm Overlay Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

          <span className="font-sans text-xs font-semibold tracking-widest uppercase text-light-taupe bg-white/10 px-4 py-1.5 rounded-full border border-white/10 w-fit">
            Konsultasi Bebas Risiko
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-soft-white font-medium max-w-3xl leading-tight text-balance">
            Siap Wujudkan Interior Custom Bernuansa Warm Minimal Luxury?
          </h2>

          <p className="font-sans text-base md:text-lg text-light-taupe max-w-xl leading-relaxed">
            Diskusikan visi tata ruang Anda bersama desainer FULLHOME ID hari ini. Dapatkan gambaran tata letak dan estimasi anggaran awal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 z-10 w-full sm:w-auto justify-center">
            <WhatsAppButton variant="secondary" className="px-8 py-4 text-base">
              Konsultasi WhatsApp Sekarang
            </WhatsAppButton>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-light-taupe/40 text-soft-white font-sans font-semibold text-base px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Isi Form Konsultasi
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
