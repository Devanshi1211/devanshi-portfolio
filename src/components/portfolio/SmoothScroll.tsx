import { useEffect } from "react";
import { useExperienceMode } from "./ExperienceMode";

export function SmoothScroll() {
  const { mode } = useExperienceMode();

  useEffect(() => {
    if (mode === "recruiter") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let destroy: (() => void) | undefined;
    let cancelled = false;

    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.4 });
      let raf = 0;
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement | null)?.closest(
          "a[href^='#']",
        ) as HTMLAnchorElement | null;
        const hash = a?.getAttribute("href");
        if (!hash || hash === "#") return;
        const el = document.querySelector(hash);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -96 });
      };
      document.addEventListener("click", onClick);

      destroy = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("click", onClick);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, [mode]);

  return null;
}
