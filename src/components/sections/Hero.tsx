import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Hero = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20" ref={ref}>
      <div className="container mx-auto px-6">
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Subtitle */}
          <p className="text-sm font-body tracking-[0.3em] uppercase text-accent mb-6">
            {t('hero.subtitle')}
          </p>

          {/* Main Title */}
          <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-8">
            VILLA
            <br />
            POTOŇ
          </h1>

          {/* Description */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10">
            {t('hero.description')}
          </p>

          {/* CTA */}
          <a
            href="#experience"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm font-body font-semibold tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            {t('hero.cta')}
          </a>
        </div>
      </div>

      {/* Hero Image Placeholder */}
      <div
        className={`mt-16 w-full transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="w-full h-[50vh] bg-muted flex items-center justify-center">
            <span className="text-muted-foreground font-body text-sm tracking-widest uppercase">
              Hero Image — Villa Potoň
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
