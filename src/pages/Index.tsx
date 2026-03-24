import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Welcome from '@/components/sections/Welcome';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Quote from '@/components/sections/Quote';
import Activities from '@/components/sections/Activities';
import Reviews from '@/components/sections/Reviews';
import BookingCta from '@/components/sections/BookingCta';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      {/* Spacer for fixed hero */}
      <div className="h-screen" />
      {/* Content scrolls over hero */}
      <div className="relative z-10 bg-background">
        <Welcome />
        <Experience />
        <Services />
        <Quote />
        <Activities />
        <Reviews />
        <BookingCta />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
