import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef, useState, useEffect } from 'react';
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

const useRowAnimation = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
};

const ServiceRow = ({ keyName, image, index }: { keyName: string; image: string; index: number }) => {
  const { t } = useTranslation();
  const { ref, isVisible } = useRowAnimation(0.2);

  return (
    <div ref={ref}>
      <div className="border-t border-primary-foreground/20" />
      <div
        className="grid grid-cols-1 md:grid-cols-[auto_1fr_1.2fr_1fr] gap-6 md:gap-8 items-start py-10 md:py-14 transition-all duration-700 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        <span className="font-body text-sm text-primary-foreground/50 pt-1">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl">
          {t(`services.items.${keyName}.title`)}
        </h3>
        <p className="font-body text-primary-foreground/80 text-sm leading-relaxed max-w-md">
          {t(`services.items.${keyName}.description`)}
        </p>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={t(`services.items.${keyName}.title`)}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="pt-24 md:pt-32 pb-24 md:pb-32 mt-24 md:mt-32 bg-primary text-primary-foreground" ref={ref}>
      <div className="px-8 md:px-16 lg:px-24">
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

        <div>
          {services.map(({ key, image }, i) => (
            <ServiceRow key={key} keyName={key} image={image} index={i} />
          ))}
          <div className="border-t border-primary-foreground/20" />
        </div>
      </div>
    </section>
  );
};

export default Services;
