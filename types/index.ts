import { LucideIcon } from "lucide-react";

export interface AnimatedSectionProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export interface AnimatedSectionIconProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  notes?: string;
  openingHours?: string;
  preferations?: string;
  reverse?: boolean;
}

export interface SidebarItemsProps {
  href: string;
  icon: LucideIcon;
  label: string;
}
