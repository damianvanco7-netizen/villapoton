

## Oprava: text pri pulzujúcom symbole na mobile

### Problem
Na riadku 165 v `Header.tsx` sa `OpenClosedBadge` volá s `label=""`, takže na mobile sa zobrazuje iba bodka bez textu.

### Riešenie
Zmeniť `label=""` na `label={statusLabel}` na riadku 165, rovnako ako je to na desktope (riadok 130).

**Súbor:** `src/components/sections/Header.tsx`
- Riadok 165: `<OpenClosedBadge isOpen={isRestaurantOpen} isDark={isDark} label="" />` → `<OpenClosedBadge isOpen={isRestaurantOpen} isDark={isDark} label={statusLabel} />`

