import { DashboardIcon } from "@radix-ui/react-icons";
import {
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  CirclePlus,
  UserCog,
} from "lucide-react";

export const routes = [
  { href: "/", label: "Strona główna" },
  {
    href: "/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3",
    label: "Umów wizytę",
  },
  { href: "/cennik", label: "Cennik" },
  { href: "/o-mnie", label: "O mnie" },
  { href: "/kontakt", label: "Kontakt" },
];

export const protectedRoutes = [
  { href: "/dashboard", label: "Panel użytkownika", icon: DashboardIcon },
  { href: "/dashboard/moje-wizyty", label: "Moje wizyty", icon: CalendarDays },
  { href: "/dashboard/umow-wizyte", label: "Umów wizytę", icon: CirclePlus },
];

export const adminRoutes = [
  {
    href: "/dashboard/admin",
    label: "Panel Admina",
    icon: UserCog,
  },
  {
    href: "/dashboard/admin/moja-dostepnosc",
    label: "Dodaj dostępność",
    icon: CalendarPlus,
  },
  {
    href: "/dashboard/admin/umowione-wizyty",
    label: "Umówione wizyty",
    icon: CalendarClock,
  },
];
