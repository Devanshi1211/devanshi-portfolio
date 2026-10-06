import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUpRight, CheckCircle2, Zap, ExternalLink } from "lucide-react";
import { COMPETITIONS, type Competition } from "@/lib/portfolio-data";
import { SectionHeading } from "./Reveal";

/* ── Clean organization & year mapping ── */
const META_MAP: Record<string, { org: string; year: string }> = {
  "gsc-2026": { org: "Google Developer Program", year: "2026" },
  "craftathon-2026": { org: "Gandhinagar University", year: "2026" },
  "urfu-hackatom": { org: "Ural Federal University", year: "2026" },
};

/* ── 1-2 line short descriptions for compact cards ── */
const SHORT_DESC: Record<string, string> = {
  "gsc-2026": "AI-powered NGO resource allocation & volunteer matching platform.",
  "craftathon-2026": "Selected as a Finalist in a 2-day offline AI hackathon.",
  "urfu-hackatom": "International AI project developed with multicultural teams in Russia.",
};

/* ══════════════════════════════════════
   DETAIL MODAL
══════════════════════════════════════ */
function HackModal({ c, onClose }: { c: Competition; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-[#24221D]/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <motion.div
        className="bg-[#FFFFFF] border border-[#EDE5CF] text-[#24221D] rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-[0_12px_40px_rgba(80,60,20,0.15)]"
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        aria-label={c.title}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-bold text-[#D9A91A]">
              {c.index}
            </span>
            <span
              className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F4C542] text-[#24221D] flex items-center gap-1.5"
            >
              {c.ongoing && <span className="h-1.5 w-1.5 rounded-full bg-[#24221D] animate-pulse" />}
              {c.status}
            </span>
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

        <h3 className="text-[#24221D] font-bold text-xl mb-1">{c.title}</h3>
        <p className="text-[#D9A91A] text-xs font-semibold mb-4">{c.subtitle}</p>

        <div className="h-px w-full bg-[#EDE5CF] mb-4" />

        <p className="text-[#6F6A5F] text-sm leading-relaxed mb-6">{c.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#D9A91A] mb-2">Key Contributions</p>
            <ul className="space-y-1.5 text-xs text-[#6F6A5F]">
              {c.contributions.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#D9A91A]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#D9A91A] mb-2">Impact</p>
            <ul className="space-y-1.5 text-xs text-[#6F6A5F]">
              {c.impact.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#D9A91A]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex flex-wrap gap-1.5 mb-4">
          {c.tags.map((t) => (
            <li key={t} className="border border-[#EDE5CF] bg-[#FFF9EC] text-[#D9A91A] text-xs px-2.5 py-0.5 rounded-md font-mono font-medium">
              {t}
            </li>
          ))}
        </ul>

        {c.proofLabel && c.proofImage && (
          <a
            href={c.proofImage}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9A91A] hover:text-[#24221D] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {c.proofLabel}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   COMPACT HACKATHON CARD
══════════════════════════════════════ */
function HackCard({ c, idx, onOpen }: { c: Competition; idx: number; onOpen: () => void }) {
  const meta = META_MAP[c.id] ?? { org: c.subtitle, year: "2026" };
  const shortDesc = SHORT_DESC[c.id] ?? c.subtitle;

  return (
    <motion.button
      type="button"
      className="group flex flex-col justify-between w-full h-[210px] p-5 rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] text-left shadow-[0_4px_20px_rgba(80,60,20,0.04)] transition-all duration-300 hover:bg-[#FFF9EC] hover:border-[#F4C542] hover:shadow-[0_8px_24px_rgba(244,197,66,0.18)] hover:-translate-y-[3px] cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35, delay: idx * 0.08 }}
      onClick={onOpen}
      aria-label={`View details: ${c.title}`}
    >
      {/* Top row: Number + Status (if finalist/ongoing) + Arrow */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] font-bold text-[#D9A91A] tracking-wider">
              {c.index}
            </span>
            {c.status && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F4C542] text-[#24221D]">
                {c.status}
              </span>
            )}
          </div>
          <ArrowUpRight className="h-4 w-4 text-[#D9A91A] transition-transform duration-300 group-hover:text-[#24221D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Title */}
        <h3 className="font-display font-bold text-[18px] text-[#24221D] leading-tight mb-1 group-hover:text-[#D9A91A] transition-colors truncate">
          {c.title}
        </h3>

        {/* Small Metadata: Organization · Year */}
        <p className="text-[12px] font-medium text-[#9A9488] mb-2 truncate">
          {meta.org} · {meta.year}
        </p>

        {/* Short description: Maximum 1-2 lines */}
        <p className="text-[13px] text-[#6F6A5F] leading-snug line-clamp-2">
          {shortDesc}
        </p>
      </div>

      {/* Bottom: 2-3 small technology tags */}
      <ul className="flex flex-wrap gap-1.5 pt-2">
        {c.tags.slice(0, 3).map((t) => (
          <li
            key={t}
            className="text-[11px] font-mono font-medium text-[#D9A91A] border border-[#EDE5CF] bg-[#FFF9EC] px-2 py-0.5 rounded"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}

/* ══════════════════════════════════════
   SECTION
══════════════════════════════════════ */
export function Competitions() {
  const [open, setOpen] = useState<Competition | null>(null);

  return (
    <section id="competitions" className="scroll-mt-28 bg-[#FFFDF7] text-[#24221D] py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <SectionHeading
          title="HACKATHONS"
          subtitle="Challenges I've taken on"
        />

        {/* ── 3-column compact grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {COMPETITIONS.map((c, i) => (
            <HackCard key={c.id} c={c} idx={i} onOpen={() => setOpen(c)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <HackModal c={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  );
}


