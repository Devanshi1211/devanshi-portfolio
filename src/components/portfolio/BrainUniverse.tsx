import { Suspense, lazy, useEffect, useState } from "react";
import { useExperienceMode } from "./ExperienceMode";
import { NeuralCore } from "./NeuralCore";

const BrainScene = lazy(() => import("./BrainScene"));

/**
 * 3D brain universe: instanced particles forming two hemispheres
 * (blue/indigo left, magenta/pink right, violet bridge).
 * Falls back to the 2D neural canvas on low-power / reduced-motion / recruiter mode.
 */
export function BrainUniverse() {
  const { mode } = useExperienceMode();
  const [caps, setCaps] = useState<{ ready: boolean; ok: boolean; mobile: boolean }>({
    ready: false,
    ok: false,
    mobile: false,
  });

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setCaps({ ready: true, ok: webgl && !reduce && cores >= 4, mobile });
  }, []);

  const live = caps.ready && caps.ok && mode === "immersive";

  if (!live) return <NeuralCore />;

  return (
    <div className="absolute inset-0">
      <NeuralCore density={0.35} />
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            "radial-gradient(circle at 50% 46%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 46%, rgba(0,0,0,1) 18%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0) 78%)",
        }}
      >
        <Suspense fallback={null}>
          <BrainScene mobile={caps.mobile} />
        </Suspense>
      </div>
    </div>
  );
}
