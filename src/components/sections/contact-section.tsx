"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormValues } from "@/lib/validations/contact";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageCircle, Send, Loader2 } from "lucide-react";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      projectLocation: "",
      spaceType: "Rumah Tinggal",
      serviceNeed: "Full Interior Design & Build",
      budgetRange: "Rp 50jt - Rp 150jt",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setServerError(null);

    try {
      // 1. Post to local API route handler for validation/logging
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal memproses formulir");
      }

      // 2. Build pre-filled structured WhatsApp link & open window
      const waUrl = buildWhatsAppLink(data);
      setIsSuccess(true);
      reset();

      // Redirect user to WhatsApp with filled message
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 600);
    } catch (err: any) {
      setServerError(err.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 max-w-container-max mx-auto px-6 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Contact Left Column Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Reveal>
            <SectionHeading
              eyebrow="Formulir Konsultasi"
              title="Diskusikan Proyek Interior Anda"
              subtitle="Isi rincian singkat di bawah ini. Tim kami akan menyiapkan estimasi awal dan menghubungi Anda kembali."
              align="left"
            />
          </Reveal>

          <Reveal delay={0.2}>
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-light-taupe/40">
                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-primary">
                    Diskusi Konsep Gratis
                  </h4>
                  <p className="font-sans text-xs text-warm-gray">
                    Sesi konsultasi pertama tidak dipungut biaya dan tanpa komitmen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container-low border border-light-taupe/40">
                <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5 text-secondary">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-medium text-primary">
                    Pesan WhatsApp Otomatis
                  </h4>
                  <p className="font-sans text-xs text-warm-gray">
                    Formulir akan secara otomatis memformat pesan rapi ke nomor WhatsApp resmi kami.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Contact Right Column Form */}
        <div className="lg:col-span-7 bg-soft-white p-6 sm:p-8 md:p-10 rounded-2xl border border-light-taupe/40 shadow-sm relative">
          <Reveal delay={0.1}>
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-medium text-primary">
                  Terima Kasih!
                </h3>
                <p className="font-sans text-sm text-warm-gray max-w-md">
                  Data Anda berhasil diproses. Aplikasi WhatsApp sedang dibuka untuk mengirimkan pesan konsultasi Anda.
                </p>
                <Button
                  onClick={() => setIsSuccess(false)}
                  variant="outline"
                  className="mt-4"
                >
                  Kirim Formulir Lain
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {serverError && (
                  <div className="p-4 rounded-lg bg-destructive/10 text-destructive font-sans text-xs">
                    {serverError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Nama Lengkap *"
                    placeholder="Contoh: Budi Santoso"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    label="Nomor WhatsApp *"
                    placeholder="Contoh: 081234567890"
                    error={errors.whatsapp?.message}
                    {...register("whatsapp")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input
                    label="Lokasi Proyek *"
                    placeholder="Contoh: BSD City, Tangerang"
                    error={errors.projectLocation?.message}
                    {...register("projectLocation")}
                  />
                  <Select
                    label="Jenis Ruangan *"
                    options={[
                      { label: "Rumah Tinggal", value: "Rumah Tinggal" },
                      { label: "Apartemen", value: "Apartemen" },
                      { label: "Kamar Tidur Utama", value: "Kamar Tidur Utama" },
                      { label: "Dapur & Kitchen Set", value: "Dapur & Kitchen Set" },
                      { label: "Ruang Komersial / Toko / Kafe", value: "Ruang Komersial" },
                      { label: "Kantor / Work Space", value: "Kantor / Work Space" },
                    ]}
                    error={errors.spaceType?.message}
                    {...register("spaceType")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Select
                    label="Kebutuhan Layanan *"
                    options={[
                      { label: "Full Interior Design & Build", value: "Full Interior Design & Build" },
                      { label: "Desain Interior 3D Saja", value: "Desain Interior 3D Saja" },
                      { label: "Custom Furniture & Fit-out", value: "Custom Furniture & Fit-out" },
                      { label: "Renovasi Ruang & Pengawasan", value: "Renovasi Ruang & Pengawasan" },
                    ]}
                    error={errors.serviceNeed?.message}
                    {...register("serviceNeed")}
                  />
                  <Select
                    label="Estimasi Rencana Anggaran"
                    options={[
                      { label: "Di bawah Rp 50 Juta", value: "< Rp 50 Juta" },
                      { label: "Rp 50 Juta - Rp 150 Juta", value: "Rp 50jt - Rp 150jt" },
                      { label: "Rp 150 Juta - Rp 300 Juta", value: "Rp 150jt - Rp 300jt" },
                      { label: "Di atas Rp 300 Juta", value: "> Rp 300 Juta" },
                    ]}
                    error={errors.budgetRange?.message}
                    {...register("budgetRange")}
                  />
                </div>

                <Textarea
                  label="Pesan atau Catatan Tambahan"
                  placeholder="Ceritakan detail ruangan, gaya favorit, atau kebutuhan spesifik Anda..."
                  error={errors.message?.message}
                  {...register("message")}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full mt-2 font-sans font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      <span>Kirim & Lanjutkan ke WhatsApp</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
