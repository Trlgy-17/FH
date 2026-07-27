import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-surface-container-low/50 border-y border-light-taupe/30">
      <div className="max-w-container-max mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* About Image Collage */}
          <div className="lg:col-span-6 relative">
            <Reveal direction="right">
              <div className="relative aspect-[4/3] md:aspect-[14/10] w-full rounded-2xl overflow-hidden shadow-md border border-light-taupe/40 bg-surface-container">
                <Image
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop"
                  alt="Filosofi desain interior FULLHOME ID mengutamakan kehangatan material kayu dan minimalisme editorial."
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* About Text Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <Reveal>
              <span className="font-sans text-xs font-semibold text-warm-gray tracking-widest uppercase bg-soft-white px-3.5 py-1.5 rounded-full border border-light-taupe/40 w-fit">
                Tentang FULLHOME ID
              </span>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-primary font-medium leading-tight">
                Menciptakan Ruang yang Bernapas & Berkelanjutan.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="font-sans text-base text-warm-gray leading-relaxed">
                FULLHOME ID lahir dari keyakinan bahwa rumah seharusnya menjadi tempat paling menenangkan bagi penghuninya. Kami mengkombinasikan kesederhanaan gaya minimalis dengan kehangatan material alami, menciptakan ruang yang tidak hanya estetis di foto melainkan nyaman ditinggali sehari-hari.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                <div className="bg-soft-white p-5 rounded-xl border border-light-taupe/30">
                  <h4 className="font-serif text-lg font-medium text-primary mb-1">
                    Visi Material
                  </h4>
                  <p className="font-sans text-xs text-warm-gray leading-relaxed">
                    Penggunaan tekstur kayu, kain linen, dan batu travertine yang tahan lama dan tak lekang oleh waktu.
                  </p>
                </div>
                <div className="bg-soft-white p-5 rounded-xl border border-light-taupe/30">
                  <h4 className="font-serif text-lg font-medium text-primary mb-1">
                    Presisi Eksekusi
                  </h4>
                  <p className="font-sans text-xs text-warm-gray leading-relaxed">
                    Pengerjaan workshop custom dengan standar pengawasan ketat untuk kesesuaian 100% dengan rancangan 3D.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="pt-2">
                <WhatsAppButton variant="primary">
                  Mulai Diskusi Projek Anda
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
