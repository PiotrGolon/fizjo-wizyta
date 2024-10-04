import Image from "next/image";
import React from "react";
import AboutCard from "./about-card";

const PhysioDecription = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:gap-x-4">
      <div className="flex justify-center min-w-[399px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-400 to-green-500 rounded-xl">
        <Image
          src="/images/doc1.png"
          alt="physio image"
          width={532}
          height={752}
        />
      </div>
      <div className="mx-4 lg:mx-0">
        <AboutCard
          title="Tomasz Deput"
          description="mgr fizjoterapii"
          content="mgr Tomasz Deput has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies."
          footerDescription="Koszt wizyty: 150 zł"
        />
      </div>
    </div>
  );
};

export default PhysioDecription;
