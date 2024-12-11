// import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const BannerAbout = () => {
  return (
    <div className="lg:flex lg:h-auto lg:w-3/5 mx-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 to-green-500 rounded-xl mb-12">
      {/* ---- Left Side ------ */}
      <div className="flex flex-col items-center m-4 text-center  text-white  font-extrabold drop-shadow-xl mx-auto ">
        <div className="mt-4 px-8">
          <p className="text-3xl lg:text-5xl">Nie zwlekaj!</p>
          <p className="text-2xl lg:text-4xl mt-4 lg:mt-12 text-blue-800">
            Sprawdź moją dostępność i umów wizytę!
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-x-4 w-full px-8 lg:justify-center lg:py-8">
          <Link href="/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3">
            <Button
              variant="signIn"
              size="lg"
              className="w-full lg:w-auto mb-4 lg:mb-0 mt-8 lg:mt-4 rounded-full"
            >
              Wolne terminy
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button
              variant="secondary"
              size="lg"
              className="w-full lg:w-auto mb-4 lg:mb-0 lg:mt-4 rounded-full text-green-600 hover:text-green-700"
            >
              Panel klienta
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerAbout;
