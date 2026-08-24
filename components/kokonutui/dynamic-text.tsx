"use client";

/**
 * @author: @dorianbaffier
 * @description: Dynamic Text
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface Greeting {
  text: string;
  language: string;
}

const greetings: Greeting[] = [
  { text: "Hello", language: "English" },
  { text: "こんにちは", language: "Japanese" },
  { text: "Bonjour", language: "French" },
  { text: "Hola", language: "Spanish" },
  { text: "안녕하세요", language: "Korean" },
  { text: "Ciao", language: "Italian" },
  { text: "Hallo", language: "German" },
  { text: "こんにちは", language: "Japanese" },
];

interface DynamicTextProps {
  onComplete?: () => void;
}

const DynamicText = ({ onComplete }: DynamicTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const completionSent = useRef(false);

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;

        if (nextIndex >= greetings.length) {
          clearInterval(interval);
          setIsAnimating(false);
          return prevIndex;
        }

        return nextIndex;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isAnimating]);

  useEffect(() => {
    if (isAnimating || completionSent.current) return;

    completionSent.current = true;
    const timeout = window.setTimeout(() => onComplete?.(), 450);
    return () => window.clearTimeout(timeout);
  }, [isAnimating, onComplete]);

  // Animation variants for the text
  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -100, opacity: 0 },
  };
  const currentGreeting = greetings[currentIndex] ?? greetings[0]!;

  return (
    <section
      aria-label="Rapid greetings in different languages"
      className="flex min-h-40 w-full items-center justify-center gap-1 p-4 sm:min-h-50"
    >
      <div className="relative flex h-16 w-full max-w-60 items-center justify-center overflow-visible">
        {isAnimating ? (
          <AnimatePresence mode="wait">
            <motion.div
              animate={textVariants.visible}
              aria-live="off"
              className="text-foreground absolute flex items-center gap-2 text-xl font-medium sm:text-2xl"
              exit={textVariants.exit}
              initial={textVariants.hidden}
              key={currentIndex}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div
                aria-hidden="true"
                className="bg-foreground h-2 w-2 rounded-full"
              />
              {currentGreeting.text}
            </motion.div>
          </AnimatePresence>
        ) : (
          <div className="text-foreground flex items-center gap-2 text-xl font-medium sm:text-2xl">
            <div
              aria-hidden="true"
              className="bg-foreground h-2 w-2 rounded-full"
            />
            {currentGreeting.text}
          </div>
        )}
      </div>
    </section>
  );
};

export default DynamicText;
