import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { styles } from "../styles";

const ComputersCanvas = dynamic(() => import("./canvas/ComputersCanvas"), {
  ssr: false,
  loading: () => <p>Chargement du modèle 3D...</p>,
});

const Hero = () => {
  const [element, setElement] = useState("");

  const phrases = useMemo(() => ["Hicham", "a fullstack web developer"], []);
  const sleepTime = 100;

  const sleep = useCallback(
    (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
    []
  );

  const writeLoop = useCallback(async () => {
    let curPhraseIndex = 0;
    while (true) {
      let curWord = phrases[curPhraseIndex];

      for (let i = 0; i < curWord.length; i++) {
        setElement((prevElement) => curWord.substring(0, i + 1));
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 10);

      for (let i = curWord.length; i > 0; i--) {
        setElement((prevElement) => curWord.substring(0, i - 1));
        await sleep(sleepTime);
      }

      await sleep(sleepTime * 5);

      if (curPhraseIndex === phrases.length - 1) {
        setElement("Hicham");
        return;
      } else {
        curPhraseIndex++;
      }
    }
  }, [phrases, sleep]);

  useEffect(() => {
    writeLoop();
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
                repeatType: "loop",
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
