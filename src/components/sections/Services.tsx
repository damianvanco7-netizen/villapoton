import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Star, UtensilsCrossed, Car, Sparkles } from 'lucide-react';

const services = [
  { key: 'concierge', icon: Star },
  { key: 'dining', icon: UtensilsCrossed },
  { key: 'transfer', icon: Car },
  { key: 'experiences', icon: Sparkles },
] as const;

const Services = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Service List */}
          <div>
            <div
              className={`mb-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
                {t('services.title')}
              </h2>
              <p className="font-body text-muted-foreground text-lg">
                {t('services.subtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {services.map(({ key, icon: Icon }, i) => (
                <div
                  key={key}
                  className={`flex gap-5 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl mb-1">
                      {t(`services.${key}.title`)}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
                      {t(`services.${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image Placeholder */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[3/4] bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                Services Image
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
