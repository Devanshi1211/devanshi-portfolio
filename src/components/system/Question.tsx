import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WHAT_I_DO } from "@/lib/portfolio-data";
import { StateHeader, StateSection, Mono } from "./primitives";
import { cn } from "@/lib/utils";

export function Question() {
  const [active, setActive] = useState(0);
  const card = WHAT_I_DO[active]!;

  return (
    <StateSection id="question">
      <StateHeader
        num="02"
        name="Question"
        caption="Ask the system"
        lead="Pick a question. The answer is my actual practice in that area — how I work, what I use, and where it has been applied."
      />

      <div className="mt-14 flex flex-wrap gap-2">
        {WHAT_I_DO.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
              i === active
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            How do you do {c.title.toLowerCase()}?
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_1fr]"
        >
          <div>
            <h3 className="font-display text-3xl font-bold">{card.title}</h3>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              {card.description}
            </p>

            {card.workflow ? (
              <div className="mt-9">
                <Mono>Workflow</Mono>
                <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-3">
                  {card.workflow.map((w, i) => (
                    <span key={w} className="flex items-center gap-2">
                      <span className="rounded-full border border-border px-3 py-1 text-xs text-foreground/85">
                        {w}
                      </span>
                      {i < card.workflow!.length - 1 ? (
                        <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      ) : null}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-9">
            <div>
              <Mono>Key areas</Mono>
              <ul className="mt-4 space-y-2.5">
                {card.keyAreas.map((k) => (
                  <li key={k} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                    {k}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Mono>Technologies</Mono>
              <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                {card.tech.join(" · ")}
              </p>
            </div>

            <div>
              <Mono>Applied in</Mono>
              <ul className="mt-4 space-y-2">
                {card.exampleProjects.map((p) => (
                  <li key={p} className="text-sm text-muted-foreground">
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#create"
                className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-primary"
              >
                See the builds <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </StateSection>
  );
}
