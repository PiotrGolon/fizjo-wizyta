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
        "w-full lg:w-auto justify-between font-normal text-green-600 hover:bg-green-400/20 hover:text-green-800 transition duration-300",
        isActive ? "bg-green-500/10 underline underline-offset-4" : ""
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
