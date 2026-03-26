
Cieľ: zachovať parallax aj na mobile, ale prerobiť ho tak, aby bol reálne plynulý, a zároveň opraviť veľký nadpis v sekcii Experience tak, aby sa na iPhone 16 Pro Max zalamoval presne a čisto.

1. Čo je reálny problém teraz
- `useParallax.ts` už síce nerobí React re-render pri scrollovaní, ale stále má každý parallax vlastný `scroll` listener.
- Na stránke beží parallax viackrát naraz:
  - `Welcome`
  - 3 karty v `Experience`
- Každý z nich pri scrollovaní volá `getBoundingClientRect()`, takže na mobile vzniká viac layout prepočtov v jednom frame.
- Popri tom ešte beží scroll logika v `Header.tsx`, plus fixed hero a viaceré `transition-all`, takže sa náklady sčítajú.

2. Ako to opravím
- Nahradím súčasný per-komponent parallax za jeden spoločný, centralizovaný parallax manager v `src/hooks/useParallax.ts`.
- Ten bude fungovať takto:
```text
scroll/resize -> 1 shared requestAnimationFrame -> update len viditeľných parallax elementov
```
- Hook bude iba registrovať elementy.
- Samotný update bude spoločný, nie jeden listener na každý obrázok.
- Pre transform použijem `translate3d(...)` namiesto obyčajného `translateY(...)`, aby sa lepšie využil compositor.
- Na mobile znížim intenzitu efektu a zároveň zavedem clamp maxima posunu, aby sa hýbalo menej pixelov.

3. Ďalšia optimalizácia pre mobil
- Do parallaxu pridám aktiváciu cez `IntersectionObserver`, aby sa nepočítali všetky obrázky stále.
- Aktualizovať sa budú len obrázky, ktoré sú vo viewporte alebo tesne pri ňom.
- V `Header.tsx` nechám RAF throttling, ale zjemním ho tak, aby:
  - si element nehľadal opakovane zbytočne
  - `setIsDark` nebežal, keď sa hodnota reálne nemení
- V dotknutých sekciách zmením `transition-all` len na konkrétne vlastnosti tam, kde to dáva zmysel, aby browser nemusel sledovať všetko.

4. Oprava nadpisu na iPhone 16 Pro Max
Aktuálny problém je, že prvý riadok je na mobile príliš široký, takže sa rozbije a slovo `oddychu` ostane osamotené.

Upravím to takto:
- v `Experience.tsx` zmením markup veľkého nadpisu na presne kontrolované 2 riadky na mobile
- mobil bude mať mierne menší font / upravené `leading` / menší horizontálny padding
- výsledok bude:
```text
Zažite atmosféru skutočného oddychu,
kde každý moment patrí vám
```
- na desktope ponechám súčasný vzhľad čo najbližší tomu, čo už máte

5. Súbory, ktoré upravím
- `src/hooks/useParallax.ts`
- `src/components/sections/Welcome.tsx`
- `src/components/sections/Experience.tsx`
- `src/components/sections/Header.tsx`
- prípadne `src/index.css`, ak bude treba doplniť drobnú utility triedu pre GPU/compositing správanie

6. Výsledok po úprave
- parallax ostane aj na mobile
- scroll bude výrazne plynulejší, lebo odstránim duplicitné scroll listenery a znížim počet layout meraní na frame
- nadpis v Experience sa na iPhone 16 Pro Max prestane lámať tak, že `oddychu` ostane samostatne
- vizuál ostane veľmi blízky tomu, čo máte teraz, len technicky bude výkonnejší

Technické detaily
```text
Teraz:
4x scroll listener + 4x getBoundingClientRect() + header scroll work

Po úprave:
1x shared listener + 1x RAF loop + update len aktívnych/viditeľných obrázkov
```
