import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="lg:flex lg:h-[370px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 to-green-500 rounded-xl mb-12 ">
      {/* ---- Left Side ------ */}
      <div className="flex flex-col items-center lg:items-start m-4 text-center lg:text-left text-white  font-extrabold drop-shadow-xl lg:mx-8">
        <div className="mt-4">
          <p className="text-3xl lg:text-5xl">Zarezerwuj wizytę!</p>
          <p className="text-2xl lg:text-4xl mt-4 lg:mt-12 text-blue-800">
            Z zaufanym specjalistą, w twoim mieście!
          </p>
        </div>
        <Link href="/wolne-wizyty">
          <Button
            variant="signIn"
            size="lg"
            className="w-full lg:w-auto mb-4 mt-8 lg:mt-16 rounded-full"
          >
            Sprawdź wolne terminy!
          </Button>
        </Link>
      </div>

      {/* ---- Right Side ------ */}
      <div className="hidden lg:block lg:w-1/2 mr-2 relative">
        <Image
          className="w-full absolute bottom-0 right-0 max-w-md"
          width={580}
          height={529}
          src="/images/appointment_img.png"
          alt="appointment-image"
        />
      </div>
    </div>
  );
};

export default Banner;
