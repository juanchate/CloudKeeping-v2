import {
  BookOpen,
  Calculator,
  Users,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  MessageSquare,
  Cloud,
  Phone,
  Mail,
  Clock,
  MapPin,
  ChevronRight,
  Check,
  ArrowRight,
  type LucideProps,
} from "lucide-react";

const iconMap = {
  BookOpen,
  Calculator,
  Users,
  TrendingUp,
  ShieldCheck,
  Lightbulb,
  MessageSquare,
  Cloud,
  Phone,
  Mail,
  Clock,
  MapPin,
  ChevronRight,
  Check,
  ArrowRight,
} as const;

export type IconName = keyof typeof iconMap;

interface IconProps extends LucideProps {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
