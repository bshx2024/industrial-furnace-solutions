 import { LucideIcon } from "lucide-react";

export interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface StatProps {
  value: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TechCardProps {
  id?: string;
  title: string;
  description: string | string[];
  keywords: string[];
  imageSrc: string;
  isReversed?: boolean;
}
