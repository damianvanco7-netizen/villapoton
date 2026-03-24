import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const services = [
  { key: 'breakfast' },
  { key: 'terrace' },
  { key: 'parking' },
  { key: 'accessibility' },
] as const;

const Services = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">
            {t('services.titleLine1')}
          </h2>
          <p className="font-heading text-4xl md:text-5xl lg:text-6xl italic">
            {t('services.titleLine2')}
          </p>
        </div>

        {/* Service Rows */}
        <div>
          {services.map(({ key }, i) => (
            <div
              key={key}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(i + 1) * 150}ms` }}
            >
              {/* Divider line */}
              <div className="border-t border-foreground/20" />

              {/* Row content */}
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.2fr_1fr] gap-6 md:gap-8 items-start py-10 md:py-14">
                {/* Counter */}
                <span className="font-body text-sm text-muted-foreground pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Title */}
                <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl">
                  {t(`services.items.${key}.title`)}
                </h3>

                {/* Description */}
                <p className="font-body text-foreground text-sm leading-relaxed max-w-md">
                  {t(`services.items.${key}.description`)}
                </p>

                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                    Image
                  </span>
                </div>
              </div>
            </div>
          ))}
          {/* Bottom divider */}
          <div className="border-t border-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default Services;
