# Landing Page Mejoras — Design Spec
**Fecha:** 2026-05-03  
**Proyecto:** MaxiGomezWeb  
**Stack:** Vite + React + Tailwind CSS + Framer Motion

---

## Objetivo

Limpiar la landing page de Maxi Gómez eliminando elementos incompletos (precios, foto placeholder), agregar un formulario de contacto funcional, cablear todos los botones, y asegurar que la página sea mobile-responsive manteniendo el diseño estético boutique actual.

---

## Estructura de Página (orden final)

1. **Hero** — sin cambios visuales
2. **El Atleta Híbrido** — se elimina el bloque placeholder "MG"
3. **Sistemas de Transformación** — se eliminan los precios de las cards
4. **Contacto** *(nueva sección)* — formulario con nombre, teléfono, email, comentario
5. **Redefine Yourself** — sin cambios
6. **Footer** — links sociales actualizados

---

## Cambios por Sección

### Hero
- Botón "Comencemos Juntos" → scroll a `#contacto`
- Sin cambios visuales

### El Atleta Híbrido (Concepto)
- **Eliminar** el `div` con `bg-zinc-900 / w-full max-w-md aspect-[4/5]` (bloque "MG")
- El texto introductorio y el grid de dos pilares (Arquitectura Corporal / Motor de Élite) se mantienen

### Sistemas de Transformación (Programas)
- **Eliminar** del componente `ProgramCard` el bloque de precio: `span` con valor USD y la etiqueta "USD"
- El botón "Ver detalles" pasa a hacer scroll a `#contacto`
- El resto de la card (título, descripción, botón) se mantiene

### Sección Contacto (nueva)
- Componente: `EditorialSection id="contacto"` para heredar efecto editorial
- Label de sección: `03 / Contacto`
- Título: `HABLEMOS.` estilo tipográfico coherente con el resto
- Campos del formulario:
  - Nombre (text input)
  - Teléfono (tel input)
  - Email (email input)
  - Comentario (textarea, ~4 filas)
- Botón submit: abre `mailto:maxiigoomez1995@gmail.com` con subject y body pre-llenados desde los campos del formulario
- Estética: fondo `#050505`, bordes `border-zinc-800`, sin border-radius, labels en `text-[10px] uppercase tracking-widest text-zinc-500`, inputs con `bg-transparent text-zinc-200`
- Animación: `motion.div` con `initial={{ opacity: 0, y: 30 }}` y `whileInView` consistente con el resto

### Redefine Yourself (FINAL)
- Botón "INICIAR AHORA" → scroll a `#contacto`
- Instagram icono → `https://instagram.com/maxiigoomezok`
- Contacto VIP (icono mensaje) → `https://wa.me/59898403819`
- Sin cambios visuales

### Footer
- Instagram → `https://instagram.com/maxiigoomezok`
- TikTok → `https://tiktok.com/@maxiigoomezfit`

### Floating CTA ("Plazas Abiertas")
- Scroll a `#contacto`

---

## Navegación Mobile (Hamburguesa)

### Estado
- `useState(false)` para `menuOpen` en el componente `App`

### Overlay
- Fullscreen `fixed inset-0 z-[200] bg-[#050505]` con `AnimatePresence` + `motion.div`
- Links de navegación centrados verticalmente: Concepto → `#metodo`, Programas → `#programas`, Contacto → `#contacto`
- Tipografía consistente: `text-4xl font-light italic uppercase tracking-tighter`
- Botón X arriba a la derecha para cerrar
- Al hacer click en un link: cerrar menú + scroll al anchor con `scrollIntoView({ behavior: 'smooth' })`

### Botón hamburguesa
- Visible en todos los tamaños (ya existe en la nav)
- Al hacer click, abre el overlay

---

## Mobile Responsiveness

La página ya usa Tailwind con clases responsivas. Ajustes adicionales:
- El overlay de menú mobile cubre correctamente toda la pantalla
- El formulario de contacto usa `w-full max-w-lg mx-auto` para centrarse en mobile
- Los inputs ocupan `w-full` en mobile
- El floating CTA (`Plazas Abiertas`) permanece `hidden lg:block` para no saturar mobile

---

## Datos de Contacto

| Canal | Valor |
|---|---|
| Email | maxiigoomez1995@gmail.com |
| WhatsApp | +598 98 403 819 → `wa.me/59898403819` |
| Instagram | @maxiigoomezok → `instagram.com/maxiigoomezok` |
| TikTok | @maxiigoomezfit → `tiktok.com/@maxiigoomezfit` |

---

## Mapa de Botones

| Botón | Acción |
|---|---|
| Comencemos Juntos (hero) | Scroll a `#contacto` |
| Ver detalles (cards) | Scroll a `#contacto` |
| INICIAR AHORA (final) | Scroll a `#contacto` |
| Plazas Abiertas (floating) | Scroll a `#contacto` |
| Instagram icono (final) | `https://instagram.com/maxiigoomezok` |
| Contacto VIP / mensaje (final) | `https://wa.me/59898403819` |
| Instagram (footer) | `https://instagram.com/maxiigoomezok` |
| TikTok (footer) | `https://tiktok.com/@maxiigoomezfit` |
| Menú hamburguesa | Abre overlay mobile |
| Submit formulario | `mailto:` con datos del form |

---

## Fuera de Alcance

- Backend / base de datos para el formulario
- Animaciones nuevas más allá de las existentes
- Cambios tipográficos o de paleta de colores
- Sección de precios (se elimina, no se reemplaza)
