"use client";
import HeaderLogo from "../layout/header-logo";
import { UserButton } from "@clerk/nextjs";
import BackButton from "../layout/back-button";
import { useMedia } from "react-use";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { CalendarDays, CirclePlus, Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { DashboardIcon } from "@radix-ui/react-icons";

const protectedRoutes = [
  { href: "/dashboard", label: "Panel użytkownika", icon: DashboardIcon },
  { href: "/dashboard/moje-wizyty", label: "Moje wizyty", icon: CalendarDays },
  { href: "/dashboard/umow-wizyte", label: "Umów wizytę", icon: CirclePlus },
];

const ProtectedNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  return (
    <div className="flex justify-between mt-4">
      {isMobile ? (
        <>
          {" "}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="font-normal bg-white/20 hover:bg-white/20 hover:text-green-600 border-none focus-vissible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-white/30 transition duration-300"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-2">
              <nav className="flex flex-col gap-y-2 pt-6">
                {protectedRoutes.map((route) => (
                  <Button
                    key={route.href}
                    variant={route.href === pathname ? "secondary" : "ghost"}
                    onClick={() => onClick(route.href)}
                    className="w-full justify-start"
                  >
                    <route.icon className="size-5 mr-2 text-green-600" />
                    <span className="text-green-700">{route.label}</span>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <HeaderLogo href="/dashboard" />
      )}
      <div className="flex items-center gap-x-2">
        <BackButton href="/" />
        <UserButton />
      </div>
    </div>
  );
};

export default ProtectedNavbar;
