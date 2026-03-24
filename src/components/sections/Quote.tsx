import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import quoteBgImg from '@/assets/quote_bg.jpg';

const Quote = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref}>
      {/* Text block */}
      <div className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div
          className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl leading-snug mb-8">
            {t('quote.heading')}
            <em className="italic"> {t('quote.headingItalic')}</em>
            {t('quote.headingEnd')}
          </h2>
          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            {t('quote.subtitle')}
          </p>
          <a
            href="#reservation"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t('quote.cta')}
          </a>
        </div>
      </div>

      {/* Full-width image with text overlay */}
      <div className="w-full h-[70vh] md:h-[85vh] overflow-hidden relative" data-header-theme="dark">
        <img
          src={quoteBgImg}
          alt="Villa Potoň"
          className="w-full h-full object-cover"
        />
        {/* Green gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        {/* Text overlay — spread across width like reference */}
        <div className="absolute inset-0 flex flex-col justify-between px-8 md:px-16 lg:px-24 py-16 md:py-24">
          {/* "Viac ako pobyt" spread across the middle */}
          <div />
          <div className="flex items-center justify-between w-full">
            <span className="font-heading text-5xl md:text-7xl lg:text-9xl text-primary-foreground italic">
              {t('quote.imageTitle_word1')}
            </span>
            <span className="font-heading text-5xl md:text-7xl lg:text-9xl text-primary-foreground italic">
              {t('quote.imageTitle_word2')}
            </span>
            <span className="font-heading text-5xl md:text-7xl lg:text-9xl text-primary-foreground italic">
              {t('quote.imageTitle_word3')}
            </span>
          </div>
          {/* Subtitle at bottom center */}
          <p className="font-heading text-primary-foreground/80 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto text-center italic">
            {t('quote.imageSubtitle')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Quote;
