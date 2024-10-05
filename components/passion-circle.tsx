import Image from "next/image";
import PassionItem from "./passion-item";

const PassionCircle = () => {
  return (
    <div className="flex flex-col  lg:grid lg:grid-cols-[1fr_2fr_3fr_2fr_1fr]">
      <div></div>
      <div className="flex flex-col gap-y-4 justify-between items-center my-16 ">
        <PassionItem text="Rehabilitacja" margin="lg:ml-10" />
        <PassionItem text="Mobilizacja" margin="lg:mr-20" />
        <PassionItem text="Kinezjologia" margin="lg:ml-10" />
      </div>
      <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 to-green-500 rounded-full overflow-hidden shadow-xl max-w-[526px] lg:min-w-[375px] mx-auto">
        <Image
          src="/images/doc1.png"
          alt="about me image"
          width={526}
          height={752}
          className=""
        />
      </div>
      <div className="flex flex-col gap-y-4 justify-between items-center my-16 ">
        <PassionItem text="Biomechanika" margin="lg:mr-10" />
        <PassionItem text="Terapia manualna" margin="lg:ml-20" />
        <PassionItem text="Neuromobilizacja" margin="lg:mr-10" />
      </div>
      <div></div>
    </div>
  );
};

export default PassionCircle;
