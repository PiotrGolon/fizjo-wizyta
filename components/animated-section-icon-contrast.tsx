"use client";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { AnimatedSectionIconProps } from "@/types";
import { useEffect } from "react";

const AnimatedSectionIconContrast = ({
  imageSrc,
  altText,
  title,
  description,
  notes,
  preferations,
  reverse = true,
}: AnimatedSectionIconProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: reverse ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div ref={ref} className="my-16">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Obraz */}
        <motion.div
          className={`flex justify-center lg:justify-start lg:-ml-8  ${
            reverse ? "lg:order-2" : "lg:order-1"
          }`}
          initial="hidden"
          animate={controls}
          variants={imageVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex h-24 w-24 bg-green-500 md:h-48 md:w-48 lg:h-60 lg:w-60 rounded-full p-5">
            <Image
              src={imageSrc}
              alt={altText}
              width={350}
              height={350}
              objectFit="cover"
              className="flex justify-center items-center"
            />
          </div>
        </motion.div>

        {/* Tekst */}
        <motion.div
          className={`text-center lg:text-right w-full lg:-ml-10 ${
            reverse ? "lg:order-1" : "lg:order-2"
          }`}
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-500">
            {title}
          </h3>
          <p className="text-green-700">{description}</p>
          {notes && <p className="text-green-800 text-sm mt-2">{notes}</p>}
          {preferations && (
            <p className="text-green-800 text-sm mt-2">{preferations}</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedSectionIconContrast;
