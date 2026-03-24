

# Villa Potoň -- Website Build Plan

## Overview
Single-page website for Villa Potoň (Penzion - Reštaurácia) with 3-language support (SK, HU, EN), custom typography, and elegant styling inspired by bellevoire.framer.website.

## Brand System
- Background: `#FFFBF3`, Text: `#00130E`, Buttons: `#02563E`, Gold accent: `#C5A572`
- Headings: SpitzkantHead Light (uploaded .otf font)
- Body: Manrope (Google Fonts)

## Internationalization (i18n)
- Use `react-i18next` with JSON translation files for SK, HU, EN
- Language switcher in the header navigation
- Default language: Slovak
- Translation files: `src/i18n/locales/{sk,hu,en}.json`

## Sections (from wireframe, top to bottom)

1. **Header/Nav** -- Sticky navigation with logo, nav links, language switcher, CTA button
2. **Hero** -- Large "VILLA POTOŇ" heading, subtitle, description, full-width image placeholder
3. **Experience the Feeling of Luxury** -- 3-column grid (Apartmány, Reštaurácia & Bar, Spa) with images and descriptions
4. **Personalized Services** -- Service list with gold accent icons and side images
5. **Quote Banner** -- Centered quote on off-white background
6. **Where Every Day is Designed for You** -- Category list (Ubytovanie, Golf, Wellness, Horse Riding, Themed Events, MICE) with image
7. **Events** -- "Spojte si hostinu, svadbu alebo oslavu" section
8. **Reservation CTA** -- "Rezervujte si pobyt" booking prompt
9. **Contact/Footer** -- Location info, contact details, map placeholder

## Animations
- Scroll-triggered fade-in and slide-up animations (inspired by bellevoire)
- Smooth section transitions using Intersection Observer
- Subtle hover effects on cards and buttons

## Technical Approach
- All sections as separate components in `src/components/sections/`
- i18n setup in `src/i18n/` with `i18next` + `react-i18next`
- Font files served from `public/fonts/`
- CSS variables updated in `index.css` for brand colors
- Responsive: mobile-first, matching wireframe layout
- Placeholder images (gray boxes with descriptive text) until real photos are provided
- Memory file saved with brand guidelines for future reference

## File Structure
```text
src/
  i18n/
    index.ts
    locales/
      sk.json
      hu.json
      en.json
  components/
    sections/
      Header.tsx
      Hero.tsx
      Experience.tsx
      Services.tsx
      Quote.tsx
      Activities.tsx
      Events.tsx
      Reservation.tsx
      Footer.tsx
  pages/
    Index.tsx          (assembles all sections)
public/
  fonts/
    SpitzkantHead-Light.otf
```

