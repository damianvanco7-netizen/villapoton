import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';

const languages = [
  { code: 'sk', label: 'SK' },
  { code: 'hu', label: 'HU' },
  { code: 'en', label: 'EN' },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { key: 'about', href: '#experience' },
    { key: 'rooms', href: '#activities' },
    { key: 'restaurant', href: '#services' },
    { key: 'wellness', href: '#activities' },
    { key: 'events', href: '#events' },
    { key: 'contact', href: '#footer' },
  ];

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img src={logo} alt="Villa Potoň" className="h-12 w-auto" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              className="text-sm font-body font-medium text-foreground/70 hover:text-foreground transition-colors tracking-wide uppercase"
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
                      ? 'text-foreground font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {lang.label}
                </button>
                {i < languages.length - 1 && <span className="text-muted-foreground/50">|</span>}
              </span>
            ))}
          </div>
          <a
            href="#reservation"
            className="bg-primary text-primary-foreground px-6 py-2.5 text-sm font-body font-semibold tracking-wider uppercase hover:bg-primary/90 transition-colors"
          >
            {t('nav.book')}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-foreground"
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
    </header>
  );
};

export default Header;
