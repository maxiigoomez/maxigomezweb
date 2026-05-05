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

// --- Sección de Contacto por WhatsApp ---

const WA_LINK = "https://wa.me/59898403819?text=Hola%20Maxi%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n%20sobre%20tus%20programas.";

const ContactSection = () => (
  <EditorialSection id="contacto">
    <div className="container mx-auto px-4 max-w-lg w-full text-center flex flex-col items-center gap-16">
      <div>
        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.5em] mb-8 block">03 / Contacto</span>
        <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-none italic uppercase">
          HABLEMOS.
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6 border-t border-zinc-900 pt-16 w-full">
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed italic max-w-sm">
          "Un mensaje es el primer paso. El resto lo construimos juntos."
        </p>
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em]">
          Respondo en menos de 24 hs — Paysandú, Uruguay
        </p>
      </div>

      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-4 px-12 py-5 border border-zinc-800 text-[10px] font-bold uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 w-full justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Escribir por WhatsApp
      </motion.a>
    </div>
  </EditorialSection>
);

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
          
          <div className="flex flex-col items-center gap-20 w-full">
            <div className="w-full max-w-sm mx-auto">
              <ProgramCard
                title="Asesoría Online"
                desc="Programación personalizada enfocada en hipertrofia. Entrenamiento diseñado para tu cuerpo, tu nivel y tus objetivos — con seguimiento continuo y ajustes semanales."
                delay={0.1}
                onContact={() => scrollTo('contacto')}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center gap-4 border-t border-zinc-900 pt-12 max-w-sm w-full mx-auto text-center"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.6em] text-zinc-700">Próximamente</span>
              <p className="text-zinc-600 text-xs uppercase tracking-[0.3em]">
                Nuevos sistemas en desarrollo — se vienen más formas de trabajar juntos.
              </p>
              <div className="flex gap-3 mt-2">
                {[1, 2, 3].map(i => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                ))}
              </div>
            </motion.div>
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