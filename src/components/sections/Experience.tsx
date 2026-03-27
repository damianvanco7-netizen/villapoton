import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useParallax } from '@/hooks/useParallax';
import DecorativeSymbol from '@/components/DecorativeSymbol';
import { Bath, Wind, Wifi, Car, UtensilsCrossed, Pizza, Coffee, Leaf, Flame, Phone, CookingPot } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import apartmanImg from '@/assets/accommodation.jpg';
import restauraciaImg from '@/assets/restauracia.jpg';
import barImg from '@/assets/pizza.jpg';

import type { LucideIcon } from 'lucide-react';

type AmenityConfig = { key: string; icon: LucideIcon };

const accommodationAmenities: AmenityConfig[] = [
  { key: 'bathroom', icon: Bath },
  { key: 'aircon', icon: Wind },
  { key: 'wifi', icon: Wifi },
  { key: 'parking', icon: Car },
];

const restaurantAmenities: AmenityConfig[] = [
  { key: 'alacarte', icon: UtensilsCrossed },
  { key: 'pizza', icon: Pizza },
  { key: 'homemade', icon: CookingPot },
  { key: 'breakfast', icon: Coffee },
];

const barAmenities: AmenityConfig[] = [
  { key: 'ingredients', icon: Leaf },
  { key: 'italian_oven', icon: Flame },
  { key: 'traditional', icon: CookingPot },
  { key: 'airy_dough', icon: Wind },
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

      {/* Spacer for top padding */}
      <div className="pt-12 md:pt-16" />

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
          {cardKey === 'accommodation' ? (
            <a
              href={getCtaHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              {t(`experience.${cardKey}.cta`)}
            </a>
          ) : (
            <a
              href={getCtaHref()}
              target={undefined}
              rel={undefined}
              className="inline-flex items-center gap-2 border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              <Phone size={16} />
              {t(`experience.${cardKey}.cta`)}
            </a>
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
