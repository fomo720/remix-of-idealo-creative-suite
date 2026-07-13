// Catálogo completo de Idealo — extraído del Instagram @idealohn
// Cada categoría agrupa productos personalizables. Las opciones son referenciales
// para el configurador (paso 2). Los precios son "Cotizar" salvo indicación.

export type ProductOption = {
  label: string;
  values: string[];
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  tag?: string;
  options?: ProductOption[];
  image?: string;
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  description: string;
  /** Color token key (matches --brand-*) */
  color: "pink" | "yellow" | "blue" | "violet" | "orange" | "green" | "red" | "indigo";
  emoji: string;
  products: Product[];
};

export const WHATSAPP_NUMBER = "50433635666"; // 3363-5666
export const WHATSAPP_ALT = "50431787201"; // 3178-7201

export const categories: Category[] = [
  {
    slug: "impresion-papeleria",
    name: "Impresión & Papelería",
    short: "Impresión",
    description:
      "Tarjetas, menús, carpetas, brochures, etiquetas y todo para tu marca en papel de alta calidad.",
    color: "blue",
    emoji: "📇",
    products: [
      {
        slug: "tarjetas-presentacion",
        name: "Tarjetas de presentación",
        description: "Papel premium, acabados brillante o mate, doble lado.",
        options: [
          { label: "Cantidad", values: ["100", "250", "500", "1000"] },
          { label: "Acabado", values: ["Mate", "Brillante", "UV Selectivo"] },
          { label: "Papel", values: ["Cartulina 300g", "Kraft", "Reciclado"] },
        ],
      },
      {
        slug: "menus-restaurantes",
        name: "Menús para restaurantes",
        description: "Impresión doble lado, espiral metal, laminado impermeable.",
        options: [
          { label: "Formato", values: ["A4", "Tabloide", "Custom"] },
          { label: "Acabado", values: ["Laminado mate", "Laminado brillante", "Sin laminar"] },
          { label: "Encuadernación", values: ["Espiral metal", "Grapa", "Suelto"] },
        ],
      },
      {
        slug: "carpetas-corporativas",
        name: "Carpetas corporativas",
        description: "Cartón laminado con doble compartimiento para propuestas.",
      },
      {
        slug: "brochures-volantes",
        name: "Brochures y volantes",
        description: "Trifoliares, bifoliares, volantes tamaño carta o media carta.",
      },
      {
        slug: "rollos-facturacion",
        name: "Rollos para facturación",
        description: "Térmico L35, Químico L30. Excelente precio y calidad.",
      },
      {
        slug: "etiquetas-foil",
        name: "Etiquetas con foil",
        description: "Foil dorado o plateado para joyería, boutiques y regalos premium.",
      },
      {
        slug: "etiquetas-bebidas",
        name: "Etiquetas para bebidas",
        description: "Impresión de alta calidad, material impermeable, cortes personalizados.",
      },
      {
        slug: "empaques-cajas",
        name: "Empaques y cajas personalizadas",
        description: "Cajas con tu marca, bolsas kraft, empaques para delivery.",
      },
    ],
  },
  {
    slug: "stickers-pvc",
    name: "Stickers & PVC",
    short: "Stickers",
    description:
      "Stickers troquelados, figuras PVC, cake toppers y decoración impresa en cualquier forma.",
    color: "pink",
    emoji: "✨",
    products: [
      {
        slug: "stickers-troquelados",
        name: "Stickers troquelados",
        description: "Cualquier forma, diseño y tamaño. Adhesivo de alta calidad.",
        options: [
          { label: "Material", values: ["Vinil", "Impermeable", "Transparente", "Holográfico"] },
          { label: "Tamaño", values: ["2x2 pulg", "3x3 pulg", "5x5 pulg", "Custom"] },
          { label: "Cantidad", values: ["25", "50", "100", "500"] },
        ],
      },
      {
        slug: "stickers-marca",
        name: "Stickers de marca",
        description: "Para emprendedores: identidad, empaques y regalos.",
      },
      {
        slug: "figuras-pvc",
        name: "Figuras troqueladas PVC",
        description: "Sticker + PVC en cualquier tamaño y personaje.",
      },
      {
        slug: "pvc-bienvenida",
        name: "PVC de bienvenida",
        description: "Perfecto para eventos, bodas y cumpleaños con nombres personalizados.",
      },
      {
        slug: "cake-topper",
        name: "Cake toppers",
        description: "Personaliza tu pastel con nombre, edad o temática.",
      },
      {
        slug: "hang-tags",
        name: "Hang tags & etiquetas colgantes",
        description: "Para ropa, regalos y productos artesanales.",
      },
      {
        slug: "stickers-bioseguridad",
        name: "Stickers de bioseguridad",
        description: "Señalética estándar de prevención COVID y seguridad industrial.",
      },
    ],
  },
  {
    slug: "banners-publicidad",
    name: "Banners & Publicidad",
    short: "Banners",
    description:
      "Roll-up, banners araña, banderines, microperforado, rotulación industrial y stands.",
    color: "violet",
    emoji: "🎯",
    products: [
      {
        slug: "banner-roll-up",
        name: "Banner Roll-Up",
        description: "33.5 × 78.7 pulgadas. Incluye araña y estuche.",
        options: [
          { label: "Tamaño", values: ["85x200cm", "100x200cm", "120x200cm"] },
          { label: "Incluye estuche", values: ["Sí", "No"] },
        ],
      },
      {
        slug: "banner-arana",
        name: "Banner araña",
        description: "Diferentes tamaños para ferias, eventos y locales comerciales.",
      },
      {
        slug: "banderines-publicitarios",
        name: "Banderines publicitarios",
        description: "Disponible de 3 y 5 metros. Incluye base y contrapeso.",
      },
      {
        slug: "banner-ojales",
        name: "Banner con ojales",
        description: "Material resistente para exteriores, cumpleaños, negocios.",
      },
      {
        slug: "microperforado",
        name: "Microperforado",
        description: "Vinil para vidrieras y locales, permite ver desde adentro.",
      },
      {
        slug: "rotulacion-industrial",
        name: "Rotulación industrial",
        description: "Señales de seguridad, rotulación empresarial y de emergencia.",
      },
      {
        slug: "stand-fotos",
        name: "Stand para fotos",
        description: "Backdrop personalizado para eventos y activaciones de marca.",
      },
      {
        slug: "hablador",
        name: "Habladores personalizados",
        description: "Con información de contacto de tu marca. Ideal para carpas y stands.",
      },
    ],
  },
  {
    slug: "grabado-laser",
    name: "Grabado Láser",
    short: "Grabado Láser",
    description:
      "Grabado permanente en cuero, madera, metal y más. Regalos únicos y corporativos.",
    color: "orange",
    emoji: "🔥",
    products: [
      {
        slug: "tabla-cortar",
        name: "Tabla de cortar grabada",
        description: "Madera de alta calidad con grabado láser personalizado.",
        options: [
          { label: "Tamaño", values: ["Pequeña", "Mediana", "Grande"] },
          { label: "Estilo", values: ["Con asa", "Rectangular", "Redonda"] },
        ],
      },
      {
        slug: "cartera-cuero",
        name: "Cartera de cuero grabada",
        description: "Cuero premium con iniciales, nombre o logo grabado.",
      },
      {
        slug: "llavero-cuero",
        name: "Llavero de cuero grabado",
        description: "Llavero de cuero con grabado permanente y llavero de metal.",
      },
      {
        slug: "llavero-madera",
        name: "Llavero de madera grabado",
        description: "Madera natural con grabado láser fino.",
      },
      {
        slug: "botella-metalica",
        name: "Botella metálica grabada",
        description: "Botella térmica con nombre o logo grabado láser.",
      },
      {
        slug: "marcos-madera",
        name: "Marcos de madera grabados",
        description: "Perfecto para regalos de bodas, aniversarios y graduaciones.",
      },
      {
        slug: "coco-grabado",
        name: "Coco grabado",
        description: "Regalo único tropical con grabado personalizado.",
      },
    ],
  },
  {
    slug: "sublimacion",
    name: "Sublimación",
    short: "Sublimación",
    description:
      "Tazas, termos, jarras, cuadros, cojines, puzzles: tu foto en cualquier superficie.",
    color: "yellow",
    emoji: "🎨",
    products: [
      {
        slug: "tazas-sublimadas",
        name: "Tazas sublimadas",
        description: "Cerámica de alta calidad, colores vivos, aptas para microondas.",
        options: [
          { label: "Tipo", values: ["Blanca", "Mágica", "Negra interior", "Corazón"] },
          { label: "Cantidad", values: ["1", "6", "12", "24"] },
        ],
      },
      {
        slug: "termos-skinny",
        name: "Termos sublimados",
        description: "Termo térmico skinny con tu diseño alrededor.",
      },
      {
        slug: "jarras-cerveza",
        name: "Jarras de cerveza personalizadas",
        description: "Jarra de vidrio con impresión sublimada.",
      },
      {
        slug: "vasos-personalizados",
        name: "Vasos personalizados",
        description: "Vasos de vidrio o plástico con tu marca o diseño.",
      },
      {
        slug: "cojines-personalizados",
        name: "Cojines personalizados",
        description: "Foto o diseño impreso en cojín premium relleno incluido.",
      },
      {
        slug: "rompecabezas",
        name: "Rompecabezas / Puzzles",
        description: "Tu foto convertida en puzzle de 100, 300 o 500 piezas.",
      },
      {
        slug: "cuadros-pvc",
        name: "Cuadros en PVC",
        description: "Impresión sobre PVC ligero y resistente para pared.",
      },
      {
        slug: "cuadros-canvas",
        name: "Cuadros canvas",
        description: "Lienzo con tu foto favorita, listo para colgar.",
      },
      {
        slug: "imantados",
        name: "Imantados personalizados",
        description: "Imanes para nevera con tus fotos o diseños.",
      },
      {
        slug: "foto-polaroid",
        name: "Fotografía estilo Polaroid",
        description: "Impresiones tipo Polaroid con marco blanco clásico.",
      },
      {
        slug: "cadena-foto",
        name: "Cadena con foto",
        description: "Foto en placa, madera o cristal para colgar con cadena.",
      },
      {
        slug: "retrateras",
        name: "Retrateras con foto impresa",
        description: "Marcos con foto impresa lista para regalar.",
      },
    ],
  },
  {
    slug: "textiles",
    name: "Textiles Personalizados",
    short: "Textiles",
    description:
      "Camisetas, polos, gorras, boxers, calcetas, uniformes y bolsos con tu diseño.",
    color: "green",
    emoji: "👕",
    products: [
      {
        slug: "camisetas-personalizadas",
        name: "Camisetas personalizadas",
        description: "Sublimación o estampado. Disponible en blanco, negro y colores.",
        options: [
          { label: "Talla", values: ["S", "M", "L", "XL", "XXL"] },
          { label: "Color", values: ["Blanca", "Negra", "Colores"] },
          { label: "Técnica", values: ["Sublimación", "Estampado vinil", "DTF"] },
        ],
      },
      {
        slug: "camisetas-estampadas",
        name: "Camisetas estampadas",
        description: "Diseños originales o tu logo estampado por unidad o al por mayor.",
      },
      {
        slug: "camisas-polo",
        name: "Camisas polo bordadas",
        description: "Polos corporativos con bordado o estampado del logo.",
      },
      {
        slug: "gorras-personalizadas",
        name: "Gorras personalizadas",
        description: "Gorras planas y curvas con bordado o parche.",
      },
      {
        slug: "boxers-personalizados",
        name: "Boxers personalizados",
        description: "Regalo original para pareja o amigos.",
      },
      {
        slug: "calcetas-personalizadas",
        name: "Calcetas personalizadas",
        description: "Con caras, logos o diseños divertidos.",
      },
      {
        slug: "bolsos-mama",
        name: "Bolsos para mamá",
        description: "Tote bags de yute con nombre bordado o estampado.",
      },
      {
        slug: "tote-bags",
        name: "Tote bags",
        description: "Bolsas ecológicas con tu marca.",
      },
      {
        slug: "uniformes",
        name: "Uniformes corporativos",
        description: "Sets completos para tu equipo con bordado y estampado.",
      },
    ],
  },
  {
    slug: "eventos",
    name: "Eventos & Decoración",
    short: "Eventos",
    description:
      "Todo para cumpleaños, bodas, baby showers y fechas especiales. Diseño 360°.",
    color: "red",
    emoji: "🎉",
    products: [
      {
        slug: "kit-cumpleanos",
        name: "Kit cumpleaños completo",
        description: "PVC bienvenida, banner parador, cake topper, menú, cajitas, etiquetas botellas, número mesa.",
        options: [
          { label: "Temática", values: ["Princesas", "Superhéroes", "Elegante", "Neón", "Custom"] },
          { label: "Invitados", values: ["10-25", "25-50", "50-100"] },
        ],
      },
      {
        slug: "decoracion-bodas",
        name: "Decoración de bodas",
        description: "Menús, señalética, número de mesas, letreros de bienvenida.",
      },
      {
        slug: "baby-shower",
        name: "Kit baby shower",
        description: "Decoración temática completa lista para tu evento.",
      },
      {
        slug: "san-valentin",
        name: "Regalos San Valentín",
        description: "Marcos, cadenas grabadas, boxers, retrateras con foto.",
      },
      {
        slug: "dia-padre",
        name: "Regalos Día del Padre",
        description: "Botellas personalizadas, tablas de cortar, grabado láser en cuero.",
      },
      {
        slug: "dia-madre",
        name: "Regalos Día de la Madre",
        description: "Bolsos personalizados, tazas, cuadros con fotos y más.",
      },
      {
        slug: "navidad",
        name: "Regalos navideños",
        description: "Vinyl stickers navideños, ornamentos con foto, calendarios corporativos.",
      },
      {
        slug: "fiestas-patrias",
        name: "Fiestas patrias",
        description: "Camisetas #VosSoloPapa, banderines, decoración cuadro de danza.",
      },
      {
        slug: "back-to-school",
        name: "Back to school",
        description: "Loncheras, mochilas y útiles personalizados con nombre.",
      },
    ],
  },
  {
    slug: "corporativo",
    name: "Corporativo",
    short: "Corporativo",
    description:
      "Combos para emprendedores, calendarios, regalos corporativos y branding 360°.",
    color: "indigo",
    emoji: "💼",
    products: [
      {
        slug: "combo-emprendedor",
        name: "Combo #1 Emprendedor",
        description: "1 camisa blanca con logo (S/M/L), 100 stickers, 100 tarjetas, 100 hojas volantes, 1 hablador. L. 600.",
      },
      {
        slug: "combos-corporativos",
        name: "Combos corporativos",
        description: "Termos, libretas, boligrafos, mochilas con tu marca.",
      },
      {
        slug: "calendarios",
        name: "Calendarios corporativos",
        description: "Diseño y personalización con tu logo, temática y mensajes por mes.",
      },
      {
        slug: "regalos-corporativos",
        name: "Regalos corporativos",
        description: "Kits de bienvenida, aniversario y fin de año.",
      },
      {
        slug: "rotulacion-empresa",
        name: "Rotulación empresarial",
        description: "PVC para mesas, exhibidores, rótulos internos y externos.",
      },
      {
        slug: "servicio-360",
        name: "Servicio 360° para eventos corporativos",
        description: "Diseño, impresión, montaje y cobertura en tu activación de marca.",
      },
    ],
  },
];

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function allProducts() {
  return categories.flatMap((c) =>
    c.products.map((p) => ({ ...p, category: c }))
  );
}

export function findProduct(slug: string) {
  return allProducts().find((p) => p.slug === slug);
}

export function whatsappLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
