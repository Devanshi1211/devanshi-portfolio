import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { ROLES, STATS, LINKS } from "@/lib/portfolio-data";
import { BrainUniverse } from "@/components/portfolio/BrainUniverse";
import { RESUME_HREF } from "./SystemNav";

const CHAIN = ["Data", "Patterns", "Intelligence", "Impact"];

export function Identity() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden px-5 pb-16 pt-28">
      <div className="pointer-events-none absolute inset-0">
        <BrainUniverse />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100svh-11rem)] max-w-6xl flex-col justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
        >
          A portfolio you explore, not scroll
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[16vw] font-bold uppercase leading-[0.84] tracking-tight sm:text-8xl lg:text-[8.5rem]"
        >
          Devanshi
          <br />
          <span className="text-gradient">Chauhan</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2"
        >
          {CHAIN.map((c, i) => (
            <span key={c} className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-foreground/80">
                {c}
              </span>
              {i < CHAIN.length - 1 ? (
                <span className="h-px w-8 bg-border" aria-hidden />
              ) : null}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
        >
          {ROLES.join(" · ")}. I build machine-learning, deep-learning, NLP and computer-vision
          systems — and turn them into interfaces people can actually use.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#create"
            className="rounded-full bg-primary px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-primary-foreground"
          >
            Explore projects
          </a>
          <a
            href={RESUME_HREF}
            {...(RESUME_HREF.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Resume
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85, duration: 0.9 }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
        >
          {STATS.map((s) => (
            <div key={s.label} className="bg-background/70 px-4 py-5 backdrop-blur-sm">
              <dt className="font-display text-2xl font-bold">{s.value}</dt>
              <dd className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-6xl items-center gap-3 text-muted-foreground">
        <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll — five states, one thought process
        </span>
      </div>
    </section>
  );
}
