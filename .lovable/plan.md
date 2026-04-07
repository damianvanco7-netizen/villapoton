

## SEO: Presmerovanie z villapoton.lovable.app na villapoton.com

### Čo treba spraviť

**Krok 1: Pripojiť doménu villapoton.com v Lovable** (mimo kódu)
- Project Settings → Domains → Connect Domain → zadať `villapoton.com`
- Pridať aj `www.villapoton.com`
- Nastaviť `villapoton.com` ako **Primary** doménu
- U registrátora domény nastaviť DNS záznamy:
  - A záznam `@` → `185.158.133.1`
  - A záznam `www` → `185.158.133.1`
  - TXT záznam `_lovable` → hodnotu, ktorú Lovable vygeneruje
- Počkať na propagáciu DNS (zvyčajne minúty, max 72h)

**Krok 2: Skryť "Edit with Lovable" badge** (voliteľné, vyžaduje platený plán)

**Krok 3: Zmeny v kóde — SEO optimalizácia (4 súbory)**

1. **`index.html`** — pridať canonical URL a aktualizovať og:url + lang:
   - Pridať `<link rel="canonical" href="https://villapoton.com/" />`
   - Pridať `<meta property="og:url" content="https://villapoton.com/" />`
   - Zmeniť `<html lang="en">` na `<html lang="sk">` (stránka je primárne slovenská)
   - Aktualizovať `twitter:site` z `@Lovable` na niečo relevantné alebo odstrániť

2. **`public/robots.txt`** — pridať sitemap odkaz:
   ```
   Sitemap: https://villapoton.com/sitemap.xml
   ```

3. **`public/sitemap.xml`** — vytvoriť nový súbor so sitemap pre Google:
   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://villapoton.com/</loc>
       <lastmod>2026-04-07</lastmod>
       <priority>1.0</priority>
     </url>
   </urlset>
   ```

4. **`index.html`** — pridať JSON-LD structured data pre lepšie SEO:
   - LocalBusiness schema s názvom, adresou, otváracími hodinami, typom (LodgingBusiness + Restaurant)

### Čo sa stane po týchto zmenách
- Google bude indexovať iba `villapoton.com` vďaka canonical tagu
- Lovable automaticky presmeruje `.lovable.app` na primárnu doménu
- OG meta tagy budú ukazovať na správnu doménu pri zdieľaní na sociálnych sieťach
- Sitemap pomôže Googlu rýchlejšie zaindexovať stránku

### Po nasadení — externé kroky
- Zaregistrovať `villapoton.com` v **Google Search Console** a odoslať sitemap
- Ak bol `.lovable.app` už zaindexovaný, Google ho postupne nahradí `.com` verziou

