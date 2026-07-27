import { siteConfig } from "@/config/site";
import { ContactFormData } from "@/types";

export function formatWhatsAppNumber(phone: string): string {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  // If starts with 0, replace with 62
  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }
  return cleaned;
}

export function buildWhatsAppLink(data?: Partial<ContactFormData>): string {
  const number = formatWhatsAppNumber(siteConfig.whatsappNumber);

  if (!data || (!data.name && !data.whatsapp)) {
    const encodedDefault = encodeURIComponent(siteConfig.whatsappDefaultMessage);
    return `https://wa.me/${number}?text=${encodedDefault}`;
  }

  const lines = [
    "Halo FULLHOME ID,",
    "",
    "Saya ingin berkonsultasi mengenai kebutuhan interior.",
    "",
    `Nama: ${data.name || "-"}`,
    `Nomor WA: ${data.whatsapp || "-"}`,
    `Lokasi Proyek: ${data.projectLocation || "-"}`,
    `Jenis Ruangan: ${data.spaceType || "-"}`,
    `Kebutuhan: ${data.serviceNeed || "-"}`,
  ];

  if (data.budgetRange) {
    lines.push(`Estimasi Anggaran: ${data.budgetRange}`);
  }

  if (data.message) {
    lines.push(`Catatan Tambahan: ${data.message}`);
  }

  lines.push("", "Mohon informasi mengenai alur konsultasi dan jadwal selanjutnya. Terima kasih!");

  const text = lines.join("\n");
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
