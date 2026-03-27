import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Clock } from 'lucide-react';
import logoSvg from '@/assets/logo_villa_poton.svg';

const languages = [
  { code: 'sk', label: 'SK' },
  { code: 'hu', label: 'HU' },
  { code: 'en', label: 'EN' },
];

const useIsRestaurantOpen = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const check = () => {
      const now = new Date();
      const totalMin = now.getHours() * 60 + now.getMinutes();
      setOpen(totalMin >= 660 && totalMin < 1320); // 11:00-22:00
    };
    check();
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, []);
  return open;
};

const OpenClosedBadge = ({ isOpen, isDark, label }: { isOpen: boolean; isDark: boolean; label: string }) => (
  <div className="flex items-center gap-1.5">
    <span className="relative flex h-2.5 w-2.5">
      {isOpen && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      )}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOpen ? 'bg-primary' : 'bg-red-500'}`} />
    </span>
    <span className={`text-xs font-body font-medium ${isDark ? 'text-white/70' : 'text-foreground/60'}`}>
      {label}
    </span>
  </div>
);

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const isRestaurantOpen = useIsRestaurantOpen();

  const navLinks = [
    { key: 'about', href: '#welcome' },
    { key: 'accommodation', href: '#experience' },
    { key: 'restaurant', href: '#restaurant' },
    { key: 'location', href: '#activities' },
    { key: 'contact', href: '#footer' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    let rafId = 0;
    let ticking = false;
    let cachedEl: Element | null = null;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(() => {
        ticking = false;
        if (!cachedEl) cachedEl = document.querySelector('.relative.z-10.bg-background');
        let next: boolean;
        if (cachedEl) {
          const rect = cachedEl.getBoundingClientRect();
          next = rect.top > 80;
        } else {
          next = window.scrollY < 10;
        }
        setIsDark((prev) => (prev === next ? prev : next));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const textColor = isDark ? 'text-white' : 'text-foreground';
  const textMuted = isDark ? 'text-white/60' : 'text-foreground/50';
  const textHover = isDark ? 'hover:text-white' : 'hover:text-foreground';
  const textActive = isDark ? 'text-white/80' : 'text-foreground/70';
  const dividerColor = isDark ? 'text-white/40' : 'text-foreground/30';

  const statusLabel = isRestaurantOpen ? t('header.open') : t('header.closed');

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${!isDark ? 'bg-background' : ''}`}>
      <div className="px-8 md:px-16 lg:px-24 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="shrink-0">
          <img
            src={logoSvg}
            alt="Villa Potoň"
            className="h-14 w-auto transition-all duration-300"
            style={isDark ? { filter: 'brightness(0) invert(1)' } : { filter: 'brightness(0)' }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-baseline gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-body font-medium ${textActive} ${textHover} transition-colors tracking-wide uppercase after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 ${isDark ? 'after:bg-white' : 'after:bg-foreground'} after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100`}
            >
              {t(`header_nav.${link.key}`)}
            </a>
          ))}
        </nav>

        {/* Open/Closed + Language + CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-1 text-sm font-body">
            {languages.map((lang, i) => (
              <span key={lang.code} className="flex items-center">
                <button
                  onClick={() => handleLangChange(lang.code)}
                  className={`px-1 transition-colors ${
                    i18n.language === lang.code
                      ? `${textColor} font-semibold`
                      : `${textMuted} ${textHover}`
                  }`}
                >
                  {lang.label}
                </button>
                {i < languages.length - 1 && <span className={dividerColor}>|</span>}
              </span>
            ))}
          </div>
          <div className={`flex items-center px-6 py-2.5 ${isDark ? 'bg-white/[0.03]' : 'bg-primary/[0.03]'}`}>
            <OpenClosedBadge isOpen={isRestaurantOpen} isDark={isDark} label={statusLabel} />
          </div>
          <a
            href="https://www.booking.com/hotel/sk/villa-poton.sk.html?aid=356980&label=gog235jc-10CAsozQFCC3ZpbGxhLXBvdG9uSCJYA2jNAYgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgC2JKQzgbAAgHSAiRiMjRlMjJlNC02YTM3LTRmY2ItYTg2NS1iMTQyNGI3ZmUwZTLYAgHgAgE&sid=ab4d741c63e1cb6e1c342b9dcaa6ee95"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient-bg text-white px-6 py-2.5 text-sm font-body font-semibold tracking-wider uppercase transition-opacity hover:opacity-90 shadow-md"
          >
            {t('nav.book')}
          </a>
        </div>

        {/* Mobile: Open indicator + hamburger */}
        <div className="flex lg:hidden items-center gap-4">
          <OpenClosedBadge isOpen={isRestaurantOpen} isDark={isDark} label={statusLabel} />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`${textColor}`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — fullscreen */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-0 bg-background z-40 animate-fade-in flex flex-col">
          {/* Close button */}
          <div className="px-8 py-4 flex items-center justify-between">
            <a href="#" className="shrink-0">
              <img
                src={logoSvg}
                alt="Villa Potoň"
                className="h-14 w-auto"
                style={{ filter: 'brightness(0)' }}
              />
            </a>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-foreground"
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1} />
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={(e) => { handleNavClick(e, link.href); setIsMenuOpen(false); }}
                className="text-2xl font-heading text-foreground hover:text-foreground/70 transition-colors tracking-wide uppercase"
              >
                {t(`header_nav.${link.key}`)}
              </a>
            ))}
          </nav>
          <div className="px-8 pb-12 space-y-6">
            {/* Opening hours in mobile menu */}
            <div className="flex items-center gap-3">
              <OpenClosedBadge isOpen={isRestaurantOpen} isDark={false} label={statusLabel} />
            </div>
            <div className="flex items-start gap-3">
              <Clock size={18} className="shrink-0 mt-0.5" style={{ color: '#C69B5E' }} />
              <div className="font-body text-sm">
                <span className="font-medium text-foreground">{t('experience.restaurant.hours_label')}</span>
                <br />
                <span className="text-foreground/70">{t('experience.restaurant.hours_time')}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code)}
                  className={`px-2 py-1 text-sm font-body ${
                    i18n.language === lang.code
                      ? 'text-foreground font-semibold border-b-2 border-accent'
                      : 'text-muted-foreground'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <a
              href="https://www.booking.com/hotel/sk/villa-poton.sk.html?aid=356980&label=gog235jc-10CAsozQFCC3ZpbGxhLXBvdG9uSCJYA2jNAYgBAZgBM7gBB8gBDNgBA-gBAfgBAYgCAagCAbgC2JKQzgbAAgHSAiRiMjRlMjJlNC02YTM3LTRmY2ItYTg2NS1iMTQyNGI3ZmUwZTLYAgHgAgE&sid=ab4d741c63e1cb6e1c342b9dcaa6ee95"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="block gold-gradient-bg text-white px-6 py-4 text-sm font-body font-semibold tracking-wider uppercase text-center hover:opacity-90 transition-opacity"
            >
              {t('nav.book')}
            </a>
          </div>
        </div>
      )}
      {/* Horizontal divider */}
      <div className="px-8 md:px-16 lg:px-24">
        <div className={`border-b transition-colors duration-300 ${isDark ? 'border-white/20' : 'border-foreground/15'}`} />
      </div>
    </header>
  );
};

export default Header;
