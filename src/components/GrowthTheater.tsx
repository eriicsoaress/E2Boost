import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight, BadgeCheck, MousePointerClick, Radar, Rocket, Route, Sparkles, Target, Zap } from 'lucide-react';

const journey = [
  {
    label: 'Clique qualificado',
    value: 'R$ 1,84',
    icon: MousePointerClick,
    detail: 'Anuncios apontando para a intencao real de compra.'
  },
  {
    label: 'Pagina que prende',
    value: '0.8s',
    icon: Radar,
    detail: 'Carregamento rapido, copy direta e rastreamento limpo.'
  },
  {
    label: 'Lead no WhatsApp',
    value: '+68%',
    icon: Target,
    detail: 'Fluxo sem atrito para transformar visita em conversa.'
  },
  {
    label: 'Venda escalavel',
    value: '3.4x',
    icon: Rocket,
    detail: 'Otimizacao continua ate a verba encontrar retorno.'
  }
];

const signalLines = [
  'Google Search : Captura de demanda qualificada',
  'Meta Ads : Escala e atração de público',
  'Landing page : Interface de alta performance',
  'WhatsApp : Atendimento rápido e sem atrito',
  'CRM : Controle total do funil de vendas'
];

export default function GrowthTheater() {
  const { scrollYProgress } = useScroll();
  const beamX = useTransform(scrollYProgress, [0.15, 0.75], ['-15%', '115%']);
  const pulseScale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.9, 1.12, 0.96]);

  return (
    <section className="relative overflow-hidden bg-brand-black py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,229,255,0.12),transparent_28%),radial-gradient(circle_at_80%_70%,rgba(123,44,191,0.18),transparent_32%)]" />
      <div className="absolute inset-0 growth-theater-grid opacity-40" />

      <motion.div
        style={{ x: beamX }}
        className="pointer-events-none absolute top-0 h-full w-32 -skew-x-12 bg-brand-action/10 blur-xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-action/20 bg-brand-action/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-action"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Experiencia de decisao
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.08 }}
              className="font-sans text-3xl font-extrabold tracking-tight text-brand-text sm:text-4xl lg:text-5xl"
            >
              O cliente nao compra tecnologia.
              <span className="block text-brand-action neon-text-glow">Ele compra previsibilidade de crescimento.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.16 }}
            className="text-base leading-relaxed text-brand-text/70 sm:text-lg lg:col-span-5"
          >
            Montamos uma maquina visualmente clara: trafego entra, paginas convertem, dados voltam para a campanha e a operacao aprende a vender melhor a cada ciclo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-brand-base/55 p-5 shadow-2xl lg:col-span-8"
          >
            <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent,rgba(0,229,255,0.08),transparent)] growth-scan" />

            <div className="relative mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-action/30 bg-brand-action/10">
                  <Route className="h-5 w-5 text-brand-action" />
                </div>
                <div>
                  <div className="text-sm font-bold text-brand-text">Funil E2Boost ao vivo</div>
                  <div className="text-xs font-mono text-brand-text/45">da primeira visita ao proximo contrato</div>
                </div>
              </div>
              <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-mono text-emerald-300 sm:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                ROI em otimizacao
              </div>
            </div>

            <div className="relative grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="absolute left-[10%] right-[10%] top-10 hidden h-px bg-gradient-to-r from-transparent via-brand-action/40 to-transparent md:block" />
              {journey.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.12, duration: 0.55 }}
                  className="relative rounded-2xl border border-white/10 bg-brand-black/55 p-4"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3 + index * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-action/25 bg-brand-action/10 shadow-[0_0_22px_rgba(0,229,255,0.14)]"
                  >
                    <item.icon className="h-5 w-5 text-brand-action" />
                  </motion.div>
                  <div className="mb-1 text-2xl font-extrabold text-brand-text">{item.value}</div>
                  <div className="mb-3 text-sm font-bold text-brand-action">{item.label}</div>
                  <p className="text-xs leading-relaxed text-brand-text/58">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            style={{ scale: pulseScale }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-brand-action/20 bg-brand-action text-brand-black p-6 lg:col-span-4"
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/30 blur-3xl" />
            <div className="relative">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-black text-brand-action">
                  <Zap className="h-6 w-6" />
                </div>
                <ArrowUpRight className="h-7 w-7" />
              </div>

              <div className="mb-6 text-6xl font-extrabold tracking-tight">12x</div>
              <h3 className="mb-3 text-2xl font-extrabold">Engenharia de Vendas Aplicada</h3>
              <p className="mb-8 text-sm leading-relaxed text-brand-black/75">
               Focamos na gestão inteligente da sua infraestrutura e na facilitação do contato direto com o lead, transformando cliques em clientes reais.
              </p>

              <div className="space-y-3">
                {signalLines.map((line) => (
                  <div key={line} className="flex items-center gap-2 rounded-xl bg-brand-black/10 px-3 py-2 text-xs font-bold">
                    <BadgeCheck className="h-4 w-4" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
