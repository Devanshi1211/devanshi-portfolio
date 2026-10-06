import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronRight, Calendar } from "lucide-react";
import { ACHIEVEMENTS, TOP_ACHIEVEMENT, type Achievement } from "@/lib/portfolio-data";
import { SectionHeading } from "./Reveal";

/* ─────────────── All achievements in display order ─────────────── */
const ALL: Achievement[] = [TOP_ACHIEVEMENT, ...ACHIEVEMENTS];

/* ─────────────── Category badge labels ─────────────── */
const CATEGORY_LABELS: Record<Achievement["category"], string> = {
  Academic:      "RESEARCH",
  Technical:     "TECHNICAL",
  Hackathon:     "HACKATHON",
  International: "INTERNATIONAL",
  Ongoing:       "INNOVATION",
  Sports:        "SPORTS",
};

/* ─────────────── Year/status label per achievement ─────────────── */
function getYearLabel(a: Achievement): string {
  if (a.title.includes("LeetCode")) return "ONGOING";
  if (a.title.includes("Google Solution")) return "2026";
  if (a.title.includes("Russia") || a.title.includes("Summer University")) return "2026";
  if (a.title.includes("Best Research")) return "2026";
  if (a.title.includes("Gandhinagar") || a.title.includes("Craftathon")) return "2026";
  if (a.title.includes("Tech Mahindra")) return "2025";
  if (a.title.includes("AI/ML Project")) return "2024–2025";
  if (a.title.includes("Mathematics")) return "2024";
  if (a.title.includes("Badminton")) return "2023";
  if (a.title.includes("Kho Kho")) return "2023";
  return "";
}

/* ─────────────── Detail Modal ─────────────── */
function DetailModal({ item, onClose }: { item: Achievement; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const yearLabel = getYearLabel(item);

  return (
    <motion.div
      className="fixed inset-0 z-[85] grid place-items-center bg-[#24221D]/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <motion.div
        className="ach-modal bg-[#FFFFFF] border border-[#EDE5CF] text-[#24221D] rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-[0_12px_40px_rgba(80,60,20,0.12)]"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#D9A91A]" />
              <span className="text-xs font-mono font-bold tracking-wider text-[#D9A91A] uppercase">
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
            <h3 className="text-[#24221D] font-bold text-xl leading-snug">{item.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full border border-[#EDE5CF] text-[#6F6A5F] hover:text-[#24221D] hover:bg-[#FFF8E7] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px w-full bg-[#EDE5CF] mb-4" />

        {/* Detail text */}
        <p className="text-[#6F6A5F] text-sm leading-relaxed mb-6">{item.detail}</p>

        {/* Points */}
        {item.points?.length ? (
          <ul className="space-y-2 mb-6 text-xs text-[#6F6A5F]">
            {item.points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A91A] mt-1.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Tags */}
        {item.tags?.length ? (
          <ul className="flex flex-wrap gap-1.5 mb-6">
            {item.tags.map((t) => (
              <li key={t} className="border border-[#EDE5CF] bg-[#FFF9EC] text-[#D9A91A] text-xs px-2.5 py-0.5 rounded-md font-mono font-medium">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#EDE5CF] text-xs gap-2">
          {yearLabel && (
            <span className="flex items-center gap-1.5 font-mono text-[#6F6A5F] shrink-0">
              <Calendar className="h-3.5 w-3.5 text-[#D9A91A]" />
              {yearLabel}
            </span>
          )}
          {item.meta && (
            <span className="font-semibold text-[#D9A91A] bg-[#FFF8E7] px-2.5 py-0.5 rounded border border-[#F4C542]/40 truncate max-w-[65%]">{item.meta}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────── Achievement Card ─────────────── */
function AchCard({ a, idx, onOpen }: { a: Achievement; idx: number; onOpen: () => void }) {
  const yearLabel = getYearLabel(a);

  return (
    <motion.article
      className="group flex flex-col w-full p-6 rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] text-[#24221D] shadow-[0_4px_20px_rgba(80,60,20,0.04)] transition-all duration-300 hover:bg-[#FFF9EC] hover:border-[#F4C542] hover:shadow-[0_8px_24px_rgba(244,197,66,0.18)] hover:-translate-y-[3px] cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.35) }}
      role="button"
      tabIndex={0}
      aria-label={`View details: ${a.title}`}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
    >
      {/* Top indicator row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#D9A91A]" />
          <span className="text-xs font-mono font-bold tracking-wider text-[#D9A91A] uppercase">
            {CATEGORY_LABELS[a.category]}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-[#9A9488] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#D9A91A]" />
      </div>

      {/* 1. Title */}
      <h3 className="font-display text-base font-bold text-[#24221D] mb-2 leading-snug group-hover:text-[#D9A91A] transition-colors">
        {a.title}
      </h3>

      {/* 2. Short supporting description */}
      <p className="text-xs leading-relaxed text-[#6F6A5F] line-clamp-3 mb-4">{a.detail}</p>

      {/* Spacer */}
      <div className="flex-1 min-h-[0.5rem]" />

      {/* 3. Year / Category footer */}
      <div className="flex items-center justify-between pt-3 border-t border-[#EDE5CF] text-xs gap-2 min-w-0">
        {yearLabel && (
          <span className="flex items-center gap-1.5 font-mono text-xs text-[#9A9488] shrink-0">
            <Calendar className="h-3 w-3 text-[#D9A91A]" />
            {yearLabel}
          </span>
        )}
        <span className="text-[11px] font-semibold text-[#D9A91A] bg-[#FFF8E7] px-2 py-0.5 rounded border border-[#F4C542]/40 truncate max-w-[65%] shrink">
          {a.meta || "Milestone"}
        </span>
      </div>
    </motion.article>
  );
}

/* ─────────────── Section ─────────────── */
export function Achievements() {
  const [open, setOpen] = useState<Achievement | null>(null);

  return (
    <section id="achievements" className="ach-section scroll-mt-28 bg-[#FFFDF7] text-[#24221D] py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <SectionHeading
          title="ACHIEVEMENTS"
          subtitle="Milestones I've reached"
        />

        {/* Achievement grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {ALL.map((a, i) => (
            <li key={a.title} className="flex">
              <AchCard a={a} idx={i} onOpen={() => setOpen(a)} />
            </li>
          ))}
        </ul>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {open ? <DetailModal item={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}

