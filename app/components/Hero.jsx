"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const phrases = ["Hicham", "a fullstack web developer"];
  const [element, setElement] = useState("");

  //le temps de sommeil entre chaque mots
  let sleepTime = 100;

  let curPhraseIndex = 0;

  //la fonction doit etre asynchrone car elle attends l'arrivée des autres mots
  const writeLoop = async () => {
    while (true) {
      //tant que c'est a true tu continue la logique...
      let curWord = phrases[curPhraseIndex];

      for (let i = 0; i < curWord.length; i++) {
        setElement(curWord.substring(0, i + 10));
        //correspond au tend d'attente au début de l'écriture de chaque mot
        await sleep(sleepTime);
      }
      //correspond au temps d'attente après l'écriture de chaque mot
      await sleep(sleepTime * 10);

      //le reverse pour passer au mot suivant
      for (let i = curWord.length; i > 0; i--) {
        setElement(curWord.substring(0, i - 10));
        await sleep(sleepTime);
      }
      await sleep(sleepTime * 5);

      //ici la condition permet de passer au mot suivant et de recommencer si on arrive à la fin du tableau
      if (curPhraseIndex === phrases.length - 1) {
        setElement("Hicham");
        return;
      } else {
        curPhraseIndex++;
      }
    }
  };
  useEffect(() => {
    writeLoop();
  }, []);
  return (
    <section className="relative w-full h-screen mx:auto">
      {/* //la div qui va contenir le bureau et tout le contenu qui va avec*/}
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row
      items-start gap-5`}
      >
        {/* la div  qui contient le point rouge et le trait violet*/}

        <div className="flex flex-col justify-center items-center mt-5">
          {/* //le point rond en haut a gauche du canvas */}
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          {/* //le trait en dessous du point violet */}
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* //le texte de présentation à coté du trait violet */}
        <div>
          <h1 className={`${styles.heroHeadText} text-white xs:text-md`}>
            Hi, I&#39;m
            <span className="text-[#915eff] ml-2">{element}</span>
            <span id="cursor">|</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user{" "}
            <br className="sm:block hidden md:block" /> interfaces and web
            applications.
          </p>
        </div>
      </div>

      <ComputersCanvas />

      {/* //la petite animation arrondis qui mene a la section suivante */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <Link
          href="#about"
          aria-label="un lien qui mene vers la section suivante"
          title="un lien qui mene vers la section about"
        >
          <div className="flex justify-center items-start w-[35px] h-[64px] rounded-3xl border-4 border-secondary p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "Loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
