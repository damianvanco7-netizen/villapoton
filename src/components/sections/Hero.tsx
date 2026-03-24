import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroImg from '@/assets/hero.jpg';

const Hero = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section className="relative h-screen w-full overflow-hidden" ref={ref}>
      {/* Full-screen background image */}
      <img
        src={heroImg}
        alt="Villa Potoň"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Bottom-center text */}
      <div
        className={`absolute bottom-16 left-0 right-0 flex flex-col items-center text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="font-body text-xs md:text-sm tracking-[0.3em] uppercase text-white/80 mb-4">
          {t('hero.subtitle')}
        </p>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight text-white">
          VILLA POTÔŇ
        </h1>
      </div>
    </section>
  );
};

export default Hero;
