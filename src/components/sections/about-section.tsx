import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Double-Bezel Collage Image Showcase */}
          <div className="lg:col-span-6 relative">
            <Reveal direction="right">
              {/* Outer Shell */}
              <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl">
                {/* Inner Core */}
                <div className="relative aspect-[4/3] md:aspect-[14/10] w-full rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-muted border border-foreground/5">
                  <Image
                    src="/images/about-home.png"
                    alt="Filosofi desain interior FULLHOME ID"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-5 -right-2 sm:-right-6 bg-background/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl border border-foreground/15 max-w-xs z-20">
                <p className="font-serif text-sm italic text-primary leading-snug mb-2">
                  &ldquo;Rumah harus menjadi sanctuary tempat tubuh dan pikiran beristirahat.&rdquo;
                </p>
                <span className="font-sans text-[11px] font-mono tracking-wider text-warm-gray uppercase">
                  — TIM DESAIN FULLHOME ID
                </span>
              </div>
            </Reveal>
          </div>

          {/* Text Content & Values */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 w-fit backdrop-blur-md">
                <span>TENTANG STUDIO KAMI</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium leading-[1.12] tracking-tight">
                Menciptakan Ruang Yang <span className="italic font-normal text-secondary">Bernapas & Tak Lekang</span> Oleh Waktu.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-sans text-base text-warm-gray leading-relaxed">
                FULLHOME ID hadir dari komitmen mendalam bahwa interior rumah adalah cerminan dari penghuninya. Kami memadukan estetika minimalis editorial, kehangatan tekstur kayu alami, serta standar pengerjaan custom presisi untuk mewujudkan hunian impian di Jabodetabek, Jawa & Bali.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="p-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10">
                  <div className="bg-background rounded-xl p-4 h-full border border-foreground/5">
                    <h4 className="font-serif text-lg font-medium text-primary mb-1">
                      Materialitas Terpilih
                    </h4>
                    <p className="font-sans text-xs text-warm-gray leading-relaxed">
                      Penggunaan HPL premium, kayu solid, duco, dan marmer dengan ketahanan jangka panjang.
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10">
                  <div className="bg-background rounded-xl p-4 h-full border border-foreground/5">
                    <h4 className="font-serif text-lg font-medium text-primary mb-1">
                      Akurasi Visual 3D
                    </h4>
                    <p className="font-sans text-xs text-warm-gray leading-relaxed">
                      Pengerjaan workshop custom terpadu menjamin hasil akhir 99% presisi sesuai desain 3D.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="pt-2">
                <WhatsAppButton variant="primary">
                  Mulai Diskusi Proyek Anda
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
