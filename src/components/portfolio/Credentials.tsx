import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Flame,
  Trophy,
  X,
  Zap,
} from "lucide-react";
import {
  ACHIEVEMENTS,
  CERTIFICATIONS,
  CERT_FILTERS,
  CODING_BADGES,
  COMPETITIONS,
  RESEARCH_PAPERS,
  TOP_ACHIEVEMENT,
  type Achievement,
  type Certification,
  type CodingBadge,
  type Competition,
  type ResearchPaper,
} from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Reveal";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES & CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */
export type CredentialTab = "CERTIFICATIONS" | "RESEARCH PAPERS" | "BADGES" | "ACHIEVEMENTS" | "HACKATHONS";

const TABS: CredentialTab[] = ["CERTIFICATIONS", "RESEARCH PAPERS", "BADGES", "ACHIEVEMENTS", "HACKATHONS"];

const isPdf = (url?: string) => !!url && /\.pdf($|\?)/i.test(url);

function getCertYear(c: Certification): string {
  if (c.meta) {
    const yearMatch = c.meta.match(/\b(202\d|201\d)\b/);
    if (yearMatch?.[1]) return yearMatch[1];
  }
  if (c.detail) {
    const yearMatch = c.detail.match(/\b(202\d|201\d)\b/);
    if (yearMatch?.[1]) return yearMatch[1];
  }
  return "2026";
}

/* ═══════════════════════════════════════════════════════════════════════════
   1. CERTIFICATIONS TAB COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
function CertRow({
  cert,
  index,
  onClick,
}: {
  cert: Certification;
  index: number;
  onClick: () => void;
}) {
  const numStr = String(index + 1).padStart(2, "0");
  const year = getCertYear(cert);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group w-full rounded-xl border border-[#EDE5CF] bg-[#FFFFFF] p-4 sm:py-5 sm:px-6 text-left shadow-[0_4px_20px_rgba(80,60,20,0.04)] transition-all duration-250 hover:bg-[#FFF9EC] hover:border-[#F4C542] hover:shadow-[0_8px_24px_rgba(244,197,66,0.18)] hover:-translate-y-[2px] cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.2) }}
      aria-label={`Open certificate: ${cert.title}`}
    >
      <div className="hidden sm:flex items-center justify-between gap-4">
        <span className="font-mono text-xs font-bold text-[#D9A91A] group-hover:text-[#24221D] transition-colors w-10 shrink-0">
          {numStr}
        </span>
        <h3 className="font-display font-bold text-base text-[#24221D] group-hover:text-[#D9A91A] transition-colors flex-1 truncate pr-2">
          {cert.title}
        </h3>
        <div className="text-xs text-[#6F6A5F] w-48 shrink-0 truncate">
          <span className="font-medium text-[#24221D]">{cert.issuer}</span>
          <span className="text-[#9A9488] mx-1.5">·</span>
          <span className="text-[#D9A91A] font-mono text-[11px]">{cert.category}</span>
        </div>
        <span className="font-mono text-xs text-[#6F6A5F] w-14 shrink-0 text-right">
          {year}
        </span>
        <ArrowUpRight className="h-4 w-4 text-[#D9A91A] group-hover:text-[#24221D] transition-all duration-300 group-hover:translate-x-1 shrink-0 ml-2" />
      </div>

      <div className="flex sm:hidden flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#D9A91A]">{numStr}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#6F6A5F]">{year}</span>
            <ArrowUpRight className="h-4 w-4 text-[#D9A91A] group-hover:text-[#24221D] transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
        <h3 className="font-display font-bold text-sm text-[#24221D] group-hover:text-[#D9A91A] transition-colors leading-snug">
          {cert.title}
        </h3>
        <p className="text-xs text-[#6F6A5F]">
          {cert.issuer} <span className="text-[#9A9488]">·</span> <span className="text-[#D9A91A]">{cert.category}</span>
        </p>
      </div>
    </motion.button>
  );
}

function CertModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const [imgError, setImgError] = useState(false);

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

  const docTargetUrl = cert.docUrl || cert.image;
  const isPdfDoc = isPdf(docTargetUrl);
  const imageUrl = cert.image && !isPdf(cert.image) ? cert.image : (!isPdfDoc ? docTargetUrl : undefined);

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-black/40 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
    >
      <motion.div
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] p-6 sm:p-8 text-[#24221D] shadow-[0_12px_36px_rgba(80,60,20,0.12)]"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <span className="text-xs font-mono font-bold tracking-widest text-[#D9A91A] uppercase block mb-1">
              {cert.category}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#24221D] leading-tight">{cert.title}</h3>
            <p className="mt-1 text-sm font-medium text-[#D9A91A]">{cert.issuer}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full border border-[#EDE5CF] bg-[#FFF9EC] text-[#6F6A5F] hover:text-[#24221D] hover:border-[#F4C542] transition-colors shrink-0 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px w-full bg-[#EDE5CF] mb-4" />

        <p className="text-sm leading-relaxed text-[#6F6A5F] mb-6">{cert.detail}</p>

        {cert.meta && (
          <p className="text-xs font-mono text-[#9A9488] mb-6">
            {cert.meta}
          </p>
        )}

        {docTargetUrl && (
          <div className="mt-4 mb-2">
            <a
              href={docTargetUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-[#EDE5CF] bg-[#F4C542] px-5 py-3 text-xs font-mono font-bold text-[#24221D] hover:bg-[#E8B82E] transition-all duration-300 shadow-md cursor-pointer"
            >
              <FileText className="h-4 w-4" /> {isPdfDoc ? "View PDF Document" : "View Certificate Document"} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {imageUrl && !imgError && (
          <div className="mt-4 rounded-xl border border-[#EDE5CF] overflow-hidden bg-[#FFFDF7]">
            <img
              src={imageUrl}
              alt={`${cert.title} certificate`}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-auto max-h-[500px] object-contain mx-auto"
            />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function CertificationsView() {
  const [filter, setFilter] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const list = useMemo(
    () =>
      filter === "All"
        ? CERTIFICATIONS
        : CERTIFICATIONS.filter((c) => c.category === filter),
    [filter],
  );
  const visible = showAll ? list : list.slice(0, 9);
  const open = CERTIFICATIONS.find((c) => c.id === openId) ?? null;

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-6 mb-8 border-b border-[#EDE5CF] pb-4">
        {CERT_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFilter(f);
              setShowAll(false);
            }}
            className={cn(
              "text-xs font-mono font-bold tracking-widest uppercase transition-all duration-200 relative pb-2 cursor-pointer",
              filter === f
                ? "text-[#24221D] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#F4C542]"
                : "text-[#6F6A5F] hover:text-[#24221D]"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {visible.map((c, i) => (
          <CertRow
            key={c.id}
            cert={c}
            index={i}
            onClick={() => setOpenId(c.id)}
          />
        ))}
      </div>

      {/* Show All Toggle */}
      {list.length > 9 && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border border-[#EDE5CF] bg-[#FFFFFF] px-6 py-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#6F6A5F] transition-all duration-300 hover:text-[#24221D] hover:border-[#F4C542] hover:bg-[#FFF9EC] cursor-pointer"
          >
            {showAll ? "Show fewer" : `Show all ${list.length}`}
          </button>
        </div>
      )}

      <AnimatePresence>
        {open ? <CertModal cert={open} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   1B. RESEARCH PAPERS TAB COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
function PaperRow({
  paper,
  index,
  onClick,
}: {
  paper: ResearchPaper;
  index: number;
  onClick: () => void;
}) {
  const numStr = String(index + 1).padStart(2, "0");

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="group w-full rounded-xl border border-[#251D3A] bg-[#120E22] p-4 sm:py-5 sm:px-6 text-left transition-all duration-250 hover:bg-[#18112D] hover:border-[rgba(168,85,247,0.55)] hover:-translate-y-[2px] cursor-pointer"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.2) }}
      aria-label={`Open research paper: ${paper.title}`}
    >
      <div className="hidden sm:flex items-center justify-between gap-4">
        <span className="font-mono text-xs font-bold text-[#9CA3AF] group-hover:text-[#A855F7] transition-colors w-10 shrink-0">
          {numStr}
        </span>
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-2 mb-1">
            {paper.award && (
              <span className="text-[10px] font-mono font-bold tracking-wider text-[#D946EF] uppercase bg-[#251D3A] px-2 py-0.5 rounded">
                🏆 {paper.award}
              </span>
            )}
            <span className="text-xs text-[#C084FC] font-mono">{paper.category}</span>
          </div>
          <h3 className="font-display font-bold text-base text-white group-hover:text-[#C084FC] transition-colors truncate">
            {paper.title}
          </h3>
          <p className="text-xs text-[#9CA3AF] mt-0.5 truncate">
            Authors: {paper.authors.join(", ")} · {paper.publication}
          </p>
        </div>
        <span className="font-mono text-xs text-[#9CA3AF] w-28 shrink-0 text-right">
          {paper.publicationDate}
        </span>
        <ArrowUpRight className="h-4 w-4 text-[#C084FC] group-hover:text-[#D946EF] transition-all duration-300 group-hover:translate-x-1 shrink-0 ml-2" />
      </div>

      <div className="flex sm:hidden flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#A855F7]">{numStr}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#9CA3AF]">{paper.publicationDate}</span>
            <ArrowUpRight className="h-4 w-4 text-[#C084FC] group-hover:text-[#D946EF] transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
        <h3 className="font-display font-bold text-sm text-white group-hover:text-[#C084FC] transition-colors leading-snug">
          {paper.title}
        </h3>
        <p className="text-xs text-[#CBD5E1]">
          Authors: {paper.authors.join(", ")} <span className="text-[#9CA3AF]">·</span> <span className="text-[#C084FC]">{paper.category}</span>
        </p>
      </div>
    </motion.button>
  );
}

function PaperModal({ paper, onClose }: { paper: ResearchPaper; onClose: () => void }) {
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

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center bg-[#09080E]/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={paper.title}
    >
      <motion.div
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#251D3A] bg-[#120E22] p-6 sm:p-8 text-[#CBD5E1] shadow-[0_0_25px_rgba(168,85,247,0.12)]"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold tracking-widest text-[#A855F7] uppercase">
                {paper.category}
              </span>
              {paper.award && (
                <span className="text-xs font-mono font-bold tracking-wider text-[#D946EF] uppercase bg-[#251D3A] px-2.5 py-0.5 rounded-md">
                  🏆 {paper.award}
                </span>
              )}
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white leading-tight">{paper.title}</h3>
            <p className="mt-1.5 text-sm font-medium text-[#C084FC]">Authors: {paper.authors.join(", ")}</p>
            <p className="mt-1 text-xs text-[#9CA3AF]">{paper.publication} · {paper.publicationDate}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full border border-[#251D3A] text-[#9CA3AF] hover:text-white hover:bg-[#18112D] transition-colors shrink-0 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px w-full bg-[#251D3A] mb-4" />

        <p className="text-sm leading-relaxed text-[#CBD5E1] mb-5">{paper.description}</p>

        {paper.summary && (
          <div className="mb-6 p-4 rounded-xl border border-[#251D3A] bg-[#18112D]">
            <p className="text-xs font-mono font-bold text-[#A855F7] uppercase mb-1">Summary / Key Insight</p>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">{paper.summary}</p>
          </div>
        )}

        {paper.tags && paper.tags.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 mb-6">
            {paper.tags.map((t) => (
              <li key={t} className="border border-[#251D3A] bg-[#18112D] text-[#C084FC] text-xs px-2.5 py-0.5 rounded-md font-medium">
                {t}
              </li>
            ))}
          </ul>
        )}

        {paper.docUrl && (
          <div className="mt-4 mb-2">
            <a
              href={paper.docUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-[#251D3A] bg-[#18112D] px-5 py-3 text-xs font-mono font-semibold text-[#C084FC] hover:text-white hover:bg-[#A855F7] hover:border-[#A855F7] transition-all duration-300 shadow-md cursor-pointer"
            >
              <FileText className="h-4 w-4" /> View Research Paper <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function ResearchPapersView() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = RESEARCH_PAPERS.find((p) => p.id === openId) ?? null;

  return (
    <div>
      <div className="space-y-3">
        {RESEARCH_PAPERS.map((paper, i) => (
          <PaperRow
            key={paper.id}
            paper={paper}
            index={i}
            onClick={() => setOpenId(paper.id)}
          />
        ))}
      </div>

      <AnimatePresence>
        {open ? <PaperModal paper={open} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. BADGES TAB COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
const badgeIcons = {
  code: Code2,
  trophy: Trophy,
  bolt: Zap,
  flame: Flame,
  check: Check,
  database: Database,
} as const;

const badgeTones: Record<CodingBadge["tone"], string> = {
  coral: "var(--coral)",
  violet: "var(--violet)",
  emerald: "var(--emerald)",
  amber: "var(--amber)",
  primary: "var(--primary)",
  slate: "var(--muted-foreground)",
};

const HEX_CLIP = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

function BadgesView() {
  return (
    <div>
      <div className="text-center mb-10">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[#C084FC]">
          Problem Solving &amp; Learning Achievements
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {CODING_BADGES.map((badge, i) => {
          const Icon = badgeIcons[badge.icon];
          const tone = badgeTones[badge.tone];
          return (
            <motion.div
              key={badge.name}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.3) }}
              whileHover={{ y: -6 }}
            >
              <div
                className="grid h-16 w-16 place-items-center transition-shadow sm:h-[72px] sm:w-[72px]"
                style={{
                  clipPath: HEX_CLIP,
                  background: `linear-gradient(160deg, ${tone}, color-mix(in oklab, ${tone} 65%, black))`,
                  boxShadow: `0 12px 28px -14px ${tone}`,
                }}
              >
                <Icon className="h-7 w-7 text-background" strokeWidth={2.2} aria-hidden />
              </div>
              <p className="mt-4 text-sm font-semibold leading-snug text-white">{badge.name}</p>
              <p className="mt-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#9CA3AF]">
                {badge.platform}
              </p>
              {badge.note ? (
                <p className="mt-0.5 text-[10px] font-mono uppercase tracking-wider text-[#A855F7]">
                  {badge.note}
                </p>
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. ACHIEVEMENTS TAB COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
const ALL_ACHIEVEMENTS: Achievement[] = [TOP_ACHIEVEMENT, ...ACHIEVEMENTS];

const CATEGORY_LABELS: Record<Achievement["category"], string> = {
  Academic: "RESEARCH",
  Technical: "TECHNICAL",
  Hackathon: "HACKATHON",
  International: "INTERNATIONAL",
  Ongoing: "INNOVATION",
  Sports: "SPORTS",
};

function getAchYear(a: Achievement): string {
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

function AchModal({ item, onClose }: { item: Achievement; onClose: () => void }) {
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

  const yearLabel = getAchYear(item);

  return (
    <motion.div
      className="fixed inset-0 z-[85] grid place-items-center bg-[#09080E]/85 p-4 backdrop-blur-md"
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
        className="bg-[#120E22] border border-[#251D3A] text-[#CBD5E1] rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-[0_0_25px_rgba(217,70,239,0.08)]"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#D946EF] shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
              <span className="text-xs font-mono font-semibold tracking-wider text-[#C084FC] uppercase">
                {CATEGORY_LABELS[item.category]}
              </span>
            </div>
            <h3 className="text-white font-bold text-xl leading-snug">{item.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full border border-[#251D3A] text-[#9CA3AF] hover:text-white hover:bg-[#17112B] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="h-px w-full bg-[#251D3A] mb-4" />

        <p className="text-[#CBD5E1] text-sm leading-relaxed mb-6">{item.detail}</p>

        {item.points?.length ? (
          <ul className="space-y-2 mb-6 text-xs text-[#CBD5E1]">
            {item.points.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D946EF] mt-1.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {item.tags?.length ? (
          <ul className="flex flex-wrap gap-1.5 mb-6">
            {item.tags.map((t) => (
              <li key={t} className="border border-[#251D3A] bg-[#17112B] text-[#C084FC] text-xs px-2.5 py-0.5 rounded-md font-medium">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex items-center justify-between pt-4 border-t border-[#251D3A] text-xs">
          {yearLabel && (
            <span className="flex items-center gap-1.5 font-mono text-[#9CA3AF]">
              <Calendar className="h-3.5 w-3.5 text-[#A855F7]" />
              {yearLabel}
            </span>
          )}
          {item.meta && (
            <span className="font-semibold text-[#D946EF]">{item.meta}</span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function AchCard({ a, idx, onOpen }: { a: Achievement; idx: number; onOpen: () => void }) {
  const yearLabel = getAchYear(a);

  return (
    <motion.article
      className="group flex flex-col w-full p-6 rounded-2xl border border-[#251D3A] bg-[#120E22] text-[#CBD5E1] transition-all duration-300 hover:bg-[#17112B] hover:border-[rgba(217,70,239,0.5)] hover:shadow-[0_0_25px_rgba(217,70,239,0.08)] hover:-translate-y-[3px] cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(idx * 0.05, 0.3) }}
      role="button"
      tabIndex={0}
      aria-label={`View details: ${a.title}`}
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen()}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#D946EF] shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
          <span className="text-xs font-mono font-semibold tracking-wider text-[#C084FC] uppercase">
            {CATEGORY_LABELS[a.category]}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-[#9CA3AF] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#D946EF]" />
      </div>

      <h3 className="font-display text-base font-bold text-white mb-2 leading-snug group-hover:text-[#D946EF] transition-colors">
        {a.title}
      </h3>

      <p className="text-xs leading-relaxed text-[#CBD5E1] line-clamp-3 mb-4">{a.detail}</p>

      <div className="flex-1 min-h-[0.5rem]" />

      <div className="flex items-center justify-between pt-3 border-t border-[#251D3A] text-xs">
        {yearLabel && (
          <span className="flex items-center gap-1.5 font-mono text-xs text-[#9CA3AF]">
            <Calendar className="h-3 w-3 text-[#A855F7]" />
            {yearLabel}
          </span>
        )}
        <span className="text-[11px] font-medium text-[#A855F7]">
          {a.meta || "Milestone"}
        </span>
      </div>
    </motion.article>
  );
}

function AchievementsView() {
  const [open, setOpen] = useState<Achievement | null>(null);

  return (
    <div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
        {ALL_ACHIEVEMENTS.map((a, i) => (
          <li key={a.title} className="flex">
            <AchCard a={a} idx={i} onOpen={() => setOpen(a)} />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {open ? <AchModal item={open} onClose={() => setOpen(null)} /> : null}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. HACKATHONS TAB COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */
const HACK_META: Record<string, { org: string; year: string }> = {
  "gsc-2026": { org: "Google Developer Program", year: "2026" },
  "craftathon-2026": { org: "Gandhinagar University", year: "2026" },
  "urfu-hackatom": { org: "Ural Federal University", year: "2026" },
};

const HACK_SHORT_DESC: Record<string, string> = {
  "gsc-2026": "AI-powered NGO resource allocation & volunteer matching platform.",
  "craftathon-2026": "Selected as a Finalist in a 2-day offline AI hackathon.",
  "urfu-hackatom": "International AI project developed with multicultural teams in Russia.",
};

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
      className="fixed inset-0 z-[90] grid place-items-center bg-[#09080E]/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      role="dialog" aria-modal="true"
    >
      <motion.div
        className="bg-[#120E22] border border-[#251D3A] text-[#CBD5E1] rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-[0_0_20px_rgba(168,85,247,0.10)]"
        initial={{ opacity: 0, y: 14, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        aria-label={c.title}
      >
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-mono text-xs font-bold text-[#A855F7]">
              {c.index}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#251D3A] bg-[#18112D] text-[#D946EF] flex items-center gap-1.5">
              {c.ongoing && <span className="h-1.5 w-1.5 rounded-full bg-[#D946EF] animate-pulse" />}
              {c.status}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-full border border-[#251D3A] text-[#9CA3AF] hover:text-white hover:bg-[#18112D] transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <h3 className="text-white font-bold text-xl mb-1">{c.title}</h3>
        <p className="text-[#C084FC] text-xs font-semibold mb-4">{c.subtitle}</p>

        <div className="h-px w-full bg-[#251D3A] mb-4" />

        <p className="text-[#CBD5E1] text-sm leading-relaxed mb-6">{c.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#A855F7] mb-2">Key Contributions</p>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              {c.contributions.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#D946EF]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#A855F7] mb-2">Impact</p>
            <ul className="space-y-1.5 text-xs text-[#CBD5E1]">
              {c.impact.map((x) => (
                <li key={x} className="flex items-start gap-2">
                  <Zap className="h-3.5 w-3.5 shrink-0 mt-0.5 text-[#C084FC]" />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="flex flex-wrap gap-1.5 mb-4">
          {c.tags.map((t) => (
            <li key={t} className="border border-[#251D3A] bg-[#18112D] text-[#C084FC] text-xs px-2.5 py-0.5 rounded-md font-medium">
              {t}
            </li>
          ))}
        </ul>

        {c.proofLabel && c.proofImage && (
          <a
            href={c.proofImage}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#C084FC] hover:text-[#D946EF] transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {c.proofLabel}
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

function HackCard({ c, idx, onOpen }: { c: Competition; idx: number; onOpen: () => void }) {
  const meta = HACK_META[c.id] ?? { org: c.subtitle, year: "2026" };
  const shortDesc = HACK_SHORT_DESC[c.id] ?? c.subtitle;

  return (
    <motion.button
      type="button"
      className="group flex flex-col justify-between w-full h-[210px] p-5 rounded-2xl border border-[#251D3A] bg-[#120E22] text-left transition-all duration-300 hover:bg-[#18112D] hover:border-[rgba(168,85,247,0.55)] hover:shadow-[0_0_20px_rgba(168,85,247,0.10)] hover:-translate-y-[3px] cursor-pointer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: idx * 0.08 }}
      onClick={onOpen}
      aria-label={`View details: ${c.title}`}
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] font-bold text-[#A855F7] tracking-wider">
              {c.index}
            </span>
            {c.status && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-[#251D3A] bg-[#18112D] text-[#D946EF]">
                {c.status}
              </span>
            )}
          </div>
          <ArrowUpRight className="h-4 w-4 text-[#C084FC] transition-transform duration-300 group-hover:text-[#D946EF] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <h3 className="font-display font-bold text-[18px] text-white leading-tight mb-1 group-hover:text-[#C084FC] transition-colors truncate">
          {c.title}
        </h3>

        <p className="text-[12px] font-medium text-[#9CA3AF] mb-2 truncate">
          {meta.org} · {meta.year}
        </p>

        <p className="text-[13px] text-[#CBD5E1] leading-snug line-clamp-2">
          {shortDesc}
        </p>
      </div>

      <ul className="flex flex-wrap gap-1.5 pt-2">
        {c.tags.slice(0, 3).map((t) => (
          <li
            key={t}
            className="text-[11px] font-medium text-[#C084FC] border border-[#251D3A] bg-[#18112D] px-2 py-0.5 rounded"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}

function HackathonsView() {
  const [open, setOpen] = useState<Competition | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {COMPETITIONS.map((c, i) => (
          <HackCard key={c.id} c={c} idx={i} onOpen={() => setOpen(c)} />
        ))}
      </div>

      <AnimatePresence>
        {open && <HackModal c={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN MERGED CREDENTIALS COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
export function Credentials() {
  const [activeTab, setActiveTab] = useState<CredentialTab>("CERTIFICATIONS");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#certifications") setActiveTab("CERTIFICATIONS");
      else if (hash === "#research-papers" || hash === "#research" || hash === "#papers") setActiveTab("RESEARCH PAPERS");
      else if (hash === "#badges") setActiveTab("BADGES");
      else if (hash === "#achievements") setActiveTab("ACHIEVEMENTS");
      else if (hash === "#hackathons" || hash === "#competitions") setActiveTab("HACKATHONS");
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <section id="credentials" className="scroll-mt-28 bg-[#FFFDF7] text-[#24221D] py-16 sm:py-24 relative">
      {/* Target anchors for smooth scrolling compatibility */}
      <span id="certifications" className="absolute -top-28" />
      <span id="research-papers" className="absolute -top-28" />
      <span id="research" className="absolute -top-28" />
      <span id="badges" className="absolute -top-28" />
      <span id="achievements" className="absolute -top-28" />
      <span id="hackathons" className="absolute -top-28" />
      <span id="competitions" className="absolute -top-28" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Unified Section Heading */}
        <SectionHeading
          title="CREDENTIALS & RESEARCH"
          subtitle="Certifications, Research Papers, Badges, Achievements & Hackathons"
        />

        {/* Clean Segmented / Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-[#FFF9EC] border border-[#EDE5CF] shadow-sm">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "relative px-4 sm:px-6 py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer select-none",
                    isActive
                      ? "text-[#24221D]"
                      : "text-[#6F6A5F] hover:text-[#24221D] hover:bg-[#FFF3C4]/60"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCredentialsTab"
                      className="absolute inset-0 rounded-xl bg-[#F4C542] border border-[#E8B82E]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panel */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === "CERTIFICATIONS" && <CertificationsView />}
              {activeTab === "RESEARCH PAPERS" && <ResearchPapersView />}
              {activeTab === "BADGES" && <BadgesView />}
              {activeTab === "ACHIEVEMENTS" && <AchievementsView />}
              {activeTab === "HACKATHONS" && <HackathonsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
