import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useRef, useEffect, useState } from 'react';
import welcomeImg from '@/assets/welcome.jpg';
import DecorativeSymbol from '@/components/DecorativeSymbol';

const useParallax = (speed = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = (windowH - rect.top) / (windowH + rect.height);
      setOffset((progress - 0.5) * rect.height * speed);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return { ref, offset };
};

const Welcome = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: parallaxRef, offset } = useParallax(0.15);

  return (
    <section className="py-24 md:py-32 relative overflow-hidden" ref={ref}>
      <DecorativeSymbol rotation={25} position="top-8 right-8" size="w-[400px] md:w-[600px]" />
      {/* Staggered headline */}
      <div
        className={`container mx-auto px-6 mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
            <span className="block">Welcome to Villa Potôň</span>
            <span className="block pl-12 md:pl-24">Your Elegant Retreat</span>
            <span className="block pl-24 md:pl-48 italic">in the Hearth of Nature</span>
          </h2>
        </div>

        {/* Description */}
        <p className="font-body text-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-center mt-8">
          We are a modern pension with restaurant, located in Horná Potôň,
          35km from Bratislava, 10km from Dunajská Streda. Our goal is to provide
          quality services so you will leave satisfied and happy.
          We will be happy, if you honor us with your visit!
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <a
            href="#experience"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            Zistiť viac
          </a>
        </div>
      </div>

      {/* Large 16:9 image aligned left with parallax */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-[90%] md:w-[85%]">
          <div ref={parallaxRef} className="aspect-video overflow-hidden">
            <img
              src={welcomeImg}
              alt="Villa Potoň Welcome"
              className="w-full h-[120%] object-cover will-change-transform"
              style={{ transform: `translateY(${offset}px)` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
