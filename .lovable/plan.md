
Cieľ: vrátiť carousel v sekcii „Vaše pohodlie a spokojnosť sú základom každého detailu vášho pobytu.“ na stabilné správanie ako v predošlej fungujúcej verzii, ale s jednou vizuálnou úpravou: stredná fotka bude väčšia a všetky fotky ostanú zarovnané na stred.

Implementačný plán

1. Upraviť `src/components/sections/Quote.tsx`
- Zachovať Embla carousel a jeho jednoduché ovládanie `scrollPrev/scrollNext`.
- Zrušiť aktuálny prístup, kde sa mení `flex-basis` slideov (`50% / 25%`) podľa aktívnej fotky.
- Namiesto toho nastaviť všetkým slideom pevnú šírku/snap hodnotu, aby Embla fungovala bezchybne ako predtým.

2. Urobiť väčšiu iba strednú kartu vizuálne, nie layoutovo
- Každý slide bude mať rovnakú šírku v tracku.
- Vo vnútri slideu sa aktívna/stredná karta zväčší pomocou:
  - väčšieho vnútorného kontajnera,
  - prípadne `scale` transformácie,
  - vyššieho `aspect-ratio` alebo väčšej max výšky.
- Bočné fotky budú menšie, ale budú stále vertikálne aj horizontálne centrované.

3. Zarovnanie všetkých fotiek na stred
- Obaliť obsah každého slideu do flex kontajnera s centrovaním.
- Obrázok/karta bude mať `mx-auto` a `justify-center/items-center`, aby nevznikal dojem „lietan ia“ do strán.
- Zachovať `object-cover`, aby sa kompozícia fotiek nerozbila.

4. Zachovať aktuálny vizuálny štýl navigácie
- Ponechať spodné šípky v rovnakom štýle ako teraz.
- Ponechať textovú časť sekcie a CTA bez zmien.

5. Doladiť responzívne správanie
- Na mobile ponechať jednoduchší pomer veľkostí, aby stredná karta bola len jemne dominantná.
- Na tablete/desktope zvýrazniť stred výraznejšie, ale bez zásahu do samotného snap layoutu.

Technické poznámky
- Aktuálny problém vzniká tým, že Embla počíta snap pozície podľa šírky slideov, ale tie sa po výbere menia. To spôsobuje nestabilné správanie.
- Najbezpečnejšie riešenie je:
```text
rovnaká šírka slideov
+ aktívna karta väčšia iba vizuálne vo vnútri slideu
= stabilný carousel + väčšia stredná fotka
```
- Tým sa zachová funkčnosť z predchádzajúcej iterácie a splní sa požiadavka na dominantnú strednú fotku.
