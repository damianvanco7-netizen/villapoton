import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Events = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="events" className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
              {t('events.title')}
            </h2>
            <p className="font-body text-muted-foreground text-lg leading-relaxed mb-8">
              {t('events.description')}
            </p>
            <a
              href="https://www.booking.com/hotel/sk/villa-poton.sk.html?aid=356980&label=gog235jc-10CAsozQFCC3ZpbGxhLXBvdG9uSCJYA2jNAYgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgC2JKQzgbAAgHSAiRiMjRlMjJlNC02YTM3LTRmY2ItYTg2NS1iMTQyNGI3ZmUwZTLYAgHgAgE&sid=ab4d741c63e1cb6e1c342b9dcaa6ee95"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-primary text-foreground px-8 py-4 text-sm font-body font-semibold tracking-wider uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {t('events.cta')}
            </a>
          </div>

          {/* Image */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                Events Image
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
