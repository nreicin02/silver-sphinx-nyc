"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

// Hero piece enters with a slow settle. Communicates: this is the thing to look at first.
export function HeroImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="plate relative aspect-square w-full overflow-hidden md:aspect-[5/4]"
      initial={reduce ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image src={src} alt={alt} fill priority sizes="(min-width: 768px) 58vw, 100vw" className="object-cover" />
    </motion.div>
  );
}
