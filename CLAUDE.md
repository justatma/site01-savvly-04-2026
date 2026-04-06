# Savvly Website — CLAUDE.md

## Project Overview
Marketing website for Savvly, a fintech startup offering an SEC-registered longevity benefit product. This is a B2B sales support tool targeting three ICPs: employers/HR, financial advisors, and benefit brokers. The site must look like nothing else in financial services. All copy is provided by the team — do not generate or rewrite any text. Build exactly what is specified.

## Always Do First
- Invoke the `frontend-design` skill before writing any frontend code, every session, no exceptions.
- Check the `brand_assets/` folder before designing. It contains logos, color specs, and reference screenshots.
- Check the `copy/` folder for page-specific text. Use it verbatim. Do not edit, improve, or rewrite any copy.
- Confirm the relevant copy file exists before building any page. If the copy file is missing or empty, stop and say so. Do not build with placeholder or generated text.

## Tech Stack
- Static HTML/CSS/JS
- Tailwind CSS via CDN
- Separate HTML file per page
- Mobile-first responsive

## Typography
Headlines: Lora (Google Fonts), serif. Body: Verdana with system-ui and sans-serif fallbacks.

```
fontFamily: {
  display: ['"Source Serif 4"', 'Georgia', 'serif'],
  body: ['Verdana', 'system-ui', 'sans-serif'],
}
letterSpacing: {
  'tight-xl': '-0.03em',
  'tight-lg': '-0.02em',
}
lineHeight: {
  'body': '1.68',
}
```

- Load Source Serif 4 from Google Fonts (weights 400, 600, 700). Verdana is a system font — do not load it from a CDN.
- Tight tracking (-0.02em to -0.03em) on large headings only.
- Generous line-height (1.68) on body text.
- Headlines are large, confident, and use white space generously.
- Blue accent text in headlines uses Brilliant Blue #3478EB.
- Do not use all-caps for headlines.

## Site Architecture
Navigation bar across the top of every page. Five tabs plus a CTA button:

How It Works | Employers | Financial Advisors | Benefit Brokers | About | [GET STARTED] button

Homepage has NO call to action in the hero. The persona branching point and CTA live lower on the page. GET STARTED in the nav is the only persistent CTA.

## Responsive Breakpoints
- Mobile: up to 639px. Single column. Nav collapses to hamburger menu.
- Tablet: 640px–1023px. Two-column where appropriate. Nav remains full or collapses depending on fit.
- Desktop: 1024px+. Full layout. Nav is always visible with all tabs.
- Persona cards: stack vertically on mobile and tablet, three columns on desktop.
- Test at 375px (mobile), 768px (tablet), and 1280px (desktop) minimum.

## Pages
- `index.html` — Homepage
- `how-it-works.html` — Product mechanics
- `employers.html` — Employer/HR persona page
- `advisors.html` — Financial Advisor persona page
- `brokers.html` — Benefit Broker persona page
- `about.html` — Team, story, credibility

Build one page at a time. Start with index.html. Do not build other pages until directed. Before building any page, confirm its copy file exists in the `copy/` folder.

## Brand Colors (exact values, no substitutes)
- Brilliant Blue: #3478EB (primary accent)
- Vivid Blue: #2B3D9A (dark blue, nav, deep backgrounds)
- Baby Blue: #A7C7E7 (light accent)
- Pollon Yellow: #ECD06F (warm accent, use very sparingly)
- White: #FFFFFF (primary background)
- Near-black: #1A1A2E (text, dark sections)

Do NOT use default Tailwind blue/indigo palette. Use only these brand colors and derivatives.

## Homepage Section Sequence
Build these sections in this exact order. All copy is in `copy/homepage.md`.

1. **Hero** — Headline + subtext above a video placeholder (16:9 ratio, centered). No CTA in hero. Just the headline, supporting text, and video. Video is a Vimeo embed (player.vimeo.com/video/1179952475), 16:9 ratio, centered, with autoplay, muted, and loop enabled, with modest max-width so it doesn't stretch full-bleed.

2. **Below-video paragraph** — The four-sentence founding insight block. Centered, generous margins.

3. **Persona subhead** — "You are responsible for the financial well-being of others. This was made for you." Large serif (Lora), centered.

4. **Persona navigation portal** — This section is wayfinding, not content. It mirrors the nav tabs. The user should feel they are choosing a door, not reading a brochure. Design it as a selection interface.

   Three columns on desktop, stacked on mobile. Each persona block contains: an identifying headline (Lora, significantly larger than body text — at least 1.5x body size), 2-3 lines of supporting text (visually subordinate to the headline), 3 bullet-style details, and a prominent link to the persona page. The link is the primary interactive element and should not be buried below the bullets.

   **Visual separation:** No background fills, no rounded-corner cards, no drop shadows. Each persona block is defined by an animated border line: on hover, a 1-2px Brilliant Blue (#3478EB) line traces the full perimeter of the block over 0.6-0.8s, using a single clean animation (CSS border or SVG path). The line traces once, stays complete while hovered, and fades on mouse-out. No glow, no shadow, no background fill change. On mobile (where there is no hover), use a static subtle border or left-edge accent line instead.

   **Employees/Individuals row:** Below the three persona blocks, a single row for Employees/Individuals. This row contains a short line of text and a mailto: link. The mailto: link opens the user's default email client with a pre-written subject and body. The email text is in `copy/email-to-hr.md`. Use standard mailto: encoding for subject and body parameters. Do not use clipboard copy. Do not generate the email text — pull it verbatim from the copy file.

5. **Footer CTA** — "See Savvly in action" with REQUEST A DEMO button and HOW THE POOL WORKS link. Credibility line below: SEC-Registered | Assets at Vanguard · Fidelity · US Bank | Disclaimer text in small type.

6. **Footer** — Logo, copyright, legal links (Privacy, Terms, Disclosures, Disclaimers, Assumptions).

## Design Philosophy: Brutalist with Grace
This site must NOT look like any existing financial services website. The Fidelity Test: if you could put "Fidelity" or "Betterment" or "Wealthfront" at the top and the page still makes sense visually, the design has failed.

### Banned Patterns (do not use under any circumstances)
- Three-card numbered triptychs (01, 02, 03 with icons)
- Feature comparison grids with checkmarks and X marks
- Large projected-return dollar figures as hero elements
- Cream-and-gold or teal-and-warm color palettes
- Rounded-corner card grids that look like Webflow templates
- Stat cards in dark blocks
- Testimonial carousels
- Logo trust bars (rows of partner logos)
- Gradient hero banners
- Stock photography of happy older people

### Do This Instead
- White space is the primary design material
- Typography carries the emotional and structural weight
- Surfaces have a layering system (base, elevated, floating) — not everything at the same z-plane
- Shadows are layered and color-tinted with low opacity, never flat shadow-md
- Animations only on transform and opacity, spring-style easing, never transition-all
- Every clickable element needs hover, focus-visible, and active states
- Spacing uses intentional, consistent tokens — not random Tailwind steps
- The page should feel architectural and spare, not decorative

## Logo
- Path: `brand_assets/logo/savvly_logo.png` — no leading space or slash in the src attribute.
- Verify the logo loads visually on every build. If the image does not render, check the path for encoding issues (%20, leading spaces, wrong directory).

## Screenshot Workflow
Use Puppeteer to screenshot the site after each build pass.
- Always serve on localhost — never screenshot a file:/// URL
- Screenshots save to `./temp_screenshots/` with auto-incrementing names
- After building each section, screenshot it, review against reference images in `brand_assets/reference/`, and fix mismatches
- Do at least 2 comparison rounds per page, maximum 4. After 4 rounds, list remaining differences and flag them for human review. Do not loop indefinitely.
- When comparing, check: spacing/padding, font size/weight, colors (exact hex), alignment, visual hierarchy
- Reference screenshots are directional, not pixel specifications. Match the visual language and hierarchy, not exact pixel values.

## Reference Images
- Reference screenshots from the approved design direction are in `brand_assets/reference/`
- Match the visual language, spacing philosophy, and typographic hierarchy of the references
- Do NOT clone them pixel-for-pixel — they are directional, not specifications
- The approved design uses generous white space, large serif headlines, blue accent words, and minimal decoration

## File Structure
```
savvly-website/
  CLAUDE.md
  serve.mjs
  screenshot.mjs
  brand_assets/
    logo/
    reference/
    brand-guidelines.md
  copy/
    homepage.md
    email-to-hr.md
    employers.md
    advisors.md
    brokers.md
    how-it-works.md
    about.md
  src/
    index.html
    how-it-works.html
    employers.html
    advisors.html
    brokers.html
    about.html
    css/
      style.css
    js/
      main.js
    assets/
      images/
      video/
  temp_screenshots/
```

## Hard Rules
- Do not generate, rewrite, or improve any copy. Use text from the copy/ folder verbatim.
- Do not add sections, features, or content not specified in the copy files or this document.
- Do not use any banned design patterns listed above.
- Do not use stock photography or placeholder images of people.
- Do not stop after one screenshot pass.
- Do not use transition-all.
- Always test on localhost before any review.
- Build one page at a time. Start with index.html. Do not build other pages until directed.
- Confirm copy file exists before building any page. If missing, stop and report.
- Logo path is `brand_assets/logo/savvly_logo.png` with no leading space. Verify it loads on every build.
- Do not use all-caps for headlines.
