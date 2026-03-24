import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronDown } from 'lucide-react';

import zitnyOstrovImg from '@/assets/zitny_ostrov.jpg';
import golfImg from '@/assets/golf.jpg';
import malkiaParkImg from '@/assets/malkia_park.jpg';
import slovakiaRingImg from '@/assets/slovakia_ring.jpg';
import thermalparkImg from '@/assets/thermalpark.jpg';
import xbionicImg from '@/assets/xbionic.jpg';

const activities = [
  { key: 'zitny_ostrov', image: zitnyOstrovImg },
  { key: 'golf', image: golfImg },
  { key: 'malkia', image: malkiaParkImg },
  { key: 'slovakia_ring', image: slovakiaRingImg },
  { key: 'thermalpark', image: thermalparkImg },
  { key: 'xbionic', image: xbionicImg },
] as const;

const Activities = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="activities" className="py-24 md:py-32" ref={ref}>
      <div className="px-8 md:px-16 lg:px-24">
        {/* Section Title */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center">
            {t('activities.title')}
          </h2>
        </div>

        {/* Two-column layout: image left, accordions right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Image that changes based on active accordion */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[4/5] overflow-hidden relative">
              {activities.map((activity, i) => (
                <img
                  key={activity.key}
                  src={activity.image}
                  alt={t(`activities.items.${activity.key}.title`)}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    activeIndex === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right: Accordions */}
          <div
            className={`flex flex-col justify-center transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {activities.map((activity, i) => {
              const isOpen = activeIndex === i;
              return (
                <div
                  key={activity.key}
                  className="border-t border-border last:border-b"
                >
                  <button
                    onMouseEnter={() => setActiveIndex(i)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-heading text-xl md:text-2xl lg:text-3xl group-hover:text-accent transition-colors">
                      {t(`activities.items.${activity.key}.title`)}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isOpen ? 'max-h-40 opacity-100 pb-6' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed pr-8">
                      {t(`activities.items.${activity.key}.description`)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Activities;
