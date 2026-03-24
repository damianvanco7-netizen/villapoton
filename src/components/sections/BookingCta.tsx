import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroImg from '@/assets/hero.jpg';

const BookingCta = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="relative h-screen w-full overflow-hidden" data-header-theme="dark" ref={ref}>
      <img
        src={heroImg}
        alt="Villa Potoň"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div
          className={`bg-muted/80 backdrop-blur-sm px-10 py-16 md:px-20 md:py-24 max-w-2xl w-full text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            {t('booking_cta.title')}{' '}
            <em className="italic">{t('booking_cta.titleItalic')}</em>
          </h2>
          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            {t('booking_cta.description')}
          </p>
          <a
            href="mailto:info@villapoton.sk"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t('booking_cta.cta')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default BookingCta;
