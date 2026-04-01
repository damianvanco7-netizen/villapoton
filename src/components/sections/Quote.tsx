import { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DecorativeSymbol from '@/components/DecorativeSymbol';
import useEmblaCarousel from 'embla-carousel-react';
import quote1 from '@/assets/quote/quote1.jpg';
import quote2 from '@/assets/quote/quote2.jpg';
import quote3 from '@/assets/quote/quote3.jpg';
import quote4 from '@/assets/quote/quote4.jpg';
import quote5 from '@/assets/quote/quote5.jpg';
import quote6 from '@/assets/quote/quote6.jpg';

const images = [quote1, quote2, quote3, quote4, quote5, quote6];

const Quote = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    slidesToScroll: 1,
    duration: 20,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <DecorativeSymbol rotation={-30} position="bottom-16 left-8" size="w-[600px] md:w-[800px] lg:w-[1000px]" />
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
            href="https://www.booking.com/hotel/sk/villa-poton.sk.html?aid=356980&label=gog235jc-10CAsozQFCC3ZpbGxhLXBvdG9uSCJYA2jNAYgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgC2JKQzgbAAgHSAiRiMjRlMjJlNC02YTM3LTRmY2ItYTg2NS1iMTQyNGI3ZmUwZTLYAgHgAgE&sid=ab4d741c63e1cb6e1c342b9dcaa6ee95"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
          >
            {t('quote.cta')}
          </a>
        </div>
      </div>

      {/* Carousel with room images — edge to edge */}
      <div className="relative pb-24 md:pb-32">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((img, i) => {
              const isActive = selectedIndex === i;
              return (
                <div
                  key={i}
                  className="min-w-0 flex-[0_0_80%] md:flex-[0_0_33.333%] px-0.5 md:px-1 flex items-center justify-center"
                >
                  <div
                    className={`w-full overflow-hidden transition-transform duration-500 ease-in-out ${
                      isActive ? 'scale-100' : 'scale-[0.85]'
                    }`}
                    style={{ aspectRatio: '3/4' }}
                  >
                    <img
                      src={img}
                      alt={`Villa Potoň room ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation arrows — same style as Reviews */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Quote;
