import { motion, useReducedMotion } from "framer-motion";
import { Check, Code2, Database, Flame, Trophy, Zap } from "lucide-react";
import { CODING_BADGES, type CodingBadge } from "@/lib/portfolio-data";

const icons = {
  code: Code2,
  trophy: Trophy,
  bolt: Zap,
  flame: Flame,
  check: Check,
  database: Database,
} as const;

const tones: Record<CodingBadge["tone"], string> = {
  coral: "var(--coral)",
  violet: "var(--violet)",
  emerald: "var(--emerald)",
  amber: "var(--amber)",
  primary: "var(--primary)",
  slate: "var(--muted-foreground)",
};

const HEX = "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)";

export function Badges() {
  const reduce = useReducedMotion();

  return (
    <section id="badges" className="scroll-mt-24 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            Problem Solving &amp; Learning Achievements
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Coding Badges</h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {CODING_BADGES.map((badge, i) => {
            const Icon = icons[badge.icon];
            const tone = tones[badge.tone];
            return (
              <motion.div
                key={badge.name}
                className="flex flex-col items-center text-center"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? {} : { y: -6 }}
              >
                <div
                  className="grid h-16 w-16 place-items-center transition-shadow sm:h-[72px] sm:w-[72px]"
                  style={{
                    clipPath: HEX,
                    background: `linear-gradient(160deg, ${tone}, color-mix(in oklab, ${tone} 65%, black))`,
                    boxShadow: `0 12px 28px -14px ${tone}`,
                  }}
                >
                  <Icon className="h-7 w-7 text-background" strokeWidth={2.2} aria-hidden />
                </div>
                <p className="mt-4 text-sm font-semibold leading-snug text-foreground">{badge.name}</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {badge.platform}
                </p>
                {badge.note ? (
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">
                    {badge.note}
                  </p>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
