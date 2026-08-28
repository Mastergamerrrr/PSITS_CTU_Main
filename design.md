# Design System — PSITS-CTU Main Website/Portal

## 1. Overview

The PSITS-CTU Main interface keeps the org's Electric Blue identity, restructured with the Wise-inspired design language: a single confident blue accent against a pale blue-tinted canvas, near-black navy text, and an unusually heavy weight-900 display face for hero moments. The result reads like a calm, confident student-tech magazine rather than a typical school portal — generous whitespace, large pill-rounded cards, and one dominant accent color doing all the work, with CTU gold kept strictly as a small heritage detail.

## 2. Color Palette

| Role | Color Name | Hex | Usage |
|---|---|---|---|
| Primary Accent | Tech Electric Blue | `#0066FF` | Primary buttons, CTAs, active states, links, brand accent |
| On-Primary | White on Blue | `#ffffff` | Text/icons sitting on top of the blue accent |
| Primary Hover/Active | Cobalt Blue | `#0052CC` | Hover / pressed state of primary buttons |
| Primary Neutral | Blue Mid | `#B9D2FA` | Neutral active fills, selected states, borders |
| Primary Pale | Blue Mist | `#F1F6FF` | Soft surface tints, badge backgrounds |
| Ink | Midnight Navy | `#14213D` | Default headings and body text |
| Ink Deep | Campus Blue | `#0B3B8F` | Text/surfaces needing high-contrast blue depth (footer, admin nav) |
| Body | Body Slate | `#3C445A` | Secondary body copy |
| Muted Text | Slate Gray | `#64748B` | Captions, placeholders, fine print |
| Main Canvas | White | `#FFFFFF` | Card interiors |
| Soft Background | Blue Mist Canvas | `#F1F6FF` | Page canvas, hero band, section bands |
| Positive | Success Green | `#2ead4b` | Success indicators (never reuse Blue for this) |
| Positive Deep | Success Deep | `#054d28` | Pressed success state |
| Warning | Warning Yellow | `#ffd11a` | Caution indicators |
| Warning Deep | Warning Deep | `#b86700` | Pressed warning state |
| Warning Content | Warning Text | `#4a3b1c` | Text on warning surfaces |
| Negative | Error Red | `#d03238` | Destructive / error states |
| Negative Deep | Error Deep | `#a72027` | Pressed destructive state |
| Negative Bg | Error Dark Bg | `#320707` | Dark destructive callout backgrounds |
| Heritage Accent | CTU Gold | `#F5B800` | Awards, seals, heritage/official-affiliation details ONLY — never a CTA or page background |

### CSS Custom Properties

```css
:root {
  --color-primary: #0066FF;
  --color-on-primary: #ffffff;
  --color-primary-hover: #0052CC;
  --color-primary-neutral: #B9D2FA;
  --color-primary-pale: #F1F6FF;

  --color-ink: #14213D;
  --color-ink-deep: #0B3B8F;
  --color-body: #3C445A;
  --color-text-muted: #64748B;

  --color-surface-white: #ffffff;
  --color-bg-soft: #F1F6FF;

  --color-positive: #2ead4b;
  --color-positive-deep: #054d28;
  --color-warning: #ffd11a;
  --color-warning-deep: #b86700;
  --color-warning-content: #4a3b1c;
  --color-negative: #d03238;
  --color-negative-deep: #a72027;
  --color-negative-bg: #320707;

  --color-heritage-gold: #F5B800;
}
```

**Do**
- Reserve `--color-primary` blue for every primary CTA — it is the single dominant brand accent, structured the same way the source system treats its one accent color. No second accent competes with it.
- Use the full semantic set (positive / warning / negative) for status — never repurpose blue as a "success" color.
- Keep CTU Gold confined to badges, seals, and heritage/awards moments — a small percentage of any page, never a CTA or background fill.

**Don't**
- Don't let gold compete with blue for primary attention — blue is the sole identity color; gold is a heritage detail only.
- Don't place the blue CTA on a blue background; it always sits on Blue Mist, white, or Campus Blue.
- Don't use gold as small body text on white (fails contrast).

## 3. Typography

Two faces ladder the system, same as the source language: a heavy proprietary-style display face for hero moments, and a neutral grotesk for everything else.

| Style | Font | Weight | Size | Usage |
|---|---|---|---|---|
| Display Mega | Manrope (Wise Sans substitute) | 900 | 126px / 96px | Largest hero headline (landing page only) |
| Display Hero | Manrope | 900 | 64px | Standard page hero headline |
| Display Section | Manrope | 900 | 40px | Section / card headlines |
| Display Sub | Inter | 600 | 32px | Inter-rendered sub-headings |
| Body Large | Inter | 400 | 20px | Lead paragraphs |
| Body | Inter | 400 | 16px | Default body copy |
| Body Strong | Inter | 600 | 16px | Bold inline body / nav links |
| Body Small | Inter | 400 | 14px | Secondary body, metadata |
| Caption | Inter | 400 | 12px | Fine print |
| Button | Inter | 600 | 16px | Button labels |

- **Weight 900 for hero, weight 600 or lighter for everything else.** This contrast is the brand's typographic signature — never render a hero headline below weight 700.
- Font substitutes if Manrope 900 is unavailable: Inter at weight 900, or Geist at weight 800.
- Base body size: `16px` with `1.5` line height (`24px`).
- Keep reading widths near 65 characters.

## 4. Layout & Components

### Shape Language

| Token | Value | Use |
|---|---|---|
| `radius-sm` | 8px | Inline pills, small badges |
| `radius-md` | 12px | Form inputs |
| `radius-lg` | 16px | Mid-size cards |
| `radius-xl` | 24px | **Canonical card + button radius — non-negotiable** |
| `radius-pill` | 9999px | Status pills |
| `radius-full` | 9999px | Circular icon containers |

Cards and buttons are always pill-rounded at `24px`. No sharp rectangles on interactive elements.

### Header / Navbar

- White background, no border needed — surface contrast against the Blue Mist canvas below does the work.
- Active nav item and primary CTA use the Electric Blue accent.
- Sticky on scroll, no shadow — the brand relies on flat, layered surfaces rather than drop shadows.
- Navigation controls maintain a 44px minimum touch target.

### Page Headers / Hero Band

- Background: Blue Mist Canvas (`#F1F6FF`), running the full width of the hero section.
- Headline in Display Mega/Hero, weight 900, Midnight Navy text color.
- A white, pill-rounded card (e.g. a quick-schedule or GPA-lookup widget) sits on top of the Blue Mist band as the signature interactive element — mirroring the source system's currency-converter card.
- Optional dark/inverted hero variant: Campus Blue background (`#0B3B8F`) with white headline text, used sparingly for major announcements or events — no pure-black inverted sections.

### Cards & Containers

| Variant | Background | Text | Use |
|---|---|---|---|
| Card — Default | White | Navy | Default content card sitting on Blue Mist canvas |
| Card — Blue Mist | Blue Mist | Navy | Feature card blending into the page background |
| Card — Blue Pale | Blue Mist / Blue Mid border | Navy | Highlighted/featured feature card |
| Card — Campus Blue | Campus Blue | White | Promotional / featured-announcement card (polarity-flipped) |
| Card — Heritage | White | Navy | Awards/heritage card, `1px solid` CTU Gold accent border only |

- All cards: `24px` radius, `24px` interior padding, no border by default, no drop shadow — elevation comes from surface contrast (white card on Blue Mist canvas), not shadows.
- Hover states may lift by 2px; border may shift to Blue Mid on hover for cards that use a border.

### Buttons

| Variant | Background | Text | Border |
|---|---|---|---|
| Primary | Electric Blue (`#0066FF`) | White | none |
| Secondary | Blue Mist (`#F1F6FF`) | Electric Blue | `1px solid #B9D2FA` |
| Tertiary / Ghost | White or transparent | Navy | none |
| Heritage | Pale Gold tint | Navy | `1px solid #F5B800` |
| Icon (circular) | White | Navy | none, `radius-full` |

- All buttons: `24px` pill-rectangle radius, `12px 24px` padding, `16px`/weight 600 label.
- Preserve visible focus rings for accessibility.
- Heritage buttons are reserved for award/affiliation moments — never used as a general primary CTA.

### Badges / Tags

- Positive/status badges: pale success-green background tint, Success Deep text, pill radius.
- Negative/status badges: dark maroon background (`#320707`), white text, pill radius.
- Category/status tags: Blue Mist background, Electric Blue text, subtle Blue Mid border.
- Achievement tags: CTU Gold accent — small pill only, never a full section fill.
- Pair status color with a clear text label; never rely on color alone.

### Footer

- Background: Campus Blue (`#0B3B8F`) or Midnight Navy — the brand's one strong dark surface.
- Text: Blue Mist (`#F1F6FF`) at Body Small size.
- Generous `48px` top/bottom padding.

## 5. Surface & Elevation Strategy

- **Level 0 — Flat**: no shadow, no border; the default for most elements.
- **Level 1 — Hairline**: `1px solid` Navy or Blue Mid border, used only for tertiary buttons, text inputs, and heritage cards.
- **Level 2 — Soft Card**: a white card on the Blue Mist canvas — the surface-color contrast itself *is* the elevation cue, not a shadow.

Cycle page surfaces: Blue Mist (page/hero) → White (cards) → occasional Campus Blue (footer, admin nav, featured/dark promo sections). Avoid pure black full-page sections; Campus Blue is reserved for small high-contrast panels or promotional bands, matching the org's existing usage.

## 6. Iconography & Imagery

- Consistent line icons, `1.5–2px` stroke, rendered in Navy.
- Use Electric Blue only for active/selected icon states — never as a generic system icon color for every icon.
- CTU Gold tints achievement/heritage icons only.
- Prefer real PSITS event photography where available; otherwise use flat illustrative SVGs consistent with the blue palette rather than stock photography.

## 7. Spacing & Grid

- Base spacing unit: `4px` — tokens: `2 / 4 / 8 / 12 / 16 / 24 / 32 / 48px`.
- Max content width: `1200px`, centered.
- Section (band) padding: `48px` top/bottom on desktop.
- Card interior padding: `24px`.
- Desktop gutter: `24px`; mobile gutter: `16px`.

## 8. Accessibility

- Maintain WCAG 2.1 AA contrast for text and interactive controls — white-on-Electric-Blue and Navy-on-Blue-Mist both pass; verify any custom combinations before shipping.
- Do not use CTU Gold as small body text on white; reserve it for buttons, badges, and large display accents.
- Do not rely on color alone for state — pair every status color with a text label or icon.
- Provide visible `2–3px` focus indicators in Electric Blue, whichever contrasts better against the given surface.
- Preserve keyboard access, semantic landmarks, descriptive labels, and reduced-motion preferences.
- Interactive controls should provide at least a 44×44px touch target.
