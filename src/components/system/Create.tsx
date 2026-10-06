import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/portfolio-data";
import { StateHeader, StateSection, Mono } from "./primitives";
import { cn } from "@/lib/utils";

const isReal = (url: string) => Boolean(url) && url.startsWith("http");

function Pipeline({ project }: { project: Project }) {
  const stages = [
    { key: "Signal", body: <p className="text-sm text-muted-foreground">{project.tagline}</p> },
    { key: "Approach", body: <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p> },
    {
      key: "Build",
      body: (
        <ul className="space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
              {h}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "Stack",
      body: (
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1 text-xs text-foreground/80">
              {s}
            </span>
          ))}
        </div>
      ),
    },
  ];
  if (project.impact) {
    stages.push({
      key: "Outcome",
      body: <p className="text-sm leading-relaxed text-muted-foreground">{project.impact}</p>,
    });
  }

  return (
    <div className="mt-8">
      {stages.map((s, i) => (
        <motion.div
          key={s.key}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: i * 0.07 }}
          className="relative grid gap-3 border-t border-border/70 py-6 sm:grid-cols-[130px_1fr]"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            <Mono>{s.key}</Mono>
          </div>
          <div>{s.body}</div>
        </motion.div>
      ))}
    </div>
  );
}

export function Create() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active]!;

  return (
    <StateSection id="create">
      <StateHeader
        num="04"
        name="Create"
        caption="The laboratory"
        lead={`${PROJECTS.length} builds. Select one on the left and watch its pipeline assemble — signal, approach, build, stack.`}
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Mono>Experiments</Mono>
          <div className="mt-4">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActive(i)}
                className={cn(
                  "group flex w-full items-baseline gap-4 border-b border-border/60 py-4 text-left transition-colors",
                  i === active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] opacity-60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-medium">{p.name}</span>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] opacity-60">
                    {p.category}
                  </span>
                </span>
                <span
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-opacity",
                    i === active ? "bg-primary opacity-100" : "bg-primary opacity-0",
                  )}
                  aria-hidden
                />
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="h-40 w-full rounded-2xl"
              style={{
                background: `linear-gradient(135deg, color-mix(in oklab, ${project.visual.from} 70%, transparent), color-mix(in oklab, ${project.visual.to} 70%, transparent))`,
              }}
              aria-hidden
            />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {project.visual.caption}
            </p>

            <h3 className="mt-6 font-display text-4xl font-bold tracking-tight">{project.name}</h3>

            <Pipeline project={project} />

            {(isReal(project.demo) || isReal(project.code)) && (
              <div className="mt-6 flex flex-wrap gap-3">
                {isReal(project.demo) ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground"
                  >
                    Live demo <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : null}
                {isReal(project.code) ? (
                  <a
                    href={project.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Github className="h-3 w-3" /> Code
                  </a>
                ) : null}
              </div>
            )}
          </motion.article>
        </AnimatePresence>
      </div>
    </StateSection>
  );
}
