import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
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
  const [isHovered, setIsHovered] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const manualTimeout = useRef<ReturnType<typeof setTimeout>>();

  const total = services.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

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
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isHovered, isManual, next]);

  const current = services[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  };

  return (
    <section
      id="services"
      className="pt-24 md:pt-32 pb-24 md:pb-32 mt-24 md:mt-32 bg-primary text-primary-foreground"
      ref={ref}
    >
      <div className="px-8 md:px-16 lg:px-24">
        {/* Title */}
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

        {/* Carousel */}
        <div
          className={`transition-all duration-700 delay-200 ${
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
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center"
            >
              {/* Image left */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={current.image}
                  alt={t(`services.items.${current.key}.title`)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text right */}
              <div className="flex flex-col justify-center">
                <span className="font-body text-sm text-primary-foreground/50 mb-4">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-6">
                  {t(`services.items.${current.key}.title`)}
                </h3>
                <p className="font-body text-primary-foreground/80 text-sm md:text-base leading-relaxed max-w-md">
                  {t(`services.items.${current.key}.description`)}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={handleManualPrev}
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-primary-foreground" />
            </button>
            <button
              onClick={handleManualNext}
              className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:border-primary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
