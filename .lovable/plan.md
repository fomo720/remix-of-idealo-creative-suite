## Antes de nada

Ojo: en el turno pasado desconectamos `TextilesEditor2D` del flujo del cliente (el paso 4 de camisas hoy es galería + subir logo + notas). El archivo sigue en el repo. Puedo aplicar estas dos mejoras igual (queda listo para cuando lo reconectemos), o reconectarlo. Decime.

## 1. Botones de posición predefinida

Barra nueva en el panel de la izquierda, arriba de "Capas", solo visible cuando hay un diseño seleccionado. Mismo estilo que los chips existentes (pill, borde `border-border`, activo con ring rosa de marca).

```text
UBICACIÓN RÁPIDA
┌──────────────────────┐ ┌──────────────────────┐
│ Pecho izquierdo      │ │ Centro del pecho     │
│ chico · ≈8 x 8 cm    │ │ mediano · ≈25x25 cm  │
└──────────────────────┘ └──────────────────────┘
┌──────────────────────┐
│ Pecho completo       │
│ grande · ≈30 x 38 cm │
└──────────────────────┘
Podés seguir arrastrando y ajustando a mano.
```

Presets por vista (valores en % de la zona de impresión que ya existe, así **no se toca `PRINT_ZONE` ni la lógica de recorte**):

| Vista | Presets |
|---|---|
| Frente | Pecho izquierdo (chico), Centro del pecho (mediano), Pecho completo (grande) |
| Espalda | Espalda centro-alto (mediano), Espalda completa (grande), Bajo el cuello (chico) |
| Mangas | Manga alta (chico), Manga centrada (chico) |

Al hacer clic se hace un `updateLayer` sobre la capa seleccionada con `x/y/w/h` del preset, respetando la relación de aspecto de la imagen (se ajusta el lado que sobra, igual que hace hoy `addImageLayer`). Nada se bloquea: arrastre y handles siguen igual.

## 2. Medida aproximada en cm

Debajo del bloque de la capa seleccionada, junto a los controles de tamaño:

```text
Tamaño aprox. impreso
≈ 10 cm x 10 cm
Medida referencial sobre talla M
```

Cálculo: se agrega una tabla `ZONE_CM` con el tamaño real de cada zona de impresión (frente 30x38 cm, espalda 32x42 cm, manga 9x30 cm, valores estándar de serigrafía sobre talla M). Como las capas ya guardan `w`/`h` en % de la zona, la medida es `w% × ancho_cm_de_la_zona`, redondeado a 0.5 cm. Se actualiza en vivo mientras se arrastra un handle.

La misma medida aparece como etiqueta flotante sobre el diseño mientras se está redimensionando, y desaparece al soltar.

## Detalles técnicos

- Solo se edita `src/components/TextilesEditor2D.tsx`.
- Nuevas constantes: `ZONE_CM: Record<ViewId, {w:number;h:number}>` y `POSITION_PRESETS: Record<ViewId, {id,label,hint,x,y,w,h}[]>`.
- Sin cambios en `PRINT_ZONE`, en el clipping, en los mockups ni en el composite para WhatsApp/3D.
- El resumen que se manda por WhatsApp puede incluir la medida en cm por vista (útil para producción) — lo agrego salvo que prefieras que no.

## Alcance

1 archivo tocado, cero borrados, cero cambios de backend.
