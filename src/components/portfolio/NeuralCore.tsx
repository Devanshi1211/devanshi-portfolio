import { useEffect, useRef } from "react";
import { useExperienceMode } from "./ExperienceMode";

type Node = { x: number; y: number; vx: number; vy: number; tx: number; ty: number; h: number };

/**
 * Lightweight 2D neural core: particles drift in, settle into a structure,
 * and link into a network. Canvas-only (no WebGL) so it is cheap on mobile.
 */
export function NeuralCore({ density = 1 }: { density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { mode } = useExperienceMode();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const still = reduce || mode === "recruiter";

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let t = 0;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const base = w < 640 ? 46 : w < 1024 ? 78 : 110;
      const count = Math.round(base * density);
      const r = Math.min(w, h) * 0.34;

      nodes = Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + (i % 3) * 0.4;
        const shell = 0.55 + ((i * 37) % 45) / 100;
        const tx = w / 2 + Math.cos(a) * r * shell * 1.35;
        const ty = h / 2 + Math.sin(a) * r * shell;
        return {
          x: still ? tx : w / 2 + (Math.random() - 0.5) * w,
          y: still ? ty : h / 2 + (Math.random() - 0.5) * h,
          vx: 0,
          vy: 0,
          tx,
          ty,
          h: tx < w / 2 ? 0 : 1,
        };
      });
    };

    const colorFor = (n: Node, alpha: number) => {
      const mid = 1 - Math.min(1, Math.abs(n.tx - w / 2) / (w * 0.35));
      if (mid > 0.6) return `rgba(139,92,246,${alpha})`;
      return n.h === 0 ? `rgba(79,70,229,${alpha})` : `rgba(217,70,239,${alpha})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 1;

      for (const n of nodes) {
        if (!still) {
          const ease = 0.045;
          n.vx = (n.vx + (n.tx - n.x) * ease) * 0.82;
          n.vy = (n.vy + (n.ty - n.y) * ease) * 0.82;
          n.x += n.vx + Math.sin((t + n.tx) * 0.006) * 0.12;
          n.y += n.vy + Math.cos((t + n.ty) * 0.006) * 0.12;
        }
      }

      const linkDist = Math.min(w, h) * 0.14;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.strokeStyle = colorFor(a, 0.16 * (1 - d / linkDist));
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const pulse = still ? 1 : 0.75 + Math.sin((t + n.tx) * 0.02) * 0.25;
        ctx.fillStyle = colorFor(n, 0.75);
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.5 * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!still) raf = requestAnimationFrame(draw);
    };

    build();
    draw();

    const onResize = () => {
      build();
      if (still) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [density, mode]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
