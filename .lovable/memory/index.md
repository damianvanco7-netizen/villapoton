Brand guidelines and design decisions for Villa Potoň website.

## Colors (HSL in CSS vars)
- Background (#FFFBF3): --background: 39 100% 97.6%
- Text (#00130E): --foreground: 163 100% 3.9%
- Primary/Buttons (#00573E): --primary: 157 100% 17.1%
- Gold accent (#C5A572): --accent: 37 38% 61%
- Gold gradient: #F3D399 → #BF9355 → #FFE2AB → #BA8E51 → #FFE2AB → #C69B5E → #FFE2AB → #D8B175

## Typography
- Headings: Instrument Serif (Google Fonts)
- Body: Manrope (Google Fonts)

## Languages
- Slovak (default), Hungarian, English
- i18n via react-i18next, files in src/i18n/locales/

## Logo
- src/assets/logo_villa_poton.svg (dark version)
- src/assets/logo_villa_poton_gold.svg (gold gradient, used in footer)

## Design Tokens
- primary = green buttons/CTAs
- accent = gold highlights, icons, decorative elements
- gold-gradient-bg = utility class for gold gradient backgrounds (header CTA)
- muted = placeholder backgrounds, subtle UI
- foreground = main text color
