import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, Images } from 'lucide-react';
import { Project } from '../types';

const screenshotUrl = (url: string, width = 1600) =>
  `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${width}`;

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const projects: Project[] = [
    {
      id: 1,
      name: 'SoaresSat',
      type: 'Infraestrutura e Presença Digital',
      description: 'Desenvolvimento da presença digital e estruturação de serviços com rastreamento de conversão de leads de alta fidelidade.',
      details: 'Desenvolvemos todo o ecossistema digital com foco em carregamento instantâneo. Criamos rotas de contato claras e estruturamos a comunicação de soluções de telemetria de forma profissional.',
      result: 'Uma vitrine digital rápida e otimizada para captar clientes que buscam soluções precisas, transmitindo máxima confiança e profissionalismo desde o primeiro clique.',
      url: 'https://soaressat.com.br/',
      tags: ['Landing Page', 'SEO Otimizado', 'Infraestrutura de Leads', 'Goiânia - GO'],
      imageType: 'satellite',
      screenshots: [
        {
          src: screenshotUrl('https://soaressat.com.br/'),
          alt: 'Página inicial real do projeto SoaresSat Instalações',
          caption: 'Home com chamada principal para orçamento via WhatsApp'
        },
        {
          src: screenshotUrl('https://soaressat.com.br/cameras/'),
          alt: 'Área de serviços do projeto SoaresSat Instalações',
          caption: 'Seção de serviços estruturada para captação de leads'
        },
        {
          src: screenshotUrl('https://soaressat.com.br/interfones/'),
          alt: 'Área de contato do projeto SoaresSat Instalações',
          caption: 'Fluxo de contato direto para conversão'
        }
      ]
    },
    {
      id: 2,
      name: 'Encanto Pratas',
      type: 'E-commerce e Escala de Vendas',
      description: 'Criação de loja virtual completa com design refinado, UX focada em conversão e infraestrutura escalável para picos de vendas.',
      details: 'Reformulamos o funil de compras e as páginas de produtos. Implementamos otimizações de cache agressivas e integrações robustas de pixel para alimentar campanhas de remarketing de alta performance.',
      result: 'Desenvolvemos todo o e-commerce focando em UX fluida e design atraente. Integração de pagamentos segura e estrutura de ponta para suportar picos de acessos e escalar as vendas.',
      url: 'https://encantopratas.net.br/',
      tags: ['E-commerce Shopify/Woo', 'UX/UI Premium', 'Meta Ads Pixel', 'Funil Otimizado'],
      imageType: 'ecommerce',
      screenshots: [
        {
          src: screenshotUrl('https://encantopratas.net.br/'),
          alt: 'Página inicial real do projeto Encanto Pratas',
          caption: 'Hero premium com foco na coleção de joias'
        },
        {
          src: screenshotUrl('https://encantopratas.net.br/login'),
          alt: 'Vitrine de produtos real do e-commerce Encanto Pratas',
          caption: 'Vitrine de produtos para navegação e descoberta'
        },
      ]
    }
  ];

  const activeProject = projects.find((project) => project.id === activeTab) || projects[0];
  const currentSlide = activeProject.screenshots[activeSlide] || activeProject.screenshots[0];

  useEffect(() => {
    setActiveSlide(0);
  }, [activeTab]);

  const showPreviousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? activeProject.screenshots.length - 1 : current - 1
    );
  };

  const showNextSlide = () => {
    setActiveSlide((current) =>
      current === activeProject.screenshots.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section id="portfolio" className="portfolio-premium py-24 relative bg-brand-black overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-action/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-support/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="portfolio-heading text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-action font-mono text-xs font-semibold tracking-widest uppercase"
          >
            PROJETOS REAIS · RESULTADOS VISÍVEIS
          </motion.div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-text tracking-tight">
            Marcas que ganharam uma presença digital <span className="text-brand-action">à altura do seu potencial.</span>
          </h2>
          <p className="text-brand-text/70 text-lg font-light">
            Cada projeto nasce de uma estratégia própria. Explore interfaces reais que unem clareza, velocidade e caminhos mais curtos até a conversão.
          </p>
        </div>

        <div className="project-tabs flex flex-wrap justify-center gap-4 mb-12">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveTab(project.id)}
              className={`project-tab px-6 py-3 rounded-2xl font-sans font-semibold text-sm transition-all duration-300 relative border cursor-pointer ${
                activeTab === project.id
                  ? 'bg-brand-support/20 border-brand-action text-brand-action shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'bg-white/5 border-white/5 text-brand-text/70 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Images className="w-4 h-4" />
                {project.name}
              </span>
            </button>
          ))}
        </div>

        <div className="portfolio-showcase grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="portfolio-copy lg:col-span-5 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono tracking-wider uppercase text-brand-action">
                    {activeProject.type}
                  </span>
                  <h3 className="font-sans font-extrabold text-3xl sm:text-4xl text-brand-text">
                    {activeProject.name}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeProject.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-brand-support/15 border border-brand-support/30 text-xs font-mono text-brand-text/95">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-brand-action/80 uppercase font-bold">O Desafio & Execução:</span>
                    <p className="text-brand-text/80 text-sm leading-relaxed">
                      {activeProject.details}
                    </p>
                  </div>

                  <div className="result-card space-y-1.5 p-4 rounded-2xl bg-brand-support/10 border border-brand-support/20 relative overflow-hidden">
                    <span className="text-xs font-mono text-brand-action uppercase font-bold flex items-center gap-1.5">
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-brand-action inline-block animate-ping" />
                      Resultado Consolidado:
                    </span>
                    <p className="text-brand-text text-sm leading-relaxed font-sans font-medium">
                      {activeProject.result}
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-action text-brand-black font-sans font-bold text-sm tracking-wide neon-glow neon-glow-hover hover:scale-105 active:scale-95 transition-all duration-300"
                  >
                    <span>ACESSAR PROJETO REAL</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-4 px-2 gap-4">
              <span className="text-xs font-mono text-brand-text/50 uppercase tracking-wider">
                Imagens reais do projeto
              </span>
              <span className="text-xs font-mono text-brand-action">
                {activeSlide + 1}/{activeProject.screenshots.length}
              </span>
            </div>

            <div className="project-browser relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-brand-black group">
              <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/50 block"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50 block"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/50 block"></span>
                </div>
                <div className="w-full max-w-90 h-4 bg-white/10 rounded px-2 flex items-center justify-center text-[8px] font-mono text-brand-text/50 overflow-hidden text-ellipsis whitespace-nowrap">
                  {activeProject.url}
                </div>
              </div>

              <div className="relative aspect-16/10 bg-brand-base overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeProject.id}-${activeSlide}`}
                    src={currentSlide.src}
                    alt={currentSlide.alt}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45 }}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-black via-brand-black/70 to-transparent p-5 pt-16">
                  <p className="text-sm sm:text-base font-sans font-semibold text-brand-text">
                    {currentSlide.caption}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={showPreviousSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-black/75 border border-white/10 text-brand-text hover:text-brand-action hover:border-brand-action/50 transition-colors flex items-center justify-center"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={showNextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-black/75 border border-white/10 text-brand-text hover:text-brand-action hover:border-brand-action/50 transition-colors flex items-center justify-center"
                  aria-label="Próxima imagem"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 p-4 bg-white/3 border-t border-white/10">
                {activeProject.screenshots.map((screenshot, index) => (
                  <button
                    key={screenshot.caption}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? 'w-8 bg-brand-action'
                        : 'w-2 bg-white/25 hover:bg-white/50'
                    }`}
                    aria-label={`Abrir imagem ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
