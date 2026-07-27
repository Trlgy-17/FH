export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  iconName: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  location: string;
  category: 'Residential' | 'Commercial' | 'Kitchens' | 'Bathrooms';
  image: string;
  alt: string;
  description: string;
  scope?: string;
}

export interface ProcessStepItem {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  projectType: string;
  location: string;
  quote: string;
  rating?: number;
  avatar?: string;
}

export interface ContactFormData {
  name: string;
  whatsapp: string;
  projectLocation: string;
  spaceType: string;
  serviceNeed: string;
  budgetRange?: string;
  message?: string;
}
