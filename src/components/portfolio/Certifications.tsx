import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, ExternalLink, FileText } from "lucide-react";
import { CERTIFICATIONS, CERT_FILTERS, type Certification } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Reveal";

const isPdf = (url?: string) => !!url && /\.pdf($|\?)/i.test(url);

/* ── Helper to extract year cleanly ── */
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

/* ── Compact Archive Row ── */
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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.25) }}
      aria-label={`Open certificate: ${cert.title}`}
    >
      {/* Desktop / Tablet Row (sm and up) */}
      <div className="hidden sm:flex items-center justify-between gap-4">
        {/* Number (5-8%) */}
        <span className="font-mono text-xs font-bold text-[#D9A91A] group-hover:text-[#24221D] transition-colors w-10 shrink-0">
          {numStr}
        </span>

        {/* Title (50-55%) */}
        <h3 className="font-display font-bold text-base text-[#24221D] group-hover:text-[#D9A91A] transition-colors flex-1 truncate pr-2">
          {cert.title}
        </h3>

        {/* Issuer · Category (20%) */}
        <div className="text-xs text-[#6F6A5F] w-48 shrink-0 truncate">
          <span className="font-medium text-[#24221D]">{cert.issuer}</span>
          <span className="text-[#9A9488] mx-1.5">·</span>
          <span className="text-[#D9A91A] font-mono font-bold text-[11px]">{cert.category}</span>
        </div>

        {/* Year (10%) */}
        <span className="font-mono text-xs text-[#9A9488] w-14 shrink-0 text-right">
          {year}
        </span>

        {/* Arrow (5%) */}
        <ArrowUpRight className="h-4 w-4 text-[#D9A91A] group-hover:text-[#24221D] transition-all duration-300 group-hover:translate-x-1 shrink-0 ml-2" />
      </div>

      {/* Mobile Stacked Layout */}
      <div className="flex sm:hidden flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#D9A91A]">{numStr}</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#9A9488]">{year}</span>
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

/* ── Modal (Certificate Preview & Details preserved) ── */
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
      className="fixed inset-0 z-[90] grid place-items-center bg-[#24221D]/40 p-4 backdrop-blur-md"
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
        className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#EDE5CF] bg-[#FFFFFF] p-6 sm:p-8 text-[#24221D] shadow-[0_12px_40px_rgba(80,60,20,0.15)]"
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
            className="p-2 rounded-full border border-[#EDE5CF] text-[#6F6A5F] hover:text-[#24221D] hover:bg-[#FFF8E7] transition-colors shrink-0 cursor-pointer"
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

        {/* View Document Button */}
        {docTargetUrl && (
          <div className="mt-4 mb-2">
            <a
              href={docTargetUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-[#F4C542] px-5 py-3 text-xs font-mono font-bold text-[#24221D] hover:bg-[#D9A91A] transition-all duration-300 shadow-md cursor-pointer"
            >
              <FileText className="h-4 w-4" /> {isPdfDoc ? "View PDF Document" : "View Certificate Document"} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        )}

        {/* Image Preview */}
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

/* ── Main section ── */
export function Certifications() {
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
    <section id="certifications" className="scroll-mt-28 bg-[#FFFDF7] text-[#24221D] py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Section Heading */}
        <SectionHeading
          title="CERTIFICATIONS"
          subtitle="Credentials I've earned"
        />

        {/* Text-based Filter Buttons */}
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
                  : "text-[#9A9488] hover:text-[#24221D]"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Compact Credential Rows Archive */}
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

        {/* Show more button if list > 9 */}
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
      </div>

      {/* Modal for viewing certificate image / PDF */}
      <AnimatePresence>
        {open ? <CertModal cert={open} onClose={() => setOpenId(null)} /> : null}
      </AnimatePresence>
    </section>
  );
}

