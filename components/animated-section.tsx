"use client";
import { motion, useAnimation, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { AnimatedSectionProps } from "@/types";
import { useEffect } from "react";

const AnimatedSection = ({
  imageSrc,
  altText,
  title,
  description,
  reverse = false,
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
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Obraz */}
        <motion.div
          className="w-full"
          initial="hidden"
          animate={controls}
          variants={imageVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src={imageSrc}
              alt={altText}
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* Tekst */}
        <motion.div
          className="w-full"
          initial="hidden"
          animate={controls}
          variants={textVariants}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4 text-green-500">
            {title}
          </h3>
          <p className="text-green-700">{description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedSection;
