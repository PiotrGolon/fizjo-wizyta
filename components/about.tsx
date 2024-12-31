"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
export default function About() {
  return (
    <motion.div
      className="mb-28 max-w-[45rem] mx-auto mt-24 text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="about"
    >
      <SectionHeading>Tomasz Deput</SectionHeading>
      <p className="mb-3 text-blue-800">
        Po ukończeniu studiów na kierunku{" "}
        <span className="font-medium">fizjoterapia</span>, postanowiłem rozwijać
        swoją pasję do pracy z ludźmi. Zrealizowałem szereg kursów
        specjalistycznych, gdzie nauczyłem się{" "}
        <span className="font-medium">
          zaawansowanych technik rehabilitacyjnych
        </span>
        . <span className="italic">Moim ulubionym aspektem pracy</span> jest
        pomaganie pacjentom w powrocie do zdrowia i poprawie jakości życia. Moją
        specjalizacją są{" "}
        <span className="font-medium">
          terapia manualna, rehabilitacja ortopedyczna oraz fizykoterapia
        </span>
        . Znam również techniki terapii powięziowej oraz kinesiotapingu. Zawsze
        szukam nowych wyzwań i możliwości doskonalenia swoich umiejętności.
        Obecnie poszukuję możliwości pracy na{" "}
        <span className="font-medium">pełny etat</span> jako fizjoterapeuta.
      </p>

      <p className="text-blue-800 mt-2">
        <span className="italic">Kiedy nie pracuję</span>, lubię spędzać czas
        aktywnie, grając w tenisa oraz biegając. Fascynuje mnie również{" "}
        <span className="font-medium">
          nauka nowych technik rehabilitacyjnych
        </span>
        . Obecnie zgłębiam wiedzę na temat{" "}
        <span className="font-medium">osteopatii i terapii manualnej</span>.
        Poza tym, w wolnym czasie uczę się gry na pianinie.
      </p>
    </motion.div>
  );
}
