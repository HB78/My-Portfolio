/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const phrases = ["Hicham", "a fullstack web developer"];
  const [element, setElement] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const writeLoop = useCallback(async () => {
    const sleepTime = 100;
    let curPhraseIndex = 0;

    while (isTyping) {
      const curWord = phrases[curPhraseIndex];

      // Écriture
      for (let i = 0; i < curWord.length; i++) {
        setElement(curWord.substring(0, i + 1));
        await sleep(sleepTime);
      }
      await sleep(sleepTime * 10);

      // Effacement
      for (let i = curWord.length; i > 0; i--) {
        setElement(curWord.substring(0, i - 1));
        await sleep(sleepTime);
      }
      await sleep(sleepTime * 5);

      curPhraseIndex = (curPhraseIndex + 1) % phrases.length;
    }
  }, [isTyping]);

  useEffect(() => {
    writeLoop();
    return () => setIsTyping(false);
  }, [writeLoop]);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white xs:text-md`}>
            Hi, I'am
            <span className="text-[#915eff] ml-2">{element}</span>
            <span className="animate-blink">|</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            I develop 3D visuals, user{" "}
            <br className="sm:block hidden md:block" /> interfaces and web
            applications.
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <Link
          href="#about"
          aria-label="Lien vers la section suivante"
          title="Lien vers la section about"
        >
          <motion.div
            className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary p-2 flex justify-center items-start"
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
          >
            <motion.div className="w-3 h-3 rounded-full bg-secondary mb-1" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
