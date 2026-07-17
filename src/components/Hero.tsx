import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section id="home" className="hero-new">
      <div className="hero-orb hero-orb-one" /><div className="hero-orb hero-orb-two" />
      <motion.div className="hero-inner" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
        <div className="eyebrow"><Sparkles size={13}/> A E2Boost transforma alta performance em escala</div>
        <h1>NÃO FAZEMOS SITES.<br/>CONSTRUÍMOS <em>MÁQUINAS DE<br/>VENDAS</em> EXCLUSIVAS.</h1>
        <p>Esqueça os templates genéricos. Desenvolvemos sua infraestrutura digital 100% do zero, integrada com inteligência artificial e automações para escalar o seu negócio 24 horas por dia.</p>
        <button className="primary-btn" onClick={onCtaClick}>QUERO UM PROJETO SOB MEDIDA <ArrowRight size={15}/></button>
      </motion.div>
      <div className="scroll-mark"><span>SCROLL</span><i/></div>
    </section>
  );
}
