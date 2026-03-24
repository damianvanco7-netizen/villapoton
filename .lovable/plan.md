

# Fixes: Experience Section, Hero Title, Font

## 1. Experience.tsx -- Remove background, fix button style, enlarge images

**Remove background**: Change `bg-muted` to no background (transparent/off-white inherited from body).

**Button style**: Replace the underlined text link with a green filled button matching Welcome's "Zistiť viac" style:
```
bg-primary text-primary-foreground px-8 py-3 text-sm font-body font-semibold tracking-wider uppercase
```

**Larger images**: Change image aspect ratio from `aspect-[4/3]` to a larger layout inspired by the Bellevoire screenshot -- make the image take up more vertical space. Use a taller aspect ratio like `aspect-[3/4]` or remove the aspect constraint and let the image be large (similar to the Bellevoire layout where the right image is very tall, nearly full-height of the card). The right image should dominate visually. Add a second smaller image below-left for the first card (like Bellevoire's two-image layout).

Actually, looking at the Bellevoire screenshot more carefully: it shows one large image on the right spanning nearly full height, and a smaller image at bottom-left overlapping. This is a specific layout. I'll adapt: make the right image much taller (remove aspect ratio constraint, use a tall fixed height), and optionally add a second overlapping image for visual depth.

Simpler approach matching the screenshot: make the image container much larger -- remove `aspect-[4/3]`, use a tall container. The image on the right should be dominant.

## 2. Hero.tsx -- Title on one line

The title "VILLA POTÔŇ" should stay large but fit on one line. Currently `lg:text-[14rem]` may be wrapping. Use `whitespace-nowrap` to force single line, and adjust size with responsive classes to prevent overflow.

## 3. Font weight -- Instrument Serif

The Google Fonts import only loads regular (400) and italic. Instrument Serif on Google Fonts only comes in weight 400 -- it IS a thin/elegant serif. The issue might be that `font-weight: 400` is correctly applied but the user sees it as bold. Let me check: the CSS already sets `font-weight: 400` for headings. The font itself should render as thin/elegant. The user says Google shows it differently (thinner and taller). This could be because:
- The font might not be loading correctly (fallback to system serif which is bolder)
- Need to verify the Google Fonts import URL is correct

The import URL looks correct: `Instrument+Serif:ital@0;1`. Let me ensure it's loading. If it's rendering as a fallback serif, it would look bolder. I'll make sure the font declaration is clean.

## Changes Summary

### Experience.tsx
- Remove `bg-muted` from section
- Replace underlined text CTA with green filled button (same style as Welcome's "Zistiť viac")
- Make images significantly larger: remove `aspect-[4/3]`, use taller container

### Hero.tsx
- Add `whitespace-nowrap` to the h1 to keep "VILLA POTÔŇ" on one line
- Slightly reduce max size if needed to prevent horizontal overflow

### Font check
- Verify Google Fonts import is loading Instrument Serif correctly
- The font IS thin by nature at weight 400; if it appears bold, it may be a loading/caching issue. No code change needed if import is correct.

