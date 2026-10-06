import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ONLINE_PROFILES, type OnlineProfile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════════════
   AUTHENTIC PURE SVG BRAND LOGO COMPONENTS (Ultra-Sharp Vector Icons)
   ═══════════════════════════════════════════════════════════════════════════ */

/** 1. GitHub - Official Invertocat Logo */
function GithubLogo({ className = "h-11 w-11", alt = "GitHub logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#181717" role="img" aria-label={alt}>
      <title>{alt}</title>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

/** 2. LinkedIn - Official "in" Logo */
function LinkedinLogo({ className = "h-11 w-11", alt = "LinkedIn logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#0A66C2" role="img" aria-label={alt}>
      <title>{alt}</title>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

/** 3. LeetCode - Official Orange & Dark Vector Logo */
function LeetCodeLogo({ className = "h-11 w-11", alt = "LeetCode logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" role="img" aria-label={alt}>
      <title>{alt}</title>
      <path d="M16.102 17.93l-2.697 2.607c-.766.741-1.996.741-2.762 0l-5.617-5.43c-.766-.74-1.2-1.874-1.2-2.91 0-1.037.434-2.17 1.2-2.911l5.617-5.43c.766-.74 1.996-.74 2.762 0l2.697 2.607c.383.37.998.37 1.381 0 .383-.37.383-.97 0-1.34l-2.697-2.607c-1.532-1.482-3.992-1.482-5.524 0l-5.617 5.43c-1.532 1.48-2.4 3.748-2.4 5.821 0 2.074.868 4.34 2.4 5.82l5.617 5.43c1.532 1.483 3.992 1.483 5.524 0l2.697-2.607c.383-.37.383-.97 0-1.34-.383-.37-.998-.37-1.381 0z" fill="#3D3D3D" />
      <path d="M10.835 13.916l6.634-6.41c.383-.37.383-.97 0-1.34-.383-.37-.998-.37-1.381 0l-6.634 6.41c-.383.37-.383.97 0 1.34.383.37.998.37 1.381 0z" fill="#FFA116" />
      <path d="M20.697 10.963H10.158c-.542 0-.981.424-.981.947 0 .523.439.947.981.947h10.539c.542 0 .981-.424.981-.947 0-.523-.439-.947-.981-.947z" fill="#FFA116" />
    </svg>
  );
}

/** 4. CodeChef - Authentic Chef Hat & Facial Brackets SVG */
function CodeChefLogo({ className = "h-11 w-11", alt = "CodeChef logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" role="img" aria-label={alt}>
      <title>{alt}</title>
      {/* Pleated Chef Hat Top */}
      <path d="M 26 42 C 16 36 14 14 30 8 C 38 2 62 2 70 8 C 86 14 84 36 74 42 Z" fill="#FFFDF9" stroke="#5B4638" strokeWidth="4.5" strokeLinejoin="round" />
      <path d="M 30 42 L 70 42 L 67 48 L 33 48 Z" fill="#5B4638" />
      {/* Pleat Folds */}
      <path d="M 40 40 C 40 20 44 8 50 8 C 56 8 60 20 60 40" stroke="#D5C7B7" strokeWidth="2.5" fill="none" />
      <path d="M 48 40 C 48 16 49 8 50 8" stroke="#D5C7B7" strokeWidth="2" fill="none" />
      {/* < wink eye */}
      <path d="M 26 60 L 18 65 L 26 70" stroke="#5B4638" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Eye dot */}
      <circle cx="44" cy="65" r="3.8" fill="#5B4638" />
      {/* > right bracket eye */}
      <path d="M 74 60 L 82 65 L 74 70" stroke="#5B4638" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {/* Smile curve */}
      <path d="M 45 73 Q 50 77 55 73" stroke="#5B4638" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Mustache */}
      <path d="M 28 81 C 34 77 46 79 50 83 C 54 79 66 77 72 81 C 76 84 67 92 50 87 C 33 92 24 84 28 81 Z" fill="#5B4638" />
    </svg>
  );
}

/** 5. Coding Ninjas - Authentic Orange C Badge with Ninja Eyes SVG */
function CodingNinjasLogo({ className = "h-11 w-11", alt = "Coding Ninjas logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" role="img" aria-label={alt}>
      <title>{alt}</title>
      {/* Orange 'C' Outer Badge */}
      <path d="M 80 15 C 38 15 14 38 14 60 C 14 82 38 100 80 100 L 96 100 L 96 70 L 80 70 C 58 70 42 64 42 60 C 42 56 58 44 80 44 L 96 44 L 96 15 Z" fill="#FA7328" />
      {/* Ninja eyes inside C cut-out */}
      <polygon points="34,54 54,48 48,58" fill="#24221D" />
      <polygon points="66,48 86,54 72,58" fill="#24221D" />
    </svg>
  );
}

/** 6. GeeksforGeeks - Authentic Green {gg} Logo SVG */
function GeeksForGeeksLogo({ className = "h-11 w-11", alt = "GeeksforGeeks logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 64 36" className={className} fill="#2F8D46" role="img" aria-label={alt}>
      <title>{alt}</title>
      <path d="M17.5 0C7.8 0 0 7.8 0 17.5S7.8 35 17.5 35c5.3 0 10.1-2.4 13.3-6.2C34 32.6 38.8 35 44.1 35 53.8 35 61.6 27.2 61.6 17.5S53.8 0 44.1 0c-5.3 0-10.1 2.4-13.3 6.2C27.6 2.4 22.8 0 17.5 0zm-0.4 7c4.6 0 8.5 2.9 10 7H14.5v5h12.6c-0.5 4.7-4.5 8.3-9.5 8.3-5.3 0-9.6-4.3-9.6-9.6s4.3-9.6 9.1-9.6c0 0 0 0 0 0zm27 0c4.8 0 9.1 4.3 9.1 9.6s-4.3 9.6-9.6 9.6c-5 0-9-3.6-9.5-8.3h12.6v-5H34.1c1.5-4.1 5.4-7 10-7z" />
    </svg>
  );
}

/** 7. Codolio - Authentic Owl Spectacles SVG Logo */
function CodolioLogo({ className = "h-11 w-11", alt = "Codolio logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" role="img" aria-label={alt}>
      <title>{alt}</title>
      {/* Owl Head Shape */}
      <path d="M 20 28 C 15 12 35 22 50 30 C 65 22 85 12 80 28 C 88 58 78 84 50 84 C 22 84 12 58 20 28 Z" fill="#D97706" stroke="#92400E" strokeWidth="3" />
      {/* Inner Light Patch */}
      <path d="M 25 36 C 35 30 65 30 75 36 C 81 58 71 76 50 76 C 29 76 19 58 25 36 Z" fill="#FEF3C7" />
      {/* Round Glasses */}
      <circle cx="36" cy="50" r="14" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3.5" />
      <circle cx="64" cy="50" r="14" fill="#FFFFFF" stroke="#1F2937" strokeWidth="3.5" />
      <line x1="48" y1="50" x2="52" y2="50" stroke="#1F2937" strokeWidth="3.5" />
      {/* Eyes Pupils */}
      <circle cx="36" cy="50" r="5" fill="#4C1D95" />
      <circle cx="38" cy="48" r="1.5" fill="#FFFFFF" />
      <circle cx="64" cy="50" r="5" fill="#4C1D95" />
      <circle cx="66" cy="48" r="1.5" fill="#FFFFFF" />
      {/* Beak */}
      <polygon points="50,54 43,65 57,65" fill="#F59E0B" />
    </svg>
  );
}

/** 8. Instagram - Official Gradient & Camera Logo */
function InstagramLogo({ className = "h-11 w-11", alt = "Instagram logo" }: { className?: string; alt?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label={alt}>
      <title>{alt}</title>
      <defs>
        <radialGradient id="ig-grad-profile" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad-profile)" />
      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.25-9.25a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z" fill="#FFFFFF" />
    </svg>
  );
}

/* Map platform icon key to official SVG logo component and subtle platform pastel background */
const BRAND_LOGOS: Record<
  OnlineProfile["icon"],
  { component: React.ComponentType<{ className?: string; alt?: string }>; bgColor: string }
> = {
  github: { component: GithubLogo, bgColor: "bg-[#24292E]/8" },
  linkedin: { component: LinkedinLogo, bgColor: "bg-[#0A66C2]/10" },
  code: { component: LeetCodeLogo, bgColor: "bg-[#FFA116]/12" },
  chef: { component: CodeChefLogo, bgColor: "bg-[#2F8D46]/10" },
  ninja: { component: CodingNinjasLogo, bgColor: "bg-[#FA7328]/12" },
  gfg: { component: GeeksForGeeksLogo, bgColor: "bg-[#2F8D46]/12" },
  codolio: { component: CodolioLogo, bgColor: "bg-[#D97706]/12" },
  instagram: { component: InstagramLogo, bgColor: "bg-[#E1306C]/10" },
};

export function Profiles() {
  const reduce = useReducedMotion();

  return (
    <section id="profiles" className="scroll-mt-28 py-20 sm:py-24 bg-[#FFF9F2] text-[#2B211B]">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#D97745]">
            ONLINE PRESENCE
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-[#2B211B]">
            Online Profiles
          </h2>
          <p className="mt-2 text-sm text-[#76675D]">
            Coding platforms &amp; professional presence.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {ONLINE_PROFILES.map((p, i) => {
            const isPlaceholder = /^[A-Z_]+$/.test(p.href);
            const logoInfo = BRAND_LOGOS[p.icon];
            const LogoComponent = logoInfo.component;

            return (
              <motion.a
                key={p.name}
                href={isPlaceholder ? undefined : p.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-disabled={isPlaceholder || undefined}
                className="group flex flex-col items-center rounded-[20px] border-none bg-[#FFFFFF] p-7 text-center shadow-[0_8px_30px_rgba(70,45,25,0.07)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(70,45,25,0.12)] hover:-translate-y-1 cursor-pointer"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.45,
                  delay: Math.min(i * 0.05, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Desktop 72px x 72px Icon Container with Platform-Specific Pastel Background */}
                <div
                  className={cn(
                    "grid h-[72px] w-[72px] place-items-center rounded-[18px] transition-transform duration-300 group-hover:scale-105",
                    logoInfo.bgColor
                  )}
                >
                  <LogoComponent className="h-[44px] w-[44px]" alt={`${p.name} logo`} />
                </div>

                {/* Platform Name */}
                <h3 className="mt-5 font-display text-[19px] font-bold text-[#2B211B] group-hover:text-[#D97745] transition-colors">
                  {p.name}
                </h3>

                {/* Short Description */}
                <p className="mt-1.5 text-[13.5px] text-[#76675D] leading-relaxed">
                  {p.tagline}
                </p>

                <span className="mt-6 h-px w-full bg-[#F5EBE1]" />

                {/* VIEW PROFILE ↗ */}
                <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#D97745] group-hover:text-[#2B211B] transition-colors">
                  VIEW PROFILE
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
