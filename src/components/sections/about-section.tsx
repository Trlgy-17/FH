import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";

const stats = [
  {
    value: "Since 2018",
    label: "Pengalaman & Dedikasi",
    description:
      "Pengalaman menghadirkan solusi interior dan custom furniture untuk berbagai kebutuhan hunian.",
  },
  {
    value: "4.048+",
    label: "Proyek Terselesaikan",
    description:
      "Berbagai proyek interior yang telah diwujudkan dengan pendekatan desain dan kebutuhan yang beragam.",
  },
  {
    value: "15+",
    label: "Workshop & Production Support",
    description:
      "Didukung jaringan workshop dan produksi untuk menunjang proses pengerjaan yang terukur.",
  },
  {
    value: "150+",
    label: "Tenaga Ahli",
    description:
      "Tim profesional yang mendukung setiap tahap proyek, dari desain hingga instalasi.",
  },
];

const values = [
  {
    number: "01",
    title: "Materialitas Terpilih",
    description:
      "Kami memilih material dengan mempertimbangkan estetika, fungsi, dan ketahanan untuk memastikan setiap elemen interior memiliki kualitas yang dapat diandalkan dalam penggunaan jangka panjang.",
  },
  {
    number: "02",
    title: "Akurasi Visual & Produksi",
    description:
      "Setiap detail dirancang secara presisi melalui proses desain dan visualisasi 3D sebelum masuk ke tahap produksi, sehingga hasil akhir dapat diwujudkan dengan tingkat akurasi yang tinggi.",
  },
  {
    number: "03",
    title: "Transparansi Proses",
    description:
      "Kami percaya bahwa proyek interior yang baik dibangun melalui komunikasi yang jelas. Mulai dari desain, spesifikasi, RAB, hingga progres pengerjaan disampaikan secara transparan agar setiap keputusan dapat dilakukan dengan lebih yakin.",
  },
  {
    number: "04",
    title: "Pengerjaan Bergaransi",
    description:
      "Kualitas dan kepuasan klien menjadi bagian penting dalam setiap proyek. Karena itu, kami memberikan garansi pengerjaan sebagai bentuk komitmen terhadap kualitas hasil dan layanan yang kami berikan.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-20 md:gap-28">
        {/* Main Split: Image & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Double-Bezel Image Showcase */}
          <div className="lg:col-span-5 relative sticky top-24">
            <Reveal direction="right">
              {/* Outer Shell */}
              <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl">
                {/* Inner Core */}
                <div className="relative aspect-[4/3] sm:aspect-[4/5] w-full rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-muted border border-foreground/5">
                  <Image
                    src="/images/about-home.png"
                    alt="Filosofi desain interior FULLHOME ID"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Floating Quote Badge */}
              <div className="absolute -bottom-5 -right-2 sm:-right-4 bg-background/90 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl border border-foreground/15 max-w-xs z-20">
                <p className="font-serif text-xs sm:text-sm italic text-primary leading-snug mb-2">
                  &ldquo;Rumah harus menjadi sanctuary tempat tubuh dan pikiran beristirahat.&rdquo;
                </p>
                <span className="font-sans text-[10px] font-mono tracking-wider text-warm-gray uppercase">
                  — TIM DESAIN FULLHOME ID
                </span>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 w-fit backdrop-blur-md">
                <span>TENTANG STUDIO KAMI</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-serif text-3xl md:text-5xl text-primary font-medium leading-[1.12] tracking-tight">
                Menciptakan Ruang yang{" "}
                <span className="italic font-normal text-secondary">
                  Bernapas, Fungsional,
                </span>{" "}
                dan Tak Lekang oleh Waktu.
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="flex flex-col gap-4 font-sans text-sm md:text-base text-warm-gray leading-relaxed">
                <p>
                  FULLHOME ID hadir sejak 2018 dengan satu komitmen: menciptakan ruang yang tidak hanya indah secara visual, tetapi juga memiliki fungsi, karakter, dan kualitas yang bertahan dalam jangka panjang.
                </p>
                <p>
                  Kami menghadirkan solusi desain interior dan custom furniture yang dirancang secara personal untuk setiap kebutuhan—mulai dari kitchen set, wardrobe, kamar tidur, ruang keluarga, hingga interior rumah secara menyeluruh. Dengan memadukan estetika, material pilihan, dan pengerjaan presisi, setiap detail dirancang untuk menciptakan hunian yang merepresentasikan karakter serta gaya hidup penghuninya.
                </p>
                <p>
                  Didukung oleh pengalaman menangani ribuan proyek, jaringan workshop, dan tenaga ahli berpengalaman, FULLHOME ID berkomitmen memberikan proses yang terukur, transparan, dan terpercaya—dari tahap konsultasi dan desain hingga produksi, instalasi, serta penyelesaian proyek.
                </p>
                <p className="font-serif italic text-primary text-base md:text-lg">
                  Kami percaya, sebuah ruang yang baik bukan sekadar tempat untuk tinggal. Ia adalah bagian dari kehidupan yang tumbuh bersama Anda.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="pt-2">
                <WhatsAppButton variant="primary">
                  Mulai Diskusi Proyek Anda
                </WhatsAppButton>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Statistics / Trust Numbers */}
        <Reveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 h-full group hover:border-foreground/20 transition-all"
              >
                <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-6 h-full flex flex-col justify-between border border-foreground/5 shadow-xs">
                  <div>
                    <span className="font-serif text-3xl md:text-4xl font-medium text-primary block mb-1">
                      {item.value}
                    </span>
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-wider text-secondary mb-2">
                      {item.label}
                    </h3>
                    <p className="font-sans text-xs text-warm-gray leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Our Values Section */}
        <div className="flex flex-col gap-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono tracking-widest uppercase text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                PRINSIP & NILAI UTAMA
              </span>
              <h3 className="font-serif text-2xl md:text-4xl font-medium text-primary">
                Fondasi Layanan FULLHOME ID
              </h3>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((item, idx) => (
              <Reveal key={item.number} delay={idx * 0.1}>
                <div className="p-2 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 h-full group hover:border-foreground/25 transition-all duration-300">
                  <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-7 h-full flex flex-col justify-between border border-foreground/5 shadow-xs">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-mono text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                          {item.number}
                        </span>
                        <h4 className="font-serif text-xl font-medium text-primary">
                          {item.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
