import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Zap, 
  Calendar, 
  X, 
  Check, 
  Loader2, 
  Globe, 
  TrendingUp, 
  Bot,
  ChevronRight
} from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Solutions from './components/Solutions';
import Portfolio from './components/Portfolio';
import Method from './components/Method';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppIcon from './components/WhatsAppIcon';
import { submitLead } from './lib/leads';

export default function App() {
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalSubmitError, setModalSubmitError] = useState('');
  const [forceFocusContact, setForceFocusContact] = useState(0);
  const [modalCompany, setModalCompany] = useState('');

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  // Modal form states
  const [modalData, setModalData] = useState({
    name: '',
    whatsapp: '',
    selectedService: 'sites',
    experience: 'iniciante'
  });

  const [modalErrors, setModalErrors] = useState({
    name: '',
    whatsapp: ''
  });

  const handleOpenConsultation = () => {
    setModalStep(1);
    setModalSuccess(false);
    setModalSubmitError('');
    setIsModalOpen(true);
  };

  const handleHeroCta = () => {
    setForceFocusContact(prev => prev + 1);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // validation
    let valid = true;
    const errs = { name: '', whatsapp: '' };
    if (!modalData.name.trim()) {
      errs.name = 'Por favor, informe seu nome.';
      valid = false;
    }
    const numbersOnly = modalData.whatsapp.replace(/\D/g, '');
    if (numbersOnly.length < 10) {
      errs.whatsapp = 'Insira um WhatsApp com DDD válido.';
      valid = false;
    }
    
    setModalErrors(errs);
    if (!valid) return;

    setModalLoading(true);
    setModalSubmitError('');

    try {
      const challenge = `Consultoria agendada para: [${modalData.selectedService.toUpperCase()}] com perfil [${modalData.experience.toUpperCase()}]`;
      await submitLead({
        name: modalData.name,
        whatsapp: modalData.whatsapp,
        challenge,
        source: 'modal-consultoria',
        company: modalCompany,
      });

      setModalSuccess(true);
      setModalStep(2);
      setModalCompany('');
    } catch (error) {
      setModalSubmitError(error instanceof Error ? error.message : 'Nao foi possivel agendar sua consultoria.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (modalSuccess) {
      setModalData({
        name: '',
        whatsapp: '',
        selectedService: 'sites',
        experience: 'iniciante'
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-base text-brand-text font-sans antialiased overflow-x-hidden selection:bg-brand-action selection:text-brand-black">
      <motion.div
        className="fixed left-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-brand-action via-white to-brand-support shadow-[0_0_18px_rgba(0,229,255,0.75)]"
        style={{ scaleX: smoothScrollProgress }}
      />
      
      {/* Navigation Header */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Modules */}
      <Hero onCtaClick={handleHeroCta} />
      
      <Solutions />

      <Portfolio />
      <Method />
      
      <ContactForm forceFocusFormTrigger={forceFocusContact} />
      
      <Footer />

      {/* Floating Interactive WhatsApp Quick Connect Action */}
      <motion.a
        href="https://api.whatsapp.com/send?phone=556296471441&text=Ol%C3%A1%21%20Gostaria%20de%20conversar%20sobre%20as%20solu%C3%A7%C3%B5es%20da%20E2Boost."
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="whatsapp-float fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-action text-brand-black flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-shadow duration-300 transform hover:scale-110 active:scale-95"
        title="WhatsApp Direct Connection"
        aria-label="Conversar com a E2Boost pelo WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-brand-support border-2 border-brand-action"></span>
      </motion.a>

      {/* Premium Glassmorphic Consultation Booking Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Modal Backdrop Blur */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="consultation-title"
              aria-label="Agendamento de consultoria E2Boost"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="depth-card relative w-full max-w-lg glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-[0_20px_50px_rgba(0,229,255,0.15)] overflow-hidden"
            >
              {/* Neon border glow bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-action via-brand-support to-brand-action"></div>
              
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                aria-label="Fechar agendamento"
                className="absolute top-4 right-4 p-1 rounded-lg text-brand-text/50 hover:text-brand-text hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Step 1: Scheduling Form */}
              {modalStep === 1 ? (
                <form onSubmit={handleModalSubmit} className="space-y-5">
                  <input
                    type="text"
                    name="company"
                    value={modalCompany}
                    onChange={(e) => setModalCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="text-center space-y-1">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-support/20 border border-brand-action/30 mb-2">
                      <Calendar className="w-6 h-6 text-brand-action" />
                    </div>
                    <h3 id="consultation-title" className="font-sans font-extrabold text-2xl text-brand-text tracking-tight">
                      Agendar Consultoria
                    </h3>
                    <p className="text-brand-text/60 text-xs sm:text-sm max-w-xs mx-auto">
                      Agende um bate-papo de 15 minutos com nossos assessores de crescimento.
                    </p>
                  </div>

                  <div className="space-y-4 pt-2">
                    
                    {/* Name input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-text/70">
                        Seu Nome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={modalData.name}
                        onChange={(e) => setModalData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Carlos Costa"
                        className={`w-full px-4 py-2.5 rounded-xl bg-brand-black/40 border text-brand-text text-sm focus:outline-none focus:ring-2 ${
                          modalErrors.name ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-brand-action/20 focus:border-brand-action'
                        }`}
                        disabled={modalLoading}
                      />
                      {modalErrors.name && (
                        <p className="text-[10px] font-mono text-red-400">{modalErrors.name}</p>
                      )}
                    </div>

                    {/* WhatsApp input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-text/70">
                        Seu WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        autoComplete="tel"
                        inputMode="tel"
                        value={modalData.whatsapp}
                        onChange={(e) => setModalData(prev => ({ ...prev, whatsapp: e.target.value }))}
                        placeholder="Ex: (62) 99999-8888"
                        className={`w-full px-4 py-2.5 rounded-xl bg-brand-black/40 border text-brand-text text-sm focus:outline-none focus:ring-2 ${
                          modalErrors.whatsapp ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-brand-action/20 focus:border-brand-action'
                        }`}
                        disabled={modalLoading}
                      />
                      {modalErrors.whatsapp && (
                        <p className="text-[10px] font-mono text-red-400">{modalErrors.whatsapp}</p>
                      )}
                    </div>

                    {/* Services selection radios */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-text/70">
                        Qual solução você mais busca hoje?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'sites', label: 'Criação Site', icon: Globe },
                          { value: 'trafego', label: 'Tráfego Ads', icon: TrendingUp },
                          { value: 'bot-ia', label: 'Bot de IA', icon: Bot }
                        ].map((serv) => {
                          const isSelected = modalData.selectedService === serv.value;
                          return (
                            <button
                              key={serv.value}
                              type="button"
                              onClick={() => setModalData(prev => ({ ...prev, selectedService: serv.value }))}
                              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-support/20 border-brand-action text-brand-action'
                                  : 'bg-brand-black/30 border-white/5 text-brand-text/60 hover:bg-white/5 hover:text-brand-text'
                              }`}
                            >
                              <serv.icon className="w-4 h-4" />
                              <span className="text-[10px] font-sans font-bold leading-none">{serv.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Experience level custom radio */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-brand-text/70">
                        Estágio do seu negócio
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {[
                          { value: 'iniciante', label: 'Começando agora' },
                          { value: 'faturando', label: 'Já faturo e quero escalar' }
                        ].map((exp) => {
                          const isSelected = modalData.experience === exp.value;
                          return (
                            <button
                              key={exp.value}
                              type="button"
                              onClick={() => setModalData(prev => ({ ...prev, experience: exp.value }))}
                              className={`p-2.5 rounded-xl border font-sans text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-brand-support/20 border-brand-action text-brand-action font-semibold'
                                  : 'bg-brand-black/30 border-white/5 text-brand-text/60 hover:bg-white/5 hover:text-brand-text'
                              }`}
                            >
                              {exp.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                  {/* Schedule submit CTA */}
                  <div className="pt-4">
                    {modalSubmitError && (
                      <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-mono text-red-300">
                        {modalSubmitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={modalLoading}
                      className="w-full py-3 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 neon-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      {modalLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>REGISTRANDO HORÁRIO...</span>
                        </>
                      ) : (
                        <>
                          <span>AGENDAR DIAGNÓSTICO</span>
                          <ChevronRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                // Modal Step 2: Booking Success state
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-5"
                >
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-full bg-brand-action/20 border border-brand-action flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                      <Check className="w-7 h-7 text-brand-action animate-bounce" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-sans font-extrabold text-xl text-brand-text">
                      Consultoria Pré-Agendada!
                    </h4>
                    <p className="text-brand-text/70 text-xs sm:text-sm max-w-xs mx-auto">
                      Seu diagnóstico de crescimento foi encaminhado para a equipe da <strong>E2Boost</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-black/50 border border-white/5 text-left text-[11px] font-mono text-brand-text/80 space-y-1">
                    <div className="text-brand-action text-center font-bold tracking-widest text-[9px] uppercase border-b border-white/5 pb-1 mb-2">
                      Ficha do Agendamento
                    </div>
                    <div>• <strong>Status:</strong> Confirmado (Aguardando Retorno)</div>
                    <div>• <strong>Solução Alvo:</strong> {modalData.selectedService === 'sites' ? 'Arquitetura de Sites' : modalData.selectedService === 'trafego' ? 'Tráfego Pago Ads' : 'Bot de IA para WhatsApp'}</div>
                    <div>• <strong>Assessoria:</strong> Cortesia de Integração (Sem Custo)</div>
                  </div>

                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={handleCloseModal}
                      className="px-6 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-brand-text font-sans font-bold text-xs tracking-wider transition-all cursor-pointer"
                    >
                      CONCLUIR SETUP
                    </button>
                  </div>
                </motion.div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
