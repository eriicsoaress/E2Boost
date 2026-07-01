import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, Zap, Server, Activity } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  // Mini simulated dashboard items inside hero for visual high-quality impact
  const liveStats = [
    { label: 'Conversão', value: '+342%', icon: TrendingUp, color: 'text-brand-action' },
    { label: 'Uptime Cloud', value: '99.99%', icon: Server, color: 'text-brand-support' },
    { label: 'Tráfego Boost', value: '10x', icon: Zap, color: 'text-brand-action' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-gradient-to-b from-brand-base via-brand-base to-brand-black"
    >
      {/* Background Cyber Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-support/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-action/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Animated Matrix/Grid Background overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-brand-action/20 text-brand-action text-xs font-mono tracking-wider uppercase mx-auto lg:mx-0"
            >
              <Zap className="w-3.5 h-3.5 animate-bounce" />
              <span>Agência de Crescimento & Infraestrutura</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-text"
            >
              Infraestrutura <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-action to-brand-support drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]">Sólida</span>.<br />
              Tráfego <span className="text-brand-action neon-text-glow">Acelerado</span>.<br />
              Escalamos o seu negócio.
            </motion.h1>

            {/* Core Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-brand-text/80 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-sans leading-relaxed font-light"
            >
              Esqueça a dor de cabeça com tecnologia e códigos complexos. Nós gerenciamos toda a infraestrutura da sua presença digital e injetamos tráfego qualificado para você focar no que realmente importa: <strong className="text-brand-text font-bold">vender mais.</strong>
            </motion.p>

            {/* CTA Button and trust notes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onCtaClick}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-base tracking-wide neon-glow neon-glow-hover transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                QUERO ALAVANCAR MINHAS VENDAS
              </button>
              
              <div className="flex items-center gap-2 text-xs font-mono text-brand-text/60">
                <ShieldCheck className="w-4 h-4 text-brand-action" />
                <span>Sem contratos de fidelidade exaustivos</span>
              </div>
            </motion.div>

            {/* Mini Dashboard Metrics below text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 grid grid-cols-3 gap-3 md:gap-4 max-w-md mx-auto lg:mx-0 border-t border-white/5"
            >
              {liveStats.map((stat, idx) => (
                <div key={idx} className="glass-panel p-3 rounded-xl border-white/5 text-center">
                  <div className="flex justify-center mb-1">
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                  <div className="text-sm font-bold text-brand-text font-mono tracking-tight">{stat.value}</div>
                  <div className="text-[10px] text-brand-text/50 font-sans uppercase">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Hero Right Interactive Mockup / Tech Visual */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mx-auto max-w-[420px] lg:max-w-none glass-panel p-6 sm:p-8 rounded-3xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Abs glass glow header */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-action/20 via-brand-support/30 to-brand-action/20"></div>

              {/* Fake Window Header Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/60 block"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500/60 block"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500/60 block"></span>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-brand-action flex items-center gap-1.5">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>E2B-CLOUD::ACTIVE</span>
                </div>
              </div>

              {/* Main Illustration Panel */}
              <div className="space-y-6">
                {/* Traffic Acceleration Visualizer */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-brand-text/60">Taxa de Conversão Mensal</span>
                    <span className="text-brand-action font-bold">12.4%</span>
                  </div>
                  
                  {/* Decorative chart */}
                  <div className="h-28 flex items-end justify-between gap-1.5 pt-4 px-2 bg-brand-black/35 rounded-xl border border-white/5">
                    {[30, 45, 35, 60, 50, 75, 90, 80, 110].map((h, i) => (
                      <motion.div
                        key={i}
                        className={`w-full rounded-t-md relative ${
                          i === 8 
                            ? 'bg-gradient-to-t from-brand-support to-brand-action shadow-[0_0_15px_rgba(0,229,255,0.6)]' 
                            : 'bg-brand-support/30'
                        }`}
                        initial={{ height: 0 }}
                        animate={{ height: `${(h / 110) * 100}%` }}
                        transition={{ duration: 1.2, delay: i * 0.1, ease: 'easeOut' }}
                      >
                        {i === 8 && (
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[9px] font-mono font-bold text-brand-action bg-brand-black/90 px-1 py-0.5 rounded border border-brand-action/40">
                            Boost
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Simulated Lead notification card inside hero */}
                <div className="space-y-3">
                  <div className="text-xs font-mono text-brand-text/50 uppercase tracking-widest">Aceleração Real-Time</div>
                  <div className="glass-panel p-3.5 rounded-xl border-white/10 bg-brand-support/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-brand-action/20 border border-brand-action/30 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-brand-action" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-brand-text">Novo Lead Capturado</div>
                        <div className="text-[10px] text-brand-text/60 font-mono">WhatsApp Vendas Ativo</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono bg-brand-action/10 text-brand-action border border-brand-action/20 px-2 py-0.5 rounded-full">
                      Just Now
                    </span>
                  </div>
                </div>

                {/* Quote details */}
                <div className="p-4 rounded-xl bg-brand-black/45 border border-white/5">
                  <p className="text-xs italic text-brand-text/70 leading-relaxed">
                    "Alcançamos o recorde de faturamento no segundo mês utilizando a infraestrutura otimizada pela equipe E2Boost."
                  </p>
                  <div className="mt-2 text-right text-[10px] font-bold text-brand-action font-mono">
                    — Depoimento de Cliente Portfólio
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Orbiting element for tech aesthetic */}
            <div className="absolute -top-5 -right-5 w-24 h-24 bg-brand-action/20 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
            <div className="absolute -bottom-5 -left-5 w-32 h-32 bg-brand-support/20 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
