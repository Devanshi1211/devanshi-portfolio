import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Mouse } from "lucide-react";
import { LINKS, ROLES } from "@/lib/portfolio-data";

export const RESUME_HREF = LINKS.resume.startsWith("http") ? LINKS.resume : "#contact";

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);
  return (
    <span key={i} className="animate-fade-in text-gradient-brand">
      {ROLES[i]}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="home" className="portrait-hero relative min-h-[100svh] overflow-hidden">
      <div className="portrait-hero__shade absolute inset-0" aria-hidden />
      <div className="portrait-hero__content relative flex min-h-[100svh] flex-col justify-center px-6 pb-28 pt-28 sm:px-10 lg:ml-[9.5rem] lg:w-[43rem] lg:px-12 lg:pb-24 lg:pt-16">
        <motion.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-script text-2xl text-primary sm:text-3xl"
        >
          Enter my mind →
        </motion.p>

        <motion.h1
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-name mt-5 max-w-xl text-[clamp(4rem,9vw,7.7rem)] font-semibold leading-[0.79]"
        >
          Devanshi
          <br />
          Chauhan
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="hero-script mt-8 text-3xl text-primary sm:text-5xl"
        >
          <RoleRotator />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-7 max-w-md text-sm leading-relaxed text-hero-muted sm:text-base"
        >
          Turning data into insights, and ideas into intelligent solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="hero-cta inline-flex items-center gap-5 rounded-full px-6 py-3 text-sm font-medium transition-transform duration-300 hover:-translate-y-1"
          >
            Explore My Work <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-6 z-10 flex items-center gap-3 text-xs text-hero-muted sm:left-10 lg:left-[10.5rem]"
      >
        <span className="grid h-11 w-7 place-items-center rounded-full border border-current">
          <Mouse className="h-3.5 w-3.5" />
        </span>
        Scroll to explore
        <span className="hidden h-px w-24 bg-current sm:block" />
        <ArrowDown className="h-3.5 w-3.5 sm:hidden" />
      </a>
    </section>
  );
}
