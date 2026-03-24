import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import heroImg from '@/assets/hero.jpg';

const Hero = () => {
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
        className={`absolute bottom-12 md:bottom-20 left-0 right-0 flex flex-col items-center text-center transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <p className="font-body text-base md:text-lg lg:text-xl tracking-[0.25em] uppercase text-white/80 mb-6 leading-relaxed">
          Ideálne miesto
          <br />
          na oddych a zážitky
        </p>
        <h1 className="font-heading font-normal text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.85] tracking-tight text-white whitespace-nowrap">
          VILLA POTÔŇ
        </h1>
      </div>
    </section>
  );
};

export default Hero;
