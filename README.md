# Ankit Shaw — Developer Portfolio

A single-page personal portfolio website built with **React 19**, **Vite (rolldown)**, and **Tailwind CSS v4**. It presents a dark, glassmorphism-styled introduction to Ankit Shaw — a Frontend / Software Development Engineer with 2+ years of experience — including a project showcase, career timeline, and a working contact form wired to EmailJS.

---

## Tech Stack

| Area | Choice |
|---|---|
| UI library | React 19.2 (`react`, `react-dom`) |
| Build tool | Vite 7.2 — using the **`rolldown-vite`** drop-in via npm alias + `overrides` |
| Styling | Tailwind CSS v4 through the `@tailwindcss/vite` plugin (CSS-first config, no `tailwind.config.js`) |
| Icons | `lucide-react` |
| Email delivery | `@emailjs/browser` (client-side, no backend) |
| Linting | ESLint 9 flat config + `react-hooks` + `react-refresh` |
| Module system | ESM (`"type": "module"`) |

There is **no** router, no state-management library, and no backend — everything is one scrolling page using anchor links.

---

## Project Structure

```
Ankit_Portfolio/
├── index.html                  # Vite entry HTML, mounts #root
├── vite.config.js              # react + tailwind plugins, "@" → ./src alias
├── eslint.config.js            # ESLint 9 flat config
├── public/
│   ├── hero-bg.jpg             # Hero background image
│   ├── profile-photo.jpg       # Profile picture
│   ├── resume.pdf              # Downloadable CV
│   └── projects/
│       └── project1–4.png      # Project screenshots
└── src/
    ├── main.jsx                # createRoot + StrictMode
    ├── App.jsx                 # Composes Navbar → sections → Footer
    ├── index.css               # Tailwind import, @theme tokens, animations
    ├── components/
    │   ├── Button.jsx          # Primary pill button (sm/default/lg)
    │   └── AnimatedBorderButton.jsx  # Outline button w/ SVG tracing border
    ├── layout/
    │   ├── Navbar.jsx          # Fixed nav, scroll state, mobile drawer
    │   └── Footer.jsx          # Copyright, links, socials
    └── sections/
        ├── Hero.jsx
        ├── About.jsx
        ├── Projects.jsx
        ├── Experience.jsx
        ├── Testimonials.jsx    # Built, but currently commented out of App
        └── Contact.jsx
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Other scripts:

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run lint
```

### Environment variables

The contact form needs an [EmailJS](https://www.emailjs.com/) account. Create a `.env` (or `.env.local` — both are gitignored) in the project root:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

If any of the three are missing, the form surfaces an inline error instead of silently failing. The EmailJS template receives three variables: `name`, `email`, and `message`.

---

## Design System

All design tokens live in `src/index.css` using Tailwind v4's `@theme` block, so they're available as normal Tailwind utilities (`bg-background`, `text-primary`, `border-border`, …).

**Palette** — dark teal-on-charcoal:

| Token | Value | Use |
|---|---|---|
| `--color-background` | `#0f1418` | Page background |
| `--color-foreground` | `#f0f2f5` | Body text |
| `--color-primary` | `#20b2a6` | Teal accent — CTAs, links, glows |
| `--color-surface` | `#1a2329` | Cards, chips, inputs |
| `--color-card` | `#141a1f` | Image overlay gradients |
| `--color-muted-foreground` | `#7a8491` | Secondary text |
| `--color-border` | `#242b32` | Hairlines |
| `--color-highlight` | `#f5a623` | Amber secondary glow |
| `--radius` | `0.75rem` | Base corner radius |

**Typography** — `Inter` for body, `Playfair Display` (via a `.font-serif` override) for the italic accent phrases in every section heading.

**Custom component classes:**
- `.glass` / `.glass-strong` — translucent panels using `color-mix()` + `backdrop-filter: blur()`
- `.glow-text` — teal text shadow on the hero headline
- `.glow-border` — teal outer + inset box shadow on featured cards
- `.timeline-glow` — heavy glow on the experience timeline spine

**Custom animations** (keyframes + utilities):
- `fade-in` — opacity + translateY + blur reveal, staggered by `.animation-delay-100` … `-800`
- `slow-drift` — the 30 randomly-placed floating teal dots in the hero
- `float` — bobbing badges on the profile photo
- `marquee` — infinite horizontal skills ticker
- `animated-border` — `stroke-dashoffset` animation that traces a line around the outline button on hover

---

## What Each Section Does

### Navbar (`src/layout/Navbar.jsx`)
Fixed header that swaps from transparent to `.glass-strong` and shrinks its padding once `window.scrollY > 50` (tracked with a `useEffect` scroll listener that cleans itself up). Desktop shows a pill-shaped link group; mobile shows a hamburger that toggles a full-width drawer, and tapping any link closes it. Nav links: About, Projects, Experience — Testimonials is commented out.

### Hero (`src/sections/Hero.jsx`)
- Full-viewport section with a background photo at 40% opacity plus a gradient fade into the page background.
- 30 procedurally placed teal dots, each with randomized position, drift duration, and delay.
- Availability pill ("Software Development Engineer [SDE]") with a pulsing dot.
- Headline mixing bold sans with a serif-italic "precision.", plus a 2+ years intro paragraph.
- Two CTAs: **Contact Me** (anchors to `#contact`) and **Download CV** (opens `/resume.pdf` in a new tab).
- GitHub and LinkedIn social links.
- Profile photo card with a blurred gradient halo, a floating "Available for work" badge, and a "2+ Years Exp." stat badge.
- A **34-item skills marquee** that scrolls infinitely (the array is rendered twice for a seamless loop) with edge gradient masks. Covers JS/TS, React, Next.js, Tailwind, Redux, hooks, REST + SharePoint/Zoho APIs, SPFx, Power Automate, Azure, and tooling.
- Bouncing "Scroll" chevron anchored to `#about`.

### About (`src/sections/About.jsx`)
Two-column layout: a bio on the left (enterprise React work, invoice systems, dashboards, reporting, PDF generation, Agile collaboration) capped by a mission-statement quote card, and a 2×2 grid of highlight cards on the right — Clean Code, Performance, Collaboration, Innovation — each with a Lucide icon and a staggered fade-in.

### Projects (`src/sections/Projects.jsx`)
A 2-column card grid driven by a `projects` array. Each card has a screenshot that scales on hover, a gradient scrim, hover-revealed live-demo and GitHub icon links, a title that turns teal on hover, a description, and tech-tag chips. Four projects are listed, all with live Vercel deployments:

1. **E-Commerce Platform** — product browsing, category filtering, cart (React, React Router)
2. **Image Generator** — text-prompt image search via the Unsplash API
3. **Weather Forecast App** — real-time conditions from a weather API
4. **To Do App** — CRUD task management

Closes with a "View All Projects" outline button.

### Experience (`src/sections/Experience.jsx`)
A vertical timeline that centers on desktop (`md:left-1/2`) and left-aligns on mobile, with a glowing gradient spine. Cards alternate sides via an index parity check, and the entry marked `current: true` gets a pinging dot. Two roles are shown:

- **Software Development Engineer** — Cubic Logics Pvt Ltd, Oct 2024 – June 2026 *(current)*. Revenue 365 invoice-management app: reusable Fluent UI components, invoice preview/filtering/reporting, PDF generation, responsive dashboards.
- **Frontend Developer Intern** — Cubic Logics Pvt Ltd, May 2024 – Oct 2024. CRUD operations, form validation, filtering, modals, reusable components, Context API + hooks state management.

### Contact (`src/sections/Contact.jsx`)
The only stateful, side-effecting section. A controlled form (name / email / message) submits through `emailjs.send()` with:
- a loading state that disables the button and swaps its label to "Sending…",
- a green success banner with a check icon that also resets the form,
- a red error banner with an alert icon for both missing env config and send failures.

Alongside it: a contact-info card (email, phone, location — each a `mailto:` / `tel:` link) and a "Currently Available" card.

### Footer (`src/layout/Footer.jsx`)
Auto-updating copyright year, a back-to-top anchor, quick links to all four sections, and social icons.

### Testimonials (`src/sections/Testimonials.jsx`) — *not rendered*
A fully working carousel (prev/next buttons, clickable dot indicators that stretch when active, wrap-around index math) that is **commented out in `App.jsx`**. It still contains placeholder content from the original template — quotes attributed to "Pedro" and Unsplash stock avatars — so it needs real testimonials before being enabled.

---

## Notable Implementation Details

- **`@` path alias** — `vite.config.js` maps `@` to `./src`, so imports read `@/sections/Hero` instead of relative chains. A couple of files still use relative imports (`./layout/Footer`, `../components/AnimatedBorderButton`).
- **Tailwind v4, no config file** — all theming is CSS-native via `@theme`; `@layer base / components / utilities` handles resets, glass classes, and animations.
- **`rolldown-vite`** — `package.json` aliases `vite` to `npm:rolldown-vite@7.2.5` and pins it with `overrides`, opting into the Rust-based Rolldown bundler.
- **Staggered reveals** — most lists compute `style={{ animationDelay: `${(idx + 1) * 100}ms` }}` inline rather than using fixed delay classes.
- **Data-driven sections** — skills, highlights, projects, experiences, contact info, nav links, and social links are all top-of-file arrays, so content edits never touch JSX.
- **Content history** — commit `4115a76` ("remove wordpress") trimmed WordPress from the hero copy and commented out the HR365 / WordPress experience entry. That entry is still in the file, commented, if it should come back.

---

## Known Gaps / TODO

These are real issues in the current code, worth fixing before this goes live:

- [ ] **`AnimatedBorderButton` drops its props.** Its signature is `({ children })`, so the `onClick` passed in `Hero.jsx:130` is discarded and **the "Download CV" button does nothing**. Fix by accepting and spreading `...props` onto the `<button>` (same pattern `Button.jsx` already uses).
- [ ] **`type="email"` is on the wrong element** in `Contact.jsx:140` — it sits on the `<label>` instead of the `<input>`, so the email field gets no browser validation.
- [ ] **"View All Projects" button is inert** — no `href` or handler wired up (`Projects.jsx:139`).
- [ ] **Testimonials still has template placeholder data** ("Pedro", stock avatars) and no `key` prop on the dot-indicator buttons.
- [ ] **Experience copy overstates the timeline** — "from curious beginner to senior engineer leading teams" doesn't match a 2-year, two-role history.
- [ ] **Page metadata is still the scaffold default** — `index.html` has `<title>dev-personal-portfolio</title>`, the Vite favicon, and no description / Open Graph tags.
- [ ] **`profile-photo.jpg` is ~1.4 MB** and project screenshots are 50–855 KB — all unoptimized and unlazy-loaded.
- [ ] **Unused imports** — `Twitter` in `Hero.jsx` / `Footer.jsx`, `Download` in `AnimatedBorderButton.jsx`, `Heart` in `Footer.jsx`, `Testimonials` in `App.jsx`.
- [ ] **Typo** — `className="relatice"` in `Hero.jsx:158` (should be `relative`).
- [ ] No deployment config yet (no `vercel.json` / CI), and no tests.

---

## Deployment Notes

`npm run build` emits a static bundle to `dist/`, deployable to any static host (Vercel, Netlify, GitHub Pages). Remember to set the three `VITE_EMAILJS_*` variables in the host's environment settings — Vite inlines `VITE_`-prefixed variables at build time, so a build without them ships a non-functional contact form.

---

© Ankit Shaw
