

## Uprava sekcie Recenzie - mobile: jedna recenzia + sipky pod nou

### Problem
Na mobile sa zobrazuju 3 recenzie pod sebou (grid-cols-1 s 3 kartami). Treba zobrazit vzdy iba jednu recenziu a pod nou navigacne sipky.

### Riesenie

**Upravit `src/components/sections/Reviews.tsx`:**

1. Na mobile zobrazit iba jednu recenziu (`reviews[currentIndex]`) namiesto 3 (`getVisibleReviews()`).
   - Pouzit `useIsMobile()` hook.
   - Ak `isMobile`: renderovat iba jednu kartu s AnimatePresence animaciou.
   - Ak desktop: zachovat aktualne 3 karty v gride.

2. Navigacne sipky zostat rovnake, len sa budu zobrazovat pod jednou kartou na mobile.

