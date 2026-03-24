import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import room1 from '@/assets/rooms/room1.png';
import room2 from '@/assets/rooms/room2.png';
import room3 from '@/assets/rooms/room3.png';
import room4 from '@/assets/rooms/room4.png';
import room5 from '@/assets/rooms/room5.png';

const images = [room1, room2, room3, room4, room5];

const Quote = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Track selected index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Subscribe to select event
  useCallback(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  // Use effect for subscription
  if (emblaApi) {
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }

  return (
    <section ref={ref}>
      {/* Text block */}
      <div className="py-24 md:py-32 px-8 md:px-16 lg:px-24">
        <div
          className={`text-center max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl leading-snug mb-8">
            {t('quote.heading')}
            <em className="italic"> {t('quote.headingItalic')}</em>
            {t('quote.headingEnd')}
          </h2>
          <p className="font-body text-foreground/70 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
            {t('quote.subtitle')}
          </p>
          <a
            href="#reservation"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t('quote.cta')}
          </a>
        </div>
      </div>

      {/* Carousel with room images */}
      <div className="relative px-8 md:px-16 lg:px-24 pb-24 md:pb-32">
        {/* Carousel */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((img, i) => (
              <div
                key={i}
                className="flex-[0_0_60%] md:flex-[0_0_50%] min-w-0 px-3 transition-all duration-500"
                style={{
                  opacity: selectedIndex === i ? 1 : 0.4,
                  transform: selectedIndex === i ? 'scale(1)' : 'scale(0.9)',
                }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={img}
                    alt={`Villa Potoň room ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-foreground/30 text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors z-10"
          aria-label="Previous"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-foreground/30 text-foreground/70 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors z-10"
          aria-label="Next"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Quote;
