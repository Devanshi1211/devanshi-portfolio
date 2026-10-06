import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import {
  EXPERIENCE,
  CERTIFICATIONS,
  CERT_FILTERS,
  TOP_ACHIEVEMENT,
  ACHIEVEMENTS,
  COMPETITIONS,
  CODING_BADGES,
  ONLINE_PROFILES,
  type Achievement,
} from "@/lib/portfolio-data";
import { StateHeader, StateSection, Mono } from "./primitives";
import { cn } from "@/lib/utils";

function Journey() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mt-6">
      {EXPERIENCE.map((e, i) => {
        const isOpen = open === i;
        return (
          <div key={`${e.org}-${e.role}`} className="border-t border-border/70">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="grid w-full gap-2 py-6 text-left sm:grid-cols-[150px_1fr_auto] sm:items-baseline"
            >
              <Mono>{e.kind}</Mono>
              <span>
                <span className="block font-display text-lg font-semibold">{e.role}</span>
                <span className="block text-sm text-muted-foreground">
                  {e.org} · {e.location}
                </span>
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {e.period}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 sm:pl-[150px]">
                    <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {e.summary}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {e.bullets.map((b) => (
                        <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function Vault() {
  const [filter, setFilter] = useState<(typeof CERT_FILTERS)[number]>("All");
  const [expanded, setExpanded] = useState(false);
  const list = useMemo(
    () => (filter === "All" ? CERTIFICATIONS : CERTIFICATIONS.filter((c) => c.category === filter)),
    [filter],
  );
  const shown = expanded ? list : list.slice(0, 8);

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {CERT_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setExpanded(false);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] transition-colors",
              f === filter
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {f} {f === "All" ? `(${CERTIFICATIONS.length})` : ""}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-x-10 sm:grid-cols-2">
        {shown.map((c) => {
          const href = c.docUrl ?? c.image;
          const Cmp = href ? "a" : "div";
          return (
            <Cmp
              key={c.id}
              {...(href ? { href, target: "_blank", rel: "noreferrer" } : {})}
              className="group flex items-baseline justify-between gap-4 border-b border-border/60 py-4"
            >
              <span>
                <span className="block text-sm text-foreground/90 group-hover:text-primary">
                  {c.title}
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                  {c.issuer}
                </span>
              </span>
              {href ? (
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              ) : null}
            </Cmp>
          );
        })}
      </div>

      {list.length > 8 ? (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-primary"
        >
          {expanded ? "Collapse" : `Show all ${list.length}`}
        </button>
      ) : null}
    </div>
  );
}

function SignalModal({ a, onClose }: { a: Achievement; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={a.title}
      onClick={onClose}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-background/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-border bg-background p-8 sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <Mono>{a.category}</Mono>
            <h3 className="mt-3 font-display text-2xl font-bold">{a.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">{a.detail}</p>
        {a.points?.length ? (
          <ul className="mt-6 space-y-2.5">
            {a.points.map((p) => (
              <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        ) : null}
        {a.tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <span key={t} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}

function Signals() {
  const [open, setOpen] = useState<Achievement | null>(null);
  const all = [TOP_ACHIEVEMENT, ...ACHIEVEMENTS];
  return (
    <div className="mt-6">
      <div className="grid gap-x-10 sm:grid-cols-2">
        {all.map((a, i) => (
          <button
            key={a.title}
            type="button"
            onClick={() => setOpen(a)}
            className="group flex items-baseline gap-4 border-b border-border/60 py-4 text-left"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex-1">
              <span className="block text-sm text-foreground/90 group-hover:text-primary">
                {a.title}
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {a.category}
              </span>
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open ? <SignalModal a={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

export function Impact() {
  return (
    <StateSection id="impact">
      <StateHeader
        num="05"
        name="Impact"
        caption="Evidence"
        lead="Where the work landed: roles, competitions, credentials, awards and the profiles behind them."
      />

      <div className="mt-16">
        <Mono>Journey</Mono>
        <Journey />
      </div>

      <div className="mt-20">
        <Mono>Competitions</Mono>
        <div className="mt-6">
          {COMPETITIONS.map((c) => (
            <div
              key={c.id}
              className="grid gap-3 border-t border-border/70 py-6 sm:grid-cols-[60px_1fr_auto] sm:items-baseline"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                {c.index}
              </span>
              <div>
                <h4 className="font-display text-lg font-semibold">{c.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{c.subtitle}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground/85">
                  {c.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                  {c.status}
                </span>
                {c.proofImage ? (
                  <a
                    href={c.proofImage}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
                  >
                    {c.proofLabel ?? "View certificate"} <ArrowUpRight className="h-3 w-3" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Mono>Knowledge vault · {CERTIFICATIONS.length} certifications</Mono>
        <Vault />
      </div>

      <div className="mt-20">
        <Mono>Signals · awards & recognition</Mono>
        <Signals />
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-2">
        <div>
          <Mono>Coding badges</Mono>
          <div className="mt-5 flex flex-wrap gap-2">
            {CODING_BADGES.map((b) => (
              <span
                key={`${b.platform}-${b.name}`}
                className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground"
              >
                {b.name}
                <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.18em] opacity-60">
                  {b.platform}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div>
          <Mono>Profiles</Mono>
          <div className="mt-5 grid gap-x-8 sm:grid-cols-2">
            {ONLINE_PROFILES.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-baseline justify-between gap-3 border-b border-border/60 py-3"
              >
                <span>
                  <span className="block text-sm group-hover:text-primary">{p.name}</span>
                  <span className="block text-xs text-muted-foreground">{p.tagline}</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </StateSection>
  );
}
