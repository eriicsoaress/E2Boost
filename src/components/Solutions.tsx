import { motion } from 'motion/react';
import { Laptop, Target, Cloud, ChevronRight, Check } from 'lucide-react';
import { Solution } from '../types';

export default function Solutions() {
  const solutions: Solution[] = [
    {
      id: 1,
      title: 'Arquitetura e Criação de Sites',
      description: 'Desenvolvimento de landing pages e sites focados em alta conversão. Garantimos estabilidade, velocidade máxima e design premium.',
      longDescription: 'Utilizamos plataformas robustas que garantem estabilidade, carregamento rápido e design premium, sem depender de manutenções exaustivas ou travamentos nos seus horários de pico.',
      iconName: 'laptop',
      features: [
        'Landing Pages de Alta Conversão',
        'Copywriting Otimizado para Vendas',
        'Velocidade de Carregamento Ultra-Rápida',
        'Design Responsivo (Mobile & Desktop)',
        'Integrações com Pixels e Rastreamento'
      ]
    },
    {
      id: 2,
      title: 'Gestão de Tráfego Pago',
      description: 'Campanhas estratégicas no Google Ads e Meta Ads. Compramos dados, analisamos métricas e geramos clientes prontos para comprar.',
      longDescription: 'Compramos dados de forma inteligente nos maiores canais de busca e redes sociais, analisamos métricas-chave em tempo real e direcionamos o cliente ideal diretamente para o seu botão de compra.',
      iconName: 'target',
      features: [
        'Campanhas no Google Ads e Meta Ads (Insta/FB)',
        'Pesquisa de Público-Alvo Qualificado',
        'A/B Testing de Anúncios e Criativos',
        'Otimização de ROI (Retorno sobre Investimento)',
        'Relatórios de Performance Claros e Transparentes'
      ]
    },
    {
      id: 3,
      title: 'Governança e Gestão Digital',
      description: 'Monitoramento contínuo de toda a sua infraestrutura digital. Cuidamos das integrações e hospedagem para sua operação não parar.',
      longDescription: 'Cuidamos das integrações de sistemas, da estabilidade da hospedagem e da segurança dos seus ativos digitais para que sua operação de vendas nunca pare ou sofra lentidão.',
      iconName: 'cloud',
      features: [
        'Monitoramento de Domínios e Hospedagem',
        'Manutenção Preventiva de Ativos',
        'Garantia de Uptime das Páginas',
        'Sincronização de APIs e CRM',
        'Segurança de Dados e Backups Periódicos'
      ]
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'laptop':
        return <Laptop className="w-6 h-6 text-brand-action" />;
      case 'target':
        return <Target className="w-6 h-6 text-brand-action" />;
      case 'cloud':
        return <Cloud className="w-6 h-6 text-brand-action" />;
      default:
        return <Laptop className="w-6 h-6 text-brand-action" />;
    }
  };

  return (
    <section id="servicos" className="py-24 relative bg-brand-base overflow-hidden">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-support/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-action/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-brand-action font-mono text-xs font-semibold tracking-widest uppercase"
          >
            NOSSAS SOLUÇÕES
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-brand-text"
          >
            Arquitetura Digital de Crescimento
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-brand-text/70 text-lg sm:text-xl font-light"
          >
            Não entregamos apenas sites, entregamos uma arquitetura digital completa e gerenciada para o seu crescimento exponencial.
          </motion.p>
        </div>

        {/* Solutions Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {solutions.map((sol, index) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group flex flex-col justify-between glass-panel p-8 rounded-3xl border-white/5 glass-panel-hover overflow-hidden relative"
            >
              {/* Decorative corner glow */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-brand-action/10 rounded-full blur-xl group-hover:bg-brand-action/20 transition-colors duration-500"></div>
              
              <div>
                {/* Icon Circle */}
                <div className="w-12 h-12 rounded-2xl bg-brand-support/20 border border-brand-action/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,229,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300">
                  {getIcon(sol.iconName)}
                </div>

                {/* Card Title */}
                <h3 className="font-sans font-bold text-xl sm:text-2xl text-brand-text mb-3 tracking-tight group-hover:text-brand-action transition-colors duration-300">
                  {sol.title}
                </h3>

                {/* Primary Description */}
                <p className="text-brand-text/70 text-sm font-sans leading-relaxed mb-6">
                  {sol.description}
                </p>

                {/* Detailed description */}
                <p className="text-brand-text/50 text-xs font-sans leading-relaxed border-t border-white/5 pt-4 mb-6 italic">
                  {sol.longDescription}
                </p>

                {/* Core features bullet list */}
                <div className="space-y-3">
                  <div className="text-[10px] font-mono tracking-wider text-brand-action/80 uppercase font-bold">O que está incluso:</div>
                  <ul className="space-y-2">
                    {sol.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs text-brand-text/80 font-sans">
                        <Check className="w-4 h-4 text-brand-action shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Decorative Button Action */}
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-brand-action font-semibold group-hover:neon-text-glow transition-all">
                <span>Solução Gerenciada E2Boost</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
