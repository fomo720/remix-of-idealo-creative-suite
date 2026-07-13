# Rediseño Idealo — Catálogo completo + Configurador

## Alcance

Convertir el sitio actual (una sola página con Hero + Configurador limitado) en un sitio multi-página con TODO el catálogo visto en Instagram, un configurador visual que permita subir arte, y una estética "Colorido & Creativo" fiel al logo multicolor de Idealo (rosa magenta, amarillo, cyan, morado).

## Estructura de rutas (TanStack Start)

```
/                         Landing con hero + servicios destacados + CTA
/servicios                Catálogo completo por categorías
/servicios/$categoria     Página de categoría con todos sus productos
/personalizar/$producto   Configurador visual + subir arte
/eventos                  Sección eventos (cumpleaños, bodas, corporativos, patrios)
/portafolio               Portafolio actual (mantener)
/contacto                 Contacto + ubicación + WhatsApp
```

Cada ruta con su propio `head()` (title, description, og:*) para SEO.

## Categorías detectadas en Instagram

1. **Impresión & Papelería** — Menús, carpetas corporativas, tarjetas de presentación, volantes, brochures, rollos de facturación, etiquetas (foil, para bebidas, empaques).
2. **Stickers & PVC** — Stickers troquelados, stickers de marca, figuras PVC + sticker, PVC de bienvenida, cake toppers, hang tags, stickers bioseguridad.
3. **Banners & Publicidad** — Roll-up, banner araña, banderines, banners con ojales, microperforado, rotulación industrial, stand para fotos, habladores.
4. **Grabado Láser** — Tablas de cortar, carteras de cuero, llaveros de cuero/madera, botellas metálicas, marcos, cajas.
5. **Sublimación** — Tazas, termos, jarras, vasos, cojines, rompecabezas, cuadros PVC/canvas, imantados, foto polaroid, cadenas con foto.
6. **Textiles** — Camisetas personalizadas/estampadas/patrióticas, polos, gorras, boxers, calcetas, bolsos de mamá, tote bags, uniformes.
7. **Eventos & Decoración** — Kits cumpleaños (banner parador, cake topper, menú, cajitas, etiquetas botellas, número mesa), decoración bodas/baby shower, temáticas (San Valentín, Día Padre/Madre, Navidad, fiestas patrias, back to school, Semana Santa).
8. **Corporativo** — Combos emprendedor, calendarios, carpetas, uniformes, combos con marca, rotulación empresarial.

## Configurador visual (`/personalizar/$producto`)

Flujo por producto:
1. Preview grande del producto seleccionado.
2. Opciones específicas (tamaño, material, cantidad, color, acabado) — cada producto define su schema.
3. Subir arte/logo (drag & drop, preview inmediato).
4. Notas del cliente (textarea).
5. Botón "Enviar cotización" → arma mensaje WhatsApp con producto + opciones + link al arte subido y abre `wa.me/50433635666`.

**Backend:** Activar Lovable Cloud para storage de arte del cliente (bucket privado `client-artwork`) y una tabla `quote_requests` para registrar solicitudes. Sin auth requerida — cada solicitud genera un token anónimo.

## Estilo visual "Colorido & Creativo"

Paleta (tokens en `src/styles.css`):
- `--brand-magenta: oklch(0.62 0.28 0)` (#FF3EA5)
- `--brand-yellow: oklch(0.85 0.19 90)` (#FFB800)
- `--brand-cyan: oklch(0.75 0.18 220)` (#00C2FF)
- `--brand-purple: oklch(0.48 0.28 300)` (#7B2FF7)
- Fondo claro con secciones alternando color, tarjetas con bordes gruesos y sombras coloridas.

Tipografía: **Space Grotesk** (display, headings grandes y bold) + **DM Sans** (body). Cargar en `__root.tsx` con `<link>`.

Elementos:
- Gradientes multicolor en CTAs y titulares clave (usando los 4 acentos del logo).
- Tarjetas con `border-2` de color por categoría (cada categoría tiene su color dominante).
- Hero con blobs/formas orgánicas de colores como el material de Instagram.
- Motion: fade-in por sección, hover-lift en tarjetas.

## Cambios técnicos

- Migrar `Configurator.tsx` actual → generalizarlo como componente `<ProductConfigurator product={...} />` reutilizable por producto.
- Crear `src/data/catalog.ts` — array tipado con TODOS los productos, sus categorías, opciones configurables, precio base o "Cotizar", e imagen.
- Reutilizar assets ya subidos (cartera venado, tabla salmo, llaveros, vaso aves, etc.) + generar imágenes placeholder para el resto de categorías con `imagegen`.
- Navbar actualizado con links a las nuevas rutas + botón WhatsApp fijo.
- Activar Lovable Cloud, crear bucket `client-artwork` (privado) y tabla `quote_requests` con RLS `TO anon INSERT WITH CHECK (true)`.
- Server function `submitQuote` que guarda en DB y devuelve el link WhatsApp pre-armado.

## Entregable de esta primera iteración

Como el alcance es grande, propongo hacerlo en 2 pasos:

**Paso 1 (este turno):**
- Nueva paleta + tipografía en `src/styles.css` y `__root.tsx`.
- Data del catálogo completo en `src/data/catalog.ts`.
- Rutas `/`, `/servicios`, `/servicios/$categoria`, `/contacto` con el nuevo diseño colorido.
- Landing rediseñada con hero nuevo + grid de categorías + eventos destacados + CTA WhatsApp.
- Navbar y Footer actualizados.

**Paso 2 (siguiente turno, tras confirmar el look):**
- Ruta `/personalizar/$producto` con configurador visual, upload de arte y integración WhatsApp.
- Activar Lovable Cloud, bucket + tabla + server function.
- Generar imágenes que falten para categorías sin foto.

¿Procedo con el Paso 1?
