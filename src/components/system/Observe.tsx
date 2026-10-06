import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ACADEMIC_BACKGROUND, RESUME_SUMMARY, LINKS } from "@/lib/portfolio-data";
import { StateHeader, StateSection, Mono } from "./primitives";

/** Deterministic PRNG so server and client render identical coordinates. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const CLUSTERS = [
  { label: "Analysis", cx: 170, cy: 130, color: "var(--hemi-left)" },
  { label: "Models", cx: 400, cy: 200, color: "var(--hemi-bridge)" },
  { label: "Systems", cx: 630, cy: 120, color: "var(--hemi-right)" },
];

function SignalField() {
  const [ordered, setOrdered] = useState(false);
  const points = useMemo(() => {
    const r = rng(20260211);
    return Array.from({ length: 150 }, (_, i) => {
      const c = i % 3;
      const cl = CLUSTERS[c]!;
      const a = r() * Math.PI * 2;
      const rad = 26 + r() * 46;
      return {
        id: i,
        x: Math.round(r() * 760 + 20),
        y: Math.round(r() * 260 + 20),
        tx: Math.round(cl.cx + Math.cos(a) * rad),
        ty: Math.round(cl.cy + Math.sin(a) * rad),
        color: cl.color,
      };
    });
  }, []);

  return (
    <div className="relative">
      <svg viewBox="0 0 800 300" className="w-full" role="img" aria-label="Signal to pattern visual">
        {points.map((p, i) => (
          <motion.circle
            key={p.id}
            r={1.8}
            fill={p.color}
            initial={false}
            animate={{
              cx: ordered ? p.tx : p.x,
              cy: ordered ? p.ty : p.y,
              opacity: ordered ? 0.9 : 0.45,
            }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: (i % 20) * 0.012 }}
          />
        ))}
        {ordered
          ? CLUSTERS.map((c) => (
              <motion.text
                key={c.label}
                x={c.cx}
                y={c.cy + 92}
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="fill-muted-foreground font-mono text-[11px] uppercase tracking-[0.2em]"
              >
                {c.label}
              </motion.text>
            ))
          : null}
      </svg>

      <button
        type="button"
        onClick={() => setOrdered((v) => !v)}
        className="mt-4 rounded-full border border-border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-foreground"
      >
        {ordered ? "Scatter the signal" : "Find the pattern"}
      </button>
    </div>
  );
}

export function Observe() {
  return (
    <StateSection id="observe">
      <StateHeader
        num="01"
        name="Observe"
        caption="Signal in, structure out"
        lead="Everything here starts the same way: noisy information, patiently organised until it means something. Below is who is doing the observing."
      />

      <div className="mt-14">
        <SignalField />
      </div>

      <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Mono>Profile</Mono>
          <ul className="mt-6 space-y-4">
            {RESUME_SUMMARY.map((line) => (
              <li key={line} className="flex gap-4 text-[15px] leading-relaxed">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-muted-foreground">{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
            {LINKS.location}
          </p>
        </div>

        <div>
          <Mono>Education</Mono>
          <div className="mt-6">
            {ACADEMIC_BACKGROUND.map((e, i) => (
              <motion.div
                key={e.degree}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="border-t border-border/70 py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{e.degree}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {e.score}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {e.school} · {e.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                  {e.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </StateSection>
  );
}
