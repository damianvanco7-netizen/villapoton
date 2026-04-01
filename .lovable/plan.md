

## Výmena hero fotky za novú (1MB, dobrá kvalita)

### Problém
Lovable chat komprimuje nahrané obrázky, čo spôsobuje stratu kvality. Ale samotné **skopírovanie súboru** do `src/assets/` by nemalo pridávať extra kompresiu — Vite obrázky väčšie ako 4KB len skopíruje do buildu bez ďalšej kompresie.

Ak je fotka stále rozmazaná, problém je v kompresii pri uploade cez chat. Riešenie: skúsime to teraz s touto novou fotkou (1MB) a ak kvalita stále nebude dobrá, najlepšie riešenie bude nahrať obrázok priamo cez GitHub do repozitára alebo použiť externú URL.

### Plán
1. Skopírovať `user-uploads://VP_hero_sekcie_photo-2.jpg` do `src/assets/hero.jpg` (prepíše starý)
2. Žiadne zmeny v kóde — Hero.tsx už importuje `@/assets/hero.jpg`

Jeden súbor, jedna operácia.

