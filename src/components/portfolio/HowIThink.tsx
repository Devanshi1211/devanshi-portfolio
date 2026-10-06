import { motion, useReducedMotion } from "framer-motion";

const STEPS = [
  { key: "QUESTION", note: "frame the problem" },
  { key: "DATA", note: "collect · clean" },
  { key: "ANALYSIS", note: "explore · engineer" },
  { key: "MODEL", note: "train · evaluate" },
  { key: "SOLUTION", note: "visualise · decide" },
];

/** Illustrative data-science workflow — a generic method sequence, not a claim. */
export function HowIThink() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="How I think" className="relative border-y border-border py-16">
      <div className="mx-auto max-w-6xl px-5">
        <p className="eyebrow-mono">How I think</p>
        <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          A question becomes data, data becomes a model, a model becomes a decision.
        </h2>

        <div className="relative mt-10">
          <svg
            aria-hidden
            viewBox="0 0 1000 24"
            preserveAspectRatio="none"
            className="absolute left-0 top-3 hidden h-6 w-full md:block"
          >
            <line
              x1="0"
              y1="12"
              x2="1000"
              y2="12"
              stroke="color-mix(in oklab, var(--foreground) 14%, transparent)"
              strokeWidth="1"
            />
            {!reduce && (
              <line
                className="flow-line"
                x1="0"
                y1="12"
                x2="1000"
                y2="12"
                stroke="var(--hemi-bridge)"
                strokeWidth="1.5"
              />
            )}
          </svg>

          <ol className="relative grid gap-6 md:grid-cols-5">
            {STEPS.map((s, i) => (
              <motion.li
                key={s.key}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full border border-border bg-background">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background:
                        i < 2 ? "var(--hemi-left)" : i > 2 ? "var(--hemi-right)" : "var(--hemi-bridge)",
                    }}
                  />
                </span>
                <p className="mt-4 font-display text-base font-semibold tracking-tight">{s.key}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {s.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
