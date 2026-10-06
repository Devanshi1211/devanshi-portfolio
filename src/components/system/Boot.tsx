import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperienceMode } from "@/components/portfolio/ExperienceMode";

const STAGES = [
  "Collecting signals…",
  "Finding patterns…",
  "Learning…",
  "Intelligence online",
];

/**
 * Cinematic boot: a single point, then scattered signal, then structure.
 * Plays once per session, skippable, and disabled for recruiter/reduced motion.
 */
export function Boot() {
  const { mode } = useExperienceMode();
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (mode === "recruiter") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("boot-played")) return;
    sessionStorage.setItem("boot-played", "1");
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, [mode]);

  useEffect(() => {
    if (!open) return;
    const timers = [
      setTimeout(() => setStage(1), 1500),
      setTimeout(() => setStage(2), 3000),
      setTimeout(() => setStage(3), 4400),
      setTimeout(() => close(), 5900),
    ];
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = (c.width = window.innerWidth * dpr);
    const h = (c.height = window.innerHeight * dpr);
    const N = 320;
    const cx = w / 2;
    const cy = h / 2;

    const pts = Array.from({ length: N }, () => {
      const a = Math.random() * Math.PI * 2;
      const r = (Math.min(w, h) / 2.4) * Math.sqrt(Math.random());
      return {
        x: cx,
        y: cy,
        tx: cx + Math.cos(a) * r,
        ty: cy + Math.sin(a) * r,
        cluster: Math.floor(Math.random() * 3),
        hue: Math.random(),
      };
    });

    const centers = [
      { x: cx - Math.min(w, h) * 0.22, y: cy - Math.min(w, h) * 0.06 },
      { x: cx, y: cy + Math.min(w, h) * 0.12 },
      { x: cx + Math.min(w, h) * 0.22, y: cy - Math.min(w, h) * 0.06 },
    ];

    let raf = 0;
    const start = performance.now();

    const draw = () => {
      const t = (performance.now() - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      pts.forEach((p, i) => {
        let tx = p.tx;
        let ty = p.ty;
        if (t > 2.6) {
          const c0 = centers[p.cluster]!;
          const k = Math.min(1, (t - 2.6) / 1.4);
          tx = p.tx + (c0.x + Math.cos(i) * 70 * dpr - p.tx) * k;
          ty = p.ty + (c0.y + Math.sin(i * 1.7) * 70 * dpr - p.ty) * k;
        }
        p.x += (tx - p.x) * 0.06;
        p.y += (ty - p.y) * 0.06;

        const color =
          p.hue < 0.34 ? "59,130,246" : p.hue < 0.68 ? "139,92,246" : "217,70,239";
        ctx.fillStyle = `rgba(${color},${0.35 + Math.min(0.5, t / 6)})`;
        ctx.fillRect(p.x, p.y, 1.6 * dpr, 1.6 * dpr);
      });

      if (t > 3.6) {
        ctx.lineWidth = 0.5 * dpr;
        for (let i = 0; i < pts.length; i += 3) {
          const a = pts[i]!;
          const b = pts[(i + 7) % pts.length]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120 * dpr) {
            ctx.strokeStyle = `rgba(196,181,253,${(1 - d / (120 * dpr)) * 0.28})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [open]);

  const close = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center bg-background"
        >
          <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />

          <div className="relative text-center">
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mx-auto block h-1.5 w-1.5 rounded-full bg-foreground"
            />
            <div className="mt-10 h-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={stage}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45 }}
                  className="font-mono text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
                >
                  {STAGES[stage]}
                </motion.p>
              </AnimatePresence>
            </div>

            {stage >= 3 ? (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8"
              >
                <p className="font-display text-3xl font-bold sm:text-5xl">Devanshi Chauhan</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.34em] text-primary">
                  Data Science Engineer
                </p>
              </motion.div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={close}
            className="absolute bottom-8 right-6 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip intro
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
