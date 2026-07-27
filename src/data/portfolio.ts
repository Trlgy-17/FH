import { ProjectItem } from "@/types";

export const portfolioCategories = [
  "Semua",
  "Residential",
  "Commercial",
  "Kitchens",
  "Bathrooms",
] as const;

export const portfolioData: ProjectItem[] = [
  {
    id: "the-serene-residence",
    title: "The Serene Residence",
    location: "Jakarta Selatan",
    category: "Residential",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBnf7IHhlnFt4MEJ4OmsbMm7TPs4KNZ42RdsDmkqPAFMYMUY-skbw070g2Gkxd7at73Ezs-E1tw1IQfQVsBqLGbPK2BdyDIhlAQ58-wXYfxSuFtEgXqGC_ZYvLJVS-vEE3TjaKjgCd05I2ZOYfWQELfMuEoPP_QnUAzDDGYjoW-8otjTufT5JZkRW1y-6gxu-kbgl4meu11BVviBlvmOCo7O_F_em2OJpuIA2bWxZVnptdgkiDt-MfVeOz1EKcy0u57PcFo3BTGoEbc",
    alt: "Ruang keluarga modern dengan palet netral hangat, pencahayaan lembut, sofa linen warna charcoal brown dan meja kopi tekstur kayu.",
    description:
      "Transformasi ruang keluarga hunian pribadi mengusung konsep Warm Minimal Luxury dengan dominasi material alami dan pencahayaan lembut.",
    scope: "Full Interior & Custom Furniture",
  },
  {
    id: "sanctuary-bedroom",
    title: "Sanctuary Master Bedroom",
    location: "Tangerang Selatan",
    category: "Residential",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCuUZ0bmxxiKWnvhYX_tS2-PYwkCwP-WI27kxrSUc7UgS98BCPhSQ1r6_TfriXhywdUY00RLLH8sh1-j0oIKkGikXWaqDlrFZ5rPtn5gEs3rNMzVDLoHO4BWTs6geyEy3jRrUsIzLxJ8Ih9khdLt9rgbry3GrxtJ0RumFoZl5Vnrsex_dzqZvGyVDIgBYwtDwISm7Qqvij9_napRrnbmu4QnItrevUd9HQiYDPcwGV0T5Mmk6NhsbgY1QvYsul_lijpMloDVwxeGBGT",
    alt: "Kamar tidur utama dengan headboard kustom warna kayu hangat, bedding linen krem, dan wall paneling minimalis.",
    description:
      "Desain kamar tidur utama berfokus pada kenyamanan istirahat maksimal melalui pencahayaan tersembunyi dan wall panel kayu kustom.",
    scope: "Bedroom Suite & Custom Wardrobe",
  },
  {
    id: "minimalist-oak-kitchen",
    title: "Warm Oak Culinary Studio",
    location: "Jakarta Barat",
    category: "Kitchens",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200&auto=format&fit=crop",
    alt: "Kitchen set minimalis dari kayu oak hangat dengan island table marmer travertine dan aksen kuningan halus.",
    description:
      "Kitchen set built-in berbahan kayu oak dengan top counter batu travertine alami, dirancang fungsional dan estetis untuk area masak terbuka.",
    scope: "Kitchen Set & Built-in Storage",
  },
  {
    id: "editorial-living-lounge",
    title: "Editorial Pavilion Lounge",
    location: "Bandung",
    category: "Commercial",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCF5sBBIBaYMEu-bYZ0VrqGdgbblQwKXsspkGtSVdqA8LnHa8qZIYY7mLD_rqv7yKaNYLBaWhjVD5BUJRv-DdSDFaP0T258OZicdDeT8W7VAO3DZNbPH4SV7RXIxJeD8_RGgwGLpUMoY5xYFveuyKZ0s21WOod7etfQic8UcbeIDuNyKELLQlg_neXNG9oSn8xPzP3N9vHn23Z2NhdOc-IVQnZNz0ikxsQgy20DdYpw4bX0Uee0hueEsLHSMrqIB1egDyy-rxSfxVj7",
    alt: "Area lounge komersial bergaya galeri minimalis dengan tempat duduk bertekstur dan bukaan jendela besar.",
    description:
      "Penataan ruang tamu dan lounge komersial yang menghadirkan suasana hangat ala galeri seni kontemporer.",
    scope: "Commercial Interior Layout & Lighting",
  },
  {
    id: "travertine-spa-bathroom",
    title: "Travertine Wellness Bathroom",
    location: "Jakarta Utara",
    category: "Bathrooms",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop",
    alt: "Kamar mandi bergaya spa dengan dinding travertine krem hangat, vanity kustom kayu, dan cermin melengkung terintegrasi.",
    description:
      "Kamar mandi mewah bernuansa alam dengan perpaduan batu travertine hangat dan furnitur vanity kayu tahan air.",
    scope: "Sanitary Layout & Wall Paneling",
  },
  {
    id: "zenith-penthouse-dining",
    title: "Zenith Executive Suite",
    location: "SCBD Jakarta",
    category: "Residential",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    alt: "Ruang makan apartemen luxury dengan meja kayu solid 8 kursi dan lampu gantung warm minimalis.",
    description:
      "Perencanaan ruang makan dan area kumpul apartemen penthouse dengan pencahayaan arsitektural terintegrasi.",
    scope: "Dining Room & Built-in Credenza",
  },
];
