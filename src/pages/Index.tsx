import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Experience from '@/components/sections/Experience';
import Services from '@/components/sections/Services';
import Quote from '@/components/sections/Quote';
import Activities from '@/components/sections/Activities';
import Events from '@/components/sections/Events';
import Reservation from '@/components/sections/Reservation';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Experience />
      <Services />
      <Quote />
      <Activities />
      <Events />
      <Reservation />
      <Footer />
    </div>
  );
};

export default Index;
