import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import apartmanImg from '@/assets/apartman.jpg';
import restauraciaImg from '@/assets/restauracia.jpg';
import barImg from '@/assets/bar.jpg';

const accommodationAmenities = [
  'bathroom', 'aircon', 'wifi', 'nonsmoking', 'tv', 'parking',
] as const;

const restaurantAmenities = [
  'alacarte', 'fresh', 'quiet', 'breakfast', 'special',
] as const;

const barAmenities = [
  'drinks', 'cocktails', 'mixed', 'coffee',
] as const;

const cards = ['accommodation', 'restaurant', 'bar'] as const;

const cardImages: Record<string, string> = {
  accommodation: apartmanImg,
  restaurant: restauraciaImg,
  bar: barImg,
};

const cardAmenities: Record<string, readonly string[]> = {
  accommodation: accommodationAmenities,
  restaurant: restaurantAmenities,
  bar: barAmenities,
};

const Experience = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-2">
            {t('experience.title')}
          </h2>
          <p className="font-heading text-4xl md:text-5xl lg:text-6xl italic">
            {t('experience.titleLine2')}
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-32">
          {cards.map((key, i) => (
            <div
              key={key}
              className={`grid md:grid-cols-[1fr_1.8fr] gap-8 md:gap-12 items-start transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${(i + 1) * 200}ms` }}
            >
              {/* Left: Text content */}
              <div className="space-y-5">
                <h3 className="font-heading text-3xl md:text-4xl">
                  {t(`experience.${key}.title`)}
                </h3>
                <p className="font-body text-foreground text-sm leading-relaxed max-w-xs">
                  {t(`experience.${key}.description`)}
                </p>
                <a
                  href="#reservation"
                  className="inline-block font-body text-xs tracking-[0.15em] uppercase font-bold text-foreground underline underline-offset-4 hover:text-primary transition-colors"
                >
                  {t(`experience.${key}.cta`)}
                </a>

                {/* Amenities grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 pt-6">
                  {cardAmenities[key].map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2">
                      <span className="text-accent text-xs">✦</span>
                      <span className="font-body text-foreground text-sm">
                        {t(`experience.amenities.${amenity}`)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Image */}
              <div className="overflow-hidden h-[450px] md:h-[550px]">
                <img
                  src={cardImages[key]}
                  alt={t(`experience.${key}.title`)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
