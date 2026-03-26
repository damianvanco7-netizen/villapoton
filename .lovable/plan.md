
Príčina sekania na mobile je veľmi pravdepodobne kombinácia viacerých vecí, ale hlavný problém je v aktuálnej implementácii parallaxu:

1. V `Welcome.tsx` aj `Experience.tsx` máš vlastný `useParallax`, ktorý:
   - počúva každý `scroll`
   - pri každom frame volá `getBoundingClientRect()`
   - pri každom frame robí `setOffset(...)`
   - tým pádom spúšťa React re-render počas scrollu

2. V `Experience` sa to nedeje len raz:
   - parallax beží na welcome fotke
   - a potom ešte na každej karte v sekcii experience
   - na mobile je to citeľné viac, lebo browser má menší výkon a scroll/render pipeline je citlivejšia

3. Obrázky sa zároveň hýbu cez `transform` a sú väčšie než kontajner (`h-[120%]`), čo je samo o sebe v poriadku, ale v kombinácii s React state updatmi počas scrollu je to drahé.

4. Ďalšie veci, ktoré môžu jank zhoršovať:
   - fixed hero sekcia (`Hero.tsx`)
   - header, ktorý na scroll mení stav (`setIsDark`)
   - veľa `transition-all` animácií naprieč sekciami
   - viac veľkých obrázkov na jednej stránke

Čo navrhujem upraviť:

### 1. Presunúť mobile parallax mimo React state
Namiesto `setOffset` na každom scroll frame:
- používať `requestAnimationFrame`
- aktualizovať `style.transform` priamo na DOM elemente cez `ref`
- tým sa vyhneme re-renderom pri scrollovaní

To je najdôležitejšia oprava.

### 2. Vytvoriť jednu spoločnú optimalizovanú parallax utilitu/hook
Namiesto dvoch skoro rovnakých `useParallax` hookov:
- vytvoriť spoločný hook pre mobil aj desktop
- throttle cez `requestAnimationFrame`
- prípadne zapínať parallax len keď je element blízko viewportu

To zníži počet zbytočných výpočtov.

### 3. Obmedziť počet aktívnych parallax výpočtov na mobile
Na mobile navrhnem:
- jemnejší parallax speed
- alebo parallax len pre hlavné fotky, nie pre všetky naraz
- prípadne nižší rozsah posunu

Efekt ostane, ale bude plynulejší.

### 4. Skontrolovať a zjemniť scroll-reactive veci okolo
Popri parallaxe preverím aj:
- `Header.tsx` scroll listener
- zbytočné `transition-all`
- či sa niekde pri scrollovaní nemení layout namiesto čisto transform/opacity

### 5. Opraviť bez zmeny vzhľadu
Cieľ je:
- zachovať parallax aj na mobile
- nechať vizuál čo najbližší desktopu
- ale prerobiť techniku tak, aby scroll nešiel cez React render loop

Technické detaily:
```text
Aktuálny flow:
scroll -> listener -> getBoundingClientRect -> setState -> React render -> style update

Navrhovaný flow:
scroll -> listener -> requestAnimationFrame -> direct transform update on img ref
```

Súbory, ktoré by som upravil:
- `src/components/sections/Welcome.tsx`
- `src/components/sections/Experience.tsx`
- prípadne nový spoločný hook, napr. `src/hooks/useParallax.ts`
- podľa potreby jemne aj `src/components/sections/Header.tsx`
