import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import logoSvg from '@/assets/logo_villa_poton.svg';

const languages = [
  { code: 'sk', label: 'SK' },
  { code: 'hu', label: 'HU' },
  { code: 'en', label: 'EN' },
];

// Section IDs that have dark/image backgrounds where header text should be light
const darkSections = ['hero', 'quote-image'];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Start dark (hero)

  const navLinks = [
    { key: 'about', href: '#experience' },
    { key: 'rooms', href: '#activities' },
    { key: 'restaurant', href: '#services' },
    { key: 'wellness', href: '#activities' },
    { key: 'events', href: '#events' },
    { key: 'contact', href: '#footer' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const headerY = 60; // approximate middle of header
      const elements = document.elementsFromPoint(window.innerWidth / 2, headerY);
      
      const isOverDark = elements.some((el) => {
        const section = el.closest('[data-header-theme]');
        return section?.getAttribute('data-header-theme') === 'dark';
      });
      
      setIsDark(isOverDark);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  const textColor = isDark ? 'text-white' : 'text-foreground';
  const textMuted = isDark ? 'text-white/60' : 'text-foreground/50';
  const textHover = isDark ? 'hover:text-white' : 'hover:text-foreground';
  const textActive = isDark ? 'text-white/80' : 'text-foreground/70';
  const dividerColor = isDark ? 'text-white/40' : 'text-foreground/30';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Spacer for layout balance */}
        <div className="w-12" />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className={`text-sm font-body font-medium ${textActive} ${textHover} transition-colors tracking-wide uppercase`}
            >
              {t(`nav.${link.key}`)}
            </a>
          ))}
        </nav>

        {/* Language + CTA */}
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
          <a
            href="#reservation"
            className={`backdrop-blur-sm border px-6 py-2.5 text-sm font-body font-semibold tracking-wider uppercase transition-colors ${
              isDark
                ? 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                : 'bg-foreground/10 text-foreground border-foreground/20 hover:bg-foreground/20'
            }`}
          >
            {t('nav.book')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden ${textColor}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-in">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-body font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase py-2"
              >
                {t(`nav.${link.key}`)}
              </a>
            ))}
            <div className="flex items-center gap-2 py-2">
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
              href="#reservation"
              onClick={() => setIsOpen(false)}
              className="bg-primary text-primary-foreground px-6 py-3 text-sm font-body font-semibold tracking-wider uppercase text-center hover:bg-primary/90 transition-colors mt-2"
            >
              {t('nav.book')}
            </a>
          </nav>
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
