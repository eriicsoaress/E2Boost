export interface Solution {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  features: string[];
}

export interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  details: string;
  result: string;
  url: string;
  tags: string[];
  imageType: 'satellite' | 'ecommerce';
  screenshots: {
    src: string;
    alt: string;
    caption: string;
  }[];
}

export interface MethodStep {
  step: number;
  title: string;
  description: string;
  details: string;
  iconName: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  whatsapp: string;
  challenge: string;
  submittedAt: string;
}
