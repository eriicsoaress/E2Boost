import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { LeadSubmission } from '../types';
import { submitLead } from '../lib/leads';
import WhatsAppIcon from './WhatsAppIcon';

interface ContactFormProps {
  forceFocusFormTrigger: number;
}

export default function ContactForm({ forceFocusFormTrigger }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    challenge: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    whatsapp: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submittedLead, setSubmittedLead] = useState<LeadSubmission | null>(null);
  const [company, setCompany] = useState('');

  // Handle auto scroll/focus if triggered by other CTAs
  useEffect(() => {
    if (forceFocusFormTrigger > 0) {
      const el = document.getElementById('contato-form-container');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        // Focus the name input
        const nameInput = document.getElementById('client-name');
        if (nameInput) {
          setTimeout(() => {
            nameInput.focus();
          }, 600);
        }
      }
    }
  }, [forceFocusFormTrigger]);

  // Mask WhatsApp input for elegant Brazilian/general phone layouts
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // keep only numbers
    
    // Brazilian format formatting (99) 99999-9999 or (99) 9999-9999
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 6) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
      } else if (value.length <= 10) {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 6)}-${value.substring(6)}`;
      } else {
        value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}-${value.substring(7, 11)}`;
      }
    }
    
    setFormData(prev => ({ ...prev, whatsapp: value }));
    if (value.length >= 10) {
      setFormErrors(prev => ({ ...prev, whatsapp: '' }));
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: 'name' | 'challenge') => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'name' && value.trim()) {
      setFormErrors(prev => ({ ...prev, name: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = { name: '', whatsapp: '' };

    if (!formData.name.trim()) {
      errors.name = 'Por favor, informe seu nome completo.';
      isValid = false;
    }

    const numericPhone = formData.whatsapp.replace(/\D/g, '');
    if (numericPhone.length < 10) {
      errors.whatsapp = 'Insira um WhatsApp válido com DDD (mínimo 10 dígitos).';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const newLead = await submitLead({
        name: formData.name,
        whatsapp: formData.whatsapp,
        challenge: formData.challenge || 'Nao especificado.',
        source: 'formulario-contato',
        company,
      });

      setSubmittedLead(newLead);
      setSubmitSuccess(true);
      setFormData({ name: '', whatsapp: '', challenge: '' });
      setCompany('');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Nao foi possivel enviar sua solicitacao.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contato" className="py-24 relative bg-brand-black overflow-hidden">
      {/* Decorative Blur Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-support/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand-action/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Title Content */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-action font-mono text-xs font-semibold tracking-widest uppercase"
          >
            FALER COM ASSESSOR
          </motion.div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-text tracking-tight">
            Pronto para dar um Boost no seu negócio?
          </h2>
          <p className="text-brand-text/70 text-base sm:text-lg font-light">
            Deixe toda a complexidade técnica e o setup de tráfego com a gente. Prepare-se para acelerar e vender de verdade.
          </p>
        </div>

        {/* Centralized Glassmorphic Form Card */}
        <div id="contato-form-container" className="relative">
          {/* Neon outer border glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-action/20 to-brand-support/30 rounded-3xl blur opacity-70"></div>
          
          <div className="relative glass-panel p-8 sm:p-10 rounded-3xl border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                // FORM STATE
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <input
                    type="text"
                    name="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div className="border-b border-white/5 pb-4 mb-6">
                    <h3 className="font-sans font-bold text-lg text-brand-text flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-brand-action animate-pulse" />
                      Preencha seus dados para uma análise gratuita
                    </h3>
                    <p className="text-brand-text/50 text-xs mt-1">
                      Nossos especialistas analisarão seu negócio e entrarão em contato via WhatsApp.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="client-name" className="block text-xs font-mono text-brand-text/80 uppercase font-bold tracking-wider">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <input
                        id="client-name"
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => handleTextChange(e, 'name')}
                        placeholder="Ex: João Silva"
                        className={`w-full px-4 py-3.5 rounded-xl bg-brand-black/50 border text-brand-text placeholder-brand-text/30 font-sans focus:outline-none focus:ring-2 transition-all ${
                          formErrors.name 
                            ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-white/10 focus:ring-brand-action/20 focus:border-brand-action'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formErrors.name && (
                      <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.name}</span>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Input */}
                  <div className="space-y-2">
                    <label htmlFor="client-whatsapp" className="block text-xs font-mono text-brand-text/80 uppercase font-bold tracking-wider">
                      WhatsApp com DDD *
                    </label>
                    <div className="relative">
                      <input
                        id="client-whatsapp"
                        type="tel"
                        name="whatsapp"
                        autoComplete="tel"
                        inputMode="tel"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        placeholder="(62) 99999-9999"
                        className={`w-full px-4 py-3.5 rounded-xl bg-brand-black/50 border text-brand-text placeholder-brand-text/30 font-sans focus:outline-none focus:ring-2 transition-all ${
                          formErrors.whatsapp 
                            ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500' 
                            : 'border-white/10 focus:ring-brand-action/20 focus:border-brand-action'
                        }`}
                        disabled={isSubmitting}
                      />
                    </div>
                    {formErrors.whatsapp && (
                      <div className="flex items-center gap-1.5 text-xs text-red-400 font-mono mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.whatsapp}</span>
                      </div>
                    )}
                  </div>

                  {/* Textarea Area */}
                  <div className="space-y-2">
                    <label htmlFor="client-challenge" className="block text-xs font-mono text-brand-text/80 uppercase font-bold tracking-wider">
                      Qual o seu maior desafio de vendas hoje?
                    </label>
                    <textarea
                      id="client-challenge"
                      name="challenge"
                      rows={4}
                      value={formData.challenge}
                      onChange={(e) => handleTextChange(e, 'challenge')}
                      placeholder="Ex: Preciso de uma landing page para capturar leads de vendas ou configurar pixel do Meta e Google Ads..."
                      className="w-full px-4 py-3.5 rounded-xl bg-brand-black/50 border border-white/10 text-brand-text placeholder-brand-text/30 font-sans focus:outline-none focus:ring-2 focus:ring-brand-action/20 focus:border-brand-action transition-all resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    {submitError && (
                      <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-mono text-red-300">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-base tracking-wide flex items-center justify-center gap-2 neon-glow neon-glow-hover hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>CONFIGURANDO SETUP CONEXÃO...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>ENVIAR SOLICITAÇÃO</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                // SUCCESS STATE
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-8 space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-brand-action/20 rounded-full blur-xl animate-pulse"></div>
                      <CheckCircle2 className="w-20 h-20 text-brand-action relative z-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-extrabold text-2xl sm:text-3xl text-brand-text">
                      Solicitação Recebida!
                    </h3>
                    <p className="text-brand-text/80 text-base max-w-md mx-auto">
                      Sua análise de presença e tráfego gratuito foi programada. Aguarde o contato de um de nossos assessores.
                    </p>
                  </div>

                  {/* Summary of submitted lead */}
                  {submittedLead && (
                    <div className="max-w-md mx-auto p-5 rounded-2xl bg-brand-black/55 border border-white/5 text-left space-y-3">
                      <span className="text-[10px] font-mono tracking-widest text-brand-action uppercase font-bold block border-b border-white/5 pb-2">
                        Resumo do Registro
                      </span>
                      <div className="text-xs space-y-1.5 text-brand-text/90 font-sans">
                        <div>
                          <strong className="text-brand-text/50 font-mono uppercase text-[10px] block">Nome:</strong>
                          {submittedLead.name}
                        </div>
                        <div>
                          <strong className="text-brand-text/50 font-mono uppercase text-[10px] block">WhatsApp:</strong>
                          {submittedLead.whatsapp}
                        </div>
                        <div className="line-clamp-2">
                          <strong className="text-brand-text/50 font-mono uppercase text-[10px] block">Desafio principal:</strong>
                          {submittedLead.challenge}
                        </div>
                        <div className="text-[10px] text-brand-text/40 pt-1 text-right">
                          Enviado em: {submittedLead.submittedAt}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 rounded-xl border border-white/10 text-brand-text/80 hover:bg-white/5 font-sans font-medium text-sm transition-colors cursor-pointer"
                    >
                      Enviar outro desafio
                    </button>
                    
                    {/* Direct WhatsApp acceleration action */}
                    <a
                      href={`https://api.whatsapp.com/send?phone=556296471441&text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20consultoria%20com%20a%20E2Boost.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-2.5 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-sm tracking-wide flex items-center justify-center gap-2 neon-glow hover:scale-105 transition-all cursor-pointer"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Acelerar via WhatsApp
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
