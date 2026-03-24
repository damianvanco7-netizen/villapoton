import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer id="footer" className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Address */}
          <div>
            <img src={logo} alt="Villa Potoň" className="h-14 w-auto mb-6" />
            <p className="font-body text-muted-foreground text-sm leading-relaxed">
              {t('footer.address')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-lg mb-4">Villa Potoň</h4>
            <nav className="flex flex-col gap-2">
              {['about', 'rooms', 'restaurant', 'wellness', 'events', 'contact'].map((key) => (
                <a
                  key={key}
                  href={`#${key === 'about' ? 'experience' : key === 'rooms' ? 'activities' : key === 'restaurant' ? 'services' : key === 'contact' ? 'footer' : key}`}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(`nav.${key}`)}
                </a>
              ))}
            </nav>
          </div>

          {/* Map Placeholder */}
          <div>
            <div className="aspect-square bg-muted flex items-center justify-center">
              <span className="text-muted-foreground font-body text-xs tracking-widest uppercase">
                Map
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {new Date().getFullYear()} Villa Potoň. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.privacy')}
            </a>
            <a href="#" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
