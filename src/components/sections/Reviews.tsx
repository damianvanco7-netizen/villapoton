import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import bookingLogo from '@/assets/booking_logo.png';

const reviews = [
  {
    name: 'Viktória',
    country: 'sk',
    flag: '🇸🇰',
    text: '„Ubytovanie bolo pekné čisté, s elektrickými roletami ktoré bolo možné zatiahnuť na úplnú tmu čiže som sa skvele vyspala. Na izbe bola klimatizácia aj napriek tomu že bola izbička malá, milo ma to prekvapilo, nečakala som to. Personál bol veľmi..."',
  },
  {
    name: 'Orru',
    country: 'it',
    flag: '🇮🇹',
    text: 'Toto miesto sme si vybrali kvôli krátkej vzdialenosti od Šamorína na preteky a bola to skvelá voľba. Izby boli čisté, postele veľmi pohodlné. jedli sme v reštaurácii, pomer kvalita/cena by som povedal výborný, pivo bolo veľmi dobré. Raňajky sú podávané v salóniku reštaurácie, teplé aj studené, veľmi ochotný personál, pobyt odporúčam.',
  },
  {
    name: 'Radoslaw',
    country: 'pl',
    flag: '🇵🇱',
    text: '"Páčilo sa mi všetko, obsluha, čistota, lokalita a najlepšie boli jedlá v reštaurácii, ak pôjdem do týchto oblastí, pôjdem len tam."',
  },
  {
    name: 'Henrich',
    country: 'sk',
    flag: '🇸🇰',
    text: '„Všetko bolo úžasné. Personál maximálne ústretový, chutná kuchyňa. Všetko nové, čisté, voňavé. Máme v pláne sa vrátiť."',
  },
  {
    name: 'Krisztina',
    country: 'hu',
    flag: '🇭🇺',
    text: '„Ubytovanie je veľmi pekné s jedinečným moderným dizajnom. Personál a majitelia sú veľmi milí a atmosféra je rodinná."',
  },
  {
    name: 'Dominika',
    country: 'pl',
    flag: '🇵🇱',
    text: '„Veľmi chutné raňajky a káva tiež. Výhodou je poloha v blízkosti trate Slovakiaring. Veľmi pekné služby a priateľskí majitelia. Vynikajúcu kačicu s kroketami odporúčam na obed alebo večeru. Ďakujem pekne :-)"',
  },
];

const countryLabels: Record<string, string> = {
  sk: 'Slovensko',
  it: 'Taliansko',
  pl: 'Poľsko',
  hu: 'Maďarsko',
};

const getInitial = (name: string) => name.charAt(0).toUpperCase();

const Reviews = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const manualTimeout = useRef<ReturnType<typeof setTimeout>>();

  const totalReviews = reviews.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  const handleManualNext = () => {
    setIsManual(true);
    next();
    clearTimeout(manualTimeout.current);
    manualTimeout.current = setTimeout(() => setIsManual(false), 5000);
  };

  const handleManualPrev = () => {
    setIsManual(true);
    prev();
    clearTimeout(manualTimeout.current);
    manualTimeout.current = setTimeout(() => setIsManual(false), 5000);
  };

  useEffect(() => {
    if (isHovered || isManual) return;
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [isHovered, isManual, next]);

  const getVisibleReviews = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % totalReviews]);
    }
    return visible;
  };

  const visibleReviews = getVisibleReviews();

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 40 : -40,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -40 : 40,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="py-24 md:py-32" ref={ref}>
      <div className="px-8 md:px-16 lg:px-24">
        {/* Title */}
        <div
          className={`text-center mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">
            {t('reviews.title_line1')}<br />
            <em>{t('reviews.title_line2')}</em>
          </h2>
        </div>

        {/* Rating + Booking badge */}
        <div
          className={`flex items-center justify-center gap-3 mb-16 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={bookingLogo} alt="Booking.com" className="w-full h-full object-cover" />
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Star className="w-5 h-5 text-primary" />
          </div>
          <span className="font-body text-lg font-medium text-foreground">
            8,7 - {t('reviews.rating_label')}
          </span>
        </div>

        {/* Reviews carousel */}
        <div
          className={`transition-all duration-700 delay-200 overflow-hidden ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="grid md:grid-cols-3 gap-0"
            >
              {visibleReviews.map((review, i) => (
                <div
                  key={`${review.name}-${i}`}
                  className={`p-8 md:p-10 ${
                    i < 2 ? 'border-r border-border' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-heading text-sm text-primary">
                        {getInitial(review.name)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl">
                        {review.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {review.flag} {countryLabels[review.country]}
                      </p>
                    </div>
                  </div>
                  <p className="font-body text-sm md:text-base text-foreground leading-relaxed mt-4">
                    {review.text}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation arrows */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={handleManualPrev}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={handleManualNext}
            className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
