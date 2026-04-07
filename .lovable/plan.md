

## Oprava detekcie jazyka — slovenčina ako predvolená

### Problém
`i18next-browser-languagedetector` detekuje jazyk prehliadača. Ak má prehliadač nastavený `en-US` (aj na Slovensku), stránka sa zobrazí po anglicky. Navyše `localStorage` cache si pamätá poslednú voľbu.

### Riešenie
Zmeniť logiku detekcie v `src/i18n/index.ts`:

1. **Priorita detekcie**: `localStorage` → `navigator` (zostáva rovnaká)
2. **Pridať `supportedLngs`**: explicitne `['sk', 'hu', 'en']` — aby sa `en-US`, `en-GB` správne mapovali na `en`
3. **Zmeniť `fallbackLng` na `'sk'`** (už je nastavené správne)
4. **Pridať custom language mapping** — ak prehliadač vráti `sk`, `cs` (čeština je blízka), alebo `hu`, použije sa príslušný jazyk. Pre všetko ostatné sa použije `en`.

Konkrétne zmeny v `src/i18n/index.ts`:

```ts
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      sk: { translation: sk },
      hu: { translation: hu },
      en: { translation: en },
    },
    supportedLngs: ['sk', 'hu', 'en'],
    fallbackLng: 'sk',          // slovenčina ako default
    nonExplicitSupportedLngs: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      convertDetectedLanguage: (lng: string) => {
        const base = lng.split('-')[0].toLowerCase();
        if (base === 'sk' || base === 'cs') return 'sk';  // SK + CZ → slovenčina
        if (base === 'hu') return 'hu';
        return 'en';  // všetko ostatné → angličtina
      },
    },
  });
```

### Čo to spraví
- **Slovenský/český prehliadač** → stránka po slovensky
- **Maďarský prehliadač** → stránka po maďarsky
- **Akýkoľvek iný jazyk** (en, de, fr...) → stránka po anglicky
- Ak si používateľ manuálne zvolí jazyk, uloží sa do `localStorage` a bude mať prednosť

### Jeden súbor: `src/i18n/index.ts`

