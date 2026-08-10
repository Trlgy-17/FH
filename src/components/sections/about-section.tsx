import Image from "next/image";
import { Reveal } from "@/components/shared/reveal";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { siteConfig } from "@/config/site";
import { Compass, MapPin, Clock, ArrowUpRight, Navigation } from "lucide-react";

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
  const mapEmbedUrl = `https://maps.google.com/maps?q=5C8C%2B8P+Citatah,+West+Bandung+Regency,+West+Java&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-20 md:gap-28">
        {/* Main Split: Image & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Double-Bezel Image Showcase */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-28 mb-6 lg:mb-0">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Quote Badge inside on mobile, offset on desktop */}
                  <div className="absolute bottom-3 right-3 sm:-bottom-5 sm:-right-4 bg-black/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/20 max-w-[88%] sm:max-w-xs z-10">
                    <p className="font-serif text-xs sm:text-sm italic text-white leading-snug mb-2 font-medium">
                      &ldquo;Rumah harus menjadi sanctuary tempat tubuh dan pikiran beristirahat.&rdquo;
                    </p>
                    <span className="font-sans text-[10px] font-mono tracking-wider text-white/90 uppercase font-semibold">
                      — TIM DESAIN FULLHOME ID
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col gap-6 pt-4 lg:pt-0">
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

        {/* Office Location & Map Block */}
        <div id="location" className="flex flex-col gap-10 pt-8 border-t border-foreground/10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-mono tracking-widest uppercase text-warm-gray bg-black/5 dark:bg-white/5 border border-foreground/10 px-3.5 py-1.5 rounded-full inline-block mb-3">
                LOKASI OFFICE
              </span>
              <h3 className="font-serif text-2xl md:text-4xl font-medium text-primary mb-2">
                Kunjungi Office Kami
              </h3>
              <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                Temukan office kami di Bandung Barat untuk berdiskusi langsung mengenai sampel material dan konsep interior impian Anda.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Location Info Card */}
            <div className="lg:col-span-5 flex flex-col">
              <Reveal direction="right">
                <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl h-full">
                  <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-7 md:p-8 h-full flex flex-col justify-between border border-foreground/5 shadow-xs gap-8">
                    <div className="flex flex-col gap-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-secondary bg-secondary/10 border border-secondary/20 w-fit">
                        <Compass className="w-3.5 h-3.5 shrink-0" />
                        <span>{siteConfig.plusCode}</span>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10 flex items-center justify-center text-primary shrink-0 mt-1">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-primary mb-1">
                            Alamat Office
                          </h4>
                          <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                            {siteConfig.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 pt-4 border-t border-foreground/10">
                        <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10 flex items-center justify-center text-primary shrink-0 mt-1">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-primary mb-1">
                            Jam Operasional Office
                          </h4>
                          <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                            Senin – Sabtu: 08:00 – 17:00 WIB
                          </p>
                          <span className="font-sans text-[11px] text-warm-gray/80 italic mt-0.5 block">
                            *Kunjungan survei/diskusi disarankan dengan janji temu
                          </span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={siteConfig.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center justify-between bg-primary text-soft-white font-sans text-xs uppercase tracking-wider px-6 py-4 rounded-full hover:bg-secondary transition-all active:scale-98 shadow-md w-full mt-2"
                    >
                      <div className="flex items-center gap-2">
                        <Navigation className="w-4 h-4" />
                        <span className="font-semibold">Petunjuk Arah Google Maps</span>
                      </div>
                      <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                        <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                      </span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Interactive Map Frame */}
            <div className="lg:col-span-7 flex flex-col min-h-[380px] lg:min-h-[440px]">
              <Reveal delay={0.15}>
                <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl h-full w-full">
                  <div className="relative w-full h-full min-h-[360px] lg:min-h-[420px] rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-muted border border-foreground/5 shadow-xs">
                    <iframe
                      title="Peta Lokasi FULLHOME ID Office"
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, minHeight: "360px" }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full h-full min-h-[360px] lg:min-h-[420px] grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <a
                      href={siteConfig.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-foreground/15 text-xs font-sans font-medium text-primary hover:text-secondary shadow-md transition-colors flex items-center gap-2"
                    >
                      <span>Buka Peta Penuh</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
