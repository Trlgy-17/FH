export const siteConfig = {
  name: "FULLHOME ID",
  tagline: "Editorial Minimalism in Interior Design",
  description:
    "FULLHOME ID membantu Anda merancang dan mewujudkan interior custom yang nyaman, fungsional, dan sesuai karakter ruang serta anggaran.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fullhome.id",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ||
    "Halo FULLHOME ID, saya ingin berkonsultasi mengenai kebutuhan desain interior.",
  address: "Jabodetabek & Sekitarnya",
  social: {
    instagram: "https://instagram.com/fullhome.id",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890"}`,
  },
  mainNav: [
    { label: "Beranda", href: "#" },
    { label: "Layanan", href: "#services" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Proses", href: "#process" },
    { label: "Tentang Kami", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],
};
