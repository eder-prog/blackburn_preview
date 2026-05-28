# Blackburn Construction — Landing Page (Deploy-Ready Bundle)

**Generated:** 2026-05-27 by Opensquad `landing-builder` squad (run `2026-05-27-194432`)
**Brand:** Field House direction v2 (per `brand-v2.html`)
**Status:** Pitch demo — production-ready after `[TODO]` placeholders are filled

---

## What's in this folder

```
dist/
├── index.html                       Main landing (10 sections)
├── privacy.html                     A2P-compliant Privacy Policy starter
├── terms.html                       A2P-compliant Terms + §4 SMS Program Terms
├── README.md                        This file
├── LIGHTHOUSE-CHECKLIST.md          Pre-deploy verification checklist
└── assets/
    ├── css/
    │   ├── tokens.css               Field House design tokens (colors, type, spacing)
    │   └── brand.css                All component styles + responsive
    └── js/
        └── main.js                  Adaptive header + form validation + smooth scroll
```

**Bundle size:** ~64 KB ungzipped, ~18 KB gzipped. Lighthouse-friendly.

---

## How to deploy

### Option 1 — Static host (Vercel / Netlify / Cloudflare Pages)
1. Drag-and-drop the `dist/` folder onto Vercel/Netlify
2. Done. URL provisioned in ~10 seconds.

### Option 2 — Cheap hosting (any static host)
1. Upload `dist/` contents to web root via FTP/SFTP
2. Make sure `.html` files are served with `Content-Type: text/html`
3. Done.

### Option 3 — GitHub Pages
1. Push the `dist/` contents to a `gh-pages` branch (or `docs/` folder)
2. Enable Pages in repo settings
3. Done.

**No backend required.** The form uses `mailto:` to send estimates directly to `jsblackburn3@yahoo.com`. For a production site, consider replacing the mailto with a real form handler (Formspree, Netlify Forms, Vercel form endpoint).

---

## `data-pending="true"` — TODO list (replace before deploy)

These placeholders are tagged in HTML for easy find/replace. Updated 2026-05-27 with new data from research call.

### Still pending

| # | Location | Placeholder | What to replace with |
|---|---|---|---|
| 1 | Trust band item 3 + Footer brand + Terms §10 | `[TODO]` | **SC General Contractor License number** — verify at https://verify.llronline.com (the LLC ID 1033937 is already in place — this is a SEPARATE contractor license from SC LLR) |
| 2 | About section `<div class="about__photo">` | Stock CSS bg | Actual photo of Jonathan Blackburn on a real job site (4:5 aspect ratio recommended). Pull from GBP or have him send a phone shot. |
| 3 | Hero `.hero` CSS bg | CSS gradient only | Real construction-site photo (residential, daylight, no posed contractor). See main README section below for how to swap. |
| 4 | Footer Contact col + Privacy/Terms §9-§10 | `info@blackburnconstruction.com` | Professional email mailbox — set up `info@` once domain is registered. Currently a placeholder. |
| 5 | `main.js` mailto target | `jsblackburn3@yahoo.com` | Swap to `info@blackburnconstruction.com` once mailbox is set up (line in main.js is marked with `// TODO:`) |
| 6 | Services section (whole) | 6 tentative categories | **Confirm with Jonathan on the discovery call** which services he actually offers. Drop any he doesn't do — "Lista falsa quebra credibilidade." Current placeholder list: Remodels & Additions / Framing & Carpentry / Roofing / Concrete & Pavers / Siding / General Construction. |

### Already resolved (do NOT re-edit)

✅ Founded year: **2020** (was `[YEAR]`)
✅ SC LLC ID: **#1033937** (Good Standing) — added to Trust band, Footer, Terms
✅ Service area: Gaston · Lexington · West Columbia · Cayce · Pelion · Swansea · Columbia south · Sandy Run (8 cities listed in Service Area section + Footer)
✅ Privacy + Terms "Last updated" / "Effective" dates: May 27, 2026
✅ Yahoo personal email dropped from public-facing site (still used internally as mailto fallback in JS, swap when info@ is ready)
✅ Same-day response promise added (form, trust band, success state)
✅ Google Maps embed centered on Gaston, SC (Service Area section)

**Bulk find/replace:** open every `.html` + `.js` in your editor and search for `data-pending="true"` to find every remaining placeholder.

### Other things to swap (not tagged but worth checking)
- Hero background image — currently CSS-only gradient. Swap to a real construction-site photo for production:
  ```css
  /* in brand.css .hero block, replace background: with: */
  background:
    linear-gradient(180deg, rgba(20, 39, 30, 0.55) 0%, rgba(20, 39, 30, 0.85) 75%, rgba(20, 39, 30, 0.96) 100%),
    url('assets/img/hero-jobsite.jpg') center/cover no-repeat,
    var(--c-forest-dark);
  ```
  Recommended photo: a residential framing site, available light, wide-shot. NOT a posed contractor portrait.

- Form backend — `mailto:` works for low-volume demos. For production:
  - Formspree: change form `action` to your Formspree endpoint
  - Netlify Forms: add `data-netlify="true"` and `name="estimate"` attributes
  - Vercel: build an API route at `/api/estimate` and POST from `main.js`

- OG / social share image — add `<meta property="og:image" content="...">` tag to `index.html` head once you have one (1200×630px, JPG, ~80KB).

- Real reviews — once Jonathan has GBP reviews, the empty-state section in `index.html` can be replaced with a testimonials carousel. See `_memory/memories.md` for the CSS-only infinite scroll pattern (validated 2026-05-11).

---

## Browser support

- Modern Chrome / Edge / Safari / Firefox (last 2 versions)
- Mobile Safari + Chrome Android (last 2 versions)
- Graceful degradation on older browsers (sticky header still works, layout still renders, form still submits)

---

## Accessibility

This landing aims at WCAG 2.1 AA. Verified:
- Color contrast pairs all AA+ (verified pairs in `brand-v2.html` color section)
- All form labels linked (`for=`/`id=`)
- `aria-required`, `aria-invalid`, `aria-describedby` on form fields
- `aria-live="polite"` on form success message
- Keyboard navigation: tab order natural, focus rings visible on all interactive elements
- `prefers-reduced-motion: reduce` disables all animations
- Touch targets minimum 44px on mobile
- Semantic HTML: `<header>`, `<nav>`, `<main>` implicit (form-section as landmark), `<footer>`, `<section>` with `aria-labelledby`

Run `LIGHTHOUSE-CHECKLIST.md` before deploy.

---

## Tech notes

- **No frameworks.** Vanilla HTML/CSS/JS. No React, no jQuery, no Tailwind compile step.
- **No third-party CDN** beyond Google Fonts. Stable.
- **Adaptive header** detects light/dark sections under it using `document.elementFromPoint()` 3-sample voting (validated pattern from State Roofing run 2026-05-11 — beats IntersectionObserver with sentinel).
- **Logo morph** on scroll uses CSS `width` transition + opacity crossfade (not 2 separate PNGs — we don't have logo assets yet).
- **Form validation** is custom (vanilla `validate()` function), not HTML5 `:invalid` styling. Gives us full control over when errors show (blur-driven, not on every keystroke).
- **`ctaBounce`** keyframe at 1.5s (validated faster-feel pattern from State Roofing 2026-05-11).
- **Mobile sticky CTA bar** appears between 18% and 92% of scroll progress (avoids hiding hero CTAs at top and footer CTAs at bottom).
- **All `<em>` inside `h1`/`h2`** is Fraunces italic — body Fraunces is already italic, so `<em>` doesn't re-italicize, just provides semantic emphasis.

---

## Editing tips

### Swap the primary CTA color
1. Open `assets/css/tokens.css`
2. Change `--c-saffron: #D9A431;` to your new color
3. Also update `--c-saffron-dark` (10% darker for hover) and verify AA contrast with cream

### Add a new service card
1. In `index.html`, find `<div class="services__grid">`
2. Duplicate one `<article class="service-card">` block
3. Update the SVG icon, title, and body
4. Grid auto-expands; mobile re-stacks at <640px

### Change the headline copy
- Hero h1: `Build. Remodel. Repair. <em>Done.</em>` — change in `index.html` line ~50
- Italic emphasis: wrap a word in `<em>` to make it Saffron in dark sections / Brick in light sections (controlled by CSS)

### Move the form
- Want the form earlier in the page? Cut the `<section class="form-section">` block in `index.html` and paste it before `<section class="final-cta">`. Anchor links (`#estimate-form`) still work because the `<a id="estimate-form">` lives after the form section — adjust if you move things.

---

## What this landing does NOT do (intentional)

| Omitted | Why |
|---|---|
| Multi-page (about, services, contact each on own page) | Single-page lead-gen converts faster for prospect demo. |
| Bilingual EN/ES | Brief locked English only — SC 803 audience. |
| Portfolio gallery | Zero real project photos — gallery would require stock fakes (rejected). |
| Testimonials carousel | Zero GBP reviews — honest "coming soon" empty state instead. |
| FAQ section | Per RAH360 learning (run 2026-05-04): FAQ pesa contra Trust-First positioning. Objections resolved on the estimate call. |
| Pricing tiers | General contractor pricing is custom-quoted. No tiers visible. |
| Real backend form | mailto fallback used for prospect demo. Swap to Formspree/Netlify Forms for production. |
| Logo SVG | No logo file yet. Text-based Anton wordmark + JB monogram cube renders fine. |
| Particle/animation backgrounds | Field House aesthetic = restrained. No tsparticles, no Lottie. |

---

## Quick reference — brand tokens

| Token | Hex | Use |
|---|---|---|
| Forest | `#1F3A2D` | Primary dark, header on scroll, footer, dark sections |
| Saffron Amber | `#D9A431` | CTAs only — buttons, focus rings, badges |
| Heritage Brick | `#8C3A2B` | Italic accent on one phrase only (About section) |
| Linen | `#EFE7D5` | Primary light bg |
| Walnut | `#1B1410` | Strong text on cream |
| Moss | `#5B6557` | Secondary text |
| Type | Fraunces (h1/h2) + Anton (CTAs/eyebrows) + Inter (body) + JetBrains Mono (numbers) |

For more, see `brand-v2.html` (in the run folder above this one) and `brands/blackburn/brand.json`.

---

## Credits

- **Brand:** Opensquad `brand-creator` squad → refined by user into v2 Field House (`brand-v2.html`)
- **Landing:** Opensquad `landing-builder` squad, run `2026-05-27-194432`
- **Hosting / business:** Growth Solutions US
- **Owner:** Jonathan Blackburn (Jonathan Blackburn Construction LLC, Gaston SC)

> Built here. Built right.
