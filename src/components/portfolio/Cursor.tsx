import { useEffect, useRef } from "react";
import { useExperienceMode } from "./ExperienceMode";

export function Cursor() {
  const { mode } = useExperienceMode();
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (mode === "recruiter") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    document.documentElement.classList.add("has-custom-cursor");
    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], input, textarea, [data-cursor]",
      ) as HTMLElement | null;
      const r = ring.current;
      if (!r) return;
      const kind = el?.dataset?.["cursor"];
      if (kind) {
        r.style.width = "72px";
        r.style.height = "72px";
        if (label.current) label.current.textContent = kind;
      } else if (el) {
        r.style.width = "52px";
        r.style.height = "52px";
        if (label.current) label.current.textContent = "";
      } else {
        r.style.width = "34px";
        r.style.height = "34px";
        if (label.current) label.current.textContent = "";
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (dot.current)
        dot.current.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
      if (ring.current) {
        const s = ring.current.offsetWidth / 2;
        ring.current.style.transform = `translate3d(${pos.x - s}px, ${pos.y - s}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [mode]);

  if (mode === "recruiter") return null;

  return (
    <div aria-hidden className="hidden md:block">
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring grid place-items-center">
        <span
          ref={label}
          className="text-[9px] font-semibold uppercase tracking-[0.16em] text-white"
        />
      </div>
    </div>
  );
}
