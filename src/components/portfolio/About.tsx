import { useEffect, useState } from "react";
import {
  BarChart3,
  Brain,
  Code2,
  Eye,
  Globe,
  Sparkles,
  X,
  ArrowRight,
} from "lucide-react";
import { WHAT_I_DO, type WhatIDoCard } from "@/lib/portfolio-data";
import { Reveal, SectionHeading } from "./Reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  "data-analysis": BarChart3,
  "machine-learning": Brain,
  "ai-nlp": Sparkles,
  "computer-vision": Eye,
  "problem-solving": Code2,
  "web-app-projects": Globe,
};

const colorVar: Record<WhatIDoCard["color"], string> = {
  coral: "var(--coral)",
  amber: "var(--amber)",
  emerald: "var(--emerald)",
  violet: "var(--violet)",
};

function WhatIDoModal({
  card,
  onClose,
}: {
  card: WhatIDoCard;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const Icon = iconMap[card.id];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
      className="modal-overlay fixed inset-0 z-[70] flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-panel max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-[#EDE5CF] bg-[#FFFFFF] p-7 text-[#24221D] sm:rounded-3xl shadow-[0_8px_30px_rgba(80,60,20,0.12)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#FFF9EC] border border-[#EDE5CF]"
            >
              {Icon ? <Icon className="h-5 w-5 text-[#D9A91A]" /> : null}
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A91A]">
                What I Do
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-[#24221D]">{card.title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#EDE5CF] bg-[#FFF9EC] text-[#6F6A5F] transition-colors hover:text-[#24221D] hover:border-[#F4C542]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {card.workflow ? (
          <div className="mt-7 flex flex-wrap items-center gap-2">
            {card.workflow.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className="rounded-full border border-[#EDE5CF] bg-[#FFF3C4] px-3 py-1 text-xs font-medium text-[#8B6B08]"
                >
                  {step}
                </span>
                {i < card.workflow!.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-[#9A9488]" />
                )}
              </div>
            ))}
          </div>
        ) : null}

        <p className="mt-7 text-[15px] leading-relaxed text-[#6F6A5F]">
          {card.description}
        </p>

        <h4 className="mt-7 text-sm font-semibold text-[#24221D]">Key areas</h4>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {card.keyAreas.map((area) => (
            <li key={area} className="flex items-start gap-2.5 text-sm text-[#6F6A5F]">
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F4C542]"
              />
              {area}
            </li>
          ))}
        </ul>

        <h4 className="mt-7 text-sm font-semibold text-[#24221D]">Technologies</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {card.tech.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[#EDE5CF] bg-[#FFF9EC] px-3 py-1 text-xs text-[#24221D] transition-colors hover:border-[#F4C542]"
            >
              {t}
            </li>
          ))}
        </ul>

        <h4 className="mt-7 text-sm font-semibold text-[#24221D]">Example work</h4>
        <ul className="mt-3 flex flex-wrap gap-2">
          {card.exampleProjects.map((p) => (
            <li
              key={p}
              className="chip rounded-full border border-[#EDE5CF] bg-[#FFF3C4] px-3 py-1 text-xs text-[#8B6B08]"
            >
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function WhatIDoCard({
  card,
  onSelect,
}: {
  card: WhatIDoCard;
  onSelect: (c: WhatIDoCard) => void;
}) {
  const Icon = iconMap[card.id];

  return (
    <button
      type="button"
      onClick={() => onSelect(card)}
      className="group flex h-full w-full flex-col text-left bg-[#FFFFFF] text-[#24221D] rounded-2xl border border-[#EDE5CF] p-6 shadow-[0_8px_30px_rgba(80,60,20,0.06)] transition-all duration-300 hover:bg-[#FFF8D9] hover:border-[#F4C542] hover:shadow-[0_12px_36px_rgba(244,197,66,0.18)] hover:-translate-y-1"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-xl transition-colors duration-300 bg-[#FFF9EC] border border-[#EDE5CF] group-hover:border-[#F4C542]"
          >
            {Icon ? (
              <Icon
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 text-[#D9A91A]"
              />
            ) : null}
          </span>
          <ArrowRight
            className="h-4 w-4 -rotate-45 text-[#9A9488] opacity-0 transition-all duration-300 group-hover:rotate-0 group-hover:text-[#D9A91A] group-hover:opacity-100"
            aria-hidden
          />
        </div>

        <h3 className="mt-5 font-display text-lg font-bold text-[#24221D]">{card.title}</h3>
        <p className="mt-2 flex-grow text-sm leading-relaxed text-[#6F6A5F]">
          {card.shortDescription}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9A91A] transition-all duration-300 group-hover:gap-2.5">
          Explore <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </button>
  );
}

export function About() {
  const [selected, setSelected] = useState<WhatIDoCard | null>(null);

  return (
    <section id="about" className="scroll-mt-28 py-24 bg-[#FFFDF7] text-[#24221D]">
      <div className="mx-auto max-w-6xl px-5">
        {/* WHAT I DO */}
        <SectionHeading
          title="ABOUT"
          subtitle="A little about me"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT_I_DO.map((card, i) => (
            <Reveal key={card.id} delay={i * 70}>
              <WhatIDoCard card={card} onSelect={setSelected} />
            </Reveal>
          ))}
        </div>


      </div>

      {selected ? <WhatIDoModal card={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}
