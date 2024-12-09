import Image from "next/image";

const Page = () => {
  return (
    <div className="flex justify-center items-center my-20">
      {/* Kontener z pozycjonowaniem względnym */}
      <div className="relative">
        {/* Obraz */}
        <Image
          src={"/magnify-glass.svg"}
          alt="magnify glass"
          width={430}
          height={430}
        />
        {/* Napis z pozycjonowaniem absolutnym */}
        <p className="absolute inset-0 flex items-center justify-center mr-40 -mt-32 text-black text-2xl font-bold">
          <span className="ml-10 mr-2">OD</span>
          <span className="text-7xl ml-5 mr-2">KRYW</span>
          <span className="ml-6 mr-2">CY</span>
        </p>
      </div>
    </div>
  );
};

export default Page;
