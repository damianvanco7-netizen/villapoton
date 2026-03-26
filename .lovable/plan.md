

## Oprava jazykových mutacii - hardcoded texty

### Problem
Viacero komponentov ma texty napevno po slovensky alebo po anglicky, namiesto pouzitia `t()` z i18n. Pri prepnuti jazyka sa tieto texty nemenia.

### Zoznam hardcoded textov

**Hero.tsx:**
- "Ideálne miesto na oddych a zážitky" (riadky 26-28)

**Welcome.tsx:**
- "Vitajte vo Villa Potôň / Miesto Elegantného Oddychu / v Srdci Prírody" (riadky 21-23)
- "Objavte kombináciu komfortného ubytovania..." (riadok 29)
- "Zistiť viac" (riadok 38)

**Experience.tsx:**
- "Zažite atmosféru skutočného oddychu, kde každý moment patrí vám" (riadky 69-73)

**Header.tsx:**
- navLinks labels hardcoded: "O nás", "Ubytovanie", "Reštaurácia", "Lokalita", "Kontakt" (riadky 21-26)
- podmienka `link.label === 'Reštaurácia'` (riadok 101)
- otvaracie hodiny "11:00 – 22:00" (riadok 104)

**Footer.tsx:**
- navLinks labels hardcoded rovnako (riadky 9-14)
- "Ideálne miesto na oddych a zážitky" (riadok 36)
- "Check-in" a "Check-out" po anglicky (riadky 78, 85)
- "Horná Potôň 123, 930 36, Slovensko" (riadky 53-54)

**Reviews.tsx:**
- countryLabels hardcoded po slovensky: "Slovensko", "Taliansko", "Poľsko", "Maďarsko" (riadky 50-54)

### Riesenie

**1. Doplnit i18n kluce do vsetkych 3 locale suborov (sk.json, en.json, hu.json):**

Nove kluce:
- `hero.claim_line1`, `hero.claim_line2` (Ideálne miesto / na oddych a zážitky)
- `welcome.title_line1`, `welcome.title_line2`, `welcome.title_line3` (Vitajte...)
- `welcome.description`, `welcome.cta`
- `experience.headline_line1`, `experience.headline_line2` (Zazite atmosferu...)
- `nav.about_link`, `nav.rooms_link`, `nav.restaurant_link`, `nav.location_link`, `nav.contact_link` (alebo pouzit existujuce `nav.*` kluce)
- `footer.claim` (Ideálne miesto...)
- `footer.checkin`, `footer.checkout`
- `footer.address_line1`, `footer.address_line2`
- `experience.restaurant.phone_label` (doplnit do en.json a hu.json)
- `reviews.country.sk`, `reviews.country.it`, `reviews.country.pl`, `reviews.country.hu`

**2. Upravit komponenty aby pouzivali t():**

- **Hero.tsx** - pridat `useTranslation`, nahradit hardcoded claim
- **Welcome.tsx** - pridat `useTranslation`, nahradit vsetky 3 hardcoded texty
- **Experience.tsx** - nahradit hardcoded nadpis za `t()` kluce
- **Header.tsx** - navLinks labels cez `t()`, podmienku na restaurant cez `href` alebo key namiesto label, hodiny cez `t()`
- **Footer.tsx** - navLinks cez `t()`, claim, check-in/out, adresa cez `t()`
- **Reviews.tsx** - countryLabels cez `t()`

**3. Subory na upravu:**
- `src/i18n/locales/sk.json`
- `src/i18n/locales/en.json`
- `src/i18n/locales/hu.json`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Welcome.tsx`
- `src/components/sections/Experience.tsx`
- `src/components/sections/Header.tsx`
- `src/components/sections/Footer.tsx`
- `src/components/sections/Reviews.tsx`

