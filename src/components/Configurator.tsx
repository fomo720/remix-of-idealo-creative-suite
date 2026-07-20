import { useEffect, useMemo, useRef, useState } from "react";
import {
  Upload, Check, ArrowRight, Sparkles, Package, Layers, Scissors,
  FileImage, ImagePlus, Circle, Square, RectangleHorizontal, Squircle,
  Cloud, Heart, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter,
  Copy, Trash2, ZoomIn, Sun, Contrast, Info, ShieldCheck, Droplets, MousePointer2,
  HandCoins, Eye, PaintBucket, Anchor, Tag,
  BookOpen, NotebookPen, Grid3x3, AlignJustify, Dot, StickyNote,
  Flame, Wallet, KeyRound, Coffee, Wine, TreePalm, RotateCcw, Move, Gem,
  FileCheck2, Printer, Truck, CreditCard, FileText, FolderOpen, Newspaper,
  Palette, PencilRuler, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

import kissCutSample from "@/assets/cut-kiss-idealo.png.asset.json";
import dieCutSample from "@/assets/cut-die-hand.png.asset.json";
import sheetsSample from "@/assets/cut-sheets-names.png.asset.json";
import dinoSticker from "@/assets/dino-sticker.png.asset.json";
import stickersHandCover from "@/assets/stickers-hand-cover.png.asset.json";
import laserStanleyCover from "@/assets/laser-stanley-cover.jpg.asset.json";
import clearSticker from "@/assets/clear-sticker.png.asset.json";
import coinHandIcon from "@/assets/coin-hand.png.asset.json";
import waterDropIcon from "@/assets/water-drop.png.asset.json";
import stickerTagIcon from "@/assets/sticker-tag.png.asset.json";
import cadenaFotoMadera from "@/assets/cadena-foto-madera.jpg.asset.json";
import cocoGrabado from "@/assets/coco-grabado.jpg.asset.json";
import cadenaBarra from "@/assets/cadena-barra.jpg.asset.json";
import cadenaCandado from "@/assets/cadena-candado.jpg.asset.json";
import cadenaPlaca from "@/assets/cadena-placa.jpg.asset.json";
import owalaFreesipBlue from "@/assets/owala-freesip-blue.png.asset.json";
import owalaFreesipPink from "@/assets/owala-freesip-pink.png.asset.json";
import owalaFreesipDark from "@/assets/owala-freesip-dark.png.asset.json";
import yetiMoto from "@/assets/yeti-moto.jpg.asset.json";
import carteraVenado from "@/assets/cartera-venado-v2.jpg.asset.json";
import llaveroDavid from "@/assets/llavero-cuero-madera.jpg.asset.json";
import llaveroMadera from "@/assets/llavero-madera-cali.jpg.asset.json";
import vasoAves from "@/assets/vaso-aves.jpg.asset.json";
import tablaSalmo from "@/assets/tabla-teller.jpg.asset.json";
import ironOnCover from "@/assets/portfolio-camisetas-estampadas.png.asset.json";
import libretasCover from "@/assets/evt-cuaderno-sticker.jpg.asset.json";
import imprentaCover from "@/assets/portfolio-tarjetas.jpg.asset.json";

const CoinHandIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <img src={coinHandIcon.url} alt="" className={className} style={{ filter: "grayscale(1) brightness(1.35) contrast(0.75)" }} />
);
const WaterDropBlackIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <img src={waterDropIcon.url} alt="" className={className} style={{ filter: "brightness(0)" }} />
);
const StickerTagIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <img src={stickerTagIcon.url} alt="" className={className} />
);

/**
 * SmartImage: image with shimmer skeleton placeholder that fades out on load.
 * Must be used inside a parent with `position: relative` and a fixed height/aspect.
 */
function SmartImage({
  src,
  alt = "",
  className = "",
  fit = "cover",
  loading = "lazy",
}: {
  src: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
  loading?: "lazy" | "eager";
}) {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 animate-pulse"
          style={{
            background:
              "linear-gradient(110deg, rgba(0,0,0,0.04) 20%, rgba(0,0,0,0.09) 40%, rgba(0,0,0,0.04) 60%)",
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-300",
          fit === "contain" ? "object-contain" : "object-cover",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
      />
    </>
  );
}





type Category = "stickers" | "iron-ons" | "libretas" | "laser" | "imprenta";
type ImprentaProductId = "tarjetas" | "menus" | "carpetas" | "brochures";
type ImprentaStyleId = "plantilla" | "personalizado" | "propio";
type LaserProductId =
  | "tabla" | "botella" | "cartera" | "llavero-cuero"
  | "llavero-madera" | "vaso" | "coco" | "cadena";
type CutShape = "die-cut" | "kiss-cut" | "sheets";
type Material =
  | "white-vinyl-removable"
  | "clear-vinyl-removable";
type StickerShape = "circle" | "square" | "rectangle" | "rounded" | "cloud" | "heart";
type NotebookStyle = "cover-only" | "cover-pages";
type NotebookMaterial = "cover-matte" | "cover-glossy";
type PageType = "blank" | "ruled" | "grid" | "dotted";

const cuts: { id: CutShape; name: string; desc: string; accent: string }[] = [
  {
    id: "die-cut",
    name: "Troquelado",
    desc: "Stickers individuales cortados con precisión al contorno exacto de tu diseño.",
    accent: "var(--brand-red)",
  },
  {
    id: "kiss-cut",
    name: "Corte de Beso",
    desc: "Cortados alrededor de tu forma dejando el papel base intacto para despegarlos fácilmente.",
    accent: "var(--brand-orange)",
  },
  {
    id: "sheets",
    name: "Hoja (Diseño Único)",
    desc: "Stickers personalizados cortados con precisión en hojas, sin cantidad mínima.",
    accent: "var(--brand-green)",
  },
];

const materials: {
  id: Material; name: string; desc: string; priceFactor: number; swatch: string;
  finish: string; advantages: { icon: React.ReactNode; text: string }[]; useCase: string;
  sampleImage?: string;
}[] = [
  {
    id: "white-vinyl-removable", name: "Stickers de Vinil Blanco Removible Semi-Brillante",
    desc: "El más económico · Impermeable · Removible", priceFactor: 1.05, swatch: "#ffffff",
    finish: "Semi-Brillante (Laminado)",
    sampleImage: dinoSticker.url,
    advantages: [
      { icon: <CoinHandIcon />, text: "El más económico" },
      { icon: <WaterDropBlackIcon />, text: "Impermeable" },
      { icon: <StickerTagIcon />, text: "Removible sin dejar residuos" },
    ],
    useCase: "Ideal para etiquetas de producto y campañas versátiles.",
  },
  {
    id: "clear-vinyl-removable", name: "Stickers de Vinil Transparente Removible Semi-Brillante",
    desc: "Transparente · Impreso con tinta blanca", priceFactor: 1.3, swatch: "linear-gradient(135deg,#f0f9ff,#fdf4ff)",
    finish: "Semi-Brillante",
    sampleImage: clearSticker.url,
    advantages: [
      { icon: <Eye className="h-4 w-4" style={{ color: "var(--brand-blue)" }} />, text: "Material transparente" },
      { icon: <PaintBucket className="h-4 w-4" style={{ color: "var(--brand-violet)" }} />, text: "Impreso con tinta blanca" },
      { icon: <WaterDropBlackIcon />, text: "Impermeable" },
    ],
    useCase: "Ideal para vidrio, escaparates y branding con efecto cristal.",
  },
];

type ShapeItem = {
  id: StickerShape; name: string; icon: React.ReactNode; aspect: number;
  clip?: string; radius?: string; path?: string; viewBox?: string;
};

const CLOUD_PATH = "M 60 90 C 20 90 10 55 40 45 C 30 15 80 5 95 30 C 120 5 175 20 170 55 C 210 55 210 100 170 100 C 155 130 100 130 90 105 C 75 125 40 120 60 90 Z";
const HEART_PATH = "M 100 180 L 30 110 C 5 85 5 45 35 25 C 60 8 90 20 100 45 C 110 20 140 8 165 25 C 195 45 195 85 170 110 Z";

const shapes: ShapeItem[] = [
  { id: "circle", name: "Círculo", icon: <Circle className="h-5 w-5" />, aspect: 1, radius: "9999px" },
  { id: "square", name: "Cuadrado", icon: <Square className="h-5 w-5" />, aspect: 1, radius: "0px" },
  { id: "rectangle", name: "Rectángulo", icon: <RectangleHorizontal className="h-5 w-5" />, aspect: 1.6, radius: "0px" },
  { id: "rounded", name: "Esq. Redondeada", icon: <Squircle className="h-5 w-5" />, aspect: 1, radius: "28px" },
];

const sizePresets = [
  { w: 2, h: 2, label: '2" x 2"', hint: "Logos pequeños en empaques" },
  { w: 3, h: 3, label: '3" x 3"', hint: "Estándar laptops y termos" },
  { w: 4, h: 4, label: '4" x 4"', hint: "Branding visible y ventanas" },
  { w: 5, h: 5, label: '5" x 5"', hint: "Tamaño grande exteriores" },
];

/* ---------- Libretas ---------- */
const notebookStyles: {
  id: NotebookStyle; name: string; desc: string; accent: string; icon: React.ReactNode;
}[] = [
  {
    id: "cover-only",
    name: "Solo Portada",
    desc: "Imprimimos únicamente la carátula con tu diseño. Interior en blanco.",
    accent: "var(--brand-violet)",
    icon: <BookOpen className="h-8 w-8" />,
  },
  {
    id: "cover-pages",
    name: "Portada + Páginas",
    desc: "Carátula personalizada más logo o marca de agua sutil en cada hoja interior.",
    accent: "var(--brand-pink)",
    icon: <NotebookPen className="h-8 w-8" />,
  },
];

const notebookMaterials: {
  id: NotebookMaterial; name: string; desc: string; finish: string; swatch: string;
  priceFactor: number; advantages: { icon: React.ReactNode; text: string }[]; useCase: string;
}[] = [
  {
    id: "cover-matte",
    name: "Cartulina Mate 300gsm",
    desc: "Textura suave, elegante y sin reflejos.",
    finish: "Mate",
    swatch: "#efeae4",
    priceFactor: 1,
    advantages: [
      { icon: <Sparkles className="h-4 w-4" style={{ color: "var(--brand-violet)" }} />, text: "Look premium sin brillo" },
      { icon: <ShieldCheck className="h-4 w-4" style={{ color: "var(--brand-green)" }} />, text: "Resistente al roce" },
      { icon: <PaintBucket className="h-4 w-4" style={{ color: "var(--brand-blue)" }} />, text: "Colores sobrios y naturales" },
    ],
    useCase: "Ideal para libretas ejecutivas, planners y regalos corporativos.",
  },
  {
    id: "cover-glossy",
    name: "Cartulina Brillante 300gsm",
    desc: "Acabado brillante con protección UV.",
    finish: "Brillante UV",
    swatch: "linear-gradient(135deg,#f5f7fa,#e4e9f2)",
    priceFactor: 1.15,
    advantages: [
      { icon: <Eye className="h-4 w-4" style={{ color: "var(--brand-blue)" }} />, text: "Colores vibrantes" },
      { icon: <WaterDropBlackIcon />, text: "Repele humedad y manchas" },
      { icon: <Anchor className="h-4 w-4" style={{ color: "var(--brand-red)" }} />, text: "Portada más durable" },
    ],
    useCase: "Ideal para fotografía, catálogos y libretas escolares.",
  },
];

const notebookSizes = [
  { id: "a6", label: "A6", cm: "10.5 × 14.8 cm", w: 10.5, h: 14.8, hint: "Bolsillo · ideas rápidas" },
  { id: "a5", label: "A5", cm: "14.8 × 21 cm", w: 14.8, h: 21, hint: "Estándar · más común" },
  { id: "b5", label: "B5", cm: "17.6 × 25 cm", w: 17.6, h: 25, hint: "Mediana · notas amplias" },
  { id: "a4", label: "A4", cm: "21 × 29.7 cm", w: 21, h: 29.7, hint: "Grande · oficina" },
];

const pageTypes: { id: PageType; name: string; desc: string; icon: React.ReactNode }[] = [
  { id: "blank", name: "Blanco", desc: "Hojas lisas sin guías", icon: <StickyNote className="h-4 w-4" /> },
  { id: "ruled", name: "Rayado", desc: "Líneas horizontales", icon: <AlignJustify className="h-4 w-4" /> },
  { id: "grid", name: "Cuadriculado", desc: "Cuadrícula 5mm", icon: <Grid3x3 className="h-4 w-4" /> },
  { id: "dotted", name: "Punteado", desc: "Puntos guía discretos", icon: <Dot className="h-4 w-4" /> },
];

function pageBackground(type: PageType): React.CSSProperties {
  switch (type) {
    case "ruled":
      return {
        backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 22px, rgba(59,130,246,0.35) 22px 23px)",
      };
    case "grid":
      return {
        backgroundImage:
          "linear-gradient(to right, rgba(148,163,184,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.35) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      };
    case "dotted":
      return {
        backgroundImage: "radial-gradient(circle, rgba(100,116,139,0.55) 1px, transparent 1.4px)",
        backgroundSize: "16px 16px",
      };
    default:
      return {};
  }
}

/* ---------- Grabado Láser ---------- */
type LaserColor = { name: string; hex: string; image?: string };
type LaserVariant = {
  id: string;
  name: string;
  desc: string;
  priceDelta?: number; // added to base
  colors: LaserColor[];
  image?: string; // optional reference photo URL for this variant
};
type LaserProduct = {
  id: LaserProductId;
  name: string;
  desc: string;
  hint: string;
  surface: string;      // background color / gradient of the material
  engrave: string;      // engraved (etched) mark color
  price: number;        // unit price base in Lempiras
  icon: React.ReactNode;
  shape: "board" | "bottle" | "wallet" | "tag" | "glass" | "coconut" | "pendant";
  heroImage?: string;   // optional hero image on the product card
  variantLabel?: string; // e.g. "Modelo", "Estilo"
  variants?: LaserVariant[];
};

const laserProducts: LaserProduct[] = [
  {
    id: "tabla", name: "Tabla de Cortar", desc: "Madera de bambú prensada", hint: "Regalos de cocina y bodas",
    surface: "linear-gradient(135deg,#d9a869,#b8823f)", engrave: "#3a2110", price: 380,
    icon: <Square className="h-8 w-8" />, shape: "board",
    heroImage: tablaSalmo.url,
    variantLabel: "Estilo de tabla",
    variants: [
      { id: "rect-grande", name: "Rectangular Grande", desc: "38 × 25 cm · bambú prensado", colors: [
        { name: "Bambú natural", hex: "#c99560" }, { name: "Nogal", hex: "#5a3720" },
      ]},
      { id: "rect-manija", name: "Con Manija (Paleta)", desc: "40 × 20 cm · agarre lateral", colors: [
        { name: "Bambú natural", hex: "#c99560" }, { name: "Cerezo", hex: "#8a4a2a" },
      ]},
      { id: "redonda", name: "Redonda de Quesos", desc: "Ø 28 cm · borde biselado", colors: [
        { name: "Bambú natural", hex: "#c99560" }, { name: "Nogal", hex: "#5a3720" },
      ]},
      { id: "picnic", name: "Set Picnic (larga)", desc: "45 × 18 cm · para tablas de embutidos", priceDelta: 60, colors: [
        { name: "Bambú natural", hex: "#c99560" },
      ]},
    ],
  },
  {
    id: "botella", name: "Botella Metálica", desc: "Estilo Yeti · Owala · Stanley", hint: "Corporativo y deportivo",
    surface: "linear-gradient(135deg,#3a3a3a,#1c1c1c)", engrave: "#e8ecef", price: 450,
    icon: <Coffee className="h-8 w-8" />, shape: "bottle",
    heroImage: yetiMoto.url,
    variantLabel: "Modelo",
    variants: [
      { id: "yeti-stack-16", name: "Yeti Rambler® Apilable 16 oz", desc: "473 ml · para café y cerveza", colors: [
        { name: "Negro", hex: "#111111" }, { name: "Rojo", hex: "#c8352b" },
        { name: "Amarillo", hex: "#f0c419" }, { name: "Azul", hex: "#2b4d8e" }, { name: "Blanco", hex: "#f2f2f2" },
      ]},
      { id: "yeti-jr-10", name: "Yeti Rambler® Jr. 10 oz", desc: "Para niños · irrompible", priceDelta: -60, colors: [
        { name: "Verde", hex: "#3e6b3a" }, { name: "Amarillo", hex: "#f0c419" },
        { name: "Blanco", hex: "#f2f2f2" }, { name: "Negro", hex: "#111111" },
      ]},
      { id: "yeti-straw-42", name: "Yeti Rambler® 42 oz c/sorbete", desc: "1.2 L · caja/deportivo", priceDelta: 180, colors: [
        { name: "Amarillo", hex: "#f0c419" }, { name: "Naranja", hex: "#e07a29" }, { name: "Verde", hex: "#3e6b3a" },
      ]},
      { id: "yeti-30", name: "Yeti Rambler® 30 oz", desc: "887 ml · viajes y oficina", priceDelta: 120, colors: [
        { name: "Blanco", hex: "#f2f2f2" }, { name: "Negro", hex: "#111111" }, { name: "Verde", hex: "#3e6b3a" },
      ]},
      { id: "owala-slider", name: "Owala SmoothSip® Slider", desc: "Anti-derrame · frío o caliente", priceDelta: 90, colors: [
        { name: "Rosado", hex: "#e6a3b8" }, { name: "Blanco", hex: "#f2f2f2" }, { name: "Negro", hex: "#111111" },
      ]},
      { id: "owala-freesip", name: "Owala FreeSip® 24 oz", desc: "710 ml · Award winning · anti-derrame · 24 h frío",
        priceDelta: 110, image: owalaFreesipBlue.url, colors: [
        { name: "Azul Hydrangea", hex: "#8ba6dc", image: owalaFreesipBlue.url },
        { name: "Rosado Sandía", hex: "#eaa8b3", image: owalaFreesipPink.url },
        { name: "Verde Bosque", hex: "#3a4a3f", image: owalaFreesipDark.url },
      ]},
    ],
  },
  {
    id: "cartera", name: "Cartera de Cuero (Varón)", desc: "Piel legítima curtida", hint: "Iniciales y logos",
    surface: "linear-gradient(135deg,#4a2c1a,#2d180c)", engrave: "#0f0803", price: 520,
    icon: <Wallet className="h-8 w-8" />, shape: "wallet",
    heroImage: carteraVenado.url,
    variantLabel: "Tipo de cartera",
    variants: [
      { id: "bifold", name: "Bifold Clásica", desc: "Doble pliegue · 8 tarjetas", colors: [
        { name: "Café", hex: "#5a3720" }, { name: "Negro", hex: "#111111" }, { name: "Miel", hex: "#8a5a2a" },
      ]},
      { id: "trifold", name: "Trifold", desc: "Triple pliegue · más espacio", priceDelta: 40, colors: [
        { name: "Café", hex: "#5a3720" }, { name: "Negro", hex: "#111111" },
      ]},
      { id: "cardholder", name: "Tarjetero Slim", desc: "Ultra delgado · 6 tarjetas", priceDelta: -80, colors: [
        { name: "Café", hex: "#5a3720" }, { name: "Negro", hex: "#111111" }, { name: "Cognac", hex: "#7a4a26" },
      ]},
    ],
  },
  {
    id: "llavero-cuero", name: "Llavero de Cuero", desc: "Piel natural", hint: "Merch y detalles",
    surface: "linear-gradient(135deg,#7a4a26,#4d2c14)", engrave: "#1a0d05", price: 120,
    icon: <KeyRound className="h-8 w-8" />, shape: "tag",
    heroImage: llaveroDavid.url,
    variantLabel: "Forma",
    variants: [
      { id: "rect", name: "Rectangular", desc: "Clásico · 7 × 3 cm", colors: [
        { name: "Café", hex: "#5a3720" }, { name: "Negro", hex: "#111111" }, { name: "Miel", hex: "#8a5a2a" },
      ]},
      { id: "redondo", name: "Redondo", desc: "Ø 4 cm · logos centrados", colors: [
        { name: "Café", hex: "#5a3720" }, { name: "Negro", hex: "#111111" },
      ]},
      { id: "hueso", name: "Hueso (Mascotas)", desc: "Para placas de perros/gatos", colors: [
        { name: "Café", hex: "#5a3720" }, { name: "Rojo", hex: "#8b2a24" },
      ]},
      { id: "corazon", name: "Corazón", desc: "Regalos y parejas", colors: [
        { name: "Rojo", hex: "#8b2a24" }, { name: "Rosado", hex: "#c68796" },
      ]},
    ],
  },
  {
    id: "llavero-madera", name: "Llavero de Madera", desc: "Madera clara pulida", hint: "Souvenirs y eventos",
    surface: "linear-gradient(135deg,#c99560,#a1703b)", engrave: "#3a2110", price: 90,
    heroImage: llaveroMadera.url,
    icon: <KeyRound className="h-8 w-8" />, shape: "tag",
    variantLabel: "Forma",
    variants: [
      { id: "circulo", name: "Círculo", desc: "Ø 4 cm · logos", colors: [
        { name: "Bambú", hex: "#c99560" }, { name: "Nogal", hex: "#5a3720" },
      ]},
      { id: "rect", name: "Rectangular", desc: "7 × 3 cm · nombres", colors: [
        { name: "Bambú", hex: "#c99560" }, { name: "Nogal", hex: "#5a3720" },
      ]},
      { id: "casa", name: "Casita", desc: "Bienvenida y bienes raíces", colors: [
        { name: "Bambú", hex: "#c99560" },
      ]},
      { id: "estrella", name: "Estrella", desc: "Eventos y premios", colors: [
        { name: "Bambú", hex: "#c99560" }, { name: "Nogal", hex: "#5a3720" },
      ]},
    ],
  },
  {
    id: "vaso", name: "Vaso de Vidrio", desc: "Vidrio templado transparente", hint: "Restaurantes y bares",
    surface: "linear-gradient(135deg,#e8f2f7,#c4d8e2)", engrave: "#4d6a75", price: 180,
    heroImage: vasoAves.url,
    icon: <Wine className="h-8 w-8" />, shape: "glass",
    variantLabel: "Tipo de vaso",
    variants: [
      { id: "highball", name: "Highball 12 oz", desc: "Tragos largos · agua/refrescos", colors: [
        { name: "Cristal", hex: "#e8f2f7" },
      ]},
      { id: "whiskey", name: "Whiskey / Old Fashioned", desc: "10 oz · base gruesa", priceDelta: 30, colors: [
        { name: "Cristal", hex: "#e8f2f7" }, { name: "Ámbar", hex: "#d6a95a" },
      ]},
      { id: "pinta", name: "Pinta de Cerveza 16 oz", desc: "Clásico bar", priceDelta: 20, colors: [
        { name: "Cristal", hex: "#e8f2f7" },
      ]},
      { id: "vino", name: "Copa de Vino", desc: "Tallada · 12 oz", priceDelta: 60, colors: [
        { name: "Cristal", hex: "#e8f2f7" },
      ]},
    ],
  },
  {
    id: "coco", name: "Coco (Fruta Natural)", desc: "Grabamos la cáscara del coco", hint: "Eventos tropicales · bodas playa",
    surface: "linear-gradient(135deg,#5a3720,#2f1c0e)", engrave: "#120a04", price: 65,
    icon: <TreePalm className="h-8 w-8" />, shape: "coconut",
    heroImage: cocoGrabado.url,
    // coco es coco — sin variantes
  },
  {
    id: "cadena", name: "Cadenas & Dijes", desc: "Acero inoxidable dorado y plateado", hint: "Regalos con foto o texto",
    surface: "linear-gradient(135deg,#f2d68a,#c99b3a)", engrave: "#1a1a1a", price: 340,
    icon: <Gem className="h-8 w-8" />, shape: "pendant",
    heroImage: cadenaFotoMadera.url,
    variantLabel: "Tipo de dije",
    variants: [
      { id: "redonda-foto", name: "Dije Redondo con Foto", desc: "Ø 2.5 cm · grabado fotográfico", image: cadenaFotoMadera.url, colors: [
        { name: "Oro", hex: "#d4a63a" }, { name: "Plata", hex: "#c8cdd1" }, { name: "Oro rosa", hex: "#e3b6a7" },
      ]},
      { id: "barra-vertical", name: "Barra Vertical 3D", desc: "4 caras · nombres, fechas, coordenadas", image: cadenaBarra.url, priceDelta: 80, colors: [
        { name: "Plata", hex: "#c8cdd1" }, { name: "Oro", hex: "#d4a63a" }, { name: "Negro mate", hex: "#1a1a1a" },
      ]},
      { id: "candado-corazon", name: "Candado Corazón", desc: "Silueta corazón-candado · foto o texto", image: cadenaCandado.url, priceDelta: 40, colors: [
        { name: "Oro", hex: "#d4a63a" }, { name: "Plata", hex: "#c8cdd1" },
      ]},
      { id: "placa-rect", name: "Placa Rectangular con Foto", desc: "Grabado fotográfico de alta definición", image: cadenaPlaca.url, priceDelta: 60, colors: [
        { name: "Plata", hex: "#c8cdd1" }, { name: "Oro", hex: "#d4a63a" }, { name: "Negro", hex: "#1a1a1a" },
      ]},
    ],
  },
];

const presetArts = ["🌈", "⚡", "🔥", "⭐", "🎨", "🚀", "🍕", "🌮"];

type ImprentaProduct = {
  id: ImprentaProductId;
  name: string;
  desc: string;
  icon: React.ReactNode;
  accent: string;
  qtyOptions: number[];
  fields: { key: string; label: string; options: string[] }[];
};

const imprentaProducts: ImprentaProduct[] = [
  {
    id: "tarjetas",
    name: "Tarjetas de Presentación",
    desc: "Papel premium, acabados brillante o mate, doble lado.",
    icon: <CreditCard className="h-8 w-8" />,
    accent: "var(--brand-blue)",
    qtyOptions: [100, 250, 500, 1000],
    fields: [
      { key: "papel", label: "Papel", options: ["Cartulina 300g", "Kraft", "Reciclado"] },
      { key: "acabado", label: "Acabado", options: ["Mate", "Brillante", "UV Selectivo"] },
      { key: "lados", label: "Impresión", options: ["Un lado", "Doble lado"] },
    ],
  },
  {
    id: "menus",
    name: "Menús para Restaurantes",
    desc: "Impresión doble lado, espiral metal, laminado impermeable.",
    icon: <FileText className="h-8 w-8" />,
    accent: "var(--brand-orange)",
    qtyOptions: [10, 25, 50, 100],
    fields: [
      { key: "formato", label: "Formato", options: ["A4", "Tabloide", "Custom"] },
      { key: "acabado", label: "Acabado", options: ["Laminado mate", "Laminado brillante", "Sin laminar"] },
      { key: "encuadernacion", label: "Encuadernación", options: ["Espiral metal", "Grapa", "Suelto"] },
    ],
  },
  {
    id: "carpetas",
    name: "Carpetas Corporativas",
    desc: "Cartón laminado con doble compartimento para propuestas.",
    icon: <FolderOpen className="h-8 w-8" />,
    accent: "var(--brand-violet)",
    qtyOptions: [25, 50, 100, 250],
    fields: [
      { key: "papel", label: "Cartón", options: ["Cartón 300g", "Cartón 350g laminado"] },
      { key: "acabado", label: "Acabado", options: ["Mate", "Brillante", "UV Selectivo"] },
      { key: "compartimentos", label: "Compartimentos", options: ["Sencillo", "Doble", "Con ranura tarjeta"] },
    ],
  },
  {
    id: "brochures",
    name: "Brochures y Volantes",
    desc: "Trifoliares, bifoliares, volantes tamaño carta o media carta.",
    icon: <Newspaper className="h-8 w-8" />,
    accent: "var(--brand-pink)",
    qtyOptions: [100, 250, 500, 1000],
    fields: [
      { key: "formato", label: "Formato", options: ["Volante 1/2 carta", "Volante carta", "Trifoliar", "Bifoliar"] },
      { key: "papel", label: "Papel", options: ["Couché 150g", "Couché 200g", "Bond 90g"] },
      { key: "acabado", label: "Acabado", options: ["Mate", "Brillante", "Sin acabado"] },
    ],
  },
];

const imprentaStyles: { id: ImprentaStyleId; name: string; desc: string; icon: React.ReactNode; accent: string }[] = [
  { id: "plantilla", name: "Diseño desde plantilla", desc: "Elegimos una plantilla profesional y la adaptamos con tus datos. Rápido y económico.", icon: <Layers className="h-7 w-7" />, accent: "var(--brand-blue)" },
  { id: "personalizado", name: "Diseño 100% personalizado", desc: "Nuestro equipo crea el arte desde cero para tu marca. Ideal si querés algo único.", icon: <Palette className="h-7 w-7" />, accent: "var(--brand-violet)" },
  { id: "propio", name: "Ya tengo mi diseño listo", desc: "Subís tu archivo (PDF, AI, PSD o imagen alta resolución) y lo imprimimos.", icon: <PencilRuler className="h-7 w-7" />, accent: "var(--brand-orange)" },
];





function currency(n: number) {
  return "L. " + n.toLocaleString("es-HN", { maximumFractionDigits: 0 });
}

export function Configurator() {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [cut, setCut] = useState<CutShape | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [shape, setShape] = useState<StickerShape>("circle");
  const [preset, setPreset] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<string | null>(null);

  // size
  const [width, setWidth] = useState("3");
  const [height, setHeight] = useState("3");
  const [unit, setUnit] = useState<"in" | "cm">("in");
  const [sizeMode, setSizeMode] = useState<"preset" | "custom">("preset");
  const [activePreset, setActivePreset] = useState<number>(1); // index into sizePresets

  const [qty, setQty] = useState(100);
  const [notes, setNotes] = useState("");

  // notebook state
  const [notebookStyle, setNotebookStyle] = useState<NotebookStyle | null>(null);
  const [notebookMaterial, setNotebookMaterial] = useState<NotebookMaterial | null>(null);
  const [notebookSizeIdx, setNotebookSizeIdx] = useState(1); // A5
  const [pageType, setPageType] = useState<PageType>("blank");
  // notebook page (interior) art
  const [pageArtUploaded, setPageArtUploaded] = useState<string | null>(null);
  const [pageArtPreset, setPageArtPreset] = useState<string | null>(null);
  const [pageArtOpacity, setPageArtOpacity] = useState(35); // 0-100


  // laser state
  const [laserProduct, setLaserProduct] = useState<LaserProductId | null>(null);
  const [laserVariantId, setLaserVariantId] = useState<string | null>(null);
  const [laserColorIdx, setLaserColorIdx] = useState(0);
  const [laserByob, setLaserByob] = useState(false); // "Traigo mi propio producto"
  const [engraveIntensity, setEngraveIntensity] = useState(55); // 0-100 threshold
  const [engraveMode, setEngraveMode] = useState<"outline" | "original">("outline");

  // imprenta state
  const [imprentaProduct, setImprentaProduct] = useState<ImprentaProductId | null>(null);
  const [imprentaStyle, setImprentaStyle] = useState<ImprentaStyleId | null>(null);
  const [imprentaSpecs, setImprentaSpecs] = useState<Record<string, string>>({});
  const [imprentaQty, setImprentaQty] = useState<number>(100);
  const [imprentaFile, setImprentaFile] = useState<string | null>(null);
  const [imprentaNotes, setImprentaNotes] = useState("");
  const imprentaFileRef = useRef<HTMLInputElement>(null);

  // image toolbox
  const [scale, setScale] = useState(100);       // 30-250%
  const [offsetX, setOffsetX] = useState(0);     // % of container (-50..50)
  const [offsetY, setOffsetY] = useState(0);
  const [contrast, setContrast] = useState(100); // %
  const [brightness, setBrightness] = useState(100);
  const [duplicated, setDuplicated] = useState(false);
  const [selected, setSelected] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);
  const pageFileRef = useRef<HTMLInputElement>(null);
  const isNotebook = category === "libretas";
  const isLaser = category === "laser";
  const isImprenta = category === "imprenta";
  const imprentaProductData = imprentaProducts.find((p) => p.id === imprentaProduct);
  const materialData = materials.find((m) => m.id === material);
  const notebookMaterialData = notebookMaterials.find((m) => m.id === notebookMaterial);
  const notebookSizeData = notebookSizes[notebookSizeIdx];
  const laserProductData = laserProducts.find((p) => p.id === laserProduct);
  const laserHasVariants = !!laserProductData?.variants?.length;
  const laserVariantData = laserProductData?.variants?.find((v) => v.id === laserVariantId);
  const laserColor = laserVariantData?.colors[Math.min(laserColorIdx, laserVariantData.colors.length - 1)];
  const laserDesignStep = laserHasVariants ? 4 : 3;
  const shapeData = shapes.find((s) => s.id === shape)!;

  const bulkFactor = useMemo(() => {
    if (qty >= 500) return 0.16; // 84% off
    if (qty >= 250) return 0.20; // 80% off
    if (qty >= 100) return 0.25; // 75% off
    if (qty >= 50)  return 0.30; // 70% off
    if (qty >= 25)  return 0.63; // 37% off
    return 1;
  }, [qty]);

  const price = useMemo(() => {
    if (isLaser) {
      const base = (laserProductData?.price ?? 200) + (laserVariantData?.priceDelta ?? 0);
      // gentle bulk curve for engraving
      const lBulk = qty >= 100 ? 0.75 : qty >= 50 ? 0.85 : qty >= 25 ? 0.92 : 1;
      // If the customer brings their own item, we only charge the engraving service (~40%).
      const byobFactor = laserByob ? 0.4 : 1;
      return Math.round(base * qty * lBulk * byobFactor);
    }
    if (isNotebook) {
      // notebook base price by size (cm²), plus material/style factors
      const areaCm = notebookSizeData.w * notebookSizeData.h;
      const base = 45 + areaCm * 0.35;
      const matFactor = notebookMaterialData?.priceFactor ?? 1;
      const styleFactor = notebookStyle === "cover-pages" ? 1.25 : 1;
      // gentler bulk curve for notebooks
      const nbBulk = qty >= 100 ? 0.7 : qty >= 50 ? 0.8 : qty >= 25 ? 0.9 : 1;
      return Math.round(base * matFactor * styleFactor * nbBulk * qty);
    }
    const base = 8;
    const w = parseFloat(width || "1");
    const h = parseFloat(height || "1");
    const area = Math.max(1, (w * h) / 4);
    const factor = materialData?.priceFactor ?? 1;
    return Math.round(base * area * factor * bulkFactor * qty);
  }, [isLaser, laserProductData, laserVariantData, laserByob, isNotebook, notebookSizeData, notebookMaterialData, notebookStyle, width, height, qty, materialData, bulkFactor]);

  const goTo = (s: number) => setStep(s);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ category?: Category; cut?: CutShape; step?: number }>).detail || {};
      if (detail.category) setCategory(detail.category);
      if (detail.cut) setCut(detail.cut);
      if (typeof detail.step === "number") setStep(detail.step);
    };
    window.addEventListener("idealo:configure", handler as EventListener);
    return () => window.removeEventListener("idealo:configure", handler as EventListener);
  }, []);

  const handleFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUploaded(url);
    setPreset(null);
    resetImageTools();
  };

  const resetImageTools = () => {
    setScale(100); setOffsetX(0); setOffsetY(0);
    setContrast(100); setBrightness(100); setDuplicated(false);
  };

  const clearImage = () => {
    setUploaded(null); setPreset(null); resetImageTools();
    if (fileRef.current) fileRef.current.value = "";
  };

  const handlePageArtFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setPageArtUploaded(url);
    setPageArtPreset(null);
  };
  const clearPageArt = () => {
    setPageArtUploaded(null);
    setPageArtPreset(null);
    if (pageFileRef.current) pageFileRef.current.value = "";
  };



  const applyPreset = (i: number) => {
    setActivePreset(i);
    setSizeMode("preset");
    setWidth(String(sizePresets[i].w));
    setHeight(String(sizePresets[i].h));
    setUnit("in");
  };

  const hasArt = !!(uploaded || preset);

  return (
    <section id="personalizar" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest"
            style={{
              color: "var(--brand-magenta)",
              background: "color-mix(in oklab, var(--brand-magenta) 10%, white)",
              border: "1px solid color-mix(in oklab, var(--brand-magenta) 25%, transparent)",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Configurador guiado
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Diseña tu producto,{" "}
            <span style={{ color: "var(--brand-cyan-deep)" }}>paso a paso</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
            Sube tu logo y mira cómo queda en vivo. Sin compromiso.
          </p>
        </div>

        <Stepper
          step={step}
          onGo={goTo}
          labels={
            isLaser
              ? laserHasVariants
                ? ["Categoría", "Producto", laserProductData?.variantLabel ?? "Modelo", "Diseño"]
                : ["Categoría", "Producto", "Diseño"]
              : isNotebook
              ? ["Categoría", "Estilo", "Material", "Diseño"]
              : isImprenta
              ? ["Categoría", "Producto", "Estilo de diseño", "Especificaciones + Envío"]
              : ["Categoría", "Forma", "Material", "Diseño"]
          }
        />

        <div className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-card-soft sm:p-10">
          {step === 1 && (
            <div className="animate-step-in mx-auto grid w-full auto-rows-fr items-stretch justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              <CategoryCard
                title="Stickers Personalizados"
                desc="Vinil, papel y acabados premium. Individuales, en hojas o rollos."
                accent="var(--brand-magenta)"
                icon={<Layers className="h-7 w-7" />}
                image={stickersHandCover.url}
                active={category === "stickers"}
                onClick={() => setCategory("stickers")}
              />
              <CategoryCard
                title="Iron-ons (Textiles)"
                desc="Estampados sublimados y transfer para uniformes y merch."
                accent="var(--brand-cyan-deep)"
                icon={<Package className="h-7 w-7" />}
                image={ironOnCover.url}
                active={category === "iron-ons"}
                onClick={() => setCategory("iron-ons")}
              />
              <CategoryCard
                title="Libretas Personalizadas"
                desc="Portadas premium con hojas blancas, rayadas, cuadriculadas o punteadas."
                accent="var(--brand-magenta)"
                icon={<BookOpen className="h-7 w-7" />}
                image={libretasCover.url}
                active={category === "libretas"}
                onClick={() => setCategory("libretas")}
              />
              <CategoryCard
                title="Grabado Láser"
                desc="Tablas, botellas, carteras, llaveros y más. Grabado permanente y elegante."
                accent="var(--brand-cyan-deep)"
                icon={<Flame className="h-7 w-7" />}
                image={laserStanleyCover.url}
                active={category === "laser"}
                onClick={() => setCategory("laser")}
              />
              <CategoryCard
                title="Imprenta & Papelería"
                desc="Tarjetas, menús, carpetas y brochures con acabado profesional."
                accent="var(--brand-magenta)"
                icon={<Printer className="h-7 w-7" />}
                image={imprentaCover.url}
                active={category === "imprenta"}
                onClick={() => setCategory("imprenta")}
              />
            </div>
          )}
          {step === 1 && (
            <NavRow onNext={category ? () => goTo(2) : undefined} />
          )}


          {step === 2 && !isNotebook && !isLaser && !isImprenta && (
            <div className="animate-step-in">
              <SectionTitle icon={<Scissors className="h-5 w-5" />} title="Elige la forma de corte" />
              <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cuts.map((c) => (
                  <CutCard
                    key={c.id}
                    id={c.id}
                    title={c.name}
                    desc={c.desc}
                    accent={c.accent}
                    active={cut === c.id}
                    onClick={() => setCut(c.id)}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(1)} onNext={cut ? () => goTo(3) : undefined} />
            </div>
          )}

          {step === 2 && isNotebook && (
            <div className="animate-step-in">
              <SectionTitle icon={<BookOpen className="h-5 w-5" />} title="Elige el estilo de impresión" />
              <div className="grid gap-5 sm:grid-cols-2">
                {notebookStyles.map((s) => (
                  <NotebookStyleCard
                    key={s.id}
                    title={s.name}
                    desc={s.desc}
                    accent={s.accent}
                    icon={s.icon}
                    active={notebookStyle === s.id}
                    onClick={() => setNotebookStyle(s.id)}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(1)} onNext={notebookStyle ? () => goTo(3) : undefined} />
            </div>
          )}

          {step === 2 && isLaser && (
            <div className="animate-step-in">
              <SectionTitle icon={<Flame className="h-5 w-5" />} title="¿Qué producto vamos a grabar?" />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {laserProducts.map((p) => (
                  <LaserProductCard
                    key={p.id}
                    product={p}
                    active={laserProduct === p.id}
                    onClick={() => {
                      setLaserProduct(p.id);
                      // reset variant + byob selection when the product changes
                      const first = p.variants?.[0]?.id ?? null;
                      setLaserVariantId(first);
                      setLaserColorIdx(0);
                      setLaserByob(false);
                    }}
                  />
                ))}
              </div>

              {/* Bring-your-own-product option (per product) */}
              {laserProductData && (
                <button
                  type="button"
                  onClick={() => setLaserByob((b) => !b)}
                  className={cn(
                    "mt-5 flex w-full items-start gap-3 rounded-2xl border-2 p-4 text-left text-sm transition",
                    laserByob
                      ? "border-foreground bg-background shadow-card-soft"
                      : "border-dashed border-border bg-background/60 hover:border-foreground/40",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2",
                      laserByob ? "border-transparent text-white" : "border-border",
                    )}
                    style={laserByob ? { background: "var(--brand-orange)" } : {}}
                  >
                    {laserByob && <Check className="h-4 w-4" />}
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold text-foreground">
                      Yo llevo mi propio {laserProductData.name.toLowerCase()}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      Solo cobramos el servicio de grabado (aprox. 40% del precio). Tú traes el producto y nosotros lo grabamos.
                    </span>
                  </span>
                </button>
              )}

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Grabado permanente sin tinta · el arte se convierte automáticamente en trazo apto para láser.
              </p>
              <NavRow onBack={() => goTo(1)} onNext={laserProduct ? () => goTo(3) : undefined} />
            </div>
          )}

          {/* Laser step 3: variant / color picker (only when the product has variants) */}
          {step === 3 && isLaser && laserHasVariants && laserProductData && (
            <div className="animate-step-in">
              <SectionTitle
                icon={<Package className="h-5 w-5" />}
                title={`${laserProductData.variantLabel ?? "Modelo"} para ${laserProductData.name}`}
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {laserProductData.variants!.map((v) => {
                  const active = laserVariantId === v.id;
                  const thumb = active && laserColor?.image ? laserColor.image : v.image;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        const y = window.scrollY;
                        setLaserVariantId(v.id);
                        setLaserColorIdx(0);
                        // Prevent layout jump when the color panel appears below
                        requestAnimationFrame(() => window.scrollTo({ top: y }));
                      }}
                      className={cn(
                        "group relative flex flex-col gap-2 rounded-2xl border-2 p-4 text-left transition-all",
                        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
                      )}
                    >
                      {thumb && (
                        <div className="relative mb-1 h-64 w-full overflow-hidden rounded-xl bg-gradient-to-br from-muted/60 to-background sm:h-72">
                          <img
                            key={thumb}
                            src={thumb}
                            alt={v.name}
                            className="absolute inset-0 h-full w-full object-contain p-2 transition-opacity duration-300"
                          />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold leading-tight">{v.name}</h4>
                          <p className="mt-0.5 text-xs text-muted-foreground">{v.desc}</p>
                        </div>
                        {active && (
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: "var(--brand-orange)" }}>
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5">
                        {v.colors.map((c, ci) => {
                          const highlighted = active && laserColorIdx === ci;
                          return (
                            <span
                              key={c.name}
                              title={c.name}
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation();
                                const y = window.scrollY;
                                setLaserVariantId(v.id);
                                setLaserColorIdx(ci);
                                requestAnimationFrame(() => window.scrollTo({ top: y }));
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setLaserVariantId(v.id);
                                  setLaserColorIdx(ci);
                                }
                              }}
                              className={cn(
                                "h-5 w-5 cursor-pointer rounded-full border shadow-sm transition hover:scale-110",
                                highlighted ? "ring-2 ring-offset-1 ring-offset-background scale-110" : "border-border",
                              )}
                              style={{ background: c.hex, ...(highlighted ? { boxShadow: `0 0 0 2px var(--brand-orange)` } : {}) }}
                            />
                          );
                        })}
                        <span className="ml-1 text-[10px] text-muted-foreground">{v.colors.length} color{v.colors.length === 1 ? "" : "es"}</span>
                      </div>
                      {typeof v.priceDelta === "number" && v.priceDelta !== 0 && (
                        <span className="mt-1 text-[11px] font-semibold" style={{ color: "var(--brand-orange)" }}>
                          {v.priceDelta > 0 ? "+" : ""}{currency(v.priceDelta)} por unidad
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <NavRow onBack={() => goTo(2)} onNext={laserVariantId ? () => goTo(4) : undefined} />

            </div>
          )}

          {step === laserDesignStep && isLaser && laserProductData && (
            <LaserDesigner
              product={laserProductData}
              variant={laserVariantData}
              color={laserColor}
              byob={laserByob}
              uploaded={uploaded}
              preset={preset}
              onFile={handleFile}
              onPreset={(p) => { setPreset(p); setUploaded(null); resetImageTools(); }}
              onClear={clearImage}
              fileRef={fileRef}
              qty={qty}
              setQty={setQty}
              notes={notes}
              setNotes={setNotes}
              price={price}
              engraveIntensity={engraveIntensity}
              setEngraveIntensity={setEngraveIntensity}
              engraveMode={engraveMode}
              setEngraveMode={setEngraveMode}
              scale={scale}
              setScale={setScale}
              offsetX={offsetX}
              setOffsetX={setOffsetX}
              offsetY={offsetY}
              setOffsetY={setOffsetY}
              duplicated={duplicated}
              setDuplicated={setDuplicated}
              onBack={() => goTo(laserDesignStep - 1)}
            />
          )}

          {step === 3 && !isNotebook && !isLaser && !isImprenta && (
            <div className="animate-step-in">
              <SectionTitle icon={<FileImage className="h-5 w-5" />} title="Selecciona material y acabado" />
              <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
                {materials.map((m, idx) => (
                  <MaterialCard
                    key={m.id}
                    material={m}
                    active={material === m.id}
                    isBestSeller={idx === 0}
                    onClick={() => setMaterial(m.id)}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(2)} onNext={material ? () => goTo(4) : undefined} />
            </div>
          )}

          {step === 3 && isNotebook && (
            <div className="animate-step-in">
              <SectionTitle icon={<FileImage className="h-5 w-5" />} title="Material de la portada" />
              <div className="grid gap-4 sm:grid-cols-2">
                {notebookMaterials.map((m) => (
                  <NotebookMaterialCard
                    key={m.id}
                    material={m}
                    active={notebookMaterial === m.id}
                    onClick={() => setNotebookMaterial(m.id)}
                  />
                ))}
              </div>
              <NavRow onBack={() => goTo(2)} onNext={notebookMaterial ? () => goTo(4) : undefined} />
            </div>
          )}

          {/* ===== IMPRENTA FLOW ===== */}
          {step === 2 && isImprenta && (
            <div className="animate-step-in">
              <SectionTitle icon={<Printer className="h-5 w-5" />} title="¿Qué producto de imprenta necesitás?" />
              <div className="grid gap-5 sm:grid-cols-2">
                {imprentaProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setImprentaProduct(p.id);
                      setImprentaSpecs({});
                      setImprentaQty(p.qtyOptions[0]);
                    }}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all rainbow-splash",
                      imprentaProduct === p.id ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
                    )}
                  >
                    <div className="mb-4 grid h-14 w-14 place-items-center rounded-2xl text-white" style={{ background: p.accent }}>
                      {p.icon}
                    </div>
                    <h4 className="text-lg font-bold">{p.name}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                    {imprentaProduct === p.id && (
                      <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full text-white" style={{ background: p.accent }}>
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <NavRow onBack={() => goTo(1)} onNext={imprentaProduct ? () => goTo(3) : undefined} />
            </div>
          )}

          {step === 3 && isImprenta && (
            <div className="animate-step-in">
              <SectionTitle icon={<Palette className="h-5 w-5" />} title="¿Cómo querés el diseño?" />
              <div className="grid gap-4 sm:grid-cols-3">
                {imprentaStyles.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setImprentaStyle(s.id)}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border-2 p-6 text-left transition-all rainbow-splash",
                      imprentaStyle === s.id ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
                    )}
                  >
                    <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: s.accent }}>
                      {s.icon}
                    </div>
                    <h4 className="font-bold">{s.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{s.desc}</p>
                  </button>
                ))}
              </div>



              <p className="mt-4 text-center text-xs text-muted-foreground">
                Recomendado: si es tu primera impresión con nosotros, elegí "Diseño desde plantilla" — es más rápido y económico.
              </p>
              <NavRow onBack={() => goTo(2)} onNext={imprentaStyle ? () => goTo(4) : undefined} />
            </div>
          )}

          {step === 4 && isImprenta && imprentaProductData && (
            <ImprentaFinal
              product={imprentaProductData}
              style={imprentaStyles.find((s) => s.id === imprentaStyle)!}
              specs={imprentaSpecs}
              setSpecs={setImprentaSpecs}
              qty={imprentaQty}
              setQty={setImprentaQty}
              file={imprentaFile}
              setFile={setImprentaFile}
              notes={imprentaNotes}
              setNotes={setImprentaNotes}
              fileRef={imprentaFileRef}
              onBack={() => goTo(3)}
            />
          )}



          {step === 4 && isNotebook && (
            <NotebookDesigner
              styleId={notebookStyle!}
              material={notebookMaterialData!}
              sizeIdx={notebookSizeIdx}
              setSizeIdx={setNotebookSizeIdx}
              pageType={pageType}
              setPageType={setPageType}
              uploaded={uploaded}
              preset={preset}
              onFile={handleFile}
              onPreset={(p) => { setPreset(p); setUploaded(null); }}
              onClear={clearImage}
              fileRef={fileRef}
              pageArtUploaded={pageArtUploaded}
              pageArtPreset={pageArtPreset}
              pageArtOpacity={pageArtOpacity}
              setPageArtOpacity={setPageArtOpacity}
              onPageArtFile={handlePageArtFile}
              onPageArtPreset={(p) => { setPageArtPreset(p); setPageArtUploaded(null); }}
              onPageArtClear={clearPageArt}
              pageFileRef={pageFileRef}
              qty={qty}
              setQty={setQty}
              notes={notes}
              setNotes={setNotes}
              price={price}
              onBack={() => goTo(3)}
            />
          )}

          {step === 4 && !isNotebook && !isLaser && !isImprenta && (
            <>
            <div className="animate-step-in grid gap-8 lg:grid-cols-2">
              {/* LEFT: Configurator */}
              <div className="space-y-6">
                {/* Material info panel */}
                {materialData && (
                  <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-soft p-5">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-rainbow opacity-10 blur-2xl" />
                    <div className="relative">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="grid h-8 w-8 place-items-center rounded-lg bg-background" style={{ color: "var(--brand-violet)" }}>
                          <Info className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Material seleccionado</div>
                          <div className="font-bold leading-tight">{materialData.name}</div>
                        </div>
                      </div>
                      <div className="grid gap-2 text-xs">
                        <div className="flex items-start gap-2">
                          <Droplets className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-blue)" }} />
                          <span><strong className="text-foreground">Acabado:</strong> <span className="text-muted-foreground">{materialData.finish}</span></span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-green)" }} />
                          <strong className="text-foreground">Ventajas:</strong>
                        </div>
                        <ul className="ml-6 grid gap-1.5">
                          {materialData.advantages.map((a, i) => (
                            <li key={i} className="flex items-center gap-2 text-muted-foreground">
                              {a.icon}
                              <span>{a.text}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-start gap-2">
                          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "var(--brand-pink)" }} />
                          <span className="text-muted-foreground">{materialData.useCase}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Shape selector */}
                <div>
                  <Label className="mb-3 block text-sm font-semibold">Forma del sticker</Label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {shapes.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setShape(s.id)}
                        className={cn(
                          "flex flex-col items-center gap-1 rounded-xl border-2 p-2.5 text-[10px] font-medium transition",
                          shape === s.id ? "rainbow-border-active" : "border-border text-muted-foreground hover:text-foreground",
                        )}
                        title={s.name}
                      >
                        {s.icon}
                        <span className="truncate">{s.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload */}
                <div>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                  />
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 text-sm font-medium transition hover:border-transparent hover:shadow-elegant"
                  >
                    <Upload className="h-5 w-5" style={{ color: "var(--brand-violet)" }} />
                    {uploaded ? "Cambiar arte / logo" : "Subir mi Arte / Logo"}
                  </button>
                </div>

                {/* Art presets */}
                <div>
                  <Label className="mb-2 block text-sm">O elige un arte prediseñado</Label>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {presetArts.map((a) => (
                      <button
                        key={a}
                        onClick={() => { setPreset(a); setUploaded(null); resetImageTools(); }}
                        className={cn(
                          "flex aspect-square items-center justify-center rounded-xl border-2 text-2xl transition",
                          preset === a ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                        )}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Toolbox - only sliders */}
                {hasArt && (
                  <div className="rounded-2xl border border-border bg-background p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <Label className="text-sm font-semibold">Ajustes de imagen</Label>
                      <span className="hidden items-center gap-1 text-[10px] text-muted-foreground sm:inline-flex">
                        <MousePointer2 className="h-3 w-3" /> Toca la imagen en la vista previa para editarla
                      </span>
                    </div>

                    <div className="space-y-4">
                      <ToolSlider
                        icon={<ZoomIn className="h-3.5 w-3.5" />}
                        label="Escala (Zoom)"
                        value={scale}
                        min={30} max={250} step={1}
                        onChange={setScale}
                        suffix="%"
                      />
                      <ToolSlider
                        icon={<Sun className="h-3.5 w-3.5" />}
                        label="Brillo"
                        value={brightness} min={50} max={200} step={1}
                        onChange={setBrightness} suffix="%"
                      />
                      <ToolSlider
                        icon={<Contrast className="h-3.5 w-3.5" />}
                        label="Contraste"
                        value={contrast} min={50} max={200} step={1}
                        onChange={setContrast} suffix="%"
                      />
                    </div>
                  </div>
                )}

                {/* Size presets */}
                <div>
                  <Label className="mb-3 block text-sm font-semibold">Tamaño del sticker</Label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-2">
                    {sizePresets.map((p, i) => (
                      <button
                        key={p.label}
                        onClick={() => applyPreset(i)}
                        className={cn(
                          "rounded-2xl border-2 p-5 text-left transition",
                          sizeMode === "preset" && activePreset === i
                            ? "rainbow-border-active"
                            : "border-border hover:border-foreground/20",
                        )}
                      >
                        <div className="text-xl font-bold sm:text-2xl">{p.label}</div>
                        <div className="mt-1 text-sm leading-snug text-muted-foreground">{p.hint}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setSizeMode("custom")}
                    className={cn(
                      "mt-2 w-full rounded-xl border-2 p-3 text-left text-sm font-medium transition",
                      sizeMode === "custom" ? "rainbow-border-active" : "border-dashed border-border hover:border-foreground/20",
                    )}
                  >
                    Tamaño Personalizado
                  </button>

                  {sizeMode === "custom" && (
                    <div className="mt-3 grid grid-cols-[1fr_1fr_auto] gap-2">
                      <div>
                        <Label htmlFor="w" className="mb-1 block text-[11px] text-muted-foreground">Ancho</Label>
                        <Input id="w" value={width} onChange={(e) => setWidth(e.target.value)} inputMode="decimal" />
                      </div>
                      <div>
                        <Label htmlFor="h" className="mb-1 block text-[11px] text-muted-foreground">Alto</Label>
                        <Input id="h" value={height} onChange={(e) => setHeight(e.target.value)} inputMode="decimal" />
                      </div>
                      <div>
                        <Label className="mb-1 block text-[11px] text-muted-foreground">Unidad</Label>
                        <div className="flex h-9 rounded-md border border-border p-1 text-xs">
                          {(["in", "cm"] as const).map((u) => (
                            <button
                              key={u}
                              onClick={() => setUnit(u)}
                              className={cn(
                                "rounded px-2 font-medium transition",
                                unit === u ? "bg-foreground text-background" : "text-muted-foreground",
                              )}
                            >
                              {u}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <Label htmlFor="qty" className="text-sm font-semibold">Cantidad</Label>
                    {bulkFactor < 1 && (
                      <span className="rounded-full bg-gradient-cta px-2.5 py-0.5 text-[10px] font-bold text-white">
                        -{Math.round((1 - bulkFactor) * 100)}% aplicado
                      </span>
                    )}
                  </div>
                  <Input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    {[
                      { n: 25, off: 37 },
                      { n: 50, off: 70 },
                      { n: 100, off: 75 },
                      { n: 250, off: 80 },
                      { n: 500, off: 84 },
                    ].map(({ n, off }) => (
                      <button
                        key={n}
                        onClick={() => setQty(n)}
                        className={cn(
                          "group relative rounded-xl border-2 px-2 py-2 text-center transition",
                          qty === n ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                        )}
                      >
                        <div className="text-sm font-bold leading-tight">{n}</div>
                        <div className="text-[9px] font-semibold leading-tight text-gradient-rainbow">-{off}%</div>
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Escribe manualmente cualquier cantidad. El descuento se aplica automáticamente al superar cada tramo.
                  </p>
                </div>

                <div>
                  <Label htmlFor="notes" className="mb-2 block text-sm font-semibold">Instrucciones especiales</Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Colores Pantone, tipo de laminado, entrega, empaque, etc."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* RIGHT: Preview */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="overflow-hidden rounded-3xl border border-border bg-gradient-soft p-6">
                  <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
                    <span>Vista previa en vivo</span>
                    <span className="rounded-full bg-background px-2 py-0.5">{shapeData.name}</span>
                  </div>

                  <InteractiveCanvas
                    shapeData={shapeData}
                    materialSwatch={materialData?.swatch ?? "#fff"}
                    isDieCut={cut === "die-cut"}
                    hasArt={hasArt}
                    uploaded={uploaded}
                    preset={preset}
                    scale={scale}
                    setScale={setScale}
                    offsetX={offsetX}
                    setOffsetX={setOffsetX}
                    offsetY={offsetY}
                    setOffsetY={setOffsetY}
                    contrast={contrast}
                    brightness={brightness}
                    duplicated={duplicated}
                    setDuplicated={setDuplicated}
                    selected={selected}
                    setSelected={setSelected}
                    onClear={clearImage}
                  />


                  <div className="mt-10 grid grid-cols-3 gap-3 rounded-2xl bg-background/70 p-4 text-center backdrop-blur">
                    <Stat label="Tamaño" value={`${width}×${height} ${unit}`} />
                    <Stat label="Cantidad" value={`${qty}`} />
                    <Stat label="Precio estimado" value={currency(price)} highlight />
                  </div>

                  <p className="mt-3 text-center text-[11px] text-muted-foreground">
                    {hasArt
                      ? "Arrastra la imagen para moverla · usa las esquinas para redimensionar · toca los iconos para editar."
                      : "Precio estimado en Lempiras. Cotización final tras revisión de arte."}
                  </p>
                </div>

                {(() => {
                  const catName = category === "iron-ons" ? "Iron-on / Estampado textil" : "Sticker";
                  const isTransparent = /transparente|clear/i.test(materialData?.name ?? "");
                  const summary = [
                    `Producto: ${catName}`,
                    `Forma / corte: ${shapeData.name}${cut === "die-cut" ? " (troquelado)" : cut ? ` (${cut})` : ""}`,
                    materialData ? `Material: ${materialData.name}${isTransparent ? " (transparente)" : ""}` : "",
                    `Tamaño: ${width} × ${height} ${unit}`,
                    `Cantidad: ${qty}`,
                    `Escala: ${scale}%`,
                    `Contraste: ${contrast}%`,
                    `Brillo / opacidad: ${brightness}%`,
                    duplicated ? "Duplicado: sí" : "",
                    notes ? `Notas: ${notes}` : "",
                    uploaded ? "Diseño: adjunto (envío la imagen por WhatsApp) 📎" : preset ? `Diseño: preset "${preset}"` : "Diseño: pendiente de enviar",
                    "",
                    "Solicito una cotización, gracias 🙌",
                  ].filter(Boolean).join("\n");
                  const waHref = `https://wa.me/50433635666?text=${encodeURIComponent(`Hola Idealo, quiero cotizar:\n\n${summary}`)}`;
                  return (
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cta animate-rainbow-shimmer px-6 py-4 text-base font-semibold text-white shadow-elegant transition hover:scale-[1.01]"
                    >
                      <MessageCircle className="h-5 w-5" /> Solicitar Cotización por WhatsApp
                    </a>
                  );
                })()}
                {uploaded && (
                  <p className="mt-2 text-center text-[11px] text-muted-foreground">
                    📎 No olvides adjuntar tu diseño en la conversación de WhatsApp.
                  </p>
                )}

                <NavRow onBack={() => goTo(3)} />

              </div>
            </div>

            <StickersQuickInfo />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Interactive Canvas ---------- */
type ShapeDef = ShapeItem;

function InteractiveCanvas({
  shapeData, materialSwatch, isDieCut, hasArt, uploaded, preset,
  scale, setScale, offsetX, setOffsetX, offsetY, setOffsetY,
  contrast, brightness, duplicated, setDuplicated, selected, setSelected, onClear,
}: {
  shapeData: ShapeDef; materialSwatch: string; isDieCut: boolean; hasArt: boolean;
  uploaded: string | null; preset: string | null;
  scale: number; setScale: (n: number) => void;
  offsetX: number; setOffsetX: (n: number) => void;
  offsetY: number; setOffsetY: (n: number) => void;
  contrast: number; brightness: number;
  duplicated: boolean; setDuplicated: (b: boolean | ((d: boolean) => boolean)) => void;
  selected: boolean; setSelected: (b: boolean) => void;
  onClear: () => void;
}) {
  const maskRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ mode: "move" | "resize"; startX: number; startY: number; startOX: number; startOY: number; startScale: number; corner?: "tl" | "tr" | "bl" | "br"; rect: DOMRect } | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (maskRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setSelected(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [setSelected]);

  const onPointerDownImage = (e: React.PointerEvent) => {
    if (!hasArt || !maskRef.current) return;
    e.stopPropagation();
    setSelected(true);
    const rect = maskRef.current.getBoundingClientRect();
    dragRef.current = {
      mode: "move",
      startX: e.clientX, startY: e.clientY,
      startOX: offsetX, startOY: offsetY,
      startScale: scale,
      rect,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerDownHandle = (corner: "tl" | "tr" | "bl" | "br") => (e: React.PointerEvent) => {
    if (!maskRef.current) return;
    e.stopPropagation();
    const rect = maskRef.current.getBoundingClientRect();
    dragRef.current = {
      mode: "resize",
      startX: e.clientX, startY: e.clientY,
      startOX: offsetX, startOY: offsetY,
      startScale: scale,
      corner,
      rect,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (d.mode === "move") {
      const pctX = (dx / d.rect.width) * 100;
      const pctY = (dy / d.rect.height) * 100;
      setOffsetX(clamp(d.startOX + pctX, -120, 120));
      setOffsetY(clamp(d.startOY + pctY, -120, 120));
    } else {
      const delta = ((d.corner === "tl" || d.corner === "bl") ? -dx : dx) + ((d.corner === "tl" || d.corner === "tr") ? -dy : dy);
      const pct = (delta / d.rect.width) * 100;
      setScale(clamp(Math.round(d.startScale + pct), 30, 250));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  const centerHorizontal = () => {
    dragRef.current = null;
    setSelected(true);
    setOffsetX(0);
  };

  const centerVertical = () => {
    dragRef.current = null;
    setSelected(true);
    setOffsetY(0);
  };

  const filterStyle = `contrast(${contrast}%) brightness(${brightness}%)`;
  const imgTransform = `translate(-50%, -50%) translate(${offsetX}%, ${offsetY}%) scale(${scale / 100})`;
  const artBoxStyle: React.CSSProperties = {
    transform: imgTransform,
    width: "80%",
    height: "80%",
  };

  const renderArt = (fadedFilter = false) =>
    uploaded ? (
      <img
        src={uploaded}
        alt=""
        draggable={false}
        className="pointer-events-none max-h-full max-w-full object-contain"
        style={{ filter: fadedFilter ? `${filterStyle} saturate(60%)` : filterStyle }}
      />
    ) : (
      <span
        className="pointer-events-none text-[6rem] leading-none"
        style={{ filter: fadedFilter ? `${filterStyle} saturate(60%)` : filterStyle }}
      >
        {preset}
      </span>
    );

  return (
    <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-rainbow opacity-10 blur-3xl" />

      {/* Workspace (NO overflow hidden - the image can bleed out visibly) */}
      <div
        ref={maskRef}
        className="relative touch-none select-none"
        style={{
          width: shapeData.aspect >= 1 ? "82%" : `${82 * shapeData.aspect}%`,
          aspectRatio: `${shapeData.aspect} / 1`,
        }}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {/* Layer 1: material background (clipped to shape) */}
        <div
          className="absolute inset-0 shadow-elegant"
          style={{
            background: materialSwatch,
            borderRadius: shapeData.radius,
            clipPath: shapeData.clip,
          }}
        />

        {hasArt && !duplicated && (
          <>
            {/* Layer 2: faded ghost of the FULL image (shows overflow at 40%) */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 flex items-center justify-center opacity-40"
              style={artBoxStyle}
            >
              {renderArt(true)}
            </div>

            {/* Layer 3: crisp 100% image clipped to shape */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                borderRadius: shapeData.radius,
                clipPath: shapeData.clip,
                overflow: "hidden",
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 flex items-center justify-center"
                style={artBoxStyle}
              >
                {renderArt(false)}
              </div>
            </div>
          </>
        )}

        {hasArt && duplicated && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: shapeData.radius,
              clipPath: shapeData.clip,
              overflow: "hidden",
            }}
          >
            <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-1 p-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="relative flex items-center justify-center overflow-hidden">
                  {uploaded ? (
                    <img src={uploaded} alt="" draggable={false}
                      className="max-h-full max-w-full object-contain"
                      style={{ filter: filterStyle, transform: `scale(${scale / 100})` }} />
                  ) : (
                    <span style={{ filter: filterStyle, transform: `scale(${scale / 100})` }} className="text-[4rem] leading-none">{preset}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!hasArt && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center text-center text-muted-foreground"
            style={{ borderRadius: shapeData.radius, clipPath: shapeData.clip }}
          >
            <div>
              <ImagePlus className="mx-auto h-10 w-10 opacity-40" />
              <p className="mt-2 text-xs">Sube tu arte para verlo aquí</p>
            </div>
          </div>
        )}

        {/* Layer 4: PRINT GUIDES (cut = green, bleed = yellow dashed) */}
        <ShapeGuides shapeData={shapeData} />

        {/* Die-cut soft halo */}
        {isDieCut && !shapeData.clip && (
          <div
            className="pointer-events-none absolute -inset-1.5"
            style={{ border: "2px dashed rgba(0,0,0,0.08)", borderRadius: shapeData.radius }}
          />
        )}

        {/* Layer 5: interactive hit-box + resize handles (always on top) */}
        {hasArt && !duplicated && (
          <div
            className={cn(
              "absolute left-1/2 top-1/2 flex items-center justify-center",
              selected ? "cursor-move" : "cursor-pointer",
            )}
            style={{ ...artBoxStyle, zIndex: 30 }}
            onPointerDown={onPointerDownImage}
          >
            {/* transparent hit area */}
            <div className="absolute inset-0" />

            {selected && (
              <>
                <div
                  className="pointer-events-none absolute -inset-1 rounded-[4px]"
                  style={{ outline: "2px solid var(--brand-violet)", outlineOffset: "0" }}
                />
                {(["tl", "tr", "bl", "br"] as const).map((c) => (
                  <span
                    key={c}
                    onPointerDown={onPointerDownHandle(c)}
                    className="absolute z-40 h-3.5 w-3.5 rounded-full border-2 border-[var(--brand-violet)] bg-white shadow"
                    style={{
                      top: c.startsWith("t") ? "-8px" : "auto",
                      bottom: c.startsWith("b") ? "-8px" : "auto",
                      left: c.endsWith("l") ? "-8px" : "auto",
                      right: c.endsWith("r") ? "-8px" : "auto",
                      cursor: c === "tl" || c === "br" ? "nwse-resize" : "nesw-resize",
                      touchAction: "none",
                    }}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Floating contextual menu */}
      {hasArt && selected && !duplicated && (
        <div
          ref={menuRef}
          className="absolute z-50 flex items-center gap-1 rounded-full border border-border bg-card p-1.5 shadow-elegant animate-fade-up"
          style={{ top: "-8px", left: "50%", transform: "translate(-50%, -100%)", pointerEvents: "auto" }}
          onMouseDown={(e) => { e.stopPropagation(); dragRef.current = null; }}
          onPointerDown={(e) => { e.stopPropagation(); dragRef.current = null; }}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
        >
          <FloatBtn label="Centrar horizontal" onClick={centerHorizontal}>
            <AlignHorizontalJustifyCenter className="h-4 w-4" />
          </FloatBtn>
          <FloatBtn label="Centrar vertical" onClick={centerVertical}>
            <AlignVerticalJustifyCenter className="h-4 w-4" />
          </FloatBtn>
          <FloatBtn label="Duplicar (patrón)" onClick={() => { dragRef.current = null; setDuplicated((d) => !d); }}>
            <Copy className="h-4 w-4" />
          </FloatBtn>
          <span className="mx-0.5 h-5 w-px bg-border" />
          <FloatBtn label="Eliminar" danger onClick={() => { dragRef.current = null; onClear(); setSelected(false); }}>
            <Trash2 className="h-4 w-4" />
          </FloatBtn>
        </div>
      )}

      {hasArt && duplicated && (
        <button
          onClick={() => setDuplicated(false)}
          className="absolute right-2 top-2 z-40 flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium shadow-card-soft"
        >
          <Copy className="h-3 w-3" /> Salir del patrón
        </button>
      )}

      {/* Legend */}
      <div className="pointer-events-none absolute -bottom-3 left-1/2 z-10 flex -translate-x-1/2 translate-y-full items-center gap-3 whitespace-nowrap rounded-full border border-border bg-card/95 px-2.5 py-1 text-[10px] font-medium text-muted-foreground shadow-card-soft backdrop-blur">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-4 rounded-sm" style={{ background: "#22c55e" }} />
          Corte
        </span>
        <span className="inline-flex items-center gap-1">
          <span
            className="inline-block h-2 w-4 rounded-sm"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, #f59e0b 0 3px, transparent 3px 6px)" }}
          />
          Zona segura
        </span>
      </div>
    </div>
  );
}

function ShapeGuides({ shapeData }: { shapeData: ShapeDef }) {
  // Path-based shapes (cloud, heart): render two SVG paths sharing the same
  // geometry; the safe-area path is a uniformly scaled-down copy of the cut
  // path so both lines follow the exact same silhouette.
  if (shapeData.clip && shapeData.path && shapeData.viewBox) {
    const [vx, vy, vw, vh] = shapeData.viewBox.split(/\s+/).map(Number);
    const cx = vx + vw / 2;
    const cy = vy + vh / 2;
    const safeScale = 0.92; // constant inner padding
    return (
      <svg
        className="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        viewBox={shapeData.viewBox}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Cut line (green, solid) */}
        <path
          d={shapeData.path}
          fill="none"
          stroke="#22c55e"
          strokeWidth={2}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Safe area (yellow, dashed) — same path, uniformly inset around center */}
        <path
          d={shapeData.path}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          transform={`translate(${cx} ${cy}) scale(${safeScale}) translate(${-cx} ${-cy})`}
        />
      </svg>
    );
  }

  // Radius-based shapes: use bordered divs
  const outerRadius = shapeData.radius ?? "0px";
  const innerRadius =
    outerRadius === "9999px"
      ? "9999px"
      : outerRadius === "0px"
        ? "0px"
        : `calc(${outerRadius} - 4px)`;
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{ border: "2px solid #22c55e", borderRadius: outerRadius }}
      />
      <div
        className="pointer-events-none absolute inset-[6px] z-20"
        style={{
          border: "1.5px dashed #f59e0b",
          borderRadius: innerRadius,
        }}
      />
    </>
  );
}


function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function FloatBtn({
  children, onClick, label, danger,
}: { children: React.ReactNode; onClick: () => void; label: string; danger?: boolean }) {
  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => { e.stopPropagation(); e.preventDefault(); onClick(); }}
      title={label}
      aria-label={label}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full transition active:scale-95 cursor-pointer",
        danger
          ? "text-destructive hover:bg-destructive/10"
          : "text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}


/* ---------- Small helpers ---------- */
function ToolButton({
  children, onClick, title, active, danger,
}: { children: React.ReactNode; onClick: () => void; title: string; active?: boolean; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        "grid h-8 w-8 place-items-center rounded-lg border transition",
        active ? "rainbow-border-active" :
          danger ? "border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                 : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function ToolSlider({
  icon, label, value, min, max, step, onChange, suffix, onMinus, onPlus, minusIcon, plusIcon, compact,
}: {
  icon?: React.ReactNode; label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; suffix?: string;
  onMinus?: () => void; onPlus?: () => void; minusIcon?: React.ReactNode; plusIcon?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">{icon}{label}</span>
        <span className="font-mono font-medium text-foreground">{value}{suffix}</span>
      </div>
      <div className="flex items-center gap-2">
        {onMinus && !compact && (
          <button onClick={onMinus} className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            {minusIcon}
          </button>
        )}
        <Slider
          value={[value]}
          min={min} max={max} step={step}
          onValueChange={(v) => onChange(v[0])}
          className="flex-1"
        />
        {onPlus && !compact && (
          <button onClick={onPlus} className="grid h-7 w-7 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            {plusIcon}
          </button>
        )}
      </div>
    </div>
  );
}

function Stepper({ step, onGo, labels = ["Categoría", "Forma", "Material", "Diseño"] }: { step: number; onGo: (n: number) => void; labels?: string[] }) {
  
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-between gap-2">
      {labels.map((l, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <div key={l} className="flex flex-1 items-center gap-2">
            <button
              type="button"
              onClick={() => onGo(n)}
              title={`Ir al paso ${n}: ${l}`}
              className={cn(
                "flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-semibold transition hover:scale-105 hover:shadow-md",
                active && "rainbow-border-active",
                done && "border-transparent bg-foreground text-background",
                !active && !done && "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
              )}
            >
              {done ? <Check className="h-4 w-4" /> : n}
            </button>
            <button
              type="button"
              onClick={() => onGo(n)}
              className={cn("hidden truncate text-sm font-medium sm:inline cursor-pointer hover:text-foreground transition", active ? "text-foreground" : "text-muted-foreground")}
            >
              {l}
            </button>
            {i < labels.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        );
      })}
    </div>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-5 flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-soft" style={{ color: "var(--brand-violet)" }}>{icon}</span>
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
  );
}

function CategoryCard({
  title, desc, icon, active, onClick, accent, image,
}: { title: string; desc: string; icon: React.ReactNode; active: boolean; onClick: () => void; accent: string; image?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border-2 text-left transition-all",
        active
          ? "shadow-[0_20px_50px_-15px_color-mix(in_oklab,var(--brand-magenta)_45%,transparent)]"
          : "border-border hover:-translate-y-1 hover:shadow-elegant",
      )}
      style={{
        borderColor: active ? "var(--brand-magenta)" : undefined,
        background: "var(--card)",
      }}
    >
      {/* Photo header */}
      <div className="relative h-36 w-full overflow-hidden bg-muted">
        {image ? (
          <SmartImage
            src={image}
            className="transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full" style={{ background: accent }} />
        )}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(180deg, transparent 40%, color-mix(in oklab, ${accent} 55%, transparent) 100%)`,
          }}
        />
        <div
          className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl text-white shadow-lg backdrop-blur"
          style={{ background: accent }}
        >
          {icon}
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <h4 className="text-base font-bold leading-tight">{title}</h4>
        <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
        <span
          className={cn(
            "mt-auto inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
            active ? "text-white" : "text-white group-hover:brightness-110",
          )}
          style={{
            background: active
              ? "var(--brand-magenta)"
              : "linear-gradient(135deg, var(--brand-magenta), var(--brand-cyan-deep))",
          }}
        >
          {active ? "Seleccionado" : "Empezar personalización"}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </button>
  );
}

const imprentaTemplateTags: Record<ImprentaProductId, { tag: string; label: string }> = {
  tarjetas: { tag: "business,card", label: "Tarjetas de presentación" },
  menus: { tag: "restaurant,menu", label: "Menús de restaurante" },
  carpetas: { tag: "corporate,folder", label: "Carpetas corporativas" },
  brochures: { tag: "brochure,flyer", label: "Brochures y volantes" },
};

type TplTextBlock = {
  id: string;
  text: string;
  x: number; // 0..100 %
  y: number;
  size: number; // px at 480 base
  color: string;
  weight: "normal" | "bold";
};

function ImprentaTemplateEditor({
  product,
  onExport,
}: {
  product: ImprentaProduct;
  onExport?: (summary: string) => void;
}) {
  const info = imprentaTemplateTags[product.id];
  const seeds = [11, 22, 33, 44, 55, 66, 77, 88];
  const templates = seeds.map((s) => ({
    id: `t${s}`,
    url: `https://loremflickr.com/640/480/${info.tag}?lock=${s}`,
  }));

  const [tplId, setTplId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<TplTextBlock[]>([
    { id: "b1", text: "Tu marca aquí", x: 50, y: 42, size: 32, color: "#ffffff", weight: "bold" },
    { id: "b2", text: "Subtítulo o slogan", x: 50, y: 58, size: 14, color: "#ffffff", weight: "normal" },
  ]);
  const [selected, setSelected] = useState<string | null>("b1");
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null);
  const tpl = templates.find((t) => t.id === tplId);

  const update = (id: string, patch: Partial<TplTextBlock>) =>
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));

  const remove = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selected === id) setSelected(null);
  };

  const add = () => {
    const id = `b${Date.now()}`;
    setBlocks((prev) => [
      ...prev,
      { id, text: "Nuevo texto", x: 50, y: 50, size: 20, color: "#ffffff", weight: "normal" },
    ]);
    setSelected(id);
  };

  const duplicate = (id: string) => {
    const b = blocks.find((x) => x.id === id);
    if (!b) return;
    const nid = `b${Date.now()}`;
    setBlocks((prev) => [...prev, { ...b, id: nid, x: Math.min(b.x + 4, 96), y: Math.min(b.y + 4, 96) }]);
    setSelected(nid);
  };

  const onPointerDown = (e: React.PointerEvent, b: TplTextBlock) => {
    e.stopPropagation();
    setSelected(b.id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    dragRef.current = { id: b.id, startX: e.clientX, startY: e.clientY, origX: b.x, origY: b.y };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    const stage = stageRef.current;
    if (!d || !stage) return;
    const rect = stage.getBoundingClientRect();
    const dx = ((e.clientX - d.startX) / rect.width) * 100;
    const dy = ((e.clientY - d.startY) / rect.height) * 100;
    update(d.id, {
      x: Math.max(2, Math.min(98, d.origX + dx)),
      y: Math.max(2, Math.min(98, d.origY + dy)),
    });
  };
  const onPointerUp = () => { dragRef.current = null; };

  useEffect(() => {
    if (!onExport) return;
    if (!tpl) return onExport("");
    const summary = [
      `Plantilla base: ${info.label} (${tpl.id})`,
      ...blocks.map((b, i) => `Texto ${i + 1}: "${b.text}" (${b.weight}, ${b.size}px, ${b.color})`),
    ].join("\n");
    onExport(summary);
  }, [tpl, blocks, info.label, onExport]);

  const sel = blocks.find((b) => b.id === selected) || null;

  return (
    <div className="rounded-2xl border border-border bg-gradient-soft p-4 sm:p-5">
      <div className="mb-3 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        <Sparkles className="h-3 w-3" style={{ color: "var(--brand-pink)" }} />
        Editor de plantilla · experimental
      </div>

      {!tpl && (
        <>
          <h5 className="mb-1 text-base font-bold">Elegí una plantilla base</h5>
          <p className="mb-3 text-xs text-muted-foreground">
            Referencias de la web para {info.label.toLowerCase()}. Al seleccionar, podés editar los textos encima.
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTplId(t.id)}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-border bg-muted transition hover:-translate-y-0.5 hover:border-foreground/40"
              >
                <SmartImage src={t.url} className="transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-2 bottom-2 rounded-full bg-black/60 py-1 text-center text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  Usar esta
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {tpl && (
        <>
          <div className="mb-3 flex items-center justify-between gap-2">
            <h5 className="text-base font-bold">Editá tu diseño</h5>
            <button
              onClick={() => setTplId(null)}
              className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold hover:border-foreground/40"
            >
              Cambiar plantilla
            </button>
          </div>

          <div
            ref={stageRef}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onClick={() => setSelected(null)}
            className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-xl border-2 border-border bg-muted"
            style={{ touchAction: "none" }}
          >
            <img src={tpl.url} alt="" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
            <div className="absolute inset-0 bg-black/20" />
            {blocks.map((b) => (
              <div
                key={b.id}
                onPointerDown={(e) => onPointerDown(e, b)}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 cursor-move whitespace-nowrap rounded px-1 leading-tight",
                  selected === b.id ? "outline outline-2 outline-white/90" : "hover:outline hover:outline-1 hover:outline-white/60",
                )}
                style={{
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  fontSize: `${b.size}px`,
                  color: b.color,
                  fontWeight: b.weight === "bold" ? 700 : 400,
                  textShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {b.text || "\u00a0"}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              onClick={add}
              className="rounded-full border-2 border-foreground bg-foreground px-3 py-1.5 text-xs font-semibold text-background"
            >
              + Agregar texto
            </button>
            {sel && (
              <>
                <button
                  onClick={() => duplicate(sel.id)}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold hover:border-foreground/40"
                >
                  Duplicar
                </button>
                <button
                  onClick={() => remove(sel.id)}
                  className="rounded-full border border-destructive/40 bg-background px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Eliminar
                </button>
              </>
            )}
            <span className="text-[10px] text-muted-foreground">Arrastrá los textos sobre la imagen</span>
          </div>

          {sel && (
            <div className="mt-3 grid gap-3 rounded-xl border border-border bg-background p-3 sm:grid-cols-[1fr_auto_auto_auto]">
              <Input
                value={sel.text}
                onChange={(e) => update(sel.id, { text: e.target.value })}
                placeholder="Texto…"
                className="h-9 rounded-lg"
              />
              <input
                type="range"
                min={10}
                max={80}
                value={sel.size}
                onChange={(e) => update(sel.id, { size: parseInt(e.target.value, 10) })}
                className="w-28"
                title="Tamaño"
              />
              <input
                type="color"
                value={sel.color}
                onChange={(e) => update(sel.id, { color: e.target.value })}
                className="h-9 w-10 cursor-pointer rounded border border-border bg-background"
                title="Color"
              />
              <button
                onClick={() => update(sel.id, { weight: sel.weight === "bold" ? "normal" : "bold" })}
                className={cn(
                  "h-9 rounded-lg border-2 px-3 text-xs font-bold",
                  sel.weight === "bold" ? "border-foreground bg-foreground text-background" : "border-border bg-background",
                )}
                title="Negrita"
              >
                B
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}




function SelectCard({
  title, desc, active, onClick, accent, swatch, sampleImage,
}: { title: string; desc: string; active: boolean; onClick: () => void; accent: string; swatch?: string; sampleImage?: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 p-5 text-left transition-all rainbow-splash",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      {sampleImage ? (
        <div className="mb-3 grid h-32 w-full place-items-center overflow-hidden rounded-lg border border-border" style={{ background: swatch ?? "#ffffff" }}>
          <img src={sampleImage} alt="" className="max-h-full max-w-full object-contain" />
        </div>
      ) : swatch && (
        <div className="mb-3 h-14 w-full rounded-lg border border-border" style={{ background: swatch }} />
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="font-semibold leading-tight">{title}</h4>
          <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
        </div>
        {active && (
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: accent }}>
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </button>
  );
}

function MaterialCard({
  material: m, active, onClick, isBestSeller,
}: {
  material: (typeof materials)[number];
  active: boolean;
  onClick: () => void;
  isBestSeller?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      {/* Sample image / preview */}
      <div className="relative h-64 w-full overflow-hidden bg-muted/30" style={{ background: m.sampleImage ? "#f5f1ea" : m.swatch }}>
        {m.sampleImage ? (
          <SmartImage src={m.sampleImage} alt={m.name} />
        ) : (
          <div className="grid h-full w-full place-items-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            {m.finish}
          </div>
        )}
        {isBestSeller && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold text-white shadow-md" style={{ background: "var(--brand-orange)" }}>
            <Tag className="h-3 w-3" /> Más Vendido
          </span>
        )}
        {active && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-white shadow-md" style={{ background: "var(--brand-violet)" }}>
            <Check className="h-4 w-4" />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h4 className="text-sm font-bold leading-tight">{m.name}</h4>

        <div>
          <div className="mb-1.5 text-xs font-semibold text-foreground">Características destacadas:</div>
          <ul className="grid gap-1.5">
            {m.advantages.map((a, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="grid h-5 w-5 shrink-0 place-items-center">{a.icon}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t border-border pt-3">
          <div className="mb-1.5 text-xs font-semibold text-foreground">Acabado:</div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 shrink-0 rounded-full border border-border shadow-inner" style={{ background: m.swatch }} />
            <span className="text-xs text-muted-foreground">{m.finish}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function CutIllustration({ id }: { id: CutShape }) {
  const src =
    id === "die-cut" ? dieCutSample.url :
    id === "kiss-cut" ? kissCutSample.url :
    id === "sheets" ? sheetsSample.url : null;
  if (!src) return null;
  const alt =
    id === "die-cut" ? "Ejemplo de sticker troquelado" :
    id === "kiss-cut" ? "Ejemplo de corte de beso" :
    "Ejemplo de hoja con diseño único";
  const fit: "cover" | "contain" = id === "kiss-cut" ? "contain" : "cover";
  return <SmartImage src={src} alt={alt} fit={fit} />;
}








function CutCard({
  id, title, desc, active, onClick, accent,
}: { id: CutShape; title: string; desc: string; active: boolean; onClick: () => void; accent: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all rainbow-splash",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/60">
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <CutIllustration id={id} />
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-2 p-5">
        <div>
          <h4 className="font-semibold leading-tight">{title}</h4>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
        </div>
        {active && (
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: accent }}>
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </button>
  );
}

function NavRow({ onBack, onNext }: { onBack?: () => void; onNext?: () => void }) {
  return (
    <div className="mt-8 flex items-center justify-between">
      {onBack ? (
        <Button variant="ghost" onClick={onBack}>← Atrás</Button>
      ) : <span />}
      {onNext && <Button onClick={onNext}>Continuar <ArrowRight className="ml-1 h-4 w-4" /></Button>}
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className={cn("mt-0.5 text-sm font-bold", highlight && "text-gradient-rainbow text-base")}>{value}</div>
    </div>
  );
}

/* ---------- Notebook cards ---------- */
function NotebookStyleCard({
  title, desc, icon, active, onClick, accent,
}: { title: string; desc: string; icon: React.ReactNode; active: boolean; onClick: () => void; accent: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-3xl border-2 p-6 text-left transition-all rainbow-splash",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-15 blur-3xl" style={{ background: accent }} />
      <div className="relative flex items-start gap-4">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white shadow-md" style={{ background: accent }}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold leading-tight">{title}</h4>
          <p className="mt-1.5 text-sm text-muted-foreground">{desc}</p>
        </div>
        {active && (
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ background: accent }}>
            <Check className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
      {/* Little notebook preview */}
      <div className="mt-5 flex h-28 items-end justify-center overflow-hidden rounded-xl bg-muted/50 p-3">
        <MiniNotebook variant={title.includes("Solo") ? "cover" : "pages"} />
      </div>
    </button>
  );
}

function MiniNotebook({ variant }: { variant: "cover" | "pages" }) {
  return (
    <svg viewBox="0 0 140 90" className="h-full w-auto">
      <ellipse cx="72" cy="84" rx="46" ry="3" fill="#000" opacity="0.1" />
      {/* pages behind (only for pages variant) */}
      {variant === "pages" && (
        <>
          <rect x="34" y="14" width="80" height="66" rx="2" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
          <line x1="42" y1="26" x2="106" y2="26" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="42" y1="34" x2="106" y2="34" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="42" y1="42" x2="106" y2="42" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="42" y1="50" x2="106" y2="50" stroke="#c7d2fe" strokeWidth="0.8" />
          <line x1="42" y1="58" x2="86" y2="58" stroke="#c7d2fe" strokeWidth="0.8" />
        </>
      )}
      {/* cover */}
      <rect x="28" y="10" width="80" height="70" rx="3" fill="url(#coverGrad)" stroke="#334155" strokeWidth="1" />
      <defs>
        <linearGradient id="coverGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      {/* spiral */}
      {[0,1,2,3,4,5,6].map((i) => (
        <circle key={i} cx={30} cy={18 + i * 9} r="2.2" fill="none" stroke="#94a3b8" strokeWidth="1.2" />
      ))}
      {/* logo mark */}
      <circle cx="68" cy="45" r="12" fill="#ffffff" opacity="0.9" />
      <text x="68" y="49" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7c3aed">L</text>
    </svg>
  );
}

function NotebookMaterialCard({
  material: m, active, onClick,
}: {
  material: (typeof notebookMaterials)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      <div className="relative flex h-56 w-full items-center justify-center p-6" style={{ background: m.swatch }}>
        <div
          className="relative h-40 w-32 rounded-md shadow-elegant"
          style={{
            background: m.id === "cover-glossy"
              ? "linear-gradient(135deg,#1e293b,#334155)"
              : "linear-gradient(135deg,#3f3f46,#52525b)",
          }}
        >
          {m.id === "cover-glossy" && (
            <div className="absolute inset-0 rounded-md" style={{ background: "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)" }} />
          )}
          <div className="absolute left-0 top-4 flex flex-col gap-2">
            {[0,1,2,3,4,5,6,7].map((i) => (
              <span key={i} className="ml-[-6px] block h-1.5 w-4 rounded-full bg-white/70 shadow" />
            ))}
          </div>
          <div className="absolute inset-0 grid place-items-center text-white/90 text-3xl font-black">A</div>
        </div>
        {active && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-white shadow-md" style={{ background: "var(--brand-violet)" }}>
            <Check className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <h4 className="text-sm font-bold leading-tight">{m.name}</h4>
        <p className="text-xs text-muted-foreground">{m.desc}</p>
        <ul className="grid gap-1.5">
          {m.advantages.map((a, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="grid h-5 w-5 shrink-0 place-items-center">{a.icon}</span>
              <span>{a.text}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t border-border pt-3 text-xs">
          <span className="font-semibold">Acabado:</span>{" "}
          <span className="text-muted-foreground">{m.finish}</span>
        </div>
      </div>
    </button>
  );
}

/* ---------- Notebook designer (step 4) ---------- */
function NotebookDesigner({
  styleId, material, sizeIdx, setSizeIdx, pageType, setPageType,
  uploaded, preset, onFile, onPreset, onClear, fileRef,
  pageArtUploaded, pageArtPreset, pageArtOpacity, setPageArtOpacity,
  onPageArtFile, onPageArtPreset, onPageArtClear, pageFileRef,
  qty, setQty, notes, setNotes, price, onBack,
}: {
  styleId: NotebookStyle;
  material: (typeof notebookMaterials)[number];
  sizeIdx: number;
  setSizeIdx: (n: number) => void;
  pageType: PageType;
  setPageType: (p: PageType) => void;
  uploaded: string | null;
  preset: string | null;
  onFile: (f: File | null) => void;
  onPreset: (p: string) => void;
  onClear: () => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  pageArtUploaded: string | null;
  pageArtPreset: string | null;
  pageArtOpacity: number;
  setPageArtOpacity: (n: number) => void;
  onPageArtFile: (f: File | null) => void;
  onPageArtPreset: (p: string) => void;
  onPageArtClear: () => void;
  pageFileRef: React.RefObject<HTMLInputElement | null>;
  qty: number;
  setQty: (n: number) => void;
  notes: string;
  setNotes: (v: string) => void;
  price: number;
  onBack: () => void;
}) {
  const size = notebookSizes[sizeIdx];
  const hasArt = !!(uploaded || preset);
  const showPages = styleId === "cover-pages";
  const showPageArt = showPages && size.id === "a5";
  const hasPageArt = !!(pageArtUploaded || pageArtPreset);



  return (
    <div className="animate-step-in grid gap-8 lg:grid-cols-2">
      {/* LEFT: controls */}
      <div className="space-y-6">
        {/* Material info */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-soft p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-rainbow opacity-10 blur-2xl" />
          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-background" style={{ color: "var(--brand-violet)" }}>
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Libreta seleccionada</div>
                <div className="font-bold leading-tight">
                  {material.name} · {styleId === "cover-only" ? "Solo Portada" : "Portada + Páginas"}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">{material.useCase}</p>
          </div>
        </div>

        {/* Size */}
        <div>
          <Label className="mb-3 block text-sm font-semibold">Tamaño de la libreta</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {notebookSizes.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSizeIdx(i)}
                className={cn(
                  "rounded-xl border-2 p-3 text-left transition",
                  sizeIdx === i ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                )}
              >
                <div className="text-sm font-bold">{s.label}</div>
                <div className="mt-0.5 text-[10px] font-medium text-foreground/70">{s.cm}</div>
                <div className="mt-0.5 text-[10px] leading-tight text-muted-foreground">{s.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Page type — only when cover+pages */}
        {showPages && (
          <div>
            <Label className="mb-3 block text-sm font-semibold">Tipo de página interior</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {pageTypes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPageType(p.id)}
                  className={cn(
                    "flex flex-col items-start gap-1.5 rounded-xl border-2 p-3 text-left transition",
                    pageType === p.id ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                  )}
                >
                  <div className="h-10 w-full rounded-md border border-border bg-white" style={pageBackground(p.id)} />
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {p.icon}
                    {p.name}
                  </div>
                  <div className="text-[10px] leading-tight text-muted-foreground">{p.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Page interior art (A5 + cover-pages only) */}
        {showPageArt && (
          <div className="rounded-2xl border-2 border-dashed border-border/80 bg-gradient-soft/50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <Label className="text-sm font-semibold">Diseño de la página interior</Label>
              <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                A5
              </span>
            </div>
            <p className="mb-3 text-[11px] text-muted-foreground">
              Sube un logo o marca de agua que se imprima sutilmente en cada hoja interior. Controla la opacidad para que no interfiera con la escritura.
            </p>
            <input
              ref={pageFileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onPageArtFile(e.target.files?.[0] ?? null)}
            />
            <button
              onClick={() => pageFileRef.current?.click()}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-5 text-sm font-medium transition hover:border-transparent hover:shadow-elegant"
            >
              <Upload className="h-5 w-5" style={{ color: "var(--brand-violet)" }} />
              {pageArtUploaded ? "Cambiar diseño de página" : "Subir diseño de página"}
            </button>

            <div className="mt-3">
              <Label className="mb-2 block text-xs text-muted-foreground">O elige un ícono prediseñado</Label>
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                {presetArts.map((a) => (
                  <button
                    key={a}
                    onClick={() => onPageArtPreset(a)}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-xl border-2 text-2xl transition",
                      pageArtPreset === a ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                    )}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {hasPageArt && (
              <>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between">
                    <Label className="text-xs font-semibold">Opacidad de la marca de agua</Label>
                    <span className="text-xs font-bold" style={{ color: "var(--brand-violet)" }}>{pageArtOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={1}
                    value={pageArtOpacity}
                    onChange={(e) => setPageArtOpacity(+e.target.value)}
                    className="w-full accent-[color:var(--brand-violet)]"
                  />
                  <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                    <span>Sutil</span>
                    <span>Intenso</span>
                  </div>
                </div>
                <button onClick={onPageArtClear} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-3.5 w-3.5" /> Quitar diseño de página
                </button>
              </>
            )}
          </div>
        )}



        {/* Upload cover art */}
        <div>
          <Label className="mb-2 block text-sm font-semibold">Arte para la portada</Label>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 text-sm font-medium transition hover:border-transparent hover:shadow-elegant"
          >
            <Upload className="h-5 w-5" style={{ color: "var(--brand-violet)" }} />
            {uploaded ? "Cambiar arte / logo" : "Subir mi Arte / Logo"}
          </button>

          <div className="mt-3">
            <Label className="mb-2 block text-xs text-muted-foreground">O elige un arte prediseñado</Label>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
              {presetArts.map((a) => (
                <button
                  key={a}
                  onClick={() => onPreset(a)}
                  className={cn(
                    "flex aspect-square items-center justify-center rounded-xl border-2 text-2xl transition",
                    preset === a ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
          {hasArt && (
            <button onClick={onClear} className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-destructive">
              <Trash2 className="h-3.5 w-3.5" /> Quitar arte
            </button>
          )}
        </div>

        {/* Quantity */}
        <div>
          <Label htmlFor="qty" className="mb-2 block text-sm font-semibold">Cantidad</Label>
          <Input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[10, 25, 50, 100].map((n) => (
              <button
                key={n}
                onClick={() => setQty(n)}
                className={cn(
                  "rounded-xl border-2 py-2 text-sm font-bold transition",
                  qty === n ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                )}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Descuentos por volumen se aplican automáticamente al superar 25, 50 y 100 unidades.
          </p>
        </div>

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="mb-2 block text-sm font-semibold">Instrucciones especiales</Label>
          <Textarea
            id="notes"
            rows={3}
            placeholder="Colores Pantone, número de hojas, encuadernado (espiral, cosido, hotmelt), etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* RIGHT: preview */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-soft p-6">
          <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Vista previa en vivo</span>
            <span className="rounded-full bg-background px-2 py-0.5">
              Libreta {size.label}
            </span>
          </div>

          <NotebookPreview
            size={size}
            material={material}
            showPages={showPages}
            pageType={pageType}
            uploaded={uploaded}
            preset={preset}
            pageArtUploaded={pageArtUploaded}
            pageArtPreset={pageArtPreset}
            pageArtOpacity={pageArtOpacity}
          />


          <div className="mt-8 grid grid-cols-3 gap-3 rounded-2xl bg-background/70 p-4 text-center backdrop-blur">
            <Stat label="Tamaño" value={`${size.label} · ${size.cm}`} />
            <Stat label="Cantidad" value={`${qty}`} />
            <Stat label="Precio estimado" value={currency(price)} highlight />
          </div>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {showPages
              ? `Interior ${pageTypes.find((p) => p.id === pageType)?.name.toLowerCase()} con logo sutil en cada hoja.`
              : "Interior en blanco. Solo se imprime la portada."}
          </p>
        </div>

        {(() => {
          const summary = [
            `Producto: Libreta Personalizada`,
            `Material: ${material.name}`,
            `Tamaño: ${size.label} (${size.cm})`,
            `Estilo: ${styleId === "cover-only" ? "Solo portada" : "Portada + páginas"}`,
            showPages ? `Interior: ${pageType}` : "",
            hasPageArt ? `Marca de agua interior: sí (opacidad ${pageArtOpacity}%)` : "",
            `Cantidad: ${qty}`,
            notes ? `Notas: ${notes}` : "",
            uploaded ? "Diseño de portada: adjunto (envío la imagen por WhatsApp) 📎" : preset ? `Diseño de portada: preset "${preset}"` : "Diseño de portada: pendiente de enviar",
            "",
            "Solicito una cotización, gracias 🙌",
          ].filter(Boolean).join("\n");
          const waHref = `https://wa.me/50433635666?text=${encodeURIComponent(`Hola Idealo, quiero cotizar una libreta:\n\n${summary}`)}`;
          return (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cta animate-rainbow-shimmer px-6 py-4 text-base font-semibold text-white shadow-elegant transition hover:scale-[1.01]"
            >
              <MessageCircle className="h-5 w-5" /> Solicitar Cotización por WhatsApp
            </a>
          );
        })()}
        {(uploaded || pageArtUploaded) && (
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            📎 No olvides adjuntar tu diseño en la conversación de WhatsApp.
          </p>
        )}
        <NavRow onBack={onBack} />
      </div>
    </div>
  );
}

/* ---------- Notebook live preview ---------- */
function NotebookPreview({
  size, material, showPages, pageType, uploaded, preset,
  pageArtUploaded, pageArtPreset, pageArtOpacity,
}: {
  size: (typeof notebookSizes)[number];
  material: (typeof notebookMaterials)[number];
  showPages: boolean;
  pageType: PageType;
  uploaded: string | null;
  preset: string | null;
  pageArtUploaded?: string | null;
  pageArtPreset?: string | null;
  pageArtOpacity?: number;
}) {
  const aspect = size.w / size.h; // portrait ~0.71
  const coverGradient =
    material.id === "cover-glossy"
      ? "linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#334155 100%)"
      : "linear-gradient(135deg,#3f3f46 0%,#52525b 100%)";
  const pageArtOpacityPct = (pageArtOpacity ?? 35) / 100;
  const hasPageArt = !!(pageArtUploaded || pageArtPreset);

  return (
    <div className="relative mx-auto flex aspect-square max-w-sm items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-gradient-rainbow opacity-10 blur-3xl" />

      <div
        className="relative"
        style={{
          height: "85%",
          aspectRatio: `${aspect} / 1`,
          perspective: "1200px",
        }}
      >
        {/* Pages sticking out behind */}
        {showPages && (
          <>
            <div
              className="absolute overflow-hidden rounded-r-md border border-border bg-white"
              style={{
                inset: "3% -6% 3% 4%",
                boxShadow: "2px 4px 12px rgba(0,0,0,0.1)",
                ...pageBackground(pageType),
                backgroundColor: "#ffffff",
              }}
            >
              {hasPageArt && (
                <div
                  className="pointer-events-none absolute inset-0 flex items-center justify-center"
                  style={{ opacity: pageArtOpacityPct }}
                >
                  {pageArtUploaded ? (
                    <img src={pageArtUploaded} alt="" className="max-h-[60%] max-w-[60%] object-contain" />
                  ) : (
                    <span className="text-[3rem] leading-none">{pageArtPreset}</span>
                  )}
                </div>
              )}
            </div>
            <div
              className="absolute rounded-r-sm border border-border bg-white/95"
              style={{ inset: "1.5% -3% 1.5% 6%" }}
            />
          </>
        )}



        {/* Cover */}
        <div
          className="absolute inset-0 overflow-hidden rounded-md rounded-l-none shadow-2xl"
          style={{
            background: coverGradient,
            transform: "rotateY(-4deg)",
            transformOrigin: "left center",
          }}
        >
          {/* Glossy sheen */}
          {material.id === "cover-glossy" && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(115deg, transparent 45%, rgba(255,255,255,0.28) 52%, transparent 60%)",
              }}
            />
          )}

          {/* Art placed on cover */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {uploaded ? (
              <img src={uploaded} alt="" className="max-h-[70%] max-w-[80%] object-contain drop-shadow-lg" />
            ) : preset ? (
              <span className="text-[5rem] leading-none drop-shadow-lg">{preset}</span>
            ) : (
              <div className="text-center text-white/60">
                <BookOpen className="mx-auto mb-2 h-10 w-10" />
                <div className="text-xs font-medium">Sube tu diseño de portada</div>
              </div>
            )}
          </div>

          {/* Bottom brand line */}
          <div className="absolute inset-x-0 bottom-3 text-center text-[10px] font-semibold tracking-widest text-white/40">
            IDEALO · {size.label}
          </div>
        </div>

        {/* Spiral binding on the left */}
        <div className="absolute -left-2 top-0 flex h-full flex-col items-center justify-around py-3">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="block h-3 w-3 rounded-full border-2 border-slate-400/80 bg-slate-200 shadow-inner"
            />
          ))}
        </div>
      </div>
    </div>
  );
}


/* ============================================================
   ============  GRABADO LÁSER — Componentes  =================
   ============================================================ */

function LaserProductCard({
  product, active, onClick,
}: { product: LaserProduct; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border-2 text-left transition-all rainbow-splash",
        active ? "rainbow-border-active" : "border-border hover:-translate-y-0.5 hover:shadow-card-soft",
      )}
    >
      <div className="relative h-56 w-full overflow-hidden" style={{ background: product.heroImage ? "#f5f5f5" : product.surface }}>
        {product.heroImage ? (
          <img src={product.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        ) : (
          <div className="absolute inset-0 opacity-25 mix-blend-overlay" style={{
            backgroundImage:
              "repeating-linear-gradient(115deg, rgba(255,255,255,0.15) 0 2px, transparent 2px 6px)",
          }} />
        )}
        {!product.heroImage && (
          <div className="relative grid h-full w-full place-items-center text-white/90">
            <div className="flex flex-col items-center gap-1.5">
              {product.icon}
              <span className="text-[10px] font-semibold uppercase tracking-wider opacity-80">Vista de material</span>
            </div>
          </div>
        )}
        {active && (
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full text-white shadow-md" style={{ background: "var(--brand-orange)" }}>
            <Check className="h-4 w-4" />
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h4 className="text-sm font-bold leading-tight">{product.name}</h4>
        <p className="text-xs text-muted-foreground">{product.desc}</p>
        <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
          <span className="text-[11px] text-muted-foreground">{product.hint}</span>
          <span className="text-[11px] font-semibold" style={{ color: "var(--brand-orange)" }}>
            desde {currency(product.price)}
          </span>
        </div>
      </div>
    </button>
  );
}

/* Product mockup — SVG silhouette per shape, receives engraved art as an <image> mask overlay */
function ProductMockup({
  product, children,
}: { product: LaserProduct; children: React.ReactNode }) {
  const s = product.shape;
  // Each shape renders its silhouette + a clipped inner "engrave zone" that hosts children.
  if (s === "board") {
    return (
      <svg viewBox="0 0 300 220" className="h-full w-full">
        <defs>
          <linearGradient id="lg-board" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d9a869" /><stop offset="100%" stopColor="#a06e30" />
          </linearGradient>
          <clipPath id="cp-board"><rect x="30" y="35" width="240" height="150" rx="18" /></clipPath>
        </defs>
        <ellipse cx="150" cy="200" rx="120" ry="6" fill="#000" opacity="0.15" />
        <rect x="30" y="35" width="240" height="150" rx="18" fill="url(#lg-board)" />
        {/* wood grain */}
        {[0,1,2,3,4].map((i) => (
          <path key={i} d={`M40 ${55 + i*28} Q150 ${50 + i*28} 260 ${58 + i*28}`} stroke="#7a4d1e" strokeOpacity="0.18" fill="none" strokeWidth="1.2" />
        ))}
        <circle cx="252" cy="55" r="4" fill="#000" opacity="0.35" />
        <g clipPath="url(#cp-board)">
          <foreignObject x="30" y="35" width="240" height="150">
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </foreignObject>
        </g>
        <rect x="30" y="35" width="240" height="150" rx="18" fill="none" stroke="#000" strokeOpacity="0.15" strokeWidth="1.5" />
      </svg>
    );
  }
  if (s === "bottle") {
    return (
      <svg viewBox="0 0 300 340" className="h-full w-full">
        <defs>
          <linearGradient id="lg-bottle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#151515" /><stop offset="45%" stopColor="#4a4a4a" /><stop offset="100%" stopColor="#151515" />
          </linearGradient>
          <clipPath id="cp-bottle"><rect x="95" y="90" width="110" height="180" rx="6" /></clipPath>
        </defs>
        <ellipse cx="150" cy="320" rx="65" ry="6" fill="#000" opacity="0.2" />
        <rect x="120" y="20" width="60" height="30" rx="4" fill="#222" />
        <rect x="115" y="45" width="70" height="16" rx="3" fill="#0f0f0f" />
        <path d="M100 70 L200 70 L205 90 L205 285 Q205 305 185 305 L115 305 Q95 305 95 285 L95 90 Z" fill="url(#lg-bottle)" />
        {/* metallic highlight */}
        <rect x="102" y="95" width="10" height="190" rx="4" fill="#fff" opacity="0.15" />
        <g clipPath="url(#cp-bottle)">
          <foreignObject x="95" y="90" width="110" height="180">
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </foreignObject>
        </g>
      </svg>
    );
  }
  if (s === "wallet") {
    return (
      <svg viewBox="0 0 320 220" className="h-full w-full">
        <defs>
          <linearGradient id="lg-wallet" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5b3620" /><stop offset="100%" stopColor="#2f1a0d" />
          </linearGradient>
          <clipPath id="cp-wallet"><rect x="40" y="30" width="240" height="160" rx="10" /></clipPath>
        </defs>
        <ellipse cx="160" cy="205" rx="120" ry="6" fill="#000" opacity="0.22" />
        <rect x="40" y="30" width="240" height="160" rx="10" fill="url(#lg-wallet)" />
        {/* stitching */}
        <rect x="46" y="36" width="228" height="148" rx="8" fill="none" stroke="#d9b98a" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4" />
        <line x1="160" y1="30" x2="160" y2="190" stroke="#000" strokeOpacity="0.35" strokeWidth="1" />
        <g clipPath="url(#cp-wallet)">
          <foreignObject x="40" y="30" width="240" height="160">
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </foreignObject>
        </g>
      </svg>
    );
  }
  if (s === "tag") {
    const wood = product.id === "llavero-madera";
    const grad = wood
      ? "linear-gradient(135deg,#c99560,#8a5f2d)"
      : "linear-gradient(135deg,#7a4a26,#3e2110)";
    return (
      <svg viewBox="0 0 220 320" className="h-full w-full">
        <defs>
          <clipPath id="cp-tag"><rect x="55" y="80" width="110" height="200" rx="14" /></clipPath>
        </defs>
        {/* ring */}
        <circle cx="110" cy="40" r="22" fill="none" stroke="#c0c0c0" strokeWidth="6" />
        <circle cx="110" cy="40" r="22" fill="none" stroke="#8a8a8a" strokeWidth="1" />
        <line x1="110" y1="62" x2="110" y2="85" stroke="#8a8a8a" strokeWidth="2" />
        <ellipse cx="110" cy="300" rx="65" ry="5" fill="#000" opacity="0.2" />
        <foreignObject x="55" y="80" width="110" height="200">
          <div style={{ width: "100%", height: "100%", borderRadius: 14, background: grad }} />
        </foreignObject>
        <g clipPath="url(#cp-tag)">
          <foreignObject x="55" y="80" width="110" height="200">
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </foreignObject>
        </g>
        <rect x="55" y="80" width="110" height="200" rx="14" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.5" />
      </svg>
    );
  }
  if (s === "glass") {
    return (
      <svg viewBox="0 0 220 320" className="h-full w-full">
        <defs>
          <linearGradient id="lg-glass" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c7dbe4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#eaf3f7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#c7dbe4" stopOpacity="0.6" />
          </linearGradient>
          <clipPath id="cp-glass"><path d="M60 60 L160 60 L150 290 L70 290 Z" /></clipPath>
        </defs>
        <ellipse cx="110" cy="305" rx="60" ry="6" fill="#000" opacity="0.18" />
        <path d="M60 60 L160 60 L150 290 L70 290 Z" fill="url(#lg-glass)" stroke="#8fa9b3" strokeWidth="1.5" />
        <path d="M68 70 L74 280" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" />
        <g clipPath="url(#cp-glass)">
          <foreignObject x="60" y="60" width="100" height="230">
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </foreignObject>
        </g>
      </svg>
    );
  }
  if (s === "pendant") {
    return (
      <svg viewBox="0 0 300 300" className="h-full w-full">
        <defs>
          <radialGradient id="lg-pendant" cx="0.35" cy="0.3" r="0.85">
            <stop offset="0%" stopColor="#f6dd8a" />
            <stop offset="60%" stopColor="#d4a63a" />
            <stop offset="100%" stopColor="#7a5a1a" />
          </radialGradient>
          <clipPath id="cp-pendant"><circle cx="150" cy="175" r="72" /></clipPath>
        </defs>
        {/* chain */}
        <path d="M20 40 Q150 110 280 40" stroke="#c8a35a" strokeWidth="2.2" fill="none" opacity="0.85" />
        <path d="M20 40 Q150 110 280 40" stroke="#000" strokeWidth="0.6" fill="none" opacity="0.35" strokeDasharray="3 3" />
        {/* bail */}
        <rect x="142" y="88" width="16" height="18" rx="4" fill="url(#lg-pendant)" stroke="#8a6a1a" strokeWidth="0.8" />
        {/* pendant disc */}
        <ellipse cx="150" cy="252" rx="70" ry="6" fill="#000" opacity="0.2" />
        <circle cx="150" cy="175" r="72" fill="url(#lg-pendant)" stroke="#8a6a1a" strokeWidth="1.2" />
        <g clipPath="url(#cp-pendant)">
          <foreignObject x="78" y="103" width="144" height="144">
            <div style={{ width: "100%", height: "100%" }}>{children}</div>
          </foreignObject>
        </g>
      </svg>
    );
  }
  // coconut
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full">
      <defs>
        <radialGradient id="lg-coco" cx="0.35" cy="0.35" r="0.75">
          <stop offset="0%" stopColor="#6b3e22" />
          <stop offset="70%" stopColor="#3a2010" />
          <stop offset="100%" stopColor="#1a0d05" />
        </radialGradient>
        <clipPath id="cp-coco"><circle cx="150" cy="150" r="110" /></clipPath>
      </defs>
      <ellipse cx="150" cy="275" rx="105" ry="8" fill="#000" opacity="0.25" />
      <circle cx="150" cy="150" r="110" fill="url(#lg-coco)" />
      {/* fiber texture */}
      {Array.from({ length: 30 }).map((_, i) => (
        <line key={i} x1={40 + Math.random()*220} y1={40 + Math.random()*220}
              x2={40 + Math.random()*220} y2={40 + Math.random()*220}
              stroke="#000" strokeOpacity="0.18" strokeWidth="0.8" />
      ))}
      <g clipPath="url(#cp-coco)">
        <foreignObject x="40" y="40" width="220" height="220">
          <div style={{ width: "100%", height: "100%" }}>{children}</div>
        </foreignObject>
      </g>
    </svg>
  );
}

/* Engraving processor — takes an image URL and returns a monochrome
   "etched" bitmap (foreground = engrave color, background = transparent).
   Runs entirely client-side via canvas. */
function useEngraveBitmap(url: string | null, engraveColor: string, intensity: number) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!url) { setDataUrl(null); return; }
    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      const MAX = 512;
      const scaleF = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scaleF));
      const h = Math.max(1, Math.round(img.height * scaleF));
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      let imgData: ImageData;
      try { imgData = ctx.getImageData(0, 0, w, h); }
      catch { setDataUrl(url); return; }
      const d = imgData.data;
      // parse engrave color hex → rgb
      const hex = engraveColor.replace("#", "");
      const er = parseInt(hex.substring(0, 2), 16);
      const eg = parseInt(hex.substring(2, 4), 16);
      const eb = parseInt(hex.substring(4, 6), 16);
      const threshold = 255 - Math.round(intensity * 2.2); // 0..100 → ~255..35
      for (let i = 0; i < d.length; i += 4) {
        const alpha = d[i + 3];
        if (alpha < 20) { d[i + 3] = 0; continue; }
        const lum = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        if (lum < threshold) {
          d[i] = er; d[i + 1] = eg; d[i + 2] = eb; d[i + 3] = 235;
        } else {
          d[i + 3] = 0;
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setDataUrl(c.toDataURL("image/png"));
    };
    img.onerror = () => setDataUrl(null);
    img.src = url;
    return () => { cancelled = true; };
  }, [url, engraveColor, intensity]);
  return dataUrl;
}

function LaserDesigner({
  product, variant, color, byob, uploaded, preset, onFile, onPreset, onClear, fileRef,
  qty, setQty, notes, setNotes, price,
  engraveIntensity, setEngraveIntensity, engraveMode, setEngraveMode,
  scale, setScale, offsetX, setOffsetX, offsetY, setOffsetY,
  duplicated, setDuplicated, onBack,
}: {
  product: LaserProduct;
  variant?: LaserVariant;
  color?: LaserColor;
  byob?: boolean;
  uploaded: string | null; preset: string | null;
  onFile: (f: File | null) => void; onPreset: (p: string) => void; onClear: () => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  qty: number; setQty: (n: number) => void;
  notes: string; setNotes: (s: string) => void;
  price: number;
  engraveIntensity: number; setEngraveIntensity: (n: number) => void;
  engraveMode: "outline" | "original"; setEngraveMode: (m: "outline" | "original") => void;
  scale: number; setScale: (n: number) => void;
  offsetX: number; setOffsetX: (n: number) => void;
  offsetY: number; setOffsetY: (n: number) => void;
  duplicated: boolean; setDuplicated: (b: boolean | ((d: boolean) => boolean)) => void;
  onBack: () => void;
}) {
  const engraveUrl = useEngraveBitmap(uploaded, product.engrave, engraveIntensity);
  const hasArt = !!(uploaded || preset);
  const showOutline = engraveMode === "outline" && !!engraveUrl;

  const centerArt = () => { setOffsetX(0); setOffsetY(0); };

  return (
    <div className="animate-step-in grid gap-8 lg:grid-cols-2">
      {/* LEFT: Controls */}
      <div className="space-y-6">
        {/* Product info */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-soft p-5">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl opacity-30" style={{ background: "var(--brand-orange)" }} />
          <div className="relative flex items-start gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-white" style={{ background: "var(--brand-orange)" }}>
              <Flame className="h-6 w-6" />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Producto seleccionado</div>
              <div className="font-bold leading-tight">{product.name}</div>
              {variant && (
                <div className="mt-1 text-xs">
                  <span className="font-semibold text-foreground">{variant.name}</span>
                  {color && (
                    <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
                      <span className="h-3 w-3 rounded-full border border-black/10" style={{ background: color.hex }} />
                      {color.name}
                    </span>
                  )}
                </div>
              )}
              <p className="mt-1 text-xs text-muted-foreground">{variant?.desc ?? product.desc}</p>
              {byob && (
                <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-background px-2 py-0.5 text-[10px] font-semibold text-foreground">
                  <Check className="h-3 w-3" style={{ color: "var(--brand-orange)" }} />
                  Cliente trae su propio {product.name.toLowerCase()} · solo servicio de grabado
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Upload */}
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 text-sm font-medium transition hover:border-transparent hover:shadow-elegant"
          >
            <Upload className="h-5 w-5" style={{ color: "var(--brand-orange)" }} />
            {uploaded ? "Cambiar arte / logo" : "Subir mi Arte / Logo"}
          </button>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Convertimos automáticamente tu imagen a trazo apto para láser (eliminamos el fondo y dejamos el contorno). Si no se ve bien, usa <strong>Revertir</strong>.
          </p>
        </div>

        {/* Presets */}
        <div>
          <Label className="mb-2 block text-sm">O elige un arte prediseñado</Label>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {presetArts.map((a) => (
              <button
                key={a}
                onClick={() => onPreset(a)}
                className={cn(
                  "flex aspect-square items-center justify-center rounded-xl border-2 text-2xl transition",
                  preset === a ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                )}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Engrave toolbox */}
        {hasArt && (
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="mb-3 flex items-center justify-between">
              <Label className="text-sm font-semibold">Ajustes de grabado</Label>
              <div className="flex gap-1 rounded-md border border-border p-0.5 text-[10px] font-medium">
                <button
                  onClick={() => setEngraveMode("outline")}
                  className={cn("rounded px-2 py-0.5 transition", engraveMode === "outline" ? "bg-foreground text-background" : "text-muted-foreground")}
                >
                  Grabado
                </button>
                <button
                  onClick={() => setEngraveMode("original")}
                  className={cn("rounded px-2 py-0.5 transition inline-flex items-center gap-1", engraveMode === "original" ? "bg-foreground text-background" : "text-muted-foreground")}
                >
                  <RotateCcw className="h-3 w-3" /> Revertir
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <ToolSlider
                icon={<Flame className="h-3.5 w-3.5" />}
                label="Intensidad de grabado"
                value={engraveIntensity} min={15} max={95} step={1}
                onChange={setEngraveIntensity} suffix="%"
              />
              <ToolSlider
                icon={<ZoomIn className="h-3.5 w-3.5" />}
                label="Escala"
                value={scale} min={30} max={200} step={1}
                onChange={setScale} suffix="%"
              />
            </div>

            {/* Quick actions */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <button
                onClick={centerArt}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2 py-2 text-[11px] font-medium transition hover:border-foreground/30 hover:shadow-sm"
              >
                <Move className="h-3.5 w-3.5" /> Centrar
              </button>
              <button
                onClick={() => setDuplicated((d) => !d)}
                className={cn(
                  "flex items-center justify-center gap-1.5 rounded-lg border px-2 py-2 text-[11px] font-medium transition",
                  duplicated ? "border-transparent bg-foreground text-background" : "border-border hover:border-foreground/30",
                )}
              >
                <Copy className="h-3.5 w-3.5" /> {duplicated ? "Duplicado" : "Duplicar"}
              </button>
              <button
                onClick={onClear}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2 py-2 text-[11px] font-medium text-destructive transition hover:border-destructive hover:shadow-sm"
              >
                <Trash2 className="h-3.5 w-3.5" /> Eliminar
              </button>
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <Label htmlFor="lqty" className="mb-2 block text-sm font-semibold">Cantidad</Label>
          <Input id="lqty" type="number" min={1} value={qty} onChange={(e) => setQty(Math.max(1, +e.target.value || 1))} />
          <div className="mt-2 grid grid-cols-4 gap-2">
            {[10, 25, 50, 100].map((n) => (
              <button
                key={n}
                onClick={() => setQty(n)}
                className={cn(
                  "rounded-xl border-2 py-2 text-sm font-bold transition",
                  qty === n ? "rainbow-border-active" : "border-border hover:border-foreground/20",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="lnotes" className="mb-2 block text-sm font-semibold">Instrucciones especiales</Label>
          <Textarea
            id="lnotes"
            rows={3}
            placeholder="Ubicación del grabado, profundidad, tamaño exacto, empaque, entrega, etc."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      {/* RIGHT: Preview */}
      <div className="lg:sticky lg:top-6 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-border bg-gradient-soft p-6">
          <div className="mb-4 flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Vista previa del grabado</span>
            <span className="rounded-full bg-background px-2 py-0.5">{product.name}</span>
          </div>

          <div className="relative mx-auto aspect-square max-w-md">
            <ProductMockup product={product}>
              <div className="relative h-full w-full">
                {hasArt && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `translate(${offsetX}%, ${offsetY}%) scale(${scale / 100})`,
                      transformOrigin: "center",
                    }}
                  >
                    {uploaded ? (
                      showOutline && engraveUrl ? (
                        <img src={engraveUrl} alt="" className="max-h-[75%] max-w-[75%] object-contain" style={{ filter: "drop-shadow(0 0 0.5px rgba(0,0,0,0.4))" }} />
                      ) : (
                        <img src={uploaded} alt="" className="max-h-[75%] max-w-[75%] object-contain opacity-90" />
                      )
                    ) : (
                      <div
                        className="text-[80px] leading-none"
                        style={{ color: product.engrave, textShadow: "0 0 1px rgba(0,0,0,0.35)" }}
                      >
                        {preset}
                      </div>
                    )}
                  </div>
                )}
                {duplicated && hasArt && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `translate(${offsetX + 25}%, ${offsetY + 15}%) scale(${(scale / 100) * 0.6})`,
                      transformOrigin: "center",
                      opacity: 0.85,
                    }}
                  >
                    {uploaded ? (
                      showOutline && engraveUrl ? (
                        <img src={engraveUrl} alt="" className="max-h-[75%] max-w-[75%] object-contain" />
                      ) : (
                        <img src={uploaded} alt="" className="max-h-[75%] max-w-[75%] object-contain opacity-90" />
                      )
                    ) : (
                      <div className="text-[60px] leading-none" style={{ color: product.engrave }}>{preset}</div>
                    )}
                  </div>
                )}
                {!hasArt && (
                  <div className="grid h-full w-full place-items-center">
                    <div className="rounded-lg border border-white/30 bg-black/30 px-3 py-2 text-center text-[11px] font-medium text-white/80 backdrop-blur">
                      Sube tu arte para ver el grabado
                    </div>
                  </div>
                )}
              </div>
            </ProductMockup>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl bg-background/70 p-4 text-center backdrop-blur">
            <Stat label="Producto" value={product.name.split(" ")[0]} />
            <Stat label="Cantidad" value={`${qty}`} />
            <Stat label="Precio estimado" value={currency(price)} highlight />
          </div>

          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            {hasArt
              ? "Ajusta intensidad, escala, centra o duplica. Si el trazo no convence, usa Revertir para ver el original."
              : "El grabado es permanente. Cotización final tras revisar el arte."}
          </p>
        </div>

        {(() => {
          const summary = [
            `Producto: ${product.name} (Grabado Láser)`,
            variant ? `Modelo: ${variant.name}` : "",
            color ? `Color: ${color.name}` : "",
            byob ? "Cliente aporta el producto (solo servicio de grabado)" : "",
            `Modo de grabado: ${engraveMode === "outline" ? "Trazo / outline" : "Original"}`,
            `Intensidad del grabado: ${engraveIntensity}%`,
            `Escala del arte: ${scale}%`,
            duplicated ? "Arte duplicado: sí" : "",
            `Cantidad: ${qty}`,
            notes ? `Notas: ${notes}` : "",
            uploaded ? "Diseño: adjunto (envío la imagen por WhatsApp) 📎" : preset ? `Diseño: preset "${preset}"` : "Diseño: pendiente de enviar",
            "",
            "Solicito una cotización, gracias 🙌",
          ].filter(Boolean).join("\n");
          const waHref = `https://wa.me/50433635666?text=${encodeURIComponent(`Hola Idealo, quiero cotizar grabado láser:\n\n${summary}`)}`;
          return (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cta animate-rainbow-shimmer px-6 py-4 text-base font-semibold text-white shadow-elegant transition hover:scale-[1.01]"
            >
              <MessageCircle className="h-5 w-5" /> Solicitar Cotización por WhatsApp
            </a>
          );
        })()}
        {uploaded && (
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            📎 No olvides adjuntar tu diseño en la conversación de WhatsApp.
          </p>
        )}
        <NavRow onBack={onBack} />
      </div>
    </div>
  );
}

/* ---------- Stickers Quick Info (proceso 1-2-3) ---------- */
function StickersQuickInfo() {
  const steps = [
    {
      icon: FileCheck2,
      title: "APROBÁ TU PRUEBA",
      desc: "Recibí una prueba digital en 1 a 3 días. Si sos de La Ceiba, podés ver la prueba física.",
      bg: "var(--brand-pink)",
    },
    {
      icon: Printer,
      title: "PROCESO DE IMPRESIÓN",
      desc: "Una vez aprobada la prueba, la mayoría de órdenes se envían en 24 horas.",
      bg: "var(--brand-violet)",
    },
    {
      icon: Truck,
      title: "¡EN CAMINO!",
      desc: "Envío gratis dentro de La Ceiba. Fuera de la ciudad, recibí tu pedido en 3 a 5 días.",
      bg: "var(--brand-blue)",
    },
  ];

  return (
    <div className="mt-20 border-t border-border/60 pt-16">
      <div className="mx-auto max-w-5xl">
      <div className="text-center">
        <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
          <span className="bg-gradient-cta bg-clip-text text-transparent">
            Recibí tus Stickers Rápido
          </span>
        </h3>
        <p className="mt-3 text-base text-muted-foreground">
          Entrega en 24 horas y opciones de envío exprés.
        </p>
      </div>

      <div className="relative mt-8 grid items-stretch gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="relative flex h-full">
            <div
              className="flex h-full w-full flex-col items-center rounded-2xl border-[3px] border-foreground p-6 text-center text-white shadow-[6px_6px_0_0_hsl(var(--foreground)/0.9)]"
              style={{ background: `linear-gradient(135deg, ${s.bg}, color-mix(in oklab, ${s.bg} 75%, white))` }}
            >
              <s.icon className="h-12 w-12 shrink-0 text-white drop-shadow-sm" strokeWidth={2.25} />
              <h4 className="mt-4 min-h-[3rem] text-base font-black leading-tight tracking-tight">
                {s.title}
              </h4>
              <p className="mt-3 text-sm font-medium text-white/90">{s.desc}</p>
            </div>

            {i < steps.length - 1 && (
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-full z-10 -translate-x-1/2 translate-y-[-50%] rotate-90 sm:left-full sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 sm:rotate-0"
                style={{ color: "var(--brand-orange)" }}
              >
                <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                  <path
                    d="M2 12 Q 20 -4, 38 12"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="3 3"
                    fill="none"
                  />
                  <path d="M32 4 L44 12 L32 20 Z" fill="currentColor" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}



/* ---------- Imprenta Final Step ---------- */
function ImprentaFinal({
  product, style, specs, setSpecs, qty, setQty, file, setFile, notes, setNotes, fileRef, onBack,
}: {
  product: ImprentaProduct;
  style: { id: ImprentaStyleId; name: string; desc: string; icon: React.ReactNode; accent: string };
  specs: Record<string, string>;
  setSpecs: (s: Record<string, string>) => void;
  qty: number;
  setQty: (n: number) => void;
  file: string | null;
  setFile: (v: string | null) => void;
  notes: string;
  setNotes: (v: string) => void;
  fileRef: React.RefObject<HTMLInputElement | null>;
  onBack: () => void;
}) {
  const needsUpload = style.id === "propio";
  const isTemplate = style.id === "plantilla";
  const allSpecsChosen = product.fields.every((f) => specs[f.key]);
  const [tplSummary, setTplSummary] = useState("");

  const summary = [
    `Producto: ${product.name}`,
    `Estilo de diseño: ${style.name}`,
    `Cantidad: ${qty}`,
    ...product.fields.map((f) => `${f.label}: ${specs[f.key] || "-"}`),
    isTemplate && tplSummary ? `\n--- Plantilla editada ---\n${tplSummary}` : "",
    notes ? `Notas: ${notes}` : "",
    file ? "Diseño: adjunto (se envía por WhatsApp)" : needsUpload ? "Diseño: pendiente de enviar" : "Diseño: a cargo de Idealo",
  ].filter(Boolean).join("\n");

  const waMsg = encodeURIComponent(`Hola Idealo, quiero cotizar imprenta:\n\n${summary}`);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(URL.createObjectURL(f));
  };

  return (
    <div className="animate-step-in grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      {/* LEFT: specs */}
      <div className="space-y-6">
        {isTemplate && (
          <ImprentaTemplateEditor product={product} onExport={setTplSummary} />
        )}
        <SectionTitle icon={<FileCheck2 className="h-5 w-5" />} title="Especificaciones del producto" />

        {product.fields.map((f) => (
          <div key={f.key}>
            <Label className="text-sm font-semibold">{f.label}</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {f.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSpecs({ ...specs, [f.key]: opt })}
                  className={cn(
                    "rounded-full border-2 px-4 py-2 text-sm font-medium transition",
                    specs[f.key] === opt
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card hover:border-foreground/40",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div>
          <Label className="text-sm font-semibold">Cantidad</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.qtyOptions.map((n) => (
              <button
                key={n}
                onClick={() => setQty(n)}
                className={cn(
                  "rounded-full border-2 px-4 py-2 text-sm font-medium transition",
                  qty === n
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card hover:border-foreground/40",
                )}
              >
                {n.toLocaleString()}
              </button>
            ))}
            <Input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, parseInt(e.target.value || "1", 10)))}
              className="h-10 w-28 rounded-full border-2"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-semibold">
            {needsUpload ? "Subí tu diseño (obligatorio)" : "Subí referencia o logo (opcional)"}
          </Label>
          <label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-background px-4 py-6 text-sm font-medium text-muted-foreground transition hover:border-foreground/40 hover:text-foreground">
            <Upload className="h-4 w-4" />
            {file ? "Cambiar archivo" : "Seleccionar PDF, AI, PSD o imagen"}
            <input
              ref={fileRef}
              type="file"
              accept="image/*,.pdf,.ai,.psd"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {file && (
            <div className="mt-3 flex items-center gap-3 rounded-xl border border-border bg-background p-3">
              <div className="h-14 w-14 overflow-hidden rounded-lg bg-muted">
                <img src={file} alt="preview" className="h-full w-full object-cover" />
              </div>
              <div className="flex-1 text-xs text-muted-foreground">Archivo listo · lo enviaremos con tu cotización.</div>
              <Button variant="ghost" size="sm" onClick={() => { setFile(null); if (fileRef.current) fileRef.current.value = ""; }}>
                Quitar
              </Button>
            </div>
          )}
        </div>

        <div>
          <Label className="text-sm font-semibold">Notas para el equipo (opcional)</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: colores exactos, fecha límite, referencias visuales…"
            className="mt-2 min-h-[90px] rounded-2xl border-2"
          />
        </div>
      </div>

      {/* RIGHT: resumen + CTA */}
      <div className="space-y-4">
        <div className="rounded-3xl border border-border bg-background p-6 shadow-card-soft">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl text-white" style={{ background: product.accent }}>
              {product.icon}
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Tu pedido</div>
              <div className="text-lg font-bold">{product.name}</div>
            </div>
          </div>

          <dl className="mt-5 space-y-2 text-sm">
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Estilo de diseño</dt>
              <dd className="font-semibold">{style.name}</dd>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <dt className="text-muted-foreground">Cantidad</dt>
              <dd className="font-semibold">{qty.toLocaleString()}</dd>
            </div>
            {product.fields.map((f) => (
              <div key={f.key} className="flex justify-between border-b border-border/60 pb-2">
                <dt className="text-muted-foreground">{f.label}</dt>
                <dd className="font-semibold">{specs[f.key] || <span className="text-muted-foreground/70">Elegir</span>}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-xs text-muted-foreground">
            Cotización final tras revisión de arte y confirmación con nuestro equipo.
          </p>
        </div>

        <a
          href={`https://wa.me/50433635666?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          aria-disabled={!allSpecsChosen || (needsUpload && !file)}
          onClick={(e) => {
            if (!allSpecsChosen || (needsUpload && !file)) e.preventDefault();
          }}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-cta animate-rainbow-shimmer px-6 py-4 text-base font-semibold text-white shadow-elegant transition",
            (!allSpecsChosen || (needsUpload && !file)) ? "cursor-not-allowed opacity-60" : "hover:scale-[1.01]",
          )}
        >
          <MessageCircle className="h-5 w-5" /> Enviar cotización por WhatsApp
        </a>
        {(!allSpecsChosen || (needsUpload && !file)) && (
          <p className="text-center text-xs text-muted-foreground">
            {!allSpecsChosen ? "Elegí todas las especificaciones para continuar." : "Subí tu diseño para enviar la cotización."}
          </p>
        )}

        <NavRow onBack={onBack} />
      </div>
    </div>
  );
}
