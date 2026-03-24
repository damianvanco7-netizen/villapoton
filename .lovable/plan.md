

# Hero Section Redesign

## Changes

### 1. Hero.tsx -- Full-screen image with centered bottom text
- Full-viewport background image (uploaded restaurant photo) covering 100vw x 100vh
- Remove all current content (description, CTA button, placeholder box)
- At the bottom center: small subtitle "IDEÁLNE MIESTO NA ODDYCH A ZÁŽITKY" in Manrope uppercase
- Below it: large "VILLA POTÔŇ" heading in SpitzkantHead
- White text over the image (with subtle dark overlay for readability)

### 2. Header.tsx -- Transparent, no logo
- Remove logo from header
- Remove background color (`bg-background/90`), backdrop blur, and border
- Make header fully transparent (text white to contrast with hero image)
- Keep nav links, language switcher, and CTA button

### 3. Asset
- Copy uploaded restaurant photo (`user-uploads://667466971.jpg`) to `src/assets/hero.jpg`

