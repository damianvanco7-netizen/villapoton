

## Výmena fotiek za GitHub raw URL (plná kvalita)

Rovnaký postup ako pri hero fotke — použijeme raw GitHub URL namiesto lokálnych importov.

### Zmeny v 3 súboroch

**1. `src/components/sections/Welcome.tsx`** — sekcia "Vitajte vo Villa Potoň"
- Odstrániť `import welcomeImg from '@/assets/welcome.jpg'`
- Pridať: `const welcomeImg = "https://raw.githubusercontent.com/damianvanco7-netizen/villapoton/main/Vill_Poton_exterier.png"`

**2. `src/components/sections/Experience.tsx`** — sekcia "Ubytovanie"
- Odstrániť `import apartmanImg from '@/assets/accommodation.jpg'`
- Pridať: `const apartmanImg = "https://raw.githubusercontent.com/damianvanco7-netizen/villapoton/main/Vill_Poton_izba.png"`

**3. `src/components/sections/Quote.tsx`** — galéria (pridať novú fotku)
- Pridať novú URL premennú: `const quoteGithub = "https://raw.githubusercontent.com/damianvanco7-netizen/villapoton/main/Vill_Poton_izba_2.png"`
- Pridať ju do poľa `images` (napr. na začiatok alebo koniec)

