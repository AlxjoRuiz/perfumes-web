---
name: Aura & Essence
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#44474d'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#75777e'
  outline-variant: '#c5c6cd'
  surface-tint: '#515f78'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#0d1c32'
  on-primary-container: '#76849f'
  inverse-primary: '#b9c7e4'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1c18'
  on-tertiary-container: '#85847f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b9c7e4'
  on-primary-fixed: '#0d1c32'
  on-primary-fixed-variant: '#39475f'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
  button:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style

This design system is engineered for the high-end olfactory market, targeting a discerning audience that values heritage, craftsmanship, and sensory luxury. The brand personality is poised, mysterious, and unapologetically premium.

The visual direction follows a **Modern Minimalist** aesthetic infused with **High-Contrast Editorial** elements. The interface prioritizes generous whitespace—referred to here as "breathing room"—to allow product photography to feel like art installations. Every interaction should feel intentional and quiet, evoking the same sense of exclusivity one finds in a private boutique.

Key stylistic pillars include:
- **Quiet Luxury:** Avoiding cluttered layouts; every element must justify its presence.
- **Materiality:** Using digital techniques to mimic physical luxury, such as subtle metallic reflections and glass-like transparencies.
- **Atmospheric Depth:** Utilizing photography with high-contrast lighting and botanical textures to ground the minimalist UI in a rich, sensory world.

## Colors

The palette is anchored by **Midnight Navy** (#0A192F), a deep, authoritative base that provides more sophistication than pure black. This is contrasted against **Champagne Gold** (#D4AF37), used sparingly for interactive cues and decorative accents to signify prestige.

**Creamy White** (#F9F6F0) serves as the primary canvas color, offering a softer, more "expensive" feel than stark white. **Charcoal** (#2C2C2C) is reserved for secondary text and structural borders, ensuring legibility without breaking the refined tonal balance. 

- **Primary (Midnight Navy):** Backgrounds for high-impact sections, primary buttons, and heavy headings.
- **Secondary (Champagne Gold):** Fine lines, active states, and icons.
- **Tertiary (Creamy White):** Main page background and card surfaces.
- **Neutral (Charcoal):** Body text and subtle UI dividers.

## Typography

The typographic scale relies on the juxtaposition between the romantic, high-contrast serifs of **Playfair Display** and the geometric, architectural clarity of **Montserrat**.

- **Headlines:** Use Playfair Display for all emotional and structural titles. Optical kerning should be tight for large displays.
- **Body Text:** Montserrat provides a modern, neutral counterpoint. Use `body-lg` for product descriptions to ensure a premium reading experience.
- **Micro-copy:** Labels and navigation items utilize `label-caps` to create a sense of organized, high-fashion cataloging. 
- **Hierarchy:** Maintain a clear vertical rhythm by using the 1.6x line-height for body text to maximize legibility against the cream background.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to ensure content remains framed like a gallery piece, and a **Fluid Grid** for mobile devices.

- **Desktop:** 12-column grid with wide 32px gutters to prevent visual crowding. Section gaps are intentionally large (120px+) to distinguish different "stories" or scent collections.
- **Mobile:** 4-column grid with 20px side margins.
- **Philosophy:** Negative space is a functional element. Avoid centering small text blocks in wide containers; instead, use asymmetrical layouts (e.g., text occupying 5 columns, image occupying 7) to create a more dynamic, editorial feel.

## Elevation & Depth

Depth is achieved through **Tonal Layering** and **Ambient Shadows** rather than heavy gradients.

- **Surfaces:** Use the Tertiary (Creamy White) as the base. Cards or "Quick Look" modals should use a slightly brighter white or a subtle 5% opacity Navy tint to lift from the background.
- **Shadows:** Shadows are extremely diffused (Blur: 40px, Opacity: 4%) using a Navy-tinted hex rather than pure black to maintain color harmony.
- **Glassmorphism:** Use for navigation bars and hovering product labels. A 10px backdrop blur with a 1px Gold border (10% opacity) creates a "perfume bottle" glass effect.
- **Accents:** Use 0.5px "Hairline" Gold borders to define sections without adding visual weight.

## Shapes

The shape language is primarily **architectural and crisp**. 

A `roundedness: 1` (Soft) setting is applied to buttons and input fields to prevent the UI from feeling aggressive, while maintaining the sharp sophistication of high-end fashion branding. 

- **Primary Buttons:** Rectangular with a very slight 4px radius.
- **Image Containers:** Strictly sharp (0px) to mimic photography prints, or contained within circular masks for "ingredient" spotlights.
- **Icons:** Use thin-stroke (1px or 1.5px) linear icons to match the refined typography.

## Components

### Buttons
- **Primary:** Solid Midnight Navy background, White or Gold text, uppercase Montserrat. Hover state shifts background to a slightly lighter Navy with a subtle Gold bottom border.
- **Secondary:** Transparent background, 1px Midnight Navy or Gold border. 

### Input Fields
- **Style:** Underline-only or 1px border. No heavy background fills. Focus state highlights the bottom border in Gold.

### Cards
- **Product Card:** Image-first. The product title (Playfair) and price (Montserrat) appear below the image with significant padding. Use a subtle fade-in shadow on hover to "lift" the bottle.

### Chips & Tags
- **Style:** Small, uppercase text with a 0.5px Gold border. Used for scent notes (e.g., "Oud", "Bergamot").

### Lists & Navigation
- **Navigation:** Centered logo with split navigation links. Active links are indicated by a 1px Gold underline that animates from the center.

### Additional Components
- **The "Scent Profile" Accordion:** Clean, typographic-only expansion tiles using Charcoal text and Gold +/- icons.
- **Interactive Carousel:** Minimalist progress bar at the bottom rather than traditional arrows, emphasizing a seamless flow.