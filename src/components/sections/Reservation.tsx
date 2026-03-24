import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone } from 'lucide-react';

const Reservation = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="reservation" className="py-24 md:py-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`text-center max-w-3xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            {t('reservation.title')}
          </h2>
          <p className="font-body text-primary-foreground/80 text-lg leading-relaxed mb-10">
            {t('reservation.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:info@villapoton.sk"
              className="bg-accent text-accent-foreground px-8 py-4 text-sm font-body font-semibold tracking-wider uppercase hover:bg-accent/90 transition-colors"
            >
              {t('reservation.cta')}
            </a>
            <a
              href="tel:+421000000000"
              className="flex items-center gap-2 border-2 border-primary-foreground/30 px-8 py-4 text-sm font-body font-semibold tracking-wider uppercase hover:border-primary-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              {t('reservation.phone')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
