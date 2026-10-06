import { useEffect, useState } from "react";
import { FileText, Menu, X } from "lucide-react";
import { NAV } from "@/lib/portfolio-data";
import { ThemeToggle } from "./ThemeToggle";
import { ModeToggle } from "./ExperienceMode";
import { RESUME_HREF } from "./Hero";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.body.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.querySelector(n.href)).filter(
      Boolean,
    ) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.2, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const activeLabel = NAV.find((n) => n.href === active)?.label ?? "Home";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 lg:bottom-0 lg:right-auto lg:w-[9.5rem] lg:border-r lg:border-[#EDE5CF] lg:bg-white",
        scrolled ? "bg-[#FFFDF7]/90 py-2 backdrop-blur-xl lg:bg-white" : "bg-transparent py-3.5 lg:bg-white",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 lg:h-full lg:flex-col lg:items-start lg:px-7 lg:py-5">
        <a href="#home" className="flex items-center gap-2 text-[#24221D]">
          <span className="hero-monogram text-2xl font-bold text-[#24221D]">DC</span>
          <span className="text-[0.6rem] uppercase tracking-[0.22em] text-[#6F6A5F] lg:hidden">
            / {activeLabel}
          </span>
        </a>

        <nav className="hidden w-full flex-1 flex-col justify-center gap-1.5 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-lg px-2.5 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.13em] transition-all duration-200",
                active === item.href
                  ? "bg-[#FFF3C4] text-[#D9A91A]"
                  : "text-[#6F6A5F] hover:bg-[#FFF9EC] hover:text-[#24221D]",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:absolute lg:left-[calc(100vw-8rem)] lg:top-5">
          <a
            href={RESUME_HREF}
            {...(RESUME_HREF.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            className="hidden items-center gap-1.5 rounded-full border border-hero-line bg-hero-control px-3 py-1.5 text-[0.72rem] text-hero-foreground backdrop-blur transition-colors hover:bg-accent sm:inline-flex lg:hidden"
          >
            <FileText className="h-3.5 w-3.5" /> Resume
          </a>
          <ModeToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        aria-hidden
        className="mt-2 h-px w-full origin-left bg-[linear-gradient(90deg,var(--hemi-left),var(--hemi-bridge),var(--hemi-right))] lg:absolute lg:bottom-0 lg:left-0 lg:mt-0"
        style={{ transform: `scaleX(${progress})` }}
      />

      <div
        className={cn(
          "overflow-hidden px-5 transition-all duration-300 lg:hidden",
          open ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mt-3 grid gap-1 rounded-2xl border border-border bg-surface p-2">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <a
            href={RESUME_HREF}
            {...(RESUME_HREF.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
