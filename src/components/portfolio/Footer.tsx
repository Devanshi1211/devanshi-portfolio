import { Github, Instagram, Linkedin } from "lucide-react";
import { LINKS } from "@/lib/portfolio-data";

const socials = [
  { icon: Linkedin, label: "LinkedIn", href: LINKS.linkedin },
  { icon: Github, label: "GitHub", href: LINKS.github },
  { icon: Instagram, label: "Instagram", href: LINKS.instagram },
];

export function Footer() {
  return (
    <footer className="border-t border-[#EDE5CF] bg-[#FFFDF7] py-10 text-[#8A8376]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-5 px-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="space-y-1">
          <p className="text-lg font-bold tracking-tight text-[#24221D]">DEVANSHI CHAUHAN</p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D9A91A]">
            Data · Analytics · Technology
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="grid h-9 w-9 place-items-center rounded-lg border border-[#EDE5CF] bg-[#FFF9EC] text-[#6F6A5F] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F4C542] hover:text-[#D9A91A]"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <p className="text-sm text-[#8A8376]">© 2026 Devanshi Chauhan</p>
      </div>
    </footer>
  );
}
