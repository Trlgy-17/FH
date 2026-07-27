import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Nama minimal 2 karakter" })
    .max(100, { message: "Nama terlalu panjang" }),
  whatsapp: z
    .string()
    .min(8, { message: "Nomor WhatsApp minimal 8 digit" })
    .max(16, { message: "Nomor WhatsApp maksimal 16 digit" })
    .regex(/^[0-9+-\s]+$/, { message: "Nomor WhatsApp hanya boleh berisi angka" }),
  projectLocation: z
    .string()
    .min(3, { message: "Lokasi proyek wajib diisi (contoh: Jakarta Selatan)" }),
  spaceType: z.string().min(1, { message: "Silakan pilih jenis ruangan" }),
  serviceNeed: z.string().min(1, { message: "Silakan pilih kebutuhan layanan" }),
  budgetRange: z.string().optional(),
  message: z
    .string()
    .max(500, { message: "Pesan maksimal 500 karakter" })
    .optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
