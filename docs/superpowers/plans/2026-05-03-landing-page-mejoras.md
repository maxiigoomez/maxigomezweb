# Landing Page Mejoras — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Limpiar la landing page eliminando precios y foto placeholder, agregar sección de contacto con formulario, cablear todos los botones y mejorar la navegación mobile.

**Architecture:** Todo el trabajo está en `src/App.jsx`. Se agregan un helper `scrollTo`, un componente `ContactSection`, un componente `MobileMenu`, y un ícono `IconX`. Se actualiza la lista de imports de framer-motion para incluir `AnimatePresence`.

**Tech Stack:** React 18, Vite, Tailwind CSS, Framer Motion

---

## File Map

| Archivo | Acción | Qué cambia |
|---|---|---|
| `src/App.jsx` | Modify | Todo: imports, iconos, componentes, secciones, botones |

---

### Task 1: Actualizar imports y agregar utilitarios

**Files:**
- Modify: `src/App.jsx` (líneas 1-2 y primeras líneas del componente App)

- [ ] **Step 1: Agregar `AnimatePresence` al import de framer-motion**

Reemplazar la línea 2 de `src/App.jsx`:

```jsx
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
```

- [ ] **Step 2: Agregar ícono `IconX` después de `IconMenu`**

Después de la definición de `IconMenu` (línea ~20), agregar:

```jsx
const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
```

- [ ] **Step 3: Agregar helper `scrollTo` antes del componente `EditorialSection`**

```jsx
const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};
```

- [ ] **Step 4: Verificar en browser que la app sigue funcionando sin errores**

Correr `npm run dev` y abrir `http://localhost:5173`. No deben aparecer errores en consola.

---

### Task 2: Eliminar el bloque foto placeholder "MG" de la sección Concepto

**Files:**
- Modify: `src/App.jsx` (dentro de `EditorialSection id="metodo"`)

- [ ] **Step 1: Eliminar el bloque de la foto**

Dentro de `EditorialSection id="metodo"`, eliminar completamente este bloque (aprox. línea 160):

```jsx
<div className="w-full max-w-md aspect-[4/5] bg-zinc-900 rounded-sm overflow-hidden border border-zinc-800 shadow-2xl relative group mx-auto text-zinc-800 flex items-center justify-center text-7xl md:text-9xl font-black italic">
  MG
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
</div>
```

- [ ] **Step 2: Verificar en browser que la sección Concepto se ve correcta**

La sección debe mostrar: etiqueta "01 / Concepto", título "EL ATLETA HÍBRIDO", la cita en itálica, y el grid de dos pilares. Sin caja oscura entre la cita y el grid.

---

### Task 3: Eliminar precios de `ProgramCard` y cablear "Ver detalles"

**Files:**
- Modify: `src/App.jsx` (componente `ProgramCard`)

- [ ] **Step 1: Actualizar la firma del componente para recibir `onContact`**

Reemplazar la definición de `ProgramCard`:

```jsx
const ProgramCard = ({ title, desc, delay, onContact }) => (
```

- [ ] **Step 2: Eliminar el bloque de precio y actualizar el botón**

Reemplazar el bloque `<div className="flex flex-col items-center gap-4">` dentro de `ProgramCard`:

```jsx
<div className="flex flex-col items-center gap-4">
  <button
    onClick={onContact}
    className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all"
  >
    Ver detalles <IconArrowRight />
  </button>
</div>
```

- [ ] **Step 3: Actualizar las tres instancias de `ProgramCard` en la sección SISTEMAS**

Reemplazar los tres `ProgramCard` en la sección `id="programas"`:

```jsx
<ProgramCard
  title="Mentoria VIP"
  desc="Acompañamiento personal de alta frecuencia. Programación, nutrición y mindset sin fisuras."
  delay={0.1}
  onContact={() => scrollTo('contacto')}
/>
<ProgramCard
  title="Protocolo Alpha"
  desc="El núcleo de mi metodología híbrida. 12 semanas para redefinir tus límites físicos."
  delay={0.2}
  onContact={() => scrollTo('contacto')}
/>
<ProgramCard
  title="Legacy Plan"
  desc="Enfoque 100% estético. Esculpiendo la versión más imponente de tu historia."
  delay={0.3}
  onContact={() => scrollTo('contacto')}
/>
```

- [ ] **Step 4: Verificar en browser que las cards no muestran precios y el botón "Ver detalles" existe**

---

### Task 4: Cablear botones de Hero y Floating CTA

**Files:**
- Modify: `src/App.jsx` (sección Hero y Floating CTA)

- [ ] **Step 1: Agregar `onClick` al botón "Comencemos Juntos" en el Hero**

Reemplazar el `motion.button` del hero:

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  onClick={() => scrollTo('contacto')}
  className="px-10 md:px-12 py-4 md:py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700"
>
  Comencemos Juntos
</motion.button>
```

- [ ] **Step 2: Agregar `onClick` al botón "Plazas Abiertas" (Floating CTA)**

Reemplazar el `button` del Floating CTA:

```jsx
<button
  onClick={() => scrollTo('contacto')}
  className="flex items-center gap-4 bg-zinc-100 text-black px-6 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-colors shadow-2xl"
>
  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
  Plazas Abiertas
</button>
```

- [ ] **Step 3: Verificar en browser que ambos botones scrollean a la sección #contacto**

(La sección aún no existe — verificar que el click no genera errores en consola, solo no hace nada todavía.)

---

### Task 5: Actualizar sección FINAL y footer con links reales

**Files:**
- Modify: `src/App.jsx` (EditorialSection final y footer)

- [ ] **Step 1: Actualizar los tres elementos de la sección FINAL**

Reemplazar el bloque `<div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">` dentro de la `EditorialSection` con `className` que incluye `bg-white`:

```jsx
<div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
  <a
    href="https://instagram.com/maxiigoomezok"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-4"
  >
    <div className="w-10 h-10 group-hover:scale-110 transition-transform">
      <IconInstagram />
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.4em]">@maxiigoomezok</span>
  </a>
  <motion.button
    whileHover={{ scale: 1.05 }}
    onClick={() => scrollTo('contacto')}
    className="px-12 md:px-16 py-6 md:py-7 bg-black text-white text-[12px] font-black uppercase tracking-[0.5em] rounded-full shadow-2xl"
  >
    INICIAR AHORA
  </motion.button>
  <a
    href="https://wa.me/59898403819"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex flex-col items-center gap-4"
  >
    <div className="w-10 h-10 group-hover:scale-110 transition-transform">
      <IconMessage />
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Contacto VIP</span>
  </a>
</div>
```

- [ ] **Step 2: Actualizar los links del footer**

Reemplazar el bloque de links del footer:

```jsx
<div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-600">
  <a href="https://instagram.com/maxiigoomezok" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
  <a href="https://tiktok.com/@maxiigoomezfit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
</div>
```

- [ ] **Step 3: Verificar en browser que Instagram abre en nueva pestaña y WhatsApp también**

---

### Task 6: Agregar menú mobile con overlay

**Files:**
- Modify: `src/App.jsx` (componente `App`, nav)

- [ ] **Step 1: Agregar estado `menuOpen` al inicio del componente `App`**

Dentro de `export default function App()`, justo después de las líneas de `useScroll` y `useSpring`, agregar:

```jsx
const [menuOpen, setMenuOpen] = React.useState(false);
```

- [ ] **Step 2: Actualizar el botón hamburguesa en la nav**

Reemplazar el `button` con `<IconMenu />` en la nav:

```jsx
<button
  onClick={() => setMenuOpen(true)}
  className="text-zinc-400 hover:text-white transition-colors p-2"
>
  <IconMenu />
</button>
```

- [ ] **Step 3: Agregar el overlay mobile justo después del `motion.div` del scroll indicator**

Después de `<motion.div className="fixed top-0 left-0 right-0 h-[1px]..."` y antes de `<nav`, agregar:

```jsx
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center gap-12"
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-8 right-6 md:right-10 text-zinc-400 hover:text-white transition-colors p-2"
      >
        <IconX />
      </button>
      {[
        { label: 'Concepto', id: 'metodo' },
        { label: 'Programas', id: 'programas' },
        { label: 'Contacto', id: 'contacto' },
      ].map(({ label, id }) => (
        <button
          key={id}
          onClick={() => { setMenuOpen(false); scrollTo(id); }}
          className="text-4xl md:text-5xl font-light italic uppercase tracking-tighter text-zinc-400 hover:text-white transition-colors"
        >
          {label}
        </button>
      ))}
    </motion.div>
  )}
</AnimatePresence>
```

- [ ] **Step 4: Verificar en browser (mobile 375px) que el menú abre y cierra correctamente y los links funcionan**

En DevTools → toggle device toolbar → iPhone SE. Hacer click en hamburguesa, verificar overlay fullscreen, hacer click en "Contacto" y verificar scroll (aún no hay sección, OK por ahora), hacer click en X y verificar que cierra.

---

### Task 7: Agregar sección de contacto con formulario

**Files:**
- Modify: `src/App.jsx` (nuevo componente `ContactSection` + inserción en el JSX)

- [ ] **Step 1: Agregar el componente `ContactSection` antes del componente `App`**

Agregar después del componente `ProgramCard`:

```jsx
const ContactSection = () => {
  const [form, setForm] = React.useState({ nombre: '', telefono: '', email: '', comentario: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\n\nComentario:\n${form.comentario}`
    );
    window.location.href = `mailto:maxiigoomez1995@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <EditorialSection id="contacto">
      <div className="container mx-auto px-4 max-w-lg w-full">
        <div className="text-center mb-16">
          <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-8 block">03 / Contacto</span>
          <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-none italic uppercase">
            HABLEMOS.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {[
            { label: 'Nombre', name: 'nombre', type: 'text' },
            { label: 'Teléfono', name: 'telefono', type: 'tel' },
            { label: 'Email', name: 'email', type: 'email' },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col gap-2 border-b border-zinc-800 pb-4">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                className="bg-transparent text-zinc-200 text-sm outline-none placeholder-zinc-700 py-1"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2 border-b border-zinc-800 pb-4">
            <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Comentario</label>
            <textarea
              name="comentario"
              value={form.comentario}
              onChange={handleChange}
              rows={4}
              required
              className="bg-transparent text-zinc-200 text-sm outline-none placeholder-zinc-700 py-1 resize-none"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            className="mt-4 px-12 py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700 w-full"
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </div>
    </EditorialSection>
  );
};
```

- [ ] **Step 2: Insertar `<ContactSection />` entre la sección SISTEMAS y la sección FINAL**

En el JSX del componente `App`, después del `</section>` que cierra la sección `id="programas"` y antes del `<EditorialSection className="bg-white...">`, agregar:

```jsx
<ContactSection />
```

- [ ] **Step 3: Verificar la sección de contacto en browser desktop y mobile**

Verificar:
- El formulario se muestra correctamente
- Los campos tienen el estilo boutique (bordes inferiores, fondo transparente)
- En mobile (375px) los campos ocupan todo el ancho
- Al hacer submit con datos, se abre el cliente de email con asunto y cuerpo pre-llenados

- [ ] **Step 4: Verificar el flujo completo de scroll**

Hacer click en "Comencemos Juntos" desde el hero y verificar que scrollea a la sección HABLEMOS. Hacer click en "Ver detalles" de una card y verificar lo mismo. Probar desde el menú mobile.

---

## Self-Review contra el Spec

| Requisito del spec | Task que lo cubre |
|---|---|
| Eliminar foto placeholder MG | Task 2 |
| Eliminar precios de ProgramCard | Task 3 |
| "Ver detalles" → scroll #contacto | Task 3 |
| "Comencemos Juntos" → scroll #contacto | Task 4 |
| "Plazas Abiertas" → scroll #contacto | Task 4 |
| "INICIAR AHORA" → scroll #contacto | Task 5 |
| Instagram icono → instagram.com/maxiigoomezok | Task 5 |
| Contacto VIP → wa.me/59898403819 | Task 5 |
| Footer Instagram → instagram.com/maxiigoomezok | Task 5 |
| Footer TikTok → tiktok.com/@maxiigoomezfit | Task 5 |
| Menú hamburguesa mobile | Task 6 |
| Sección Contacto con formulario | Task 7 |
| AnimatePresence import | Task 1 |
| IconX para cerrar menú | Task 1 |
| scrollTo helper | Task 1 |
