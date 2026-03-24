import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Bath, Wind, Wifi, CigaretteOff, Tv, Car, UtensilsCrossed, Leaf, Volume2, Coffee, Sparkles, Wine, GlassWater, Martini, Bean } from 'lucide-react';
import apartmanImg from '@/assets/apartman.jpg';
import restauraciaImg from '@/assets/restauracia.jpg';
import barImg from '@/assets/bar.jpg';
import type { LucideIcon } from 'lucide-react';

type AmenityConfig = { key: string; icon: LucideIcon };

const accommodationAmenities: AmenityConfig[] = [
  { key: 'bathroom', icon: Bath },
  { key: 'aircon', icon: Wind },
  { key: 'wifi', icon: Wifi },
  { key: 'nonsmoking', icon: CigaretteOff },
  { key: 'tv', icon: Tv },
  { key: 'parking', icon: Car },
];

const restaurantAmenities: AmenityConfig[] = [
  { key: 'alacarte', icon: UtensilsCrossed },
  { key: 'fresh', icon: Leaf },
  { key: 'quiet', icon: Volume2 },
  { key: 'breakfast', icon: Coffee },
  { key: 'special', icon: Sparkles },
];

const barAmenities: AmenityConfig[] = [
  { key: 'drinks', icon: Wine },
  { key: 'cocktails', icon: Martini },
  { key: 'mixed', icon: GlassWater },
  { key: 'coffee', icon: Bean },
];

const cards = ['accommodation', 'restaurant', 'bar'] as const;

const cardImages: Record<string, string> = {
  accommodation: apartmanImg,
  restaurant: restauraciaImg,
  bar: barImg,
};

const cardAmenities: Record<string, AmenityConfig[]> = {
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
                  className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary/90 transition-colors"
                >
                  {t(`experience.${key}.cta`)}
                </a>

                {/* Amenities grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 pt-6">
                  {cardAmenities[key].map((amenity) => {
                    const Icon = amenity.icon;
                    return (
                      <div key={amenity.key} className="flex items-center gap-2">
                        <Icon className="text-accent" size={14} strokeWidth={1.5} />
                        <span className="font-body text-foreground text-sm">
                          {t(`experience.amenities.${amenity.key}`)}
                        </span>
                      </div>
                    );
                  })}
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
