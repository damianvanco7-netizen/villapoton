import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import ranajkyImg from '@/assets/ranajky.jpg';
import terasaImg from '@/assets/terasa.jpg';
import parkoviskoImg from '@/assets/parkovisko.png';
import izbyImg from '@/assets/izby_pre_ludi_s_telesnym_postihnutim.jpg';

const services = [
  { key: 'breakfast', image: ranajkyImg },
  { key: 'terrace', image: terasaImg },
  { key: 'parking', image: parkoviskoImg },
  { key: 'accessibility', image: izbyImg },
] as const;

const Services = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = services.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const current = services[currentIndex];
  const nextCard = services[(currentIndex + 1) % total];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section
      id="services"
      className="pt-24 md:pt-32 pb-24 md:pb-32 mt-24 md:mt-32 bg-primary text-primary-foreground overflow-hidden"
      ref={ref}
    >
      <div className="px-8 md:px-16 lg:px-24">
        {/* Header — centered */}
        <div
          className={`text-center mb-16 md:mb-24 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl">
            {t('services.titleLine1')}
          </h2>
          <p className="font-heading text-4xl md:text-5xl lg:text-6xl italic">
            {t('services.titleLine2')}
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Top line */}
            <div className="border-t border-primary-foreground/20 mx-8 md:mx-16 lg:mx-24" />

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 py-10 md:py-14">
              {/* Left: text */}
              <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <span className="font-body text-sm text-primary-foreground/50 mb-3">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-4">
                  {t(`services.items.${current.key}.title`)}
                </h3>
                <p className="font-body text-primary-foreground/80 text-sm leading-relaxed max-w-md mb-8">
                  {t(`services.items.${current.key}.description`)}
                </p>

                {/* Arrow buttons */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:border-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary-foreground" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:border-primary-foreground transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-primary-foreground" />
                  </button>
                </div>
              </div>

              {/* Center: main image */}
              <div className="px-6 md:px-0 md:pr-6 mt-8 md:mt-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={current.image}
                    alt={t(`services.items.${current.key}.title`)}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: peeking next image — same height as main, clipped on right */}
              <div className="hidden md:block overflow-hidden">
                <img
                  src={nextCard.image}
                  alt={t(`services.items.${nextCard.key}.title`)}
                  className="h-full w-auto max-w-none object-cover"
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom line */}
        <div className="border-t border-primary-foreground/20 mx-8 md:mx-16 lg:mx-24" />
      </div>
    </section>
  );
};

export default Services;
