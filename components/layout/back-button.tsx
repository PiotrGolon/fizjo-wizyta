"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const BackButton = ({ href }: { href: string }) => {
  const pathname = usePathname();

  const pagesRoutes = [
    "/",
    "/wolne-wizyty",
    "/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3/c926279f-0ed3-4a10-8c3e-f6adf7d4e479",
    "/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3",
    "/cennik",
    "/o-mnie",
    "/kontakt",
  ];

  return (
    <div>
      <Link href={href}>
        <Button
          variant="ghost"
          className="mr-2 w-full  lg:w-auto justify-between font-semibold text-green-600 hover:bg-green-400/20 hover:text-green-800 transition duration-300"
        >
          {pagesRoutes.includes(pathname) ? (
            <>
              Panel użytkownika <LogIn className="size-5 ml-1" />
            </>
          ) : (
            <>
              Wróc na stronę główną <LogOut className="size-5 ml-1" />
            </>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default BackButton;
