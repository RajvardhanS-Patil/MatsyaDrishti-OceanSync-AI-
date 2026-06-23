import {
  Home,
  Ship,
  Shield,
  Globe,
  BrainCircuit,
  Thermometer,
  FileBarChart,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Fisherman Portal", href: "/fisherman", icon: Ship },
  { label: "Authority Portal", href: "/authority", icon: Shield },
  { label: "Digital Twin", href: "/digital-twin", icon: Globe },
  { label: "AI Center", href: "/ai-center", icon: BrainCircuit },
  { label: "Climate", href: "/climate", icon: Thermometer },
  { label: "Reports", href: "/reports", icon: FileBarChart },
];

export const SITE_CONFIG = {
  name: "MatsyaDrishti",
  tagline: "OceanSync AI",
  description:
    "AI-powered Digital Twin of the Coastal Ecosystem — sustainable fishing zones, biodiversity monitoring, and ocean health intelligence.",
  version: "v4.2",
  uptime: "99.9%",
} as const;

export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 0.8,
} as const;

export const PARTICLE_CONFIG = {
  count: 50,
  color: "rgba(166, 207, 190, 0.4)",
  maxRadius: 3,
  minRadius: 0.5,
  speed: 0.3,
} as const;
