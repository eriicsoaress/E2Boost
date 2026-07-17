import { motion } from 'motion/react';
import { Code2, Users, PackageCheck, Smartphone, Check } from 'lucide-react';
const items=[
  [Code2,'Desenvolvimento do Zero','Código limpo, sem templates lentos e excesso de plugins inúteis.'],
  [Users,'Atendimento Direto com Fundadores','Tratamento VIP e suporte estratégico direto de quem decide.'],
  [PackageCheck,'Entrega Rápida e Transparente','Cronogramas respeitados com ferramentas de gestão que fazem você acompanhar tudo.'],
  [Smartphone,'Design Mobile-First','Focado na experiência de quem compra pelo celular em qualquer lugar.']
] as const;
export default function Method(){return <section id="metodo" className="why-shell"><div className="why-section"><div className="why-copy"><span className="kicker">03 — NOSSO DIFERENCIAL</span><h2>Por que confiar na <b>E2Boost?</b></h2><div className="why-list">{items.map(([Icon,t,d],i)=><motion.div key={t} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:i*.08}}><span><Icon/></span><p><strong>{t}</strong>{d}</p><Check className="check"/></motion.div>)}</div></div><div className="studio-visual" aria-label="Painel tecnológico E2Boost"><div className="studio-screen"><div className="screen-line"/><div className="screen-chart"/><div className="screen-panels"><i/><i/><i/></div></div><div className="studio-glow"/></div></div></section>}
