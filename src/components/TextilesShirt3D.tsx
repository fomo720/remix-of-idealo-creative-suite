import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  color: string;
  sleeve: "corta" | "larga";
  imageUrl: string | null;
  offsetX?: number;
  offsetY?: number;
  scale?: number;
  scaleX?: number;
  rotation?: number;
  side?: "front" | "back";
};

// Preload the shirt model
useGLTF.preload("/models/shirt/scene.gltf");

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

  // The GLTF model, after Center + scale, roughly spans ~1.8 units tall.
  // Chest is around y=0.15, front face around z=0.28.
  const s = (scale / 100) * 0.55;
  const sx = s * (scaleX / 100);
  const px = (offsetX / 100) * 0.35;
  const py = -(offsetY / 100) * 0.35 + 0.15;
  const rot = (rotation * Math.PI) / 180;
  const z = side === "front" ? 0.29 : -0.29;
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

function ShirtModel({ color, side = "front" }: { color: string; side?: "front" | "back" }) {
  const gltf = useGLTF("/models/shirt/scene.gltf");
  const cloned = useMemo(() => {
    const s = gltf.scene.clone(true);
    s.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if ((mesh as any).isMesh) {
        const src = mesh.material as THREE.MeshStandardMaterial;
        const m = src.clone();
        m.color = new THREE.Color(color);
        // Keep the baked shading but tint via color; drop base map so tint is visible
        m.map = null;
        m.metalness = 0.02;
        m.roughness = 0.85;
        mesh.material = m;
      }
    });
    return s;
  }, [gltf.scene, color]);

  return (
    <group rotation={[0, side === "back" ? Math.PI : 0, 0]}>
      <primitive object={cloned} />
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
    const cam = c.object as THREE.PerspectiveCamera;
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    cam.position.addScaledVector(dir, delta);
    c.update();
  };

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-100 to-neutral-200">
      {ready ? (
        <Canvas
          shadows={false}
          dpr={[1, 2]}
          camera={{ position: [0, 0.1, 2.6], fov: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 4, 5]} intensity={0.9} />
          <directionalLight position={[-3, -2, -2]} intensity={0.35} />

          <Suspense fallback={null}>
            <Center scale={1.6}>
              <ShirtModel color={props.color} side={props.side} />
            </Center>
            {props.imageUrl ? <ChestDecal {...props} /> : null}
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={1.4}
            maxDistance={5}
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
