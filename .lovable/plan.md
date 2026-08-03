## Qué cambia

Solo el paso de diseño de camisas (`TextilesDesignStep` dentro de `Configurator.tsx`). No se toca la lógica del editor (`TextilesEditor2D.tsx`): de ahí solo se **leen** las constantes `PRINT_ZONE` y `ZONE_CM` que ya existen, exportándolas.

## Layout propuesto

```text
DESKTOP (2 columnas)
┌──────────────────────────────┬───────────────────────────────┐
│  MOCKUP GRANDE (4:5)         │  1. COLOR DE LA CAMISA        │
│  ┌────────────────────────┐  │     ● ● ● ● ● ● ● ●  (swatch) │
│  │      camisa + zona     │  │     Negro                     │
│  │   ┌╌╌╌╌╌╌╌╌╌╌╌╌┐ ▲     │  │                               │
│  │   ┆ [Área segura]┆ 38  │  │  2. PARTE TRASERA             │
│  │   ┆  diseño      ┆ cm  │  │   ┌───────────┐ ┌───────────┐ │
│  │   ┆ [Sangrado]   ┆ ▼   │  │   │ En blanco │ │Con diseño │ │
│  │   └╌╌╌╌╌╌╌╌╌╌╌╌┘       │  │   └───────────┘ └───────────┘ │
│  │     ◄── 30 cm ──►      │  │                               │
│  └────────────────────────┘  │  3. TALLAS Y CANTIDAD         │
│  ┌──┐┌──┐┌──┐                │   S [0] M [2] L [3] XL [0]... │
│  │Fr││Es││Do│  miniaturas    │   Total: 5 prendas            │
│  └──┘└──┘└──┘                │                               │
│                              │  4. ACCIONES                  │
│                              │  [Ver plantillas]             │
│                              │  [Subir tu diseño]            │
│                              │  [Que lo diseñemos nosotros]  │
└──────────────────────────────┴───────────────────────────────┘

MOBILE: mockup arriba (full width) → miniaturas en fila →
panel de opciones apilado en el mismo orden 1-2-3-4.
```

## Zona de impresión sobre el mockup

- Caja punteada posicionada con los % de `PRINT_ZONE[view]` (frente / espalda / manga), en overlay absoluto sobre la foto del mockup.
- Dos pills pequeñas, esquina superior izquierda y esquina inferior derecha de la caja:
  - **Área segura** — pill cyan de marca, borde punteado interior al 92% de la caja.
  - **Sangrado** — pill ámbar, corresponde al borde exterior de la caja.
- Reglas de medida: línea vertical a la izquierda con la altura y línea horizontal debajo con el ancho, con marcas en los extremos. Los números salen de `ZONE_CM` (frente 30 × 38 cm, espalda 32 × 42 cm, manga 9 × 30 cm), con la conversión a pulgadas entre paréntesis: `30 cm (11.8")`.
- Sin diseño subido: la caja se ve tenue, como referencia ("Esta es el área imprimible").
- Con diseño subido: la imagen se ajusta dentro de la caja (contain), es **arrastrable y redimensionable** con los 6 handles ya conocidos, siempre recortada a la caja, y arriba de ella aparece en vivo `≈ 18 cm x 14 cm (7.1" x 5.5")` calculado con la misma fórmula `% × ZONE_CM` que ya usás.

## Los tres caminos

| Botón | Acción |
|---|---|
| Ver plantillas | Link interno a `/portafolio` filtrado por textiles (abre en pestaña nueva, no pierde el configurador) |
| Subir tu diseño | Abre el file picker actual, mantiene `ResolutionWarning` con el DPI real ya calculado sobre el tamaño en cm de la zona |
| Que lo diseñemos nosotros | Va al flujo de cotización/WhatsApp con la nota "diseño incluido (costo adicional)", igual que hoy |

## Detalles técnicos

- `TextilesEditor2D.tsx`: se agrega `export` a `PRINT_ZONE` y `ZONE_CM` (y el tipo `ViewId`). Cero cambios de comportamiento.
- Nuevo componente `src/components/TextilesMockupStage.tsx`: mockup + overlay de zona + reglas + capa arrastrable. Aísla toda la parte visual nueva.
- `Configurator.tsx`: `TextilesDesignStep` se reescribe con el layout de dos columnas; se conserva estado existente (color, técnica, upload, notas) y se agrega estado nuevo para tallas por cantidad y "parte trasera".
- El mensaje de WhatsApp pasa a incluir el desglose por talla, la vista elegida y la medida en cm del diseño.
- Tokens semánticos existentes (`brand-magenta`, `brand-cyan`, `border`, `muted-foreground`); nada hardcodeado.

## Alcance

2 archivos tocados (1 nuevo), sin backend, sin borrar nada.
