import { useEffect, useState } from "react";
import { Brain, X } from "lucide-react";
import { NAV } from "@/lib/portfolio-data";

/**
 * A floating "Brain map" — an at-a-glance neural overview of the site that
 * doubles as fast navigation. Nodes only point at existing sections.
 */
export function BrainMap() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nodes = NAV.filter((n) => n.href !== "#home");
  const cx = 330;
  const cy = 190;
  const rx = 150;
  const ry = 140;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open brain map"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-surface/90 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--hemi-bridge)_55%,var(--border))] hover:shadow-[0_16px_34px_-18px_var(--hemi-bridge)]"
      >
        <Brain className="h-4 w-4 text-hemi-bridge" />
        Brain map
      </button>

      {open && (
        <div
          className="modal-overlay fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            className="modal-panel relative w-full max-w-2xl rounded-3xl border border-border bg-surface p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close brain map"
              className="absolute right-4 top-4 rounded-full border border-border p-1.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Brain map
            </p>
            <h2 className="mt-1 font-display text-xl font-bold">
              Jump anywhere in the portfolio
            </h2>

            <svg
              viewBox="0 0 660 380"
              className="mt-4 w-full"
              role="img"
              aria-label="Interactive map of portfolio sections"
            >
              <defs>
                <linearGradient id="bm-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--hemi-left)" />
                  <stop offset="50%" stopColor="var(--hemi-bridge)" />
                  <stop offset="100%" stopColor="var(--hemi-right)" />
                </linearGradient>
              </defs>

              {nodes.map((n, i) => {
                const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(a) * rx;
                const y = cy + Math.sin(a) * ry;
                return (
                  <line
                    key={`l-${n.href}`}
                    x1={cx}
                    y1={cy}
                    x2={x}
                    y2={y}
                    stroke="url(#bm-line)"
                    strokeWidth={1.2}
                    opacity={0.5}
                  />
                );
              })}

              <circle cx={cx} cy={cy} r={30} fill="var(--hemi-bridge)" opacity={0.16} />
              <circle cx={cx} cy={cy} r={7} fill="var(--hemi-bridge)" />
              <text
                x={cx}
                y={cy + 30}
                textAnchor="middle"
                className="fill-foreground text-[11px] font-semibold uppercase tracking-[0.18em]"
              >
                Devanshi
              </text>

              {nodes.map((n, i) => {
                const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
                const x = cx + Math.cos(a) * rx;
                const y = cy + Math.sin(a) * ry;
                const left = Math.cos(a) < -0.2;
                const right = Math.cos(a) > 0.2;
                return (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={13}
                      fill="var(--hemi-bridge)"
                      opacity={0.14}
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={5}
                      fill={
                        Math.cos(a) < 0 ? "var(--hemi-left)" : "var(--hemi-right)"
                      }
                    />
                    <text
                      x={left ? x - 14 : right ? x + 14 : x}
                      y={y + 4}
                      textAnchor={left ? "end" : right ? "start" : "middle"}
                      className="fill-foreground text-[12px] font-medium"
                    >
                      {n.label}
                    </text>
                  </a>
                );
              })}
            </svg>

            <p className="mt-2 text-center text-xs text-muted-foreground">
              Tap a node to go straight to that section.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
