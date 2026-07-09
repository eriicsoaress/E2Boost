import { Zap, Instagram, Linkedin, MessageCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-brand-black border-t border-white/5 py-12 relative overflow-hidden">
      {/* Decorative subtle ambient lights */}
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-brand-support/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & Slogan */}
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-support/20 border border-brand-action/40 flex items-center justify-center">
                <Zap className="w-4 h-4 text-brand-action" />
              </div>
              <span className="font-sans font-bold text-lg tracking-wider text-brand-text">
                E2<span className="text-brand-action neon-text-glow">Boost</span>
              </span>
            </div>
            <p className="text-brand-text/50 text-xs font-sans max-w-xs leading-relaxed">
              Infraestrutura sólida, tráfego qualificado e gerenciamento premium para escalar sua marca.
            </p>
          </div>

          {/* Social Links & Anchor */}
          <div className="flex flex-col items-center md:items-end gap-4">
            {/* Social handles with icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-text/80 hover:text-brand-action hover:border-brand-action/40 transition-all hover:scale-105"
                title="Instagram E2Boost"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-text/80 hover:text-brand-action hover:border-brand-action/40 transition-all hover:scale-105"
                title="LinkedIn E2Boost"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=556296471441&text=Ol%C3%A1%21%20Gostaria%20de%20agendar%20uma%20consultoria%20com%20a%20E2Boost."
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-text/80 hover:text-brand-action hover:border-brand-action/40 transition-all hover:scale-105"
                title="WhatsApp Direct E2Boost"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            {/* Back to top click */}
            <button
              onClick={scrollToTop}
              className="text-xs font-mono text-brand-text/40 hover:text-brand-action transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>VOLTAR AO TOPO</span>
              <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>

        </div>

        {/* CNPJ / Disclaimer bottom footer bar */}
        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-brand-text/40">
          <div className="text-center sm:text-left">
            © 2026 E2Boost - Gestão e Tráfego. Todos os direitos reservados.
          </div>
          <div className="text-center sm:text-right">
            CNPJ: XX.XXX.XXX/0001-XX | Goiânia, GO
          </div>
        </div>

      </div>
    </footer>
  );
}
