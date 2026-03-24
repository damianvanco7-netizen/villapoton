import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import DecorativeSymbol from '@/components/DecorativeSymbol';
import { useRef, useEffect, useState } from 'react';
import { Bath, Wind, Wifi, CigaretteOff, Tv, Car, UtensilsCrossed, Leaf, Volume2, Coffee, Sparkles, Wine, GlassWater, Martini, Bean } from 'lucide-react';
import apartmanImg from '@/assets/apartman.jpg';
import restauraciaImg from '@/assets/restauracia.jpg';
import barImg from '@/assets/bar.jpg';
import decorativeSymbol from '@/assets/decorative-symbol.svg';
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

const useParallax = (speed = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      setOffset((progress - 0.5) * rect.height * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

const Experience = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="experience" ref={ref} className="relative overflow-hidden">
      {/* Decorative symbol — background layer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0">
        <img
          src={decorativeSymbol}
          alt=""
          aria-hidden="true"
          className="w-[600px] md:w-[800px] lg:w-[1000px] h-auto opacity-[0.06]"
          style={{ transform: 'rotate(-15deg)' }}
        />
      </div>

      {/* Section Header */}
      <div
        className={`relative z-10 text-center py-24 md:py-32 transition-all duration-700 ${
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

      {/* Cards — full-width, Bellevoire-style */}
      {cards.map((key, i) => (
        <ExperienceCard key={key} cardKey={key} index={i} isVisible={isVisible} isLast={i === cards.length - 1} />
      ))}
    </section>
  );
};

const ExperienceCard = ({ cardKey, index, isVisible, isLast }: { cardKey: string; index: number; isVisible: boolean; isLast: boolean }) => {
  const { t } = useTranslation();
  const { ref: parallaxRef, offset } = useParallax(0.15);

  return (
    <div
      className={`grid md:grid-cols-[1fr_2fr] ${isLast ? 'mb-0' : 'mb-24 md:mb-32'} transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index + 1) * 200}ms` }}
    >
      {/* Left: Text content */}
      <div className="flex flex-col justify-start px-8 md:px-16 lg:px-24 pt-16 md:pt-24 pb-16">
        <div className="space-y-6 max-w-sm">
          <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl">
            {t(`experience.${cardKey}.title`)}
          </h3>
          <p className="font-body text-foreground text-sm leading-relaxed">
            {t(`experience.${cardKey}.description`)}
          </p>
          <a
            href="#reservation"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t(`experience.${cardKey}.cta`)}
          </a>

          {/* Amenities grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4">
            {cardAmenities[cardKey].map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div key={amenity.key} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, hsl(37 38% 61% / 0.15), hsl(37 38% 61% / 0.05))' }}
                  >
                    <Icon className="text-accent shrink-0" size={20} strokeWidth={1.5} />
                  </div>
                  <span className="font-body text-foreground text-sm">
                    {t(`experience.amenities.${amenity.key}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Image — tall, with inner padding and parallax */}
      <div className="px-6 md:px-12 lg:px-16 mt-8 md:mt-16">
        <div ref={parallaxRef} className="overflow-hidden h-[70vh] md:h-[85vh]">
          <img
            src={cardImages[cardKey]}
            alt={t(`experience.${cardKey}.title`)}
            className="w-full h-[120%] object-cover will-change-transform"
            style={{ transform: `translateY(${offset}px)` }}
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
