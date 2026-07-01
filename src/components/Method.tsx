import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Settings, Zap, BarChart3, ChevronRight, HelpCircle } from 'lucide-react';
import { MethodStep } from '../types';

export default function Method() {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: MethodStep[] = [
    {
      step: 1,
      title: 'Alinhamento e Estratégia',
      description: 'Entendemos o seu modelo de negócio, seus concorrentes e definimos metas claras de crescimento.',
      details: 'Mapeamento completo do público-alvo, desenho do funil ideal para o seu ticket médio, estudo de palavras-chave mais lucrativas e planejamento de metas realistas de ROI.',
      iconName: 'align'
    },
    {
      step: 2,
      title: 'Setup de Infraestrutura',
      description: 'Construímos sua página e configuramos o rastreamento de dados de forma inteligente.',
      details: 'Desenvolvimento do site focado em carregamento ultra-rápido, integração completa do pixel do Meta, tags do Google Analytics (GA4) e criação de barreira antifraude nas tags.',
      iconName: 'setup'
    },
    {
      step: 3,
      title: 'Injeção de Tráfego (O Boost)',
      description: 'Ativamos as campanhas com foco total em conversão rápida e inteligência de dados.',
      details: 'Veiculação estratégica de criativos validados em alta resolução. Compramos leilões seletivos no Google Search, Youtube, Instagram e Facebook direcionando para o funil criado.',
      iconName: 'boost'
    },
    {
      step: 4,
      title: 'Governança e Otimização',
      description: 'Analisamos os resultados diariamente e ajustamos a rota para maximizar o lucro.',
      details: 'Relatório unificado em tempo real, monitoramento de falhas ou lentidão, ajuste de lances de cliques, exclusão de tráfego robô ou sujo e reinvestimento focado na maior fonte de lucro.',
      iconName: 'optimize'
    }
  ];

  const getStepIcon = (name: string, active: boolean) => {
    const sizeClass = "w-6 h-6 transition-colors duration-300 " + (active ? "text-brand-action" : "text-brand-text/50");
    switch (name) {
      case 'align':
        return <Sparkles className={sizeClass} />;
      case 'setup':
        return <Settings className={sizeClass} />;
      case 'boost':
        return <Zap className={sizeClass} />;
      case 'optimize':
        return <BarChart3 className={sizeClass} />;
      default:
        return <Sparkles className={sizeClass} />;
    }
  };

  const currentStepData = steps.find(s => s.step === activeStep) || steps[0];

  return (
    <section id="metodo" className="py-24 relative bg-brand-base overflow-hidden">
      {/* Glow shapes */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-brand-support/15 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-action/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-action font-mono text-xs font-semibold tracking-widest uppercase"
          >
            MÉTODO COMPROVADO
          </motion.div>
          
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Como a E2Boost Funciona?
          </h2>
          
          <p className="text-brand-text/70 text-lg font-light">
            Passo a passo transparente para estruturar e acelerar sua máquina de vendas online de forma sustentável.
          </p>
        </div>

        {/* Timeline Grid (Horizontal for Desktop, Vertical for Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left / Timeline steps */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              {steps.map((item) => {
                const isActive = item.step === activeStep;
                return (
                  <motion.div
                    key={item.step}
                    onClick={() => setActiveStep(item.step)}
                    className={`p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'glass-panel border-brand-action/40 bg-brand-support/10 shadow-[0_0_20px_rgba(0,229,255,0.08)]'
                        : 'bg-white/5 border-transparent hover:bg-white/10'
                    }`}
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Badge step number */}
                      <div className={`w-10 h-10 rounded-xl font-mono font-extrabold text-sm flex items-center justify-center border transition-all duration-300 ${
                        isActive
                          ? 'bg-brand-action text-brand-black border-brand-action'
                          : 'bg-white/5 text-brand-text/50 border-white/10'
                      }`}>
                        0{item.step}
                      </div>

                      {/* Title & brief */}
                      <div>
                        <h3 className={`font-sans font-bold text-base sm:text-lg transition-colors ${isActive ? 'text-brand-action' : 'text-brand-text'}`}>
                          {item.title}
                        </h3>
                        <p className="text-brand-text/60 text-xs sm:text-sm truncate max-w-[280px] sm:max-w-md font-light">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Step Icon */}
                    <div className="flex items-center gap-3">
                      {getStepIcon(item.iconName, isActive)}
                      <ChevronRight className={`w-4 h-4 text-brand-text/30 transition-transform ${isActive ? 'translate-x-1 text-brand-action' : ''}`} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right / Interactive explanation panel */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full glass-panel p-8 rounded-3xl border-white/10 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Visual grid decor inside card */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                    <span className="text-xs font-mono font-bold tracking-widest text-brand-action uppercase">
                      Fase 0{currentStepData.step} :: Atuação
                    </span>
                    <HelpCircle className="w-5 h-5 text-brand-text/20" />
                  </div>

                  <h3 className="font-sans font-extrabold text-2xl text-brand-text mb-4 leading-tight">
                    {currentStepData.title}
                  </h3>

                  <p className="text-brand-text/80 text-sm leading-relaxed mb-6 font-sans">
                    {currentStepData.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-brand-black/40 border border-white/5 space-y-3">
                    <div className="text-[10px] font-mono tracking-wider text-brand-action/80 uppercase font-bold">
                      O que executamos nesta etapa:
                    </div>
                    <p className="text-brand-text/70 text-xs sm:text-sm leading-relaxed font-sans">
                      {currentStepData.details}
                    </p>
                  </div>
                </div>

                {/* Progress bar indication */}
                <div className="mt-8 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-mono text-brand-text/40 mb-2">
                    <span>PROGRESSO DE IMPLANTAÇÃO</span>
                    <span>{currentStepData.step * 25}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-brand-support to-brand-action"
                      initial={{ width: 0 }}
                      animate={{ width: `${currentStepData.step * 25}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
