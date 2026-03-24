Brand guidelines and design decisions for Villa Potoň website.

## Colors (HSL in CSS vars)
- Background (#FFFBF3): --background: 39 100% 97.6%
- Text (#00130E): --foreground: 163 100% 3.9%
- Primary/Buttons (#02563E): --primary: 155 96% 17.3%
- Gold accent (#C5A572): --accent: 37 38% 61%
- Body text color = foreground (dark green), NOT muted

## Typography
- Headings: Instrument Serif (Google Fonts)
- Body: Manrope (Google Fonts)

## Languages
- Slovak (default), Hungarian, English
- i18n via react-i18next, files in src/i18n/locales/

## Logo
- src/assets/logo.png (contains gold color)

## Design Rules
- Buttons on off-white background: green (primary) or gold (accent)
- Body text always uses foreground color (dark green), never muted
- primary = green buttons/CTAs
- accent = gold highlights, icons, decorative elements
