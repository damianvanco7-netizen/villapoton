

## Použitie hero fotky z GitHubu (bez kompresie)

### Problém
Fotky nahrané cez Lovable chat sú komprimované. Fotka bola nahraná priamo do GitHub repozitára, čo zachová plnú kvalitu.

### Riešenie
Keďže máte zapnutý bidirectional sync medzi Lovable a GitHub, súbor `VP hero sekcie photo.jpg` sa už synchronizoval do repozitára. Stačí ho presunúť na správne miesto alebo naň odkázať.

Najjednoduchší prístup: zmeniť `Hero.tsx` aby použil **raw GitHub URL** na obrázok (plná kvalita, žiadna kompresie Vite bundlera):

**Súbor:** `src/components/sections/Hero.tsx`
- Odstrániť import `heroImg from '@/assets/hero.jpg'`
- Použiť priamu raw URL: `https://raw.githubusercontent.com/damianvanco7-netizen/villapoton/main/VP%20hero%20sekcie%20photo.jpg`

Alternatíva: Presunúť súbor v GitHub do `src/assets/hero.jpg` cez git, čo by sa synchonizovalo späť. Ale raw URL je rýchlejšie riešenie a garantuje nulu kompresiu.

### Zmena (1 súbor)

```tsx
// Hero.tsx - nahradiť import za priamu URL
const heroImg = "https://raw.githubusercontent.com/damianvanco7-netizen/villapoton/main/VP%20hero%20sekcie%20photo.jpg";
```

