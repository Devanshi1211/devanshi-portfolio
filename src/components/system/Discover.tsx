import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SKILL_GROUPS, SOFT_SKILLS, PROJECTS, EXPERIENCE } from "@/lib/portfolio-data";
import { StateHeader, StateSection, Mono } from "./primitives";
import { cn } from "@/lib/utils";

const W = 900;
const H = 620;
const CX = W / 2;
const CY = H / 2;
const r2 = (n: number) => Math.round(n * 100) / 100;

type Node = { id: string; label: string; group: string; x: number; y: number };

function useGraph() {
  return useMemo(() => {
    const hubs: Node[] = [];
    const leaves: Node[] = [];
    const n = SKILL_GROUPS.length;
    SKILL_GROUPS.forEach((g, gi) => {
      const a = (gi / n) * Math.PI * 2 - Math.PI / 2;
      const hx = r2(CX + Math.cos(a) * 205);
      const hy = r2(CY + Math.sin(a) * 190);
      hubs.push({ id: `h:${g.title}`, label: g.title, group: g.title, x: hx, y: hy });

      g.items.forEach((item, i) => {
        const spread = Math.PI * 0.85;
        const t = g.items.length === 1 ? 0 : i / (g.items.length - 1) - 0.5;
        const aa = a + t * spread;
        const rr = 78 + (i % 3) * 26;
        leaves.push({
          id: `s:${g.title}:${item}`,
          label: item,
          group: g.title,
          x: r2(hx + Math.cos(aa) * rr),
          y: r2(hy + Math.sin(aa) * rr),
        });
      });
    });
    return { hubs, leaves };
  }, []);
}

function usage(skill: string) {
  const key = skill.toLowerCase();
  const projects = PROJECTS.filter((p) =>
    p.stack.some((s) => s.toLowerCase().includes(key) || key.includes(s.toLowerCase())),
  );
  const experience = EXPERIENCE.filter((e) =>
    e.tags.some((t) => t.toLowerCase().includes(key) || key.includes(t.toLowerCase())),
  );
  return { projects, experience };
}

export function Discover() {
  const { hubs, leaves } = useGraph();
  const [selected, setSelected] = useState<Node | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const focusGroup = selected?.group ?? hovered;
  const links = selected ? usage(selected.label) : null;

  return (
    <StateSection id="discover">
      <StateHeader
        num="03"
        name="Discover"
        caption="Knowledge network"
        lead="Skills are not a bar chart. Tap any node to see exactly where that skill has been used — in a project, in a role, or both."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.35fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-border/70">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full touch-pan-y">
            {hubs.map((h) => (
              <line
                key={`c-${h.id}`}
                x1={CX}
                y1={CY}
                x2={h.x}
                y2={h.y}
                stroke="var(--border)"
                strokeWidth={1}
              />
            ))}
            {leaves.map((l) => {
              const h = hubs.find((x) => x.group === l.group)!;
              const dim = focusGroup !== null && focusGroup !== l.group;
              return (
                <line
                  key={`e-${l.id}`}
                  x1={h.x}
                  y1={h.y}
                  x2={l.x}
                  y2={l.y}
                  stroke={dim ? "var(--border)" : "color-mix(in oklab, var(--primary) 45%, transparent)"}
                  strokeWidth={0.8}
                  opacity={dim ? 0.35 : 1}
                />
              );
            })}

            <circle cx={CX} cy={CY} r={30} fill="var(--primary)" opacity={0.12} />
            <circle cx={CX} cy={CY} r={5} fill="var(--primary)" />
            <text
              x={CX}
              y={CY + 48}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[11px] uppercase tracking-[0.24em]"
            >
              Skill graph
            </text>

            {hubs.map((h) => (
              <g
                key={h.id}
                onMouseEnter={() => setHovered(h.group)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle cx={h.x} cy={h.y} r={7} fill="var(--hemi-bridge)" />
                <text
                  x={h.x}
                  y={h.y - 14}
                  textAnchor="middle"
                  className="fill-foreground font-mono text-[10px] uppercase tracking-[0.16em]"
                >
                  {h.label}
                </text>
              </g>
            ))}

            {leaves.map((l) => {
              const dim = focusGroup !== null && focusGroup !== l.group;
              const on = selected?.id === l.id;
              return (
                <g
                  key={l.id}
                  className="cursor-pointer"
                  onClick={() => setSelected(on ? null : l)}
                  onMouseEnter={() => setHovered(l.group)}
                  onMouseLeave={() => setHovered(null)}
                  opacity={dim ? 0.3 : 1}
                >
                  <circle cx={l.x} cy={l.y} r={on ? 5 : 3} fill={on ? "var(--primary)" : "var(--hemi-left)"} />
                  <text
                    x={l.x}
                    y={l.y - 8}
                    textAnchor="middle"
                    className={cn(
                      "font-mono text-[8.5px]",
                      on ? "fill-primary" : "fill-muted-foreground",
                    )}
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={selected?.id ?? "empty"}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
            >
              {selected && links ? (
                <>
                  <Mono>{selected.group}</Mono>
                  <h3 className="mt-3 font-display text-3xl font-bold">{selected.label}</h3>

                  <div className="mt-8">
                    <Mono>Used in projects</Mono>
                    {links.projects.length ? (
                      <ul className="mt-3">
                        {links.projects.map((p) => (
                          <li key={p.id} className="border-b border-border/60 py-3">
                            <a href="#create" className="text-sm hover:text-primary">
                              {p.name}
                              <span className="ml-2 text-xs text-muted-foreground">
                                {p.category}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="mt-3 text-sm text-muted-foreground">
                        Part of my toolkit; not tagged on a listed project.
                      </p>
                    )}
                  </div>

                  {links.experience.length ? (
                    <div className="mt-8">
                      <Mono>Used in experience</Mono>
                      <ul className="mt-3">
                        {links.experience.map((e) => (
                          <li key={e.org} className="border-b border-border/60 py-3 text-sm">
                            {e.role} — {e.org}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <Mono>No node selected</Mono>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                    The centre is the core. Around it sit {SKILL_GROUPS.length} domains and every
                    skill inside them. Select one to trace it through my work.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12">
            <Mono>Working style</Mono>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {SOFT_SKILLS.map((s) => (
                <span key={s.title} className="text-xs text-muted-foreground">
                  {s.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </StateSection>
  );
}
