import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { EXPERIENCE } from "@/lib/portfolio-data";
import { SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="experience" className="scroll-mt-28 py-24">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Experience"
          title="The path so far"
          description="One connected route through internship, international programme and leadership work. Select a stop to expand it."
        />

        <div className="relative mt-12 pl-8 sm:pl-14">
          <div
            aria-hidden
            className="absolute left-[9px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--hemi-left),var(--hemi-bridge),var(--hemi-right))] sm:left-[19px]"
          />

          <ol className="space-y-4">
            {EXPERIENCE.map((e, i) => {
              const isOpen = open === i;
              return (
                <motion.li
                  key={`${e.org}-${e.role}`}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative"
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-8 top-5 grid h-[19px] w-[19px] place-items-center rounded-full border bg-background transition-colors sm:-left-14",
                      isOpen ? "border-[var(--hemi-bridge)]" : "border-border",
                    )}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: isOpen ? "var(--hemi-bridge)" : "var(--muted-foreground)",
                      }}
                    />
                  </span>

                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className={cn(
                      "w-full rounded-2xl border px-5 py-5 text-left transition-colors",
                      isOpen ? "border-[color-mix(in_oklab,var(--hemi-bridge)_45%,var(--border))]" : "border-border hover:bg-accent/40",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="eyebrow-mono">{e.kind}</span>
                      <span className="text-xs text-muted-foreground">{e.period}</span>
                    </div>
                    <div className="mt-2 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                          {e.role}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {e.org} · <MapPin className="inline h-3 w-3" /> {e.location}
                        </p>
                      </div>
                      <ChevronDown
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                          isOpen && "rotate-180",
                        )}
                      />
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                            {e.summary}
                          </p>
                          <ul className="mt-4 space-y-2">
                            {e.bullets.map((b) => (
                              <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--hemi-bridge)]" />
                                {b}
                              </li>
                            ))}
                          </ul>
                          <ul className="mt-4 flex flex-wrap gap-2">
                            {e.tags.map((t) => (
                              <li key={t} className="chip">
                                {t}
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </button>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
