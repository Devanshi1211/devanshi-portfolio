import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Sparkles, FileText } from "lucide-react";

type Mode = "immersive" | "recruiter";

const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({
  mode: "immersive",
  setMode: () => {},
});

export function useExperienceMode() {
  return useContext(ModeContext);
}

export function ExperienceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("immersive");

  useEffect(() => {
    const stored = localStorage.getItem("experience-mode");
    if (stored === "recruiter") setMode("recruiter");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("mode-recruiter", mode === "recruiter");
    localStorage.setItem("experience-mode", mode);
  }, [mode]);

  return <ModeContext.Provider value={{ mode, setMode }}>{children}</ModeContext.Provider>;
}

export function ModeToggle() {
  const { mode, setMode } = useExperienceMode();
  const recruiter = mode === "recruiter";

  return (
    <button
      type="button"
      onClick={() => setMode(recruiter ? "immersive" : "recruiter")}
      title={
        recruiter
          ? "Recruiter mode: calm layout, no heavy motion"
          : "Immersive mode: 3D data environment"
      }
      aria-pressed={recruiter}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
    >
      {recruiter ? (
        <FileText className="h-3.5 w-3.5 text-primary" />
      ) : (
        <Sparkles className="h-3.5 w-3.5 text-primary" />
      )}
      <span className="hidden sm:inline">{recruiter ? "Recruiter" : "Immersive"}</span>
    </button>
  );
}
