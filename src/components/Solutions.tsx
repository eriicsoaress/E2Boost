import { motion } from 'motion/react';
import { Globe2, Bot, TrendingUp, ArrowUpRight } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from './ui/3d-card';

const services = [
  { n: '01', icon: Globe2, title: 'Sites & E-commerces Premium', text: 'Projetos 100% exclusivos. Design feito sob medida para o seu negócio converter mais, sem depender de templates prontos.', wide: true },
  { n: '02', icon: Bot, title: 'Automação & IA no WhatsApp', text: 'Qualifique leads e atenda clientes no automático com chatbots inteligentes integrados ao seu site.', wide: true },
  { n: '03', icon: TrendingUp, title: 'Gestão de Tráfego Pago', text: 'O combustível da sua máquina. Campanhas no Google e Meta Ads focadas em ROI e atração de compradores reais.' },
];

export default function Solutions() {
  return (
    <section id="servicos" className="section services-new">
      <div className="section-head">
        <span>02 — EXPERTISE</span>
        <h2>Nossa Expertise Digital</h2>
        <p>Soluções arquitetadas para conversão máxima e performance técnica impecável.</p>
      </div>

      <div className="service-grid">
        {services.map((service, index) => (
          <motion.div
            key={service.n}
            className={`service-card-shell ${index === 0 ? 'wide' : 'medium'}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <CardContainer containerClassName="h-full w-full" className="h-full w-full" intensity={6}>
              <CardBody className="service-card h-full w-full">
                <CardItem translateZ={54} className="card-top w-full">
                  <service.icon />
                  <span>{service.n}</span>
                </CardItem>
                <CardItem translateZ={34} className="w-full">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </CardItem>
              </CardBody>
            </CardContainer>
          </motion.div>
        ))}

        <motion.div
          className="service-card-shell wide manifesto-shell"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CardContainer containerClassName="h-full w-full" className="h-full w-full" intensity={6}>
            <CardBody className="service-card manifesto h-full w-full">
              <CardItem translateZ={42} className="w-full">
                <span>ESTRATÉGIA + DESIGN + TECNOLOGIA</span>
              </CardItem>
              <CardItem translateZ={58} className="w-full">
                <h3>Impulsione sua Marca ao Futuro</h3>
              </CardItem>
              <CardItem translateZ={32} className="w-full">
                <p>Utilizamos o que há de mais avançado em stacks tecnológicas para garantir velocidade e segurança inabaláveis.</p>
              </CardItem>
              <CardItem translateZ={72} className="manifesto-arrow">
                <ArrowUpRight />
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>
      </div>
    </section>
  );
}
