import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import welcomeImg from '@/assets/welcome.jpg';
import DecorativeSymbol from '@/components/DecorativeSymbol';

const Welcome = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const { containerRef, imgRef } = useParallax(0.15);

  return (
    <section id="welcome" className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <DecorativeSymbol rotation={25} position="top-8 right-8" size="w-[600px] md:w-[800px] lg:w-[1000px]" />
      {/* Staggered headline */}
      <div
        className={`container mx-auto px-6 mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-center">
            <span className="block">{t('welcome.title_line1')}</span>
            <span className="block">{t('welcome.title_line2')}</span>
            <span className="block italic">{t('welcome.title_line3')}</span>
          </h2>
        </div>

        {/* Description */}
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-center mt-8">
          {t('welcome.description')}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <a
            href="#experience"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t('welcome.cta')}
          </a>
        </div>
      </div>

      {/* Large 16:9 image aligned left with parallax */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-full md:w-[85%]">
          <div ref={containerRef} className="aspect-[3/4] md:aspect-video overflow-hidden">
            <img
              ref={imgRef}
              src={welcomeImg}
              alt="Villa Potoň Welcome"
              className="w-full h-[120%] object-cover will-change-transform"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
