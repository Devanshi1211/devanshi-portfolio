import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./Reveal";

/* ─── Education Data ─────────────────────── */
const EDU = [
  {
    id: "btech",
    title: "B.Tech in Information Technology",
    sub: "Sigma University, Vadodara",
    period: "2023 – 2027",
    score: "CGPA 9.85 / 10",
    accent: true,
    shortDesc:
      "Pursuing Information Technology with a focus on data science, machine learning, NLP and applied AI.",
    expandedDesc:
      "Consistently maintaining a CGPA of 9.85 / 10 across all semesters. Coursework covers data structures, algorithms, database management, machine learning, and artificial intelligence. Active in international programs, research publications, and industry internships alongside academics.",
  },
  {
    id: "class12",
    title: "Class 12 · PCM",
    sub: "HSC Board",
    period: "2022 – 2023",
    score: "89%",
    accent: false,
    shortDesc:
      "Completed higher secondary education with Physics, Chemistry and Mathematics.",
    expandedDesc:
      "Studied Physics, Chemistry, and Mathematics at the higher secondary level. Built a strong quantitative and analytical foundation that directly supports current work in data science and machine learning.",
  },
  {
    id: "class10",
    title: "Class 10",
    sub: "SSC Board",
    period: "2020 – 2021",
    score: "97.91%",
    accent: false,
    shortDesc: "Completed secondary education with a strong academic foundation.",
    expandedDesc:
      "Achieved 97.91% across all subjects in the SSC Board examinations, demonstrating consistent academic excellence from an early stage.",
  },
];

/* ─── Experience Data ────────────────────── */
const EXP = [
  {
    id: "tm-intern",
    kind: "Internship",
    role: "Data Analysis Intern",
    org: "Tech Mahindra",
    period: "Jul 2025 – Oct 2025",
    location: "Vadodara",
    accent: true,
    shortDesc:
      "Worked on machine learning, data analysis, PDF extraction and computer vision processing, including product classification and preprocessing.",
    bullets: [
      "Automated PDF text extraction using Python (PyMuPDF) for high-throughput document processing.",
      "Built an OpenCV-based shape-detection system and P&ID symbol-detection workflow.",
      "Applied ML models (Logistic Regression, Random Forest) for classification on extracted engineering data.",
      "Performed EDA, feature engineering, hyperparameter tuning and cross-validation.",
    ],
    tags: ["Python", "OpenCV", "Machine Learning", "PyMuPDF", "TF-IDF"],
  },
  {
    id: "urfu",
    kind: "International Program",
    role: "India Representative — Summer University",
    org: "Ural Federal University",
    period: "Jul 2026",
    location: "Yekaterinburg, Russia",
    accent: false,
    shortDesc:
      "Represented Sigma University and India while collaborating on research, innovation and emerging technologies internationally.",
    bullets: [
      "Completed AI & Information Technologies coursework (Computer Science Track).",
      "Collaborated with multicultural teams during the HackAtom initiative.",
      "Strengthened technical presentation and cross-cultural communication skills.",
    ],
    tags: ["AI Research", "International", "Leadership", "HackAtom"],
  },
  {
    id: "sap",
    kind: "Leadership",
    role: "Team Leader — SAP Code Unnati Project",
    org: "SAP Code Unnati / Edunet Foundation",
    period: "2025",
    location: "Vadodara, India",
    accent: false,
    shortDesc:
      "Led the team through project development, coordination and presentation.",
    bullets: [
      "Managed team coordination, sprint planning, and task distribution.",
      "Guided implementation of AI/ML algorithms and data pipelines.",
      "Oversaw project from planning to completion, ensuring quality delivery.",
    ],
    tags: ["Leadership", "AI/ML", "Team Management", "Python"],
  },
  {
    id: "google",
    kind: "Leadership",
    role: "Team Leader — Google Solution Challenge 2026",
    org: "Google Developer Program",
    period: "2026",
    location: "Global",
    accent: false,
    shortDesc:
      "Led the team through solution development, collaboration and presentation.",
    bullets: [
      "Designed end-to-end project architecture, data schema and workflow.",
      "Led UI development, backend integration and AI-based urgency prioritization.",
      "Built and submitted the MVP for hackathon submission.",
    ],
    tags: ["Leadership", "AI", "Hackathon", "Product Development"],
  },
];

/* ─── Shared Card ────────────────────────── */
interface CardProps {
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  accentDot: boolean;
  header: React.ReactNode;
  shortDesc: string;
  expandedContent: React.ReactNode;
}

function TimelineCard({ isOpen, onToggle, index, accentDot, header, shortDesc, expandedContent }: CardProps) {
  return (
    <motion.li
      className="relative"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      {/* Timeline dot */}
      <span
        aria-hidden
        className={cn(
          "absolute -left-[1.65rem] top-5 grid h-4 w-4 place-items-center rounded-full border transition-colors",
          isOpen
            ? "border-[#F4C542] bg-[#FFF3C4]"
            : "border-[#D9A91A] bg-[#FFFFFF]",
        )}
      >
        <span
          className="h-1.5 w-1.5 rounded-full transition-colors"
          style={{
            background: isOpen ? "#D9A91A" : "#F4C542",
          }}
        />
      </span>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          "w-full rounded-xl border border-[#EDE5CF] bg-[#FFFFFF] p-5 text-left shadow-[0_4px_20px_rgba(80,60,20,0.04)] transition-all duration-300 hover:bg-[#FFF9EC] hover:border-[#F4C542] hover:shadow-[0_8px_24px_rgba(244,197,66,0.18)] cursor-pointer",
          isOpen && "border-[#F4C542] bg-[#FFF8D9] shadow-[0_8px_24px_rgba(244,197,66,0.18)]",
        )}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">{header}</div>
          <ChevronDown
            className={cn(
              "mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D9A91A] transition-transform duration-200",
              isOpen && "rotate-180 text-[#24221D]",
            )}
          />
        </div>

        {/* Divider */}
        <div className="my-3 h-px bg-[#EDE5CF]" />

        {/* Short description — clamped when closed */}
        <p
          className={cn("text-sm leading-relaxed text-[#6F6A5F]", !isOpen && "line-clamp-2")}
        >
          {shortDesc}
        </p>

        {/* Expanded content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-2">{expandedContent}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.li>
  );
}

/* ─── Column ─────────────────────────────── */
function Column({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 flex-1 rounded-2xl p-6 sm:p-8 bg-[#FFF9EC]">
      <h3 className="ee-col-label text-[#D9A91A] border-b border-[#EDE5CF] pb-2 font-bold tracking-[0.2em] text-sm uppercase">{label}</h3>
      <div className="relative mt-5 pl-6 sm:pl-7 border-l-2 border-[#E8DDBF]">
        <ol className="space-y-4">{children}</ol>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────── */
export function EduExp() {
  const [openEdu, setOpenEdu] = useState<string | null>(null);
  const [openExp, setOpenExp] = useState<string | null>(null);

  return (
    <section id="experience" className="ee-section scroll-mt-28 py-24 bg-[#FFFDF7] text-[#24221D] relative">
      <span id="education" className="absolute -top-28" />
      <span id="eduexp" className="absolute -top-28" />
      <style>{`
        .ee-section { padding: 5rem 0 7rem; }
        .ee-wrap { max-width: 1100px; margin: 0 auto; padding: 0 1.5rem; }

        .ee-eyebrow {
          display: block; font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #D9A91A; margin-bottom: 0.5rem; text-align: center;
        }
        .ee-h2 {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5.5vw, 4.25rem);
          font-weight: 800; letter-spacing: -0.03em; line-height: 1.1;
          color: #24221D; margin: 0 0 0.75rem;
          text-align: center; text-transform: uppercase;
        }
        .ee-desc {
          font-size: 1rem; color: #6F6A5F;
          max-width: 520px; line-height: 1.7; margin: 0 auto 3rem; text-align: center;
        }

        .ee-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;
        }

        .ee-kind {
          font-size: 0.68rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #D9A91A;
          display: block; margin-bottom: 0.2rem;
        }
        .ee-title {
          font-family: var(--font-display); font-size: 1.05rem; font-weight: 700;
          color: #24221D; margin: 0 0 0.2rem; line-height: 1.3;
        }
        .ee-sub { font-size: 0.875rem; color: #6F6A5F; margin: 0; font-weight: 500; }
        .ee-meta {
          display: flex; align-items: center; gap: 0.5rem;
          flex-wrap: wrap; margin-top: 0.4rem;
        }
        .ee-period {
          font-size: 0.78rem;
          color: #D9A91A; font-weight: 600;
          font-variant-numeric: tabular-nums;
        }
        .ee-score {
          font-size: 0.75rem; font-weight: 700; color: #8B6B08;
          padding: 0.12rem 0.5rem; border-radius: 4px;
          background: #FFF3C4;
          border: 1px solid #EDE5CF;
        }

        .ee-bullets {
          margin: 0.75rem 0 0; list-style: none; padding: 0;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .ee-bullet {
          display: flex; gap: 0.6rem; font-size: 0.875rem;
          line-height: 1.6; color: #6F6A5F;
        }
        .ee-bullet-dot {
          margin-top: 0.5em; width: 5px; height: 5px;
          border-radius: 50%; flex-shrink: 0;
          background: #F4C542; opacity: 0.9;
        }
        .ee-tags {
          display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.85rem;
        }
        .ee-tag {
          font-size: 0.75rem; font-weight: 600; letter-spacing: 0.04em;
          padding: 0.18rem 0.6rem; border-radius: 4px;
          background: #FFF3C4;
          border: 1px solid #EDE5CF;
          color: #8B6B08;
        }
        .ee-expanded-desc {
          font-size: 0.875rem; line-height: 1.65;
          color: #6F6A5F; margin-top: 0.15rem;
        }

        @media (max-width: 768px) {
          .ee-grid { grid-template-columns: 1fr; gap: 2rem 0; }
          .ee-section { padding: 3.5rem 0 5rem; }
        }
      `}</style>


      <div className="ee-wrap">
        <SectionHeading
          title="EXPERIENCE & EDUCATION"
          subtitle="My professional journey & academic background"
        />


        {/* Two-column grid */}
        <div className="ee-grid">

          {/* LEFT: Education */}
          <Column label="EDUCATION">
            {EDU.map((e, i) => (
              <TimelineCard
                key={e.id}
                index={i}
                isOpen={openEdu === e.id}
                onToggle={() => setOpenEdu(openEdu === e.id ? null : e.id)}
                accentDot={e.accent}
                header={
                  <>
                    <h4 className="ee-title">{e.title}</h4>
                    <p className="ee-sub">{e.sub}</p>
                    <div className="ee-meta">
                      <span className="ee-period">{e.period}</span>
                      <span className="ee-score">{e.score}</span>
                    </div>
                  </>
                }
                shortDesc={e.shortDesc}
                expandedContent={
                  <p className="ee-expanded-desc">{e.expandedDesc}</p>
                }
              />
            ))}
          </Column>

          {/* RIGHT: Experience */}
          <Column label="EXPERIENCE">
            {EXP.map((e, i) => (
              <TimelineCard
                key={e.id}
                index={i}
                isOpen={openExp === e.id}
                onToggle={() => setOpenExp(openExp === e.id ? null : e.id)}
                accentDot={e.accent}
                header={
                  <>
                    <span className="ee-kind">{e.kind}</span>
                    <h4 className="ee-title">{e.role}</h4>
                    <p className="ee-sub">{e.org}</p>
                    <div className="ee-meta">
                      <span className="ee-period">{e.period}</span>
                      {e.location && (
                        <span className="ee-period">· {e.location}</span>
                      )}
                    </div>
                  </>
                }
                shortDesc={e.shortDesc}
                expandedContent={
                  <>
                    <ul className="ee-bullets">
                      {e.bullets.map((b) => (
                        <li key={b} className="ee-bullet">
                          <span className="ee-bullet-dot" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="ee-tags">
                      {e.tags.map((t) => (
                        <span key={t} className="ee-tag">{t}</span>
                      ))}
                    </div>
                  </>
                }
              />
            ))}
          </Column>

        </div>
      </div>
    </section>
  );
}
