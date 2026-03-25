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

  useEffect(() => {
    const handleScroll = () => {
      // Show off-white bg only when content section reaches the header
      const contentSection = document.querySelector('.relative.z-10.bg-background');
      if (contentSection) {
        const rect = contentSection.getBoundingClientRect();
        // When the content section top is at or above ~80px (header height), switch to light
        setIsDark(rect.top > 80);
      } else {
        setIsDark(window.scrollY < 10);
      }
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${!isDark ? 'bg-background' : ''}`}>
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
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
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative text-sm font-body font-medium ${textActive} ${textHover} transition-colors tracking-wide uppercase after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1.5px] after:bottom-0 after:left-0 ${isDark ? 'after:bg-white' : 'after:bg-foreground'} after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100`}
            >
              {link.label}
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
            className="gold-gradient-bg text-white px-6 py-2.5 text-sm font-body font-semibold tracking-wider uppercase transition-opacity hover:opacity-90 shadow-md"
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
                key={link.label}
                href={link.href}
                onClick={(e) => { handleNavClick(e, link.href); setIsOpen(false); }}
                className="text-sm font-body font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase py-2"
              >
                {link.label}
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
