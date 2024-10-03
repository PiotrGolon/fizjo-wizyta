"use client";
import Image from "next/image";
import { routes } from "@/assets/constants";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <footer className="px-4 py-8">
      <div className="max-w-screen-2xl mx-auto">
        {/* Copyrigth */}
        <div>
          <hr />
          <p className="py-5 text-sm text-center text-green-700">
            Copyright © 2024 Tomasz Deput - All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
