import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import DecorativeSymbol from '@/components/DecorativeSymbol';
import { Bath, Wind, Wifi, CigaretteOff, Tv, Car, UtensilsCrossed, Pizza, Volume2, Coffee, Sparkles, Leaf, Star, Flame, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import apartmanImg from '@/assets/apartman.jpg';
import restauraciaImg from '@/assets/restauracia.jpg';
import barImg from '@/assets/pizza.jpg';

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
  { key: 'pizza', icon: Pizza },
  { key: 'quiet', icon: Volume2 },
  { key: 'breakfast', icon: Coffee },
  { key: 'special', icon: Sparkles },
];

const barAmenities: AmenityConfig[] = [
  { key: 'ingredients', icon: Leaf },
  { key: 'authentic', icon: Star },
  { key: 'traditional', icon: Flame },
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
    <section id="experience" ref={ref} className="relative overflow-hidden">
      <DecorativeSymbol rotation={22} position="top-16 right-16" size="w-[600px] md:w-[800px] lg:w-[1000px]" />
      <DecorativeSymbol rotation={-15} position="bottom-1/3 left-8" size="w-[600px] md:w-[800px] lg:w-[1000px]" />
      <DecorativeSymbol rotation={35} position="bottom-16 right-1/4" size="w-[600px] md:w-[800px] lg:w-[1000px]" />

      {/* Section Header */}
      <div
        className={`relative z-10 text-center py-24 md:py-32 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl mb-2 px-6 md:px-0">
          Zažite atmosféru skutočného{' '}<span className="md:inline">oddychu,</span>
        </h2>
        <p className="font-heading text-3xl md:text-5xl lg:text-6xl italic mb-6 px-6 md:px-0">
          kde každý moment patrí&nbsp;vám
        </p>
        <p className="font-body text-sm md:text-base text-foreground/60 tracking-wide max-w-xs md:max-w-md mx-auto px-6 md:px-0 whitespace-pre-line">
          {t('experience.subtitle')}
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
  const { containerRef, imgRef } = useParallax(0.35);
  const isMobile = useIsMobile();

  const bookingUrl = 'https://www.booking.com/hotel/sk/villa-poton.sk.html?aid=356980&label=gog235jc-10CAsozQFCC3ZpbGxhLXBvdG9uSCJYA2jNAYgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgC2JKQzgbAAgHSAiRiMjRlMjJlNC02YTM3LTRmY2ItYTg2NS1iMTQyNGI3ZmUwZTLYAgHgAgE&sid=ab4d741c63e1cb6e1c342b9dcaa6ee95';

  const getCtaHref = () => {
    if (cardKey === 'accommodation') return bookingUrl;
    return isMobile ? 'tel:+421907808083' : '#footer';
  };

  const isExternal = cardKey === 'accommodation';

  return (
    <div
      id={cardKey === 'restaurant' ? 'restaurant' : undefined}
      className={`grid md:grid-cols-[1fr_2fr] ${isLast ? 'mb-0' : 'mb-24 md:mb-32'} transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
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
            href={getCtaHref()}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t(`experience.${cardKey}.cta`)}
          </a>

          {/* Opening hours for restaurant */}
          {cardKey === 'restaurant' && (
            <div className="flex items-start gap-3 pt-2">
              <Clock size={18} className="shrink-0 mt-0.5" style={{ color: '#C69B5E' }} />
              <div className="font-body text-sm">
                <span className="font-medium text-foreground">{t('experience.restaurant.hours_label')}</span>
                <br />
                <span className="text-foreground/70">{t('experience.restaurant.hours_time')}</span>
              </div>
            </div>
          )}

          {/* Amenities grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 pt-4">
            {cardAmenities[cardKey].map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div key={amenity.key} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(243,211,153,0.15), rgba(186,142,81,0.08))' }}
                  >
                    <Icon className="shrink-0" size={20} strokeWidth={1.5} style={{ color: '#C69B5E' }} />
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
        <div ref={containerRef} className="overflow-hidden h-[70vh] md:h-[85vh]">
          <img
            ref={imgRef}
            src={cardImages[cardKey]}
            alt={t(`experience.${cardKey}.title`)}
            className="w-full h-[120%] object-cover will-change-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
