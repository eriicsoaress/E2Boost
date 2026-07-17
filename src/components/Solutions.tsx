import { motion } from 'motion/react';
import { Globe2, Bot, TrendingUp, ArrowUpRight } from 'lucide-react';

const services = [
  { n:'01', icon:Globe2, title:'Sites & E-commerces Premium', text:'Projetos 100% exclusivos. Design feito sob medida para o seu negócio converter mais, sem depender de templates prontos.', wide:true },
  { n:'02', icon:Bot, title:'Automação & IA no WhatsApp', text:'Qualifique leads e atenda clientes no automático com chatbots inteligentes integrados ao seu site.', wide:true },
  { n:'03', icon:TrendingUp, title:'Gestão de Tráfego Pago', text:'O combustível da sua máquina. Campanhas no Google e Meta Ads focadas em ROI e atração de compradores reais.' },
];
export default function Solutions(){ return <section id="servicos" className="section services-new"><div className="section-head"><span>02 — EXPERTISE</span><h2>Nossa Expertise Digital</h2><p>Soluções arquitetadas para conversão máxima e performance técnica impecável.</p></div><div className="service-grid">{services.map((s,i)=><motion.article key={s.n} className={s.wide?'service-card wide':'service-card'} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}><div className="card-top"><s.icon/><span>{s.n}</span></div><div><h3>{s.title}</h3><p>{s.text}</p></div></motion.article>)}<motion.article className="service-card manifesto" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}><span>ESTRATÉGIA + DESIGN + TECNOLOGIA</span><h3>Impulsione sua Marca ao Futuro</h3><p>Utilizamos o que há de mais avançado em stacks tecnológicas para garantir velocidade e segurança inabaláveis.</p><ArrowUpRight/></motion.article></div></section> }
