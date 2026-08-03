## Dónde vive hoy la personalización de camisas

Todo el flujo textil está dentro de **un solo archivo**, `src/components/Configurator.tsx` (5.488 líneas), que se monta en la home:

```text
src/routes/index.tsx  ->  <Configurator />
                            ├── TextilesShirtTypeStep   (línea ~4861)  tipo de prenda (fotos reales)
                            ├── TextilesFabricStep      (~4912)        material
                            ├── TextilesSleeveStep      (~4964)        manga
                            ├── TextilesColorStep       (~5011)        color (TX_COLORS, línea 209)
                            ├── TextilesSizeQtyStep     (~5064)        talla / cantidad
                            └── TextilesDesignStep      (~5124)  <-- lo que se reemplaza
                                  ├── canvas interactivo (drag, 6 handles, rotación, escala)
                                  ├── <TextilesEditor2D />  (línea 5394)
                                  │      └── lazy <TextilesShirt3D />  (vistas 3D + html-to-image)
                                  └── botones WhatsApp / "que me lo diseñen"
```

Ningún otro route importa `TextilesEditor2D` ni `TextilesShirt3D`: solo se llegan a ver a través del paso 4 del configurador. Desconectarlos es un cambio local.

## Qué cambiaría

### 1. `TextilesDesignStep` se reescribe (mismo nombre, misma posición en el flujo)

Nuevo contenido, en el estilo del resto del sitio (tarjetas redondeadas, `bg-card`, gradiente de marca en el CTA):

- **Galería de color** con las fotos reales que ya existen en `src/assets` (`tx-photo-front/back/folded`, `tx-white-*`, `tx-tipo-*`), en grid de tarjetas seleccionables — sin canvas, sin 3D.
- **Subir diseño**: un botón grande con dropzone (reutiliza el `fileRef`/`onUpload` que ya existe), muestra miniatura y botón de quitar. Se mantiene `ResolutionWarning` porque es informativo y no bloquea.
- **Notas**: `<textarea>` con placeholder "Contanos qué querés: colores, ubicación del diseño, cantidad, etc." (ya existe estado `notes`).
- **CTA WhatsApp**: mismo patrón que el resto del sitio — arma el mensaje con tipo, material, manga, color, talla, cantidad y notas, y pasa por `onSubmitted({ href, text })` para que siga apareciendo el modal de preparación ya existente.
- Se mantiene el botón "Quiero que ustedes me lo diseñen".

Se eliminan de este paso: canvas interactivo, handles de resize, rotación/escala/offsets, selector 2D/3D/ambos, fondo checker y la exportación de imagen.

### 2. Se desconectan (no se borran) los archivos 3D/2D

- `src/components/TextilesEditor2D.tsx` — se queda en el repo, ya sin importadores.
- `src/components/TextilesShirt3D.tsx` — igual.
- `src/components/ErrorBoundary.tsx` — se queda (uso genérico).
- Se quitan solo los `import` / `lazy(...)` en `Configurator.tsx` (líneas 3 y 4).

### 3. Pasos previos sin cambios

Tipo, material, manga, color, talla y cantidad siguen igual, con el auto-avance al primer clic que ya pediste. El gating en `goTo` (línea ~877) no se toca.

## Detalles técnicos

- Estados que quedan obsoletos en `Configurator` (`scale`, `offsetX`, `offsetY`, `rotation`, `scaleX`) se dejan de pasar al paso de diseño; los que dejan de usarse por completo se eliminan de la firma del componente.
- Las deps `three`, `@react-three/fiber`, `@react-three/drei`, `html-to-image` quedan sin uso en el bundle del cliente porque el `lazy()` desaparece — no se desinstalan, por si vuelve la fase 3D.
- No hay cambios de backend, rutas ni datos.

## Alcance

Archivos tocados: **solo `src/components/Configurator.tsx`**. Cero borrados.
