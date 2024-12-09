"use client";

import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { protectedRoutes, adminRoutes } from "@/assets/constants";

const ProtectedSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isAdminDashboard = pathname?.includes("/admin");

  const routes = isAdminDashboard ? adminRoutes : protectedRoutes;

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <div className=" w-full mt-4  shadow-lg border rounded-lg">
      <div className="flex flex-col m-2 gap-y-4">
        {routes.map((route, index) => {
          const isActive = pathname === route.href;
          return (
            <Button
              key={index}
              variant={route.href === pathname ? "secondary" : "ghost"}
              onClick={() => onClick(route.href)}
              className={cn(
                "w-full justify-start shadow-lg hover:bg-green-500/10",
                isActive ? "border-b-2 border-green-600" : ""
              )}
            >
              <route.icon className="size-5 text-green-600 mr-2" />
              <span className="text-green-600 font-semibold">
                {route.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default ProtectedSidebar;
