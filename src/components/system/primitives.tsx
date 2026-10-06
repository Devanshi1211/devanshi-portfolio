import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const STATES = [
  { id: "observe", num: "01", name: "Observe", caption: "Raw signal becomes a pattern" },
  { id: "question", num: "02", name: "Question", caption: "Query the system" },
  { id: "discover", num: "03", name: "Discover", caption: "Knowledge network" },
  { id: "create", num: "04", name: "Create", caption: "Experiments and systems" },
  { id: "impact", num: "05", name: "Impact", caption: "Evidence and outcome" },
] as const;

export type StateId = (typeof STATES)[number]["id"];

/** Numbered state header — the only recurring structural motif of the site. */
export function StateHeader({
  num,
  name,
  caption,
  lead,
}: {
  num: string;
  name: string;
  caption: string;
  lead?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <header className="relative">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">{num}</span>
        <span className="h-px flex-1 bg-[linear-gradient(90deg,color-mix(in_oklab,var(--hemi-left)_60%,transparent),color-mix(in_oklab,var(--hemi-right)_40%,transparent),transparent)]" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {caption}
        </span>
      </div>
      <motion.h2
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-display text-[13vw] font-bold uppercase leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl"
      >
        {name}
      </motion.h2>
      {lead ? (
        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">{lead}</p>
      ) : null}
    </header>
  );
}

export function StateSection({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 border-t border-border/70 px-5 py-24 sm:py-32",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function Mono({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Flat, borderless row — replaces the old card grid everywhere. */
export function Row({
  children,
  onClick,
  active,
  className,
}: {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  const base = cn(
    "group w-full border-b border-border/60 py-5 text-left transition-colors duration-300",
    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
    className,
  );
  if (!onClick) return <div className={base}>{children}</div>;
  return (
    <button type="button" onClick={onClick} className={base}>
      {children}
    </button>
  );
}
