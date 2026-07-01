import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Menu, X, CalendarCheck } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export default function Navbar({ onOpenConsultation }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = ['home', 'servicos', 'portfolio', 'metodo', 'contato'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', target: 'home' },
    { label: 'Serviços', target: 'servicos' },
    { label: 'Portfólio', target: 'portfolio' },
    { label: 'Nosso Método', target: 'metodo' },
    { label: 'Contato', target: 'contato' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-brand-black/70 backdrop-blur-md border-b border-white/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-brand-support/20 border border-brand-action/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
              <Zap className="w-5 h-5 text-brand-action animate-pulse" />
              <div className="absolute inset-0 rounded-xl bg-brand-action/5 blur-sm"></div>
            </div>
            <span className="font-sans font-bold text-xl tracking-wider text-brand-text flex items-center">
              E2<span className="text-brand-action neon-text-glow">Boost</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`font-sans text-sm font-medium transition-colors hover:text-brand-action relative py-1 px-2 cursor-pointer ${
                    activeSection === item.target ? 'text-brand-action' : 'text-brand-text/80'
                  }`}
                >
                  {item.label}
                  {activeSection === item.target && (
                    <motion.div
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-action shadow-[0_0_8px_rgba(0,229,255,0.8)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={onOpenConsultation}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-sm tracking-wide flex items-center gap-2 transition-all duration-300 neon-glow hover:scale-105 active:scale-95 cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Agendar Consultoria</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onOpenConsultation}
              className="relative p-2 rounded-xl bg-brand-action/10 border border-brand-action/30 text-brand-action hover:bg-brand-action hover:text-brand-black transition-colors"
              aria-label="Agendar Consultoria"
            >
              <CalendarCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-brand-text/80 hover:text-brand-text hover:bg-white/5 border border-transparent hover:border-white/10 transition-all focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden glass-panel border-t border-white/5 bg-brand-black/95 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-sans text-base font-semibold transition-colors ${
                    activeSection === item.target
                      ? 'text-brand-action bg-brand-support/20 border-l-4 border-brand-action'
                      : 'text-brand-text/80 hover:text-brand-text hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenConsultation();
                  }}
                  className="w-full relative px-5 py-3.5 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                >
                  <CalendarCheck className="w-5 h-5" />
                  <span>Agendar Consultoria</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
