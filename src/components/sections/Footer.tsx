import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react';
import logo from '@/assets/logo.png';
import logoSvg from '@/assets/logo_villa_poton.svg';

const Footer = () => {
  const { t } = useTranslation();

  const navLinks = [
    { label: t('footer.nav.accommodation'), href: '#experience' },
    { label: t('footer.nav.restaurant'), href: '#services' },
    { label: t('footer.nav.gallery'), href: '#activities' },
    { label: t('footer.nav.activities'), href: '#activities' },
    { label: t('footer.nav.contact'), href: '#footer' },
  ];

  return (
    <footer id="footer" className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="px-8 md:px-16 lg:px-24">
        {/* Top: Logo + CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <img src={logoSvg} alt="Villa Potoň" className="h-14 w-auto brightness-0 invert" />
          <a
            href="#reservation"
            className="inline-block border border-primary-foreground text-primary-foreground px-8 py-3 text-sm font-heading tracking-wider uppercase hover:bg-primary-foreground hover:text-primary transition-colors"
          >
            {t('footer.cta')}
          </a>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-6">{t('footer.contact_title')}</h4>
            <ul className="space-y-4 font-body text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-accent shrink-0 mt-0.5" />
                <span>Horná Potôň 123<br />930 36, Slovensko</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-accent shrink-0" />
                <a href="tel:+421900000000" className="hover:text-primary-foreground transition-colors">
                  +421 900 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-accent shrink-0" />
                <a href="mailto:info@villapoton.sk" className="hover:text-primary-foreground transition-colors">
                  info@villapoton.sk
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="font-heading text-lg mb-6">{t('footer.hours_title')}</h4>
            <ul className="space-y-4 font-body text-sm text-primary-foreground/70">
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-primary-foreground font-medium">Check-in</span>
                  <br />14:00 – 22:00
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-primary-foreground font-medium">Check-out</span>
                  <br />07:00 – 10:00
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-primary-foreground font-medium">{t('footer.restaurant_hours')}</span>
                  <br />11:00 – 22:00
                </div>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg mb-6">{t('footer.nav_title')}</h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Location + Social */}
          <div>
            <h4 className="font-heading text-lg mb-6">{t('footer.location_title')}</h4>
            <a
              href="https://maps.google.com/?q=Horná+Potôň,+Slovakia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8"
            >
              <MapPin size={16} className="text-accent" />
              Horná Potôň, Slovakia →
            </a>

            <h4 className="font-heading text-lg mb-4">{t('footer.social_title')}</h4>
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
