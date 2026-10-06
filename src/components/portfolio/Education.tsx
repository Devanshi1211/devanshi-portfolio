import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e?.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─── data ─────────────────────────────────── */
const milestones = [
  {
    id: "c10",
    index: "01",
    period: "2020 – 2021",
    title: "Class 10",
    titleSuffix: null as string | null,
    board: "SSC Board",
    institution: null as string | null,
    score: "97.91%",
    accent: false,
  },
  {
    id: "c12",
    index: "02",
    period: "2022 – 2023",
    title: "Class 12",
    titleSuffix: "PCM" as string | null,
    board: "HSC Board",
    institution: null as string | null,
    score: "89%",
    accent: false,
  },
  {
    id: "bt",
    index: "03",
    period: "2023 – 2027",
    title: "B.Tech",
    titleSuffix: null as string | null,
    board: "Information Technology",
    institution: "Sigma University, Vadodara" as string | null,
    score: "9.85 / 10",
    accent: true,
  },
];

/* ─── component ─────────────────────────────── */
export function Education() {
  const { ref: hRef, visible: hVis } = useInView(0.05);
  const [hov, setHov] = useState<string | null>(null);

  return (
    <section id="education" className="edu-section scroll-mt-28">
      <style>{`
        .edu-section { padding: 5rem 0 7rem; }
        .edu-wrap { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

        /* Header */
        .edu-eyebrow {
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.26em;
          text-transform: uppercase; color: var(--color-primary);
          display: block; margin-bottom: 1rem;
        }
        .edu-h2 {
          font-family: var(--font-display);
          font-size: clamp(1.85rem, 3.5vw, 2.75rem);
          font-weight: 700; letter-spacing: -0.025em; line-height: 1.15;
          color: var(--color-foreground); margin: 0 0 0.8rem;
        }
        .edu-desc {
          font-size: 0.88rem; color: var(--color-muted-foreground);
          max-width: 500px; line-height: 1.7; margin: 0;
        }

        /* Journey */
        .edu-journey { margin-top: 4rem; position: relative; }
        .edu-hline {
          position: absolute; top: 26px; left: 0; right: 0; height: 1px;
          background: linear-gradient(
            to right,
            transparent 0%,
            color-mix(in oklab, var(--color-muted-foreground) 20%, transparent) 6%,
            color-mix(in oklab, var(--color-muted-foreground) 20%, transparent) 94%,
            transparent 100%
          );
          pointer-events: none; z-index: 0;
        }

        /* Equal 3-column grid — strict 1fr each */
        .edu-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0 1.75rem;
          position: relative; z-index: 1;
          align-items: stretch; /* ensure equal heights */
        }

        /* Node */
        .edu-node { display: flex; flex-direction: column; cursor: default; }

        /* Dot + year */
        .edu-node-head {
          display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.25rem;
        }
        .edu-dot {
          width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0;
          background: color-mix(in oklab, var(--color-muted-foreground) 48%, transparent);
          outline: 1.5px solid color-mix(in oklab, var(--color-muted-foreground) 28%, transparent);
          outline-offset: 2.5px;
          transition: background 0.22s ease, outline-color 0.22s ease;
        }
        .edu-dot--accent {
          background: var(--color-primary);
          outline-color: color-mix(in oklab, var(--color-primary) 40%, transparent);
        }
        .edu-node--hov .edu-dot {
          background: var(--color-primary);
          outline-color: color-mix(in oklab, var(--color-primary) 42%, transparent);
        }
        .edu-year {
          font-size: 0.67rem; font-weight: 500; letter-spacing: 0.07em;
          color: var(--color-muted-foreground); font-variant-numeric: tabular-nums;
          transition: color 0.22s ease;
        }
        .edu-year--accent { color: var(--color-primary); }
        .edu-node--hov .edu-year { color: var(--color-foreground); }

        /* ═══ Unified card — ALL three identical ═══ */
        .edu-card {
          border: 1px solid color-mix(in oklab, var(--color-muted-foreground) 14%, transparent);
          border-radius: 10px;
          padding: 1.5rem;
          background: color-mix(in oklab, var(--color-foreground) 2%, transparent);
          transition: border-color 0.22s ease, transform 0.25s ease;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .edu-card--hov {
          border-color: color-mix(in oklab, var(--color-primary) 30%, transparent);
          transform: translateY(-4px);
        }
        /* B.Tech: only a subtle accent border, no size difference */
        .edu-card--accent {
          border-color: color-mix(in oklab, var(--color-primary) 22%, transparent);
          background: color-mix(in oklab, var(--color-primary) 3%, transparent);
          position: relative; overflow: hidden;
        }
        .edu-card--accent::before {
          content: ""; position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(
            to right,
            transparent,
            color-mix(in oklab, var(--color-primary) 50%, transparent) 50%,
            transparent
          );
        }
        .edu-card--accent.edu-card--hov {
          border-color: color-mix(in oklab, var(--color-primary) 44%, transparent);
        }

        /* Title */
        .edu-title {
          font-family: var(--font-display);
          font-size: 0.95rem; font-weight: 700; letter-spacing: 0.04em;
          text-transform: uppercase; color: var(--color-foreground);
          margin: 0 0 0.25rem; line-height: 1.2;
        }
        .edu-sfx {
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.06em;
          text-transform: uppercase; color: var(--color-muted-foreground);
        }

        /* Board */
        .edu-board {
          font-size: 0.76rem; color: var(--color-muted-foreground); margin: 0 0 0.12rem;
        }
        /* Institution (only B.Tech has this — keeps same layout slot) */
        .edu-inst {
          font-size: 0.72rem;
          color: color-mix(in oklab, var(--color-muted-foreground) 65%, transparent);
          margin: 0 0 0.12rem;
        }
        /* Blank spacer so cards without institution stay same height */
        .edu-inst-blank { height: 1.1rem; display: block; }

        /* Period */
        .edu-period {
          font-size: 0.67rem;
          color: color-mix(in oklab, var(--color-muted-foreground) 52%, transparent);
          font-variant-numeric: tabular-nums; margin: 0;
        }

        /* Score — always at bottom via fixed top margin */
        .edu-score-wrap {
          margin-top: auto; /* Pushes to bottom */
          padding-top: 1rem;
        }
        .edu-score {
          font-family: var(--font-display);
          font-size: 1.55rem; font-weight: 700;
          color: var(--color-foreground); line-height: 1;
          font-variant-numeric: tabular-nums;
          transition: color 0.22s ease;
        }
        .edu-card--hov .edu-score { color: var(--color-primary); }

        /* ── Mobile vertical timeline ── */
        .edu-vstack {
          display: none; flex-direction: column; margin-top: 3rem;
          padding-left: 1.25rem; gap: 0;
          border-left: 1px solid color-mix(in oklab, var(--color-muted-foreground) 18%, transparent);
        }
        .edu-vnode {
          position: relative; padding: 0 0 2.25rem 1.5rem;
          transition: transform 0.22s ease;
        }
        .edu-vnode:last-child { padding-bottom: 0; }
        .edu-vnode--hov { transform: translateX(3px); }
        .edu-vdot {
          position: absolute; left: -1.1rem; top: 0.22rem;
          width: 8px; height: 8px; border-radius: 50%;
          background: color-mix(in oklab, var(--color-muted-foreground) 48%, transparent);
          outline: 1.5px solid color-mix(in oklab, var(--color-muted-foreground) 28%, transparent);
          outline-offset: 2px; transition: background 0.22s, outline-color 0.22s;
        }
        .edu-vdot--accent { background: var(--color-primary); outline-color: color-mix(in oklab, var(--color-primary) 40%, transparent); }
        .edu-vnode--hov .edu-vdot { background: var(--color-primary); outline-color: color-mix(in oklab, var(--color-primary) 40%, transparent); }
        .edu-vyr {
          font-size: 0.63rem; font-weight: 600; letter-spacing: 0.07em;
          color: var(--color-muted-foreground); font-variant-numeric: tabular-nums;
          display: block; margin-bottom: 0.35rem;
        }
        .edu-vyr--accent { color: var(--color-primary); }
        .edu-vtitle {
          font-family: var(--font-display); font-size: 0.92rem; font-weight: 700;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--color-foreground); margin: 0 0 0.2rem;
        }
        .edu-vsub { font-size: 0.74rem; color: var(--color-muted-foreground); margin: 0 0 0.08rem; }
        .edu-vinst { font-size: 0.7rem; color: color-mix(in oklab, var(--color-muted-foreground) 65%, transparent); margin: 0 0 0.5rem; }
        .edu-vscore {
          font-family: var(--font-display); font-size: 1.3rem; font-weight: 700;
          color: var(--color-foreground); font-variant-numeric: tabular-nums;
          transition: color 0.22s;
        }
        .edu-vnode--hov .edu-vscore { color: var(--color-primary); }

        @media (max-width: 680px) {
          .edu-hline, .edu-grid { display: none; }
          .edu-vstack { display: flex; }
          .edu-section { padding: 4rem 0 5.5rem; }
        }
      `}</style>

      <div className="edu-wrap">
        {/* Header */}
        <div
          ref={hRef}
          style={{
            opacity: hVis ? 1 : 0,
            transform: hVis ? "none" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="edu-eyebrow">03 — ACADEMIC BACKGROUND</span>
          <h2 className="edu-h2">Education that shaped how I think.</h2>
          <p className="edu-desc">
            A strong academic foundation built through consistency, curiosity and continuous learning.
          </p>
        </div>

        {/* Desktop */}
        <div className="edu-journey">
          <div className="edu-hline" />
          <div className="edu-grid">
            {milestones.map((m, i) => (
              <div
                key={m.id}
                className="edu-node"
                onMouseEnter={() => setHov(m.id)}
                onMouseLeave={() => setHov(null)}
                style={{
                  opacity: hVis ? 1 : 0,
                  transform: hVis ? "none" : "translateY(22px)",
                  transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                }}
              >
                {/* dot + year */}
                <div className="edu-node-head">
                  <span className={cn("edu-dot", m.accent && "edu-dot--accent")} />
                  <span className={cn("edu-year", m.accent && "edu-year--accent")}>{m.period}</span>
                </div>

                {/* Identical card for all three */}
                <div className={cn(
                  "edu-card",
                  hov === m.id && "edu-card--hov",
                  m.accent && "edu-card--accent",
                )}>
                  <h3 className="edu-title">
                    {m.title}
                    {m.titleSuffix && <span className="edu-sfx"> · {m.titleSuffix}</span>}
                  </h3>

                  <p className="edu-board">{m.board}</p>

                  {/* Institution row — blank spacer keeps height equal for non-B.Tech cards */}
                  {m.institution
                    ? <p className="edu-inst">{m.institution}</p>
                    : <span className="edu-inst-blank" />
                  }

                  <p className="edu-period">{m.period}</p>

                  <div className="edu-score-wrap">
                    <div className="edu-score">{m.score}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="edu-vstack">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={cn("edu-vnode", hov === m.id && "edu-vnode--hov")}
              onMouseEnter={() => setHov(m.id)}
              onMouseLeave={() => setHov(null)}
            >
              <span className={cn("edu-vdot", m.accent && "edu-vdot--accent")} />
              <span className={cn("edu-vyr", m.accent && "edu-vyr--accent")}>{m.period}</span>
              <h3 className="edu-vtitle">
                {m.title}
                {m.titleSuffix && (
                  <span style={{ fontSize: "0.68rem", fontWeight: 500, color: "var(--color-muted-foreground)" }}> · {m.titleSuffix}</span>
                )}
              </h3>
              <p className="edu-vsub">{m.board}</p>
              {m.institution && <p className="edu-vinst">{m.institution}</p>}
              <div className="edu-vscore" style={{ marginTop: "0.55rem" }}>{m.score}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
