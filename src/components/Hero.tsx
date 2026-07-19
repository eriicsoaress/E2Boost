import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Aurora from '../../components/Aurora';

export default function Hero({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <section id="home" className="hero-new">
      <div className="hero-aurora" aria-hidden="true">
        <Aurora
          colorStops={['#00E5FF', '#7B2CBF', '#5227FF']}
          blend={0.62}
          amplitude={1.15}
          speed={0.55}
        />
      </div>
      <div className="hero-background-treatment" aria-hidden="true" />
      <motion.div className="hero-inner" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
        <div className="eyebrow"><Sparkles size={13}/> Estratégia, tecnologia e automação para escalar</div>
        <h1>
          <span>NÃO CRIAMOS SÓ SITES.</span>
          <span>CONSTRUÍMOS</span>
          <em>MÁQUINAS DE VENDAS.</em>
        </h1>
        <p>Unimos estratégia, design, tecnologia, inteligência artificial e automação para transformar sua presença digital em uma operação de vendas sob medida — pronta para atrair, converter e escalar.</p>
        <button className="primary-btn" onClick={onCtaClick}>QUERO UMA ESTRUTURA QUE VENDE <ArrowRight size={15}/></button>
      </motion.div>
      <div className="scroll-mark"><span>SCROLL</span><i/></div>
    </section>
  );
}
