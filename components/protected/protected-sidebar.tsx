"use client";
import { DashboardIcon } from "@radix-ui/react-icons";
import { CalendarDays, CirclePlus } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
// import SidebarItem from "./sidebar-item";

const protectedRoutes = [
  { href: "/dashboard", label: "Panel użytkownika", icon: DashboardIcon },
  { href: "/dashboard/moje-wizyty", label: "Moje wizyty", icon: CalendarDays },
  { href: "/dashboard/umow-wizyte", label: "Umów wizytę", icon: CirclePlus },
];
const ProtectedSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className=" w-full mt-4  shadow-lg rounded-lg">
      <div className="flex flex-col m-2 gap-y-4">
        {protectedRoutes.map((route, index) => (
          <Button
            key={index}
            variant={route.href === pathname ? "secondary" : "ghost"}
            onClick={() => onClick(route.href)}
            className="w-full justify-start"
          >
            <route.icon className="size-5 text-green-600 mr-2" />
            <span className="text-green-600 font-semibold">{route.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProtectedSidebar;
