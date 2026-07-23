import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
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

useGLTF.preload("/models/shirt/scene.gltf");

/**
 * Builds a CanvasTexture that becomes the shirt's diffuse map.
 * The design is painted directly onto the texture at UV coordinates,
 * so it follows the shirt's real UVs (curves, sleeves, folds) instead
 * of floating on top as a rigid PlaneGeometry decal.
 *
 * The model's UVs live in u∈[2.09, 2.98], v∈[0.057, 0.96]. With
 * RepeatWrapping the sampler reads (u mod 1, v mod 1), so we paint
 * inside a 1024×1024 tile using those normalized coords.
 */
function useShirtTexture({
  color,
  imageUrl,
  offsetX = 0,
  offsetY = 0,
  scale = 100,
  scaleX = 100,
  rotation = 0,
  side = "front",
}: Omit<Props, "sleeve">) {
  // Load the user image imperatively so we can redraw the canvas on change.
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  useEffect(() => {
    if (!imageUrl) {
      setImg(null);
      return;
    }
    const i = new Image();
    i.crossOrigin = "anonymous";
    i.onload = () => setImg(i);
    i.src = imageUrl;
  }, [imageUrl]);

  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 1024;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 8;
    t.flipY = false; // gltf UVs
    return { canvas: c, texture: t };
  }, []);

  useEffect(() => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;

    // 1) Base fabric color fills the whole UV tile.
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();

    // 2) Paint the user's design at the chest UV region.
    if (img) {
      // Chest region in normalized UV space (found empirically for this model).
      // Front chest sits around (u≈0.55, v≈0.42); the back mirrors to (u≈0.55, v≈0.72).
      const chest = side === "front" ? { u: 0.55, v: 0.42 } : { u: 0.55, v: 0.72 };

      const baseSize = 0.28; // ~28% of the UV tile → realistic chest print size
      const s = (scale / 100) * baseSize;
      const sx = s * (scaleX / 100);
      const sy = s;

      // Slider offsets nudge inside the UV tile (±35% of base size).
      const du = (offsetX / 100) * baseSize * 0.6;
      const dv = -(offsetY / 100) * baseSize * 0.6;

      const cx = (chest.u + du) * W;
      const cy = (chest.v + dv) * H;
      const dw = sx * W;
      const dh = sy * H;

      const ratio = img.width / img.height;
      // Fit the image into the target box while preserving aspect ratio.
      let drawW = dw;
      let drawH = dh;
      if (ratio > dw / dh) {
        drawH = dw / ratio;
      } else {
        drawW = dh * ratio;
      }

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
      ctx.restore();
    }

    texture.needsUpdate = true;
  }, [canvas, texture, color, img, offsetX, offsetY, scale, scaleX, rotation, side]);

  return texture;
}

function ShirtModel(props: Omit<Props, "sleeve">) {
  const gltf = useGLTF("/models/shirt/scene.gltf");
  const texture = useShirtTexture(props);

  const cloned = useMemo(() => {
    const s = gltf.scene.clone(true);
    s.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if ((mesh as any).isMesh) {
        const src = mesh.material as THREE.MeshStandardMaterial;
        const m = src.clone();
        // Diffuse comes from the CanvasTexture (base color + design baked in).
        m.map = texture;
        m.color = new THREE.Color("#ffffff");
        m.metalness = 0.02;
        m.roughness = 0.85;
        m.needsUpdate = true;
        mesh.material = m;
      }
    });
    return s;
  }, [gltf.scene, texture]);

  return (
    <group rotation={[0, props.side === "back" ? Math.PI : 0, 0]}>
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
              <ShirtModel
                color={props.color}
                imageUrl={props.imageUrl}
                offsetX={props.offsetX}
                offsetY={props.offsetY}
                scale={props.scale}
                scaleX={props.scaleX}
                rotation={props.rotation}
                side={props.side}
              />
            </Center>
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
