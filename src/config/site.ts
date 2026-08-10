export const siteConfig = {
  name: "FULLHOME ID",
  tagline: "Editorial Minimalism in Interior Design",
  description:
    "FULLHOME ID membantu Anda merancang dan mewujudkan interior custom yang nyaman, fungsional, dan sesuai karakter ruang serta anggaran.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://fullhome.id",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281237533193",
  whatsappDefaultMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ||
    "Halo FULLHOME ID, saya ingin berkonsultasi mengenai kebutuhan desain interior.",
  address: "Kp Cibogo, RT.03/RW.04, Citatah, Kec. Cipatat, Kabupaten Bandung Barat, Jawa Barat 40554",
  plusCode: "5C8C+8P Citatah, West Bandung Regency, West Java",
  googleMapsUrl: "https://maps.app.goo.gl/RGhJiAM7dfgnRV4WA",
  social: {
    instagram: "https://instagram.com/fullhome.id",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281237533193"}`,
  },
  mainNav: [
    { label: "Beranda", href: "#" },
    { label: "Layanan", href: "#services" },
    { label: "Portofolio", href: "/portofolio" },
    { label: "Proses", href: "#process" },
    { label: "Tentang Kami", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Lokasi Office", href: "#location" },
  ],
};
