import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const cards = ['apartments', 'restaurant', 'spa'] as const;

const Experience = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
            {t('experience.title')}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((key, i) => (
            <div
              key={key}
              className={`group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              {/* Image Placeholder */}
              <div className="aspect-[3/4] bg-muted mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                    {t(`experience.${key}.title`)}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl mb-3">
                {t(`experience.${key}.title`)}
              </h3>

              {/* Description */}
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {t(`experience.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
