import Image from "next/image";
import Link from "next/link";

interface HeaderLogoProps {
  href: string;
}

const HeaderLogo = ({ href }: HeaderLogoProps) => {
  return (
    <Link href={href}>
      <div className="hidden lg:flex items-center ml-2 lg:ml-0 ">
        <Image
          width={60}
          height={60}
          src="/icons/logo-icon.svg"
          alt="logo-icon"
        />
        <h1
          className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-500 to-green-500 
                     bg-clip-text drop-shadow-xl 
                     transition-all duration-500 bg-[length:200%_200%] bg-right hover:bg-left"
        >
          Tomasz Deput Fizjoterapia
        </h1>
      </div>
    </Link>
  );
};

export default HeaderLogo;
