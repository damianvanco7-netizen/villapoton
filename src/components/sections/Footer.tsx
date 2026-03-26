import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import logoGold from '@/assets/logo_villa_poton_gold.svg';

const Footer = () => {
  const { t } = useTranslation();

  const navLinks = [
    { label: 'O nás', href: '#welcome' },
    { label: 'Ubytovanie', href: '#experience' },
    { label: 'Reštaurácia', href: '#restaurant' },
    { label: 'Lokalita', href: '#activities' },
    { label: 'Kontakt', href: '#footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer" className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="px-8 md:px-16 lg:px-24">
        {/* Top: Logo + CTA */}
        <div className="mb-16">
          <img src={logoGold} alt="Villa Potoň" className="h-20 w-auto mb-12" />
        </div>

        <div className="mb-16 flex flex-col md:flex-row gap-12">
          <div className="md:w-1/5">
            <p className="font-heading text-xl md:text-2xl text-primary-foreground/80">Ideálne miesto na oddych a&nbsp;zážitky</p>
          </div>

          {/* Main grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl md:text-2xl mb-6">{t('footer.contact_title')}</h4>
            <ul className="space-y-4 font-body text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#C69B5E' }} />
                <a
                  href="https://maps.app.goo.gl/KrWii2fwuF2aaRVN6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-foreground hover:underline transition-colors"
                >
                  Horná Potôň 123<br />930 36, Slovensko
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" style={{ color: '#C69B5E' }} />
                <a href="tel:+421907808083" className="hover:text-primary-foreground transition-colors">
                  +421 907 808 083
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" style={{ color: '#C69B5E' }} />
                <a href="mailto:info@villapoton.sk" className="hover:text-primary-foreground transition-colors">
                  info@villapoton.sk
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading text-xl md:text-2xl mb-6">{t('footer.hours_title')}</h4>
            <ul className="space-y-4 font-body text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: '#C69B5E' }} />
                <div>
                  <span className="text-primary-foreground font-medium">Check-in</span>
                  <br />14:00 – 22:00
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: '#C69B5E' }} />
                <div>
                  <span className="text-primary-foreground font-medium">Check-out</span>
                  <br />07:00 – 10:00
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="shrink-0 mt-0.5" style={{ color: '#C69B5E' }} />
                <div>
                  <span className="text-primary-foreground font-medium">{t('footer.restaurant_hours')}</span>
                  <br />11:00 – 22:00
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-xl md:text-2xl mb-6">{t('footer.nav_title')}</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="inline-block w-fit relative font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors uppercase tracking-wide after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 after:bg-primary-foreground after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xl md:text-2xl mb-6">{t('footer.social_title')}</h4>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} Villa Potoň. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="font-body text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              {t('footer.cookies')}
            </a>
            <a href="#" className="font-body text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
