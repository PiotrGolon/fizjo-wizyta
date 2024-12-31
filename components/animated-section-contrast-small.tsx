"use client";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatedSectionProps } from "../types/index";

const AnimatedSectionContrastSmall = ({
  imageSrc,
  altText,
  title,
  description,
  reverse = true,
}: AnimatedSectionProps) => {
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
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center`}>
        {/* Obraz */}
        <motion.div
          className={`w-full ${reverse ? "lg:order-2" : "lg:order-1"}`}
          initial="hidden"
          animate={controls}
          variants={imageVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative mx-auto w-1/2 h-1/2 lg:float-left">
            <Image
              src={imageSrc}
              alt={altText}
              width={960}
              height={720}
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
        {/* Tekst */}
        <div className="flex justify-end">
          <motion.div
            className={`w-full lg:w-1/2 text-center lg:text-right ${
              reverse ? "lg:order-1" : "lg:order-2"
            }`}
            initial="hidden"
            animate={controls}
            variants={textVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-blue-500">
              {title}
            </h3>
            <p className="text-blue-700 ">{description}</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedSectionContrastSmall;
