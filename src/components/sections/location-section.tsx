import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/config/site";
import { MapPin, Compass, Clock, ArrowUpRight, Navigation } from "lucide-react";

export function LocationSection() {
  const mapEmbedUrl = `https://maps.google.com/maps?q=5C8C%2B8P+Citatah,+West+Bandung+Regency,+West+Java&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="py-20 md:py-32 bg-black/[0.02] dark:bg-white/[0.02] border-t border-foreground/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="LOKASI STUDIO & WORKSHOP"
            title="Kunjungi Workshop Kami"
            subtitle="Temukan workshop dan studio kami di Bandung Barat untuk berdiskusi langsung mengenai sampel material dan konsep interior impian Anda."
          />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 md:mt-16 items-stretch">
          {/* Location Info Card - Double Bezel Architecture */}
          <div className="lg:col-span-5 flex flex-col">
            <Reveal direction="right">
              <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl h-full">
                <div className="bg-background rounded-[calc(1.5rem-0.25rem)] p-7 md:p-8 h-full flex flex-col justify-between border border-foreground/5 shadow-xs gap-8">
                  <div className="flex flex-col gap-6">
                    {/* Plus Code Badge */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider text-secondary bg-secondary/10 border border-secondary/20 w-fit">
                      <Compass className="w-3.5 h-3.5 shrink-0" />
                      <span>{siteConfig.plusCode}</span>
                    </div>

                    {/* Alamat Lengkap */}
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10 flex items-center justify-center text-primary shrink-0 mt-1">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-medium text-primary mb-1">
                          Alamat Studio & Workshop
                        </h4>
                        <p className="font-sans text-xs md:text-sm text-warm-gray leading-relaxed">
                          {siteConfig.address}
                        </p>
                      </div>
                    </div>

                    {/* Jam Operasional */}
                    <div className="flex items-start gap-4 pt-4 border-t border-foreground/10">
                      <div className="w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-foreground/10 flex items-center justify-center text-primary shrink-0 mt-1">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-serif text-lg font-medium text-primary mb-1">
                          Jam Operasional Studio
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

                  {/* Direct Navigation Button */}
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

          {/* Interactive Google Maps Frame - Double Bezel Architecture */}
          <div className="lg:col-span-7 flex flex-col min-h-[380px] lg:min-h-[460px]">
            <Reveal delay={0.15}>
              <div className="p-2.5 rounded-3xl bg-black/5 dark:bg-white/5 border border-foreground/10 shadow-xl h-full w-full">
                <div className="relative w-full h-full min-h-[360px] lg:min-h-[440px] rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-muted border border-foreground/5 shadow-xs">
                  <iframe
                    title="Peta Lokasi FULLHOME ID Studio"
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: "360px" }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[360px] lg:min-h-[440px] grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  {/* Floating Action Badge on Map */}
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
    </section>
  );
}
