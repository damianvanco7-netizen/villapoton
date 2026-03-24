import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Quote = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-16 h-px bg-accent mx-auto mb-12" />
          <p className="font-heading text-3xl md:text-4xl lg:text-5xl leading-snug mb-8">
            {t('quote.text')}
          </p>
          <p className="font-body text-accent text-sm tracking-[0.2em] uppercase">
            {t('quote.author')}
          </p>
          <div className="w-16 h-px bg-accent mx-auto mt-12" />
        </div>
      </div>
    </section>
  );
};

export default Quote;
