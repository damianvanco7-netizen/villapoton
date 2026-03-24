

# Experience Section -- Bellevoire-style spacing and layout

## Problem
Cards are stacked directly against each other with no breathing room. The Bellevoire layout has clear vertical spacing between each full-screen card, and the content area uses more width.

## Changes to `Experience.tsx`

1. **Add vertical spacing between cards**: Add `mb-24 md:mb-32` (or similar large margin) between each card so they don't touch
2. **Widen the image column**: Change grid from `md:grid-cols-[1fr_1.6fr]` to `md:grid-cols-[1fr_2fr]` -- the image should take roughly 2/3 of the screen width like Bellevoire
3. **Image starts with offset from top**: On Bellevoire the image doesn't start at the very top edge -- it has a slight top offset. Add `mt-8 md:mt-16` or padding to the image container, and let it extend past the bottom (like Bellevoire's asymmetric crop)
4. **Text aligned to top-left**: Move text `justify-center` to `justify-start pt-16 md:pt-24` so text starts near the top of each card (matching Bellevoire where the heading is at the top-left)
5. **Remove `min-h-screen`** from the card grid -- let the image height drive the card height naturally. Set image container to a fixed tall height like `h-[70vh] md:h-[85vh]`

These changes will create the open, spacious feel of Bellevoire where each card breathes independently.

