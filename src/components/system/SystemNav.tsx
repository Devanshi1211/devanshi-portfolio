import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutGrid } from "lucide-react";
import { LINKS } from "@/lib/portfolio-data";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { ModeToggle } from "@/components/portfolio/ExperienceMode";
import { STATES } from "./primitives";
import { cn } from "@/lib/utils";

export const RESUME_HREF =
  LINKS.resume && !LINKS.resume.includes("RESUME_PDF_URL") ? LINKS.resume : "#impact";

const MAP_LINKS = [
  { id: "observe", items: ["Profile", "Education", "Focus areas"] },
  { id: "question", items: ["What I build", "How I solve", "Technologies"] },
  { id: "discover", items: ["Skill network", "Where each skill is used"] },
  { id: "create", items: ["Projects", "Pipelines", "Code & demos"] },
  { id: "impact", items: ["Experience", "Certifications", "Achievements", "Contact"] },
];

export function SystemNav() {
  const [active, setActive] = useState<string>("home");
  const [mapOpen, setMapOpen] = useState(false);

  useEffect(() => {
    const ids = ["home", ...STATES.map((s) => s.id)];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((e): e is HTMLElement => Boolean(e));
    const io = new IntersectionObserver(
      (entries) => {
        const best = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (best?.target.id) setActive(best.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.15, 0.5] },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMapOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass-bar">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <a href="#home" className="leading-tight">
            <span className="block font-display text-sm font-semibold tracking-tight">
              Devanshi Chauhan
            </span>
            <span className="block font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
              Data Science Engineer
            </span>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {STATES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.24em] transition-colors",
                  active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="mr-1.5 opacity-50">{s.num}</span>
                {s.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={RESUME_HREF}
              {...(RESUME_HREF.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="hidden rounded-full border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
            >
              Resume
            </a>
            <a
              href="#impact"
              className="hidden rounded-full bg-primary px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground sm:inline-flex"
            >
              Contact
            </a>
            <ModeToggle />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMapOpen(true)}
              aria-label="Open system map"
              className="grid h-8 w-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mapOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-md"
            onClick={() => setMapOpen(false)}
          >
            <div
              className="mx-auto flex h-full max-w-5xl flex-col justify-center px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  System map
                </span>
                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  aria-label="Close system map"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
                {STATES.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={() => setMapOpen(false)}
                    className="group bg-background p-6 transition-colors hover:bg-accent"
                  >
                    <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground">
                      {s.num}
                    </span>
                    <p className="mt-3 font-display text-xl font-semibold uppercase">{s.name}</p>
                    <ul className="mt-4 space-y-1.5">
                      {MAP_LINKS[i]?.items.map((it) => (
                        <li key={it} className="text-xs text-muted-foreground">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </a>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={RESUME_HREF}
                  {...(RESUME_HREF.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  onClick={() => setMapOpen(false)}
                  className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary"
                >
                  Resume
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
