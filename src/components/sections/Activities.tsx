import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const activityKeys = ['accommodation', 'golf', 'wellness', 'horses', 'themed', 'mice'] as const;

const Activities = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="activities" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-square bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                Activities Image
              </span>
            </div>
          </div>

          {/* Right: Category List */}
          <div>
            <div
              className={`mb-12 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-4">
                {t('activities.title')}
              </h2>
              <p className="font-body text-muted-foreground text-lg">
                {t('activities.subtitle')}
              </p>
            </div>

            <div className="space-y-0">
              {activityKeys.map((key, i) => (
                <div
                  key={key}
                  className={`group border-t border-border last:border-b py-5 flex items-center justify-between cursor-pointer hover:pl-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(i + 1) * 100}ms` }}
                >
                  <span className="font-heading text-xl md:text-2xl group-hover:text-accent transition-colors">
                    {t(`activities.${key}`)}
                  </span>
                  <span className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
