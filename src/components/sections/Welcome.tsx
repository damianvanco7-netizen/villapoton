import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import welcomeImg from '@/assets/welcome.jpg';

const Welcome = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 md:py-32" ref={ref}>
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
        <p className="font-body text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl mx-auto text-center mt-8">
          We are a modern pension with restaurant, located in Horná Potôň,
          35km from Bratislava, 10km from Dunajská Streda. Our goal is to provide
          quality services so you will leave satisfied and happy.
          We will be happy, if you honor us with your visit!
        </p>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <a
            href="#experience"
            className="inline-block border-2 border-foreground text-foreground px-8 py-3 text-sm font-body font-semibold tracking-wider uppercase hover:bg-foreground hover:text-background transition-colors"
          >
            Zistiť viac
          </a>
        </div>
      </div>

      {/* Large 16:9 image aligned left */}
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="w-[90%] md:w-[85%]">
          <div className="aspect-video overflow-hidden">
            <img
              src={welcomeImg}
              alt="Villa Potoň Welcome"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
