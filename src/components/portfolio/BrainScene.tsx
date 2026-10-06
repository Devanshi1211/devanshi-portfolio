import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LEFT = ["#2563EB", "#4F46E5", "#818CF8"];
const RIGHT = ["#A21CAF", "#D946EF", "#F472B6"];
const CENTER = ["#7C3AED", "#8B5CF6", "#C4B5FD"];

function useIsDark() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const read = () => setDark(document.documentElement.classList.contains("dark"));
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return dark;
}

/** Point cloud shaped like two brain hemispheres, coloured by side. */
function BrainPoints({ count, dark }: { count: number; dark: boolean }) {
  const points = useRef<THREE.Points>(null);
  const targets = useRef<Float32Array>(new Float32Array(count * 3));

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;

      // ellipsoid lobe with a folded surface bias
      const u = Math.random() * Math.PI * 2;
      const v = Math.acos(2 * Math.random() - 1);
      const shell = 0.88 + Math.random() * 0.12;
      const fold = 1 + Math.sin(u * 8) * 0.09 + Math.cos(v * 6) * 0.07;

      const x = side * (0.35 + Math.abs(Math.sin(v) * Math.cos(u)) * 1.35) * shell * fold;
      const y = Math.cos(v) * 1.05 * shell * fold;
      const z = Math.sin(v) * Math.sin(u) * 1.25 * shell * fold;

      targets.current[i * 3] = x;
      targets.current[i * 3 + 1] = y;
      targets.current[i * 3 + 2] = z;

      // start scattered, settle into the brain
      pos[i * 3] = x + (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = y + (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = z + (Math.random() - 0.5) * 5;

      const mid = 1 - Math.min(1, Math.abs(x) / 0.55);
      const palette = mid > 0.6 ? CENTER : side < 0 ? LEFT : RIGHT;
      c.set(palette[Math.floor(Math.random() * palette.length)]!);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    const p = points.current;
    if (!p) return;
    const attr = p.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const ease = Math.min(1, delta * 2.2);

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = arr[i]! + (targets.current[i]! - arr[i]!) * ease;
      arr[i + 1] = arr[i + 1]! + (targets.current[i + 1]! - arr[i + 1]!) * ease;
      arr[i + 2] = arr[i + 2]! + (targets.current[i + 2]! - arr[i + 2]!) * ease;
    }
    attr.needsUpdate = true;

    p.rotation.y = Math.sin(t * 0.08) * 0.35;
    p.rotation.x = Math.sin(t * 0.05) * 0.08;
    const m = p.material as THREE.PointsMaterial;
    m.opacity = (dark ? 0.62 : 0.42) * (0.9 + Math.sin(t * 0.8) * 0.06);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        size={dark ? 0.022 : 0.026}
        sizeAttenuation
        depthWrite={false}
        blending={dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

/** Soft synapse arcs bridging the two hemispheres. */
function Synapses({ dark }: { dark: boolean }) {
  const group = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const out: { pts: THREE.Vector3[]; color: string }[] = [];
    for (let i = 0; i < 14; i++) {
      const y = (Math.random() - 0.5) * 1.6;
      const z = (Math.random() - 0.5) * 1.6;
      out.push({
        pts: [
          new THREE.Vector3(-1.1 - Math.random() * 0.4, y, z),
          new THREE.Vector3(0, y * 0.4, z * 0.4 + 0.3),
          new THREE.Vector3(1.1 + Math.random() * 0.4, -y, -z),
        ],
        color: CENTER[i % CENTER.length]!,
      });
    }
    return out;
  }, []);

  useFrame((state) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.08) * 0.35;
  });

  return (
    <group ref={group}>
      {lines.map((l, i) => {
        const curve = new THREE.CatmullRomCurve3(l.pts);
        const geom = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
        return (
          <primitive
            key={i}
            object={
              new THREE.Line(
                geom,
                new THREE.LineBasicMaterial({
                  color: l.color,
                  transparent: true,
                  opacity: dark ? 0.28 : 0.18,
                }),
              )
            }
          />
        );
      })}
    </group>
  );
}

export default function BrainScene({ mobile = false }: { mobile?: boolean }) {
  const dark = useIsDark();
  const count = mobile ? 1800 : 4200;

  return (
    <Canvas
      dpr={[1, mobile ? 1.2 : 1.6]}
      camera={{ position: [0, 0, 4.4], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <BrainPoints count={count} dark={dark} />
      <Synapses dark={dark} />
    </Canvas>
  );
}
