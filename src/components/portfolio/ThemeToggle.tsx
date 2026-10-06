import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = stored === "dark";
    setDark(prefers);
    document.documentElement.classList.toggle("dark", prefers);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
    >
      <Sun
        className="absolute h-4 w-4 transition-all duration-500"
        style={{
          opacity: dark ? 0 : 1,
          transform: dark ? "rotate(-90deg) scale(0.6)" : "none",
        }}
      />
      <Moon
        className="absolute h-4 w-4 transition-all duration-500"
        style={{
          opacity: dark ? 1 : 0,
          transform: dark ? "none" : "rotate(90deg) scale(0.6)",
        }}
      />
    </button>
  );
}
