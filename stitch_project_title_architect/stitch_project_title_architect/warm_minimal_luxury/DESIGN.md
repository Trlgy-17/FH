---
name: Warm Minimal Luxury
colors:
  surface: '#fdf9f3'
  surface-dim: '#ddd9d4'
  surface-bright: '#fdf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3ed'
  surface-container: '#f1ede7'
  surface-container-high: '#ebe8e2'
  surface-container-highest: '#e6e2dc'
  on-surface: '#1c1c18'
  on-surface-variant: '#4a463f'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f4f0ea'
  outline: '#7b766e'
  outline-variant: '#ccc6bc'
  surface-tint: '#615e59'
  primary: '#0f0d0a'
  on-primary: '#ffffff'
  primary-container: '#25231f'
  on-primary-container: '#8e8a84'
  inverse-primary: '#cbc6bf'
  secondary: '#745943'
  on-secondary: '#ffffff'
  secondary-container: '#fed9bc'
  on-secondary-container: '#785d46'
  tertiary: '#110d07'
  on-tertiary: '#ffffff'
  tertiary-container: '#28231b'
  on-tertiary-container: '#918a7f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e7e2db'
  primary-fixed-dim: '#cbc6bf'
  on-primary-fixed: '#1d1b18'
  on-primary-fixed-variant: '#494642'
  secondary-fixed: '#ffdcc1'
  secondary-fixed-dim: '#e3c0a4'
  on-secondary-fixed: '#2a1706'
  on-secondary-fixed-variant: '#5a422d'
  tertiary-fixed: '#ebe1d5'
  tertiary-fixed-dim: '#cec5ba'
  on-tertiary-fixed: '#1f1b14'
  on-tertiary-fixed-variant: '#4c463d'
  background: '#fdf9f3'
  on-background: '#1c1c18'
  surface-variant: '#e6e2dc'
  soft-white: '#FFFEFC'
  warm-gray: '#6F6A63'
  light-taupe: '#D8CEC2'
  muted-olive: '#74745B'
typography:
  display-hero:
    fontFamily: EB Garamond
    fontSize: 72px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: EB Garamond
    fontSize: 44px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-h1:
    fontFamily: EB Garamond
    fontSize: 56px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-h1-mobile:
    fontFamily: EB Garamond
    fontSize: 36px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-h2:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-h3:
    fontFamily: plusJakartaSans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: plusJakartaSans
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: plusJakartaSans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: plusJakartaSans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-v-desktop: 112px
  section-v-mobile: 64px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 24px
---

## Brand & Style

This design system embodies an **Editorial Minimalism** style, blending the quiet confidence of high-end interior design with the warmth of a lived-in home. It moves away from the cold, sterile nature of traditional minimalism by embracing a "Warm Minimal Luxury" aesthetic—prioritizing tactile comfort, organic tones, and human-centric service.

The design philosophy treats the digital interface like a premium coffee-table book. It utilizes generous white space, asymmetrical layouts, and sophisticated typography to allow high-resolution interior photography to breathe. The emotional response is one of calm, professional reliability, and curated taste. Key characteristics include:
- **Refined Materiality:** UI elements mimic physical surfaces through subtle layering and soft shadows.
- **Intentional Friction:** Transitions are smooth and natural, avoiding abrupt movements to maintain a sense of tranquility.
- **Approachable Sophistication:** A balance of classic serif elegance and modern sans-serif functionality.

## Colors

The palette is anchored in warm neutrals and earthy pigments, intentionally avoiding pure blacks or clinical whites. 

- **Primary (Charcoal Brown):** Used for structural grounding, high-level navigation, and primary headings to provide a sense of authority.
- **Secondary (Walnut):** Reserved for meaningful accents, icons, and interactive hover states. It provides a biological warmth to the interface.
- **Tertiary (Sand):** Employed for subtle sectioning and background shifts to create a rhythmic scrolling experience without jarring transitions.
- **Neutral (Warm Ivory):** The primary canvas. It reduces eye strain and feels more premium than standard white.
- **Surface (Soft White):** Used specifically for foreground elements like cards and input fields to make them "pop" slightly from the ivory background.
- **Borders (Light Taupe):** Thin, low-contrast dividers that organize content without creating visual noise.

## Typography

This design system utilizes an **Editorial Pair** to bridge the gap between tradition and modernity. 

- **Headlines:** `EB Garamond` (Editorial Serif) provides a literary, high-fashion feel. Use lower-case or sentence-case for a more approachable "interior design magazine" look. For H3 and below, we pivot to the sans-serif for better clarity in UI-specific roles.
- **Body & UI:** `Plus Jakarta Sans` offers a modern, friendly, and geometric structure. Its wide apertures ensure high legibility even at smaller scales on mobile devices.
- **Captions & Labels:** Small metadata should use `label-sm` with increased letter spacing and uppercase styling to denote technical details (e.g., material types, dimensions).

## Layout & Spacing

The layout philosophy follows a **Fixed-Grid System** within a centered container, emphasizing whitespace as a luxury "material."

- **Grid:** A 12-column grid is used for desktop, but elements frequently offset or span asymmetrical column counts (e.g., a 7-column image paired with a 4-column text block) to mimic editorial layouts.
- **Vertical Rhythm:** Generous vertical padding between sections (`section-v-desktop`) prevents the UI from feeling cluttered.
- **Mobile Reflow:** Content should stack vertically on mobile, maintaining the 24px side margins. Large hero images should maintain a portrait aspect ratio to fill the screen vertically.

## Elevation & Depth

Visual hierarchy is achieved through a mix of **Tonal Layers** and **Ambient Shadows**.

- **Surface Layering:** Elements like cards or lead forms sit on `Soft White` (#FFFEFC) surfaces against the `Warm Ivory` (#F6F2EC) background. This 2-degree shift in lightness provides natural separation.
- **Shadow Character:** Use extremely diffused, low-opacity shadows. Avoid harsh edges. Shadows should have a slight tint of the `Charcoal Brown` to feel integrated with the palette rather than a neutral gray.
- **Interactive Depth:** On hover, cards should lift slightly (scale 1.02x) with a slightly more pronounced, soft shadow to signal interactivity.
- **Sticky Header:** Apply a `backdrop-filter: blur(12px)` with a semi-transparent `Warm Ivory` fill when the header is in a scrolled state.

## Shapes

The shape language balances structural architectural lines with soft, domestic comfort. 

- **Cards & Forms:** Utilize a "Rounded" (0.5rem) base to soften the geometric grid.
- **Buttons:** Primary call-to-action buttons use a pill-shape (999px) to stand out as the most "touchable" and friendly elements in the UI. 
- **Media:** Portfolio photography should use slightly larger radii (up to 1.5rem) to feel like framed art pieces within the layout.

## Components

- **Buttons:** Primary buttons are `Charcoal Brown` with `Soft White` text, pill-shaped. Hover state shifts background to `Walnut`. Secondary buttons use a `Light Taupe` border with an arrow icon that moves 4px to the right on hover.
- **Cards:** White surfaces with 1px `Light Taupe` borders. Padding should be generous (min 32px).
- **Input Fields:** `Soft White` background with a `Light Taupe` bottom border only (for a minimal look) or full 1px border. Focus state uses a `Walnut` border.
- **Chips/Badges:** Small, `Sand` background with `Warm Gray` text, used for project categories (e.g., "Residential," "Kitchen").
- **WhatsApp CTA:** A persistent, floating action button or a prominent section footer using the `Muted Olive` or `Walnut` accent to drive lead generation.
- **Before/After Slider:** A custom component with a thin `Soft White` vertical handle, allowing users to compare design renders with finished results.