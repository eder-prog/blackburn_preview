# Lighthouse + A11y Checklist — Pre-Deploy

Run these before deploying to production.

## Lighthouse (Chrome DevTools)

Target scores (mobile + desktop):
- [ ] **Performance:** 95+
- [ ] **Accessibility:** 95+
- [ ] **Best Practices:** 95+
- [ ] **SEO:** 95+

### How to run
1. Open `dist/index.html` locally OR deploy to a staging URL
2. Chrome DevTools → Lighthouse tab → Analyze page load
3. Run for both Mobile + Desktop

### Common issues to verify if scores drop
- [ ] All `<img>` tags have `alt` attributes (we use `aria-label` on bg divs — verify these read correctly)
- [ ] Form labels visible/announced
- [ ] No layout shift on font load (we use `font-display: swap` in Google Fonts URL — verify CLS < 0.1)
- [ ] Color contrast (tokens already AA+, but verify in real device)

---

## A11y verification (manual)

### Keyboard navigation
- [ ] Tab through entire page from top — focus visible at every step
- [ ] Tab order is logical (header → hero CTAs → services → about link → process → reviews link → final-CTA buttons → form fields → footer links)
- [ ] Enter activates buttons + links
- [ ] Spacebar toggles checkboxes
- [ ] Esc closes mobile nav overlay (if open)
- [ ] Focus is trapped inside mobile nav when open (TODO if Lighthouse flags — not currently trapped)

### Screen reader (VoiceOver on macOS, NVDA on Windows, TalkBack on Android)
- [ ] Brand wordmark reads as "Blackburn Construction — home" (via aria-label)
- [ ] Hero h1 reads "Build. Remodel. Repair. Done."
- [ ] Trust band items each announce label + detail
- [ ] Service cards each announce title + body
- [ ] About section image announced as "Stock photo placeholder — replace with photo of Jonathan Blackburn..."
- [ ] Process steps announce "01, 02, 03" with title + body
- [ ] Form labels are announced for each field
- [ ] Required fields announce as "required"
- [ ] Submit button announced as disabled until checkbox checked
- [ ] Success state announced (aria-live="polite")
- [ ] Footer columns navigable

### Color contrast (run `chrome://extensions/?id=axe-DevTools` or use webaim.org/resources/contrastchecker/)
- [ ] Forest text on Linen bg: should be 13.8:1 (AAA) ✓
- [ ] Linen text on Forest bg: same ratio ✓
- [ ] Saffron on Linen (eyebrows light section): should be ~5.8:1 (AA) — verify ✓
- [ ] Walnut on Saffron (CTA text): should be 11.2:1 (AAA) ✓
- [ ] Brick italic on Linen (About paragraph): should be ~5.8:1 (AA) ✓
- [ ] Moss text on Linen (secondary): should be ~5.2:1 (AA) ✓

### Reduced motion
- [ ] In OS settings, enable "Reduce motion"
- [ ] Reload page
- [ ] `ctaBounce` animation should NOT play
- [ ] Smooth scroll should be instant
- [ ] Hover transitions should be near-instant

### Viewport sizes
- [ ] 360px width (oldest small phones): no horizontal scroll, all text readable, sticky CTA visible
- [ ] 414px (modern phones): same checks
- [ ] 768px (tablets): grid switches to 2-col, header still legible
- [ ] 1024px (laptops): 3-col grid, header full layout
- [ ] 1440px (desktops): max container, generous whitespace
- [ ] 1920px+ (large monitors): no over-stretch, container max-width holds

---

## A2P compliance (CRITICAL for TCPA)

- [ ] **`consent_contact` checkbox is REQUIRED** (form will not submit without it) ✓
- [ ] **`consent_sms` checkbox is OPTIONAL** (form submits without it) ✓
- [ ] Submit button is disabled until required checkbox checked ✓
- [ ] SMS copy includes: "Consent is not a condition of any purchase" ✓
- [ ] SMS copy includes: "Message and data rates may apply" ✓
- [ ] SMS copy includes: "Reply STOP to opt out anytime" ✓
- [ ] SMS copy links to SMS Terms (terms.html#sms) ✓
- [ ] SMS copy links to Privacy Policy (privacy.html) ✓
- [ ] `terms.html` §4 "SMS Program Terms" covers: opt-in, program description, frequency, charges, carriers, STOP, HELP, privacy ✓
- [ ] `privacy.html` §4 "SMS / Text messaging" matches Terms §4 ✓
- [ ] Both pages display the orange "DRAFT — review with legal counsel before deploy" banner ✓
- [ ] **Have a lawyer review** before going live. The above is starter text, not legal advice.

---

## SEO

- [ ] `<title>` includes brand + key services + location
- [ ] `<meta name="description">` is ≤155 chars and descriptive
- [ ] One `<h1>` on the page (hero)
- [ ] Semantic structure (h1 → h2 → h3 nested correctly)
- [ ] `lang="en"` on `<html>`
- [ ] All anchor links have descriptive text (no "click here")
- [ ] `aria-label` on logo link

### Recommended after deploy
- [ ] Submit to Google Search Console + Bing Webmaster Tools
- [ ] Verify Google Business Profile points to the live URL once domain is purchased
- [ ] Set up Google Analytics 4 or Plausible (privacy-respecting)
- [ ] Add Schema.org `LocalBusiness` JSON-LD to the page head:
  ```html
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": "Jonathan Blackburn Construction LLC",
    "image": "https://yourdomain.com/og.jpg",
    "telephone": "+18036657033",
    "email": "jsblackburn3@yahoo.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gaston",
      "addressRegion": "SC",
      "postalCode": "29053",
      "addressCountry": "US"
    },
    "areaServed": ["Gaston, SC", "Lexington County, SC", "Columbia, SC"],
    "priceRange": "$$"
  }
  </script>
  ```

---

## Final pre-deploy checklist

- [ ] All `data-pending="true"` placeholders replaced
- [ ] Hero bg upgraded from CSS gradient to real photo (or kept intentionally)
- [ ] Form backend wired (or mailto verified working on owner's machine)
- [ ] Privacy + Terms reviewed by counsel
- [ ] OG image added (`<meta property="og:image">`)
- [ ] Favicon added (`<link rel="icon">`)
- [ ] Lighthouse run on staging URL — all scores 95+
- [ ] Mobile tested on real device, not just DevTools emulator
- [ ] SMS Consent checkbox is OPTIONAL (NOT required) — verify one more time
