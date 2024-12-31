import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
  onClick: () => void;
};

const NavButton = ({ href, label, isActive, onClick }: Props) => {
  return (
    <Button
      asChild
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "w-full lg:w-auto justify-between font-normal text-blue-600 hover:bg-blue-400/20 hover:text-blue-800 transition duration-300",
        isActive ? "bg-blue-500/10 underline underline-offset-4" : "",
        href === "/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3" &&
          "font-bold text-lg"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
