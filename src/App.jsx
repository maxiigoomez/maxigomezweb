import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';

// --- Iconos SVG Integrados (Aesthetic & Minimalistas) ---

const IconInstagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const IconArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);

const IconMessage = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

const IconMenu = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
);

const IconX = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);

// --- Helper de Scroll Suave ---

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

// --- Componente de Sección con Zoom Editorial ---

const EditorialSection = ({ children, className = "", id = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"]);

  return (
    <motion.section
      id={id}
      ref={ref}
      style={{ scale, opacity, filter: blur }}
      className={`min-h-screen flex flex-col items-center justify-center py-24 px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
};

// --- Tarjetas de Programa Totalmente Centradas ---

const ProgramCard = ({ title, desc, delay, onContact }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className="group relative border-t border-zinc-800 pt-10 pb-4 flex flex-col items-center text-center hover:border-zinc-100 transition-colors duration-500 max-w-sm mx-auto w-full"
  >
    <span className="text-[10px] font-medium text-zinc-500 tracking-[0.4em] uppercase mb-4 block">SISTEMA ELECTO</span>
    <h3 className="text-2xl md:text-3xl font-light mb-4 tracking-tighter text-zinc-200 group-hover:text-white transition-colors uppercase italic">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed mb-8 px-4">{desc}</p>
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={onContact}
        className="text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 hover:gap-4 transition-all"
      >
        Ver detalles <IconArrowRight />
      </button>
    </div>
  </motion.div>
);

// --- Sección de Contacto con Formulario ---

const ContactSection = () => {
  const [form, setForm] = useState({ nombre: '', telefono: '', email: '', comentario: '' });

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Consulta de ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nTeléfono: ${form.telefono}\nEmail: ${form.email}\n\nComentario:\n${form.comentario}`
    );
    const link = document.createElement('a');
    link.href = `mailto:maxiigoomez1995@gmail.com?subject=${subject}&body=${body}`;
    link.click();
    setForm({ nombre: '', telefono: '', email: '', comentario: '' });
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
            { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Tu nombre completo' },
            { label: 'Teléfono', name: 'telefono', type: 'tel', placeholder: '+598 99 000 000' },
            { label: 'Email', name: 'email', type: 'email', placeholder: 'tu@email.com' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="flex flex-col gap-2 border-b border-zinc-800 pb-4">
              <label htmlFor={name} className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{label}</label>
              <input
                id={name}
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                required
                placeholder={placeholder}
                className="bg-transparent text-zinc-200 text-sm outline-none placeholder-zinc-700 py-1"
              />
            </div>
          ))}
          <div className="flex flex-col gap-2 border-b border-zinc-800 pb-4">
            <label htmlFor="comentario" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              value={form.comentario}
              onChange={handleChange}
              rows={4}
              required
              placeholder="¿En qué puedo ayudarte?"
              className="bg-transparent text-zinc-200 text-sm outline-none placeholder-zinc-700 py-1 resize-none"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            className="mt-4 px-12 py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black w-full"
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </div>
    </EditorialSection>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', handler);
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="bg-[#050505] text-[#e5e5e5] selection:bg-zinc-100 selection:text-black font-sans antialiased overflow-x-hidden">
      
      {/* Indicador de Scroll Minimalista */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-zinc-600 origin-left z-[100]"
        style={{ scaleX: smoothProgress }}
      />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-[#050505] flex flex-col items-center justify-center gap-12"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <button
              onClick={() => setMenuOpen(false)}
              aria-label="Cerrar menú"
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

      {/* Navegación Estilo Boutique Centrada */}
      <nav className="fixed top-0 w-full z-50 px-6 md:px-10 py-8 flex justify-center items-center mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base md:text-lg font-light tracking-[0.6em] md:tracking-[0.8em] uppercase italic relative"
        >
          M.GÓMEZ<span className="text-zinc-500">_</span>
        </motion.div>
        
        <div className="absolute right-6 md:right-10">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menú"
            className="text-zinc-400 hover:text-white transition-colors p-2"
          >
            <IconMenu />
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#0a0a0a_0%,_#050505_100%)]" />
          <motion.div 
            style={{ y: useTransform(scrollYProgress, [0, 0.5], [0, 100]) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-white/[0.02] leading-none select-none tracking-tighter italic whitespace-nowrap"
          >
            AESTHETIC
          </motion.div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9vw] font-light tracking-tight leading-[0.9] mb-12 italic uppercase">
              AESTHETIC <br />
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-600 block mt-2">PERFORMANCE</span>
            </h1>
            <div className="flex flex-col items-center gap-8">
              <p className="max-w-2xl mx-auto text-zinc-500 text-[10px] md:text-xs font-light uppercase tracking-[0.3em] md:tracking-[0.4em] leading-loose">
                Paysandú, Uruguay • Mentoría de Élite • Monitor en Musculación • +10 Años de Disciplina
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => scrollTo('contacto')}
                className="px-10 md:px-12 py-4 md:py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-700"
              >
                Comencemos Juntos
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 4 }}
          className="absolute bottom-8 flex flex-col items-center gap-4 text-zinc-700"
        >
          <div className="w-[1px] h-10 bg-zinc-800" />
          <span className="text-[8px] font-bold uppercase tracking-[0.8em]">Scroll</span>
        </motion.div>
      </section>

      {/* CONCEPTO */}
      <EditorialSection id="metodo">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="space-y-16 md:space-y-24 flex flex-col items-center">
            <div className="space-y-6">
              <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em]">01 / Concepto</span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-none italic uppercase">
                EL ATLETA <br /> <span className="font-black">HÍBRIDO</span>
              </h2>
            </div>
            
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed italic max-w-2xl px-4">
              "No entrenamos para encajar. Entrenamos para destacar. Fusionamos la utilidad del movimiento con la perfección de la forma."
            </p>

            <div className="grid sm:grid-cols-2 gap-12 md:gap-16 pt-16 border-t border-zinc-900 w-full">
              <div className="flex flex-col items-center px-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-4 italic">Arquitectura Corporal</h4>
                <p className="text-zinc-500 text-xs leading-loose">Diseño de proporciones basadas en simetría clásica y desarrollo muscular denso.</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-white mb-4 italic">Motor de Élite</h4>
                <p className="text-zinc-500 text-xs leading-loose">Capacidad funcional real heredada del CrossFit competitivo y periodización híbrida.</p>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* SISTEMAS */}
      <section id="programas" className="py-32 md:py-40 border-t border-zinc-900 flex flex-col items-center">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-24 md:mb-32">
            <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-8 block">02 / Selección</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase italic leading-none mb-8">
              SISTEMAS DE <br /> <span className="font-black text-zinc-200">TRANSFORMACIÓN</span>
            </h2>
            <p className="text-zinc-500 text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] max-w-xs mx-auto text-center leading-loose">
              Cada programa es una invitación a unirse a una comunidad de atletas que no aceptan la mediocridad.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-12 w-full max-w-6xl">
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
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <ContactSection />

      {/* FINAL */}
      <EditorialSection className="bg-white text-black overflow-hidden py-32 md:py-48">
        <div className="container mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black tracking-tighter leading-none italic uppercase mb-16">
              REDEFINE <br /> YOURSELF.
            </h2>
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
          </motion.div>
        </div>
      </EditorialSection>

      <footer className="py-12 px-6 flex flex-col justify-center items-center border-t border-zinc-900 gap-8 text-center">
        <div className="text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-600 italic">
          Paysandú, Uruguay • Aesthetic Mentor
        </div>
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">
          MAXI GÓMEZ © 2026 • TODOS LOS DERECHOS RESERVADOS
        </div>
        <div className="flex gap-8 text-[9px] font-bold uppercase tracking-[0.5em] text-zinc-600">
          <a href="https://instagram.com/maxiigoomezok" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          <a href="https://www.tiktok.com/@maxiigoomezfit" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
        </div>
      </footer>

      {/* Floating CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-10 right-10 z-50 hidden lg:block"
      >
        <button
          onClick={() => scrollTo('contacto')}
          className="flex items-center gap-4 bg-zinc-100 text-black px-6 py-4 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-colors shadow-2xl"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          Plazas Abiertas
        </button>
      </motion.div>
    </div>
  );
}