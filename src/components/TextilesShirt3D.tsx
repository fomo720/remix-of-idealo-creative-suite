import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  color: string;
  sleeve: "corta" | "larga";
  imageUrl: string | null;
  /** normalized 0..1 art position on the chest area */
  offsetX?: number;
  offsetY?: number;
  /** overall scale in percent (30..200) matches the 2D editor */
  scale?: number;
  /** horizontal-only stretch in percent (50..200) */
  scaleX?: number;
  /** rotation in degrees */
  rotation?: number;
  /** which side to preview */
  side?: "front" | "back";
};


function ChestDecal({
  imageUrl,
  offsetX = 0,
  offsetY = 0,
  scale = 100,
  scaleX = 100,
  rotation = 0,
  side = "front",
}: Omit<Props, "color" | "sleeve">) {
  const texture = useLoader(THREE.TextureLoader, imageUrl!);
  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 8;
    texture.needsUpdate = true;
  }, [texture]);

  const s = (scale / 100) * 0.9;
  const sx = s * (scaleX / 100);
  const px = (offsetX / 100) * 0.45;
  const py = -(offsetY / 100) * 0.45 + 0.08;
  const rot = (rotation * Math.PI) / 180;
  const z = side === "front" ? 0.31 : -0.31;
  const yaw = side === "front" ? 0 : Math.PI;

  return (
    <mesh position={[px, py, z]} rotation={[0, yaw, -rot]}>
      <planeGeometry args={[sx, s]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.02}
        depthWrite={false}
        roughness={0.9}
        metalness={0}
      />
    </mesh>
  );
}


function Shirt({ color, sleeve, imageUrl, offsetX, offsetY, scale, scaleX, rotation, side }: Props) {
  const bodyColor = useMemo(() => new THREE.Color(color), [color]);

  return (
    <group position={[0, 0, 0]}>
      {/* Body */}
      <RoundedBox args={[1.2, 1.55, 0.55]} radius={0.15} smoothness={6} position={[0, 0, 0]}>
        <meshStandardMaterial color={bodyColor} roughness={0.85} metalness={0.02} />
      </RoundedBox>

      {/* Collar cutout (small dark ring at top-front) */}
      <mesh position={[0, 0.72, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.14, 0.05, 12, 24]} />
        <meshStandardMaterial color={bodyColor} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.72, 0.29]}>
        <circleGeometry args={[0.13, 32]} />
        <meshBasicMaterial color="#1f1f1f" side={THREE.DoubleSide} />
      </mesh>

      {/* Short sleeves */}
      <mesh position={[-0.78, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.32, 0.5, 24]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>
      <mesh position={[0.78, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.28, 0.32, 0.5, 24]} />
        <meshStandardMaterial color={bodyColor} roughness={0.85} />
      </mesh>

      {/* Long sleeves extension */}
      {sleeve === "larga" && (
        <>
          <mesh position={[-1.15, -0.05, 0]} rotation={[0, 0, Math.PI / 2 + 0.15]}>
            <cylinderGeometry args={[0.24, 0.28, 0.85, 24]} />
            <meshStandardMaterial color={bodyColor} roughness={0.85} />
          </mesh>
          <mesh position={[1.15, -0.05, 0]} rotation={[0, 0, Math.PI / 2 - 0.15]}>
            <cylinderGeometry args={[0.24, 0.28, 0.85, 24]} />
            <meshStandardMaterial color={bodyColor} roughness={0.85} />
          </mesh>
        </>
      )}

      {imageUrl ? (
        <Suspense fallback={null}>
          <ChestDecal
            imageUrl={imageUrl}
            offsetX={offsetX}
            offsetY={offsetY}
            scale={scale}
            scaleX={scaleX}
            rotation={rotation}
            side={side}
          />
        </Suspense>
      ) : null}
    </group>
  );
}


export default function TextilesShirt3D(props: Props) {
  const controlsRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  const zoom = (delta: number) => {
    const c = controlsRef.current;
    if (!c) return;
    // OrbitControls dolly by adjusting target distance
    const cam = c.object as THREE.PerspectiveCamera;
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    cam.position.addScaledVector(dir, delta);
    c.update();
  };

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-100 to-neutral-200">
      {ready ? (
        <Canvas
          shadows={false}
          dpr={[1, 2]}
          camera={{ position: [0, 0.1, 3.4], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.75} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} />
          <directionalLight position={[-3, -2, -2]} intensity={0.35} />
          <Shirt {...props} />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={2}
            maxDistance={6}
            rotateSpeed={0.9}
            zoomSpeed={0.8}
            touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
          />
        </Canvas>
      ) : null}

      <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 shadow-lg ring-1 ring-black/10 backdrop-blur">
          <button
            type="button"
            onClick={() => zoom(0.4)}
            className="rounded-full px-3 py-1 text-sm font-bold hover:bg-neutral-100"
            aria-label="Acercar"
          >
            +
          </button>
          <div className="h-4 w-px bg-neutral-300" />
          <button
            type="button"
            onClick={() => zoom(-0.4)}
            className="rounded-full px-3 py-1 text-sm font-bold hover:bg-neutral-100"
            aria-label="Alejar"
          >
            −
          </button>
          <div className="h-4 w-px bg-neutral-300" />
          <button
            type="button"
            onClick={() => controlsRef.current?.reset()}
            className="rounded-full px-3 py-1 text-[11px] font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
        Vista 3D · desliza para rotar
      </div>
    </div>
  );
}
