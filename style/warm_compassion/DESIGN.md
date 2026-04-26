---
name: Warm Compassion
colors:
  surface: '#fff8f6'
  surface-dim: '#eed4d0'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ee'
  surface-container: '#ffe9e6'
  surface-container-high: '#fde2de'
  surface-container-highest: '#f7ddd8'
  on-surface: '#261816'
  on-surface-variant: '#5a413d'
  inverse-surface: '#3d2d2a'
  inverse-on-surface: '#ffedea'
  outline: '#8e706c'
  outline-variant: '#e2bfb9'
  surface-tint: '#b22b1d'
  primary: '#570000'
  on-primary: '#ffffff'
  primary-container: '#800000'
  on-primary-container: '#ff8371'
  inverse-primary: '#ffb4a8'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dcdddd'
  on-secondary-container: '#5f6161'
  tertiary: '#00137f'
  on-tertiary: '#ffffff'
  tertiary-container: '#0021b9'
  on-tertiary-container: '#94a0ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#8f0f07'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#dfe0ff'
  tertiary-fixed-dim: '#bcc2ff'
  on-tertiary-fixed: '#000c61'
  on-tertiary-fixed-variant: '#1830c2'
  background: '#fff8f6'
  on-background: '#261816'
  surface-variant: '#f7ddd8'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  ai-signature:
    fontFamily: Montserrat
    fontSize: inherit
    fontWeight: '900'
    lineHeight: inherit
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 20px
  gutter: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system centers on the Filipino concept of *Malasakit*—a deep, proactive care for others. The UI is designed to feel like a steady, guiding hand through the complexities of health navigation. It adopts a **Corporate / Modern** aesthetic that prioritizes clarity and institutional trust, tempered by a **Minimalist** approach to whitespace to reduce cognitive load for users who may be in stressful health situations.

The interface must evoke a sense of calm and cultural resonance. While the primary maroon conveys authority and tradition, the generous use of white and light gray ensures the experience remains breathable and contemporary. The tone is respectful, clear, and reassuringly professional.

## Colors

The palette is anchored by a deep **Maroon**, representing the heart and lifeblood of the service. This is balanced against a clean, clinical **White** and a soft **Light Gray** to prevent visual fatigue. 

Status colors are used with high intentionality:
- **Success Green** for completed tasks and positive health milestones.
- **Urgent Orange** for time-sensitive notifications or pending appointments.
- **Critical Red** for immediate health alerts or system errors.

Neutral shades should be derived from the primary maroon, using extremely low-saturation tints to ensure the grayscale elements feel warm rather than cold.

## Typography

The design system utilizes **Montserrat** across all touchpoints to maintain a geometric, clean, and modern feel. Hierarchy is established through significant weight shifts (from 400 for body text to 700 for headlines).

### Signature AI Flourish
Whenever the text "AI" appears on a maroon background (such as in the app name or headers), it must be set in **900 weight**. It features a soft white radial glow (`box-shadow` or `drop-shadow` with 15px-20px blur at 30% opacity) to signify the "intelligence" layer shining through the brand.

## Layout & Spacing

This design system follows a **fluid grid** model for mobile devices, utilizing a standard 8px base unit. 

- **Outer Margins:** All screens should maintain a 20px horizontal margin to provide "breathing room" for the content.
- **Vertical Rhythm:** Elements are stacked using 8px increments. Related items (labels + inputs) use 8px, while distinct sections use 24px or 32px.
- **Safe Areas:** Ensure all bottom-fixed elements respect mobile home-indicator safe areas.

## Elevation & Depth

Visual hierarchy is managed through **tonal layers** and subtle **ambient shadows**. 

- **Base Layer:** #F5F5F5 (Light Gray) background.
- **Content Layer:** #FFFFFF (White) cards.
- **Depth:** Use a single, soft shadow for cards (Y: 4px, Blur: 12px, Color: Maroon at 4% opacity). This "tinted shadow" keeps the UI feeling warm and cohesive rather than using generic black/gray shadows.
- **Hero Layer:** Solid Maroon headers sit at the highest perceived depth, despite being flat, due to their saturated color.

## Shapes

The shape language is friendly and approachable, avoiding sharp corners that could feel aggressive in a medical context.

- **Pill Shapes:** Reserved for interactive elements like buttons and chips, inviting touch with a 50px radius.
- **Card Containers:** Use a consistent 12px radius to house information.
- **Structural Headers:** Hero headers feature a distinct 20px radius on the bottom-left and bottom-right corners only, creating a soft transition into the content area.

## Components

### Buttons
- **Primary:** Full pill shape (50px radius), Maroon background, White Montserrat 600 text.
- **Secondary:** Full pill shape, Maroon 1.5px stroke, Maroon text, no fill.

### Cards
- **Standard Card:** 12px radius, White background, subtle maroon-tinted shadow. 
- **Action Card:** Same as standard, but with a 1px Light Gray border to signify interactivity.

### Hero Headers
- Solid Maroon #800000 background.
- 20px rounded bottom corners.
- Content inside must be White. This is the primary location for the **AI Signature Flourish**.

### Input Fields
- White background with a 12px radius.
- 1px Light Gray border that transitions to Maroon on focus.
- Placeholder text in Montserrat 400, Light Gray.

### Status Indicators
- Small circular dots or pill-shaped tags using the defined Status Colors.
- Text within status tags should be uppercase Montserrat 700 at 10px or 12px.