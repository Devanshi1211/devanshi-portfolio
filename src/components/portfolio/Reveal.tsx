import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";

  return (
    <Comp
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", shown && "reveal-in", className)}
    >
      {children}
    </Comp>
  );
}

export function SectionHeading({
  title,
  subtitle,
  description,
  className,
}: {
  title: string;
  subtitle?: string;
  description?: string;
  eyebrow?: string;
  className?: string;
}) {
  const sub = subtitle || description;
  return (
    <div className={cn("text-center max-w-3xl mx-auto mb-8 sm:mb-10", className)}>
      <h2 className="font-display text-[24px] sm:text-[28px] md:text-[32px] font-semibold tracking-tight text-[#24221D] uppercase leading-[1.15]">
        {title}
      </h2>
      {sub ? (
        <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] font-medium text-[#6F6A5F]">
          {sub}
        </p>
      ) : null}
    </div>
  );
}
