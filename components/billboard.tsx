import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Billboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 shadow-2xl  rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 to-blue-600 h-auto px-2 lg:px-10 mb-16">
      <div className="flex flex-col px-4 py-4 gap-y-6 my-auto">
        <h1 className="text-white text-4xl font-extrabold drop-shadow-lg">
          Fizjoterapeuta Pruszków?
        </h1>
        <h2 className="text-green-900 text-3xl font-bold drop-shadow-lg">
          Profesjonalna pomoc jest na wyciągnięcie ręki!
        </h2>
        <p className="text-white text-lg drop-shadow-sm">
          Zapraszam Cię do mojego gabinetu! Nazywam się{" "}
          <span className="text-xl text-green-900 font-semibold drop-shadow-2xl">
            Tomasz Deput.
          </span>{" "}
          Jestem wykwalifikowanym fizjoterapeutą. Oferuję indywidualne
          podejście, nowoczesne metody terapeutyczne oraz pełne zaangażowanie w
          Twoją rehabilitację. Zaufaj mojemu doświadczeniu, aby szybko wrócić do
          pełnej sprawności i cieszyć się życiem bez bólu!
        </p>

        <Link href="/wolne-wizyty/user_2n1u8b2jrjY5iSaD2FPsGK7cdd3">
          <Button
            size="lg"
            variant="signIn"
            className="w-full lg:max-w-[220px] mt-4 rounded-full"
          >
            Umów wizytę już teraz!
          </Button>
        </Link>
      </div>
      <div className="flex  justify-center">
        <Image
          src="/images/header_img.png"
          alt="hero img"
          width={734}
          height={596}
          className=" bottom-0"
        />
      </div>
    </div>
  );
};

export default Billboard;
