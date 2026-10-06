import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS, type Project } from "@/lib/portfolio-data";
import { SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

import thumbNeurotrace from "@/assets/proj-neurotrace.jpg";
import thumbSevasync from "@/assets/proj-sevasync.jpg";
import thumbViralai from "@/assets/proj-viralai.jpg";
import thumbMovie from "@/assets/proj-movie.jpg";
import thumbRoyalcare from "@/assets/proj-royalcare.jpg";
import thumbSpam from "@/assets/proj-spam.jpg";
import thumbStudy from "@/assets/proj-study-planner.jpg";
import thumbSkillmap from "@/assets/proj-skillmap.jpg";
import thumbChat from "@/assets/proj-chat.jpg";

const THUMBS: Record<string, string> = {
  neurotrace: thumbNeurotrace,
  sevasync: thumbSevasync,
  viralai: thumbViralai,
  "movie-recsys": thumbMovie,
  royalcare: thumbRoyalcare,
  "spam-detection": thumbSpam,
  "study-planner": thumbStudy,
  skillmap: thumbSkillmap,
  "ai-chat-assistant": thumbChat,
};

/** Flagship nodes render larger in the galaxy. */
const FLAGSHIP = new Set(["neurotrace", "sevasync", "viralai"]);

const hasLink = (url: string) => /^https?:\/\//.test(url);

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto bg-background/95 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="mx-auto max-w-4xl px-5 py-20">
        <button
          type="button"
          onClick={onClose}
          className="fixed right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface"
          aria-label="Close case study"
        >
          <X className="h-4 w-4" />
        </button>

        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="eyebrow-mono">{project.category}</p>
          <h3 className="mt-3 font-display text-3xl font-bold sm:text-5xl">{project.name}</h3>
          <p className="mt-3 text-base text-muted-foreground">{project.tagline}</p>

          {THUMBS[project.id] ? (
            <img
              src={THUMBS[project.id]}
              alt={`${project.name} visual`}
              loading="lazy"
              className="mt-8 aspect-[16/8] w-full rounded-2xl border border-border object-cover"
            />
          ) : null}

          <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow-mono">Overview</p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{project.summary}</p>

              <p className="eyebrow-mono mt-8">Approach &amp; features</p>
              <ul className="mt-3 space-y-2.5">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--hemi-bridge)]" />
                    {h}
                  </li>
                ))}
              </ul>

              {project.impact ? (
                <>
                  <p className="eyebrow-mono mt-8">Outcome</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.impact}
                  </p>
                </>
              ) : null}
            </div>

            <div>
              <p className="eyebrow-mono">Tech</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-2">
                {hasLink(project.demo) ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                  >
                    Live project <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                {hasLink(project.code) ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm"
                  >
                    <Github className="h-4 w-4" /> Source
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );
  const open = PROJECTS.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="scroll-mt-28 py-24 bg-[#FFFDF7] text-[#24221D]">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          title="PROJECTS"
          subtitle="Things I've built"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 cursor-pointer",
                filter === f
                  ? "border-transparent bg-[#F4C542] text-[#24221D] shadow-[0_4px_16px_rgba(244,197,66,0.35)]"
                  : "border-[#EDE5CF] bg-[#FFFFFF] text-[#6F6A5F] hover:text-[#24221D] hover:border-[#F4C542]",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setOpenId(p.id)}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3) }}
              data-cursor="open"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] p-3.5 text-left shadow-[0_8px_30px_rgba(80,60,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F4C542] hover:shadow-[0_12px_36px_rgba(244,197,66,0.18)] cursor-pointer"
            >
              {/* Dedicated 7:6 aspect ratio cover image banner */}
              <div className="relative w-full aspect-[7/6] overflow-hidden rounded-xl bg-[#FFFDF7] border border-[#EDE5CF]/60">
                {THUMBS[p.id] ? (
                  <img
                    src={THUMBS[p.id]}
                    alt={p.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFFDF7] to-[#F4C542]/20 font-mono text-xs text-[#D9A91A]">
                    {p.name}
                  </div>
                )}
              </div>

              {/* Card info below cover image */}
              <div className="flex flex-1 flex-col justify-between pt-3.5 px-1 pb-1 gap-2">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#D9A91A]">{p.category}</span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-[#24221D] group-hover:text-[#D9A91A] transition-colors leading-snug">
                    {p.name}
                  </h3>
                  <p className="line-clamp-2 text-xs text-[#6F6A5F] leading-relaxed">
                    {p.tagline}
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-[#D9A91A] group-hover:text-[#24221D] transition-colors">
                  View case study →
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open ? <CaseStudy project={open} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}
